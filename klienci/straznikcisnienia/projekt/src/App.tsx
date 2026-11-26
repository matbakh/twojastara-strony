import { POKAZ } from "./klient";
import { Demo } from "./demo/Demo";
import { usePokazywanie } from "./lib/ruch";
import { Cennik } from "./sekcje/Cennik";
import { Fakty } from "./sekcje/Fakty";
import { Hero } from "./sekcje/Hero";
import { JakDziala } from "./sekcje/JakDziala";
import { Kontakt } from "./sekcje/Kontakt";
import { Korzysci } from "./sekcje/Korzysci";
import { Naglowek } from "./sekcje/Naglowek";
import { PrzyciskTelefonu } from "./sekcje/PrzyciskTelefonu";
import { Pytania } from "./sekcje/Pytania";
import { Stopka } from "./sekcje/Stopka";

export function App() {
  usePokazywanie();
  return (
    <>
      {POKAZ.wlaczony && <Demo />}
      <a
        href="#tresc"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[95] focus:bg-white focus:px-4 focus:py-2 focus:font-bold"
      >
        Przejdź do treści
      </a>
      <Naglowek />
      <main id="tresc">
        <Hero />
        <Fakty />
        <JakDziala />
        <Korzysci />
        <Cennik />
        <Pytania />
        <Kontakt />
      </main>
      <Stopka />
      <PrzyciskTelefonu />
    </>
  );
}
