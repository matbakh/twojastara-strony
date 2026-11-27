import { useEffect, useState } from "react";
import { KLIENT } from "../klient";
import { Logo } from "../logo/Logo";
import { Krzyzyk, Menu, Telefon } from "../ui/Ikony";

export const MENU = [
  { href: "#msze", tekst: "Msze Święte" },
  { href: "#ogloszenia", tekst: "Ogłoszenia" },
  { href: "#sakramenty", tekst: "Sakramenty" },
  { href: "#parafia", tekst: "Parafia" },
  { href: "#wspolnoty", tekst: "Wspólnoty" },
  { href: "#kontakt", tekst: "Kontakt" },
];

export function Naglowek() {
  const [przewiniete, setPrzewiniete] = useState(false);
  const [otwarte, setOtwarte] = useState(false);

  useEffect(() => {
    const sprawdz = () => setPrzewiniete(window.scrollY > 24);
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

  const jasne = przewiniete || otwarte;

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-[background-color,border-color,box-shadow,color] duration-300 ${
        jasne
          ? "border-b border-atrament/10 bg-krem/92 text-atrament shadow-[0_10px_30px_-22px_rgb(29_26_20/0.5)] backdrop-blur-xl"
          : "border-b border-transparent bg-[linear-gradient(to_bottom,rgb(20_16_10/0.55),rgb(20_16_10/0))] bg-no-repeat bg-origin-border text-white"
      }`}
      style={{ top: "var(--demo-h)" }}
    >
      <div className="kontener flex items-center justify-between gap-6" style={{ height: "var(--naglowek-h)" }}>
        <a href="#start" className="shrink-0 no-underline" aria-label={`${KLIENT.firma}: początek strony`} onClick={() => setOtwarte(false)}>
          <Logo ciemne={!jasne} />
        </a>

        <nav aria-label="Menu główne" className="hidden lg:block">
          <ul className="m-0 flex list-none items-center gap-1 p-0">
            {MENU.map((m) => (
              <li key={m.href}>
                <a
                  href={m.href}
                  className={`rounded-full px-3.5 py-2 text-[15px] font-medium no-underline transition-colors ${
                    jasne ? "text-atrament/80 hover:bg-atrament/[0.06] hover:text-atrament" : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {m.tekst}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href={KLIENT.telefonHref} className="przycisk przycisk-zloty hidden !min-h-[44px] !py-2.5 sm:inline-flex" data-nasluch-klik="telefon-naglowek">
            <Telefon />
            <span>{KLIENT.telefonPokaz}</span>
          </a>
          <a
            href={KLIENT.telefonHref}
            className="grid h-11 w-11 place-items-center rounded-full bg-zloto-jasne text-atrament sm:hidden"
            aria-label={`Zadzwoń: ${KLIENT.telefonPokaz}`}
            data-nasluch-klik="telefon-naglowek"
          >
            <Telefon className="h-5 w-5" />
          </a>
          <button
            type="button"
            className={`grid h-11 w-11 place-items-center rounded-full border lg:hidden ${
              jasne ? "border-atrament/15 bg-white/60 text-atrament" : "border-white/35 bg-white/10 text-white backdrop-blur-md"
            }`}
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
        className={`overflow-hidden border-t border-atrament/10 bg-krem transition-[max-height,opacity] duration-300 lg:hidden ${
          otwarte ? "max-h-[560px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Menu na telefonie" className="kontener py-4">
          <ul className="m-0 list-none p-0">
            {MENU.map((m) => (
              <li key={m.href} className="border-b border-atrament/10 last:border-b-0">
                <a href={m.href} onClick={() => setOtwarte(false)} className="tytul flex items-center justify-between py-3.5 text-[21px] text-atrament no-underline">
                  {m.tekst}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-1 gap-2">
            <a href={KLIENT.telefonHref} className="przycisk przycisk-atrament" data-nasluch-klik="telefon-menu">
              <Telefon />
              Zadzwoń: {KLIENT.telefonPokaz}
            </a>
          </div>
          <p className="m-0 mt-4 text-sm text-atrament/70">Kancelaria: poniedziałek–piątek, 17:30–18:30</p>
        </nav>
      </div>
    </header>
  );
}
