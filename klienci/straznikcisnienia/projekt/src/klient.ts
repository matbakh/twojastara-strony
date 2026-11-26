/**
 * Dane klienta dla szablonu stron TwojaStara.site (BYQ Supply + GitHub Pages).
 * Strażnik Ciśnienia (straznikcisnienia.pl). Tylko fakty z obecnej strony klienta
 * (strona główna, „O Strażniku”, „Zamów”, „FAQ”, „Kontakt” i opakowanie pokazane na stronie).
 * Niczego nie wymyślamy (ceny, opinie, liczby).
 */

const TELEFON = "+48509234413";
const EMAIL = "sklep@straznikcisnienia.pl";

export const KLIENT = {
  slug: "straznikcisnienia",
  firma: "Strażnik Ciśnienia",
  firmaDopelniacz: "Strażnika Ciśnienia",
  obecnaStrona: "https://straznikcisnienia.pl",
  telefon: "+48 509 234 413",
  telefonPokaz: "509 234 413",
  telefonHref: `tel:${TELEFON}`,
  email: EMAIL,
  emailHref: `mailto:${EMAIL}`,
  smsHref:
    `sms:${TELEFON}?&body=` +
    encodeURIComponent("Dzień dobry, piszę ze strony Strażnika Ciśnienia.\nZestaw (do auta czy do roweru): \nIlość: \nAdres dostawy: "),
  adres: "Zgórska 10, 25-827 Kielce",
  mapa: "https://maps.google.com/?cid=2223565492675172361",
  instrukcja: "https://straznikcisnienia.pl/instrukcja.pdf",
  regulamin: "https://straznikcisnienia.pl/regulamin.html",
  polityka: "https://straznikcisnienia.pl/polityka.html",
  kolory: {
    grafit: "#14181B",
    turkus: "#1EACC7",
  },
} as const;

/** Mail z gotowym szablonem zamówienia (obecna strona: zamówienia telefonicznie albo na sklep@). */
export function linkZamowienia(zestaw: string, ilosc: string): string {
  const temat = `Zamówienie: ${zestaw}, ${ilosc}`;
  const tresc = `Dzień dobry,\nzamawiam Strażnika Ciśnienia: ${zestaw}, ${ilosc}.\n\nImię i nazwisko: \nAdres dostawy: \nTelefon: \n`;
  return `mailto:${EMAIL}?subject=${encodeURIComponent(temat)}&body=${encodeURIComponent(tresc)}`;
}

export const HERO = {
  znacznik: "Wskaźnik ciśnienia w oponach",
  tytul: [
    ["Spójrz", "na", "wentyl."],
    ["Jedź", "spokojnie."],
  ],
  opis:
    "Strażnik Ciśnienia to nakrętki na wentyl, które pokazują ciśnienie w oponie kolorem: zielony oznacza właściwe ciśnienie, czerwony jego spadek. Do auta, motocykla, skutera i roweru.",
  podpis: "Jedyny producent i dystrybutor w Polsce",
  zdjecie: { plik: "zestaw-na-kole", opis: "Opakowanie Strażnika Ciśnienia oparte o koło samochodu" },
  karta: { nazwa: "Zestaw do auta", szczegol: "4 wskaźniki", cena: "59,99 zł", dopisek: "Do roweru: 2 wskaźniki za 39 zł" },
};

export const FAKTY = [
  { wartosc: "1,4–3,0 atm", opis: "pasuje do opon o takim ciśnieniu" },
  { wartosc: "0,2 atm", opis: "spadek ciśnienia, który pokazuje czerwony znacznik" },
  { wartosc: "4 albo 2", opis: "wskaźniki w zestawie: do auta albo do roweru" },
  { wartosc: "Polska", opis: "jedyny producent i dystrybutor w kraju" },
];

export const KROKI = [
  {
    tytul: "Uzupełnij i nakręć",
    opis: "Najpierw uzupełnij ciśnienie do wartości prawidłowej (opony pompuj, gdy są zimne). Potem nakręć po jednym wskaźniku na każdy wentyl.",
  },
  {
    tytul: "Zielony: jedziesz",
    opis: "Po nakręceniu wskaźnik się aktywuje i widać zielony znacznik. Zielony to właściwe ciśnienie.",
  },
  {
    tytul: "Czerwony: dopompuj",
    opis: "Nawet niewielkie wysunięcie czerwonego znacznika oznacza spadek ciśnienia o 0,2 atm. Uzupełnij ciśnienie i nakręć wskaźnik z powrotem.",
  },
];

export const KORZYSCI = {
  duza: {
    tytul: "Usiądź wygodnie, poczuj się bezpiecznie",
    opis: "Wystarczy jedno proste spojrzenie na każdą oponę, aby sprawdzić stan ciśnienia w każdej z nich. Patrzysz i jedziesz spokojnie.",
    zdjecie: { plik: "noc-droga", opis: "Droga nocą w światłach samochodów" },
  },
  male: [
    { ikona: "tarcza", tytul: "Bezpieczniejsza jazda", opis: "Właściwe ciśnienie w oponach zapewnia bezpieczeństwo i komfort jazdy." },
    { ikona: "kropla", tytul: "Oszczędność paliwa", opis: "Jazda na obniżonym ciśnieniu zwiększa zużycie paliwa. Ze Strażnikiem widzisz to od razu." },
    { ikona: "opona", tytul: "Dłuższe życie opon", opis: "Obniżone ciśnienie skraca żywotność opony. Wskaźnik pomaga zapobiec jej uszkodzeniu." },
    { ikona: "portfel", tytul: "Oszczędność czasu i pieniędzy", opis: "Stała kontrola ciśnienia to oszczędność pieniędzy i czasu. To wydatek jednorazowy." },
    { ikona: "klucz", tytul: "Szybki montaż", opis: "Wskaźniki są szybkie w montażu, łatwe w użyciu i wielokrotnego użytku." },
  ],
  szeroka: {
    tytul: "Auto, motocykl, skuter, rower",
    opis: "Do wszystkich kół, w których ciśnienie nie przekracza 3 atm.",
    zdjecie: { plik: "opona", opis: "Bieżnik opony samochodowej" },
  },
};

