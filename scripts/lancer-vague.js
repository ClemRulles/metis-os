// Vague de lancement : opportunités du jour → plans critiqués → tournoi → pages de test → porte de crédibilité.
// Usage : OPENROUTER_API_KEY=... [API_URL=...] node scripts/lancer-vague.js <opportunites.json> [dossier d'état] [sortie]
// Seules les pages qui franchissent TOUTE la porte (éditeur et liste d'attente compris) vont dans site/ ;
// le workflow « Vague » ne met en ligne que ce dossier, et seulement si config/lancement.json dit auto: true.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { creerRouteur, FOURNISSEURS_PAR_DEFAUT } from "../src/router.js";
import { creerDemandeur, rngDe } from "../src/commun/outils.js";
import { lancerVague, rapportVagueMd } from "../src/lancement/vague.js";
import { rendrePage } from "../src/experiences/gabarit.js";
import { verifierCredibilite } from "../src/experiences/credibilite.js";
import { sonderAtlas } from "../src/atlas/vivant.js";
import { atelierVague } from "../src/atelier/atelier.js";

const [cheminOpp, dossierEtat = "/tmp/etat", sortie = "sortie"] = process.argv.slice(2);
const lire = async (chemin, defaut) => {
  try {
    return JSON.parse(await readFile(chemin, "utf8"));
  } catch {
    return defaut;
  }
};
const config = await lire("config/usine.json");
const lancement = await lire("config/lancement.json", {});
if (process.env.API_URL) lancement.api_url = process.env.API_URL;
const { opportunites = [], date: dateStudio } = await lire(cheminOpp, {});
const date = new Date().toISOString().slice(0, 10);
const lances = await lire(`${dossierEtat}/lances.json`, []);
lancement.slugs_pris = lances.map((l) => l.slug);

const routeur = creerRouteur({ fournisseurs: FOURNISSEURS_PAR_DEFAUT.map((f) => ({ ...f, tokensParJour: f.id === "groq" ? f.tokensParJour : 5_000_000 })), delaiRequeteMs: 120_000, plafondCoutUsd: lancement.plafond_cout_usd ?? 0.3 });
const graine = Number(process.env.GITHUB_RUN_ID ?? Date.now()) % 2147483647;
const demandeur = creerDemandeur({ routeur, alea: rngDe(graine + 7), secours: config.cerveaux_jugement });
const debut = Date.now();
const journal = (m) => console.log(`[${Math.round((Date.now() - debut) / 1000)} s] ${m}`);

const vague = await lancerVague({ opportunites, config, lancement, demandeur, graine, dejaLances: lances.map((l) => l.titre), journal });

// Atelier : les meilleurs tests reçoivent une démonstration construite avec des données réelles du jour.
const atlasVivant = await lire("config/atlas-vivant.json", { apis: [] });
const sondes = await sonderAtlas({ apis: atlasVivant.apis, journal });
const demos = await atelierVague({ choisis: vague.choisis, sondes, demandeur, cerveaux: config.cerveaux_jugement, nombre: lancement.demos_par_vague ?? 3, graine, journal });
for (const d of demos.filter((x) => x.ok)) {
  const p = vague.choisis.find((x) => x.slug === d.slug);
  if (p?.fiche) p.fiche.demo_url = "demo/";
}
// Approbation : la vague PROPOSE (pages mémorisées dans etat/propositions.json) ; seules les pages dont le slug
// figure dans config/lancement.json « approuvees » sont publiées, avec l'éditeur et la liste d'attente injectés,
// et seulement si elles franchissent alors la porte de crédibilité complète.
const propositions = await lire(`${dossierEtat}/propositions.json`, {});
for (const p of vague.prets) {
  const d = demos.find((x) => x.slug === p.slug && x.ok);
  propositions[p.slug] = { date, titre: p.idee.titre, nom: p.fiche.nom, score: p.idee.final?.total, waw: p.premortem?.note_waw ?? null, fiche: p.fiche, demo_html: d?.html ?? null };
}
const editeurComplet = ["nom", "adresse", "contact"].every((k) => String(lancement.editeur?.[k] ?? "").trim());
const dejaEnLigne = new Set(lances.map((l) => l.slug));
const aPublier = [];
const refus = [];
for (const slug of lancement.approuvees ?? []) {
  const prop = propositions[slug];
  if (!prop) { refus.push(`${slug} : proposition introuvable`); continue; }
  if (dejaEnLigne.has(slug)) continue;
  const fiche = { ...prop.fiche, editeur: lancement.editeur ?? {}, api_url: lancement.api_url ?? "" };
  const rapport = verifierCredibilite(rendrePage(fiche), fiche);
  if (rapport.ok) aPublier.push({ slug, fiche, demo_html: prop.demo_html, titre: prop.titre });
  else refus.push(`${slug} : porte fermée (${rapport.bloquants.join(", ")})`);
}
const raisons = [];
if (!(lancement.approuvees ?? []).length) raisons.push("aucune page approuvée (ajouter son slug dans config/lancement.json, « approuvees »)");
if (!editeurComplet) raisons.push("éditeur absent (nom, adresse, contact dans config/lancement.json : mentions légales obligatoires)");
if (!lancement.api_url) raisons.push("liste d'attente non branchée (déploiement Cloudflare à vérifier)");
raisons.push(...refus);
const pret = aPublier.length > 0;
const deploiement = pret ? `${aPublier.length} page(s) approuvée(s) mise(s) en ligne : ${aPublier.map((x) => x.slug).join(", ")}.` : `aucune page mise en ligne : ${raisons.join(" ; ")}. Les pages proposées attendent l'approbation.`;

