// Lance un passage du banc du passé avec le vrai routeur (clés dans l'environnement).
// Usage : OPENROUTER_API_KEY=... node scripts/lancer-banc.js data/cas-show-hn-AAAA-MM-JJ.json [nbCas=30]
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { creerRouteur } from "../src/router.js";
import { populationInitiale } from "../src/genome.js";
import { executerBanc } from "../src/banc/executer.js";
import { tauxDeBase } from "../src/banc/sources.js";

const [fichier, nb = "30"] = process.argv.slice(2);
if (!fichier) {
  console.error("Indique un fichier de cas (voir scripts/collecter.js).");
  process.exit(1);
}
const catalogue = JSON.parse(await readFile("config/genes.json", "utf8"));
const tous = JSON.parse(await readFile(fichier, "utf8"));

// Échantillon équilibré et reproductible : on mélange avec une graine fixe.
const melange = [...tous].sort((a, b) => (a.id < b.id ? -1 : 1));
const cas = melange.filter((_, i) => i % Math.max(1, Math.floor(melange.length / Number(nb))) === 0).slice(0, Number(nb));
const base = tauxDeBase(tous);

const configurations = populationInitiale(catalogue, { roles: ["predicteur"], parRole: 6 });
const routeur = creerRouteur();
const resultat = await executerBanc({
  configurations,
  cas,
  routeur,
  tauxDeBase: base,
  surProgres: (f, t) => process.stdout.write(`\r${f}/${t}`),
});
await mkdir("data", { recursive: true });
const sortie = `data/banc-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
await writeFile(sortie, JSON.stringify({ configurations, resultat, routeur: routeur.rapport() }, null, 1));
console.log(`\nMarché : ${JSON.stringify(resultat.marche)}`);
console.table(resultat.parConfiguration);
console.log(`Échecs : ${resultat.echecs}/${resultat.predictions}. Détail : ${sortie}`);
