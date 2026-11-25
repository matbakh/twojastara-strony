import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { REALIZACJE } from "../klient";
import { zdjecie } from "../lib/tekst";
import { Krzyzyk, Lewo, Powiekszenie, Prawo } from "../ui/Ikony";
import { Obraz } from "../ui/Obraz";

const UKLAD: Record<string, string> = {
  szeroki: "col-span-2 row-span-1 max-[767px]:col-span-2",
  wysoki: "col-span-1 row-span-2",
  zwykly: "col-span-1 row-span-1",
};

function Podglad({ indeks, zamknij, zmien }: { indeks: number; zamknij: () => void; zmien: (k: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const r = REALIZACJE[indeks];
  useEffect(() => {
    ref.current?.focus();
    const klawisz = (e: KeyboardEvent) => {
      if (e.key === "Escape") zamknij();
      if (e.key === "ArrowRight") zmien(1);
      if (e.key === "ArrowLeft") zmien(-1);
    };
    document.addEventListener("keydown", klawisz);
    const przewijanie = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", klawisz);
      document.body.style.overflow = przewijanie;
    };
  }, [zamknij, zmien]);
  if (!r) return null;
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Zdjęcie: ${r.opis}`}
      className="fixed inset-0 z-[90] flex flex-col bg-granat/95 text-white outline-none backdrop-blur"
      onClick={(e) => e.target === e.currentTarget && zamknij()}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <p className="m-0 font-mono text-[12px] uppercase tracking-[0.12em] text-white/70">
          {String(indeks + 1).padStart(2, "0")} / {String(REALIZACJE.length).padStart(2, "0")}
        </p>
        <button type="button" onClick={zamknij} className="grid h-11 w-11 place-items-center border border-white/20 text-white hover:bg-white/10" aria-label="Zamknij">
          <Krzyzyk className="h-5 w-5" />
        </button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center gap-3 px-3 pb-3" onClick={(e) => e.target === e.currentTarget && zamknij()}>
        <button type="button" onClick={() => zmien(-1)} className="grid h-12 w-12 flex-none place-items-center border border-white/20 hover:bg-white/10 max-[600px]:hidden" aria-label="Poprzednie zdjęcie">
          <Lewo className="h-5 w-5" />
        </button>
        <figure className="m-0 flex max-h-full min-h-0 max-w-[1100px] flex-col items-center">
          <img src={zdjecie(r.plik)} alt={r.opis} className="max-h-[calc(100svh-150px)] w-auto max-w-full object-contain" />
          <figcaption className="mt-3 text-center text-[15px] text-white/80">{r.opis}</figcaption>
        </figure>
        <button type="button" onClick={() => zmien(1)} className="grid h-12 w-12 flex-none place-items-center border border-white/20 hover:bg-white/10 max-[600px]:hidden" aria-label="Następne zdjęcie">
          <Prawo className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 px-3 pb-4 min-[601px]:hidden">
        <button type="button" onClick={() => zmien(-1)} className="flex h-12 items-center justify-center gap-2 border border-white/20" aria-label="Poprzednie zdjęcie">
          <Lewo className="h-5 w-5" /> Poprzednie
        </button>
        <button type="button" onClick={() => zmien(1)} className="flex h-12 items-center justify-center gap-2 border border-white/20" aria-label="Następne zdjęcie">
          Następne <Prawo className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export function Realizacje() {
  const [otwarte, setOtwarte] = useState<number | null>(null);
  const zamknij = useCallback(() => setOtwarte(null), []);
  const zmien = useCallback((k: number) => setOtwarte((o) => (o === null ? o : (o + k + REALIZACJE.length) % REALIZACJE.length)), []);

  return (
    <section id="realizacje" data-nasluch-sekcja="realizacje" className="bg-[#faf9f5] py-[120px] max-[767px]:py-20">
      <div className="kontener">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 max-[767px]:mb-10">
          <div className="flex max-w-[640px] flex-col items-start gap-6">
            <span data-pokaz className="etykieta">
              Realizacje
            </span>
            <h2
              data-pokaz
              style={{ "--opoznienie": "80ms" } as CSSProperties}
              className="m-0 font-naglowek text-[clamp(40px,4.6vw,60px)] font-bold leading-[1.02] tracking-[-0.04em]"
            >
              Technologia z&nbsp;bliska
            </h2>
          </div>
          <p data-pokaz style={{ "--opoznienie": "160ms" } as CSSProperties} className="m-0 max-w-[420px] text-[17px] leading-[1.6] text-granat/65">
            Rozdzielnice, zabezpieczenia, osprzęt i&nbsp;monitoring na zdjęciach z&nbsp;naszych realizacji. Kliknij zdjęcie, żeby je powiększyć.
          </p>
        </div>

        <div className="grid auto-rows-[220px] grid-cols-4 gap-3 max-[991px]:auto-rows-[200px] max-[991px]:grid-cols-3 max-[767px]:auto-rows-[160px] max-[767px]:grid-cols-2 max-[767px]:gap-2">
          {REALIZACJE.map((r, i) => (
            <button
              key={r.plik + i}
              type="button"
              data-pokaz
              style={{ "--opoznienie": `${(i % 4) * 70}ms` } as CSSProperties}
              onClick={() => setOtwarte(i)}
              className={`group relative overflow-hidden border-0 bg-tlo-2 p-0 text-left ${UKLAD[r.uklad] ?? UKLAD.zwykly}`}
              aria-label={`Powiększ zdjęcie: ${r.opis}`}
              data-nasluch-klik="galeria"
            >
              <Obraz
                nazwa={r.plik}
                opis={r.opis}
                sizes="(min-width: 992px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-granat/80 via-granat/20 to-transparent p-4 pt-12 text-white opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100 max-[767px]:p-3 max-[767px]:pt-10">
                <span className="text-[14px] leading-snug max-[767px]:text-[12px]">{r.opis}</span>
                <Powiekszenie className="h-4 w-4 flex-none max-[767px]:hidden" />
              </span>
            </button>
          ))}
        </div>
      </div>
      {otwarte !== null && <Podglad indeks={otwarte} zamknij={zamknij} zmien={zmien} />}
    </section>
  );
}
