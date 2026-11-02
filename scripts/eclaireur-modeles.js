// Éclaireur de modèles (chaque semaine) : repère dans le catalogue OpenRouter les nouveaux modèles bon marché,
// les fait passer sur trois épreuves de notre vrai travail (extraction de douleurs, critique, génération)
// à côté des modèles en place, et propose les remplacements. Métis tranche ; rien n'est changé automatiquement.
// Usage : OPENROUTER_API_KEY=... node scripts/eclaireur-modeles.js [dossier de sortie]
import { writeFile, mkdir, readFile } from "node:fs/promises";
import { creerRouteur, FOURNISSEURS_PAR_DEFAUT } from "../src/router.js";
import { extraireJSON, extraireListe } from "../src/commun/outils.js";
import { messagesExtraction } from "../src/radar/douleurs.js";
import { messagesCritique, messagesGenerationVisionnaire } from "../src/usine/pipeline.js";

const [sortie = "sortie"] = process.argv.slice(2);
const config = JSON.parse(await readFile("config/usine.json", "utf8"));
const atlas = JSON.parse(await readFile("config/atlas-api.json", "utf8"));
const date = new Date().toISOString().slice(0, 10);
const OPENROUTER = FOURNISSEURS_PAR_DEFAUT.find((f) => f.id === "openrouter");
const enPlace = OPENROUTER.modeles;

const catalogue = (await (await fetch("https://openrouter.ai/api/v1/models")).json()).data;
const prix = (m, k) => Number(m.pricing?.[k] ?? Infinity) * 1e6; // dollars par million de jetons
const recents = catalogue
  .filter((m) => !m.id.endsWith(":free") && !Object.values(enPlace).includes(m.id))
  .filter((m) => prix(m, "prompt") <= 0.4 && prix(m, "completion") <= 1.6 && (m.context_length ?? 0) >= 32000)
  .filter((m) => (m.supported_parameters ?? []).some((p) => p === "response_format" || p === "structured_outputs"))
  .filter((m) => Date.now() / 1000 - (m.created ?? 0) < 120 * 86400)
  .sort((a, b) => (b.created ?? 0) - (a.created ?? 0))
  .slice(0, 6);

const modeles = { ...Object.fromEntries(Object.entries(enPlace).filter(([, id]) => !id.endsWith(":free"))) };
for (const m of recents) modeles[`candidat:${m.id}`] = m.id;
const obligatoires = Object.entries(modeles).filter(([, id]) => catalogue.find((m) => m.id === id)?.reasoning?.mandatory).map(([k]) => k);
const routeur = creerRouteur({
  fournisseurs: [{ ...OPENROUTER, modeles, tokensParJour: 5_000_000, reflexionObligatoire: [...new Set([...(OPENROUTER.reflexionObligatoire ?? []), ...obligatoires])] }],
  delaiRequeteMs: 120_000,
  plafondCoutUsd: 0.3,
});

// Épreuves à réponse connue : 3 vraies douleurs et un bruit ; une idée solide et une idée creuse.
const textes = [
  { source: "t", texte: "I wish there was a simple app to split recurring household chores fairly with my roommates, every app I tried is bloated." },
  { source: "t", texte: "Lol this thread is hilarious, thanks for sharing." },
  { source: "t", texte: "Je galère à trouver un créneau chez un dentiste qui accepte de nouveaux patients dans ma région, je passe des heures au téléphone." },
  { source: "t", texte: "Is there a tool that tells me which of my npm dependencies are abandoned before they break? I'd happily pay for it." },
];
const ideeSolide = { titre: "Alerte dépendances abandonnées", probleme: "Les équipes découvrent trop tard qu'une bibliothèque n'est plus maintenue.", pour_qui: "Développeurs de petites équipes", solution: "Une extension qui analyse le dépôt et alerte avant l'abandon, avec alternatives.", canal: "extension-navigateur", modele_revenu: "Abonnement", prix: "6 € par mois", premier_test: "Page et liste d'attente postées sur Show HN." };
const ideeCreuse = { titre: "Plateforme IA pour tout", probleme: "Les gens ont des problèmes.", pour_qui: "Tout le monde", solution: "Une IA qui fait tout.", canal: "?", modele_revenu: "?", prix: "?", premier_test: "Lancer." };

