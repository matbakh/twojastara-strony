import { MSZE, SAKRAMENTY } from "../klient";
import { t } from "../lib/tekst";
import { Plus } from "../ui/Ikony";
import { Pokaz } from "../ui/Pokaz";

export function Sakramenty() {
  return (
    <section id="sakramenty" className="py-[clamp(72px,10vw,136px)]" data-nasluch-sekcja="sakramenty">
      <div className="kontener">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Pokaz>
              <p className="etykieta m-0">Sakramenty i pogrzeb</p>
            </Pokaz>
            <Pokaz opoznienie={80}>
              <h2 className="tytul m-0 mt-5 text-[clamp(2rem,3.6vw,3.1rem)]">{t("Co przygotować i kiedy zgłosić się do kancelarii")}</h2>
            </Pokaz>
          </div>
          <Pokaz opoznienie={140} className="lg:col-span-5">
            <p className="m-0 max-w-[460px] text-[17px] text-atrament/75 lg:ml-auto">
              {t(`Kancelaria jest czynna od poniedziałku do piątku w godzinach ${MSZE.kancelaria.godziny}. Listę dokumentów rozwiniesz w każdej karcie.`)}
            </p>
          </Pokaz>
        </div>

        <ul className="m-0 mt-12 grid list-none gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
          {SAKRAMENTY.map((s, i) => (
            <Pokaz key={s.nr} as="li" opoznienie={(i % 3) * 80} className="flex flex-col rounded-[22px] border border-krem-3 bg-papier p-7 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <h3 className="tytul m-0 text-[1.45rem]">{t(s.tytul)}</h3>
                <span className="liczba text-[1.6rem] text-zloto" aria-hidden="true">
                  {s.nr}
                </span>
              </div>
              <p className="m-0 mt-4 text-[16px] text-atrament/80">{t(s.opis)}</p>
              {s.dopisek && <p className="m-0 mt-4 border-l-2 border-zloto pl-4 text-[14.5px] text-atrament/70">{t(s.dopisek)}</p>}
              {s.dokumenty && (
                <div className="mt-auto pt-6">
                <details className="group border-t border-krem-3 pt-1">
                  <summary className="flex items-center justify-between gap-4 py-3.5 text-[15px] font-semibold text-atrament" data-nasluch-klik={`dokumenty-${s.nr}`}>
                    <span>Co przygotować ({s.dokumenty.length})</span>
                    <span className="grid h-8 w-8 flex-none place-items-center rounded-full border border-atrament/20 transition-colors group-open:bg-atrament group-open:text-white">
                      <Plus className="h-4 w-4" />
                    </span>
                  </summary>
                  <ul className="m-0 flex list-none flex-col gap-2 p-0 pb-2">
                    {s.dokumenty.map((d) => (
                      <li key={d} className="relative pl-5 text-[15px] text-atrament/80 before:absolute before:top-[0.7em] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-zloto">
                        {t(d)}
                      </li>
                    ))}
                  </ul>
                </details>
                </div>
              )}
            </Pokaz>
          ))}
        </ul>
      </div>
    </section>
  );
}
