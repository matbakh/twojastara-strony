import type { CSSProperties, Ref } from "react";
import { zdjecie } from "../lib/tekst";

/** Szerokości plików w public/img (duża i mała wersja), żeby przeglądarka dobrała właściwy plik. */
const SZEROKOSCI: Record<string, [number, number]> = {
  "zestaw-na-kole": [1600, 800],
  "zestaw-auto": [1355, 800],
  "zestaw-rower": [1308, 800],
  "noc-droga": [1600, 800],
  opona: [1600, 800],
};

type Props = {
  nazwa: string;
  opis: string;
  sizes?: string;
  className?: string;
  priorytet?: boolean;
  style?: CSSProperties;
  odnosnik?: Ref<HTMLImageElement>;
};

export function Obraz({ nazwa, opis, sizes = "100vw", className = "", priorytet = false, style, odnosnik }: Props) {
  const [duza, mala] = SZEROKOSCI[nazwa] ?? [1200, 800];
  return (
    <img
      ref={odnosnik}
      src={zdjecie(nazwa)}
      srcSet={`${zdjecie(nazwa, "male")} ${mala}w, ${zdjecie(nazwa)} ${duza}w`}
      sizes={sizes}
      alt={opis}
      loading={priorytet ? "eager" : "lazy"}
      decoding="async"
      {...(priorytet ? { fetchpriority: "high" } : {})}
      className={className}
      style={style}
    />
  );
}
