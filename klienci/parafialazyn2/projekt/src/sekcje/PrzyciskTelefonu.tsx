import { useEffect, useState } from "react";
import { KLIENT } from "../klient";
import { Telefon } from "../ui/Ikony";

/** Przyklejony przycisk „Zadzwoń” na telefonie (pojawia się po zjechaniu z pierwszego ekranu). */
export function PrzyciskTelefonu() {
  const [widoczny, setWidoczny] = useState(false);
  useEffect(() => {
    const sprawdz = () => setWidoczny(window.scrollY > window.innerHeight * 0.6);
    sprawdz();
    window.addEventListener("scroll", sprawdz, { passive: true });
    return () => window.removeEventListener("scroll", sprawdz);
  }, []);
  return (
    <a
      href={KLIENT.telefonHref}
      aria-label={`Zadzwoń do kancelarii: ${KLIENT.telefonPokaz}`}
      data-nasluch-klik="telefon-plywajacy"
      className={`puls fixed right-4 bottom-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-zloto-jasne text-atrament shadow-[0_14px_30px_-12px_rgb(29_26_20/0.6)] transition-[opacity,transform] duration-300 md:hidden ${
        widoczny ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <Telefon className="h-6 w-6" />
    </a>
  );
}
