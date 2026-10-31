// Collecte le banc du passé et l'écrit dans data/.
// Usage : node scripts/collecter.js [jours=60]
import { mkdir, writeFile } from "node:fs/promises";
import { collecterShowHN, collecterManifold, tauxDeBase } from "../src/banc/sources.js";

const jours = Number(process.argv[2] ?? 60);
const fin = new Date();
const debut = new Date(fin.getTime() - jours * 86_400_000);

const showHN = await collecterShowHN({ debut, fin });
const manifold = await collecterManifold({ resoluApres: debut, pagesMax: 5 });

await mkdir("data", { recursive: true });
const stamp = fin.toISOString().slice(0, 10);
await writeFile(`data/cas-show-hn-${stamp}.json`, JSON.stringify(showHN, null, 1));
await writeFile(`data/cas-manifold-${stamp}.json`, JSON.stringify(manifold, null, 1));

const pct = (x) => (x == null ? "—" : `${(x * 100).toFixed(1)} %`);
console.log(`Show HN : ${showHN.length} cas, taux de base ${pct(tauxDeBase(showHN))}`);
console.log(`Manifold : ${manifold.length} cas, taux de base ${pct(tauxDeBase(manifold))}`);
