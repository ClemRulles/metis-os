// Configurations (« génomes ») : combinaisons de gènes. Tout est piloté par config/genes.json.

export const NOMS_GENES = [
  "cerveau", "role", "lentille", "raisonnement", "persona", "territoire",
  "zone", "risque", "horizon", "memoire", "outils", "temperature",
];

// Générateur pseudo-aléatoire déterministe (mulberry32) : mêmes graines, mêmes populations.
export function rng(graine = 1) {
  let a = graine >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const choisir = (liste, alea) => liste[Math.floor(alea() * liste.length)];

export function valider(config, catalogue) {
  const erreurs = [];
  for (const g of NOMS_GENES) {
    if (!(g in config)) erreurs.push(`gène manquant : ${g}`);
    else if (!catalogue.genes[g].includes(config[g])) erreurs.push(`valeur inconnue pour ${g} : ${config[g]}`);
  }
  const interdits = catalogue.regles?.personaInterditePourRoles ?? [];
  if (interdits.includes(config.role) && config.persona !== "aucune") {
    erreurs.push(`le rôle ${config.role} juge : pas de persona`);
  }
  return erreurs;
}

export function distance(a, b) {
  return NOMS_GENES.reduce((d, g) => d + (a[g] === b[g] ? 0 : 1), 0);
}

export function aleatoire(catalogue, alea, contraintes = {}) {
  const c = {};
  for (const g of NOMS_GENES) c[g] = contraintes[g] ?? choisir(catalogue.genes[g], alea);
  const interdits = catalogue.regles?.personaInterditePourRoles ?? [];
  if (interdits.includes(c.role)) c.persona = "aucune";
  return c;
}

// Mutation : change n gènes au hasard (jamais le rôle, qui définit le vivier).
export function muter(config, catalogue, alea, n = 1) {
  const enfant = { ...config };
  const mutables = NOMS_GENES.filter((g) => g !== "role");
  for (let i = 0; i < n; i++) {
    const g = choisir(mutables, alea);
    const autres = catalogue.genes[g].filter((v) => v !== enfant[g]);
    if (autres.length) enfant[g] = choisir(autres, alea);
  }
  const interdits = catalogue.regles?.personaInterditePourRoles ?? [];
  if (interdits.includes(enfant.role)) enfant.persona = "aucune";
  return enfant;
}

// Croisement : chaque gène vient de l'un ou l'autre parent (même rôle requis).
export function croiser(a, b, alea) {
  if (a.role !== b.role) throw new Error("croisement entre rôles différents");
  const enfant = {};
  for (const g of NOMS_GENES) enfant[g] = alea() < 0.5 ? a[g] : b[g];
  return enfant;
}

// Ajoute une configuration seulement si elle est assez éloignée de toutes les autres.
export function admissible(candidat, population, catalogue) {
  const min = catalogue.regles?.distanceMinimale ?? 4;
  return population.every((x) => distance(candidat, x) >= min);
}

// Population initiale : n configurations par rôle, diversité imposée, familles de modèles réparties.
export function populationInitiale(catalogue, { parRole = 4, roles, graine = 7, essaisMax = 5000 } = {}) {
  const alea = rng(graine);
  const listeRoles = roles ?? catalogue.genes.role;
  const population = [];
  for (const role of listeRoles) {
    const cerveaux = [...catalogue.genes.cerveau];
    let crees = 0;
    let essais = 0;
    while (crees < parRole && essais < essaisMax) {
      essais++;
      const cerveau = cerveaux[(crees + essais) % cerveaux.length];
      const c = aleatoire(catalogue, alea, { role, cerveau });
      if (valider(c, catalogue).length === 0 && admissible(c, population, catalogue)) {
        population.push({ id: `${role}-${String(crees + 1).padStart(2, "0")}`, ...c });
        crees++;
      }
    }
  }
  return population;
}
