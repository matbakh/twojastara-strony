/**
 * Dane klienta dla szablonu stron TwojaStara.site (BYQ Supply + GitHub Pages).
 * Każda nowa strona = kopia szablonu + nowy plik klient.ts + zdjęcia w public/img.
 * Tylko fakty z obecnej strony klienta. Niczego nie wymyślamy (ceny, opinie, liczby).
 */

export const KLIENT = {
  slug: "middin",
  firma: "MID&DIN Technology",
  firmaPelna: "MID&DIN Technology sp. z o.o.",
  nip: "1133010541",
  obecnaStrona: "https://reefy-dune-zyq8amdu.s1-sandywp.com",
  obecnaStronaPokaz: "kopia robocza strony (WordPress)",
  telefon: "+48 533 077 055",
  telefonPokaz: "533 077 055",
  telefonHref: "tel:+48533077055",
  smsHref:
    "sms:+48533077055?&body=" +
    encodeURIComponent(
      "Dzień dobry, piszę ze strony MID&DIN.\nLokalizacja i obiekt: \nZakres prac: \nTermin: ",
    ),
  adres: "Niekłańska 35/1, 03-924 Warszawa",
  adresOpis: "adres rejestrowy",
  obszar: "Warszawa i pobliskie miejscowości",
  mapa: "https://maps.app.goo.gl/QMEWejuGyzd9Zxji8",
  facebook: "https://www.facebook.com/MIDandDINTechnology",
  oferteo: "https://www.oferteo.pl/mid-din-technology-sp-z-o-o/firma/3904920",
  opinieGoogle: "https://maps.app.goo.gl/QMEWejuGyzd9Zxji8",
  /** Godziny pracy. Klucz: dzień tygodnia (0 = niedziela). */
  godziny: {
    1: ["08:00", "20:00"],
    2: ["08:00", "20:00"],
    3: ["08:00", "20:00"],
    4: ["08:00", "20:00"],
    5: ["08:00", "20:00"],
    6: ["09:00", "17:00"],
    0: null,
  } as Record<number, [string, string] | null>,
  kolory: {
    granat: "#17242C",
    zolty: "#F7DF0A",
  },
} as const;

export const HERO = {
  znacznik: "Elektryka i monitoring · aglomeracja warszawska",
  tytul: ["Rzetelny elektryk.", "Stały kontakt."],
  opis:
    "Awarie, wymiana lamp i gniazdek, instalacje i monitoring. Jasno ustalamy zakres i cenę, a po zleceniu nadal odbieramy telefon lub oddzwaniamy.",
  zdjecia: [
    { plik: "rozdzielnice-zolta-sciana", opis: "Rozdzielnice i osprzęt na żółtej ścianie" },
    { plik: "rozdzielnica-biuro-magazyn", opis: "Rozdzielnica biura i magazynu" },
    { plik: "monitoring-maszt", opis: "Kamery monitoringu na maszcie" },
    { plik: "rozdzielnica-hager", opis: "Rozdzielnica z opisanymi obwodami" },
    { plik: "osprzet-natynkowy", opis: "Termostat i włączniki natynkowe" },
    { plik: "rozdzielnica-drewno", opis: "Rozdzielnica w drewnianym wnętrzu" },
    { plik: "trzy-rozdzielnice", opis: "Trzy rozdzielnice z zabezpieczeniami" },
  ],
};

export const FAKTY = [
  { wartosc: "1988", opis: "pierwsze instalacje elektryczne współwłaściciela" },
  { wartosc: "2020", opis: "MID&DIN Technology działa jako spółka" },
  { wartosc: "1–2 h", opis: "tyle zwykle trwa proste zlecenie" },
  { wartosc: "od 350 zł", opis: "netto: dojazd i pierwsza roboczogodzina" },
];

export const USLUGI = [
  {
    nr: "01",
    tytul: "Awarie elektryczne",
    opis: "Diagnoza i usuwanie drobnych usterek, np. gdy nie działa gniazdko albo nie ma prądu w części mieszkania.",
    zdjecie: "rozdzielnica-licznik",
    wskazowka: "Opisz usterkę, a ustalimy zakres wizyty.",
  },
  {
    nr: "02",
    tytul: "Instalacje elektryczne",
    opis: "Montaż i modernizacja instalacji, rozdzielnice oraz podział obwodów.",
    zdjecie: "rozdzielnica-biuro-magazyn",
    wskazowka: "Powiedz, na jakim etapie jest inwestycja.",
  },
  {
    nr: "03",
    tytul: "Lampy, gniazdka i włączniki",
    opis: "Wymieniamy żyrandole, lampy, gniazdka i włączniki w istniejącej instalacji.",
    zdjecie: "osprzet-natynkowy",
    wskazowka: "Podaj liczbę punktów i napisz, czy masz już nowy osprzęt.",
  },
  {
    nr: "04",
    tytul: "Monitoring",
    opis: "Dobór i montaż kamer do obserwacji wejść, posesji i wybranych stref obiektu.",
    zdjecie: "monitoring-maszt",
    wskazowka: "Napisz, co ma być widać na kamerach.",
  },
];

