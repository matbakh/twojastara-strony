/**
 * Dane parafii dla szablonu stron TwojaStara.site (BYQ Supply + GitHub Pages).
 * Tylko fakty z obecnej strony parafialazyn2.pl (strona główna, sakramenty, historia, kontakt, galeria).
 * Niczego nie wymyślamy (godziny, daty, liczby, nazwiska).
 */

export const KLIENT = {
  slug: "parafialazyn2",
  firma: "Parafia Łążyn II",
  firmaPelna: "Parafia Rzymskokatolicka pw. Świętych Apostołów Piotra i Pawła w Łążynie II",
  firmaStopka: "Parafia Rzymskokatolicka Łążyn II pw. Świętych Apostołów Piotra i Pawła",
  wezwanie: "Świętych Apostołów Piotra i Pawła",
  diecezja: "Diecezja Włocławska",
  proboszcz: "ks. Roman Foksiński",
  nip: "879 25 47 912",
  obecnaStrona: "https://parafialazyn2.pl",
  telefon: "721 432 415",
  telefonPokaz: "721 432 415",
  telefonHref: "tel:+48721432415",
  email: "parafialazyn2@gmail.com",
  adres: "Łążyn II 32, 87-123 Dobrzejewice",
  adresUlica: "Łążyn II 32",
  adresMiasto: "87-123 Dobrzejewice",
  dojazd: "https://www.google.pl/maps/dir/%C5%81%C4%85%C5%BCyn+II+32%2C87-123+Dobrzejewice",
  facebook: "https://facebook.com/parafialazyn2",
  konto: {
    bank: "BS Grębocin",
    numer: "85 9491 0003 0020 0009 0652 0002",
  },
  kolory: {
    zloto: "#978339",
    zlotoJasne: "#DDCE97",
    atrament: "#1D1A14",
    krem: "#F7F3E8",
  },
} as const;

/** Godziny z obecnej strony (sekcje „Msze Św.”, „Spowiedź Św.”, „Kancelaria parafialna”, „Nabożeństwa”). */
export const MSZE = {
  niedziela: ["9:00", "11:30", "15:00"],
  sobotaWigilia: "18:00",
  powszednie: ["17:00"],
  swietaZniesione: ["9:00", "12:00", "17:00"],
  od: "od 3 marca 2024",
  zastrzezenie:
    "Zastrzegamy sobie zmiany godzin odprawiania Mszy Świętych, dlatego warto na bieżąco śledzić ogłoszenia duszpasterskie.",
  spowiedz: [
    { kiedy: "Przez cały tydzień", godziny: "30 minut przed Mszą Świętą" },
    { kiedy: "W I piątek miesiąca", godziny: "16:00–17:00" },
  ],
  kancelaria: {
    godziny: "17:30–18:30",
    dni: "Poniedziałek–piątek",
    opis: "po Mszy Świętej o 17:00",
    nieczynna: "W niedziele oraz święta kościelne i państwowe kancelaria jest nieczynna.",
    wyjatek: "Pogrzeb można zgłosić także poza tymi godzinami. W sprawach pilnych prosimy dzwonić.",
    intencje: "Msze Święte w intencjach można zamawiać telefonicznie.",
  },
  wielkiPost: [
    { co: "Gorzkie Żale", kiedy: "w każdą niedzielę Wielkiego Postu, na przemian po Mszy Świętej o 9:00 i o 11:30" },
    { co: "Droga Krzyżowa", kiedy: "w każdy piątek Wielkiego Postu o 18:00" },
  ],
};

export const HERO = {
  znacznik: "Parafia rzymskokatolicka · Diecezja Włocławska",
  zdjecie: { plik: "kosciol-glowne", opis: "Kościół Świętych Apostołów Piotra i Pawła w Łążynie II o zachodzie słońca" },
  wiersze: [
    { etykieta: "Niedziele i święta", wartosc: "9:00 · 11:30 · 15:00" },
    { etykieta: "Sobota, liturgia niedzielna", wartosc: "18:00" },
    { etykieta: "Dni powszednie", wartosc: "17:00" },
    { etykieta: "Spowiedź", wartosc: "30 min przed Mszą Świętą" },
  ],
};

