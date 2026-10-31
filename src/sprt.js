// Test séquentiel (SPRT) pour une page de test.
// H0 : taux de base p0 ; H1 : vraie faille p1. alpha = risque de fausse plongée, beta = risque de rater une faille.

export function bornes({ p0 = 0.02, p1 = 0.06, alpha = 0.1, beta = 0.2 } = {}) {
  const gainSucces = Math.log(p1 / p0);
  const perteEchec = Math.log((1 - p1) / (1 - p0)); // négatif
  const A = Math.log((1 - beta) / alpha);
  const B = Math.log(beta / (1 - alpha));
  const pente = -perteEchec / (gainSucces - perteEchec);
  return {
    pente,
    plongerOrdonnee: A / (gainSucces - perteEchec),
    arreterOrdonnee: B / (gainSucces - perteEchec),
  };
}

// Renvoie "plonger", "arreter", "plafond" ou "continuer".
export function verdict(visiteurs, inscriptions, options = {}) {
  const { plafond = 250 } = options;
  if (!Number.isFinite(visiteurs) || visiteurs <= 0) return "continuer";
  const b = bornes(options);
  if (inscriptions >= b.plongerOrdonnee + b.pente * visiteurs) return "plonger";
  if (inscriptions <= b.arreterOrdonnee + b.pente * visiteurs) return "arreter";
  if (visiteurs >= plafond) return "plafond";
  return "continuer";
}

// Table des seuils entiers pour un nombre de visiteurs donné.
export function seuils(visiteurs, options = {}) {
  const b = bornes(options);
  const arret = Math.floor(b.arreterOrdonnee + b.pente * visiteurs);
  return {
    visiteurs,
    plongerSiAuMoins: Math.ceil(b.plongerOrdonnee + b.pente * visiteurs),
    arreterSiAuPlus: arret < 0 ? null : arret,
  };
}
