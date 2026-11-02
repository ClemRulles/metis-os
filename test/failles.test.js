import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { doitLireX, collecterEmergents, lireYC, lireShowHN, lireProductHunt, lireGitHubMontants, lireMastodonLiens, tractionEtrangere, detecterTransplants, lireAbandonnes, lireDemandesIgnorees, faillesMarche, gisementsDesFailles, rapportFaillesMd, lireX } from "../src/failles/detecteurs.js";
import { jetons, similarite, banalite, genererTemoins } from "../src/failles/temoin.js";
import { messagesGenerationVisionnaire, messagesGenerationAncree } from "../src/usine/pipeline.js";
import { scoreFinal, preuvePaiement } from "../src/enquete/enquete.js";

const config = JSON.parse(readFileSync(new URL("../config/usine.json", import.meta.url)));
const maintenant = Date.parse("2026-11-02T12:00:00Z");

test("émergents : lecture des cinq sources", () => {
  assert.equal(lireYC([{ name: "A", one_liner: "x", status: "Active", batch: "Fall 2026", slug: "a" }, { name: "B", status: "Inactive" }]).length, 1);
  assert.equal(lireShowHN({ hits: [{ title: "Show HN: Outil", points: 400, objectID: "1" }] })[0].titre, "Outil");
  const ph = lireProductHunt('<feed><entry><link rel="alternate" href="https://www.producthunt.com/products/hera"/><title>Hera</title><content type="html">&lt;p&gt;AI Canvas&lt;/p&gt;</content></entry></feed>');
  assert.deepEqual([ph[0].titre, ph[0].description], ["Hera", "AI Canvas"]);
  assert.equal(lireGitHubMontants({ items: [{ full_name: "a/b", html_url: "u", stargazers_count: 900 }] })[0].metrique.valeur, 900);
  assert.equal(lireGitHubMontants({ items: [{ full_name: "s/gridcraft", stargazers_count: 7000 }, { full_name: "s/wordcraft", stargazers_count: 17000 }, { full_name: "o/x", stargazers_count: 900 }] }).length, 1, "étoiles achetées écartées");
  assert.ok(tractionEtrangere({ source: "Y Combinator Fall 2026", metrique: {} }) > tractionEtrangere({ source: "GitHub (nouveau, en forte hausse)", metrique: { valeur: 50000 } }));
  assert.equal(lireMastodonLiens([{ url: "u", title: "t", history: [{ uses: "3" }, { uses: "4" }] }])[0].metrique.valeur, 7);
  assert.ok(tractionEtrangere({ source: "Show HN", metrique: { valeur: 900 } }) > tractionEtrangere({ source: "Show HN", metrique: { valeur: 90 } }));
});

test("X : plafond de messages lus respecté", async () => {
  const urls = [];
  const fetchImpl = async (u) => { urls.push(u); return { ok: true, json: async () => ({ data: Array.from({ length: 25 }, (_, k) => ({ id: String(k), text: "t", public_metrics: { like_count: 3 } })) }) }; };
  const r = await lireX({ fetchImpl, jeton: "j", requetes: ["a", "b", "c", "d", "e"], plafond: 60 });
  assert.equal(r.lus, 60, "jamais plus que le plafond");
  assert.equal(urls.length, 3);
});

test("transplant : la traction compte seulement s'il n'y a rien ici, et les liens sont vérifiés", async () => {
  const items = [
    { source: "Show HN", titre: "Outil A", description: "a", url: "https://a.com", metrique: { type: "points HN", valeur: 800 } },
    { source: "Show HN", titre: "Outil B", description: "b", url: "https://b.com", metrique: { type: "points HN", valeur: 800 } },
  ];
  const demandeur = {
    demander: async (pref, messages, { lire }) => {
      if (messages[0].content.includes("analyste")) return { valeur: lire(JSON.stringify({ produits: [{ n: 0, concept: "A pour tous", mots_en: ["a"], mots_fr: ["a"], transposable: true }, { n: 1, concept: "B pour tous", transposable: true }, { n: 0, concept: "Lib gratuite", commercial: false }] })), cerveau: "x" };
      const b = messages[1].content.includes("B pour tous");
      return { valeur: lire(JSON.stringify({ conclusion: b ? "present" : "absent", equivalents_fr: b ? [{ nom: "B-fr", url: "https://www.b.fr/x", proximite: 9 }, { nom: "Inventé", url: "https://faux.fr", proximite: 9 }] : [] })), cerveau: "y", citations: [{ url: "https://b.fr/" }] };
    },
  };
  const t = await detecterTransplants({ items, demandeur, cerveauxExtraction: ["x"], cerveauxEnquete: ["y"] });
  assert.deepEqual(t.map((x) => x.titre), ["A pour tous", "B pour tous"]);
  assert.equal(t[1].chiffres.equivalents_fr, 1, "le lien inventé n'est pas compté");
  assert.ok(t[0].force > t[1].force);
});

