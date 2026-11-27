/**
 * Logo parafii bez zmian: ikona Świętych Apostołów Piotra i Pawła z obecnej strony (plik klienta, 200×200 px),
 * obok nazwa w kroju Cinzel, jak w nagłówku obecnej strony.
 */
import { plik } from "../lib/tekst";

type Props = { ciemne?: boolean; className?: string; podpis?: boolean };

const ATRAMENT = "#1d1a14";

export function Sygnet({ className = "", opis = "" }: { className?: string; ciemne?: boolean; opis?: string }) {
  return (
    <img
      src={plik("img/logo-parafii.webp")}
      alt={opis}
      width={200}
      height={200}
      decoding="async"
      className={`rounded-full ${className}`}
      draggable={false}
    />
  );
}

export function Logo({ ciemne = false, className = "", podpis = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Sygnet className="h-11 w-11 shrink-0 max-[767px]:h-10 max-[767px]:w-10" />
      <span className="flex flex-col leading-none" style={{ color: ciemne ? "#ffffff" : ATRAMENT }}>
        <span style={{ fontFamily: '"Cinzel", "Times New Roman", serif' }} className="text-[1.12rem] font-semibold tracking-[0.03em] max-[767px]:text-[1.02rem]">
          Parafia Łążyn II
        </span>
        {podpis && (
          <span className="mt-1.5 text-[0.62rem] font-medium tracking-[0.16em] uppercase opacity-70 max-[520px]:hidden">
            Św. Apostołów Piotra i Pawła
          </span>
        )}
      </span>
    </span>
  );
}
