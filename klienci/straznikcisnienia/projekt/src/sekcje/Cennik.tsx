import { useState, type CSSProperties } from "react";
import { CENNIK, KLIENT, linkZamowienia, type Wariant } from "../klient";
import { t } from "../lib/tekst";
import { Check, Koperta, Telefon } from "../ui/Ikony";
import { Obraz } from "../ui/Obraz";

/**
 * Cennik na wzór BYQ Supply „Two-Tier Pricing Cards” (kelvin-pricing-1): ciemne kafle, nazwa pakietu
 * małymi literami mono, duża cena w kroju mono, linia, lista i przycisk ze ściętym rogiem.
 * Przełącznik zestawów (do auta albo do roweru) jak zakładki w BYQ go-smart-pricing-2.
 */
export function Cennik() {
  const [klucz, setKlucz] = useState<Wariant["klucz"]>("auto");
  const wariant = CENNIK.warianty.find((w) => w.klucz === klucz) ?? CENNIK.warianty[0]!;

  return (
    <section id="cennik" data-nasluch-sekcja="cennik" className="na-ciemnym skala relative bg-grafit py-[120px] text-white max-[767px]:py-20">
      <div className="kontener">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8 max-[767px]:mb-9">
          <div className="flex max-w-[640px] flex-col items-start gap-6">
            <span data-pokaz className="etykieta">
              Cennik
            </span>
            <h2
              data-pokaz
              style={{ "--opoznienie": "80ms" } as CSSProperties}
              className="naglowek-szeroki m-0 text-[clamp(36px,4.4vw,60px)] leading-[1.02]"
            >
              <span className="text-white/45">Ile kosztuje</span> zestaw?
            </h2>
          </div>

          <div data-pokaz style={{ "--opoznienie": "140ms" } as CSSProperties} className="grid grid-cols-2 gap-1 border border-white/15 p-1 max-[479px]:w-full" role="tablist" aria-label="Rodzaj zestawu">
            {CENNIK.warianty.map((w) => (
              <button
                key={w.klucz}
                type="button"
                role="tab"
                aria-selected={w.klucz === klucz}
                aria-controls="pakiety"
                onClick={() => setKlucz(w.klucz)}
                className={`flex min-h-[48px] flex-col items-start justify-center px-4 py-2 text-left transition-colors ${
                  w.klucz === klucz ? "bg-turkus text-grafit" : "text-white/70 hover:text-white"
                }`}
                data-nasluch-klik={`cennik-${w.klucz}`}
              >
                <span className="text-[15px] leading-tight font-semibold">{w.nazwa}</span>
                <span className="font-mono text-[11px] tracking-[0.04em] opacity-75">{w.wskazniki}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 max-[991px]:grid-cols-1">
          {/* Zdjęcie zestawu */}
          <div data-pokaz className="relative col-span-4 overflow-hidden bg-white/[0.04] max-[991px]:col-span-1 max-[991px]:hidden">
            {CENNIK.warianty.map((w) => (
              <Obraz
                key={w.klucz}
                nazwa={w.zdjecie}
                opis={w.opisZdjecia}
                sizes="(min-width: 992px) 30vw, 0px"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${w.klucz === klucz ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="aspect-[3/4]" aria-hidden="true" />
          </div>

          {/* Pakiety */}
          <div id="pakiety" role="tabpanel" aria-label={`Ceny: ${wariant.nazwa.toLowerCase()}`} className="col-span-8 grid grid-cols-1 gap-3 max-[991px]:col-span-1">
            {wariant.pakiety.map((p, i) => (
              <article
                key={p.ilosc}
                data-pokaz
                style={{ "--opoznienie": `${i * 80}ms` } as CSSProperties}
                className={`flex flex-col border p-7 max-[767px]:p-5 ${i === 0 ? "border-white/25 bg-white/[0.07]" : "border-white/12 bg-white/[0.03]"}`}
              >
                <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-white/12 pb-5">
                  <div className="flex flex-col gap-1">
                    <p className="m-0 font-mono text-[12px] font-medium tracking-[0.1em] text-white/60 uppercase">
                      {wariant.nazwa} · {wariant.wskazniki}
                    </p>
                    <h3 className="naglowek-szeroki m-0 text-[26px] leading-tight max-[479px]:text-[22px]">{p.ilosc}</h3>
                  </div>
                  <p className="m-0 font-mono text-[clamp(36px,4vw,52px)] leading-none font-medium tracking-[-0.04em]">{p.cena}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 pt-5">
                  <p className="m-0 flex items-center gap-2 text-[15px] text-white/75">
                    <Check className="h-4 w-4 text-turkus" />
                    {p.zaZestaw ?? `${wariant.wskazniki} w zestawie`}
                  </p>
                  <a
                    href={linkZamowienia(wariant.pelna, p.ilosc)}
                    className={`przycisk !min-h-[46px] ${i === 0 ? "przycisk-turkus sciety-rog" : "przycisk-obrys-jasny"} max-[479px]:w-full`}
                    data-nasluch-klik={`zamow-${wariant.klucz}-${i + 1}`}
                  >
                    <Koperta />
                    Zamów mailem
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div data-pokaz className="mt-8 flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-t border-white/12 pt-7">
          <div className="flex max-w-[720px] flex-col gap-2 text-[15px] leading-[1.6] text-white/70">
            <p className="m-0">{t(CENNIK.opis)}</p>
            <p className="m-0">{t(CENNIK.wiecej)}</p>
          </div>
          <a href={KLIENT.telefonHref} className="przycisk przycisk-obrys-jasny" data-nasluch-klik="telefon-cennik">
            <Telefon />
            Zamów telefonicznie: {KLIENT.telefonPokaz}
          </a>
        </div>
      </div>
    </section>
  );
}