test("failles calculées : abandons, demandes ignorées, demande payée", () => {
  const ab = lireAbandonnes({ items: [
    { full_name: "x/outil", html_url: "u", description: "A tool", language: "Go", stargazers_count: 40000, pushed_at: "2024-06-01T00:00:00Z", open_issues_count: 300, topics: [] },
    { full_name: "x/awesome-things", html_url: "u", description: "list", language: "Go", stargazers_count: 90000, pushed_at: "2024-06-01T00:00:00Z", open_issues_count: 3, topics: ["awesome"] },
    { full_name: "vuejs/vue", html_url: "u", description: "Vue 2. For Vue 3, go to vuejs/core", language: "TS", stargazers_count: 200000, pushed_at: "2024-06-01T00:00:00Z", open_issues_count: 600, topics: [] },
  ] }, { maintenant });
  assert.deepEqual(ab.map((f) => f.titre.split(" :")[0]), ["x/outil"]);
  assert.equal(ab[0].chiffres.mois_sans_maj, 29);
  const di = lireDemandesIgnorees({ items: [
    { title: "Allow dark mode in exports", labels: [{ name: "feature-request" }], reactions: { "+1": 1200 }, comments: 300, created_at: "2019-01-01T00:00:00Z", repository_url: "https://api.github.com/repos/o/r", html_url: "u", body: "b" },
    { title: "Congratulations!", labels: [], reactions: { "+1": 5000 }, comments: 1, created_at: "2025-01-01T00:00:00Z", repository_url: "x", html_url: "u" },
    { title: "JavaScript深入之原型", labels: [], reactions: { "+1": 4000 }, comments: 9, created_at: "2018-01-01T00:00:00Z", repository_url: "x", html_url: "u" },
  ] }, { maintenant });
  assert.equal(di.length, 1);
  assert.equal(di[0].chiffres.depot, "o/r");
  const fm = faillesMarche({ fragiles: [{ titre: "T", description: "d", url: "https://apify.com/a", payant: true, donnees_personnelles: false, users30: 3000, note: 3.6, avis: 40, echec30: 0.2, prix: 0.004, unite: "result" }, { titre: "L", payant: true, donnees_personnelles: true, users30: 9000 }] });
  assert.equal(fm.length, 1);
  const g = gisementsDesFailles([...ab, ...di, ...fm]);
  assert.equal(g.length, 3);
  const payee = g.find((x) => x.faille.type === "demande_payee_mal_servie");
  assert.equal(payee.paieDeja, 0);
  assert.equal(preuvePaiement({ gisement: payee, canal: "seo-programmatique", marche_agents: payee.marche }).note, 2, "pas de preuve pour d'autres acheteurs");
  assert.match(rapportFaillesMd({ date: "2026-11-02", failles: [...ab, ...di], etat: {} }), /logiciel très utilisé, abandonné/);
  const s = scoreFinal({ score: 7, elo: 1500, gisement: { ...g[0], faille: g[0].faille }, banalite: { originalite: 9 } }, config.score_final.poids);
  assert.equal(s.composantes.douleur_prouvee, g[0].force);
  assert.equal(s.composantes.originalite_mesuree, 9);
});

test("témoin : mesure de banalité et consigne « ne pas refaire »", async () => {
  assert.ok(jetons("Les applications de révision du code").has("revision"));
  assert.equal(similarite(new Set(), new Set(["a"])), 0);
  const temoins = [{ titre: "Application de révision du code de la route", solution: "quiz de révision du code de la route" }];
  const banale = banalite({ titre: "Révision du code de la route", solution: "quiz de révision du code" }, temoins);
  const neuve = banalite({ titre: "Remplaçant maintenu de thefuck", solution: "correcteur de commandes shell maintenu" }, temoins);
  assert.ok(banale.originalite < 3, JSON.stringify(banale));
  assert.ok(neuve.originalite > 8, JSON.stringify(neuve));
  const demandeur = { demander: async (p, m, { lire }) => ({ valeur: lire(JSON.stringify({ idees: [{ titre: "Coach IA", solution: "un chatbot" }] })) }) };
  const t = await genererTemoins({ arenes: { apprendre: "x", planete: "y" }, demandeur, cerveaux: ["a"] });
  assert.equal(t.tous.length, 2);
  const mv = messagesGenerationVisionnaire({ config, lentille: "inversion", these: "t", arene: "apprendre", sources: [], signaux: [], n: 3, temoins: t.parArene.apprendre });
  assert.match(mv[1].content, /deja_propose_par_n_importe_quelle_IA[\s\S]*Coach IA/);
  const ma = messagesGenerationAncree({ config: { ...config, lentilles_ancrees: config.lentilles_failles }, lentille: "faire-l-ignore", gisement: { nom: "Faille", n: 70, description: "d", exemples: [] }, n: 3, temoins: t.tous });
  assert.match(ma[0].content, /Des centaines de personnes réclament/);
});

