import type { CSSProperties } from "react";
import { USLUGI } from "../klient";
import { t } from "../lib/tekst";
import { Strzalka } from "../ui/Ikony";
import { Obraz } from "../ui/Obraz";

/**
 * Usługi na wzór BYQ Supply „Services Grid with Hover Image Reveal” (truebase-cms-grid-5):
 * wyśrodkowany nagłówek, siatka 2×2 kart; na komputerze po najechaniu karta odsłania zdjęcie
 * z przyciemnieniem i jasnym tekstem. Na tablecie i telefonie zdjęcie jest stale nad treścią karty.
 */
export function Uslugi() {
  return (
    <section id="uslugi" data-nasluch-sekcja="uslugi" className="bg-[#faf9f5] py-[120px] max-[767px]:py-20">
      <div className="kontener">
        <div className="mx-auto mb-20 flex max-w-[720px] flex-col items-center gap-6 text-center max-[767px]:mb-12 max-[767px]:gap-5">
          <span data-pokaz className="etykieta">
            Usługi
          </span>
          <h2
            data-pokaz
            style={{ "--opoznienie": "80ms" } as CSSProperties}
            className="m-0 font-naglowek text-[clamp(40px,5vw,64px)] font-bold leading-[1.02] tracking-[-0.04em]"
          >
            Elektryka i&nbsp;monitoring
          </h2>
          <p data-pokaz style={{ "--opoznienie": "160ms" } as CSSProperties} className="m-0 text-[19px] leading-[1.5] text-granat/65 max-[767px]:text-[17px]">
            {t("Zaczynamy od drobnych napraw i wymian. Proste zlecenia zwykle planujemy na 1–2 godziny, zależnie od zakresu.")}
          </p>
        </div>

        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-4 max-[767px]:grid-cols-1">
          {USLUGI.map((u, i) => (
            <article
              key={u.nr}
              data-pokaz
              style={{ "--opoznienie": `${(i % 2) * 90}ms` } as CSSProperties}
              className="group relative isolate flex min-h-[25.3rem] flex-col overflow-hidden rounded-lg bg-tlo text-granat transition-colors duration-[400ms] max-[991px]:min-h-0 lg:hover:text-[#faf9f5]"
            >
              {/* Zdjęcie: na komputerze odsłaniane po najechaniu, niżej zawsze widoczne u góry karty */}
              <div className="relative aspect-[16/9] overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto lg:opacity-0 lg:transition-opacity lg:duration-[400ms] lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
                <Obraz nazwa={u.zdjecie} opis={u.tytul} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover" />
                <div className="absolute inset-0 hidden bg-granat/70 lg:block" aria-hidden="true" />
              </div>

              <div className="relative z-[1] flex flex-1 flex-col justify-between gap-16 p-8 max-[991px]:gap-8 max-[767px]:p-6">
                <div className="flex items-start justify-between gap-6">
                  <h3 className="m-0 font-naglowek text-[34px] font-semibold leading-[1.15] tracking-[-0.035em] max-[767px]:text-[28px]">{u.tytul}</h3>
                  <span className="font-mono text-[13px] font-medium text-granat/45 transition-colors duration-[400ms] lg:group-hover:text-zolty">{u.nr}</span>
                </div>
                <div className="flex flex-col items-start gap-7 max-[767px]:gap-5">
                  <p className="m-0 text-[19px] leading-[1.5] text-granat/65 transition-colors duration-[400ms] max-[767px]:text-[17px] lg:group-hover:text-[#faf9f5]/85">
                    {t(u.opis)}
                  </p>
                  <p className="m-0 border-l-2 border-zolty pl-3 text-[15px] leading-snug text-granat/80 transition-colors duration-[400ms] lg:group-hover:text-[#faf9f5]">
                    {t(u.wskazowka)}
                  </p>
                  <a
                    href="#kontakt"
                    className="inline-flex items-center gap-2 text-[16px] font-semibold text-inherit no-underline transition-opacity hover:opacity-80"
                    data-nasluch-klik={`usluga-${u.nr}`}
                  >
                    <Strzalka className="h-4 w-4" />
                    Zapytaj o termin
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
