import { test } from "node:test";
import assert from "node:assert/strict";
import { extraireCode, controlerCode, urlsAutorisees, executerEnBoite, verifierDemo, construireDemo, resumerPourCode } from "../src/atelier/atelier.js";
import { resumerJSON, sonderAtlas, sourcesUsine, historiqueSante, tauxReponse } from "../src/atlas/vivant.js";

const apis = [
  { id: "pollen-air", nom: "Open-Meteo qualité de l'air et pollens", licence: "CC BY 4.0", url: "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=1&longitude=2", ok: true, echantillon: "{hourly: …}" },
  { id: "change", nom: "Frankfurter (taux BCE)", licence: "publique", url: "https://api.frankfurter.dev/v1/latest?base=EUR", ok: true },
];

const BON = "```js\nexport function construire(d) {\n  const p = (d.pollen?.hourly?.birch_pollen ?? []);\n  const max = p.length ? Math.max(...p) : 0;\n  const esc = (t) => String(t).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);\n  return `<!doctype html><html lang=fr><head><meta charset=utf-8><meta name=\"viewport\" content=\"width=device-width\"><title>Alerte pollen</title></head><body><main><h1>Pollen de bouleau : pic à ${esc(max)} grains/m³</h1><p>${'Calcul sur les prochaines heures. '.repeat(40)}</p><p>Démonstration : produit en préparation.</p><h2>Sources</h2><p>Open-Meteo, CC BY 4.0.</p></main></body></html>`;\n}\n```";

test("code : extraction, contrôle statique, URL autorisées", () => {
  assert.ok(extraireCode(BON));
  assert.equal(extraireCode("```js\nconst x = 1;\n```"), null);
  assert.deepEqual(controlerCode("export function construire(){ return 1 }"), []);
  for (const mauvais of ["const r = require('fs')", "fetch('https://x')", "process.env.CLE", "globalThis.x", "(()=>{}).constructor('return 1')()", "import('node:fs')", "import fs from 'node:fs'"]) assert.ok(controlerCode(mauvais).length > 0, mauvais);
  const l = urlsAutorisees({ donnees: [{ cle: "pollen", url: "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=48&longitude=2&hourly=birch_pollen" }, { cle: "vol", url: "https://evil.example.com/x" }, { cle: "../x", url: "https://api.frankfurter.dev/v1/latest" }] }, apis);
  assert.deepEqual(l.map((d) => d.cle), ["pollen"]);
});

test("boîte fermée : exécute une fonction pure, sans secret ni fichier", async () => {
  const r = await executerEnBoite(extraireCode(BON), { pollen: { hourly: { birch_pollen: [1, 7, 3] } } });
  assert.match(r.html, /pic à 7 grains/);
  // Même si le contrôle statique était contourné, la boîte ne voit ni variables d'environnement ni fichiers.
  process.env.SECRET_TEST = "chut";
  const espion = await executerEnBoite("export function construire(){ const p = globalThis['proc'+'ess']; let f = 'lu'; try { p.getBuiltinModule('node:fs').readFileSync('/etc/hostname'); } catch (e) { f = e.code; } return JSON.stringify({ env: Object.keys(p.env), f }); }", {});
  const vu = JSON.parse(espion.html);
  assert.deepEqual(vu.env.filter((k) => k === "SECRET_TEST"), []);
  assert.equal(vu.f, "ERR_ACCESS_DENIED");
  const plante = await executerEnBoite("export function construire(){ throw new Error('boum') }", {});
  assert.match(plante.erreur, /boum/);
});

test("vérification de la démonstration", () => {
  const ok = verifierDemo("<!doctype html><title>Alerte pollen</title><meta name=viewport content=x>" + "x".repeat(1600) + "<p>Démonstration : produit en préparation.</p><h2>Sources</h2><p>Open-Meteo CC BY</p>", { sources: ["Open-Meteo qualité de l'air"] });
  assert.equal(ok.ok, true, ok.problemes.join(" ; "));
  const ko = verifierDemo("<title>t</title><script src='https://evil.io/a.js'></script><input type=email> undefined", { sources: ["Frankfurter"] });
  assert.ok(ko.problemes.length >= 5);
});

test("atelier : fiche, données, programme corrigé après une erreur", async () => {
  let appelsCode = 0;
  const demandeur = {
    demander: async (pref, messages, { lire }) => {
      const sys = messages[0].content;
      if (sys.includes("architecte")) return { valeur: lire(JSON.stringify({ titre: "Alerte pollen", donnees: [{ cle: "pollen", api: "pollen-air", url: "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=48&longitude=2&hourly=birch_pollen" }] })), cerveau: "a" };
      appelsCode += 1;
      if (appelsCode === 1) return { valeur: lire("```js\nexport function construire(d){ return d.rien.pas; }\n```"), cerveau: "b" };
      assert.match(messages[1].content, /Erreur à l'exécution/);
      return { valeur: lire(BON), cerveau: "b" };
    },
  };
  const fetchImpl = async () => ({ ok: true, status: 200, text: async () => JSON.stringify({ hourly: { birch_pollen: [2, 9, 4] } }) });
  const d = await construireDemo({ idee: { titre: "Pollen" }, plan: {}, apis, demandeur, cerveaux: ["a", "b"], fetchImpl });
  assert.equal(d.ok, true, d.raison);
  assert.equal(d.essais, 2);
  assert.match(d.html, /pic à 9/);
  assert.match(resumerPourCode({ a: [1, 2, 3, 4, 5] }), /2 de plus/);
});

test("atlas vivant : résumé, sonde, sources, santé", async () => {
  const r = resumerJSON({ generationtime_ms: 0.1, hourly: { time: ["a", "b"], pm2_5: [3, 4] } });
  assert.doesNotMatch(r, /generationtime/);
  assert.match(r, /pm2_5: \[2 éléments : 3\]/);
  const fetchImpl = async (url) => (url.includes("frankfurter") ? { ok: true, status: 200, text: async () => "<html>Request Rejected</html>" } : { ok: true, status: 200, text: async () => JSON.stringify({ hourly: { birch_pollen: [1] } }) });
  const s = await sonderAtlas({ apis: apis.map(({ ok, echantillon, ...a }) => a), fetchImpl });
  assert.deepEqual(s.map((x) => x.ok), [true, false]);
  const src = sourcesUsine(s, [{ id: "statique", nom: "S", pouvoir: "p" }]);
  assert.deepEqual(src.map((x) => x.id), ["pollen-air", "statique"]);
  assert.match(src[0].pouvoir, /Appel réel ce matin/);
  const h = historiqueSante(historiqueSante({}, s, "2026-11-01"), s, "2026-11-02");
  assert.equal(tauxReponse(h, "pollen-air"), 1);
  assert.equal(tauxReponse(h, "change"), 0);
});
