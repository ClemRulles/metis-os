// Passage complet du studio : radar des douleurs → usine à idées → enquête web → classement à preuves.
// Usage : OPENROUTER_API_KEY=... node scripts/lancer-studio.js [dossier d'état précédent] [dossier de sortie]
// Le dossier d'état contient gisements.json, graines.json, deja_vues.json (mémoire d'un jour à l'autre).
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { creerRouteur, FOURNISSEURS_PAR_DEFAUT } from "../src/router.js";
import { creerDemandeur, rngDe } from "../src/commun/outils.js";
import { collecterDouleursBrutes } from "../src/radar/sources.js";
import { extraireDouleurs, regrouper } from "../src/radar/douleurs.js";
import { collecterSignaux } from "../src/usine/signaux.js";
import { lancerUsine } from "../src/usine/pipeline.js";
import { enqueter, scoreFinal } from "../src/enquete/enquete.js";

const [dossierEtat = "/tmp/etat", dossierSortie = "sortie"] = process.argv.slice(2);
const lire = async (chemin, defaut) => {
  try {
    return JSON.parse(await readFile(chemin, "utf8"));
  } catch {
    return defaut;
  }
};
const debut = Date.now();
const date = new Date().toISOString().slice(0, 10);
const config = await lire("config/usine.json");
const atlas = await lire("config/atlas-api.json");
const historique = await lire(`${dossierEtat}/gisements.json`, []);
const graines = await lire(`${dossierEtat}/graines.json`, []);
const dejaVues = await lire(`${dossierEtat}/deja_vues.json`, []);
console.log(`État précédent : ${historique.length} gisements, ${graines.length} graines, ${dejaVues.length} idées déjà vues.`);

const fournisseurs = FOURNISSEURS_PAR_DEFAUT.map((f) => ({ ...f, tokensParJour: 20_000_000 })); // le plafond en dollars fait foi
const routeur = creerRouteur({ fournisseurs, delaiRequeteMs: 150_000, pauseCoupeCircuitMs: 2 * 60 * 1000, plafondCoutUsd: config.plafond_cout_usd });
const graine = Number(process.env.GITHUB_RUN_ID ?? Date.now()) % 2147483647;
const demandeur = creerDemandeur({ routeur, alea: rngDe(graine + 1), secours: config.cerveaux_jugement });
const journal = (m) => console.log(`[${Math.round((Date.now() - debut) / 1000)} s] ${m}`);
const etapes = {};
const chrono = (nom, t0) => (etapes[nom] = { secondes: Math.round((Date.now() - t0) / 1000), coutCumuleUsd: routeur.cout().usd });

// 1. Radar.
let t0 = Date.now();
const { items, etat: etatSources } = await collecterDouleursBrutes({ journal, jour: Math.floor(Date.now() / 86400_000) });
const douleurs = await extraireDouleurs({ items, demandeur, cerveaux: config.cerveaux_extraction, journal });
journal(`douleurs extraites : ${douleurs.length}`);
const gisements = await regrouper({ douleurs, historique, demandeur, cerveaux: ["glm", "deepseek", "qwen"], dateDuJour: date, journal });
chrono("radar", t0);
journal(`gisements : ${gisements.length} (dont ${gisements.filter((g) => g.n_jour > 0).length} nourris aujourd'hui)`);

// 2. Usine.
t0 = Date.now();
const signaux = await collecterSignaux();
const usine = await lancerUsine({ config, atlas, gisements, signaux, graines, dejaVues, demandeur, graine, journal });
chrono("usine", t0);

// 3. Enquête et classement à preuves.
t0 = Date.now();
const aEnqueter = usine.classement.slice(0, config.volumes.enquetes);
await enqueter({ finalistes: aEnqueter, demandeur, config, journal });
for (const i of usine.classement) i.final = scoreFinal(i, config.score_final.poids);
const opportunites = [...usine.classement].sort((a, b) => b.final.total - a.final.total);
chrono("enquete", t0);

// 4. Sorties.
const cout = routeur.cout();
const sante = { date, dureeSecondes: Math.round((Date.now() - debut) / 1000), coutUsd: cout.usd, appelsModeles: cout.appels, etapes, sources: etatSources, cerveaux: demandeur.sante(), stats: { brut: items.length, douleurs: douleurs.length, gisements: gisements.length, ...usine.stats, enquetes: aEnqueter.filter((i) => i.enquete).length } };
const dossierJour = `${dossierSortie}/studio/${date}`;
await mkdir(dossierJour, { recursive: true });
await mkdir(`${dossierSortie}/etat`, { recursive: true });
await writeFile(`${dossierJour}/douleurs.json`, JSON.stringify({ items: items.length, douleurs }, null, 1));
await writeFile(`${dossierJour}/idees.json`, JSON.stringify({ idees: usine.idees, duels: usine.duels, cartes: usine.cartes }, null, 1));
await writeFile(`${dossierJour}/opportunites.json`, JSON.stringify({ date, opportunites, sante }, null, 1));
await writeFile(`${dossierSortie}/etat/gisements.json`, JSON.stringify(gisements, null, 1));
await writeFile(
  `${dossierSortie}/etat/graines.json`,
  JSON.stringify(opportunites.slice(0, 5).map((i) => ({ titre: i.titre, solution: i.solution, angle_libre: i.enquete?.angle_libre ?? null, objection: i.critique?.objection ?? null })), null, 1)
);
await writeFile(`${dossierSortie}/etat/deja_vues.json`, JSON.stringify([...opportunites.slice(0, 20).map((i) => i.titre), ...dejaVues].slice(0, 300), null, 1));
await writeFile(`${dossierSortie}/sante-studio.json`, JSON.stringify(sante, null, 1));

