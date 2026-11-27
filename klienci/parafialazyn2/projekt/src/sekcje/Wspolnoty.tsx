import { useState } from "react";
import { KLIENT, WSPOLNOTY } from "../klient";
import { t } from "../lib/tekst";
import { Kopiuj, Krzyz, Ptaszek } from "../ui/Ikony";
import { Obraz } from "../ui/Obraz";
import { Pokaz } from "../ui/Pokaz";

function KopiujNumer() {
  const [skopiowano, setSkopiowano] = useState(false);
  const kopiuj = async () => {
    const numer = KLIENT.konto.numer.replace(/\s/g, "");
    try {
      await navigator.clipboard.writeText(numer);
    } catch {
      const pole = document.createElement("textarea");
      pole.value = numer;
      document.body.appendChild(pole);
      pole.select();
      document.execCommand("copy");
      pole.remove();
    }
    setSkopiowano(true);
    window.setTimeout(() => setSkopiowano(false), 2400);
  };
  return (
    <button type="button" onClick={kopiuj} className="przycisk przycisk-zloty" data-nasluch-klik="kopiuj-konto">
      {skopiowano ? <Ptaszek /> : <Kopiuj />}
      {skopiowano ? "Skopiowano" : "Kopiuj numer konta"}
    </button>
  );
}

export function Wspolnoty() {
  return (
    <section id="wspolnoty" className="bg-krem-2 py-[clamp(72px,10vw,136px)]" data-nasluch-sekcja="wspolnoty">
      <div className="kontener grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Pokaz>
            <p className="etykieta m-0">Wspólnoty</p>
          </Pokaz>
          <Pokaz opoznienie={80}>
            <h2 className="tytul m-0 mt-5 text-[clamp(2rem,3.6vw,3.1rem)]">{t("Wspólnoty w naszej parafii")}</h2>
          </Pokaz>
          <ul className="m-0 mt-10 grid list-none gap-x-8 p-0 sm:grid-cols-2">
            {WSPOLNOTY.map((w, i) => (
              <Pokaz key={w} as="li" opoznienie={(i % 4) * 60} className="flex items-center gap-4 border-t border-atrament/12 py-4">
                <Krzyz className="h-5 w-5 flex-none text-zloto" />
                <span className="tytul text-[1.2rem]">{w}</span>
              </Pokaz>
            ))}
          </ul>

          <Pokaz opoznienie={120} className="na-ciemnym mt-12 rounded-[24px] bg-atrament p-[clamp(26px,4vw,44px)] text-white">
            <p className="etykieta m-0">Wesprzyj parafię</p>
            <p className="m-0 mt-4 max-w-[560px] text-[17px] text-white/80">
              {t("Jeżeli chcesz wesprzeć finansowo naszą wspólnotę, możesz to zrobić przelewem na konto parafii.")}
            </p>
            <p className="m-0 mt-6 text-[13px] tracking-[0.14em] text-white/55 uppercase">{KLIENT.konto.bank}</p>
            <p className="liczba m-0 mt-2 text-[clamp(1.15rem,2.6vw,1.75rem)] tracking-[0.06em] break-words text-zloto-jasne">{KLIENT.konto.numer}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <KopiujNumer />
              <p className="m-0 text-[15px] text-white/70">{t("Serdecznie dziękujemy wszystkim wspierającym naszą wspólnotę!")}</p>
            </div>
          </Pokaz>
        </div>

        <Pokaz opoznienie={160} className="lg:col-span-5 lg:pt-6">
          <div className="luk-ramka mx-auto w-full max-w-[440px]">
            <div className="luk aspect-[3/4] bg-krem-3">
              <Obraz nazwa="kosciol-7" opis="Figura Pana Jezusa niosącego krzyż" sizes="(max-width: 1023px) 90vw, 440px" className="h-full w-full object-cover" />
            </div>
          </div>
        </Pokaz>
      </div>
    </section>
  );
}
