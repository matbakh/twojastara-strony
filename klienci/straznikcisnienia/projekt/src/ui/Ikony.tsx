/** Proste ikony SVG (linia 1.6–1.8 px), bez zewnętrznych bibliotek. */
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

export function Koperta({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.8} className={className}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="M4 7l8 6 8-6" />
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

export function Dokument({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.8} className={className}>
      <path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8z" />
      <path d="M14 3.5V8h4.5M9 12.5h6M9 16h4" />
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

export function Check({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 16 16" strokeWidth={1.6} className={className}>
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  );
}

export function Tarcza({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.7} className={className}>
      <path d="M12 3.5l7 2.6v5.6c0 4.3-2.9 7.6-7 8.8-4.1-1.2-7-4.5-7-8.8V6.1z" />
      <path d="M8.8 12l2.3 2.3 4.2-4.6" />
    </svg>
  );
}

export function Kropla({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.7} className={className}>
      <path d="M12 3.5s-6 6.6-6 11a6 6 0 0 0 12 0c0-4.4-6-11-6-11z" />
      <path d="M9.4 15.2a2.8 2.8 0 0 0 2.6 2.4" />
    </svg>
  );
}

export function Opona({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.7} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3.5v4.5M12 16v4.5M3.5 12H8M16 12h4.5" />
    </svg>
  );
}

export function Portfel({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.7} className={className}>
      <path d="M4.5 7.5h13A2 2 0 0 1 19.5 9.5v8a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2z" />
      <path d="M4.5 7.5l10-3.2a1.5 1.5 0 0 1 1.9 1.4v1.8" />
      <path d="M15.5 13.5h4" />
    </svg>
  );
}

export function Klucz({ className = "" }: P) {
  return (
    <svg {...baza} viewBox="0 0 24 24" strokeWidth={1.7} className={className}>
      <path d="M14.6 4.2a4.6 4.6 0 0 0-5 6.2L4 16v4h4l5.6-5.6a4.6 4.6 0 0 0 6.2-5l-2.8 2.8-3-1-1-3z" />
    </svg>
  );
}

export const IKONY = { tarcza: Tarcza, kropla: Kropla, opona: Opona, portfel: Portfel, klucz: Klucz } as const;
export type NazwaIkony = keyof typeof IKONY;
