// Lit les statistiques du Worker de liste d'attente et rend le verdict séquentiel de chaque expérience.
// Usage : LISTE_ATTENTE_URL=https://... STATS_TOKEN=... node scripts/verdict-experiences.js [sortie.json]
import { writeFile } from "node:fs/promises";
import { verdict, seuils } from "../src/sprt.js";

const [sortie = "verdicts.json"] = process.argv.slice(2);
const rep = await fetch(`${process.env.LISTE_ATTENTE_URL}/stats`, { headers: { authorization: `Bearer ${process.env.STATS_TOKEN}` } });
if (!rep.ok) {
  console.error(`Statistiques indisponibles : HTTP ${rep.status}`);
  process.exit(1);
}
const s = await rep.json();
const inscrits = new Map(s.inscriptions.map((x) => [x.experience, x.inscriptions]));
const verdicts = s.visites.map((v) => {
  const n = inscrits.get(v.experience) ?? 0;
  return { experience: v.experience, visiteurs: v.visites, inscriptions: n, taux: +(n / Math.max(1, v.visites)).toFixed(4), verdict: verdict(v.visites, n), seuils: seuils(v.visites), sources: s.sources.filter((x) => x.experience === v.experience) };
});
await writeFile(sortie, JSON.stringify({ date: new Date().toISOString(), verdicts }, null, 1));
for (const v of verdicts) console.log(`${v.experience} : ${v.inscriptions}/${v.visiteurs} (${(v.taux * 100).toFixed(1)} %) → ${v.verdict}`);
