import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { Logo, Sygnet } from "../logo/Logo";
import { nasluch } from "../lib/nasluch";
import { plik, t } from "../lib/tekst";
import { linkZakupu, TSS } from "../tss";
import { WYCENA } from "./dane";

const KLUCZ = `${WYCENA.slug}-wycena-auth`;
const NOWA_KARTA = { target: "_blank", rel: "noopener noreferrer" } as const;

function normalizuj(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[\s-]+/g, "");
}

function zdarzenie(nazwa: string) {
  nasluch("zdarzenie", nazwa);
}

function usePokazywanie(aktywne: boolean) {
  useEffect(() => {
    if (!aktywne) return;
    const el = Array.from(document.querySelectorAll<HTMLElement>("[data-pokaz]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      el.forEach((e) => e.classList.add("widoczny"));
      return;
    }
    const io = new IntersectionObserver(
      (wpisy) =>
        wpisy.forEach((w) => {
          if (w.isIntersecting) {
            w.target.classList.add("widoczny");
            io.unobserve(w.target);
          }
        }),
      { threshold: 0.12 },
    );
    el.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [aktywne]);
}

function Strzalka() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" aria-hidden="true">
      <path d="M3.33 8H12M8 3.33L12.67 8 8 12.67" />
    </svg>
  );
}

function Plus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" className="h-5 w-5">
      <path d="M5 12h14" />
      <path className="plus-pion" d="M12 5v14" />
    </svg>
  );
}

function Etykieta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`micro-label m-0 ${className}`}>{children}</p>;
}

