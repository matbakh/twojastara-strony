import type { CSSProperties } from "react";
import { CENNIK, KLIENT } from "../klient";
import { t } from "../lib/tekst";
import { Dymek, Telefon } from "../ui/Ikony";

export function Cennik() {
  return (
    <section id="cennik" data-nasluch-sekcja="cennik" className="relative overflow-hidden bg-tlo py-[120px] max-[767px]:py-20">
      <div className="kontener grid grid-cols-12 gap-x-8 gap-y-12 max-[991px]:grid-cols-1">
        <div className="col-span-5 flex flex-col items-start gap-6 max-[991px]:col-span-1">
          <span data-pokaz className="etykieta">
            Cennik · ceny minimalne netto
          </span>
          <h2
            data-pokaz
            style={{ "--opoznienie": "80ms" } as CSSProperties}
            className="m-0 font-naglowek text-[clamp(40px,4.6vw,60px)] font-bold leading-[1.02] tracking-[-0.04em]"
          >
            Ile kosztuje wizyta?
          </h2>
          <p data-pokaz style={{ "--opoznienie": "160ms" } as CSSProperties} className="m-0 max-w-[460px] text-[18px] leading-[1.6] text-granat/70">
            {t(CENNIK.opis)}
          </p>
          <div data-pokaz style={{ "--opoznienie": "220ms" } as CSSProperties} className="flex flex-wrap gap-2">
            <a href={KLIENT.telefonHref} className="przycisk przycisk-granat" data-nasluch-klik="telefon-cennik">
              <Telefon />
              Ustal zakres: {KLIENT.telefonPokaz}
            </a>
            <a href={KLIENT.smsHref} className="przycisk przycisk-jasny" data-nasluch-klik="sms-cennik">
              <Dymek />
              SMS
            </a>
          </div>
        </div>

        <div className="col-span-7 grid grid-cols-2 gap-4 self-end max-[991px]:col-span-1 max-[600px]:grid-cols-1">
          {CENNIK.pozycje.map((p, i) => (
            <div
              key={p.dzien}
              data-pokaz
              style={{ "--opoznienie": `${120 + i * 100}ms` } as CSSProperties}
              className={`relative flex min-h-[280px] flex-col justify-between overflow-hidden p-8 max-[767px]:min-h-[220px] max-[767px]:p-6 ${
                i === 0 ? "bg-granat text-white" : "border border-granat/12 bg-white text-granat"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <p className={`m-0 font-mono text-[12px] font-medium uppercase tracking-[0.12em] ${i === 0 ? "text-white/70" : "text-granat/60"}`}>{p.dzien}</p>
                {i === 0 && <span className="h-2.5 w-2.5 bg-zolty" aria-hidden="true" />}
              </div>
              <div>
                <p className="m-0 flex items-baseline gap-2 font-naglowek font-bold tracking-[-0.05em]">
                  <span className="text-[24px] tracking-[-0.02em]">od</span>
                  <span className={`text-[clamp(56px,6vw,84px)] leading-none ${i === 0 ? "text-zolty" : ""}`}>{p.cena.replace(" zł", "")}</span>
                  <span className="text-[24px] tracking-[-0.02em]">zł</span>
                </p>
                <p className={`m-0 mt-3 text-[15px] leading-snug ${i === 0 ? "text-white/70" : "text-granat/65"}`}>{t(p.dopisek)}</p>
              </div>
            </div>
          ))}
          <p data-pokaz className="col-span-2 m-0 text-[14px] leading-relaxed text-granat/60 max-[600px]:col-span-1">
            {t("Niedziela: nieczynne. Koszt dalszych prac i materiałów potwierdzamy przed ich rozpoczęciem.")}
          </p>
        </div>
      </div>
    </section>
  );
}
