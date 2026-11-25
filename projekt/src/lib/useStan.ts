import { useEffect, useState } from "react";
import { stanOtwarcia, type StanOtwarcia } from "./godziny";

/** Stan „otwarte / zamknięte” odświeżany co 30 sekund. */
export function useStanOtwarcia(): StanOtwarcia {
  const [stan, setStan] = useState<StanOtwarcia>(() => stanOtwarcia());
  useEffect(() => {
    const id = window.setInterval(() => setStan(stanOtwarcia()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return stan;
}