const lien = (u, t) => (u ? `[${t ?? new URL(u).hostname}](${u})` : t ?? "");
const dossierMd = (i, k) => {
  const e = i.enquete;
  const c = i.final.composantes;
  const lignes = [
    `## ${k + 1}. ${i.titre}`,
    `**Score ${i.final.total} / 10** · douleur ${c.douleur_prouvee.toFixed(1)} · paiement ${c.paiement_prouve} · espace ${c.espace_libre.toFixed(1)} · critique ${c.critique.toFixed(1)} · tournoi ${c.tournoi.toFixed(1)} · risque ${c.faible_risque} — ${i.arene}, ${i.origine === "ancree" ? "née d'une douleur réelle" : `visionnaire (${i.lentille})`}`,
    "",
    `- **Problème :** ${i.probleme}`,
    `- **Pour qui :** ${i.pour_qui}`,
    `- **Solution :** ${i.solution}`,
    `- **Valeur pour la société :** ${i.valeur_societale}`,
    `- **Canal :** ${i.canal} — premiers clients : ${i.premier_client}`,
    `- **Revenu :** ${i.modele_revenu} (${i.prix})`,
    `- **Premier test :** ${i.premier_test}`,
  ];
  if (i.gisement) {
    const g = gisements.find((x) => x.id === i.gisement.id);
    lignes.push(`- **Preuve de terrain :** gisement « ${i.gisement.nom} », ${i.gisement.n} mentions (${Object.keys(g?.sources ?? {}).join(", ")})`);
    for (const ex of (g?.exemples ?? []).slice(0, 3)) lignes.push(`  - « ${ex.citation} » — ${lien(ex.url, ex.source)}`);
  }
  if (e) {
    lignes.push(`- **Enquête :** verdict ${e.verdict} — ${e.raison ?? ""}`);
    const conc = (e.concurrents ?? []).filter((x) => x.verifie).slice(0, 4);
    lignes.push(`  - Concurrents : ${conc.length ? conc.map((x) => `${lien(x.url, x.nom)} (${x.prix ?? "prix ?"}, ressemblance ${x.ressemblance}/10)`).join(" ; ") : "aucun trouvé"}`);
    lignes.push(`  - Qui paie déjà : ${e.qui_paie_deja ?? "?"}${e.preuve_paiement_verifiee ? ` (${lien(e.preuve_paiement_url, "preuve")})` : ""}`);
    lignes.push(`  - Angle libre : ${e.angle_libre ?? "?"}`);
    lignes.push(`  - Risque juridique : ${e.risque_juridique ?? "?"} — ${e.raison_risque ?? ""}`);
  }
  lignes.push(`- **Faille :** ${i.critique?.objection ?? "?"}`, `- **Mutation proposée :** ${i.critique?.amelioration ?? "?"}`, "");
  return lignes.join("\n");
};
const top = opportunites.slice(0, config.volumes.top_publie);
const md = [
  `# Opportunités du ${date}`,
  "",
  `${items.length} textes réels lus → ${douleurs.length} douleurs → ${gisements.length} gisements. ${usine.stats.idees} idées générées, ${usine.stats.notees} critiquées, ${usine.stats.duels} duels, ${sante.stats.enquetes} enquêtes web. Coût : ${cout.usd.toFixed(3)} $ en ${cout.appels} appels, ${Math.round(sante.dureeSecondes / 60)} min.`,
  "",
  "Classement fondé sur les preuves (douleur réelle, paiement observé, espace libre, risque) ; l'avis des IA ne pèse qu'un tiers.",
  "",
  ...top.slice(0, 5).map(dossierMd),
  "## Suivantes",
  ...top.slice(5).map((i, k) => `${k + 6}. **${i.titre}** (${i.final.total}) — ${i.probleme}`),
  "",
  "## Gisements les plus forts",
  ...gisements.slice(0, 12).map((g) => `- **${g.nom}** — ${g.n} mentions (${g.n_jour} aujourd'hui), ${Object.keys(g.sources).length} sources, force ${g.force}`),
  "",
  "## Santé",
  `- Sources : ${Object.entries(etatSources).map(([k, s]) => `${k} ${s.n}${s.erreur ? ` (erreur : ${s.erreur})` : ""}`).join(" ; ")}`,
  ...Object.entries(sante.cerveaux).map(([c, s]) => `- ${c} : ${s.ok} ok, ${s.echecs} échecs (${Math.round(s.tauxEchec * 100)} %), ${s.msMoyen} ms${s.exempleErreur ? ` — ${s.exempleErreur}` : ""}`),
  `- Étapes : ${Object.entries(etapes).map(([k, s]) => `${k} ${s.secondes} s (cumul ${s.coutCumuleUsd} $)`).join(" ; ")}`,
].join("\n");
await writeFile(`${dossierJour}/OPPORTUNITES.md`, md);
await writeFile(`${dossierSortie}/OPPORTUNITES-DU-JOUR.md`, md);
console.log(md);
