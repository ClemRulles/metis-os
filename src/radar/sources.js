// Radar des douleurs : collecte de besoins et de plaintes exprimés par de vraies personnes, avec leur lien.
// Sources publiques joignables depuis GitHub (sonde du 1er novembre 2026) : Hacker News, avis App Store,
// Stack Exchange (Software Recommendations, Web Applications), Lemmy (dont jlai.lu, francophone).
// Reddit et Bluesky bloquent les serveurs de GitHub. Chaque texte est une donnée, jamais une consigne.

const UA = { "user-agent": "metis-os/0.2 (recherche; github.com/ClemRulles/metis-os)" };
const nettoyer = (html) =>
  String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/\s+/g, " ")
    .trim();
const couper = (t, n = 700) => (t.length > n ? `${t.slice(0, n)}…` : t);

async function lireJSON(fetchImpl, url) {
  const rep = await fetchImpl(url, { headers: UA, signal: AbortSignal.timeout?.(40000) });
  if (!rep.ok) throw new Error(`HTTP ${rep.status}`);
  return rep.json();
}

export const PHRASES_HN = ["is there a tool", "I wish there was", "I would pay for", "why is there no", "is there an app", "someone should build", "I'd happily pay", "no good solution for"];

export function lireHN(json) {
  return (json?.hits ?? [])
    .filter((h) => h.comment_text || h.story_text || h.title)
    .map((h) => ({ source: "Hacker News", url: `https://news.ycombinator.com/item?id=${h.objectID}`, date: h.created_at, texte: couper(nettoyer(h.comment_text || h.story_text || h.title)) }));
}

export function lireAvisAppStore(json, { pays, app }) {
  const entrees = json?.feed?.entry ?? [];
  return (Array.isArray(entrees) ? entrees : [entrees])
    .filter((e) => e?.["im:rating"] && Number(e["im:rating"].label) <= 2)
    .map((e) => ({
      source: `App Store ${pays}`,
      url: app.url,
      app: app.nom,
      note: Number(e["im:rating"].label),
      texte: couper(nettoyer(`${e.title?.label ?? ""}. ${e.content?.label ?? ""}`)),
    }));
}

export function lireTopAppStore(json) {
  const entrees = json?.feed?.entry ?? [];
  return (Array.isArray(entrees) ? entrees : [entrees]).map((e) => ({ id: e?.id?.attributes?.["im:id"], nom: e?.["im:name"]?.label, url: e?.id?.label })).filter((a) => a.id);
}

export function lireStackExchange(json, site) {
  return (json?.items ?? []).map((q) => ({ source: `Stack Exchange ${site}`, url: q.link, date: new Date(q.creation_date * 1000).toISOString(), texte: couper(nettoyer(`${q.title}. ${q.body ?? ""}`)) }));
}

export function lireLemmy(json, instance) {
  const commentaires = (json?.comments ?? []).map((c) => ({ source: `Lemmy ${instance}`, url: c.comment?.ap_id, date: c.comment?.published, texte: couper(nettoyer(c.comment?.content)) }));
  const posts = (json?.posts ?? []).map((p) => ({ source: `Lemmy ${instance}`, url: p.post?.ap_id, date: p.post?.published, texte: couper(nettoyer(`${p.post?.name ?? ""}. ${p.post?.body ?? ""}`)) }));
  return [...commentaires, ...posts].filter((x) => x.url && x.texte.length > 30);
}

// Catégories App Store tournantes : chaque jour en explore d'autres (santé, éducation, finance, vie pratique…).
export const GENRES_APPSTORE = { 6013: "Santé et forme", 6017: "Éducation", 6015: "Finance", 6012: "Style de vie", 6007: "Productivité", 6003: "Voyages", 6023: "Cuisine et boissons", 6024: "Shopping", 6002: "Utilitaires", 6018: "Livres", 6010: "Navigation", 6020: "Médecine", 6011: "Musique", 6016: "Divertissement" };

