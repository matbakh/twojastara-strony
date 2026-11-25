import type { CSSProperties } from "react";
import { WSPOLPRACA } from "../klient";
import { t } from "../lib/tekst";

export function Wspolpraca() {
  return (
    <section id="wspolpraca" data-nasluch-sekcja="wspolpraca" className="relative overflow-hidden bg-zolty py-[110px] text-granat max-[767px]:py-20">
      <div className="kontener">
        <div className="mb-14 grid grid-cols-12 items-end gap-x-8 gap-y-6 max-[991px]:grid-cols-1 max-[767px]:mb-10">
          <h2
            data-pokaz
            className="col-span-7 m-0 font-naglowek text-[clamp(40px,4.6vw,60px)] font-bold leading-[1.02] tracking-[-0.04em] max-[991px]:col-span-1"
          >
            Jak przebiega współpraca?
          </h2>
          <p data-pokaz style={{ "--opoznienie": "100ms" } as CSSProperties} className="col-span-5 m-0 text-[18px] leading-[1.6] text-granat/80 max-[991px]:col-span-1">
            {t("Najpierw ustalamy, jak instalacja ma działać. Potem planujemy prace i dobieramy rozwiązania do budynku.")}
          </p>
        </div>

        <ol className="m-0 grid list-none grid-cols-4 gap-0 max-[991px]:gap-x-8 border-t-2 border-granat p-0 max-[991px]:grid-cols-2 max-[991px]:border-t-0 max-[600px]:grid-cols-1">
          {WSPOLPRACA.map((k, i) => (
            <li
              key={k.tytul}
              data-pokaz
              style={{ "--opoznienie": `${i * 90}ms` } as CSSProperties}
              className="relative flex flex-col gap-4 border-granat/25 pt-7 pr-8 pb-2 max-[991px]:border-t-2 max-[991px]:border-t-granat max-[991px]:pb-8 max-[600px]:pr-0 [&:not(:first-child)]:min-[992px]:border-l [&:not(:first-child)]:min-[992px]:pl-7"
            >
              <span className={`absolute -top-[7px] left-0 h-3 w-3 bg-granat ${i === 0 ? "" : "min-[992px]:-left-[6px]"}`} aria-hidden="true" />
              <span className="font-mono text-[13px] font-medium tracking-[0.08em]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="m-0 font-naglowek text-[28px] font-bold leading-tight tracking-[-0.03em]">{k.tytul}</h3>
              <p className="m-0 text-[16px] leading-[1.6] text-granat/80">{t(k.opis)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
