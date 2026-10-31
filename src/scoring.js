// Scores de prédiction. Une prédiction est une probabilité p dans ]0, 1[ ; un verdict vaut 1 (succès) ou 0.

const EPS = 1e-4;
const borne = (p) => Math.min(1 - EPS, Math.max(EPS, p));

export function brier(p, resultat) {
  return (p - resultat) ** 2;
}

export function logScore(p, resultat) {
  const q = borne(p);
  return resultat ? Math.log(q) : Math.log(1 - q);
}

// Prix du marché : moyenne des log-cotes, pondérée par un poids par prédicteur (sa justesse passée).
export function prixMarche(predictions, poids = {}) {
  let somme = 0;
  let total = 0;
  for (const { id, p } of predictions) {
    const w = poids[id] ?? 1;
    const q = borne(p);
    somme += w * Math.log(q / (1 - q));
    total += w;
  }
  if (total === 0) return 0.5;
  return 1 / (1 + Math.exp(-somme / total));
}

// Apport d'un prédicteur : ce qu'il ajoute par rapport au consensus des autres (score logarithmique de marché).
// Copier le consensus rapporte zéro ; rapprocher le prix de la vérité rapporte du positif.
export function apport(predictions, idCible, resultat, poids = {}) {
  const autres = predictions.filter((x) => x.id !== idCible);
  const cible = predictions.find((x) => x.id === idCible);
  if (!cible) throw new Error(`prédicteur inconnu : ${idCible}`);
  const avant = prixMarche(autres, poids);
  return logScore(cible.p, resultat) - logScore(avant, resultat);
}

// Synthèse d'un prédicteur sur un ensemble de cas résolus.
export function bilan(lignes) {
  // lignes : [{ p, resultat, apport? }]
  if (!lignes.length) return { n: 0, brier: null, logScore: null, apport: null };
  const n = lignes.length;
  const moy = (f) => lignes.reduce((s, l) => s + f(l), 0) / n;
  return {
    n,
    brier: moy((l) => brier(l.p, l.resultat)),
    logScore: moy((l) => logScore(l.p, l.resultat)),
    apport: lignes.some((l) => l.apport != null) ? moy((l) => l.apport ?? 0) : null,
  };
}
