import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

/** BASE = ścieżka, pod którą stoi strona, np. /middin/ dla https://nowa.twojastara.site/middin/ */
const base = process.env.BASE ?? "/";
const root = fileURLToPath(new URL(".", import.meta.url));

const wejscia: Record<string, string> = { main: root + "index.html" };
if (existsSync(root + "wycena/index.html")) wejscia.wycena = root + "wycena/index.html";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: { input: wejscia },
  },
});
