/** Twarde spacje po jednoliterowych wyrazach (a, i, o, u, w, z), żeby nie zostawały na końcu linii. */
export function t(tekst: string): string {
  return tekst.replace(/(^|[\s(„"])([aiouwzAIOUWZ])\s+/g, (_m, p: string, l: string) => `${p}${l} `);
}

/** Adres pliku z katalogu public, z uwzględnieniem ścieżki, pod którą stoi strona. */
export function plik(sciezka: string): string {
  return `${import.meta.env.BASE_URL}${sciezka.replace(/^\//, "")}`;
}

export function zdjecie(nazwa: string, wersja: "duze" | "male" = "duze"): string {
  return plik(`img/${nazwa}${wersja === "male" ? "-m" : ""}.webp`);
}
