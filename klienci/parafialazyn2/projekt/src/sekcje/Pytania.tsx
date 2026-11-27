import { PYTANIA } from "../klient";
import { t } from "../lib/tekst";
import { Plus } from "../ui/Ikony";
import { Pokaz } from "../ui/Pokaz";

export function Pytania() {
  return (
    <section id="pytania" className="bg-papier py-[clamp(72px,10vw,136px)]" data-nasluch-sekcja="pytania">
      <div className="kontener grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Pokaz>
            <p className="etykieta m-0">Pytania</p>
          </Pokaz>
          <Pokaz opoznienie={80}>
            <h2 className="tytul m-0 mt-5 text-[clamp(2rem,3.6vw,3.1rem)]">Najczęstsze sprawy</h2>
          </Pokaz>
        </div>
        <div className="lg:col-span-8">
          {PYTANIA.map((p, i) => (
            <Pokaz key={p.p} opoznienie={Math.min(i, 3) * 50}>
              <details className="group border-t border-krem-3 last:border-b">
                <summary className="flex items-center justify-between gap-6 py-6 text-[1.12rem] font-semibold text-atrament">
                  <span>{t(p.p)}</span>
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-full border border-atrament/20 transition-colors group-open:bg-atrament group-open:text-white">
                    <Plus className="h-5 w-5" />
                  </span>
                </summary>
                <p className="m-0 max-w-[720px] pb-7 text-[16px] leading-[1.75] text-atrament/80">{t(p.o)}</p>
              </details>
            </Pokaz>
          ))}
        </div>
      </div>
    </section>
  );
}
