import { test } from "node:test";
import assert from "node:assert/strict";
import { creerRouteur } from "../src/router.js";

const fournisseurs = [{ id: "openrouter", url: "u", cle: "K", tokensParJour: 1e9, requetesParMinute: 1000, modeles: { m: "x/m" } }];
function fetchSuite(reponses) {
  const appels = [];
  const f = async (url, init) => {
    appels.push(JSON.parse(init.body));
    const r = reponses.shift();
    return { ok: r.ok ?? true, status: r.status ?? 200, json: async () => r.json };
  };
  f.appels = appels;
  return f;
}
const rep = (content, extra = {}) => ({ json: { choices: [{ message: { content, ...extra.message }, finish_reason: "stop" }], usage: { total_tokens: 10, cost: extra.cost ?? 0.001 } } });

test("routeur : mode JSON, réflexion coupée, coût cumulé et plafond", async () => {
  const fetchImpl = fetchSuite([rep('{"a":1}', { cost: 0.004 }), rep('{"a":2}', { cost: 0.004 }), rep("x")]);
  const r = creerRouteur({ fournisseurs, env: { K: "k" }, fetchImpl, plafondCoutUsd: 0.008 });
  const a = await r.appeler({ cerveau: "m", messages: [], json: true, raisonnement: "none" });
  assert.equal(a.texte, '{"a":1}');
  assert.deepEqual(fetchImpl.appels[0].response_format, { type: "json_object" });
  assert.deepEqual(fetchImpl.appels[0].reasoning, { effort: "none" });
  await r.appeler({ cerveau: "m", messages: [] });
  assert.equal(r.cout().usd, 0.008);
  await assert.rejects(r.appeler({ cerveau: "m", messages: [] }), /plafond de coût/);
});

test("routeur : repli sans mode JSON ni coupure si le modèle refuse (HTTP 400)", async () => {
  const fetchImpl = fetchSuite([{ ok: false, status: 400 }, rep('{"ok":true}')]);
  const r = creerRouteur({ fournisseurs, env: { K: "k" }, fetchImpl });
  const a = await r.appeler({ cerveau: "m", messages: [], json: true, raisonnement: "none" });
  assert.equal(a.texte, '{"ok":true}');
  assert.equal(fetchImpl.appels[1].response_format, undefined);
  assert.deepEqual(fetchImpl.appels[1].reasoning, { effort: "low", exclude: true });
});

test("routeur : en mode JSON, la réflexion n'est jamais prise pour la réponse ; citations web lues", async () => {
  const fetchImpl = fetchSuite([
    rep("", { message: { reasoning: "Here's a thinking process" } }),
    rep("", { message: { reasoning: "Here's a thinking process" } }),
    rep("", { message: { reasoning: "Here's a thinking process" } }),
  ]);
  const r = creerRouteur({ fournisseurs, env: { K: "k" }, fetchImpl, tentativesMax: 0, seuilCoupeCircuit: 99 });
  await assert.rejects(r.appeler({ cerveau: "m", messages: [], json: true }), /réponse vide/);
  const f2 = fetchSuite([rep("Voici", { message: { annotations: [{ type: "url_citation", url_citation: { url: "https://ex.fr", title: "Ex" } }] } })]);
  const r2 = creerRouteur({ fournisseurs, env: { K: "k" }, fetchImpl: f2 });
  const b = await r2.appeler({ cerveau: "m", messages: [], web: { engine: "parallel", max_results: 3 } });
  assert.deepEqual(b.citations, [{ url: "https://ex.fr", titre: "Ex" }]);
  assert.deepEqual(f2.appels[0].plugins, [{ id: "web", engine: "parallel", max_results: 3 }]);
});
