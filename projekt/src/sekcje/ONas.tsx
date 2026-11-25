import type { CSSProperties } from "react";
import { HISTORIA, KLIENT } from "../klient";
import { t } from "../lib/tekst";
import { Obraz } from "../ui/Obraz";

export function ONas() {
  return (
    <section id="o-nas" data-nasluch-sekcja="o-nas" className="bg-tlo py-[120px] max-[767px]:py-20">
      <div className="kontener grid grid-cols-12 items-start gap-x-10 gap-y-12 max-[991px]:grid-cols-1">
        <div data-pokaz className="relative col-span-5 max-[991px]:col-span-1 max-[991px]:max-w-[560px]">
          <div className="relative aspect-[4/5] overflow-hidden bg-tlo-2">
            <Obraz nazwa={HISTORIA.zdjecie} opis="Rozdzielnice i osprzęt na żółtej ścianie" sizes="(min-width: 992px) 40vw, 90vw" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-4 bg-granat px-6 py-5 text-white shadow-[0_24px_60px_-30px_rgb(23_36_44/0.8)] max-[767px]:right-3">
            <p className="m-0 font-naglowek text-[44px] font-bold leading-none tracking-[-0.05em] text-zolty">1988</p>
            <p className="m-0 mt-2 max-w-[180px] text-[13px] leading-snug text-white/70">pierwsze instalacje elektryczne współwłaściciela</p>
          </div>
        </div>

        <div className="col-span-7 flex flex-col items-start gap-6 lg:pl-6 max-[991px]:col-span-1">
          <span data-pokaz className="etykieta">
            Poznaj {KLIENT.firma.replace(" Technology", "")}
          </span>
          <h2
            data-pokaz
            style={{ "--opoznienie": "80ms" } as CSSProperties}
            className="m-0 font-naglowek text-[clamp(38px,4.4vw,58px)] font-bold leading-[1.04] tracking-[-0.04em]"
          >
            {t(HISTORIA.tytul)}
          </h2>
          <p data-pokaz style={{ "--opoznienie": "160ms" } as CSSProperties} className="m-0 max-w-[620px] text-[18px] leading-[1.65] text-granat/75">
            {t(HISTORIA.opis)} {t("Doradzamy indywidualnie, ustalamy zakres prac i pozostajemy w kontakcie także po ich zakończeniu.")}
          </p>

          <ol className="m-0 mt-4 grid w-full list-none grid-cols-2 gap-0 p-0 max-[480px]:grid-cols-1">
            {HISTORIA.kroki.map((k, i) => (
              <li
                key={k.rok}
                data-pokaz
                style={{ "--opoznienie": `${200 + i * 80}ms` } as CSSProperties}
                className="flex gap-5 border-t border-granat/15 py-5 pr-4"
              >
                <span className="w-[64px] flex-none font-mono text-[14px] font-medium text-granat">{k.rok}</span>
                <span className="flex flex-col gap-1">
                  <span className="font-naglowek text-[20px] font-bold tracking-[-0.02em]">{k.tytul}</span>
                  <span className="text-[15px] leading-snug text-granat/65">{t(k.opis)}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