async function epreuve(cle) {
  const r = { modele: modeles[cle], cle, extraction: null, discrimination: null, generation: null, ms: 0, echecs: 0 };
  const t = Date.now();
  try {
    const a = await routeur.appeler({ cerveau: cle, messages: messagesExtraction(textes), json: true, raisonnement: "none", maxTokens: 2500, temperature: 0.2 });
    const l = extraireListe(a.texte, "douleurs", "douleur").map((d) => Number(d.n));
    r.extraction = { trouvees: l.length, justes: [0, 2, 3].filter((n) => l.includes(n)).length, bruit: l.includes(1) };
  } catch {
    r.echecs += 1;
  }
  try {
    const note = async (idee) => {
      const c = extraireJSON((await routeur.appeler({ cerveau: cle, messages: messagesCritique({ config, idee }), json: true, raisonnement: "none", maxTokens: 2000, temperature: 0.2 })).texte);
      return Object.keys(config.axes).reduce((s, k) => s + (Number(c?.[k]) || 0), 0) / Object.keys(config.axes).length;
    };
    const [s1, s2] = [await note(ideeSolide), await note(ideeCreuse)];
    r.discrimination = +(s1 - s2).toFixed(2);
  } catch {
    r.echecs += 1;
  }
  try {
    const g = await routeur.appeler({ cerveau: cle, messages: messagesGenerationVisionnaire({ config, lentille: "collision-api", these: config.theses[0], arene: "familles-et-aines", sources: atlas.sources.slice(0, 2), signaux: [], n: 3 }), json: true, raisonnement: "none", maxTokens: 4000, temperature: 0.9 });
    const l = extraireListe(g.texte, "idees", "titre");
    r.generation = { idees: l.length, champsRemplis: l.length ? +(l.reduce((s, i) => s + Object.values(i).filter((v) => v != null && String(v).trim()).length, 0) / l.length).toFixed(1) : 0 };
  } catch {
    r.echecs += 1;
  }
  r.ms = Date.now() - t;
  r.note = (r.extraction ? r.extraction.justes - (r.extraction.bruit ? 1 : 0) : 0) + Math.max(0, Math.min(3, (r.discrimination ?? 0) / 1.5)) + (r.generation ? Math.min(3, r.generation.idees) * (r.generation.champsRemplis >= 12 ? 1 : 0.5) : 0) - r.echecs;
  return r;
}

const resultats = [];
for (const cle of Object.keys(modeles)) resultats.push(await epreuve(cle));
resultats.sort((a, b) => b.note - a.note);
const meilleurEnPlace = resultats.find((r) => !r.cle.startsWith("candidat:"));
const meilleurs = resultats.filter((r) => r.cle.startsWith("candidat:") && meilleurEnPlace && r.note > meilleurEnPlace.note);
await mkdir(`${sortie}/labo`, { recursive: true });
await writeFile(`${sortie}/labo/eclaireur-${date}.json`, JSON.stringify({ date, candidats: recents.map((m) => ({ id: m.id, nom: m.name, cree: new Date(m.created * 1000).toISOString().slice(0, 10), prix_entree: prix(m, "prompt"), prix_sortie: prix(m, "completion") })), resultats, cout: routeur.cout() }, null, 1));
const md = [
  `# Éclaireur de modèles — ${date}`,
  "",
  `${recents.length} nouveaux modèles bon marché testés contre ${Object.keys(modeles).length - recents.length} modèles en place. Coût : ${routeur.cout().usd.toFixed(3)} $.`,
  "",
  "| Modèle | Note /9 | Douleurs justes /3 | Bruit | Discrimination | Idées /3 | Durée |",
  "|---|---|---|---|---|---|---|",
  ...resultats.map((r) => `| ${r.cle.startsWith("candidat:") ? "**nouveau** " : ""}${r.modele} | ${r.note.toFixed(1)} | ${r.extraction?.justes ?? "échec"} | ${r.extraction?.bruit ? "oui" : "non"} | ${r.discrimination ?? "échec"} | ${r.generation?.idees ?? "échec"} | ${Math.round(r.ms / 1000)} s |`),
  "",
  meilleurs.length ? `À essayer : ${meilleurs.map((r) => r.modele).join(", ")} (meilleure note que ${meilleurEnPlace.modele}).` : "Aucun nouveau modèle ne bat les modèles en place cette semaine.",
].join("\n");
await writeFile(`${sortie}/labo/eclaireur-${date}.md`, md);
await writeFile(`${sortie}/labo/ECLAIREUR.md`, md);
console.log(md);
