import { test } from "node:test";
import assert from "node:assert/strict";
import { rendrePage } from "../src/experiences/gabarit.js";
import { verifierCredibilite } from "../src/experiences/credibilite.js";

const fiche = {
  slug: "essai-test",
  nom: "Essai",
  accroche: "Un service <utile>",
  sous_titre: "Pour tester",
  probleme_points: ["a", "b"],
  comment: ["un", "deux", "trois"],
  pour_qui: "Tout le monde",
  prix: "5 € par mois",
  offre: "precommande",
  faq: [{ question: "Quand ?", reponse: "Bientôt" }],
  editeur: { nom: "Clément Mine", adresse: "Rue X 1, 6700 Arlon, Belgique", contact: "contact@exemple.be" },
  api_url: "https://metis-liste-attente.exemple.workers.dev",
};

test("page : échappement, statut honnête, consentement, mentions", () => {
  const html = rendrePage(fiche);
  assert.match(html, /Un service &lt;utile&gt;/);
  assert.match(html, /En préparation · précommande remboursable/);
  assert.match(html, /noindex/);
  const r = verifierCredibilite(html, fiche);
  assert.equal(r.ok, true, JSON.stringify(r.bloquants));
});

test("porte de crédibilité : bloque les faux avis, la fausse urgence, l'offre interdite et les mentions manquantes", () => {
  const mauvaise = { ...fiche, sous_titre: "Plus de +10 000 clients satisfaits ★★★★★, offre expire ce soir", pour_qui: "Audit pour les PME", editeur: { nom: "[à compléter]", adresse: "", contact: "" }, api_url: "" };
  const r = verifierCredibilite(rendrePage(mauvaise), mauvaise);
  assert.equal(r.ok, false);
  for (const id of ["mentions-editeur", "api-branchee", "interdit-étoiles", "interdit-compteur", "interdit-fausse", "interdit-offre"]) assert.ok(r.bloquants.includes(id), id);
});

test("mode clic : aucune donnée personnelle, porte franchie", () => {
  const f = { ...fiche, offre: "clic" };
  const html = rendrePage(f);
  assert.doesNotMatch(html, /type="email"/);
  assert.match(html, /\/clic/);
  assert.match(html, /Données personnelles :<\/strong> aucune/);
  const r = verifierCredibilite(html, f);
  assert.equal(r.ok, true, JSON.stringify(r.bloquants));
});
