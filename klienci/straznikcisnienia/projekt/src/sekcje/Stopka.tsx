import { KLIENT } from "../klient";
import { Logo } from "../logo/Logo";
import { Telefon } from "../ui/Ikony";
import { MENU } from "./Naglowek";

export function Stopka() {
  const rok = new Date().getFullYear();
  return (
    <footer className="na-ciemnym bg-grafit text-white">
      <div className="kontener grid grid-cols-12 gap-x-8 gap-y-10 pt-20 pb-12 max-[991px]:grid-cols-2 max-[600px]:grid-cols-1 max-[767px]:pt-14">
        <div className="col-span-5 flex flex-col items-start gap-5 max-[991px]:col-span-2 max-[600px]:col-span-1">
          <Logo ciemne />
          <p className="m-0 max-w-[360px] text-[15px] leading-relaxed text-white/65">
            Wizualny wskaźnik ciśnienia w oponach auta, motocykla, skutera i roweru. Jedyny producent i dystrybutor w Polsce.
          </p>
          <a href={KLIENT.telefonHref} className="przycisk przycisk-turkus" data-nasluch-klik="telefon-stopka">
            <Telefon />
            {KLIENT.telefon}
          </a>
        </div>

        <nav aria-label="Na skróty" className="col-span-3 max-[991px]:col-span-1">
          <p className="m-0 mb-4 font-mono text-[12px] tracking-[0.12em] text-white/50 uppercase">Na skróty</p>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px]">
            {MENU.map((m) => (
              <li key={m.href}>
                <a href={m.href} className="text-white/80 no-underline hover:text-turkus">
                  {m.tekst}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-4 max-[991px]:col-span-1">
          <p className="m-0 mb-4 font-mono text-[12px] tracking-[0.12em] text-white/50 uppercase">Kontakt</p>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px] text-white/80">
            <li>
              <a href={KLIENT.telefonHref} className="no-underline hover:text-turkus">
                {KLIENT.telefon}
              </a>
            </li>
            <li>
              <a href={KLIENT.emailHref} className="no-underline hover:text-turkus">
                {KLIENT.email}
              </a>
            </li>
            <li>{KLIENT.adres}</li>
            <li>
              <a href={KLIENT.instrukcja} target="_blank" rel="noopener noreferrer" className="no-underline hover:text-turkus">
                Instrukcja montażu (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="kontener flex flex-wrap items-center justify-between gap-3 py-6 text-[13px] text-white/55">
          <p className="m-0">
            © {rok} {KLIENT.firma}
          </p>
          <div className="flex flex-wrap gap-5">
            <a href={KLIENT.regulamin} target="_blank" rel="noopener noreferrer" className="text-white/55 hover:text-white">
              Regulamin zakupów
            </a>
            <a href={KLIENT.polityka} target="_blank" rel="noopener noreferrer" className="text-white/55 hover:text-white">
              Polityka prywatności
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
