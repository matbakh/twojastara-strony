import { zdjecie } from "../lib/tekst";

/** Szerokości plików w public/img (duża i mała wersja), żeby przeglądarka dobrała właściwy plik. */
const SZEROKOSCI: Record<string, [number, number]> = {
  "monitoring-maszt": [1022, 600],
  "osprzet-natynkowy": [1196, 800],
  "prace-ziemne": [943, 600],
  "rozdzielnica-biuro-magazyn": [1261, 800],
  "rozdzielnica-drewno": [1261, 800],
  "rozdzielnica-hager": [1261, 800],
  "rozdzielnica-licznik": [1261, 800],
  "rozdzielnica-rozlacznik": [1261, 800],
  "rozdzielnice-zolta-sciana": [896, 600],
  "trzy-rozdzielnice": [943, 600],
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
