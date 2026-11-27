import { zdjecie } from "../lib/tekst";

/** Szerokości plików w public/img (duża i mała wersja), żeby przeglądarka dobrała właściwy plik. */
const SZEROKOSCI: Record<string, [number, number]> = {
  "kosciol-glowne": [1600, 800],
  "kosciol-1": [1600, 800],
  "kosciol-2": [1600, 800],
  "kosciol-3": [1600, 800],
  "kosciol-4": [1600, 800],
  "kosciol-5": [1600, 800],
  "kosciol-6": [1600, 800],
  "kosciol-7": [1600, 800],
  "kosciol-8": [692, 692],
};

type Props = {
  nazwa: string;
  opis: string;
  sizes?: string;
  className?: string;
  priorytet?: boolean;
};

export function Obraz({ nazwa, opis, sizes = "100vw", className = "", priorytet = false }: Props) {
  const [duza, mala] = SZEROKOSCI[nazwa] ?? [1200, 800];
  return (
    <img
      src={zdjecie(nazwa)}
      srcSet={`${zdjecie(nazwa, "male")} ${mala}w, ${zdjecie(nazwa)} ${duza}w`}
      sizes={sizes}
      alt={opis}
      loading={priorytet ? "eager" : "lazy"}
      decoding="async"
      {...(priorytet ? { fetchpriority: "high" } : {})}
      className={className}
    />
  );
}
