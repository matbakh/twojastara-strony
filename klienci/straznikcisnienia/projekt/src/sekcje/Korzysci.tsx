import type { CSSProperties } from "react";
import { CENNIK, KORZYSCI } from "../klient";
import { t } from "../lib/tekst";
import { IKONY, Strzalka, type NazwaIkony } from "../ui/Ikony";
import { Obraz } from "../ui/Obraz";

/** Korzyści w siatce „bento”: jedna duża karta ze zdjęciem, małe karty z ikonami, szeroka karta i karta z ceną. */
export function Korzysci() {
  const auto = CENNIK.warianty.find((w) => w.klucz === "auto");
  const rower = CENNIK.warianty.find((w) => w.klucz === "rower");

  return (
    <section id="korzysci" data-nasluch-sekcja="korzysci" className="bg-mgla py-[120px] max-[767px]:py-20">
      <div className="kontener">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 max-[767px]:mb-9">
          <div className="flex max-w-[720px] flex-col items-start gap-6">
            <span data-pokaz className="etykieta">
              Korzyści
            </span>
            <h2
              data-pokaz
              style={{ "--opoznienie": "80ms" } as CSSProperties}
              className="naglowek-szeroki m-0 text-[clamp(36px,4.4vw,60px)] leading-[1.02]"
            >
              Prosty sposób na&nbsp;bezpieczną podróż
            </h2>
          </div>
          <p data-pokaz style={{ "--opoznienie": "140ms" } as CSSProperties} className="m-0 max-w-[400px] text-[17px] leading-[1.6] text-grafit/70">
            {t("Odpowiednie ciśnienie jest bardzo istotnym elementem codziennego użytkowania pojazdu.")}
          </p>
        </div>

        <div className="grid grid-flow-row-dense grid-cols-4 gap-3 max-[991px]:grid-cols-2 max-[600px]:grid-cols-1">
          {/* Duża karta */}
          <article
            data-pokaz
            className="na-ciemnym col-span-2 row-span-2 flex flex-col overflow-hidden bg-grafit text-white max-[991px]:row-span-1 max-[600px]:col-span-1"
          >
            <div className="relative aspect-[16/7] overflow-hidden max-[991px]:aspect-[16/6]">
              <Obraz
                nazwa={KORZYSCI.duza.zdjecie.plik}
                opis={KORZYSCI.duza.zdjecie.opis}
                sizes="(min-width: 992px) 50vw, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-end gap-4 p-8 max-[767px]:p-6">
              <h3 className="naglowek-szeroki m-0 max-w-[460px] text-[clamp(28px,2.8vw,40px)] leading-[1.05]">{KORZYSCI.duza.tytul}</h3>
              <p className="m-0 max-w-[520px] text-[17px] leading-[1.6] text-white/72">{t(KORZYSCI.duza.opis)}</p>
            </div>
          </article>

          {/* Małe karty */}
          {KORZYSCI.male.map((k, i) => {
            const Ikona = IKONY[k.ikona as NazwaIkony];
            return (
              <article
                key={k.tytul}
                data-pokaz
                style={{ "--opoznienie": `${(i % 2) * 80}ms` } as CSSProperties}
                className="group flex min-h-[230px] flex-col justify-between gap-8 bg-white p-7 transition-colors duration-300 hover:bg-turkus-jasny max-[767px]:min-h-0 max-[767px]:p-6"
              >
                <span className="grid h-12 w-12 place-items-center bg-grafit text-turkus transition-transform duration-300 group-hover:-rotate-6">
                  <Ikona className="h-6 w-6" />
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="naglowek-szeroki m-0 text-[21px] leading-tight">{k.tytul}</h3>
                  <p className="m-0 text-[15px] leading-[1.55] text-grafit/70">{t(k.opis)}</p>
                </div>
              </article>
            );
          })}

          {/* Szeroka karta ze zdjęciem opony */}
          <article
            data-pokaz
            className="na-ciemnym relative col-span-2 flex min-h-[230px] flex-col justify-end overflow-hidden bg-grafit p-7 text-white max-[600px]:col-span-1 max-[767px]:p-6"
          >
            <Obraz
              nazwa={KORZYSCI.szeroka.zdjecie.plik}
              opis={KORZYSCI.szeroka.zdjecie.opis}
              sizes="(min-width: 992px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-grafit via-grafit/50 to-transparent" aria-hidden="true" />
            <div className="relative flex flex-col gap-2">
              <h3 className="naglowek-szeroki m-0 text-[clamp(22px,2.2vw,30px)] leading-tight">{KORZYSCI.szeroka.tytul}</h3>
              <p className="m-0 text-[15px] leading-[1.55] text-white/75">{t(KORZYSCI.szeroka.opis)}</p>
            </div>
          </article>

          {/* Karta z ceną */}
          <a
            data-pokaz
            href="#cennik"
            className="group flex min-h-[230px] flex-col justify-between gap-6 bg-turkus p-7 text-grafit no-underline transition-colors duration-300 hover:bg-[#45c0d7] max-[767px]:min-h-0 max-[767px]:p-6"
            data-nasluch-klik="cennik-korzysci"
          >
            <span className="font-mono text-[12px] font-medium tracking-[0.08em] uppercase">Jeden zestaw</span>
            <span className="flex flex-col gap-1">
              <span className="font-mono text-[15px]">do auta</span>
              <span className="font-mono text-[40px] leading-none font-medium tracking-[-0.04em]">{auto?.pakiety[0]?.cena}</span>
              <span className="mt-1 font-mono text-[15px]">do roweru {rower?.pakiety[0]?.cena}</span>
            </span>
            <span className="inline-flex items-center gap-2 text-[16px] font-semibold">
              Zobacz cennik
              <Strzalka className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
