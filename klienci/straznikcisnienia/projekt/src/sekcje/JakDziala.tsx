import { useEffect, useRef, useState, type CSSProperties } from "react";
import { KLIENT, KROKI } from "../klient";
import { t } from "../lib/tekst";
import { Dokument, StrzalkaUkos } from "../ui/Ikony";

type Stan = "ok" | "spadek";

/**
 * Wskaźnik na wentylu w przekroju: czarna obudowa, przezroczysta kopułka, zielony znacznik.
 * Przy spadku ciśnienia z zielonego znacznika wysuwa się czerwony (jak na zdjęciach z obecnej strony).
 */
function Wskaznik({ stan }: { stan: Stan }) {
  const spadek = stan === "spadek";
  return (
    <svg viewBox="0 0 220 330" className="h-full w-auto" role="img" aria-label={spadek ? "Wskaźnik z wysuniętym czerwonym znacznikiem" : "Wskaźnik z zielonym znacznikiem"}>
      <defs>
        <linearGradient id="obudowa" x1="0" x2="1">
          <stop offset="0" stopColor="#050607" />
          <stop offset="0.35" stopColor="#2a3136" />
          <stop offset="0.6" stopColor="#11161a" />
          <stop offset="1" stopColor="#050607" />
        </linearGradient>
        <linearGradient id="kopulka" x1="0" x2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="0.3" stopColor="#ffffff" stopOpacity="0.32" />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.16" />
        </linearGradient>
        <radialGradient id="poswiata">
          <stop offset="0" stopColor={spadek ? "#e5372b" : "#2fbf5b"} stopOpacity="0.55" />
          <stop offset="1" stopColor={spadek ? "#e5372b" : "#2fbf5b"} stopOpacity="0" />
        </radialGradient>
        <clipPath id="okienko">
          <rect x="74" y="46" width="72" height="96" rx="30" />
        </clipPath>
      </defs>

      {/* poświata w kolorze stanu */}
      <ellipse cx="110" cy="100" rx="105" ry="90" fill="url(#poswiata)" style={{ transition: "opacity .5s" }} />

      {/* znaczniki w kopułce */}
      <g clipPath="url(#okienko)">
        <rect x="74" y="46" width="72" height="96" fill="#0d1113" />
        <g style={{ transform: `translateY(${spadek ? -30 : 0}px)`, transition: "transform .9s cubic-bezier(.2,.75,.15,1)" }}>
          <rect x="80" y="104" width="60" height="30" rx="3" fill="#e5372b" />
          <rect x="80" y="108" width="60" height="6" fill="#ff6b5f" opacity=".55" />
        </g>
        <rect x="80" y="104" width="60" height="30" rx="3" fill="#2fbf5b" />
        <rect x="80" y="108" width="60" height="6" fill="#7fe39b" opacity=".55" />
        <rect x="80" y="134" width="60" height="10" fill="#0d1113" />
      </g>

      {/* przezroczysta kopułka */}
      <rect x="66" y="38" width="88" height="112" rx="38" fill="url(#kopulka)" stroke="#ffffff" strokeOpacity=".5" strokeWidth="2" />
      <path d="M84 56c-4 10-4 40 0 62" stroke="#ffffff" strokeOpacity=".7" strokeWidth="5" strokeLinecap="round" fill="none" />

      {/* kołnierz i obudowa z rowkami */}
      <rect x="56" y="146" width="108" height="22" rx="8" fill="#1f262a" />
      <rect x="62" y="166" width="96" height="140" rx="14" fill="url(#obudowa)" />
      {[78, 92, 106, 120, 134, 148].map((x) => (
        <rect key={x} x={x - 2} y="176" width="4" height="120" rx="2" fill="#000" opacity=".55" />
      ))}
      <rect x="62" y="296" width="96" height="14" rx="6" fill="#0b0e10" />
    </svg>
  );
}

