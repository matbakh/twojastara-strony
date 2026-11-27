/**
 * Treść wyceny dla klienta (standard twojastara.site z FKU).
 * Parafia: zwracamy się do proboszcza formą „Ksiądz” (obecna strona podpisuje ogłoszenia: ks. Roman Foksiński, proboszcz),
 * dlatego formy grzecznościowe są w polu `formy`, a nazwa w dopełniaczu w polu `firmaDla`.
 */
import { KLIENT, POKAZ } from "../klient";

export const WYCENA = {
  slug: KLIENT.slug,
  data: "27.11.2026",
  /** Mianownik (temat maila, podpisy). */
  firma: "Parafia w Łążynie II",
  /** Dopełniacz: „dla …”, „strona …”. */
  firmaDla: "Parafii w\u00a0Łążynie II",
  firmaKrotko: "parafii",
  domena: POKAZ.domena,
  /** Zwrot do klienta (wołacz). */
  zwrot: "Księże Proboszczu",
  /** Formy grzecznościowe: on (Ksiądz), jego (Księdza), nim (z Księdzem). */
  formy: { on: "Ksiądz", jego: "Księdza", nim: "Księdzem" },
  wstep:
    "Księże Proboszczu, dziękujemy za zgłoszenie. Przygotowaliśmy nową stronę parafii: nowoczesną, czytelną na telefonie, w kolorach parafii i na treściach z obecnej strony. Może ją Ksiądz obejrzeć już teraz i od razu zamówić.",
  przedPoTytul: "Ta sama parafia, lepsza strona",
  /** Hasła po normalizacji (małe litery, bez polskich znaków, spacji i myślników). */
  hasla: ["lazyn", "lazyn2", "lazynii", "parafialazyn", "parafialazyn2", "parafialazyn2.pl", "www.parafialazyn2.pl", "piotripawel"],
  podglad: `${POKAZ.podglad}/?z=wycena`,
  podgladPokaz: "nowa.twojastara.site/parafialazyn2",
  jest: [
    "Na telefonie godzin Mszy Świętych nie widać na pierwszym ekranie, a dolny pasek ze skrótami na starcie zasłania baner cookies",
    "Najnowsze ogłoszenia duszpasterskie na stronie są z 31.08.2025, a ostatnia aktualność z 02.08.2025",
    "Strona główna jest bardzo długa: obok spraw parafii są wiadomości z innych serwisów (eKAI, GOSC.PL, WIARA.PL), czytania, transmisje i kilkanaście logotypów, a w dniu sprawdzenia widżet Twittera pokazywał błąd „Rate limit exceeded”",
    "W godzinach Mszy w święta zniesione jest literówka: „9:00,12;00,17:00”",
    "Godziny kancelarii są opisane w dwóch zdaniach („po Mszy św. o godzinie 17.00” i „od godz. 17:30 do 18:30”), więc trudno szybko sprawdzić, kiedy jest czynna",
  ],
  bedzie: [
    "Pierwszy ekran ze zdjęciem kościoła, godzinami Mszy Świętych i przyciskiem „Zadzwoń” do kancelarii, także na telefonie",
    "Godziny Mszy, spowiedzi i kancelarii w czytelnych kartach, z dużymi cyframi",
    "Sakramenty i pogrzeb w sześciu kartach: kiedy zgłosić się do kancelarii i jakie dokumenty przygotować",
    "Historia parafii jako oś czasu od XIV wieku, odpusty, wspólnoty i numer konta z przyciskiem „Kopiuj”",
    "Jedna szybka strona bez dodatków z innych serwisów, z dojazdem jednym kliknięciem i przyklejonym przyciskiem „Zadzwoń” na telefonie",
  ],
  kolory: {
    tytul: ["Złoto parafii", "w nowym układzie"],
    opis: "Kolory z obecnej strony zostały, ułożyliśmy je na nowo: złoto parafii w akcentach i dużych liczbach, jasne złoto w przyciskach, ciepły krem jako tło i ciemny brąz w tekstach i ciemnych sekcjach.",
    probki: [
      { nazwa: "Złoto", hex: "#978339", tekst: "#FFFFFF" },
      { nazwa: "Jasne złoto", hex: "#DDCE97", tekst: "#1D1A14" },
      { nazwa: "Krem", hex: "#F7F3E8", tekst: "#1D1A14" },
      { nazwa: "Ciemny brąz", hex: "#1D1A14", tekst: "#FFFFFF" },
    ],
  },
  logo: {
    tytul: ["To samo logo,", "lepiej podane"],
    opis: "Zostawiliśmy obecne logo parafii: ikonę Świętych Apostołów Piotra i Pawła. Na nowej stronie stoi w okrągłej ramce obok nazwy w kroju Cinzel, takim jak na obecnej stronie. W karcie przeglądarki jest prosty złoty krzyż, czytelny także w małym rozmiarze.",
  },
  potwierdzenia: [
    "Godziny: na obecnej stronie przy godzinach niedzielnych jest dopisek „od 3 marca 2024”. Proszę potwierdzić, czy godziny Mszy, spowiedzi i kancelarii są aktualne",
    "Ogłoszenia: w podglądzie są ostatnie ogłoszenia z obecnej strony (31.08.2025). Przed publikacją wstawimy aktualne i ustalimy, jak je uzupełniać co tydzień",
    "Intencje, galeria, czytelnia i pielgrzymki mają dziś osobne podstrony. W podglądzie ich nie ma, bo to strona uproszczona: kolejne podstrony wycenimy osobno",
    "Zdjęcia: w podglądzie są zdjęcia z galerii obecnej strony. Chętnie dodamy zdjęcia z życia parafii, np. z uroczystości i spotkań wspólnot",
    "Numer konta i NIP są przepisane z obecnej strony. Proszę potwierdzić, że są aktualne",
    "Domena: nowa strona startuje na parafialazyn2.pl, a stare adresy podstron (np. /sakramenty) przekierujemy, żeby nikt nie trafił na błąd",
  ],
  pytania: [
    ["Czy za podgląd i wycenę parafia coś płaci?", "Nie. Za podgląd i wycenę nic Ksiądz nie płaci i do niczego one nie zobowiązują."],
    ["Skąd są treści i zdjęcia?", "Treści i zdjęcia są z obecnej strony parafii. Przed publikacją możemy dodać nowe zdjęcia."],
    ["Co z domeną i pocztą?", "Zostają bez zmian. Zmieniamy tylko to, gdzie wyświetla się strona."],
    ["Jak zmieniam treści, np. ogłoszenia?", "W abonamencie pisze Ksiądz zwykłe zdanie do asystenta (ChatGPT) albo zleca zmianę nam. Przy zakupie jednorazowym zmiany robi Ksiądz sam albo zleca je nam osobno."],
    ["Czy strona będzie widoczna w Google?", "Tak. Przy publikacji usuwamy blokadę dla wyszukiwarek i przekierowujemy stare adresy podstron (np. /sakramenty) na nową stronę. W abonamencie zgłaszamy ją też do Google."],
    ["Czy logo się zmienia?", "Nie. Zostaje obecna ikona Świętych Apostołów Piotra i Pawła."],
    ["Co, jeśli parafia będzie potrzebowała więcej?", "To strona uproszczona. Kolejne podstrony (np. intencje, galeria, pielgrzymki), nowe funkcje czy integracje wycenimy osobno, zanim zaczniemy."],
  ] as Array<[string, string]>,
};
