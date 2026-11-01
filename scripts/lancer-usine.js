// Lance un passage de l'usine à idées avec le vrai routeur (clés dans l'environnement).
// Usage : OPENROUTER_API_KEY=... node scripts/lancer-usine.js [fichier d'idées précédent pour l'évolution]
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { creerRouteur } from "../src/router.js";
import { lancerUsine } from "../src/usine/pipeline.js";
import { collecterSignaux } from "../src/usine/signaux.js";

const [precedent] = process.argv.slice(2);
const config = JSON.parse(await readFile("config/usine.json", "utf8"));
const atlas = JSON.parse(await readFile("config/atlas-api.json", "utf8"));
let graines = [];
if (precedent) {
  try {
    graines = JSON.parse(await readFile(precedent, "utf8")).graines ?? [];
  } catch {
    console.log("Pas de passage précédent lisible : pas d'évolution cette fois.");
  }
}
const signaux = await collecterSignaux();
console.log(`Signaux : ${signaux.length} ; graines : ${graines.length}`);

const routeur = creerRouteur({ delaiRequeteMs: 120_000, pauseCoupeCircuitMs: 2 * 60 * 1000 }); // les idées demandent des réponses longues
const graine = Number(process.env.GITHUB_RUN_ID ?? Date.now()) % 2147483647;
const resultat = await lancerUsine({ config, atlas, signaux, graines, routeur, graine, journal: (m) => console.log(m) });

await mkdir("data", { recursive: true });
const horodatage = new Date().toISOString().replace(/[:.]/g, "-");
await writeFile(`data/idees-${horodatage}.json`, JSON.stringify({ date: new Date().toISOString(), signaux, ...resultat, routeur: routeur.rapport() }, null, 1));

const ligne = (i, k) =>
  `## ${k + 1}. ${i.titre}\n` +
  `Elo ${Math.round(i.elo)} · score ${i.score?.toFixed(1)} / 10 · lentille ${i.lentille} · inventé par ${i.cerveau}\n\n` +
  `- **Problème :** ${i.probleme}\n- **Pour qui :** ${i.pour_qui}\n- **Valeur pour la société :** ${i.valeur_societale}\n- **Comment :** ${i.comment}\n` +
  `- **Pourquoi maintenant :** ${i.pourquoi_maintenant}\n- **Revenu :** ${i.modele_revenu}\n- **Premier test :** ${i.premier_test}\n` +
  `- **Faille :** ${i.critique?.objection ?? "?"}\n- **Mutation proposée :** ${i.critique?.amelioration ?? "?"}\n`;
const md = [
  `# Usine à idées — ${new Date().toISOString().slice(0, 10)}`,
  `${resultat.stats.idees} idées générées, ${resultat.stats.notees} notées, ${resultat.stats.duels} duels. Appels : ${resultat.stats.appels} (${resultat.stats.echecs} échecs).`,
  "",
  ...resultat.top.map(ligne),
  "## Santé des cerveaux",
  ...Object.entries(resultat.stats.parCerveau).map(([c, s]) => `- ${c} : ${s.ok} ok, ${s.echecs} échecs${s.exempleErreur ? ` (${s.exempleErreur})` : ""}`),
  "",
  "## Lentilles",
  ...Object.entries(resultat.parLentille).map(([l, s]) => `- ${l} : ${s.idees} idées, score moyen ${s.scoreMoyen}, ${s.finalistes} finalistes`),
].join("\n");
await writeFile(`data/idees-${horodatage}.md`, md);
console.log(md);
