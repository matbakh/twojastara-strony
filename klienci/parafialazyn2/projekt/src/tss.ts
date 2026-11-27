/**
 * Stałe twojastara.site wspólne dla wszystkich stron pokazowych i wycen.
 * Nie zmieniać per klient (per klient jest tylko src/klient.ts i src/wycena/dane.ts).
 * Linki Stripe i logowanie Google dla zespołu są w jednym pliku https://nowa.twojastara.site/tss.json
 * (gałąź main repo matbakh/twojastara-strony), więc ich zmiana nie wymaga przebudowy stron.
 */
export const TSS = {
  marka: "TWOJASTARA.SITE",
  strona: "https://twojastara.site",
  polityka: "https://twojastara.site/polityka-prywatnosci",
  sprzedawca: "Greenverge LTD",
  /** Wspólna strona zakupu: przekierowuje do Stripe według tss.json (?w=wariant&k=slug). */
  zakup: "https://nowa.twojastara.site/kup/",
  /** Wspólna konfiguracja: linki Stripe i logowanie Google dla zespołu. */
  konfiguracja: "https://nowa.twojastara.site/tss.json",
  /** Dwa warianty zakupu (Mateusz 25.11.2026 22:52): 690 zł jednorazowo albo 99 zł miesięcznie przez 12 miesięcy. */
  ceny: { miesiecznie: "99 zł", jednorazowo: "690 zł", okres: "12 miesięcy", okresKrotko: "12 mies." },
  doradca: {
    imie: "Mateusz Bąk",
    rola: "Doradca marketingowy",
    telefon: "+48 571 510 686",
    telefonKrotko: "571 510 686",
    telefonHref: "tel:+48571510686",
    whatsapp: "https://wa.me/48571510686",
    email: "mateusz.bak@twojastara.site",
    kalendarz: "https://calendar.app.google/YejnUQqsZBiyTmJ26",
  },
} as const;

export type Wariant = "miesiecznie" | "jednorazowo";

/** Link do zakupu wariantu dla danej strony; /kup/ przekazuje slug do Stripe jako client_reference_id. */
export function linkZakupu(wariant: Wariant, slug: string): string {
  return `${TSS.zakup}?w=${wariant}&k=${encodeURIComponent(slug)}`;
}
