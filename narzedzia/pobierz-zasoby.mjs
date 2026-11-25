// Pobiera zasoby obecnej strony klienta: zdjęcia (webp, duże i małe) oraz zrzuty ekranu.
// Uruchamia go GitHub Actions (.github/workflows/zasoby.yml), bo tam jest pełny dostęp do internetu.
// Wejście: klienci/<slug>/zamowienie.json  →  wyjście: klienci/<slug>/img/*, przed*.jpg, wynik.json
//
// zamowienie.json:
// {
//   "id": "middin-2026-11-25-2231",          // zmień id, żeby wymusić ponowne pobranie
//   "url": "https://adres-klienta.pl",
//   "podstrony": ["https://adres-klienta.pl/o-nas/"],   // opcjonalnie, do 6
//   "zdjecia": [{ "url": "https://...jpg", "nazwa": "hero" }],  // opcjonalnie, konkretne pliki
//   "auto": true,                              // dobierz zdjęcia ze stron automatycznie (domyślnie true)
//   "limit": 24                                // ile zdjęć najwyżej (domyślnie 24)
// }
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";

const KLIENCI = "klienci";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

function nazwaPliku(s) {
  return (
    String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/ł/g, "l")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "foto"
  );
}

async function otworz(page, url) {
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  } catch {
    await page.goto(url, { waitUntil: "load", timeout: 45000 });
  }
  // zamknij typowe banery cookies (bez klikania w nic innego)
  await page
    .evaluate(() => {
      const slowa = /akceptuj|zgadzam|accept|allow all|ok, rozumiem|rozumiem|zamknij/i;
      for (const b of Array.from(document.querySelectorAll("button, a[role=button]")).slice(0, 200)) {
        const t = (b.textContent || "").trim();
        if (t.length < 40 && slowa.test(t)) {
          b.click();
          break;
        }
      }
    })
    .catch(() => {});
  await page.waitForTimeout(800);
}

async function przewin(page) {
  await page
    .evaluate(async () => {
      const h = () => document.documentElement.scrollHeight;
      for (let y = 0; y < h() && y < 30000; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    })
    .catch(() => {});
  await page.waitForTimeout(700);
}

async function zbierzObrazy(page) {
  return page.evaluate(() => {
    const out = [];
    const abs = (u) => {
      try {
        return new URL(u, location.href).href;
      } catch {
        return null;
      }
    };
    for (const img of Array.from(document.images)) {
      const src = abs(img.currentSrc || img.src);
      if (!src || src.startsWith("data:")) continue;
      const r = img.getBoundingClientRect();
      out.push({
        url: src,
        szer: img.naturalWidth,
        wys: img.naturalHeight,
        alt: (img.alt || "").trim().slice(0, 120),
        logo: /logo/i.test(src + " " + img.alt + " " + img.className + " " + (img.closest("header") ? "naglowek" : "")) && r.top < 200,
        tlo: false,
      });
    }
    for (const el of Array.from(document.querySelectorAll("section, div, header, figure, a, span")).slice(0, 4000)) {
      const bg = getComputedStyle(el).backgroundImage;
      if (!bg || bg === "none" || !bg.includes("url(")) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 400 || r.height < 250) continue;
      const m = bg.match(/url\(["']?([^"')]+)["']?\)/);
      const src = m && abs(m[1]);
      if (src && !src.startsWith("data:")) out.push({ url: src, szer: Math.round(r.width), wys: Math.round(r.height), alt: "", logo: false, tlo: true });
    }
    const og = document.querySelector('meta[property="og:image"]')?.getAttribute("content");
    if (og) out.push({ url: abs(og), szer: 1200, wys: 630, alt: "og:image", logo: false, tlo: false });
    return out;
  });
}

async function pobierzObraz(ctx, url, referer) {
  const res = await ctx.request.get(url, { headers: { "User-Agent": UA, Referer: referer }, timeout: 30000 });
  if (!res.ok()) throw new Error(`HTTP ${res.status()}`);
  const typ = res.headers()["content-type"] || "";
  if (!/image|octet-stream/.test(typ)) throw new Error(`nie obraz (${typ})`);
  return Buffer.from(await res.body());
}

async function zapiszWebp(bufor, cel, maks, jakosc) {
  const obraz = sharp(bufor, { failOn: "none", animated: false }).rotate();
  const meta = await obraz.metadata();
  await obraz
    .resize({ width: Math.min(maks, meta.width || maks), withoutEnlargement: true })
    .webp({ quality: jakosc })
    .toFile(cel);
  const m = await sharp(cel).metadata();
  return { szer: m.width, wys: m.height };
}

