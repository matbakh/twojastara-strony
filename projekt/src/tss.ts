/**
 * Stałe twojastara.site wspólne dla wszystkich stron pokazowych i wycen.
 * Nie zmieniać per klient (per klient jest tylko src/klient.ts i src/wycena/dane.ts).
 */
export const TSS = {
  marka: "TWOJASTARA.SITE",
  strona: "https://twojastara.site",
  polityka: "https://twojastara.site/polityka-prywatnosci",
  sprzedawca: "Greenverge LTD",
  stripe: {
    miesiecznie: "https://buy.stripe.com/8x214h5lQgf4daraNn5os04",
    jednorazowo: "https://buy.stripe.com/cNi6oB5lQaUK0nF4oZ5os03",
  },
  ceny: { miesiecznie: "99 zł", jednorazowo: "690 zł" },
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

/** Link do płatności Stripe z identyfikatorem klienta (client_reference_id = slug). */
export function linkStripe(rodzaj: "miesiecznie" | "jednorazowo", slug: string): string {
  return `${TSS.stripe[rodzaj]}?client_reference_id=${encodeURIComponent(slug)}`;
}