/** Ostatnie ogłoszenia z obecnej strony (XXII niedziela zwykła, 31.08.2025), skrócone. */
export const OGLOSZENIA = {
  tytul: "XXII niedziela zwykła",
  data: "31.08.2025",
  punkty: [
    "Podczas Mszy Świętej o 11:30 dziękczynienie za tegoroczne plony. Wieńce i chleby dożynkowe są w naszym kościele. Dziękujemy wszystkim, którzy przygotowali dożynkowe święto, oraz parafianom i gościom za udział.",
    "Bóg zapłać mieszkańcom Zębowa za sprzątanie i udekorowanie kościoła. W tym tygodniu o sprzątanie prosimy: Zębowo I Kolonia, w sobotę o 10:00.",
    "W Roku Jubileuszowym zapraszamy na pielgrzymkę autokarową do Medziugorie, 19–25.10.2025, koszt 1990 zł i 50 euro na wstępy i przewodnika.",
    "W przyszłą niedzielę zbiórka na tacę na cele inwestycyjne naszego kościoła. Dziękujemy za wszystkie ofiary.",
    "Zachęcamy do nabywania prasy katolickiej, w tym nowych numerów czasopisma „Idziemy”.",
  ],
  podpis: "Ks. Roman Foksiński, proboszcz",
};

export type Sakrament = {
  nr: string;
  tytul: string;
  opis: string;
  dokumenty?: string[];
  dopisek?: string;
};

export const SAKRAMENTY: Sakrament[] = [
  {
    nr: "01",
    tytul: "Chrzest Święty",
    opis: "Udzielany w każdą niedzielę na Mszy Świętej o 11:30. Dziecko zgłaszają rodzice w kancelarii, a akt spisujemy w tygodniu przed chrztem.",
    dokumenty: [
      "akt urodzenia dziecka z USC",
      "dane personalne i adres rodziców chrzestnych",
      "zaświadczenia dla chrzestnych spoza parafii",
    ],
    dopisek: "Chrzestny: ukończone 16 lat, katolik bierzmowany, który przyjął Eucharystię i prowadzi życie zgodne z wiarą.",
  },
  {
    nr: "02",
    tytul: "I Komunia Święta",
    opis: "Do zgłoszenia dziecka potrzebna jest metryka chrztu.",
    dokumenty: ["metryka chrztu dziecka", "zgoda własnego proboszcza, jeśli dziecko nie należy do naszej parafii"],
  },
  {
    nr: "03",
    tytul: "Bierzmowanie",
    opis: "Do zgłoszenia potrzebna jest metryka chrztu i potwierdzenie katechizacji.",
    dokumenty: [
      "metryka chrztu",
      "zaświadczenie o uczestnictwie w katechezie szkolnej lub ostatnie świadectwo katechizacji",
      "osoby starsze: świadectwo ukończenia katechizacji szkolnej",
    ],
  },
  {
    nr: "04",
    tytul: "Małżeństwo",
    opis: "Termin ślubu można ustalić wcześniej. Na spotkanie z dokumentami prosimy przyjść na trzy miesiące przed ślubem.",
    dokumenty: [
      "metryki chrztu wydane w ciągu ostatnich 3 miesięcy",
      "dowody osobiste",
      "ostatnie świadectwo katechizacji",
      "świadectwo bierzmowania, jeśli nie ma go na metryce chrztu",
      "zaświadczenie o katechezie przedmałżeńskiej",
      "zaświadczenie z USC (ślub konkordatowy) albo akt ślubu cywilnego",
    ],
  },
  {
    nr: "05",
    tytul: "Namaszczenie chorych",
    opis: "Sakrament można przyjąć wielokrotnie, ilekroć stan zdrowia znacznie się pogorszy. W sprawach pilnych prosimy dzwonić.",
  },
  {
    nr: "06",
    tytul: "Pogrzeb",
    opis: "Rodzina zgłasza pogrzeb w kancelarii albo telefonicznie, żeby ustalić dzień i godzinę. W dniu pogrzebu odprawiamy Mszę Świętą żałobną, a potem pogrzeb na cmentarzu parafialnym.",
    dokumenty: ["akt zgonu z USC", "zaświadczenie o przyjętych sakramentach"],
    dopisek: "Cmentarz jest otwarty codziennie: od 1 IV do 31 X w godzinach 8:00–20:00, od 1 XI do 31 III od 8:00 do zmroku (do 17:00).",
  },
];

export const PARAFIA = {
  tytul: ["Parafia z XIV wieku,", "kościół z 1848 roku"],
  opis: [
    "Parafia powstała w XIV wieku, a do 1925 roku należała do diecezji płockiej. Obecny kościół stoi od 1848 roku w miejscu drewnianej świątyni z 1710 roku, spalonej w 1846 roku.",
    "To kościół murowany z cegły, na kamiennym cokole, założony na planie krzyża łacińskiego, z wieżą dzwonną nad wschodnią częścią korpusu i wieżyczką na sygnaturkę.",
  ],
  odpusty: [
    { data: "29 VI", nazwa: "Świętych Apostołów Piotra i Pawła" },
    { data: "8 XII", nazwa: "Niepokalanego Poczęcia NMP, tradycyjna uroczystość parafialna" },
  ],
  zdjecia: {
    duze: { plik: "kosciol-6", opis: "Fasada kościoła w Łążynie II" },
    male: { plik: "kosciol-3", opis: "Ołtarz główny kościoła" },
  },
};

