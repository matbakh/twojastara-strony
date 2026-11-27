import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  opoznienie?: number;
  className?: string;
  as?: "div" | "li" | "p" | "article";
  style?: CSSProperties;
};

/** Element pojawiający się przy przewijaniu ([data-pokaz], obsługa w lib/ruch.ts). */
export function Pokaz({ children, opoznienie = 0, className = "", as: Tag = "div", style }: Props) {
  return (
    <Tag data-pokaz className={className} style={{ ...style, "--opoznienie": `${opoznienie}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
