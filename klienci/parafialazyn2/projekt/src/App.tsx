import { POKAZ } from "./klient";
import { Demo } from "./demo/Demo";
import { usePokazywanie } from "./lib/ruch";
import { Hero } from "./sekcje/Hero";
import { Kontakt } from "./sekcje/Kontakt";
import { Msze } from "./sekcje/Msze";
import { Naglowek } from "./sekcje/Naglowek";
import { Ogloszenia } from "./sekcje/Ogloszenia";
import { Parafia } from "./sekcje/Parafia";
import { PrzyciskTelefonu } from "./sekcje/PrzyciskTelefonu";
import { Pytania } from "./sekcje/Pytania";
import { Sakramenty } from "./sekcje/Sakramenty";
import { Stopka } from "./sekcje/Stopka";
import { Wspolnoty } from "./sekcje/Wspolnoty";

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
        <Msze />
        <Ogloszenia />
        <Sakramenty />
        <Parafia />
        <Wspolnoty />
        <Kontakt />
        <Pytania />
      </main>
      <Stopka />
      <PrzyciskTelefonu />
    </>
  );
}