export const HISTORIA = [
  { rok: "XIV w.", tytul: "Powstanie parafii", opis: "Parafia zostaje utworzona. Do 1925 roku należy do diecezji płockiej." },
  { rok: "1710", tytul: "Drewniany kościół", opis: "Na miejscu obecnej świątyni stoi drewniany kościół. Spłonął w 1846 roku." },
  { rok: "1848", tytul: "Obecny kościół", opis: "Fundatorem budowy jest Gustaw Zieliński (1809–1881), właściciel dóbr Skępe i Łążyn." },
  { rok: "1938", tytul: "Transept i prezbiterium", opis: "Rusza rozbudowa kościoła. Prace przerywa druga wojna światowa, a kończą się w 1955 roku." },
  { rok: "1954", tytul: "Konsekracja", opis: "4 września 1954 roku kościół konsekruje ks. bp Antoni Pawłowski." },
  { rok: "1995", tytul: "Kaplica przedpogrzebowa", opis: "W latach 1995–1998 powstaje kaplica według projektu mgr. inż. Adama Wincka z Torunia, z miejscem dla około 40 osób." },
  { rok: "2008", tytul: "Kapitalny remont", opis: "W latach 2008–2010 kościół zostaje wyremontowany staraniem parafian, darczyńców i księdza proboszcza." },
  { rok: "2024", tytul: "Ekstremalna Droga Krzyżowa", opis: "15 marca pierwsza Ekstremalna Droga Krzyżowa w parafii: ponad 15 km i ponad 100 uczestników, stacje na terenie Łążyna II, Kuźnik i Zębowa." },
];

export const WSPOLNOTY = [
  "Ministranci",
  "Domowy Kościół",
  "Rada parafialna",
  "Żywy Różaniec",
  "Parafialny zespół Caritas",
  "Chór dziecięcy",
  "Grupa młodzieżowa",
  "Ruch Światło Życie",
];

export const PYTANIA = [
  {
    p: "Jak zamówić Mszę Świętą w intencji?",
    o: "Telefonicznie pod numerem 721 432 415 albo w kancelarii parafialnej: od poniedziałku do piątku w godzinach 17:30–18:30.",
  },
  {
    p: "Kiedy zgłosić chrzest dziecka?",
    o: "W tygodniu przed chrztem, w kancelarii. Chrztu udzielamy w niedzielę na Mszy Świętej o 11:30. Potrzebny jest akt urodzenia dziecka z USC oraz dane i adres rodziców chrzestnych.",
  },
  {
    p: "Kto może być chrzestnym?",
    o: "Osoba, która ukończyła 16 lat, jest katolikiem bierzmowanym, przyjęła Eucharystię i prowadzi życie zgodne z wiarą. Chrzestnym nie może być ojciec ani matka dziecka.",
  },
  {
    p: "Ile wcześniej zgłosić ślub?",
    o: "Termin ślubu można ustalić wcześniej. Dokumenty trzeba przedstawić na trzy miesiące przed ślubem, a metryki chrztu muszą być wydane w ciągu ostatnich 3 miesięcy.",
  },
  {
    p: "Co zrobić po śmierci bliskiej osoby?",
    o: "Skontaktować się z kancelarią osobiście albo telefonicznie, żeby ustalić dzień i godzinę pogrzebu. Potrzebny jest akt zgonu z USC i zaświadczenie o przyjętych sakramentach. Pogrzeb można zgłosić także poza godzinami kancelarii.",
  },
  {
    p: "W jakich godzinach jest otwarty cmentarz?",
    o: "Codziennie: od 1 kwietnia do 31 października w godzinach 8:00–20:00, od 1 listopada do 31 marca od 8:00 do zmroku (do 17:00). Klucze do bram wjazdowych są u Pana Kościelnego.",
  },
];

/** Tryb pokazowy (podgląd dla klienta przed zakupem). */
export const POKAZ = {
  wlaczony: true,
  /** Domena, na której strona ma zostać opublikowana po zakupie. */
  domena: "parafialazyn2.pl",
  /** Adres podglądu (bez końcowego ukośnika) i wyceny. */
  podglad: "https://nowa.twojastara.site/parafialazyn2",
  wycena: "https://nowa.twojastara.site/parafialazyn2/wycena/",
};
