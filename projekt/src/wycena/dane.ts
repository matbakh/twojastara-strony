/**
 * Treść wyceny dla klienta (standard twojastara.site z FKU).
 * Per klient zmienia się tylko ten plik i src/klient.ts.
 */
import { KLIENT, POKAZ } from "../klient";

export const WYCENA = {
  slug: KLIENT.slug,
  data: "25.11.2026",
  firma: "MID&DIN Technology",
  firmaKrotko: "MID&DIN",
  domena: POKAZ.domena,
  /** Zwrot do klienta (wołacz). */
  zwrot: "Panie Piotrze",
  /** Hasła po normalizacji (małe litery, bez polskich znaków, spacji i myślników). */
  hasla: ["middin", "mid&din", "midanddin", "middintechnology", "mid&dintechnology", "middin.tech", "www.middin.tech", "middintechnologyspzoo"],
  podglad: `${POKAZ.podglad}/?z=wycena`,
  podgladPokaz: "nowa.twojastara.site/middin",
  jest: [
    "Pod adresem z formularza jest robocza kopia strony: w karcie przeglądarki widać techniczną nazwę „reefy-dune”, a język strony jest ustawiony na angielski",
    "Domena mid-din.tech pokazuje dziś błąd certyfikatu, a kopia robocza ma blokadę dla wyszukiwarek, więc klienci z Google nie trafią na stronę",
    "Między ofertą a kontaktem są długie animacje przewijania (napis MID&DIN litera po literze, zdjęcia „w ruchu”), przez które trzeba przejść",
    "Przycisk „Zapytaj o wycenę” na pierwszym ekranie prowadzi do cennika, a ten sam przycisk w menu do formularza",
    "Logo ma cztery kolorowe pola i dwa kolory napisu, przez co w ikonie karty przeglądarki jest mało czytelne",
  ],
  bedzie: [
    "Pierwszy ekran z jasnym komunikatem, telefonem i SMS-em pod ręką oraz informacją na żywo, czy firma jest teraz otwarta",
    "Cztery obszary usług (awarie, instalacje, lampy i gniazdka, monitoring) w czytelnych kartach ze zdjęciami",
    "Cennik, przebieg współpracy, galeria realizacji i odpowiedzi na pytania na jednej stronie, bez długich animacji",
    "Nazwa firmy w karcie przeglądarki i w Google, polski język strony i przyklejony przycisk „Zadzwoń” na telefonie",
    "Uproszczone logo w kolorach strony, czytelne także w małych rozmiarach",
  ],
  kolory: {
    tytul: ["Granat i żółty", "Pana marki"],
    opis: "Kolory z obecnej strony zostały, ułożyliśmy je na nowo: granat w tekstach i ciemnych sekcjach, żółty w przyciskach i akcentach, a jasne, ciepłe tło porządkuje treść.",
    probki: [
      { nazwa: "Granat", hex: "#17242C", tekst: "#FFFFFF" },
      { nazwa: "Żółty", hex: "#F7DF0A", tekst: "#17242C" },
      { nazwa: "Jasne tło", hex: "#F3F2EE", tekst: "#17242C" },
      { nazwa: "Biel", hex: "#FAF9F5", tekst: "#17242C" },
    ],
  },
  logo: {
    tytul: ["Prostsze logo,", "ten sam znak"],
    opis: "Zostawiliśmy to, co rozpoznawalne: cztery pola z ikonami wtyczki, kamery, prądu i telefonu oraz napis MID&DIN Technology. Zamiast czterech kolorów znak ma dwa kolory strony, dzięki czemu jest czytelny w ikonie karty, w stopce maila i na wydruku. To propozycja: jeśli woli Pan obecne logo, zostawimy je bez dopłaty.",
  },
  potwierdzenia: [
    "Cennik: na obecnej stronie stawka od 350 zł jest opisana jako „Poniedziałek i piątek”. W podglądzie przyjęliśmy poniedziałek–piątek. Proszę potwierdzić",
    "Formularz i e-mail: obecna strona ma formularz, ale nie pokazuje adresu e-mail. W podglądzie kontakt idzie przez telefon i SMS z gotowym szablonem. Czy dodajemy formularz ze zgłoszeniami na kontakt@mid-din.tech?",
    "Domena: nową stronę publikujemy na mid-din.tech. Dziś przeglądarka pokazuje pod tym adresem błąd certyfikatu, ustawimy to przy publikacji",
    "Zdjęcia: w podglądzie są zdjęcia z obecnej strony. Chętnie dodamy nowe zdjęcia realizacji",
    "Logo: czy zostajemy przy uproszczonej wersji, czy wracamy do obecnego logo",
  ],
  pytania: [
    ["Czy za podgląd i wycenę coś płacę?", "Nie. Za podgląd i wycenę nic Pan nie płaci i do niczego one nie zobowiązują."],
    ["Skąd są treści i zdjęcia?", "Treści i zdjęcia są z obecnej strony MID&DIN Technology. Przed publikacją możemy dodać nowe zdjęcia realizacji."],
    ["Co z domeną i pocztą?", "Zostają bez zmian. Zmieniamy tylko to, gdzie wyświetla się strona."],
    ["Jak zmieniam treści?", "W abonamencie pisze Pan zwykłe zdanie do asystenta (ChatGPT) albo zleca zmianę nam. Przy zakupie jednorazowym zmiany robi Pan sam albo zleca je nam osobno."],
    ["Czy strona będzie widoczna w Google?", "Tak. Przy publikacji usuwamy blokadę dla wyszukiwarek i przekierowujemy stare adresy podstron (np. /cennik/) na nową stronę. W abonamencie zgłaszamy ją też do Google."],
    ["Czy muszę zmieniać logo?", "Nie. Uproszczone logo to propozycja. Jeśli woli Pan obecne, zostawimy je bez dopłaty."],
    ["Co, jeśli będę chciał więcej?", "To strona uproszczona. Kolejne podstrony, nowe funkcje czy integracje wycenimy osobno, zanim zaczniemy."],
  ] as Array<[string, string]>,
};