const dossier = `${sortie}/vagues/${date}`;
await mkdir(`${dossier}/site`, { recursive: true });
await mkdir(`${sortie}/etat`, { recursive: true });
for (const p of vague.choisis.filter((x) => x.fiche)) {
  await mkdir(`${dossier}/pages/${p.slug}`, { recursive: true });
  await writeFile(`${dossier}/pages/${p.slug}/fiche.json`, JSON.stringify(p.fiche, null, 1));
  await writeFile(`${dossier}/pages/${p.slug}/index.html`, rendrePage(p.fiche));
  await writeFile(`${dossier}/pages/${p.slug}/credibilite.json`, JSON.stringify(p.credibilite, null, 1));
  const d = demos.find((x) => x.slug === p.slug);
  if (d) {
    await mkdir(`${dossier}/pages/${p.slug}/demo`, { recursive: true });
    await writeFile(`${dossier}/pages/${p.slug}/demo/atelier.json`, JSON.stringify({ ok: d.ok, raison: d.raison ?? null, essais: d.essais ?? null, spec: d.spec ?? null, sources: d.sources ?? [], trace: d.trace }, null, 1));
    if (d.ok) {
      await writeFile(`${dossier}/pages/${p.slug}/demo/index.html`, d.html);
      await writeFile(`${dossier}/pages/${p.slug}/demo/demo.mjs`, d.code);
    }
  }
}
await writeFile(`${sortie}/etat/propositions.json`, JSON.stringify(propositions));
if (pret) {
  for (const p of aPublier) {
    await mkdir(`${dossier}/site/${p.slug}`, { recursive: true });
    await writeFile(`${dossier}/site/${p.slug}/index.html`, rendrePage(p.fiche));
    if (p.demo_html) {
      await mkdir(`${dossier}/site/${p.slug}/demo`, { recursive: true });
      await writeFile(`${dossier}/site/${p.slug}/demo/index.html`, p.demo_html);
    }
  }
  await writeFile(`${dossier}/site/index.html`, "<!doctype html><meta charset=utf-8><meta name=robots content=noindex><title>Tests</title><p>Pages de test en préparation.</p>");
  await writeFile(`${sortie}/etat/lances.json`, JSON.stringify([...lances, ...aPublier.map((p) => ({ slug: p.slug, titre: p.titre, nom: p.fiche.nom, date }))], null, 1));
}
const mdDemos = ["", "## Atelier : démonstrations construites avec des données réelles", ...demos.map((d) => `- **${d.titre}** : ${d.ok ? `construite en ${d.essais} essai(s) avec ${d.sources.join(", ")} — ${d.spec?.promesse ?? ""} (pages/${d.slug}/demo/)` : `non construite — ${d.raison}`}`)].join("\n");
const md = rapportVagueMd({ date, vague, deploiement }) + mdDemos;
await writeFile(`${dossier}/VAGUE.md`, md);
await writeFile(`${sortie}/VAGUE-DU-JOUR.md`, md);
await writeFile(
  `${dossier}/vague.json`,
  JSON.stringify({ date, dateStudio, deploiement, pret, demos: demos.map((d) => ({ slug: d.slug, ok: d.ok, essais: d.essais ?? null, raison: d.raison ?? null })), cout: routeur.cout(), sante: demandeur.sante(), choisis: vague.choisis.map((p) => ({ slug: p.slug ?? null, titre: p.idee.titre, score_studio: p.idee.final?.total, note_plan: p.notePlan, elo: Math.round(p.elo), plan: p.plan, critique: p.critique, credibilite: p.credibilite?.bloquants ?? null, en_ligne: aPublier.some((x) => x.slug === p.slug), premortem: p.premortem ?? null })) }, null, 1)
);
await writeFile(`${sortie}/etat/vague-prete.txt`, pret ? dossier : "");
console.log(md);
console.log(`Coût : ${routeur.cout().usd} $`);