async function obsluz(slug) {
  const dir = path.join(KLIENCI, slug);
  const z = JSON.parse(await readFile(path.join(dir, "zamowienie.json"), "utf8"));
  const wynikPath = path.join(dir, "wynik.json");
  if (existsSync(wynikPath)) {
    const w = JSON.parse(await readFile(wynikPath, "utf8"));
    if (w.zamowienie_id === z.id) return false;
  }
  console.log(`== ${slug}: ${z.url}`);
  await mkdir(path.join(dir, "img"), { recursive: true });
  const bledy = [];
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ userAgent: UA, locale: "pl-PL", viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const zrzuty = {};
  const kandydaci = [];

  try {
    await otworz(page, z.url);
    await page.screenshot({ path: path.join(dir, "przed.jpg"), type: "jpeg", quality: 85 });
    zrzuty.przed = "przed.jpg";
    await przewin(page);
    const wys = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.screenshot({ path: path.join(dir, "przed-pelna.jpg"), type: "jpeg", quality: 70, fullPage: wys <= 12000, clip: wys > 12000 ? { x: 0, y: 0, width: 1440, height: 12000 } : undefined });
    zrzuty.pelna = "przed-pelna.jpg";
    const tytul = await page.title();
    zrzuty.tytul = tytul;
    if (z.auto !== false) for (const o of await zbierzObrazy(page)) kandydaci.push({ ...o, strona: z.url });
  } catch (e) {
    bledy.push(`strona główna: ${e.message}`);
  }

  try {
    const tel = await browser.newContext({ userAgent: UA.replace("Windows NT 10.0; Win64; x64", "Linux; Android 14; Pixel 8") + " Mobile", locale: "pl-PL", viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const p2 = await tel.newPage();
    await otworz(p2, z.url);
    await p2.screenshot({ path: path.join(dir, "przed-telefon.jpg"), type: "jpeg", quality: 80 });
    zrzuty.telefon = "przed-telefon.jpg";
    await tel.close();
  } catch (e) {
    bledy.push(`zrzut telefonu: ${e.message}`);
  }

  if (z.auto !== false) {
    for (const url of (z.podstrony || []).slice(0, 6)) {
      try {
        await otworz(page, url);
        await przewin(page);
        for (const o of await zbierzObrazy(page)) kandydaci.push({ ...o, strona: url });
      } catch (e) {
        bledy.push(`${url}: ${e.message}`);
      }
    }
  }

  // Lista do pobrania: najpierw wskazane wprost, potem automatyczne (duże, bez ikon), bez powtórek.
  const lista = [];
  const widziane = new Set();
  for (const p of z.zdjecia || []) {
    if (p?.url && !widziane.has(p.url)) {
      widziane.add(p.url);
      lista.push({ url: p.url, nazwa: p.nazwa, alt: p.alt || "", strona: "zamowienie" });
    }
  }
  for (const k of kandydaci.filter((x) => x.logo)) {
    if (widziane.has(k.url) || lista.filter((x) => x.logo).length >= 2) continue;
    widziane.add(k.url);
    lista.push({ url: k.url, nazwa: "logo", alt: k.alt, strona: k.strona, logo: true });
  }
  const auto = kandydaci
    .filter((k) => !k.logo && k.szer >= 400 && k.wys >= 250 && !/\.svg(\?|$)/i.test(k.url) && !/gravatar|emoji|icon|sprite|pixel|facebook\.com\/tr/i.test(k.url))
    .sort((a, b) => b.szer * b.wys - a.szer * a.wys);
  for (const k of auto) {
    if (widziane.has(k.url)) continue;
    widziane.add(k.url);
    lista.push({ url: k.url, nazwa: k.alt ? nazwaPliku(k.alt) : null, alt: k.alt, strona: k.strona, tlo: k.tlo });
  }

  const limit = Math.min(Number(z.limit) || 24, 40);
  const zdjecia = [];
  const uzyte = new Set();
  let n = 0;
  for (const p of lista) {
    if (zdjecia.filter((x) => !x.logo).length >= limit && !p.logo) break;
    try {
      const buf = await pobierzObraz(ctx, p.url, z.url);
      n += 1;
      let baza = p.logo ? "logo" : nazwaPliku(p.nazwa || `foto-${String(n).padStart(2, "0")}`);
      while (uzyte.has(baza)) baza = `${baza}-${n}`;
      uzyte.add(baza);
      if (p.logo && /svg/i.test(p.url)) {
        await writeFile(path.join(dir, "img", `${baza}.svg`), buf);
        zdjecia.push({ plik: `img/${baza}.svg`, zrodlo: p.url, alt: p.alt, strona: p.strona, logo: true });
        continue;
      }
      const duze = await zapiszWebp(buf, path.join(dir, "img", `${baza}.webp`), 1600, 80);
      if (duze.szer < 300 && !p.logo) continue;
      const male = await zapiszWebp(buf, path.join(dir, "img", `${baza}-m.webp`), 800, 78);
      zdjecia.push({ plik: `img/${baza}.webp`, male: `img/${baza}-m.webp`, szer: duze.szer, wys: duze.wys, szer_m: male.szer, zrodlo: p.url, alt: p.alt, strona: p.strona, ...(p.logo ? { logo: true } : {}), ...(p.tlo ? { tlo: true } : {}) });
    } catch (e) {
      bledy.push(`${p.url}: ${e.message}`);
    }
  }

  await browser.close();
  const wynik = { zamowienie_id: z.id, kiedy: new Date().toISOString(), url: z.url, ok: !!zrzuty.przed, zrzuty, zdjecia, bledy: bledy.slice(0, 40) };
  await writeFile(wynikPath, JSON.stringify(wynik, null, 2) + "\n");
  console.log(`   zdjęcia: ${zdjecia.length}, błędy: ${bledy.length}`);
  return true;
}

if (!existsSync(KLIENCI)) process.exit(0);
let zmiany = 0;
for (const slug of await readdir(KLIENCI)) {
  if (!existsSync(path.join(KLIENCI, slug, "zamowienie.json"))) continue;
  try {
    if (await obsluz(slug)) zmiany += 1;
  } catch (e) {
    console.error(`!! ${slug}: ${e.message}`);
    await writeFile(path.join(KLIENCI, slug, "wynik.json"), JSON.stringify({ zamowienie_id: JSON.parse(await readFile(path.join(KLIENCI, slug, "zamowienie.json"), "utf8")).id, kiedy: new Date().toISOString(), ok: false, blad: e.message }, null, 2) + "\n");
  }
}
console.log(`Gotowe, obsłużone zamówienia: ${zmiany}`);