export const CENNIK = {
  opis:
    "Zakres prac ustalamy telefonicznie. Cena obejmuje dojazd i pierwszą roboczogodzinę. Przed rozpoczęciem potwierdzamy cenę, koszt dalszych prac i ewentualnych materiałów.",
  pozycje: [
    { dzien: "Poniedziałek–piątek", cena: "350 zł", dopisek: "netto, dojazd + pierwsza roboczogodzina" },
    { dzien: "Sobota", cena: "450 zł", dopisek: "netto, dojazd + pierwsza roboczogodzina" },
  ],
};

export const REALIZACJE = [
  { plik: "rozdzielnica-biuro-magazyn", opis: "Rozdzielnica biura i magazynu", uklad: "szeroki" },
  { plik: "trzy-rozdzielnice", opis: "Zestaw rozdzielnic z zabezpieczeniami", uklad: "wysoki" },
  { plik: "rozdzielnica-hager", opis: "Rozdzielnica z opisanymi obwodami", uklad: "zwykly" },
  { plik: "monitoring-maszt", opis: "Kamery monitoringu na maszcie", uklad: "wysoki" },
  { plik: "rozdzielnica-licznik", opis: "Rozdzielnica z licznikiem cyfrowym", uklad: "zwykly" },
  { plik: "rozdzielnica-drewno", opis: "Rozdzielnica w drewnianym wnętrzu", uklad: "zwykly" },
  { plik: "prace-ziemne", opis: "Minikoparka na miejscu prac", uklad: "zwykly" },
  { plik: "rozdzielnica-rozlacznik", opis: "Rozdzielnica z opisanymi sekcjami", uklad: "szeroki" },
];

export const WSPOLPRACA = [
  { tytul: "Rozmowa", opis: "Opowiedz o obiekcie i o tym, czego potrzebujesz. Odbieramy telefon lub oddzwaniamy. Odpowiadamy też na SMS-y." },
  { tytul: "Wycena", opis: "Ustalamy zakres oraz warunki wykonania, zanim zaczniemy pracę." },
  { tytul: "Montaż", opis: "Wykonujemy uzgodnione prace. Jeśli pojawią się dodatkowe prace, omawiamy je z Tobą przed ich wykonaniem." },
  { tytul: "Odbiór", opis: "Omawiamy działanie instalacji. Po zakończeniu zlecenia nadal odbieramy telefon lub oddzwaniamy." },
];

export const HISTORIA = {
  tytul: "Od pierwszych instalacji do własnej firmy",
  opis:
    "MID&DIN Technology sp. z o.o. działa od 2020 roku. Jej współwłaściciel i prezes zarządu wykonał pierwsze instalacje elektryczne w 1988 roku, w wieku ośmiu lat.",
  kroki: [
    { rok: "1988", tytul: "Elektryka", opis: "Pierwsze wykonane instalacje elektryczne." },
    { rok: "2005", tytul: "Telekomunikacja", opis: "Rozszerzenie doświadczenia o telekomunikację." },
    { rok: "2014", tytul: "Monitoring", opis: "Pierwsze doświadczenia z systemami monitoringu." },
    { rok: "2020", tytul: "MID&DIN Technology", opis: "Formalny początek działalności spółki." },
  ],
  zdjecie: "rozdzielnice-zolta-sciana",
};

export const ZAPYTANIE = [
  { tytul: "Lokalizacja i obiekt", opis: "Miejscowość oraz to, czy chodzi o dom, mieszkanie czy lokal." },
  { tytul: "Zakres prac", opis: "Co ma powstać, co wymaga wymiany albo jaki problem trzeba sprawdzić." },
  { tytul: "Etap i termin", opis: "Na jakim etapie jest inwestycja i kiedy chcesz zacząć." },
];

export const PYTANIA = [
  {
    p: "Czy działacie poza Warszawą?",
    o: "Obsługujemy Warszawę i pobliskie miejscowości. Zadzwoń i podaj miejscowość inwestycji, aby ustalić możliwość dojazdu.",
  },
  {
    p: "Jak rozliczacie wizytę przy awarii?",
    o: "Zakres prac ustalamy telefonicznie. Cena obejmuje dojazd i pierwszą roboczogodzinę. Przed rozpoczęciem potwierdzamy cenę, koszt dalszych prac i ewentualnych materiałów.",
  },
  {
    p: "Jak otrzymać wycenę?",
    o: "Podaj lokalizację, typ obiektu i zakres planowanych prac. Jeśli masz plan lub zdjęcia instalacji, przygotuj je do rozmowy.",
  },
  {
    p: "Czy modernizujecie istniejące instalacje?",
    o: "Tak. Zakres modernizacji ustalamy po omówieniu potrzeb i stanu istniejącej instalacji.",
  },
  {
    p: "Ile trwa drobna naprawa lub wymiana osprzętu?",
    o: "Na proste zlecenia warto przewidzieć około 1–2 godzin. Czas potwierdzamy po ustaleniu zakresu i stanu instalacji.",
  },
];

/** Tryb pokazowy (podgląd dla klienta przed zakupem). */
export const POKAZ = {
  wlaczony: true,
  /** Domena, na której strona ma zostać opublikowana po zakupie. */
  domena: "mid-din.tech",
  /** Adres podglądu (bez końcowego ukośnika) i wyceny. */
  podglad: "https://nowa.twojastara.site/middin",
  wycena: "https://nowa.twojastara.site/middin/wycena/",
};