export function JakDziala() {
  const [stan, setStan] = useState<Stan>("ok");
  const [reczny, setReczny] = useState(false);
  const sekcja = useRef<HTMLElement>(null);

  // Pokaz na zmianę (co 3,2 s), dopóki ktoś sam nie kliknie i dopóki sekcja jest na ekranie.
  useEffect(() => {
    if (reczny || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let widoczna = false;
    const io = new IntersectionObserver(([w]) => (widoczna = !!w?.isIntersecting), { threshold: 0.2 });
    if (sekcja.current) io.observe(sekcja.current);
    const id = window.setInterval(() => {
      if (widoczna) setStan((s) => (s === "ok" ? "spadek" : "ok"));
    }, 3200);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, [reczny]);

  const wybierz = (s: Stan) => {
    setReczny(true);
    setStan(s);
  };

  const spadek = stan === "spadek";

  return (
    <section ref={sekcja} id="jak-dziala" data-nasluch-sekcja="jak-dziala" className="bg-white py-[120px] max-[767px]:py-20">
      <div className="kontener grid grid-cols-12 items-start gap-x-10 gap-y-14 max-[991px]:grid-cols-1">
        {/* Podgląd wskaźnika */}
        <div data-pokaz className="col-span-5 self-start max-[991px]:col-span-1 lg:sticky" style={{ top: "calc(var(--demo-h) + var(--naglowek-h) + 32px)" }}>
          <div className="na-ciemnym relative flex flex-col items-center overflow-hidden bg-grafit px-6 pt-10 pb-6 text-white">
            <div className="skala pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative h-[330px] max-[479px]:h-[270px]">
              <Wskaznik stan={stan} />
            </div>
            <p className="relative m-0 mt-6 flex items-center gap-3 font-mono text-[13px] tracking-[0.04em]" aria-live="polite">
              <span className={`kropka-stan ${spadek ? "spadek" : ""}`} aria-hidden="true" />
              {spadek ? "Czerwony: ciśnienie spadło o 0,2 atm" : "Zielony: ciśnienie właściwe"}
            </p>
            <div className="relative mt-5 grid w-full grid-cols-2 gap-1 border border-white/15 p-1" role="group" aria-label="Pokaż stan wskaźnika">
              <button
                type="button"
                aria-pressed={!spadek}
                onClick={() => wybierz("ok")}
                className={`min-h-[44px] px-3 text-[14px] leading-tight font-semibold transition-colors max-[479px]:px-2 max-[479px]:text-[13px] ${!spadek ? "bg-white text-grafit" : "text-white/70 hover:text-white"}`}
                data-nasluch-klik="wskaznik-ok"
              >
                Ciśnienie właściwe
              </button>
              <button
                type="button"
                aria-pressed={spadek}
                onClick={() => wybierz("spadek")}
                className={`min-h-[44px] px-3 text-[14px] leading-tight font-semibold transition-colors max-[479px]:px-2 max-[479px]:text-[13px] ${spadek ? "bg-white text-grafit" : "text-white/70 hover:text-white"}`}
                data-nasluch-klik="wskaznik-spadek"
              >
                Ciśnienie spada
              </button>
            </div>
          </div>
        </div>

        {/* Kroki */}
        <div className="col-span-7 flex flex-col items-start gap-6 lg:pl-6 max-[991px]:col-span-1">
          <span data-pokaz className="etykieta">
            Jak to działa
          </span>
          <h2
            data-pokaz
            style={{ "--opoznienie": "80ms" } as CSSProperties}
            className="naglowek-szeroki m-0 text-[clamp(36px,4.4vw,60px)] leading-[1.02]"
          >
            Wystarczy spojrzeć na&nbsp;kolor
          </h2>
          <p data-pokaz style={{ "--opoznienie": "140ms" } as CSSProperties} className="m-0 max-w-[560px] text-[18px] leading-[1.6] text-grafit/70">
            {t("Strażnik Ciśnienia to wizualny wskaźnik utraty ciśnienia w kołach. Pasuje do opon o ciśnieniu od 1,4 do 3,0 atm.")}
          </p>

          <ol className="m-0 mt-4 w-full list-none p-0">
            {KROKI.map((k, i) => (
              <li
                key={k.tytul}
                data-pokaz
                style={{ "--opoznienie": `${180 + i * 90}ms` } as CSSProperties}
                className="grid grid-cols-[56px_1fr] gap-4 border-t border-grafit/12 py-6 last:border-b max-[479px]:grid-cols-[44px_1fr]"
              >
                <span className="font-mono text-[14px] font-medium text-grafit/50">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex flex-col gap-1.5">
                  <span className="naglowek-szeroki flex items-center gap-3 text-[23px] leading-tight max-[479px]:text-[20px]">
                    {i > 0 && <span className={`h-3 w-3 flex-none rounded-full ${i === 1 ? "bg-zielony" : "bg-czerwony"}`} aria-hidden="true" />}
                    {k.tytul}
                  </span>
                  <span className="text-[16px] leading-[1.6] text-grafit/70">{t(k.opis)}</span>
                </span>
              </li>
            ))}
          </ol>

          <a
            data-pokaz
            href={KLIENT.instrukcja}
            target="_blank"
            rel="noopener noreferrer"
            className="przycisk przycisk-obrys mt-2"
            data-nasluch-klik="instrukcja"
          >
            <Dokument />
            Instrukcja (PDF)
            <StrzalkaUkos className="!h-3.5 !w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
