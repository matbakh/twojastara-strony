import { KLIENT } from "../klient";

const DNI = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
const DNI_KROTKO = ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"];

function teraz(): { dzien: number; minuty: number } {
  const f = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Warsaw", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  const czesci = Object.fromEntries(f.formatToParts(new Date()).map((p) => [p.type, p.value]));
  const mapa: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { dzien: mapa[czesci.weekday ?? "Mon"] ?? 1, minuty: Number(czesci.hour) * 60 + Number(czesci.minute) };
}

function min(g: string): number {
  const [h, m] = g.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

export type StanOtwarcia = { otwarte: boolean; tekst: string; podtekst: string };

/** Stan „otwarte / zamknięte” liczony na żywo w czasie warszawskim. */
export function stanOtwarcia(): StanOtwarcia {
  const { dzien, minuty } = teraz();
  const dzis = KLIENT.godziny[dzien];
  if (dzis && minuty >= min(dzis[0]) && minuty < min(dzis[1])) {
    return { otwarte: true, tekst: "Otwarte", podtekst: `dziś do ${dzis[1]}` };
  }
  if (dzis && minuty < min(dzis[0])) {
    return { otwarte: false, tekst: "Zamknięte", podtekst: `otwieramy dziś o ${dzis[0]}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (dzien + i) % 7;
    const g = KLIENT.godziny[d];
    if (g) {
      const kiedy = i === 1 ? "jutro" : `w ${DNI[d] === "niedziela" ? "niedzielę" : DNI[d] === "środa" ? "środę" : DNI[d] === "sobota" ? "sobotę" : DNI[d]}`;
      return { otwarte: false, tekst: "Zamknięte", podtekst: `otwieramy ${kiedy} o ${g[0]}` };
    }
  }
  return { otwarte: false, tekst: "Zamknięte", podtekst: "" };
}

export function listaGodzin(): Array<{ dzien: string; krotko: string; godziny: string; dzis: boolean }> {
  const { dzien } = teraz();
  return [1, 2, 3, 4, 5, 6, 0].map((d) => {
    const g = KLIENT.godziny[d];
    const nazwa = DNI[d] ?? "";
    return { dzien: nazwa.charAt(0).toUpperCase() + nazwa.slice(1), krotko: DNI_KROTKO[d] ?? "", godziny: g ? `${g[0]}–${g[1]}` : "zamknięte", dzis: d === dzien };
  });
}
