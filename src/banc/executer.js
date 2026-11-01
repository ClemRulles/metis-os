// Fait prédire des configurations sur des cas résolus, puis note chacune (justesse et apport)
// et produit une première carte de l'effet des gènes.

import { messagesPrediction, lireProbabilite } from "./prompt.js";
import { prixMarche, apport, bilan } from "../scoring.js";
import { NOMS_GENES } from "../genome.js";

export async function executerBanc({ configurations, cas, routeur, tauxDeBase = null, seuilPoints = 10, parallelisme = 12, surProgres = () => {} }) {
  const predictions = []; // { cas, config, p, fournisseur, erreur? }
  let fait = 0;
  // File de travail : toutes les prédictions partent dans un pool de taille fixe. Un modèle lent
  // ne bloque plus les autres, et chaque prédiction garde sa durée pour repérer les modèles lents.
  const taches = [];
  for (const c of cas) for (const config of configurations) taches.push({ c, config });
  const resultats = new Array(taches.length);
  let suivante = 0;
  async function ouvrier() {
    while (suivante < taches.length) {
      const i = suivante++;
      const { c, config } = taches[i];
      const debut = Date.now();
      try {
        const r = await routeur.appeler({
          cerveau: config.cerveau,
          temperature: config.temperature,
          maxTokens: 1200, // marge pour les modèles qui réfléchissent avant de répondre
          messages: messagesPrediction(config, c, { tauxDeBase, seuilPoints }),
        });
        const p = lireProbabilite(r.texte);
        resultats[i] = { cas: c.id, config: config.id, cerveau: config.cerveau, p, fournisseur: r.fournisseur, erreur: p == null ? "illisible" : null, ms: Date.now() - debut };
      } catch (err) {
        resultats[i] = { cas: c.id, config: config.id, cerveau: config.cerveau, p: null, erreur: err.message, ms: Date.now() - debut };
      }
      surProgres(++fait, taches.length);
    }
  }
  await Promise.all(Array.from({ length: Math.min(parallelisme, taches.length) }, ouvrier));
  predictions.push(...resultats);
  return noter({ configurations, cas, predictions });
}

export function noter({ configurations, cas, predictions }) {
  const parCas = new Map();
  for (const pr of predictions) {
    if (pr.p == null) continue;
    if (!parCas.has(pr.cas)) parCas.set(pr.cas, []);
    parCas.get(pr.cas).push({ id: pr.config, p: pr.p });
  }
  const resultats = new Map(cas.map((c) => [c.id, c.resultat]));
  const lignes = new Map(configurations.map((c) => [c.id, []]));
  const marche = [];
  for (const [idCas, preds] of parCas) {
    const res = resultats.get(idCas);
    marche.push({ p: prixMarche(preds), resultat: res });
    for (const pr of preds) {
      lignes.get(pr.id)?.push({
        p: pr.p,
        resultat: res,
        apport: preds.length > 1 ? apport(preds, pr.id, res) : null,
      });
    }
  }
  const parConfiguration = configurations.map((c) => ({ id: c.id, ...bilan(lignes.get(c.id)) }));
  const echecs = predictions.filter((p) => p.p == null).length;
  return {
    parConfiguration: parConfiguration.sort((a, b) => (b.apport ?? -Infinity) - (a.apport ?? -Infinity)),
    marche: bilan(marche),
    carteDesGenes: carteDesGenes(configurations, parConfiguration),
    predictions: predictions.length,
    echecs,
    parCerveau: statsParCerveau(predictions),
    detail: predictions.map(({ cas, config, cerveau, p, erreur, ms }) => ({ cas, config, cerveau, p, erreur: erreur ? String(erreur).slice(0, 160) : null, ms })),
  };
}

// Apport moyen par valeur de gène. Indicatif tant que l'échantillon est petit : la sélection
// n'élimine rien avant 30 verdicts par lignée (Constitution, article 6).
export function carteDesGenes(configurations, parConfiguration) {
  const bilans = new Map(parConfiguration.map((b) => [b.id, b]));
  const carte = {};
  for (const g of NOMS_GENES) {
    const groupes = {};
    for (const c of configurations) {
      const b = bilans.get(c.id);
      if (!b || b.apport == null) continue;
      const cle = String(c[g]);
      (groupes[cle] ??= []).push(b.apport);
    }
    carte[g] = Object.fromEntries(
      Object.entries(groupes).map(([v, xs]) => [v, { configurations: xs.length, apportMoyen: xs.reduce((s, x) => s + x, 0) / xs.length }])
    );
  }
  return carte;
}

// Santé de chaque modèle : réponses lisibles, échecs, durée moyenne, première erreur rencontrée.
export function statsParCerveau(predictions) {
  const stats = {};
  for (const p of predictions) {
    const cle = p.cerveau ?? "inconnu";
    const s = (stats[cle] ??= { ok: 0, echecs: 0, msTotal: 0, n: 0, exempleErreur: null });
    s.n += 1;
    s.msTotal += p.ms ?? 0;
    if (p.p == null) {
      s.echecs += 1;
      s.exempleErreur ??= p.erreur;
    } else s.ok += 1;
  }
  return Object.fromEntries(
    Object.entries(stats).map(([k, s]) => [k, { ok: s.ok, echecs: s.echecs, msMoyen: Math.round(s.msTotal / s.n), exempleErreur: s.exempleErreur }])
  );
}
