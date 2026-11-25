# Gałąź `szablon`: źródła stron TwojaStara.site (BYQ Supply + GitHub Pages)

Gałąź `main` = gotowe strony (GitHub Pages, https://nowa.twojastara.site/<slug>/).
Gałąź `szablon` = źródła i narzędzia:

- `projekt/` – projekt Vite + React + Tailwind 4. Wzorzec: MID&DIN Technology (25.11.2026).
  - `src/klient.ts` – dane klienta (tylko fakty z jego obecnej strony),
  - `src/sekcje/*` – sekcje strony (na wzór komponentów BYQ Supply; dla każdego klienta dobierz i przepisz),
  - `src/demo/*` – tryb pokazowy (pasek zakupu, znak wodny, blokada druku i kopiowania zdjęć),
  - `src/wycena/*` – wycena z hasłem (przed i po, 99 zł/mies. albo 690 zł, Stripe Greenverge, nasłuch),
  - `src/tss.ts` – stałe twojastara.site (Stripe, doradca, kalendarz).
- `klienci/<slug>/zamowienie.json` – zamówienie zasobów; GitHub Actions (`.github/workflows/zasoby.yml`)
  pobiera zdjęcia (webp + wersja -m) i zrzuty obecnej strony (`przed.jpg`, `przed-telefon.jpg`, `przed-pelna.jpg`)
  i zapisuje `klienci/<slug>/wynik.json`. Zmień `id`, żeby wymusić ponowne pobranie.
- `narzedzia/zrzut.py` – kontrola strony w Chrome (przewijanie w poziomie, ucinanie tekstu, zrzut całej strony).
- `narzedzia/po.py` – zrzuty nowej strony bez paska pokazowego (do wyceny i maila).

Budowa jednej strony:

```bash
cp -r projekt /tmp/<slug> && cd /tmp/<slug> && npm ci
# podmień src/klient.ts, src/wycena/dane.ts, public/img/*, public/wycena/img/*, sekcje
BASE=/<slug>/ npx vite build
# dist/ → gałąź main, katalog <slug>/
```

Procedura automatu: Sterownia (Project Brain) `procedury/tss-strony-byq`.
