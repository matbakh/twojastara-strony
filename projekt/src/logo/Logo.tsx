/**
 * Uproszczone logo MID&DIN: znak z czterech pól (wtyczka, kamera, prąd, telefon),
 * jak w obecnym logo, ale w dwóch kolorach strony: żółtym i granatowym.
 */
type Props = { ciemne?: boolean; className?: string; podpis?: boolean };

const ZOLTY = "#F7DF0A";
const GRANAT = "#17242C";

export function Sygnet({ className = "", ciemne = false }: { className?: string; ciemne?: boolean }) {
  const pole2 = ciemne ? "#FFFFFF" : GRANAT;
  const ikona2 = ciemne ? GRANAT : ZOLTY;
  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label="Znak MID&DIN" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="18" height="18" rx="3" fill={ZOLTY} />
      <rect x="22" y="0" width="18" height="18" rx="3" fill={pole2} />
      <rect x="0" y="22" width="18" height="18" rx="3" fill={pole2} />
      <rect x="22" y="22" width="18" height="18" rx="3" fill={ZOLTY} />
      {/* wtyczka */}
      <g stroke={GRANAT} strokeWidth="1.8" strokeLinecap="round" fill="none">
        <path d="M7 3.5v3.2M11 3.5v3.2" />
        <rect x="5" y="6.7" width="8" height="5" rx="1.4" fill={GRANAT} />
        <path d="M9 11.7v3.3" />
      </g>
      {/* kamera */}
      <g fill={ikona2}>
        <path d="M25.2 6.6l9.3-2.5 1.2 4.4-9.3 2.5z" />
        <path d="M29.6 10.4l1.5-.4.9 3.2h2.8v1.6h-4z" />
      </g>
      {/* prąd */}
      <path d="M10.4 25.2l-4.6 7h3.6l-1 5.6 4.8-7.4H9.6z" fill={ikona2} />
      {/* telefon */}
      <g fill="none" stroke={GRANAT} strokeWidth="1.8">
        <rect x="27.4" y="25.4" width="7.2" height="11.2" rx="1.6" />
      </g>
      <circle cx="31" cy="34.1" r=".9" fill={GRANAT} />
    </svg>
  );
}

export function Logo({ ciemne = false, className = "", podpis = true }: Props) {
  const tekst = ciemne ? "text-white" : "text-[var(--granat)]";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Sygnet className="h-9 w-9 shrink-0" ciemne={ciemne} />
      <span className={`flex flex-col leading-none ${tekst}`}>
        <span className="font-naglowek text-[1.32rem] font-extrabold tracking-[-0.03em]">
          MID<span className={ciemne ? "text-[var(--zolty)]" : ""}>&amp;</span>DIN
        </span>
        {podpis && (
          <span className={`font-mono mt-1 text-[0.58rem] font-medium uppercase tracking-[0.32em] ${ciemne ? "text-white/60" : "text-[var(--granat)]/60"}`}>
            Technology
          </span>
        )}
      </span>
    </span>
  );
}