export type Pakiet = { ilosc: string; cena: string; zaZestaw?: string };
export type Wariant = { klucz: "auto" | "rower"; nazwa: string; pelna: string; wskazniki: string; zdjecie: string; opisZdjecia: string; pakiety: Pakiet[] };

/** Cennik z zakładki „Zamów” na obecnej stronie. */
export const CENNIK: { opis: string; wiecej: string; warianty: Wariant[] } = {
  opis: "Pakiety 10 i 50 zestawów to niższa cena za zestaw: na prezent albo do dalszej sprzedaży w ramach Twojej działalności.",
  wiecej: "Większe ilości albo współpraca? Zapraszamy do kontaktu bezpośredniego.",
  warianty: [
    {
      klucz: "auto",
      nazwa: "Do auta",
      pelna: "zestaw do auta (4 wskaźniki)",
      wskazniki: "4 wskaźniki",
      zdjecie: "zestaw-auto",
      opisZdjecia: "Opakowanie zestawu Strażnik Ciśnienia z czterema wskaźnikami",
      pakiety: [
        { ilosc: "1 zestaw", cena: "59,99 zł" },
        { ilosc: "10 zestawów", cena: "500 zł", zaZestaw: "50 zł za zestaw" },
        { ilosc: "50 zestawów", cena: "2000 zł", zaZestaw: "40 zł za zestaw" },
      ],
    },
    {
      klucz: "rower",
      nazwa: "Do roweru",
      pelna: "zestaw do roweru (2 wskaźniki)",
      wskazniki: "2 wskaźniki",
      zdjecie: "zestaw-rower",
      opisZdjecia: "Opakowanie zestawu Strażnik Ciśnienia do roweru z dwoma wskaźnikami",
      pakiety: [
        { ilosc: "1 zestaw", cena: "39 zł" },
        { ilosc: "10 zestawów", cena: "350 zł", zaZestaw: "35 zł za zestaw" },
        { ilosc: "50 zestawów", cena: "1500 zł", zaZestaw: "30 zł za zestaw" },
      ],
    },
  ],
};

export const PYTANIA = [
  {
    p: "Czym jest Strażnik Ciśnienia?",
    o: "To nakrętki na wentyl, które monitorują ciśnienie w kołach samochodów, motocykli, skuterów i rowerów. Kolor znacznika pokazuje, czy ciśnienie jest właściwe.",
  },
  {
    p: "Czy pasuje do mojego samochodu?",
    o: "Wskaźniki pasują do wszystkich kół, w których ciśnienie nie przekracza 3 atm: do opon o ciśnieniu od 1,4 do 3,0 atm.",
  },
  {
    p: "Jak działa wskaźnik?",
    o: "Po nakręceniu na wentyl wskaźnik się aktywuje i widać zielony kolor. Jeżeli ciśnienie spada, pojawia się kolor czerwony.",
  },
  {
    p: "Jak zamontować wskaźniki?",
    o: "Uzupełnij ciśnienie w oponach do wartości prawidłowej, a potem nakręć po jednym wskaźniku na każdy wentyl. W motocyklu po nakręceniu obróć koło i sprawdź, czy wskaźnik nie zawadza o ramę albo widelec.",
  },
  {
    p: "Czy wskaźnik zawsze pokaże właściwe ciśnienie?",
    o: "Wystarczy spojrzeć na kolor: zielony to właściwe ciśnienie, czerwony niewłaściwe. Sprawdzaj wskaźniki regularnie.",
  },
  {
    p: "Czy kupując więcej, zapłacę mniej?",
    o: "Tak. W pakietach 10 i 50 zestawów cena za zestaw jest niższa (zobacz cennik). Przy większych ilościach zapraszamy do kontaktu bezpośredniego.",
  },
  {
    p: "Dlaczego warto kupić oryginalnego Strażnika Ciśnienia?",
    o: "To wydatek jednorazowy: wskaźniki są wielokrotnego użytku, pozwalają oszczędzać paliwo i środowisko oraz poprawiają bezpieczeństwo podróżujących.",
  },
];

/** Tryb pokazowy (podgląd dla klienta przed zakupem). */
export const POKAZ = {
  wlaczony: true,
  /** Domena, na której strona ma zostać opublikowana po zakupie. */
  domena: "straznikcisnienia.pl",
  /** Adres podglądu (bez końcowego ukośnika) i wyceny. */
  podglad: "https://nowa.twojastara.site/straznikcisnienia",
  wycena: "https://nowa.twojastara.site/straznikcisnienia/wycena/",
};
