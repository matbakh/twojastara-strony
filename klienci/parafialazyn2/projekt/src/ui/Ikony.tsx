/** Proste ikony SVG (linia 1.5–1.8 px), bez zewnętrznych bibliotek. */
type P = { className?: string };

const baza = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function Strzalka({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 16 16" strokeWidth={1.6} strokeLinecap="square" className={`strzalka ${className}`}>
      <path d="M3.33 8H12M8 3.33L12.67 8 8 12.67" />
    </svg>
  );
}

export function StrzalkaUkos({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 16 16" strokeWidth={1.6} strokeLinecap="square" className={className}>
      <path d="M5 11l6-6M6 5h5v5" />
    </svg>
  );
}

export function Szewron({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 16 16" strokeWidth={1.5} className={className}>
      <path d="M6.66 12l4-4-4-4" />
    </svg>
  );
}

export function Telefon({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.8} className={className}>
      <path d="M5 4h3.5l1.6 4-2.2 1.4a11 11 0 0 0 6.7 6.7l1.4-2.2 4 1.6V19a1.6 1.6 0 0 1-1.7 1.6C10.6 20.1 3.9 13.4 3.4 5.7A1.6 1.6 0 0 1 5 4z" />
    </svg>
  );
}

export function Dymek({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.8} className={className}>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 14.5z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  );
}

export function Zegar({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.8} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function Pinezka({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.8} className={className}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function Gwiazdka({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.6} className={className}>
      <path d="M12 3.8l2.5 5.1 5.6.8-4.1 4 1 5.6-5-2.7-5 2.7 1-5.6-4.1-4 5.6-.8z" />
    </svg>
  );
}

export function Facebook({ className = "" }: P) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z" />
    </svg>
  );
}

export function Menu({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.8} className={className}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

export function Krzyzyk({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.8} className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function Plus({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.8} className={className}>
      <path d="M5 12h14" />
      <path className="plus-pion" d="M12 5v14" />
    </svg>
  );
}

export function Lewo({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.8} className={className}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function Prawo({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.8} className={className}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function Powiekszenie({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.8} className={className}>
      <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
    </svg>
  );
}

export function Koperta({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.8} className={className}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.6" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

export function Kopiuj({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.8} className={className}>
      <rect x="8.5" y="8.5" width="11" height="11" rx="1.6" />
      <path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" />
    </svg>
  );
}

export function Ptaszek({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={2} className={className}>
      <path d="M5 12.5l4.2 4.2L19 7" />
    </svg>
  );
}

/** Krzyż łaciński (cienka linia), jak znak na obecnej stronie parafii. */
export function Krzyz({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.8} className={className}>
      <path d="M12 3v18M7 8.5h10" />
    </svg>
  );
}
