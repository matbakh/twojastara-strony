import type { CSSProperties } from "react";
import { KLIENT } from "../klient";
import { t } from "../lib/tekst";
import { Dokument, Dymek, Koperta, Pinezka, StrzalkaUkos, Telefon } from "../ui/Ikony";

export function Kontakt() {
  return (
    <section id="kontakt" data-nasluch-sekcja="kontakt" className="relative overflow-hidden bg-turkus py-[120px] text-grafit max-[767px]:py-20">
      <div className="kontener grid grid-cols-12 items-end gap-x-8 gap-y-12 max-[991px]:grid-cols-1">
        <div className="col-span-7 flex flex-col items-start gap-6 max-[991px]:col-span-1">
          <span data-pokaz className="etykieta !text-grafit/75 before:!bg-grafit">
            Kontakt i zamówienia
          </span>
          <h2
            data-pokaz
            style={{ "--opoznienie": "80ms" } as CSSProperties}
            className="naglowek-szeroki m-0 text-[clamp(38px,5vw,68px)] leading-[1.0]"
          >
            Zamów albo zapytaj
          </h2>
          <p data-pokaz style={{ "--opoznienie": "140ms" } as CSSProperties} className="m-0 max-w-[560px] text-[18px] leading-[1.6] text-grafit/80">
            {t("Skontaktuj się z nami, aby złożyć szybkie zamówienie lub rozpocząć współpracę.")}
          </p>

          <a
            data-pokaz
            style={{ "--opoznienie": "200ms" } as CSSProperties}
            href={KLIENT.telefonHref}
            className="group mt-2 inline-flex items-center gap-4 font-mono text-[clamp(30px,4.4vw,58px)] leading-none font-medium tracking-[-0.04em] text-grafit no-underline"
            data-nasluch-klik="telefon-kontakt"
          >
            <span className="grid h-[1.2em] w-[1.2em] flex-none place-items-center bg-grafit text-turkus transition-transform duration-300 group-hover:-rotate-6">
              <Telefon className="h-[0.55em] w-[0.55em]" />
            </span>
            <span className="border-b-[3px] border-transparent transition-colors group-hover:border-grafit">{KLIENT.telefon}</span>
          </a>

          <div data-pokaz style={{ "--opoznienie": "260ms" } as CSSProperties} className="flex flex-wrap gap-2">
            <a href={KLIENT.emailHref} className="przycisk przycisk-grafit" data-nasluch-klik="mail-kontakt">
              <Koperta />
              {KLIENT.email}
            </a>
            <a href={KLIENT.smsHref} className="przycisk przycisk-obrys" data-nasluch-klik="sms-kontakt">
              <Dymek />
              SMS
            </a>
          </div>
        </div>

        <div data-pokaz style={{ "--opoznienie": "180ms" } as CSSProperties} className="col-span-5 flex flex-col gap-3 max-[991px]:col-span-1">
          <div className="flex flex-col gap-1.5 bg-white p-7 max-[767px]:p-6">
            <p className="naglowek-szeroki m-0 text-[20px]">{KLIENT.firma}</p>
            <p className="m-0 text-[16px] text-grafit/75">{KLIENT.adres}</p>
            <a
              href={KLIENT.mapa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-fit items-center gap-2 text-[15px] font-semibold no-underline hover:underline"
              data-nasluch-klik="mapa"
            >
              <Pinezka className="h-4 w-4" /> Zobacz na mapie Google <StrzalkaUkos className="h-3.5 w-3.5" />
            </a>
          </div>
          <a
            href={KLIENT.instrukcja}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 bg-grafit p-7 text-white no-underline max-[767px]:p-6"
            data-nasluch-klik="instrukcja-kontakt"
          >
            <span className="flex items-center gap-4">
              <span className="grid h-11 w-11 flex-none place-items-center bg-turkus text-grafit">
                <Dokument className="h-5 w-5" />
              </span>
              <span className="flex flex-col">
                <span className="naglowek-szeroki text-[18px]">Instrukcja montażu</span>
                <span className="font-mono text-[12px] text-white/60">PDF</span>
              </span>
            </span>
            <StrzalkaUkos className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
