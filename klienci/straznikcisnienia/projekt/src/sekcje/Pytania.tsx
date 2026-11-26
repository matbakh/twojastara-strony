import type { CSSProperties } from "react";
import { KLIENT, PYTANIA } from "../klient";
import { t } from "../lib/tekst";
import { Plus, Telefon } from "../ui/Ikony";

export function Pytania() {
  return (
    <section id="pytania" data-nasluch-sekcja="pytania" className="bg-white py-[120px] max-[767px]:py-20">
      <div className="kontener grid grid-cols-12 gap-x-8 gap-y-10 max-[991px]:grid-cols-1">
        <div className="col-span-4 flex flex-col items-start gap-6 self-start max-[991px]:col-span-1 lg:sticky" style={{ top: "calc(var(--demo-h) + var(--naglowek-h) + 32px)" }}>
          <span data-pokaz className="etykieta">
            FAQ
          </span>
          <h2
            data-pokaz
            style={{ "--opoznienie": "80ms" } as CSSProperties}
            className="naglowek-szeroki m-0 text-[clamp(36px,4.2vw,56px)] leading-[1.02]"
          >
            Pytania i&nbsp;odpowiedzi
          </h2>
          <p data-pokaz style={{ "--opoznienie": "140ms" } as CSSProperties} className="m-0 text-[17px] leading-[1.6] text-grafit/70">
            {t("Nie znalazłeś odpowiedzi? Zapytaj: zadzwoń albo napisz.")}
          </p>
          <a data-pokaz href={KLIENT.telefonHref} className="przycisk przycisk-grafit" data-nasluch-klik="telefon-faq">
            <Telefon />
            {KLIENT.telefonPokaz}
          </a>
        </div>

        <div className="col-span-8 max-[991px]:col-span-1">
          {PYTANIA.map((p, i) => (
            <details
              key={p.p}
              data-pokaz
              style={{ "--opoznienie": `${i * 50}ms` } as CSSProperties}
              className="group border-t border-grafit/12 last:border-b"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="naglowek-szeroki flex items-center justify-between gap-6 py-6 text-[21px] leading-snug max-[767px]:py-5 max-[767px]:text-[18px]">
                <span>{p.p}</span>
                <span className="grid h-10 w-10 flex-none place-items-center border border-grafit/15 transition-colors group-open:border-turkus group-open:bg-turkus">
                  <Plus className="h-5 w-5" />
                </span>
              </summary>
              <p className="m-0 max-w-[720px] pb-7 text-[17px] leading-[1.65] text-grafit/72">{t(p.o)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
