import type { CSSProperties } from "react";
import { HERO, KLIENT, MSZE } from "../klient";
import { t } from "../lib/tekst";
import { Obraz } from "../ui/Obraz";
import { Strzalka, Telefon } from "../ui/Ikony";

/**
 * Pierwszy ekran według BYQ Supply babka-hero-3 (Full-Bleed Hero with Meta Rows):
 * zdjęcie na całą szerokość, nagłówek przy dolnej krawędzi, pod nim wiersze klucz-wartość
 * (tu godziny Mszy Świętych), etapowe wejście: etykieta 0 ms, nagłówek 150 ms, wiersze co 100 ms od 300 ms.
 */
function opoznienie(ms: number): CSSProperties {
  return { "--opoznienie": `${ms}ms` } as CSSProperties;
}

export function Hero() {
  return (
    <section id="start" className="relative">
      <div className="relative flex min-h-[calc(100svh-var(--demo-h))] flex-col justify-end overflow-hidden bg-atrament">
        <Obraz
          nazwa={HERO.zdjecie.plik}
          opis={HERO.zdjecie.opis}
          priorytet
          sizes="100vw"
          className="hero-zdjecie absolute inset-0 h-full w-full object-cover object-[60%_45%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgb(20 16 10 / 0.9) 0%, rgb(20 16 10 / 0.62) 38%, rgb(20 16 10 / 0.2) 70%, rgb(20 16 10 / 0.38) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="kontener relative z-[1] pt-[calc(var(--naglowek-h)+56px)] pb-14 max-[767px]:pt-[calc(var(--naglowek-h)+40px)] max-[767px]:pb-9">
          <div className="max-w-[1000px]">
            <p className="wejscie etykieta m-0 !text-zloto-jasne [text-shadow:0_1px_14px_rgb(0_0_0/0.75)]" style={opoznienie(0)}>
              {HERO.znacznik}
            </p>
            <h1 className="wejscie tytul m-0 mt-5 text-[clamp(2rem,5.2vw,4.5rem)] text-white" style={opoznienie(150)}>
              <span className="mb-2 block text-[0.4em] tracking-[0.22em] text-white/80">Parafia</span>
              {t("Świętych Apostołów Piotra i Pawła")} <span className="whitespace-nowrap text-zloto-jasne">{t("w Łążynie II")}</span>
            </h1>
          </div>

          <div className="mt-10 grid gap-9 max-[767px]:mt-8 lg:grid-cols-[minmax(0,700px)_auto] lg:items-end lg:justify-between">
            <div>
              <dl className="m-0" aria-label="Godziny Mszy Świętych">
                {HERO.wiersze.map((w, i) => (
                  <div
                    key={w.etykieta}
                    className="wejscie flex items-baseline justify-between gap-8 border-t border-white/20 py-4 max-[767px]:gap-4 max-[767px]:py-3"
                    style={opoznienie(300 + i * 100)}
                  >
                    <dt className="text-[15px] text-white/70 max-[767px]:text-[14px]">{w.etykieta}</dt>
                    <dd className="m-0 text-right text-[18px] font-semibold tracking-[0.01em] text-white max-[767px]:text-[16px]">{t(w.wartosc)}</dd>
                  </div>
                ))}
              </dl>
              <p className="wejscie m-0 border-t border-white/20 pt-4 text-[13px] text-white/60" style={opoznienie(700)}>
                {t(`Niedzielne godziny obowiązują ${MSZE.od}. Zmiany podajemy w ogłoszeniach duszpasterskich.`)}
              </p>
            </div>

            <div className="wejscie flex flex-wrap gap-3 lg:justify-end" style={opoznienie(800)}>
              <a href={KLIENT.telefonHref} className="przycisk przycisk-zloty" data-nasluch-klik="telefon-hero">
                <Telefon />
                Zadzwoń: {KLIENT.telefonPokaz}
              </a>
              <a href="#msze" className="przycisk przycisk-obrys-jasny" data-nasluch-klik="hero-msze">
                Msze i kancelaria
                <Strzalka />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
