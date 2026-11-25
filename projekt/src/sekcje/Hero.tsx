import type { CSSProperties } from "react";
import { HERO, KLIENT } from "../klient";
import { t } from "../lib/tekst";
import { useStanOtwarcia } from "../lib/useStan";
import { Dymek, Pinezka, Strzalka, Szewron, Telefon } from "../ui/Ikony";
import { Obraz } from "../ui/Obraz";

/**
 * Hero na wzór BYQ Supply „Construction Hero with Background Grid” (foster-and-reeves-hero-3):
 * tekst po lewej, po prawej kolumny zdjęć wjeżdżające od dołu (30% / 60% / 100% wysokości),
 * w tle pionowe linie siatki. Na tablecie i telefonie zdjęcia schodkowo pod tekstem.
 */
const KOLUMNY = [
  { plik: "rozdzielnica-biuro-magazyn", opis: "Rozdzielnica biura i magazynu", wysokosc: "27%", opoznienie: 300, szersza: true },
  { plik: "trzy-rozdzielnice", opis: "Trzy rozdzielnice z zabezpieczeniami", wysokosc: "60%", opoznienie: 150, szersza: false },
  { plik: "rozdzielnice-zolta-sciana", opis: "Rozdzielnice i osprzęt na żółtej ścianie", wysokosc: "100%", opoznienie: 0, szersza: true },
];

export function Hero() {
  const stan = useStanOtwarcia();
  const [linia1, linia2] = HERO.tytul;

  return (
    <section
      id="start"
      data-nasluch-sekcja="start"
      className="relative z-[2] overflow-hidden bg-tlo lg:min-h-[max(100svh,860px)]"
      style={{ paddingTop: "calc(var(--naglowek-h) + clamp(40px, 9vh, 96px))" }}
    >
      {/* Pionowe linie siatki w tle */}
      <div className="linie-kolumn pointer-events-none absolute inset-0 z-0 mx-6 max-[767px]:mx-0" aria-hidden="true" />

      {/* Kolumny zdjęć (komputer) */}
      <div className="absolute inset-0 z-[1] hidden grid-cols-4 px-6 lg:grid" aria-hidden="false">
        <div />
        {KOLUMNY.map((k, i) => (
          <div key={k.plik} className="flex h-full w-full items-end justify-center">
            <div
              data-pokaz
              className="overflow-hidden"
              style={
                {
                  width: k.szersza ? "calc(100% + 24px)" : "100%",
                  height: k.wysokosc,
                  "--opoznienie": `${k.opoznienie}ms`,
                  "--przesuniecie": "64px",
                } as CSSProperties
              }
            >
              <Obraz
                nazwa={k.plik}
                opis={k.opis}
                sizes="(min-width: 1024px) 26vw, 50vw"
                priorytet={i === 2}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="kontener relative z-[2] lg:max-w-[1800px] lg:px-8">
        <div className="flex max-w-[600px] flex-col gap-6 pb-12 max-[767px]:gap-4 lg:pb-[clamp(260px,34vh,340px)]">
          <a
            href="#o-nas"
            data-pokaz
            className="inline-flex w-fit items-center gap-2 bg-tlo-3/80 px-2.5 py-2 text-[12px] leading-4 tracking-[0.02em] text-granat no-underline backdrop-blur transition-colors hover:bg-zolty max-[767px]:text-[11px]"
          >
            <span className="font-mono font-medium uppercase tracking-[0.06em]">Pierwsze instalacje już w 1988 roku</span>
            <Szewron className="h-4 w-4 flex-none" />
          </a>

          <h1
            data-pokaz
            style={{ "--opoznienie": "100ms" } as CSSProperties}
            className="m-0 font-naglowek text-[clamp(46px,6.2vw,84px)] font-bold leading-[0.95] tracking-[-0.045em] text-granat"
          >
            <span className="block">{linia1}</span>
            <span className="relative inline-block">
              <span className="relative z-[1]">{linia2}</span>
              <span className="absolute inset-x-[-0.06em] bottom-[0.06em] z-0 h-[0.34em] bg-zolty" aria-hidden="true" />
            </span>
          </h1>

          <div data-pokaz style={{ "--opoznienie": "200ms" } as CSSProperties} className="flex flex-col items-start gap-6 max-[767px]:gap-5">
            <p className="m-0 max-w-[520px] text-[17px] leading-[1.6] text-granat/80 max-[767px]:text-[16px]">{t(HERO.opis)}</p>

            <div className="flex w-full flex-wrap gap-2 max-[479px]:grid max-[479px]:grid-cols-2">
              <a href={KLIENT.telefonHref} className="przycisk przycisk-zolty max-[479px]:px-3" data-nasluch-klik="telefon-hero">
                <Telefon />
                <span className="max-[479px]:hidden">Zadzwoń: {KLIENT.telefonPokaz}</span>
                <span className="hidden max-[479px]:inline">Zadzwoń</span>
              </a>
              <a href={KLIENT.smsHref} className="przycisk przycisk-jasny max-[479px]:px-3" data-nasluch-klik="sms-hero">
                <Dymek />
                Napisz SMS
              </a>
              <a href="#cennik" className="przycisk przycisk-jasny max-[767px]:hidden">
                Cennik
                <Strzalka />
              </a>
            </div>

            <ul className="m-0 flex list-none flex-wrap items-center gap-x-5 gap-y-2 p-0 text-[14px] text-granat/75">
              <li className="flex items-center gap-2">
                <span className={`kropka ${stan.otwarte ? "otwarte" : ""}`} aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-granat">{stan.tekst}</strong> · {stan.podtekst}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Pinezka className="h-4 w-4 text-granat/60" />
                {KLIENT.obszar}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Zdjęcia schodkowo (tablet i telefon) */}
      <div className="relative z-[1] grid h-[clamp(240px,62vw,420px)] grid-cols-3 items-end lg:hidden" aria-hidden="false">
        {KOLUMNY.map((k) => (
          <div
            key={k.plik}
            data-pokaz
            className="overflow-hidden"
            style={{ height: k.wysokosc === "27%" ? "38%" : k.wysokosc === "60%" ? "68%" : "100%", "--opoznienie": `${k.opoznienie}ms` } as CSSProperties}
          >
            <Obraz nazwa={k.plik} opis={k.opis} sizes="34vw" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