function Pokaz({ children, opoznienie = 0, className = "", as: Tag = "div" }: { children: ReactNode; opoznienie?: number; className?: string; as?: "div" | "li" | "p" }) {
  return (
    <Tag data-pokaz className={className} style={{ "--opoznienie": `${opoznienie}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

function Lista({ elementy, className = "" }: { elementy: string[]; className?: string }) {
  return (
    <ul className={`m-0 flex list-none flex-col gap-4 p-0 ${className}`}>
      {elementy.map((e, i) => (
        <Pokaz key={e} as="li" opoznienie={i * 60} className="kropka-lista text-[17px] leading-[1.55]">
          <span>{t(e)}</span>
        </Pokaz>
      ))}
    </ul>
  );
}

function Naglowek() {
  return (
    <header className="bg-roz">
      <div className="shell flex h-[76px] items-center justify-between gap-4">
        <a href={TSS.strona} className="font-display text-[15px] font-extrabold tracking-[-0.01em] text-tusz no-underline">
          {TSS.marka}
        </a>
        <a {...NOWA_KARTA} href={WYCENA.podglad} className="micro-label inline-flex items-center gap-2 bg-tusz px-3.5 py-2.5 text-white no-underline hover:bg-czerwien" data-nasluch-klik="zobacz-strone">
          Nowa strona<span className="max-sm:hidden"> {WYCENA.firmaKrotko}</span> ↗
        </a>
      </div>
    </header>
  );
}

function Stopka() {
  return (
    <footer>
      <div className="na-czarnym bg-tusz text-white">
        <div className="shell py-6 text-[14px]">{t(`Wycena przygotowana ${WYCENA.data} przez twojastara.site. Płatności i faktury: ${TSS.sprzedawca}.`)}</div>
      </div>
      <div className="shell flex flex-wrap items-center justify-between gap-4 py-7 text-[14px]">
        <a href={TSS.strona} className="font-display font-extrabold text-tusz no-underline">
          {TSS.marka}
        </a>
        <div className="flex flex-wrap gap-6">
          <a {...NOWA_KARTA} href={TSS.polityka} className="text-tusz underline underline-offset-4">
            Polityka prywatności
          </a>
          <a href={`mailto:${TSS.doradca.email}`} className="text-tusz underline underline-offset-4">
            {TSS.doradca.email}
          </a>
        </div>
      </div>
    </footer>
  );
}

type Konfiguracja = { google_client_id?: string; domeny_zespolu?: string[] };
type GoogleId = {
  initialize: (opcje: Record<string, unknown>) => void;
  renderButton: (miejsce: HTMLElement, opcje: Record<string, unknown>) => void;
};
type OknoGoogle = Window & { google?: { accounts?: { id?: GoogleId } } };

/** Wspólna konfiguracja z nowa.twojastara.site/tss.json (identyfikator logowania Google i domeny zespołu). */
function useKonfiguracja(): Konfiguracja | null {
  const [konfiguracja, setKonfiguracja] = useState<Konfiguracja | null>(null);
  useEffect(() => {
    let aktywne = true;
    fetch(TSS.konfiguracja, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: Konfiguracja | null) => {
        if (aktywne) setKonfiguracja(j);
      })
      .catch(() => {
        /* bez konfiguracji nie ma logowania zespołu, hasło działa dalej */
      });
    return () => {
      aktywne = false;
    };
  }, []);
  return konfiguracja;
}

function dekodujToken(token: string): Record<string, unknown> | null {
  try {
    const srodek = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const bajty = Array.from(atob(srodek), (z) => "%" + z.charCodeAt(0).toString(16).padStart(2, "0")).join("");
    return JSON.parse(decodeURIComponent(bajty)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Logowanie Google dla zespołu (Mateusz 25.11.2026 23:00): każdy z naszego Google Workspace wchodzi bez hasła.
 * Skrypt Google wczytuje się dopiero po kliknięciu, więc klienci nie łączą się z Google. Po zalogowaniu
 * ustawiamy ciasteczko nasłuchu „wewnetrzne”, żeby wejście zespołu nie liczyło się jako otwarcie przez klienta.
 */
function LogowanieZespolu() {
  const konfiguracja = useKonfiguracja();
  const [otwarte, setOtwarte] = useState(false);
  const [blad, setBlad] = useState("");
  const miejsce = useRef<HTMLDivElement>(null);
  const identyfikator = konfiguracja?.google_client_id?.trim() ?? "";
  const domeny = (konfiguracja?.domeny_zespolu ?? []).map((d) => d.toLowerCase().trim()).filter(Boolean);

  useEffect(() => {
    if (!otwarte || !identyfikator) return;
    let anulowane = false;
    const uruchom = () => {
      const google = (window as OknoGoogle).google?.accounts?.id;
      if (anulowane || !google || !miejsce.current) return;
      google.initialize({
        client_id: identyfikator,
        hd: "*",
        ux_mode: "popup",
        auto_select: false,
        callback: (odpowiedz: { credential?: string }) => {
          const dane = odpowiedz.credential ? dekodujToken(odpowiedz.credential) : null;
          const domena = String(dane?.hd ?? "").toLowerCase();
          if (!dane || dane.email_verified !== true || !domena || !domeny.includes(domena)) {
            setBlad("To konto Google nie należy do zespołu twojastara.site. Wejdź hasłem z maila.");
            return;
          }
          try {
            sessionStorage.setItem(KLUCZ, "1");
            sessionStorage.setItem(`${KLUCZ}-zespol`, String(dane.email ?? ""));
          } catch {
            /* brak pamięci sesji */
          }
          document.cookie = "tss_nasluch=wewnetrzne; domain=.twojastara.site; path=/; max-age=31536000; SameSite=Lax; Secure";
          window.location.reload();
        },
      });
      google.renderButton(miejsce.current, { type: "standard", theme: "filled_black", size: "large", text: "signin_with", shape: "rectangular", locale: "pl" });
    };
    if ((window as OknoGoogle).google?.accounts?.id) {
      uruchom();
    } else {
      const skrypt = document.createElement("script");
      skrypt.src = "https://accounts.google.com/gsi/client";
      skrypt.async = true;
      skrypt.onload = uruchom;
      skrypt.onerror = () => setBlad("Nie udało się wczytać logowania Google. Odśwież stronę albo wejdź hasłem.");
      document.head.appendChild(skrypt);
    }
    return () => {
      anulowane = true;
    };
  }, [otwarte, identyfikator]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!identyfikator || domeny.length === 0) return null;
  return (
    <div className="mt-8 border-t border-tusz/20 pt-5" data-nasluch-sekcja="logowanie-zespolu">
      {otwarte ? (
        <div className="flex flex-col gap-3">
          <p className="micro-label m-0">Zespół twojastara.site</p>
          <div ref={miejsce} className="min-h-[44px]" />
          {blad && (
            <p role="alert" className="m-0 text-[14px] font-semibold text-czerwien">
              {blad}
            </p>
          )}
        </div>
      ) : (
        <button type="button" onClick={() => setOtwarte(true)} className="cursor-pointer border-0 bg-transparent p-0 text-[13px] font-semibold text-tusz underline underline-offset-2">
          Logowanie dla zespołu twojastara.site (konto Google)
        </button>
      )}
    </div>
  );
}

function Bramka({ wejdz }: { wejdz: () => void }) {
  const [haslo, setHaslo] = useState("");
  const [blad, setBlad] = useState(false);
  const pole = useRef<HTMLInputElement>(null);
  usePokazywanie(true);

  const wyslij = (e: FormEvent) => {
    e.preventDefault();
    if ((WYCENA.hasla as string[]).includes(normalizuj(haslo))) {
      try {
        sessionStorage.setItem(KLUCZ, "1");
      } catch {
        /* brak pamięci sesji */
      }
      window.scrollTo(0, 0);
      wejdz();
    } else {
      setBlad(true);
      zdarzenie("haslo_blad");
      pole.current?.focus();
      pole.current?.select();
    }
  };

  return (
    <div className="flex min-h-svh flex-col">
      <Naglowek />
      <main className="flex-1 bg-roz">
        <div className="shell grid gap-12 pt-[clamp(48px,10vh,120px)] pb-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Pokaz>
              <Etykieta>Wycena dedykowana</Etykieta>
            </Pokaz>
            <Pokaz opoznienie={80}>
              <h1 className="display-xl mt-6">
                Tylko dla
                <br />
                {WYCENA.firmaDla}
              </h1>
            </Pokaz>
          </div>
          <Pokaz opoznienie={160} className="self-end lg:col-span-5">
            <form onSubmit={wyslij} className="flex flex-col gap-4" noValidate>
              <label htmlFor="haslo" className="micro-label">
                Hasło
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  ref={pole}
                  id="haslo"
                  name="haslo"
                  type="password"
                  autoComplete="off"
                  autoFocus
                  value={haslo}
                  onChange={(e) => {
                    setHaslo(e.target.value);
                    setBlad(false);
                  }}
                  aria-invalid={blad}
                  aria-describedby="haslo-info"
                  className="h-[56px] min-w-0 flex-1 border border-tusz bg-white px-4 text-[18px] text-tusz outline-none focus:ring-2 focus:ring-tusz"
                />
                <button type="submit" className="btn btn-tusz h-[56px]">
                  Wchodzę <Strzalka />
                </button>
              </div>
              <p id="haslo-info" className={`m-0 text-[15px] ${blad ? "font-semibold text-czerwien" : ""}`} role={blad ? "alert" : undefined}>
                {blad ? "To hasło nie pasuje. Sprawdź mail od Mateusza albo zadzwoń: 571 510 686." : `Hasło znajdzie ${WYCENA.formy.on} w mailu od Mateusza.`}
              </p>
              <p className="m-0 mt-4 max-w-[480px] text-[13px] leading-relaxed text-tusz/70">
                {t("Ta strona zapisuje, kiedy wycena jest otwierana i których przycisków ktoś użył (bez plików cookie), żebyśmy mogli szybciej odpowiedzieć. Szczegóły w ")}
                <a {...NOWA_KARTA} href={TSS.polityka} className="text-tusz underline underline-offset-2">
                  polityce prywatności
                </a>
                .
              </p>
            </form>
            <LogowanieZespolu />
          </Pokaz>
        </div>
      </main>
      <Stopka />
    </div>
  );
}

function Porownanie() {
  const [pozycja, setPozycja] = useState(50);
  return (
    <div>
      <div className="porownanie aspect-[16/10] w-full border border-tusz">
        <img src={plik("wycena/img/przed.jpg")} alt={`Obecna strona ${WYCENA.firmaDla}`} width={1440} height={900} loading="lazy" className="absolute inset-0" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pozycja}%)` }}>
          <img src={plik("wycena/img/po.jpg")} alt={`Nowa propozycja strony ${WYCENA.firmaDla}`} width={1440} height={900} loading="lazy" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-[2px] bg-czerwien" style={{ left: `calc(${pozycja}% - 1px)` }} aria-hidden="true">
          <span className="absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center bg-czerwien text-[18px] text-white">↔</span>
        </div>
        <span className="micro-label pointer-events-none absolute bottom-3 left-3 bg-tusz px-2.5 py-1.5 text-white">Obecna strona</span>
        <span className="micro-label pointer-events-none absolute right-3 bottom-3 bg-czerwien px-2.5 py-1.5 text-white">Nowa propozycja</span>
        <input type="range" min={0} max={100} step={1} value={pozycja} onChange={(e) => setPozycja(Number(e.target.value))} aria-label="Przesuń, aby porównać strony" />
      </div>
      <p className="micro-label m-0 mt-3 text-tusz/60">Przesuń, aby porównać strony</p>
    </div>
  );
}

