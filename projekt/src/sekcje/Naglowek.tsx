import { useEffect, useState } from "react";
import { KLIENT } from "../klient";
import { Logo } from "../logo/Logo";
import { useStanOtwarcia } from "../lib/useStan";
import { Dymek, Krzyzyk, Menu, Telefon } from "../ui/Ikony";

export const MENU = [
  { href: "#uslugi", tekst: "Usługi" },
  { href: "#cennik", tekst: "Cennik" },
  { href: "#realizacje", tekst: "Realizacje" },
  { href: "#o-nas", tekst: "O nas" },
  { href: "#kontakt", tekst: "Kontakt" },
];

export function Naglowek() {
  const [przewiniete, setPrzewiniete] = useState(false);
  const [otwarte, setOtwarte] = useState(false);
  const stan = useStanOtwarcia();

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

  const tlo = przewiniete || otwarte;

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        tlo ? "border-b border-granat/10 bg-tlo/90 shadow-[0_8px_30px_-20px_rgb(23_36_44/0.35)] backdrop-blur-xl" : "border-b border-transparent bg-tlo/95 backdrop-blur-xl"
      }`}
      style={{ top: "var(--demo-h)" }}
    >
      <div className="kontener flex items-center justify-between gap-6" style={{ height: "var(--naglowek-h)" }}>
        <a href="#start" className="shrink-0 no-underline" aria-label={`${KLIENT.firma}: początek strony`} onClick={() => setOtwarte(false)}>
          <Logo />
        </a>

        <nav aria-label="Menu główne" className="hidden lg:block">
          <ul className="m-0 flex list-none items-center gap-1 p-0">
            {MENU.map((m) => (
              <li key={m.href}>
                <a
                  href={m.href}
                  className="rounded-[2px] px-3 py-2 text-[15px] font-medium text-granat/80 no-underline transition-colors hover:bg-granat/[0.06] hover:text-granat"
                >
                  {m.tekst}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#kontakt"
            className="hidden items-center gap-2 text-[13px] font-medium text-granat/75 no-underline hover:text-granat xl:inline-flex"
            title="Godziny pracy"
          >
            <span className={`kropka ${stan.otwarte ? "otwarte" : ""}`} aria-hidden="true" />
            <span>
              <span className="font-semibold text-granat">{stan.tekst}</span> · {stan.podtekst}
            </span>
          </a>
          <a href={KLIENT.telefonHref} className="przycisk przycisk-zolty hidden !min-h-[44px] !py-2.5 sm:inline-flex" data-nasluch-klik="telefon-naglowek">
            <Telefon />
            <span>{KLIENT.telefonPokaz}</span>
          </a>
          <a
            href={KLIENT.telefonHref}
            className="grid h-11 w-11 place-items-center border border-granat/15 bg-zolty text-granat sm:hidden"
            aria-label={`Zadzwoń: ${KLIENT.telefonPokaz}`}
            data-nasluch-klik="telefon-naglowek"
          >
            <Telefon className="h-5 w-5" />
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center border border-granat/15 bg-white/50 text-granat lg:hidden"
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
        className={`overflow-hidden border-t border-granat/10 bg-tlo transition-[max-height,opacity] duration-300 lg:hidden ${
          otwarte ? "max-h-[520px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Menu na telefonie" className="kontener py-4">
          <ul className="m-0 list-none p-0">
            {MENU.map((m) => (
              <li key={m.href} className="border-b border-granat/10 last:border-b-0">
                <a
                  href={m.href}
                  onClick={() => setOtwarte(false)}
                  className="flex items-center justify-between py-3.5 font-naglowek text-[22px] font-bold tracking-[-0.02em] text-granat no-underline"
                >
                  {m.tekst}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a href={KLIENT.telefonHref} className="przycisk przycisk-zolty" data-nasluch-klik="telefon-menu">
              <Telefon />
              Zadzwoń
            </a>
            <a href={KLIENT.smsHref} className="przycisk przycisk-jasny" data-nasluch-klik="sms-menu">
              <Dymek />
              SMS
            </a>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-granat/70">
            <span className={`kropka ${stan.otwarte ? "otwarte" : ""}`} aria-hidden="true" />
            <span>
              <span className="font-semibold text-granat">{stan.tekst}</span> · {stan.podtekst}
            </span>
          </p>
        </nav>
      </div>
    </header>
  );
}
