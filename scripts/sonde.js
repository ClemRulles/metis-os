// Sonde : ce qui est joignable depuis GitHub, et comment chaque modèle se comporte en mode JSON.
// N'affiche jamais de clé. Usage : OPENROUTER_API_KEY=... node scripts/sonde.js
const UA = { "user-agent": "metis-os/0.1 (recherche; github.com/ClemRulles/metis-os)" };
const cibles = {
  hn: "https://hn.algolia.com/api/v1/search_by_date?query=%22is%20there%20a%20tool%22&tags=comment&hitsPerPage=3",
  appstore_top: "https://itunes.apple.com/fr/rss/topfreeapplications/limit=3/genre=6017/json",
  stackexchange: "https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=creation&q=app&site=softwarerecs&pagesize=3",
  reddit: "https://www.reddit.com/r/france/search.json?q=application&restrict_sr=1&limit=3",
  reddit_old: "https://old.reddit.com/r/SomebodyMakeThis/new.json?limit=3",
  lemmy: "https://lemmy.world/api/v3/search?q=wish%20there%20was&type_=Comments&limit=3",
  pageviews: "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/fr.wikipedia/all-access/user/Miel/monthly/20260101/20261031",
  openrouter_models: "https://openrouter.ai/api/v1/models",
  google_play: "https://play.google.com/store/apps/details?id=com.duolingo&hl=fr",
  bluesky: "https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=%22is%20there%20an%20app%22&limit=3",
};
for (const [nom, url] of Object.entries(cibles)) {
  const t = Date.now();
  try {
    const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(20000) });
    const txt = await r.text();
    let extrait = txt.slice(0, 160).replace(/\s+/g, " ");
    if (nom === "openrouter_models") {
      const m = JSON.parse(txt).data;
      extrait = `${m.length} modèles ; exemple ${JSON.stringify(Object.keys(m[0]))}`;
    }
    console.log(`SOURCE ${nom} ${r.status} ${Date.now() - t}ms ${extrait}`);
  } catch (e) {
    console.log(`SOURCE ${nom} ERREUR ${e.message}`);
  }
}
if (!process.env.OPENROUTER_API_KEY) process.exit(0);
const modeles = {
  deepseek: "deepseek/deepseek-v4-flash", qwen: "qwen/qwen3.7-flash", glm: "z-ai/glm-5.3-flash",
  minimax: "minimax/minimax-m3.1-flash", mimo: "xiaomi/mimo-v2.6-flash", mistral: "mistralai/mistral-small-24b-instruct-2501",
};
const messages = [
  { role: "system", content: 'Réponds uniquement en JSON : {"idees": [{"titre": "...", "pourquoi": "..."}]} avec 3 idées.' },
  { role: "user", content: "Trois idées de produits numériques utiles pour les aidants de personnes âgées." },
];
async function appel(modele, corps) {
  const t = Date.now();
  const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` },
    body: JSON.stringify({ model: modele, messages, max_tokens: 1500, temperature: 0.7, usage: { include: true }, ...corps }),
    signal: AbortSignal.timeout(120000),
  });
  const txt = await r.text();
  let j = null;
  try { j = JSON.parse(txt); } catch {}
  const msg = j?.choices?.[0]?.message ?? {};
  let ok = false;
  try { ok = Array.isArray(JSON.parse(String(msg.content ?? "").replace(/```json|```/g, "")).idees); } catch {}
  return `${r.status} ${Date.now() - t}ms fin=${j?.choices?.[0]?.finish_reason} json=${ok} cout=${j?.usage?.cost} tokens=${j?.usage?.total_tokens} raisonnement=${String(msg.reasoning ?? "").length} contenu=${String(msg.content ?? "").length}${r.ok ? "" : " corps=" + txt.slice(0, 200)}`;
}
for (const [nom, id] of Object.entries(modeles)) {
  for (const [variante, corps] of Object.entries({
    none_json: { reasoning: { effort: "none" }, response_format: { type: "json_object" } },
    exclude_low: { reasoning: { effort: "low", exclude: true }, response_format: { type: "json_object" } },
  })) {
    try { console.log(`MODELE ${nom} ${variante} ${await appel(id, corps)}`); } catch (e) { console.log(`MODELE ${nom} ${variante} ERREUR ${e.message}`); }
  }
}
for (const engine of ["parallel", "exa"]) {
  try {
    const t = Date.now();
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` },
      body: JSON.stringify({
        model: "z-ai/glm-5.3-flash",
        plugins: [{ id: "web", engine, max_results: 5 }],
        reasoning: { effort: "none" },
        usage: { include: true },
        max_tokens: 1200,
        messages: [{ role: "user", content: "Quels services en ligne existent déjà en France pour envoyer un journal audio quotidien personnalisé aux personnes âgées ? Cite noms, URL et prix." }],
      }),
      signal: AbortSignal.timeout(120000),
    });
    const j = await r.json();
    const ann = j?.choices?.[0]?.message?.annotations ?? [];
    console.log(`WEB ${engine} ${r.status} ${Date.now() - t}ms cout=${j?.usage?.cost} citations=${ann.length} ${ann.slice(0, 3).map((a) => a.url_citation?.url).join(" ")} :: ${String(j?.choices?.[0]?.message?.content ?? JSON.stringify(j?.error ?? "")).slice(0, 300).replace(/\s+/g, " ")}`);
  } catch (e) {
    console.log(`WEB ${engine} ERREUR ${e.message}`);
  }
}
