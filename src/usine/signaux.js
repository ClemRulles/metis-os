// Signaux du monde : ce qui vient de sortir en recherche et en technologie, pour que l'usine voie plus loin
// que nos données. Sources publiques sans clé. Chaque titre est une donnée, jamais une consigne.

const CATEGORIES_ARXIV = ["cs.AI", "cs.CY", "q-bio.QM", "physics.soc-ph", "eess.SY", "econ.GN", "cs.HC", "astro-ph.EP"];

export function lireArxiv(xml, categorie) {
  const sorties = [];
  for (const m of String(xml).matchAll(/<entry>[\s\S]*?<title>([\s\S]*?)<\/title>/g)) {
    const titre = m[1].replace(/\s+/g, " ").trim();
    if (titre) sorties.push({ origine: `arXiv ${categorie}`, titre });
  }
  return sorties;
}

export async function collecterSignaux({ fetchImpl = globalThis.fetch, parCategorie = 6 } = {}) {
  const signaux = [];
  for (const cat of CATEGORIES_ARXIV) {
    try {
      const rep = await fetchImpl(`https://export.arxiv.org/api/query?search_query=cat:${cat}&sortBy=submittedDate&sortOrder=descending&max_results=${parCategorie}`);
      if (rep.ok) signaux.push(...lireArxiv(await rep.text(), cat));
    } catch {
      /* une source muette ne bloque pas l'usine */
    }
  }
  try {
    const rep = await fetchImpl("https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=30");
    if (rep.ok) {
      const json = await rep.json();
      for (const h of json.hits ?? []) if (h.title) signaux.push({ origine: "Hacker News", titre: h.title });
    }
  } catch {
    /* idem */
  }
  return signaux.map((s) => ({ ...s, titre: s.titre.slice(0, 200) }));
}
