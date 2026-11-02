import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { lancerVague, slugifier, normaliserFiche, bloquantsDeContenu, noterPlan, rapportVagueMd } from "../src/lancement/vague.js";
import { rendrePage } from "../src/experiences/gabarit.js";
import { verifierCredibilite } from "../src/experiences/credibilite.js";

const config = JSON.parse(readFileSync(new URL("../config/usine.json", import.meta.url)));
const editeur = { nom: "Clément Exemple", adresse: "Rue X 1, 6700 Arlon, Belgique", contact: "contact@exemple.be" };

test("slugs uniques et propres", () => {
  const pris = new Set();
  assert.equal(slugifier("Révise ton Code !", pris), "revise-ton-code");
  assert.equal(slugifier("Révise ton code", pris), "revise-ton-code-2");
  assert.equal(slugifier("é", pris), "test-e");
});

test("fiche normalisée : bornes, offre, couleur, éditeur", () => {
  const f = normaliserFiche({ nom: "Voxa", accroche: "Révisez en roulant", offre: "autre", couleur: "rouge", probleme_points: ["a", "", "b"], faq: [{ question: "q" }] }, { slug: "voxa", editeur, apiUrl: "https://api.exemple" });
  assert.equal(f.offre, "liste");
  assert.equal(f.couleur, "#2f5d50");
  assert.deepEqual(f.probleme_points, ["a", "b"]);
  assert.deepEqual(f.faq, []);
  assert.equal(f.editeur.nom, "Clément Exemple");
});

test("les contrôles d'éditeur et de liste d'attente ne sont pas des défauts de contenu", () => {
  const f = normaliserFiche({ nom: "Voxa", accroche: "Révisez en roulant", sous_titre: "s", prix: "4 € par mois", probleme_points: ["a"], comment: ["b"] }, { slug: "voxa", editeur: {}, apiUrl: "" });
  const r = verifierCredibilite(rendrePage(f), f);
  assert.equal(r.ok, false);
  assert.deepEqual(bloquantsDeContenu(r), []);
  assert.equal(noterPlan({ trafic_realiste: 8, clarte_offre: 6, vitesse: 7, cout: 9, honnetete: 10 }), 8);
});

function demandeurFactice() {
  const appels = [];
  return {
    appels,
    demander: async (preferes, messages, { lire }) => {
      const sys = messages[0].content;
      const user = messages[1].content;
      appels.push(sys.slice(0, 40));
      let rep;
      if (sys.includes("fondateur en série")) rep = { promesse: `Promesse ${user.slice(20, 40)}`, public_precis: "p", canal_principal: "c", premiers_visiteurs: ["a", "b"], offre: "liste", prix: "5 €", metrique: "inscriptions", seuil_succes: "3 %", budget_eur: 0, part_automatisable: "tout", action_humaine: "rien" };
      else if (sys.includes("avocat du diable")) rep = { trafic_realiste: user.includes("Idée 1") ? 9 : 5, clarte_offre: 7, vitesse: 7, cout: 8, honnetete: 9, echec_probable: "e", correction: "c" };
      else if (sys.includes("associé le plus exigeant")) rep = { embarrassant: user.includes("Idée 2"), raisons: ["r"], note_waw: user.includes("Idée 4") ? 5 : 8, ce_qui_rend_waw: "x" };
      else if (sys.includes("arbitres")) rep = { gagnant: user.indexOf("Idée 1") > -1 && user.indexOf("Idée 1") < user.indexOf("<B>") ? "A" : "B" };
      else if (sys.includes("écris la page de test")) rep = { nom: user.includes("Idée 3") ? "Aviz Pro" : `Nom ${user.match(/Idée \d/)?.[0]}`, accroche: "Une accroche claire", sous_titre: user.includes("Idée 3") ? "Déjà 10 000 avis clients satisfaits" : "Un sous-titre", probleme_points: ["a", "b", "c"], comment: ["1", "2", "3"], pour_qui: "Les gens", prix: "5 € par mois", offre: "liste", faq: [{ question: "Quand ?", reponse: "Bientôt" }] };
      else if (sys.includes("Tu relis")) {
        const f = JSON.parse(user.split("<fiche>\n")[1].split("\n</fiche>")[0]);
        rep = user.includes("Déjà 10 000") ? f : { ...f, accroche: `${f.accroche} (relue)` };
      }
      const v = rep ? lire(JSON.stringify(rep)) : null;
      return { valeur: v, cerveau: preferes[0] };
    },
  };
}

test("vague : plans, tournoi, sélection diverse, pages relues, porte de crédibilité", async () => {
  const opportunites = [1, 2, 3, 4, 5, 6, 7].map((k) => ({
    titre: `Idée ${k}`,
    arene: k <= 3 ? "apprendre" : `arene-${k}`,
    probleme: "p",
    solution: k === 7 ? "Un site qui croise les offres Indeed aspirées par scraping" : "s",
    final: { total: 8 - k / 10, paiement: "x", composantes: { paiement_prouve: 8, originalite_mesuree: 7 } },
    enquete: { verdict: k === 6 ? "abandonner" : "creuser", risque_juridique: "faible" },
    critique: { conforme: true },
  }));
  const d = demandeurFactice();
  const v = await lancerVague({ opportunites, config, lancement: { taille_vague: 4, max_par_arene: 2, editeur, api_url: "https://api.exemple", rondes: 2 }, demandeur: d, graine: 3, dejaLances: ["Idée 5"] });
  assert.equal(v.candidats, 4, "abandon, aspiration de site et déjà lancé exclus");
  assert.equal(v.plans, 8, "deux plans par idée");
  assert.ok(v.choisis.length <= 4);
  assert.ok(v.choisis.filter((p) => p.idee.arene === "apprendre").length <= 2, "deux par arène au plus");
  assert.equal(v.classement[0].idee.titre, "Idée 1", "le meilleur plan gagne le tournoi");
  assert.ok(!v.choisis.some((p) => p.idee.titre === "Idée 2"), "pré-mortem embarrassant : écartée");
  assert.ok(!v.choisis.some((p) => p.idee.titre === "Idée 4"), "pas assez « waw » : écartée");
  const faux = v.choisis.find((p) => p.idee.titre === "Idée 3");
  if (faux) assert.equal(faux.contenuOk, false, "une page avec de faux avis ne part jamais");
  for (const p of v.prets) {
    assert.ok(p.credibilite.ok, p.slug);
    assert.match(p.fiche.accroche, /relue/);
  }
  assert.match(rapportVagueMd({ date: "2026-11-01", vague: v, deploiement: "test" }), /Vague de lancement du 2026-11-01/);
});

test("seuil : sous le seuil, pas de vague et aucun appel", async () => {
  let appels = 0;
  const v = await lancerVague({ opportunites: [{ titre: "Faible", final: { total: 7.5, composantes: { paiement_prouve: 4, originalite_mesuree: 8 } }, enquete: {}, critique: {} }], config, lancement: {}, demandeur: { demander: async () => (appels++, { valeur: null }) } });
  assert.equal(v.candidats, 0);
  assert.equal(appels, 0);
  assert.match(rapportVagueMd({ date: "d", vague: v, deploiement: "x" }), /Aucune opportunité n'atteint la barre/);
});
