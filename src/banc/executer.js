// Fait prédire des configurations sur des cas résolus, puis note chacune (justesse et apport)
// et produit une première carte de l'effet des gènes.

import { messagesPrediction, lireProbabilite } from "./prompt.js";
import { prixMarche, apport, bilan } from "../scoring.js";
import { NOMS_GENES } from "../genome.js";

export async function executerBanc({ configurations, cas, routeur, tauxDeBase = null, seuilPoints = 10, surProgres = () => {} }) {
  const predictions = []; // { cas, config, p, fournisseur, erreur? }
  let fait = 0;
  for (const c of cas) {
    for (const config of configurations) {
      try {
        const r = await routeur.appeler({
          cerveau: config.cerveau,
          temperature: config.temperature,
          maxTokens: 200,
          messages: messagesPrediction(config, c, { tauxDeBase, seuilPoints }),
        });
        const p = lireProbabilite(r.texte);
        predictions.push({ cas: c.id, config: config.id, p, fournisseur: r.fournisseur, erreur: p == null ? "illisible" : null });
      } catch (err) {
        predictions.push({ cas: c.id, config: config.id, p: null, erreur: err.message });
      }
      surProgres(++fait, cas.length * configurations.length);
    }
  }
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
