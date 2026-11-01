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

// Échantillon différent à chaque passage (graine = numéro du passage), pour que chaque manche apporte
// des cas nouveaux au lieu de rejouer les mêmes.
const graine = Number(process.env.GITHUB_RUN_ID ?? Date.now()) % 2147483647;
let a = graine >>> 0;
const alea = () => {
  a = (a + 0x6d2b79f5) >>> 0;
  let t = Math.imul(a ^ (a >>> 15), a | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const melange = [...tous];
for (let i = melange.length - 1; i > 0; i--) {
  const j = Math.floor(alea() * (i + 1));
  [melange[i], melange[j]] = [melange[j], melange[i]];
}
const cas = melange.slice(0, Number(nb));
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
console.table(resultat.parCerveau);
console.log(`Échecs : ${resultat.echecs}/${resultat.predictions}. Détail : ${sortie}`);
