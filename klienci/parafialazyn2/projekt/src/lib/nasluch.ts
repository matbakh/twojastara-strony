/** Kolejka nasłuchu twojastara.site (skrypt https://twojastara.site/nasluch.js). */
type Okno = Window & { tssNasluchQ?: unknown[] | { push: (c: unknown[]) => void } };

export function nasluch(...polecenie: unknown[]): void {
  const w = window as Okno;
  if (!w.tssNasluchQ) w.tssNasluchQ = [];
  (w.tssNasluchQ as { push: (c: unknown[]) => void }).push(polecenie);
}
