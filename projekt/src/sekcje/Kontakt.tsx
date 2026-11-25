import type { CSSProperties } from "react";
import { KLIENT, ZAPYTANIE } from "../klient";
import { listaGodzin } from "../lib/godziny";
import { t } from "../lib/tekst";
import { useStanOtwarcia } from "../lib/useStan";
import { Dymek, Facebook, Gwiazdka, Pinezka, StrzalkaUkos, Telefon, Zegar } from "../ui/Ikony";

export function Kontakt() {
  const stan = useStanOtwarcia();
  const godziny = listaGodzin();

  return (
    <section id="kontakt" data-nasluch-sekcja="kontakt" className="bg-[#faf9f5] py-[120px] max-[767px]:py-20">
      <div className="kontener grid grid-cols-12 gap-x-8 gap-y-10 max-[991px]:grid-cols-1">
        <div className="col-span-7 flex flex-col items-start gap-6 max-[991px]:col-span-1">
          <span data-pokaz className="etykieta">
            Kontakt
          </span>
          <h2
            data-pokaz
            style={{ "--opoznienie": "80ms" } as CSSProperties}
            className="m-0 font-naglowek text-[clamp(40px,4.8vw,64px)] font-bold leading-[1.02] tracking-[-0.04em]"
          >
            Opowiedz nam o&nbsp;swoim projekcie
          </h2>

          <a
            data-pokaz
            style={{ "--opoznienie": "140ms" } as CSSProperties}
            href={KLIENT.telefonHref}
            className="group mt-2 inline-flex items-center gap-4 font-naglowek text-[clamp(34px,4.4vw,58px)] font-bold leading-none tracking-[-0.04em] text-granat no-underline"
            data-nasluch-klik="telefon-kontakt"
          >
            <span className="grid h-[1.25em] w-[1.25em] place-items-center bg-zolty transition-transform duration-300 group-hover:-rotate-6">
              <Telefon className="h-[0.55em] w-[0.55em]" />
            </span>
            <span className="border-b-[3px] border-transparent transition-colors group-hover:border-zolty">{KLIENT.telefon}</span>
          </a>

          <div data-pokaz style={{ "--opoznienie": "200ms" } as CSSProperties} className="flex flex-wrap gap-2">
            <a href={KLIENT.smsHref} className="przycisk przycisk-granat" data-nasluch-klik="sms-kontakt">
              <Dymek />
              Napisz SMS z gotowym szablonem
            </a>
            <a href={KLIENT.mapa} target="_blank" rel="noopener noreferrer" className="przycisk przycisk-jasny">
              <Pinezka />
              Mapa
            </a>
          </div>

          <div data-pokaz style={{ "--opoznienie": "260ms" } as CSSProperties} className="mt-6 grid w-full grid-cols-2 gap-4 max-[600px]:grid-cols-1">
            <div className="border border-granat/12 bg-white p-6">
              <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px]">
                <Zegar className="h-5 w-5 text-granat/70" />
                <span className={`kropka ${stan.otwarte ? "otwarte" : ""}`} aria-hidden="true" />
                <strong className="font-semibold">{stan.tekst}</strong>
                <span className="text-granat/65">· {stan.podtekst}</span>
              </p>
              <ul className="m-0 mt-4 list-none p-0 text-[15px]">
                {godziny.map((g) => (
                  <li
                    key={g.dzien}
                    className={`flex justify-between gap-4 border-t border-granat/8 py-2 first:border-t-0 ${g.dzis ? "font-semibold text-granat" : "text-granat/70"}`}
                  >
                    <span>
                      {g.dzien}
                      {g.dzis && <span className="ml-2 bg-zolty px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-granat">dziś</span>}
                    </span>
                    <span className="tabular-nums">{g.godziny}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-between gap-6 border border-granat/12 bg-white p-6">
              <div className="flex flex-col gap-1.5">
                <p className="m-0 font-naglowek text-[20px] font-bold tracking-[-0.02em]">{KLIENT.firmaPelna}</p>
                <p className="m-0 text-[15px] text-granat/75">{KLIENT.adres}</p>
                <p className="m-0 text-[13px] text-granat/55">
                  {KLIENT.adresOpis} · NIP {KLIENT.nip}
                </p>
                <p className="m-0 mt-2 flex items-center gap-2 text-[15px] text-granat/75">
                  <Pinezka className="h-4 w-4" />
                  {KLIENT.obszar}
                </p>
              </div>
              <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[15px]">
                <li>
                  <a href={KLIENT.mapa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium no-underline hover:underline">
                    <Pinezka className="h-4 w-4" /> Zobacz w Google Maps <StrzalkaUkos className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a href={KLIENT.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium no-underline hover:underline">
                    <Facebook className="h-4 w-4" /> Znajdź nas na Facebooku <StrzalkaUkos className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a href={KLIENT.opinieGoogle} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium no-underline hover:underline">
                    <Gwiazdka className="h-4 w-4" /> Zostaw opinię w Google <StrzalkaUkos className="h-3.5 w-3.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <aside
          data-pokaz
          style={{ "--opoznienie": "160ms", top: "calc(var(--demo-h) + var(--naglowek-h) + 24px)" } as CSSProperties}
          className="na-ciemnym ziarno col-span-5 flex flex-col gap-8 self-start bg-granat p-10 text-white max-[991px]:col-span-1 max-[767px]:p-7 lg:sticky"
          aria-labelledby="zapytanie-tytul"
        >
          <div className="flex flex-col gap-4">
            <span className="etykieta w-fit">Wycena</span>
            <h3 id="zapytanie-tytul" className="m-0 font-naglowek text-[34px] font-bold leading-[1.08] tracking-[-0.035em]">
              Przygotuj zapytanie
            </h3>
            <p className="m-0 text-[16px] leading-relaxed text-white/70">{t("Te trzy informacje pozwolą szybciej ustalić zakres i termin wizyty.")}</p>
          </div>
          <ol className="m-0 flex list-none flex-col gap-0 p-0">
            {ZAPYTANIE.map((z, i) => (
              <li key={z.tytul} className="flex gap-5 border-t border-white/12 py-5">
                <span className="grid h-8 w-8 flex-none place-items-center bg-zolty font-mono text-[13px] font-medium text-granat">{i + 1}</span>
                <span className="flex flex-col gap-1">
                  <span className="font-naglowek text-[19px] font-bold tracking-[-0.02em]">{z.tytul}</span>
                  <span className="text-[15px] leading-snug text-white/70">{t(z.opis)}</span>
                </span>
              </li>
            ))}
          </ol>
          <a href={KLIENT.smsHref} className="przycisk przycisk-zolty w-full" data-nasluch-klik="sms-zapytanie">
            <Dymek />
            Wyślij te informacje SMS-em
          </a>
        </aside>
      </div>
    </section>
  );
}
