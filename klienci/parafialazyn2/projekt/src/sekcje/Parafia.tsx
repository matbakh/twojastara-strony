import { HISTORIA, KLIENT, PARAFIA } from "../klient";
import { t } from "../lib/tekst";
import { Obraz } from "../ui/Obraz";
import { Pokaz } from "../ui/Pokaz";

/**
 * O parafii: zdjęcia w łukach jak okna kościoła (zabieg nr 1),
 * potem historia jako oś czasu według BYQ Supply presence-process-2
 * (rok po lewej 4fr, treść po prawej 8fr, cienkie linie między wpisami, wejście przy przewijaniu).
 */
export function Parafia() {
  return (
    <section id="parafia" data-nasluch-sekcja="parafia">
      <div className="bg-papier py-[clamp(72px,10vw,136px)]">
        <div className="kontener grid items-center gap-14 lg:grid-cols-12">
          <Pokaz className="relative mx-auto w-full max-w-[520px] pb-14 lg:col-span-5 lg:pb-16">
            <div className="luk-ramka">
              <div className="luk aspect-[4/5] bg-krem-2">
                <Obraz nazwa={PARAFIA.zdjecia.duze.plik} opis={PARAFIA.zdjecia.duze.opis} sizes="(max-width: 1023px) 90vw, 500px" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="absolute bottom-0 left-[-4%] w-[44%] rounded-t-full border-[6px] border-papier bg-papier shadow-[0_24px_50px_-30px_rgb(29_26_20/0.6)] max-[480px]:left-0">
              <div className="luk aspect-[3/4]">
                <Obraz nazwa={PARAFIA.zdjecia.male.plik} opis={PARAFIA.zdjecia.male.opis} sizes="240px" className="h-full w-full object-cover" />
              </div>
            </div>
          </Pokaz>

          <div className="lg:col-span-7 lg:pl-6">
            <Pokaz>
              <p className="etykieta m-0">Parafia</p>
            </Pokaz>
            <Pokaz opoznienie={80}>
              <h2 className="tytul m-0 mt-5 text-[clamp(2rem,3.8vw,3.3rem)]">
                {t(PARAFIA.tytul[0])}
                <br />
                <span className="text-zloto-ciemne">{t(PARAFIA.tytul[1])}</span>
              </h2>
            </Pokaz>
            {PARAFIA.opis.map((akapit, i) => (
              <Pokaz key={akapit} opoznienie={140 + i * 60}>
                <p className="m-0 mt-6 max-w-[640px] text-[17px] leading-[1.75] text-atrament/80">{t(akapit)}</p>
              </Pokaz>
            ))}

            <Pokaz opoznienie={260} className="mt-10 grid gap-4 sm:grid-cols-2">
              {PARAFIA.odpusty.map((o) => (
                <div key={o.data} className="rounded-[20px] border border-krem-3 bg-krem p-6">
                  <p className="etykieta m-0">Odpust</p>
                  <p className="liczba m-0 mt-4 text-[2.3rem] text-zloto">{o.data}</p>
                  <p className="m-0 mt-2 text-[15px] text-atrament/80">{t(o.nazwa)}</p>
                </div>
              ))}
            </Pokaz>
            <Pokaz opoznienie={320}>
              <p className="m-0 mt-8 text-[15px] text-atrament/70">
                Proboszcz: <span className="font-semibold text-atrament">{KLIENT.proboszcz}</span> · {KLIENT.diecezja}
              </p>
            </Pokaz>
          </div>
        </div>
      </div>

      <div className="na-ciemnym ziarno bg-atrament py-[clamp(72px,10vw,136px)] text-white">
        <div className="kontener">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Pokaz>
                <p className="etykieta m-0">Historia parafii</p>
              </Pokaz>
              <Pokaz opoznienie={80}>
                <h2 className="tytul m-0 mt-5 text-[clamp(2rem,3.8vw,3.3rem)]">Od XIV wieku do dziś</h2>
              </Pokaz>
            </div>
            <Pokaz opoznienie={140} className="lg:col-span-5">
              <p className="m-0 max-w-[460px] text-[17px] text-white/70 lg:ml-auto">{t("Najważniejsze daty z historii parafii i kościoła.")}</p>
            </Pokaz>
          </div>

          <ol className="m-0 mt-14 flex list-none flex-col p-0">
            {HISTORIA.map((h, i) => (
              <Pokaz
                key={h.rok}
                as="li"
                opoznienie={Math.min(i, 3) * 60}
                className="grid gap-4 border-t border-white/12 py-9 max-[767px]:py-7 md:grid-cols-[4fr_8fr] md:gap-8"
              >
                <p className="liczba m-0 text-[clamp(2.6rem,5vw,4rem)] text-zloto-jasne">{h.rok}</p>
                <div className="md:pt-2">
                  <h3 className="tytul m-0 text-[clamp(1.35rem,2.2vw,1.75rem)] text-white">{t(h.tytul)}</h3>
                  <p className="m-0 mt-3 max-w-[620px] text-[16.5px] leading-[1.7] text-white/72">{t(h.opis)}</p>
                </div>
              </Pokaz>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
