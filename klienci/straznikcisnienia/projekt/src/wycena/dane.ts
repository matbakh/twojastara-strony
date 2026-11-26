/**
 * Treść wyceny dla klienta (standard twojastara.site z FKU).
 * Per klient zmienia się tylko ten plik i src/klient.ts.
 * Strażnik Ciśnienia: nazwa marki w tekstach wyceny w dopełniaczu („dla Strażnika Ciśnienia”).
 */
import { KLIENT, POKAZ } from "../klient";

export const WYCENA = {
  slug: KLIENT.slug,
  data: "26.11.2026",
  /** Nazwa w dopełniaczu: „Nowa strona dla …”, „Obecna strona …”. */
  firma: "Strażnika Ciśnienia",
  /** Nazwa w mianowniku (temat maila do doradcy). */
  firmaMianownik: "Strażnik Ciśnienia",
  firmaKrotko: "Strażnika Ciśnienia",
  domena: POKAZ.domena,
  /** Zwrot do klienta (wołacz). */
  zwrot: "Panie Janie",
  /** Hasła po normalizacji (małe litery, bez polskich znaków, spacji i myślników). */
  hasla: ["straznik", "straznikcisnienia", "straznikcisnienia.pl", "www.straznikcisnienia.pl", "pressureguardian"],
  podglad: `${POKAZ.podglad}/?z=wycena`,
  podgladPokaz: "nowa.twojastara.site/straznikcisnienia",
  jest: [
    "Na pierwszym ekranie jest slajd z hasłem „INNOWACYJNY”, ale bez ceny i bez przycisku zamówienia. Przycisk „Zamów teraz” pojawia się dopiero niżej",
    "Ceny różnią się między zakładkami: jeden zestaw kosztuje 59,99 zł w zakładce „Zamów”, 67,45 zł z przesyłką na stronie głównej i 87,45 zł (67,45 zł w promocji) w FAQ",
    "Podstrona „O Strażniku” z opisem produktu ma blokadę dla wyszukiwarek (noindex), więc Google jej nie pokazuje",
    "Nagłówek na pierwszym ekranie wyświetla się zastępczym krojem szeryfowym, innym niż reszta strony",
    "Na telefonie logo, telefon, e-mail i flagi języków zajmują ponad ćwierć pierwszego ekranu, a pod nimi jest slajd bez przycisku zamówienia",
  ],
  bedzie: [
    "Pierwszy ekran z jasnym hasłem, zdjęciem produktu, ceną zestawu i przyciskami „Zamów” oraz „Zadzwoń”, także na telefonie",
    "Działanie w trzech krokach z podglądem wskaźnika: zielony to właściwe ciśnienie, czerwony jego spadek",
    "Jeden cennik zestawów do auta i do roweru (1, 10 i 50 zestawów) z przełącznikiem i zamówieniem telefonem, SMS-em albo mailem z gotowym szablonem",
    "Korzyści, odpowiedzi na pytania i instrukcja PDF na jednej stronie, bez przechodzenia między zakładkami",
    "Jeden krój z polskimi znakami, opis produktu widoczny dla Google i przyklejony przycisk „Zadzwoń” na telefonie",
  ],
  kolory: {
    tytul: ["Grafit i turkus", "Pana marki"],
    opis: "Kolory z obecnej strony zostały, ułożyliśmy je na nowo: grafit w nagłówku i ciemnych sekcjach, turkus z logo w przyciskach i akcentach, a zieleń i czerwień tylko tam, gdzie pokazujemy działanie wskaźnika.",
    probki: [
      { nazwa: "Grafit", hex: "#14181B", tekst: "#FFFFFF" },
      { nazwa: "Turkus", hex: "#1EACC7", tekst: "#14181B" },
      { nazwa: "Jasne tło", hex: "#EEF1F2", tekst: "#14181B" },
      { nazwa: "Zieleń", hex: "#2FBF5B", tekst: "#14181B" },
    ],
  },
  logo: {
    tytul: ["Prostsze logo,", "to samo auto"],
    opis: "Zostawiliśmy to, co rozpoznawalne: sylwetkę auta z turkusową linią i łukiem koła oraz nazwę Strażnik Ciśnienia z turkusowymi literami S i C. Przerysowaliśmy je w wektorze, więc są ostre na każdym ekranie, a obok są wersja na jasne tło i mały znak do ikony karty. To propozycja: jeśli woli Pan obecne logo, zostawimy je bez dopłaty.",
  },
  potwierdzenia: [
    "Ceny: na obecnej stronie różnią się między zakładkami. W podglądzie jest cennik z zakładki „Zamów” (do auta: 59,99 zł, 500 zł i 2000 zł; do roweru: 39 zł, 350 zł i 1500 zł za 1, 10 i 50 zestawów). Proszę potwierdzić ceny i koszt wysyłki",
    "Zamówienia: obecna strona ma formularze zamówień. W podglądzie zamówienie idzie telefonicznie, SMS-em albo mailem z gotowym szablonem na sklep@straznikcisnienia.pl. Czy zostajemy przy tym, czy dodajemy formularz albo sklep (wycena osobno)?",
    "Języki: obecna strona ma też wersje angielską, niemiecką i czeską. Strona podstawowa jest po polsku, kolejne wersje językowe wycenimy osobno",
    "Dane firmy: na obecnej stronie nie ma pełnej nazwy firmy ani NIP-u. W podglądzie jest adres z mapy w zakładce „Kontakt” (Zgórska 10, 25-827 Kielce). Proszę potwierdzić dane do stopki",
    "Regulamin zakupów, polityka prywatności i instrukcja PDF: przeniesiemy obecne pliki na nową stronę",
    "Logo: czy zostajemy przy wersji w wektorze, czy wracamy do obecnego pliku",
  ],
  pytania: [
    ["Czy za podgląd i wycenę coś płacę?", "Nie. Za podgląd i wycenę nic Pan nie płaci i do niczego one nie zobowiązują."],
    ["Skąd są treści i zdjęcia?", "Treści, ceny i zdjęcia są z obecnej strony Strażnika Ciśnienia, także z opakowania pokazanego na stronie. Przed publikacją możemy dodać nowe zdjęcia produktu."],
    ["Co z domeną i pocztą?", "Zostają bez zmian. Zmieniamy tylko to, gdzie wyświetla się strona."],
    ["Jak zmieniam treści i ceny?", "W abonamencie pisze Pan zwykłe zdanie do asystenta (ChatGPT) albo zleca zmianę nam. Przy zakupie jednorazowym zmiany robi Pan sam albo zleca je nam osobno."],
    ["Czy strona będzie widoczna w Google?", "Tak. Przy publikacji przekierowujemy stare adresy podstron (np. /zamow.html, /faq.html) na nową stronę, a opis produktu jest widoczny dla wyszukiwarek. W abonamencie zgłaszamy ją też do Google."],
    ["Czy muszę zmieniać logo?", "Nie. Logo w wektorze to propozycja. Jeśli woli Pan obecne, zostawimy je bez dopłaty."],
    ["Co, jeśli będę chciał więcej?", "To strona uproszczona. Sklep z koszykiem, wersje językowe, kolejne podstrony czy integracje wycenimy osobno, zanim zaczniemy."],
  ] as Array<[string, string]>,
};
