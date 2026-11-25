# twojastara-strony

Strony pokazowe TwojaStara.site budowane z komponentów BYQ Supply.
Hosting: GitHub Pages pod `https://nowa.twojastara.site/<slug>/`.

Struktura:
- `/<slug>/` – podgląd nowej strony klienta (tryb pokazowy, noindex)
- `/<slug>/wycena/` – wycena z hasłem
- `index.html`, `404.html` – przekierowanie na twojastara.site

Każda strona jest budowana w osobnym projekcie (Vite + React + Tailwind) i tutaj trafia tylko gotowy `dist`.
