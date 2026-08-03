import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://thomasbasquin.fr",
  server: { port: 5173 },
  // La feuille tient en quelques kilo-octets : l'inliner supprime la seule
  // requête bloquant le rendu.
  build: { inlineStylesheets: "always" },
});
