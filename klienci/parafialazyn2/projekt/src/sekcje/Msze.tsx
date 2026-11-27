import { KLIENT, MSZE } from "../klient";
import { t } from "../lib/tekst";
import { Obraz } from "../ui/Obraz";
import { Pokaz } from "../ui/Pokaz";
import { Telefon } from "../ui/Ikony";

/** Godziny jako duże cyfry; każda z cienką złotą kreską nad sobą, więc przy zawijaniu nie ma kropek na początku linii. */
function Godziny({ godziny, rozmiar = "duze" }: { godziny: readonly string[]; rozmiar?: "duze" | "srednie" }) {
  const klasa = rozmiar === "duze" ? "text-[clamp(2.3rem,4.6vw,3.9rem)]" : "text-[clamp(1.9rem,2.9vw,2.5rem)]";
  return (
    <ul className={`liczba m-0 flex list-none flex-wrap gap-x-7 gap-y-4 p-0 text-atrament ${klasa}`}>
      {godziny.map((g) => (
        <li key={g} className="border-t-2 border-zloto pt-3">
          {g}
        </li>
      ))}
    </ul>
  );
}

const ramka = "flex flex-col gap-5 rounded-[22px] border p-7 sm:p-8";
const karta = `${ramka} border-krem-3 bg-papier`;
const kartaCiemna = `${ramka} na-ciemnym border-atrament bg-atrament text-white`;

export function Msze() {
  return (
    <section id="msze" className="py-[clamp(72px,10vw,136px)]" data-nasluch-sekcja="msze">
      <div className="kontener grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <Pokaz>
            <p className="etykieta m-0">Msze Święte i nabożeństwa</p>
          </Pokaz>
          <Pokaz opoznienie={80}>
            <h2 className="tytul m-0 mt-5 text-[clamp(2rem,3.6vw,3.1rem)]">{t("Kiedy Msza, spowiedź i kancelaria")}</h2>
          </Pokaz>
          <Pokaz opoznienie={140}>
            <p className="m-0 mt-6 max-w-[420px] text-[17px] text-atrament/75">{t(MSZE.zastrzezenie)}</p>
          </Pokaz>
          <Pokaz opoznienie={200} className="mt-10 max-lg:hidden">
            <div className="luk-ramka w-[min(100%,330px)]">
              <div className="luk aspect-[3/4] bg-krem-2">
                <Obraz nazwa="kosciol-4" opis="Ołtarz główny kościoła w Łążynie II" sizes="330px" className="h-full w-full object-cover" />
              </div>
            </div>
          </Pokaz>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          <Pokaz className={`${karta} sm:col-span-2`}>
            <p className="etykieta m-0">Niedziele i święta</p>
            <Godziny godziny={MSZE.niedziela} />
            <p className="m-0 border-t border-krem-3 pt-5 text-[16px] text-atrament/80">
              {t(`Oraz w sobotę o ${MSZE.sobotaWigilia}: liturgia niedzielna. Godziny obowiązują ${MSZE.od}.`)}
            </p>
          </Pokaz>

          <Pokaz opoznienie={80} className={karta}>
            <p className="etykieta m-0">Dni powszednie</p>
            <Godziny godziny={MSZE.powszednie} rozmiar="srednie" />
            <p className="m-0 text-[15px] text-atrament/70">{t("Od poniedziałku do piątku po tej Mszy czynna jest kancelaria.")}</p>
          </Pokaz>

          <Pokaz opoznienie={140} className={karta}>
            <p className="etykieta m-0">Święta zniesione</p>
            <Godziny godziny={MSZE.swietaZniesione} rozmiar="srednie" />
          </Pokaz>

          <Pokaz opoznienie={80} className={karta}>
            <p className="etykieta m-0">Spowiedź Święta</p>
            <dl className="m-0 flex flex-col">
              {MSZE.spowiedz.map((s) => (
                <div key={s.kiedy} className="flex flex-col gap-1 border-t border-krem-3 py-3.5 first:border-t-0 first:pt-0">
                  <dt className="text-[14px] text-atrament/65">{s.kiedy}</dt>
                  <dd className="m-0 text-[19px] font-semibold">{t(s.godziny)}</dd>
                </div>
              ))}
            </dl>
          </Pokaz>

          <Pokaz opoznienie={140} className={kartaCiemna}>
            <p className="etykieta m-0">Kancelaria parafialna</p>
            <div>
              <p className="liczba m-0 text-[clamp(2rem,3.4vw,2.6rem)] text-zloto-jasne">{MSZE.kancelaria.godziny}</p>
              <p className="m-0 mt-2 text-[16px] text-white/85">
                {MSZE.kancelaria.dni}, {MSZE.kancelaria.opis}
              </p>
            </div>
            <p className="m-0 text-[14px] leading-relaxed text-white/70">{t(`${MSZE.kancelaria.nieczynna} ${MSZE.kancelaria.wyjatek}`)}</p>
            <a href={KLIENT.telefonHref} className="przycisk przycisk-zloty mt-auto self-start" data-nasluch-klik="telefon-kancelaria">
              <Telefon />
              {KLIENT.telefonPokaz}
            </a>
          </Pokaz>

          <Pokaz opoznienie={80} className={`${karta} sm:col-span-2`}>
            <p className="etykieta m-0">Nabożeństwa w Wielkim Poście</p>
            <div className="grid gap-5 sm:grid-cols-2">
              {MSZE.wielkiPost.map((n) => (
                <div key={n.co} className="border-l-2 border-zloto pl-5">
                  <p className="tytul m-0 text-[1.3rem]">{n.co}</p>
                  <p className="m-0 mt-1.5 text-[15px] text-atrament/75">{t(n.kiedy)}</p>
                </div>
              ))}
            </div>
          </Pokaz>
        </div>
      </div>
    </section>
  );
}
