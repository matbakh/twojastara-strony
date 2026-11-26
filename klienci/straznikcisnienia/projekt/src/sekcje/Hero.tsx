import { useEffect, useRef, type CSSProperties } from "react";
import { HERO, KLIENT } from "../klient";
import { t } from "../lib/tekst";
import { Strzalka, Telefon } from "../ui/Ikony";
import { Obraz } from "../ui/Obraz";

/**
 * Hero na wzór BYQ Supply „Split Hero With Image” (stringer-hero-1): po lewej etykieta, bardzo duży nagłówek
 * wysuwany słowo po słowie, opis i stopka z przyciskiem, linkiem i krótkim podpisem; po prawej zdjęcie
 * na całą wysokość z delikatnym paralaksem. Do tego pływająca karta z ceną (pomysł z BYQ code-house-hero-5).
 * Na telefonie tekst nad zdjęciem.
 */
export function Hero() {
  const zdjecie = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let klatka = 0;
    const przesun = () => {
      klatka = 0;
      const img = zdjecie.current;
      const rodzic = img?.parentElement;
      if (!img || !rodzic) return;
      const r = rodzic.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const postep = Math.max(-1, Math.min(1, -r.top / window.innerHeight));
      img.style.transform = `translate3d(0, ${(postep * 60).toFixed(1)}px, 0) scale(1.06)`;
    };
    const naPrzewiniecie = () => {
      if (!klatka) klatka = requestAnimationFrame(przesun);
    };
    przesun();
    window.addEventListener("scroll", naPrzewiniecie, { passive: true });
    return () => {
      window.removeEventListener("scroll", naPrzewiniecie);
      if (klatka) cancelAnimationFrame(klatka);
    };
  }, []);

  let licznik = 0;

  return (
    <section
      id="start"
      data-nasluch-sekcja="start"
      className="na-ciemnym relative bg-grafit text-white"
      style={{ paddingTop: "var(--naglowek-h)" }}
    >
      <div className="grid lg:min-h-[calc(100svh-var(--demo-h)-var(--naglowek-h))] lg:grid-cols-2">
        {/* Lewa kolumna: tekst przy dolnej krawędzi */}
        <div className="skala flex flex-col justify-end gap-10 px-8 pt-16 pb-14 max-[767px]:gap-8 max-[767px]:px-[18px] max-[767px]:pt-9 max-[767px]:pb-10 lg:gap-8 lg:pt-10 lg:pb-10 lg:pr-14 lg:pl-[max(32px,calc((100vw-1320px)/2+32px))]">
          <div className="flex flex-col items-start gap-6 max-[767px]:gap-5 lg:gap-5">
            <p data-pokaz className="etykieta m-0">
              {HERO.znacznik}
            </p>

            <h1 data-pokaz className="slowa naglowek-szeroki m-0 text-[clamp(40px,min(6.3vw,10vh),100px)] leading-[0.94] tracking-[-0.045em]">
              {HERO.tytul.map((linia, nr) => (
                <span key={nr} className={`block ${nr === 1 ? "text-turkus" : ""}`}>
                  {linia.map((slowo, i) => {
                    const indeks = licznik++;
                    return (
                      <span key={i}>
                        <span className="slowo">
                          <span style={{ "--i": indeks } as CSSProperties}>{slowo}</span>
                        </span>
                        {i < linia.length - 1 ? " " : ""}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>

            <p
              data-pokaz
              style={{ "--opoznienie": "450ms" } as CSSProperties}
              className="m-0 max-w-[560px] text-[19px] leading-[1.5] text-white/75 max-[479px]:text-[17px] lg:text-[18px]"
            >
              {t(HERO.opis)}
            </p>
          </div>

          <div
            data-pokaz
            style={{ "--opoznienie": "650ms", "--przesuniecie": "0px" } as CSSProperties}
            className="flex w-full flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-white/12 pt-6"
          >
            <div className="flex flex-wrap items-center gap-3 max-[479px]:grid max-[479px]:w-full max-[479px]:grid-cols-2">
              <a href="#cennik" className="przycisk przycisk-turkus max-[479px]:px-3" data-nasluch-klik="zamow-hero">
                Zamów zestaw
                <Strzalka />
              </a>
              <a href={KLIENT.telefonHref} className="przycisk przycisk-obrys-jasny max-[479px]:px-3" data-nasluch-klik="telefon-hero">
                <Telefon />
                {KLIENT.telefonPokaz}
              </a>
            </div>
            <p className="m-0 font-mono text-[12px] leading-snug tracking-[0.02em] text-white/55">{HERO.podpis}</p>
          </div>
        </div>

        {/* Prawa kolumna: zdjęcie i karta z ceną */}
        <div
          data-pokaz
          style={{ "--opoznienie": "200ms", "--przesuniecie": "0px" } as CSSProperties}
          className="relative min-h-[560px] bg-grafit-2 max-lg:min-h-0 md:max-lg:aspect-[4/3] max-[767px]:bg-grafit max-[767px]:pb-10"
        >
          <div className="absolute inset-0 overflow-hidden max-[767px]:relative max-[767px]:aspect-[4/3]">
            <Obraz
              odnosnik={zdjecie}
              nazwa={HERO.zdjecie.plik}
              opis={HERO.zdjecie.opis}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priorytet
              className="absolute inset-0 h-full w-full object-cover object-[60%_50%] will-change-transform"
              style={{ transform: "scale(1.06)" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-grafit/55 via-transparent to-transparent" aria-hidden="true" />

            <p className="absolute top-5 right-5 m-0 flex items-center gap-2.5 bg-grafit/80 px-3 py-2 font-mono text-[12px] text-white backdrop-blur max-[479px]:top-3 max-[479px]:right-3 max-[479px]:text-[11px]">
              <span className="kropka-stan" aria-hidden="true" />
              zielony = właściwe ciśnienie
            </p>
          </div>

          <div className="sciety-rog absolute bottom-6 left-6 w-[min(330px,calc(100%-48px))] bg-white p-6 text-grafit shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)] max-[767px]:relative max-[767px]:bottom-auto max-[767px]:left-auto max-[767px]:mx-[18px] max-[767px]:-mt-14 max-[767px]:w-auto max-[767px]:p-5">
            <div className="flex items-baseline justify-between gap-4">
              <p className="m-0 font-mono text-[11px] font-medium tracking-[0.08em] text-grafit/65 uppercase">
                {HERO.karta.nazwa} · {HERO.karta.szczegol}
              </p>
            </div>
            <p className="m-0 mt-2 font-mono text-[40px] leading-none font-medium tracking-[-0.04em] max-[479px]:text-[34px]">{HERO.karta.cena}</p>
            <p className="m-0 mt-2 text-[14px] text-grafit/65">{HERO.karta.dopisek}</p>
            <a href="#cennik" className="link-kreska mt-4 text-grafit" data-nasluch-klik="cennik-hero">
              Cennik i pakiety
              <Strzalka className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
