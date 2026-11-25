import type { CSSProperties } from "react";
import { KLIENT, PYTANIA } from "../klient";
import { t } from "../lib/tekst";
import { Plus, Telefon } from "../ui/Ikony";

export function Pytania() {
  return (
    <section id="pytania" data-nasluch-sekcja="pytania" className="bg-tlo py-[120px] max-[767px]:py-20">
      <div className="kontener grid grid-cols-12 gap-x-8 gap-y-10 max-[991px]:grid-cols-1">
        <div className="col-span-4 flex flex-col items-start gap-6 max-[991px]:col-span-1">
          <span data-pokaz className="etykieta">
            FAQ
          </span>
          <h2
            data-pokaz
            style={{ "--opoznienie": "80ms" } as CSSProperties}
            className="m-0 font-naglowek text-[clamp(40px,4.4vw,58px)] font-bold leading-[1.02] tracking-[-0.04em]"
          >
            Pytania przed rozmową
          </h2>
          <p data-pokaz style={{ "--opoznienie": "140ms" } as CSSProperties} className="m-0 text-[17px] leading-[1.6] text-granat/70">
            {t("Nie ma tu odpowiedzi na Twoje pytanie? Zadzwoń albo napisz SMS.")}
          </p>
          <a data-pokaz href={KLIENT.telefonHref} className="przycisk przycisk-zolty" data-nasluch-klik="telefon-faq">
            <Telefon />
            {KLIENT.telefonPokaz}
          </a>
        </div>

        <div className="col-span-8 max-[991px]:col-span-1">
          {PYTANIA.map((p, i) => (
            <details
              key={p.p}
              data-pokaz
              style={{ "--opoznienie": `${i * 60}ms` } as CSSProperties}
              className="group border-t border-granat/15 last:border-b"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="flex items-center justify-between gap-6 py-6 font-naglowek text-[22px] font-semibold leading-snug tracking-[-0.02em] max-[767px]:py-5 max-[767px]:text-[19px]">
                <span>{p.p}</span>
                <span className="grid h-10 w-10 flex-none place-items-center border border-granat/15 bg-white transition-colors group-open:bg-zolty">
                  <Plus className="h-5 w-5" />
                </span>
              </summary>
              <p className="m-0 max-w-[720px] pb-7 text-[17px] leading-[1.65] text-granat/75">{t(p.o)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