test("X une fois par semaine, mémoire réutilisée ; transplants vérifiés gardés 14 jours", async () => {
  const lundi = Date.parse("2026-11-02T12:00:00Z");
  const mardi = Date.parse("2026-11-03T12:00:00Z");
  assert.equal(doitLireX(null, mardi), true);
  assert.equal(doitLireX({ date: "2026-11-02T12:00:00Z" }, mardi), false);
  assert.equal(doitLireX({ date: "2026-10-26T12:00:00Z" }, lundi), true);
  let appelsX = 0;
  const fetchImpl = async (u) => {
    if (u.includes("api.x.com")) appelsX += 1;
    return { ok: true, json: async () => ({ data: [{ id: "1", text: "just launched", public_metrics: { like_count: 50 } }], batches: {}, hits: [], items: [] }), text: async () => "" };
  };
  const e = await collecterEmergents({ fetchImpl, maintenant: mardi, jetonX: "j", memoireX: { date: "2026-11-02T12:00:00Z", items: [{ source: "X", titre: "gardé", description: "", url: "u", metrique: { valeur: 9 } }] } });
  assert.equal(appelsX, 0, "pas de lecture payante le mardi");
  assert.ok(e.items.some((i) => i.titre === "gardé"));
  let recherches = 0;
  const demandeur = { demander: async (p, m, { lire }) => {
    if (m[0].content.includes("analyste")) return { valeur: lire(JSON.stringify({ produits: [{ n: 0, concept: "C", commercial: true, transposable: true }] })) };
    recherches += 1;
    return { valeur: lire('{"conclusion": "absent", "equivalents_fr": []}'), citations: [] };
  } };
  const items = [{ source: "Product Hunt", titre: "P", description: "", url: "https://p.com", metrique: { valeur: 1 } }];
  const t1 = await detecterTransplants({ items, demandeur, cerveauxExtraction: ["x"], cerveauxEnquete: ["y"], maintenant: lundi });
  const t2 = await detecterTransplants({ items, demandeur, cerveauxExtraction: ["x"], cerveauxEnquete: ["y"], cache: t1.cache, maintenant: mardi });
  assert.equal(recherches, 1, "la vérification web n'est pas repayée");
  assert.equal(t2.length, 1);
});

test("itération 4 : ressemblance exige trois mots, fatigue des gisements, lentille selon la faille", async () => {
  assert.equal(similarite(jetons("données publiques ouvertes santé"), jetons("cartes des données publiques ouvertes du code")), 0);
  const base = { score: 7, elo: 1500, gisement: { id: "g1", force: 5 }, enquete: { concurrents: [], preuves_demande: [], offres_payantes: [], nouveaute: 8, risque_juridique: "faible", verdict: "creuser" } };
  assert.ok(scoreFinal({ ...base, fatigue: 3 }, config.score_final.poids).total < scoreFinal(base, config.score_final.poids).total);
  const { lancerUsine } = await import("../src/usine/pipeline.js");
  const vues = [];
  const demandeur = { demander: async (p, m, { lire }) => { vues.push(m[0].content); return { valeur: null, cerveau: null }; } };
  await lancerUsine({ config: { ...config, volumes: { ...config.volumes, generations: 0, generations_marche: 0, generations_failles: 4 } }, atlas: { sources: [] }, gisementsFailles: [{ id: "f1", nom: "F", n: 1, force: 5, description: "d", exemples: [], faille: { type: "abandonne" } }], demandeur, graine: 1 });
  assert.ok(vues.every((v) => v.includes("plus personne ne l'entretient")), "un abandon reçoit la lentille « reprendre l'abandon »");
});
