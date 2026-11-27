import { KLIENT, MSZE, OGLOSZENIA } from "../klient";
import { t } from "../lib/tekst";
import { Facebook, Telefon } from "../ui/Ikony";
import { Pokaz } from "../ui/Pokaz";

export function Ogloszenia() {
  return (
    <section id="ogloszenia" className="bg-krem-2 py-[clamp(72px,10vw,136px)]" data-nasluch-sekcja="ogloszenia">
      <div className="kontener grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col lg:col-span-4">
          <Pokaz>
            <p className="etykieta m-0">Ogłoszenia i intencje</p>
          </Pokaz>
          <Pokaz opoznienie={80}>
            <h2 className="tytul m-0 mt-5 text-[clamp(1.85rem,3.1vw,2.75rem)]">Ogłoszenia duszpasterskie</h2>
          </Pokaz>
          <Pokaz opoznienie={140}>
            <p className="m-0 mt-6 max-w-[420px] text-[17px] text-atrament/75">
              {t("Najważniejsze sprawy parafii z ostatniej niedzieli: wydarzenia, zbiórki, pielgrzymki i podziękowania.")}
            </p>
          </Pokaz>

          <Pokaz opoznienie={200} className="mt-8 flex flex-col gap-5 rounded-[22px] bg-atrament p-7 text-white na-ciemnym sm:p-8">
            <p className="etykieta m-0">Intencje mszalne</p>
            <p className="tytul m-0 text-[1.45rem] leading-snug">{t("Mszę Świętą w intencji zamówisz telefonicznie albo w kancelarii")}</p>
            <p className="m-0 text-[15px] text-white/75">
              {t(`${MSZE.kancelaria.dni}, ${MSZE.kancelaria.godziny}. ${MSZE.kancelaria.intencje}`)}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={KLIENT.telefonHref} className="przycisk przycisk-zloty" data-nasluch-klik="telefon-intencje">
                <Telefon />
                {KLIENT.telefonPokaz}
              </a>
              <a href={KLIENT.facebook} target="_blank" rel="noopener noreferrer" className="przycisk przycisk-obrys-jasny" data-nasluch-klik="facebook">
                <Facebook />
                Facebook
              </a>
            </div>
          </Pokaz>
        </div>

        <Pokaz as="article" opoznienie={120} className="relative overflow-hidden rounded-[26px] border border-krem-3 bg-papier p-[clamp(26px,4.4vw,60px)] shadow-[0_40px_80px_-60px_rgb(29_26_20/0.55)] lg:col-span-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-zloto" aria-hidden="true" />
          <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-krem-3 pb-6">
            <div>
              <p className="etykieta m-0">Ogłoszenia z niedzieli</p>
              <h3 className="tytul m-0 mt-3 text-[clamp(1.5rem,2.6vw,2.1rem)]">{OGLOSZENIA.tytul}</h3>
            </div>
            <p className="liczba m-0 text-[1.35rem] text-zloto-ciemne">{OGLOSZENIA.data}</p>
          </header>
          <ol className="m-0 mt-8 flex list-none flex-col gap-6 p-0">
            {OGLOSZENIA.punkty.map((p, i) => (
              <li key={p} className="grid grid-cols-[44px_1fr] gap-3 max-[480px]:grid-cols-[32px_1fr]">
                <span className="liczba pt-0.5 text-[1.5rem] text-zloto">{i + 1}</span>
                <p className="m-0 text-[16.5px] leading-[1.7] text-atrament/85">{t(p)}</p>
              </li>
            ))}
          </ol>
          <p className="tytul m-0 mt-10 border-t border-krem-3 pt-6 text-right text-[1.05rem] text-atrament/80">{OGLOSZENIA.podpis}</p>
        </Pokaz>
      </div>
    </section>
  );
}
