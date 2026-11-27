import { KLIENT, MSZE } from "../klient";
import { t } from "../lib/tekst";
import { Logo } from "../logo/Logo";
import { Facebook, Telefon } from "../ui/Ikony";
import { MENU } from "./Naglowek";

export function Stopka() {
  const rok = new Date().getFullYear();
  return (
    <footer className="na-ciemnym ziarno bg-atrament text-white">
      <div className="kontener grid grid-cols-12 gap-x-8 gap-y-10 pt-20 pb-12 max-[991px]:grid-cols-2 max-[767px]:pt-14 max-[600px]:grid-cols-1">
        <div className="col-span-5 flex flex-col items-start gap-5 max-[991px]:col-span-2 max-[600px]:col-span-1">
          <Logo ciemne />
          <p className="m-0 max-w-[380px] text-[15px] leading-relaxed text-white/65">
            {KLIENT.firmaPelna}. {KLIENT.diecezja}.
          </p>
          <a href={KLIENT.telefonHref} className="przycisk przycisk-zloty" data-nasluch-klik="telefon-stopka">
            <Telefon />
            {KLIENT.telefonPokaz}
          </a>
        </div>

        <nav aria-label="Na skróty" className="col-span-3 max-[991px]:col-span-1">
          <p className="m-0 mb-4 text-[12px] font-semibold tracking-[0.16em] text-zloto-jasne uppercase">Na skróty</p>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px]">
            {MENU.map((m) => (
              <li key={m.href}>
                <a href={m.href} className="text-white/80 no-underline hover:text-zloto-jasne">
                  {m.tekst}
                </a>
              </li>
            ))}
            <li>
              <a href="#pytania" className="text-white/80 no-underline hover:text-zloto-jasne">
                Pytania
              </a>
            </li>
          </ul>
        </nav>

        <div className="col-span-4 max-[991px]:col-span-1">
          <p className="m-0 mb-4 text-[12px] font-semibold tracking-[0.16em] text-zloto-jasne uppercase">Kancelaria</p>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px] text-white/80">
            <li>
              {MSZE.kancelaria.dni}, {MSZE.kancelaria.godziny}
            </li>
            <li>
              <a href={KLIENT.telefonHref} className="no-underline hover:text-zloto-jasne">
                {KLIENT.telefonPokaz}
              </a>
            </li>
            <li>
              <a href={`mailto:${KLIENT.email}`} className="no-underline hover:text-zloto-jasne">
                {KLIENT.email}
              </a>
            </li>
            <li>{KLIENT.adres}</li>
            <li>
              <a href={KLIENT.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 no-underline hover:text-zloto-jasne">
                <Facebook className="h-4 w-4" /> Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="kontener flex flex-col gap-3 py-6 text-[13px] text-white/55">
          <p className="m-0 max-w-[900px]">
            {t(
              "Przetwarzanie danych osobowych w parafii opiera się na Kodeksie Prawa Kanonicznego i Dekrecie ogólnym Konferencji Episkopatu Polski w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych w Kościele katolickim (KEP, 13.03.2018 r.).",
            )}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="m-0">
              © {rok} {KLIENT.firmaStopka} · NIP {KLIENT.nip}
            </p>
            <a href={`${KLIENT.obecnaStrona}/polityka-prywatnosci`} target="_blank" rel="noopener noreferrer" className="text-white/55 hover:text-white">
              Polityka prywatności
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
