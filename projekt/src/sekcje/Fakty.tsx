import type { CSSProperties } from "react";
import { FAKTY } from "../klient";
import { t } from "../lib/tekst";

export function Fakty() {
  return (
    <section aria-label="MID&DIN w liczbach" className="na-ciemnym ziarno relative bg-granat text-white">
      <div className="kontener">
        <dl className="m-0 grid grid-cols-4 max-[991px]:grid-cols-2">
          {FAKTY.map((f, i) => (
            <div
              key={f.wartosc}
              data-pokaz
              style={{ "--opoznienie": `${i * 80}ms` } as CSSProperties}
              className="flex flex-col gap-2 border-white/10 py-9 pr-6 max-[767px]:py-7 [&:not(:first-child)]:border-l [&:not(:first-child)]:pl-6 max-[991px]:[&:nth-child(3)]:border-l-0 max-[991px]:[&:nth-child(3)]:pl-0 max-[991px]:[&:nth-child(-n+2)]:border-b"
            >
              <dt className="order-2 m-0 text-[14px] leading-snug text-white/65">{t(f.opis)}</dt>
              <dd className="order-1 m-0 font-naglowek text-[clamp(30px,3.4vw,48px)] font-bold leading-none tracking-[-0.04em] text-zolty">{f.wartosc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
