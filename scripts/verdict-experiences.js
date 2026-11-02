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
// Une inscription ou un clic « je veux ce service » comptent tous deux comme un signal d'intérêt.
const inscrits = new Map(s.inscriptions.map((x) => [x.experience, x.inscriptions]));
for (const c of s.clics ?? []) inscrits.set(c.experience, (inscrits.get(c.experience) ?? 0) + c.clics);
const verdicts = s.visites.map((v) => {
  const n = inscrits.get(v.experience) ?? 0;
  return { experience: v.experience, visiteurs: v.visites, inscriptions: n, taux: +(n / Math.max(1, v.visites)).toFixed(4), verdict: verdict(v.visites, n), seuils: seuils(v.visites), sources: s.sources.filter((x) => x.experience === v.experience) };
});
await writeFile(sortie, JSON.stringify({ date: new Date().toISOString(), verdicts }, null, 1));
const lignes = verdicts.map((v) => `- **${v.experience}** : ${v.inscriptions} inscriptions pour ${v.visiteurs} visiteurs (${(v.taux * 100).toFixed(1)} %) → ${v.verdict}`);
await writeFile(sortie.replace(/\.json$/, ".md"), [`# Verdicts des tests — ${new Date().toISOString().slice(0, 10)}`, "", "Test séquentiel : plonger, continuer ou arrêter (plafond 250 visiteurs).", "", ...lignes].join("\n"));
for (const l of lignes) console.log(l);
