import type { CSSProperties } from "react";
import { FAKTY } from "../klient";
import { t } from "../lib/tekst";

/** Pasek faktów jak odczyt z przyrządu: wartości w kroju mono, cienkie pionowe linie. */
export function Fakty() {
  return (
    <section aria-label="Strażnik Ciśnienia w liczbach" className="border-b border-grafit/10 bg-mgla">
      <div className="kontener">
        <dl className="m-0 grid grid-cols-4 max-[991px]:grid-cols-2">
          {FAKTY.map((f, i) => (
            <div
              key={f.wartosc}
              data-pokaz
              style={{ "--opoznienie": `${i * 80}ms` } as CSSProperties}
              className="flex flex-col gap-2 border-grafit/12 py-8 pr-6 max-[767px]:py-6 max-[767px]:pr-3 [&:not(:first-child)]:border-l [&:not(:first-child)]:pl-6 max-[767px]:[&:not(:first-child)]:pl-4 max-[991px]:[&:nth-child(3)]:border-l-0 max-[991px]:[&:nth-child(3)]:pl-0 max-[991px]:[&:nth-child(-n+2)]:border-b"
            >
              <dt className="order-2 m-0 text-[14px] leading-snug text-grafit/65">{t(f.opis)}</dt>
              <dd className="order-1 m-0 font-mono text-[clamp(24px,2.6vw,36px)] leading-none font-medium tracking-[-0.04em] text-grafit">
                {f.wartosc}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
