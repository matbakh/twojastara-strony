import { useCallback, useEffect, useRef, useState } from "react";
import { KLIENT, POKAZ } from "../klient";
import { linkZakupu, TSS } from "../tss";
import "./demo.css";

/**
 * Tryb pokazowy twojastara.site (standard z FKU):
 * - różowy pasek na górze z informacją i zakupem w dwóch wariantach: 690 zł jednorazowo albo 99 zł miesięcznie
 *   przez 12 miesięcy (zwijany do „pigułki” w lewym dolnym rogu),
 * - znak wodny, blokada przeciągania i menu kontekstowego zdjęć, blokada wydruku (zamiast strony drukuje się informacja).
 */
const KLUCZ_ZWINIECIA = `${KLIENT.slug}-demo-zwiniety`;
const NOWA_KARTA = { target: "_blank", rel: "noopener noreferrer" } as const;

function Zamknij() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function Akcje({ pelne = false }: { pelne?: boolean }) {
  const { jednorazowo, miesiecznie, okres, okresKrotko } = TSS.ceny;
  return (
    <>
      <a
        {...NOWA_KARTA}
        href={linkZakupu("jednorazowo", KLIENT.slug)}
        className="demo-btn"
        data-nasluch-klik="kup-jednorazowo"
        data-nasluch-etykieta={`Kup za ${jednorazowo} jednorazowo (pasek strony pokazowej)`}
      >
        {pelne ? `Kup za ${jednorazowo} jednorazowo` : `Kup za ${jednorazowo}`}
      </a>
      <a
        {...NOWA_KARTA}
        href={linkZakupu("miesiecznie", KLIENT.slug)}
        className="demo-btn demo-btn-ciemny"
        data-nasluch-klik="kup-abonament"
        data-nasluch-etykieta={`Kup za ${miesiecznie} miesięcznie przez ${okres} (pasek strony pokazowej)`}
      >
        {pelne ? `Kup za ${miesiecznie}/mies. przez ${okres}` : `albo ${miesiecznie}/mies. przez ${okresKrotko}`}
      </a>
      <a {...NOWA_KARTA} href={POKAZ.wycena} className="demo-link" data-nasluch-klik="szczegoly-oferty">
        Szczegóły oferty
      </a>
    </>
  );
}

function Arkusz({ zamknij }: { zamknij: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.querySelector<HTMLElement>(".demo-btn")?.focus();
    const klawisz = (e: KeyboardEvent) => e.key === "Escape" && zamknij();
    document.addEventListener("keydown", klawisz);
    return () => document.removeEventListener("keydown", klawisz);
  }, [zamknij]);
  return (
    <>
      <div className="demo-overlay" onClick={zamknij} aria-hidden="true" />
      <div ref={ref} className="demo-sheet" role="dialog" aria-modal="true" aria-labelledby="demo-sheet-tytul">
        <p id="demo-sheet-tytul" className="demo-sheet-title">
          Kup tę stronę
        </p>
        <button type="button" className="demo-x demo-sheet-close" aria-label="Zamknij" onClick={zamknij}>
          <Zamknij />
        </button>
        <div className="demo-sheet-actions">
          <Akcje pelne />
        </div>
        <p className="demo-note">Dwa warianty do wyboru. Płatność online przez Stripe.</p>
      </div>
    </>
  );
}

function Dymek({ zamknij }: { zamknij: () => void }) {
  useEffect(() => {
    const klawisz = (e: KeyboardEvent) => e.key === "Escape" && zamknij();
    const klik = (e: MouseEvent) => {
      const cel = e.target as HTMLElement;
      if (!cel.closest(".demo-popover") && !cel.closest(".demo-pill")) zamknij();
    };
    document.addEventListener("keydown", klawisz);
    document.addEventListener("mousedown", klik);
    return () => {
      document.removeEventListener("keydown", klawisz);
      document.removeEventListener("mousedown", klik);
    };
  }, [zamknij]);
  return (
    <div className="demo-popover" role="dialog" aria-label="Kup tę stronę">
      <Akcje pelne />
      <p className="demo-note">Dwa warianty do wyboru. Płatność online przez Stripe.</p>
    </div>
  );
}

export function Demo() {
  const [zwiniety, setZwiniety] = useState(false);
  const [telefon, setTelefon] = useState(false);
  const [arkusz, setArkusz] = useState(false);
  const [dymek, setDymek] = useState(false);
  const pigulka = useRef<HTMLButtonElement>(null);
  const zamknijArkusz = useCallback(() => setArkusz(false), []);
  const zamknijDymek = useCallback(() => setDymek(false), []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("tryb-pokazowy");
    try {
      if (sessionStorage.getItem(KLUCZ_ZWINIECIA) === "1") setZwiniety(true);
    } catch {
      /* brak dostępu do pamięci sesji */
    }
    const mq = window.matchMedia("(max-width: 767px)");
    const ustaw = () => setTelefon(mq.matches);
    ustaw();
    mq.addEventListener("change", ustaw);
    const blokuj = (e: Event) => {
      if (e.target instanceof HTMLImageElement) e.preventDefault();
    };
    const bezPrzeciagania = () => document.querySelectorAll("img").forEach((i) => (i.draggable = false));
    bezPrzeciagania();
    const mo = new MutationObserver(bezPrzeciagania);
    mo.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("contextmenu", blokuj);
    document.addEventListener("dragstart", blokuj);
    return () => {
      html.classList.remove("tryb-pokazowy");
      mq.removeEventListener("change", ustaw);
      mo.disconnect();
      document.removeEventListener("contextmenu", blokuj);
      document.removeEventListener("dragstart", blokuj);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("pasek-zwiniety", zwiniety);
  }, [zwiniety]);

  const zwin = () => {
    setZwiniety(true);
    try {
      sessionStorage.setItem(KLUCZ_ZWINIECIA, "1");
    } catch {
      /* brak dostępu do pamięci sesji */
    }
    requestAnimationFrame(() => pigulka.current?.focus());
  };

  return (
    <div className="demo-root">
      {zwiniety ? (
        <aside aria-label="Informacja o stronie pokazowej">
          <button
            ref={pigulka}
            type="button"
            className="demo-pill"
            data-nasluch-klik="otworz-zakup"
            aria-expanded={telefon ? arkusz : dymek}
            onClick={() => (telefon ? setArkusz(true) : setDymek((d) => !d))}
          >
            Strona pokazowa · Kup
          </button>
          {dymek && !telefon && <Dymek zamknij={zamknijDymek} />}
        </aside>
      ) : (
        <aside className="demo-bar" aria-label="Informacja o stronie pokazowej">
          <div className="demo-bar-inner">
            <div className="demo-bar-left">
              <span className="demo-label">Strona pokazowa</span>
              <span className="demo-text">Ta strona jest gotowa do publikacji na {POKAZ.domena}.</span>
            </div>
            <div className="demo-bar-right">
              <div className="demo-desktop-actions">
                <Akcje />
              </div>
              <button type="button" className="demo-btn demo-mobile-actions" data-nasluch-klik="otworz-zakup" onClick={() => setArkusz(true)}>
                Kup stronę
              </button>
              <button type="button" className="demo-x" aria-label="Zwiń pasek" onClick={zwin}>
                <Zamknij />
              </button>
            </div>
          </div>
        </aside>
      )}
      {arkusz && <Arkusz zamknij={zamknijArkusz} />}
    </div>
  );
}
