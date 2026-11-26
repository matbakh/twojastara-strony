/**
 * Logo Strażnika Ciśnienia przerysowane w wektorze: sylwetka auta (dach, turkusowa linia nadwozia,
 * łuk koła) i nazwa z turkusowymi literami S i C, jak w obecnym logo. Wersja jasna i ciemna.
 */
type Props = { ciemne?: boolean; className?: string; maly?: boolean };

const TURKUS = "#1EACC7";
const GRAFIT = "#14181B";

/** Sylwetka auta z obecnego logo, uproszczona do trzech linii. */
export function Sygnet({ className = "", ciemne = false }: { className?: string; ciemne?: boolean }) {
  const linia = ciemne ? "#FFFFFF" : GRAFIT;
  return (
    <svg viewBox="0 0 72 32" className={className} role="img" aria-label="Znak Strażnika Ciśnienia" xmlns="http://www.w3.org/2000/svg" fill="none">
      {/* dach */}
      <path d="M19 12.6C28 5.4 43 3.4 55 5.6c6 1.1 10.2 3.9 12.4 7.6l.4 4.6" stroke={linia} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* linia nadwozia */}
      <path d="M2.2 19.6C16 14 39 11.7 64.6 13.6" stroke={TURKUS} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M26.5 17.4c11.5-1.3 23.5-1.2 35 .6" stroke={TURKUS} strokeWidth="1.8" strokeLinecap="round" />
      {/* łuk koła */}
      <path d="M17.6 18.1a6.4 6.4 0 1 0 0 11" stroke={linia} strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

/** Mały znak do ikony karty: łuk koła i turkusowa linia. */
export function Znak({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="Znak Strażnika Ciśnienia" xmlns="http://www.w3.org/2000/svg" fill="none">
      <rect width="32" height="32" rx="7" fill={GRAFIT} />
      <path d="M3.5 15.2C11 11.2 19.6 9.8 28.6 10.6" stroke={TURKUS} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M15.4 15.3a6.6 6.6 0 1 0 0 11" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ ciemne = false, className = "", maly = false }: Props) {
  const tekst = ciemne ? "text-white" : "text-[var(--grafit)]";
  return (
    <span className={`inline-flex items-center ${maly ? "gap-2" : "gap-2.5"} ${className}`}>
      <Sygnet className={maly ? "h-[22px] w-auto shrink-0" : "h-8 w-auto shrink-0"} ciemne={ciemne} />
      <span
        className={`whitespace-nowrap font-extrabold italic leading-none tracking-[-0.01em] ${tekst} ${maly ? "text-[0.95rem]" : "text-[1.16rem]"}`}
        style={{ fontFamily: '"Archivo Variable", "Archivo", ui-sans-serif, sans-serif', fontStretch: "108%" }}
      >
        <span className="text-[var(--turkus)]">S</span>trażnik <span className="text-[var(--turkus)]">C</span>iśnienia
      </span>
    </span>
  );
}
