-- Registre de Métis OS (Cloudflare D1, compatible SQLite).
-- Toute décision de la machine laisse une trace ici : c'est la mémoire et le futur jeu d'entraînement.

CREATE TABLE IF NOT EXISTS configurations (
  id TEXT PRIMARY KEY,
  genes TEXT NOT NULL,              -- JSON des 12 gènes
  parent TEXT,                      -- configuration d'origine (mutation ou croisement)
  statut TEXT NOT NULL DEFAULT 'active', -- active, fantome, retiree
  cree_le TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cas (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,             -- show_hn, manifold, experience
  date TEXT NOT NULL,
  enonce TEXT NOT NULL,
  contexte TEXT,
  resultat INTEGER,                 -- 0 ou 1 ; NULL tant que non résolu
  mesure REAL,
  collecte_le TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS predictions (
  cas TEXT NOT NULL REFERENCES cas(id),
  configuration TEXT NOT NULL REFERENCES configurations(id),
  p REAL,                           -- NULL si la réponse était illisible
  fournisseur TEXT,
  version_machine TEXT,
  predit_le TEXT NOT NULL,
  PRIMARY KEY (cas, configuration, version_machine)
);

CREATE TABLE IF NOT EXISTS experiences (
  id TEXT PRIMARY KEY,
  grappe TEXT,                      -- niche ; les variantes d'une même grappe partagent ce champ
  titre TEXT NOT NULL,
  axe TEXT,                         -- marche, langue, prix, canal, positionnement
  hypothese TEXT NOT NULL,
  evenement TEXT NOT NULL,          -- verdict défini AVANT le lancement
  statut TEXT NOT NULL DEFAULT 'prepa', -- prepa, en_ligne, plonger, arret, gagnee
  visiteurs INTEGER NOT NULL DEFAULT 0,
  inscriptions INTEGER NOT NULL DEFAULT 0,
  paiements INTEGER NOT NULL DEFAULT 0,
  euros REAL NOT NULL DEFAULT 0,
  cout_euros REAL NOT NULL DEFAULT 0,
  heures_humaines REAL NOT NULL DEFAULT 0,
  porte_credibilite TEXT,           -- JSON de la liste de contrôle passée
  debut TEXT,
  fin TEXT,
  lecon TEXT
);

CREATE TABLE IF NOT EXISTS evenements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  experience TEXT NOT NULL REFERENCES experiences(id),
  type TEXT NOT NULL,               -- visite, inscription, clic_prix, acompte, paiement, remboursement, plainte
  valeur REAL,
  source TEXT NOT NULL,             -- webhook, analytics : jamais une affirmation d'agent
  recu_le TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS trouvailles (
  id TEXT PRIMARY KEY,
  affirmation TEXT NOT NULL,
  url TEXT NOT NULL,
  extrait TEXT NOT NULL,            -- 300 caractères au plus, vérifié par un nouveau téléchargement
  verifie INTEGER NOT NULL DEFAULT 0,
  domaines_confirmant INTEGER NOT NULL DEFAULT 1,
  provenance TEXT NOT NULL DEFAULT 'web', -- étiquette qui suit la donnée partout
  auteur TEXT REFERENCES configurations(id),
  cree_le TEXT NOT NULL,
  derniere_utilisation TEXT
);

CREATE TABLE IF NOT EXISTS regles (
  cle TEXT PRIMARY KEY,             -- les règles sont des données : seuils, poids, budgets
  valeur TEXT NOT NULL,
  modifie_le TEXT NOT NULL,
  modifie_par TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS versions (
  version TEXT PRIMARY KEY,
  publiee_le TEXT NOT NULL,
  changements TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_predictions_configuration ON predictions(configuration);
CREATE INDEX IF NOT EXISTS idx_evenements_experience ON evenements(experience);
CREATE INDEX IF NOT EXISTS idx_experiences_grappe ON experiences(grappe);
