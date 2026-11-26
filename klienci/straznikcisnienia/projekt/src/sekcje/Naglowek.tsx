import { useEffect, useState } from "react";
import { KLIENT } from "../klient";
import { Logo } from "../logo/Logo";
import { Dymek, Krzyzyk, Menu, Telefon } from "../ui/Ikony";

export const MENU = [
  { href: "#jak-dziala", tekst: "Jak działa" },
  { href: "#korzysci", tekst: "Korzyści" },
  { href: "#cennik", tekst: "Cennik" },
  { href: "#pytania", tekst: "Pytania" },
  { href: "#kontakt", tekst: "Kontakt" },
];

export function Naglowek() {
  const [przewiniete, setPrzewiniete] = useState(false);
  const [otwarte, setOtwarte] = useState(false);

  useEffect(() => {
    const sprawdz = () => setPrzewiniete(window.scrollY > 12);
    sprawdz();
    window.addEventListener("scroll", sprawdz, { passive: true });
    return () => window.removeEventListener("scroll", sprawdz);
  }, []);

  useEffect(() => {
    if (!otwarte) return;
    const klawisz = (e: KeyboardEvent) => e.key === "Escape" && setOtwarte(false);
    document.addEventListener("keydown", klawisz);
    return () => document.removeEventListener("keydown", klawisz);
  }, [otwarte]);

  return (
    <header
      className={`na-ciemnym fixed inset-x-0 z-50 border-b text-white backdrop-blur-xl transition-[background-color,border-color] duration-300 ${
        przewiniete || otwarte ? "border-white/10 bg-grafit/95" : "border-transparent bg-grafit"
      }`}
      style={{ top: "var(--demo-h)" }}
    >
      <div className="kontener flex items-center justify-between gap-3 sm:gap-6" style={{ height: "var(--naglowek-h)" }}>
        <a href="#start" className="min-w-0 shrink no-underline" aria-label={`${KLIENT.firma}: początek strony`} onClick={() => setOtwarte(false)}>
          <span className="hidden sm:inline">
            <Logo ciemne />
          </span>
          <span className="sm:hidden">
            <Logo ciemne maly />
          </span>
        </a>

        <nav aria-label="Menu główne" className="hidden lg:block">
          <ul className="m-0 flex list-none items-center gap-1 p-0">
            {MENU.map((m) => (
              <li key={m.href}>
                <a href={m.href} className="px-3 py-2 text-[15px] font-medium text-white/75 no-underline transition-colors hover:text-turkus">
                  {m.tekst}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href={KLIENT.telefonHref} className="przycisk przycisk-turkus hidden !min-h-[44px] !py-2.5 sm:inline-flex" data-nasluch-klik="telefon-naglowek">
            <Telefon />
            <span>{KLIENT.telefonPokaz}</span>
          </a>
          <a
            href={KLIENT.telefonHref}
            className="grid h-11 w-11 place-items-center rounded-[2px] bg-turkus text-grafit sm:hidden"
            aria-label={`Zadzwoń: ${KLIENT.telefonPokaz}`}
            data-nasluch-klik="telefon-naglowek"
          >
            <Telefon className="h-5 w-5" />
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-[2px] border border-white/20 text-white lg:hidden"
            aria-expanded={otwarte}
            aria-controls="menu-mobilne"
            aria-label={otwarte ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setOtwarte((o) => !o)}
          >
            {otwarte ? <Krzyzyk className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="menu-mobilne"
        className={`overflow-hidden border-t border-white/10 bg-grafit transition-[max-height,opacity] duration-300 lg:hidden ${
          otwarte ? "max-h-[560px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Menu na telefonie" className="kontener py-4">
          <ul className="m-0 list-none p-0">
            {MENU.map((m) => (
              <li key={m.href} className="border-b border-white/10 last:border-b-0">
                <a
                  href={m.href}
                  onClick={() => setOtwarte(false)}
                  className="naglowek-szeroki flex items-center justify-between py-3.5 text-[22px] text-white no-underline"
                >
                  {m.tekst}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a href={KLIENT.telefonHref} className="przycisk przycisk-turkus" data-nasluch-klik="telefon-menu">
              <Telefon />
              Zadzwoń
            </a>
            <a href={KLIENT.smsHref} className="przycisk przycisk-obrys-jasny" data-nasluch-klik="sms-menu">
              <Dymek />
              SMS
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