function Pakiet({
  nazwa,
  cena,
  dopisek,
  podpis,
  punkty,
  link,
  przycisk,
  klik,
  wyrozniony,
}: {
  nazwa: string;
  cena: string;
  dopisek?: string;
  podpis: string;
  punkty: string[];
  link: string;
  przycisk: string;
  klik: string;
  wyrozniony?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-8 p-8 sm:p-10 ${wyrozniony ? "bg-roz text-tusz" : "border border-white/25 text-white"}`}>
      <div>
        <Etykieta className={wyrozniony ? "text-tusz/70" : "text-white/60"}>{nazwa}</Etykieta>
        <p className="m-0 mt-4 flex items-baseline gap-2 font-display text-[clamp(3.2rem,6vw,5.5rem)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase">
          {cena}
          {dopisek && <span className="text-[1.25rem] tracking-[-0.01em] normal-case">{dopisek}</span>}
        </p>
        <p className={`m-0 mt-3 text-[15px] ${wyrozniony ? "text-tusz/70" : "text-white/60"}`}>{podpis}</p>
      </div>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {punkty.map((p) => (
          <li key={p} className="kropka-lista text-[16px] leading-[1.5]">
            <span>{t(p)}</span>
          </li>
        ))}
      </ul>
      <a {...NOWA_KARTA} href={link} className={`btn mt-auto ${wyrozniony ? "btn-tusz" : "btn-roz"}`} data-nasluch-klik={klik} data-nasluch-etykieta={przycisk}>
        {przycisk} <Strzalka />
      </a>
    </div>
  );
}

function Tresc({ zaplacone }: { zaplacone: boolean }) {
  usePokazywanie(true);
  useEffect(() => {
    zdarzenie("otwarcie");
  }, []);

  const kroki = [
    [`Wybiera ${WYCENA.formy.on} wariant`, `Płatność online od razu na tej stronie: ${TSS.ceny.miesiecznie} miesięcznie przez ${TSS.ceny.okres} albo ${TSS.ceny.jednorazowo} jednorazowo.`],
    ["Ostatnie poprawki", `Sprawdzamy z ${WYCENA.formy.nim} treści, godziny, logo i dane kontaktowe.`],
    ["Publikacja", `Nowa strona startuje na ${WYCENA.domena}, zwykle w ciągu kilku dni roboczych.`],
  ];

  return (
    <>
      <Naglowek />
      <main>
        {zaplacone && (
          <div className="bg-czerwien text-white" role="status">
            <div className="shell py-5 text-[16px] font-medium">
              {t("Dziękujemy, płatność przyjęta. Mateusz odezwie się, żeby ustalić ostatnie poprawki i termin publikacji.")}
            </div>
          </div>
        )}

        <section data-nasluch-sekcja="start">
          <div className="na-czarnym bg-tusz text-white">
            <div className="shell py-12 sm:py-16">
              <Pokaz>
                <Etykieta className="text-white/70">Wycena dedykowana · {WYCENA.data}</Etykieta>
              </Pokaz>
              <Pokaz opoznienie={80}>
                <h1 className="display-xl mt-5">Nowa strona dla {WYCENA.firmaDla}</h1>
              </Pokaz>
            </div>
          </div>

          <div className="bg-roz">
            <div className="shell grid grid-cols-1 items-center gap-14 py-[clamp(56px,9vw,120px)] lg:grid-cols-12">
              <div className="lg:col-span-6">
                <Pokaz>
                  <h2 className="display-xl !text-[clamp(2.4rem,4.6vw,4.6rem)]">
                    Stara strona
                    <br />
                    jest super.
                    <br />
                    Nowa jest
                    <br />
                    już gotowa.
                  </h2>
                </Pokaz>
                <Pokaz opoznienie={100}>
                  <p className="m-0 mt-8 max-w-[560px] text-[17px] leading-[1.65]">
                    {t(WYCENA.wstep)}
                  </p>
                </Pokaz>
                <Pokaz opoznienie={160} className="mt-8 flex flex-wrap gap-3">
                  <a {...NOWA_KARTA} href={WYCENA.podglad} className="btn btn-tusz" data-nasluch-klik="zobacz-strone">
                    Zobacz nową stronę <Strzalka />
                  </a>
                  <a href="#cena" className="btn btn-bialy" data-nasluch-klik="cena">
                    Cena i zakup <Strzalka />
                  </a>
                </Pokaz>
                <Pokaz opoznienie={220} className="mt-10 flex max-w-[460px] items-center gap-5 border-t border-tusz/20 pt-6">
                  <div className="grid h-14 w-14 flex-none place-items-center bg-tusz font-display text-[18px] font-extrabold text-roz">MB</div>
                  <div className="min-w-0">
                    <Etykieta className="text-tusz/60">{WYCENA.formy.jego} doradca</Etykieta>
                    <p className="m-0 mt-1 font-display text-[20px] font-extrabold tracking-[-0.01em] uppercase">{TSS.doradca.imie}</p>
                    <p className="m-0 text-[14px] text-tusz/70">{TSS.doradca.rola}</p>
                    <p className="m-0 mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[14px]">
                      <a href={TSS.doradca.telefonHref} className="font-semibold text-tusz underline-offset-4 hover:underline" data-nasluch-klik="telefon">
                        {TSS.doradca.telefon}
                      </a>
                      <a href={`mailto:${TSS.doradca.email}`} className="text-tusz underline-offset-4 hover:underline" data-nasluch-klik="mail">
                        {TSS.doradca.email}
                      </a>
                    </p>
                  </div>
                </Pokaz>
              </div>

              <Pokaz opoznienie={120} className="lg:col-span-6">
                <a {...NOWA_KARTA} href={WYCENA.podglad} className="group relative block pb-10 text-tusz no-underline sm:pr-10" data-nasluch-klik="zobacz-strone" aria-label={`Otwórz nową stronę ${WYCENA.firmaDla} w nowej karcie`}>
                  <div className="border border-tusz bg-white shadow-[0_30px_80px_-40px_rgb(0_0_0/0.6)] transition-transform duration-500 group-hover:-translate-y-1">
                    <div className="flex items-center gap-2 border-b border-tusz px-3 py-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-tusz/25" />
                      <span className="h-2.5 w-2.5 rounded-full bg-tusz/25" />
                      <span className="h-2.5 w-2.5 rounded-full bg-tusz/25" />
                      <span className="micro-label ml-3 min-w-0 truncate text-tusz/70">{WYCENA.podgladPokaz}</span>
                    </div>
                    <img src={plik("wycena/img/po.jpg")} alt={`Podgląd nowej strony ${WYCENA.firmaDla} na komputerze`} width={1440} height={900} className="aspect-[16/10] w-full object-cover object-top" />
                  </div>
                  <div className="absolute right-0 bottom-0 w-[24%] min-w-[96px] overflow-hidden rounded-[18px] border-[3px] border-tusz bg-tusz shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)] transition-transform duration-500 group-hover:-translate-y-2 max-sm:right-2">
                    <img src={plik("wycena/img/po-telefon.jpg")} alt={`Podgląd nowej strony ${WYCENA.firmaDla} na telefonie`} width={390} height={844} className="aspect-[390/844] w-full rounded-[15px] object-cover object-top" />
                  </div>
                </a>
                <p className="micro-label m-0 mt-4 text-center text-tusz/70">Kliknij, żeby otworzyć stronę na żywo</p>
              </Pokaz>
            </div>
          </div>
        </section>

        <section data-nasluch-sekcja="przed-po" className="py-[clamp(64px,9vw,128px)]">
          <div className="shell">
            <Pokaz>
              <Etykieta>Przed i po</Etykieta>
            </Pokaz>
            <Pokaz opoznienie={80}>
              <h2 className="display-xl mt-5 max-w-[1100px]">{WYCENA.przedPoTytul}</h2>
            </Pokaz>
            <Pokaz opoznienie={120} className="mt-10">
              <Porownanie />
            </Pokaz>
            <div className="mt-16 grid gap-12 lg:grid-cols-2">
              <div>
                <Pokaz>
                  <h3 className="display-lg">Jest</h3>
                </Pokaz>
                <Lista elementy={WYCENA.jest} className="mt-8 text-tusz/80" />
              </div>
              <div>
                <Pokaz>
                  <h3 className="display-lg text-czerwien">Będzie</h3>
                </Pokaz>
                <Lista elementy={WYCENA.bedzie} className="mt-8" />
              </div>
            </div>
          </div>
        </section>

        <section data-nasluch-sekcja="kolory" className="border-t border-tusz/15 py-[clamp(64px,9vw,128px)]">
          <div className="shell grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Pokaz>
                <Etykieta>Kolory</Etykieta>
              </Pokaz>
              <Pokaz opoznienie={80}>
                <h2 className="display-xl mt-5">
                  {WYCENA.kolory.tytul[0]}
                  <br />
                  {WYCENA.kolory.tytul[1]}
                </h2>
              </Pokaz>
              <Pokaz opoznienie={140}>
                <p className="m-0 mt-8 max-w-[480px] text-[17px] leading-[1.65]">{t(WYCENA.kolory.opis)}</p>
              </Pokaz>
            </div>
            <div className="grid grid-cols-2 gap-3 self-end lg:col-span-7">
              {WYCENA.kolory.probki.map((k, i) => (
                <Pokaz key={k.hex} opoznienie={i * 70}>
                  <div className="flex aspect-[4/3] flex-col justify-end border border-tusz/15 p-5" style={{ background: k.hex, color: k.tekst }}>
                    <p className="m-0 font-display text-[22px] font-extrabold uppercase">{k.nazwa}</p>
                    <p className="micro-label m-0 mt-1 opacity-75">{k.hex}</p>
                  </div>
                </Pokaz>
              ))}
            </div>
          </div>
        </section>

        <section data-nasluch-sekcja="logo" className="border-t border-tusz/15 py-[clamp(64px,9vw,128px)]">
          <div className="shell grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Pokaz>
                <Etykieta>Logo</Etykieta>
              </Pokaz>
              <Pokaz opoznienie={80}>
                <h2 className="display-xl mt-5">
                  {WYCENA.logo.tytul[0]}
                  <br />
                  {WYCENA.logo.tytul[1]}
                </h2>
              </Pokaz>
              <Pokaz opoznienie={140}>
                <p className="m-0 mt-8 max-w-[480px] text-[17px] leading-[1.65]">{t(WYCENA.logo.opis)}</p>
              </Pokaz>
            </div>
            <div className="grid grid-cols-2 gap-3 self-end lg:col-span-7" data-nasluch-klik="logo">
              <Pokaz className="col-span-2 flex min-h-[180px] items-center justify-center border border-tusz/15 bg-[#f7f3e8] p-8">
                <Logo className="origin-center scale-[1.6] max-sm:scale-[1.2]" />
              </Pokaz>
              <Pokaz opoznienie={80} className="flex min-h-[150px] items-center justify-center bg-[#1d1a14] p-6 max-sm:col-span-2">
                <Logo ciemne />
              </Pokaz>
              <Pokaz opoznienie={140} className="flex min-h-[150px] items-center justify-center gap-5 border border-tusz/15 bg-white p-6 max-sm:col-span-2">
                <Sygnet className="h-20 w-20" opis="Logo parafii: ikona Świętych Apostołów Piotra i Pawła" />
                <Sygnet className="h-11 w-11" />
                <img src={plik("favicon.svg")} alt="Ikona strony w karcie przeglądarki" width={32} height={32} className="h-8 w-8" />
              </Pokaz>
            </div>
          </div>
        </section>

        <section id="cena" data-nasluch-sekcja="cena" className="na-czarnym bg-tusz py-[clamp(64px,9vw,128px)] text-white">
          <div className="shell">
            <Pokaz>
              <Etykieta className="text-white/70">Cena jak w reklamie</Etykieta>
            </Pokaz>
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              <Pokaz>
                <Pakiet
                  wyrozniony
                  nazwa="Abonament"
                  cena="99 zł"
                  dopisek="/ mies."
                  podpis={`przez ${TSS.ceny.okres}, płatne co miesiąc z góry, bez opłaty na start`}
                  punkty={[
                    "Wykonanie strony według tego podglądu, bez opłaty na start",
                    `Publikacja na domenie parafii ${WYCENA.domena}`,
                    "Hosting, certyfikat SSL, kopie zapasowe i aktualizacje",
                    "Zgłoszenie strony do Google",
                    "Zmiany treści rozmową z ChatGPT albo zlecane nam: drobne zmiany w cenie",
                  ]}
                  link={linkZakupu("miesiecznie", WYCENA.slug)}
                  przycisk="Kupuję za 99 zł miesięcznie"
                  klik="kup-abonament"
                />
              </Pokaz>
              <Pokaz opoznienie={100}>
                <Pakiet
                  nazwa="Jednorazowo"
                  cena="690 zł"
                  podpis="płatne raz, bez abonamentu"
                  punkty={[
                    "Wykonanie strony według tego podglądu",
                    "Strona na własność, bez abonamentu",
                    `Płaci ${WYCENA.formy.on} raz, a strona należy do parafii`,
                    "Hosting i późniejsze zmiany po stronie parafii albo zlecane nam osobno, gdy będzie potrzeba",
                  ]}
                  link={linkZakupu("jednorazowo", WYCENA.slug)}
                  przycisk="Kupuję za 690 zł jednorazowo"
                  klik="kup-jednorazowo"
                />
              </Pokaz>
            </div>
            <Pokaz className="mt-10 border border-czerwien p-6 sm:p-8">
              <Etykieta className="text-czerwien">Strona uproszczona</Etykieta>
              <p className="m-0 mt-4 max-w-[760px] text-[16px] leading-[1.7] text-white/90">
                {t(
                  `Ten zakup to zakup strony uproszczonej: jednej strony z sekcjami, takiej jak w podglądzie, na treściach z obecnej strony parafii. Jeśli będzie ${WYCENA.formy.on} potrzebował dodatkowych prac (np. kolejnych podstron, nowych sekcji, sklepu, rezerwacji, kalkulatorów, integracji z innymi systemami albo tekstów pisanych od nowa), zastrzegamy sobie prawo, żeby zaproponować za nie dodatkowe płatności. Dodatkowe prace wyceniamy osobno, zanim je zaczniemy.`,
                )}
              </p>
            </Pokaz>
            <div className="mt-8 flex flex-col gap-2 text-[14px] text-white/70">
              <p className="m-0">{t(`Płatność online obsługuje Stripe. Sprzedawcą, odbiorcą płatności i wystawcą faktury jest ${TSS.sprzedawca}. NIP parafii do faktury może ${WYCENA.formy.on} podać przy płatności.`)}</p>
              <p className="m-0">{t("Domena i poczta zostają bez zmian. Przy publikacji przekierowujemy stare adresy podstron, żeby nikt nie trafił na błąd.")}</p>
            </div>
          </div>
        </section>

        <section className="bg-roz py-[clamp(64px,9vw,128px)]">
          <div className="shell">
            <Pokaz>
              <Etykieta>Jak to dalej pójdzie</Etykieta>
            </Pokaz>
            <ol className="m-0 mt-10 grid list-none gap-4 p-0 lg:grid-cols-3">
              {kroki.map(([tytul, opis], i) => (
                <Pokaz key={tytul} as="li" opoznienie={i * 90} className="flex flex-col gap-4 border-t-2 border-tusz pt-6">
                  <span className="font-display text-[3.5rem] leading-none font-extrabold tracking-[-0.04em]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="m-0 font-display text-[1.6rem] leading-tight font-extrabold tracking-[-0.02em] uppercase">{tytul}</h3>
                  <p className="m-0 max-w-[420px] text-[16px] leading-[1.6]">{t(opis ?? "")}</p>
                </Pokaz>
              ))}
            </ol>
          </div>
        </section>

        <section data-nasluch-sekcja="kontakt" className="py-[clamp(64px,9vw,128px)]">
          <div className="shell">
            <div className="max-w-[920px]">
              <Pokaz>
                <Etykieta>Przed publikacją potwierdzimy z {WYCENA.formy.nim}</Etykieta>
              </Pokaz>
              <Lista elementy={WYCENA.potwierdzenia} className="mt-8" />
            </div>
            <Pokaz className="mt-[clamp(56px,8vw,112px)]">
              <h2 className="display-xl">
                Woli {WYCENA.formy.on}
                <br />
                najpierw porozmawiać?
              </h2>
            </Pokaz>
            <Pokaz className="mt-10 flex flex-wrap gap-3">
              <a {...NOWA_KARTA} href={TSS.doradca.kalendarz} className="btn btn-czerwony" data-nasluch-klik="kalendarz">
                Wybierz 15 minut w kalendarzu <Strzalka />
              </a>
              <a href={TSS.doradca.telefonHref} className="btn btn-tusz" data-nasluch-klik="telefon">
                Zadzwoń: {TSS.doradca.telefonKrotko} <Strzalka />
              </a>
              <a {...NOWA_KARTA} href={TSS.doradca.whatsapp} className="btn btn-tusz" data-nasluch-klik="whatsapp">
                Napisz na WhatsApp <Strzalka />
              </a>
              <a
                href={`mailto:${TSS.doradca.email}?subject=${encodeURIComponent(`${WYCENA.firma}: nowa strona`)}`}
                className="btn btn-tusz"
                data-nasluch-klik="mail"
              >
                Odpisz mailem <Strzalka />
              </a>
            </Pokaz>
          </div>
        </section>

        <section className="border-t border-tusz/15 py-[clamp(64px,9vw,128px)]">
          <div className="shell grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Pokaz>
                <Etykieta>Pytania</Etykieta>
              </Pokaz>
            </div>
            <div className="lg:col-span-8">
              {WYCENA.pytania.map(([p, o], i) => (
                <Pokaz key={p} opoznienie={i * 50}>
                  <details className="group border-t border-tusz/20 last:border-b">
                    <summary className="flex items-center justify-between gap-6 py-6 font-display text-[1.25rem] font-extrabold tracking-[-0.01em]">
                      <span>{p}</span>
                      <span className="grid h-10 w-10 flex-none place-items-center border border-tusz group-open:bg-tusz group-open:text-white">
                        <Plus />
                      </span>
                    </summary>
                    <p className="m-0 max-w-[760px] pb-7 text-[16px] leading-[1.7] text-tusz/80">{t(o)}</p>
                  </details>
                </Pokaz>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Stopka />
    </>
  );
}

export function Wycena() {
  const [wejscie, setWejscie] = useState(false);
  const [gotowe, setGotowe] = useState(false);
  const [zaplacone, setZaplacone] = useState(false);

  useEffect(() => {
    nasluch("start", { slug: WYCENA.slug, zrodlo: "wycena" });
    try {
      if (sessionStorage.getItem(KLUCZ) === "1") setWejscie(true);
    } catch {
      /* brak pamięci sesji */
    }
    const platnosc = new URLSearchParams(window.location.search).get("platnosc") === "ok";
    if (platnosc) {
      setZaplacone(true);
      setWejscie(true);
      zdarzenie("platnosc_ok");
    }
    setGotowe(true);
  }, []);

  useEffect(() => {
    document.title = wejscie
      ? `Wycena nowej strony dla ${WYCENA.firmaDla} | ${TSS.marka}`
      : `Wycena dla ${WYCENA.firmaDla} | ${TSS.marka}`;
  }, [wejscie]);

  if (!gotowe) return null;
  return wejscie ? <Tresc zaplacone={zaplacone} /> : <Bramka wejdz={() => setWejscie(true)} />;
}

