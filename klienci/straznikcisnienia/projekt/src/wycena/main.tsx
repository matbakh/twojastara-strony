import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Wycena } from "./Wycena";
import "./wycena.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Wycena />
  </StrictMode>,
);
