// Construit la page de test d'une expérience à partir de sa fiche, puis passe la porte de crédibilité.
// Usage : node scripts/preparer-experience.js experiences/<slug>/fiche.json
// Sortie : experiences/<slug>/index.html et experiences/<slug>/credibilite.json. Code de sortie 2 si un contrôle bloque.
import { readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { rendrePage } from "../src/experiences/gabarit.js";
import { verifierCredibilite } from "../src/experiences/credibilite.js";

const [chemin] = process.argv.slice(2);
if (!chemin) {
  console.error("Indique la fiche : experiences/<slug>/fiche.json");
  process.exit(1);
}
const fiche = JSON.parse(await readFile(chemin, "utf8"));
if (process.env.API_URL) fiche.api_url = process.env.API_URL;
const html = rendrePage(fiche);
const rapport = verifierCredibilite(html, fiche);
const dossier = dirname(chemin);
await writeFile(`${dossier}/index.html`, html);
await writeFile(`${dossier}/credibilite.json`, JSON.stringify(rapport, null, 1));
for (const c of rapport.controles) console.log(`${c.ok ? "ok " : c.bloquant ? "BLOQUE" : "attention"}  ${c.id} — ${c.detail}`);
console.log(rapport.ok ? "Porte de crédibilité : franchie." : `Porte de crédibilité : fermée (${rapport.bloquants.join(", ")}).`);
process.exit(rapport.ok ? 0 : 2);
