-- Base D1 de la liste d'attente des expériences. Aucune donnée n'est envoyée à un modèle d'IA.
CREATE TABLE IF NOT EXISTS visites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  experience TEXT NOT NULL,
  source TEXT,
  pays TEXT,
  jour TEXT NOT NULL,
  cree TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS inscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  experience TEXT NOT NULL,
  email TEXT NOT NULL,
  source TEXT,
  pays TEXT,
  accord INTEGER NOT NULL,
  cree TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (experience, email)
);
-- Mode « clic » : on compte l'intérêt sans aucune donnée personnelle (ni e-mail, ni adresse IP).
CREATE TABLE IF NOT EXISTS clics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  experience TEXT NOT NULL,
  source TEXT,
  pays TEXT,
  cree TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_visites_exp ON visites (experience, jour);
CREATE INDEX IF NOT EXISTS idx_inscriptions_exp ON inscriptions (experience);
