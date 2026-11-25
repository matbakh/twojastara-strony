import { useEffect } from "react";

/** Pojawianie się elementów przy przewijaniu ([data-pokaz]). Bez ruchu, gdy system prosi o ograniczenie animacji. */
export function usePokazywanie(): void {
  useEffect(() => {
    const el = Array.from(document.querySelectorAll<HTMLElement>("[data-pokaz]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      el.forEach((e) => e.classList.add("widoczny"));
      return;
    }
    const io = new IntersectionObserver(
      (wpisy) =>
        wpisy.forEach((w) => {
          if (w.isIntersecting) {
            w.target.classList.add("widoczny");
            io.unobserve(w.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    el.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}
