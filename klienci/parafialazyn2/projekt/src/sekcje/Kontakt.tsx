import { KLIENT, MSZE } from "../klient";
import { t } from "../lib/tekst";
import { Facebook, Koperta, Pinezka, StrzalkaUkos, Telefon } from "../ui/Ikony";
import { Obraz } from "../ui/Obraz";
import { Pokaz } from "../ui/Pokaz";

export function Kontakt() {
  return (
    <section id="kontakt" className="py-[clamp(72px,10vw,136px)]" data-nasluch-sekcja="kontakt">
      <div className="kontener grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Pokaz>
            <p className="etykieta m-0">Kontakt</p>
          </Pokaz>
          <Pokaz opoznienie={80}>
            <h2 className="tytul m-0 mt-5 text-[clamp(2rem,3.6vw,3.1rem)]">Kancelaria parafialna</h2>
          </Pokaz>
          <Pokaz opoznienie={140}>
            <a href={KLIENT.telefonHref} className="liczba mt-8 inline-block text-[clamp(2.3rem,5.4vw,4rem)] text-atrament no-underline hover:text-zloto-ciemne" data-nasluch-klik="telefon-kontakt">
              {KLIENT.telefonPokaz}
            </a>
          </Pokaz>

          <Pokaz opoznienie={180} className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[20px] border border-krem-3 bg-papier p-6">
              <p className="etykieta m-0">Godziny kancelarii</p>
              <p className="liczba m-0 mt-4 text-[1.9rem]">{MSZE.kancelaria.godziny}</p>
              <p className="m-0 mt-2 text-[15px] text-atrament/75">
                {MSZE.kancelaria.dni}, {MSZE.kancelaria.opis}
              </p>
              <p className="m-0 mt-3 text-[14px] text-atrament/65">{t("W niedziele i święta nieczynna. W sprawach pilnych prosimy dzwonić.")}</p>
            </div>
            <div className="rounded-[20px] border border-krem-3 bg-papier p-6">
              <p className="etykieta m-0">Adres</p>
              <p className="m-0 mt-4 text-[17px] font-semibold">{KLIENT.firmaPelna}</p>
              <p className="m-0 mt-2 text-[15px] text-atrament/75">
                {KLIENT.adresUlica}
                <br />
                {KLIENT.adresMiasto}
              </p>
              <p className="m-0 mt-3 text-[14px] text-atrament/65">NIP {KLIENT.nip}</p>
            </div>
          </Pokaz>

          <Pokaz opoznienie={220} className="mt-8 flex flex-wrap gap-3">
            <a href={KLIENT.telefonHref} className="przycisk przycisk-atrament" data-nasluch-klik="telefon-kontakt-przycisk">
              <Telefon />
              Zadzwoń
            </a>
            <a href={`mailto:${KLIENT.email}`} className="przycisk przycisk-obrys" data-nasluch-klik="mail">
              <Koperta />
              {KLIENT.email}
            </a>
            <a href={KLIENT.dojazd} target="_blank" rel="noopener noreferrer" className="przycisk przycisk-obrys" data-nasluch-klik="dojazd">
              <Pinezka />
              Jak dojechać
              <StrzalkaUkos />
            </a>
            <a href={KLIENT.facebook} target="_blank" rel="noopener noreferrer" className="przycisk przycisk-obrys" data-nasluch-klik="facebook-kontakt">
              <Facebook />
              Facebook
            </a>
          </Pokaz>
        </div>

        <Pokaz opoznienie={160} className="lg:col-span-5">
          <a
            href={KLIENT.dojazd}
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto block w-full max-w-[440px] text-atrament no-underline"
            aria-label="Otwórz dojazd do kościoła w Mapach Google"
            data-nasluch-klik="dojazd-zdjecie"
          >
            <div className="luk-ramka">
              <div className="luk aspect-[3/4] bg-krem-3">
                <Obraz
                  nazwa="kosciol-8"
                  opis="Aleja prowadząca do kościoła"
                  sizes="(max-width: 1023px) 90vw, 440px"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </div>
            <p className="m-0 mt-4 flex items-center justify-center gap-2 text-[15px] font-semibold">
              <Pinezka className="h-4 w-4 text-zloto-ciemne" />
              {KLIENT.adres}
            </p>
          </a>
        </Pokaz>
      </div>
    </section>
  );
}