export async function collecterDouleursBrutes({ fetchImpl = globalThis.fetch, maintenant = Date.now(), jour = new Date().getUTCDate(), journal = () => {}, appsParGenre = 5, genresParJour = 5, plafondAppStore = 320 } = {}) {
  const items = [];
  const etat = {};
  const noter = (nom, n, erreur) => (etat[nom] = erreur ? { n, erreur: String(erreur).slice(0, 100) } : { n });
  const depuis = Math.floor((maintenant - 30 * 86400_000) / 1000);

  // Hacker News : commentaires du dernier mois qui expriment un manque.
  let nHN = 0;
  for (const phrase of PHRASES_HN) {
    try {
      const j = await lireJSON(fetchImpl, `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(`"${phrase}"`)}&tags=comment&numericFilters=created_at_i>${depuis}&hitsPerPage=25`);
      const l = lireHN(j);
      nHN += l.length;
      items.push(...l);
    } catch (e) {
      noter("hn", nHN, e.message);
    }
  }
  etat.hn ??= { n: nHN };

  // App Store : avis à 1 ou 2 étoiles des applications les plus téléchargées, en France, Belgique et États-Unis.
  const genres = Object.keys(GENRES_APPSTORE);
  const choisis = Array.from({ length: genresParJour }, (_, k) => genres[(jour * genresParJour + k) % genres.length]);
  let nAS = 0;
  for (const pays of ["fr", "be", "us"]) {
    for (const g of choisis) {
      try {
        const top = lireTopAppStore(await lireJSON(fetchImpl, `https://itunes.apple.com/${pays}/rss/topfreeapplications/limit=${appsParGenre}/genre=${g}/json`));
        for (const app of top) {
          try {
            const avis = lireAvisAppStore(await lireJSON(fetchImpl, `https://itunes.apple.com/${pays}/rss/customerreviews/page=1/id=${app.id}/sortby=mostrecent/json`), { pays, app });
            nAS += avis.length;
            items.push(...avis.slice(0, 12).map((a) => ({ ...a, categorie: GENRES_APPSTORE[g] })));
          } catch {
            /* une application muette ne bloque pas le reste */
          }
        }
      } catch (e) {
        noter("appstore", nAS, e.message);
      }
    }
  }
  etat.appstore ??= { n: nAS, categories: choisis.map((g) => GENRES_APPSTORE[g]) };

  // Stack Exchange : demandes explicites de logiciels qui n'existent pas ou mal.
  let nSE = 0; // demandes de logiciels, mais aussi argent, parents, voyage, cuisine : la vie quotidienne
  for (const site of ["softwarerecs", "webapps", "money", "parenting", "travel", "cooking"]) {
    try {
      const l = lireStackExchange(await lireJSON(fetchImpl, `https://api.stackexchange.com/2.3/questions?order=desc&sort=creation&site=${site}&pagesize=30&filter=withbody`), site);
      nSE += l.length;
      items.push(...l);
    } catch (e) {
      noter("stackexchange", nSE, e.message);
    }
  }
  etat.stackexchange ??= { n: nSE };

  // Lemmy : anglophone (lemmy.world) et francophone (jlai.lu).
  let nL = 0;
  for (const [instance, q, type] of [
    ["lemmy.world", "wish there was", "Comments"],
    ["lemmy.world", "is there an app", "Comments"],
    ["jlai.lu", "application", "Posts"],
    ["jlai.lu", "existe-t-il", "Posts"],
    ["jlai.lu", "galère", "Comments"],
  ]) {
    try {
      const l = lireLemmy(await lireJSON(fetchImpl, `https://${instance}/api/v3/search?q=${encodeURIComponent(q)}&type_=${type}&sort=New&limit=25`), instance);
      nL += l.length;
      items.push(...l);
    } catch (e) {
      noter("lemmy", nL, e.message);
    }
  }
  etat.lemmy ??= { n: nL };

  // Équilibre : l'App Store ne doit pas noyer les autres sources (1 013 avis sur 1 171 textes le 1er nov.).
  const parSource = {};
  const equilibres = items.filter((x) => {
    const famille = x.source.split(" ")[0];
    parSource[famille] = (parSource[famille] ?? 0) + 1;
    return famille !== "App" || parSource[famille] <= plafondAppStore;
  });
  const vus = new Set();
  const uniques = equilibres.filter((x) => {
    const cle = `${x.url}|${x.texte.slice(0, 80)}`;
    if (vus.has(cle)) return false;
    vus.add(cle);
    return true;
  });
  journal(`radar : ${uniques.length} textes bruts (${JSON.stringify(etat)})`);
  return { items: uniques, etat };
}
