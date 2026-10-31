// Banc du passé : cas publics déjà résolus, collectés par des API officielles et gratuites.
// Chaque cas : { id, source, date, enonce, contexte, resultat (0 ou 1), mesure }.
// Le résultat n'est jamais montré aux prédicteurs.

const JOUR = 86_400_000;

function nettoyer(html = "") {
  return String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/\s+/g, " ")
    .trim();
}

function domaine(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

// Show HN : un lancement « prend » s'il atteint le seuil de points (10 par défaut : environ 7 % des cas).
// Seuls les posts de plus de 7 jours sont retenus, pour que le score soit stable.
// L'API ne renvoie que 1 000 résultats par requête : on découpe la période en fenêtres de 3 jours.
export async function collecterShowHN({
  debut,
  fin,
  seuilPoints = 10,
  fetchImpl = globalThis.fetch,
  maintenant = Date.now(),
  fenetreJours = 3,
}) {
  const depart = new Date(debut).getTime();
  const limite = Math.min(new Date(fin).getTime(), maintenant - 7 * JOUR);
  const cas = [];
  const vus = new Set();
  for (let a = depart; a < limite; a += fenetreJours * JOUR) {
    const t0 = Math.floor(a / 1000);
    const t1 = Math.floor(Math.min(a + fenetreJours * JOUR, limite) / 1000);
    const url =
      "https://hn.algolia.com/api/v1/search_by_date?tags=show_hn&hitsPerPage=1000" +
      `&numericFilters=created_at_i>=${t0},created_at_i<${t1}`;
    const rep = await fetchImpl(url);
    if (!rep.ok) throw new Error(`Algolia HN : HTTP ${rep.status}`);
    const json = await rep.json();
    for (const h of json.hits ?? []) {
      if (vus.has(h.objectID)) continue;
      vus.add(h.objectID);
      const titre = nettoyer(h.title);
      if (!titre) continue;
      cas.push({
        id: `hn-${h.objectID}`,
        source: "show_hn",
        date: h.created_at,
        enonce: titre,
        contexte: [domaine(h.url) ? `Site : ${domaine(h.url)}` : null, nettoyer(h.story_text).slice(0, 600) || null]
          .filter(Boolean)
          .join("\n"),
        resultat: (h.points ?? 0) >= seuilPoints ? 1 : 0,
        mesure: h.points ?? 0,
      });
    }
  }
  return cas;
}

// Manifold : marchés binaires résolus OUI ou NON après une date donnée.
// La probabilité du marché n'est jamais transmise : seulement la question.
export async function collecterManifold({
  resoluApres,
  fetchImpl = globalThis.fetch,
  pagesMax = 10,
  parPage = 1000,
}) {
  const borne = new Date(resoluApres).getTime();
  const cas = [];
  let avant = null;
  for (let page = 0; page < pagesMax; page++) {
    const url = `https://api.manifold.markets/v0/markets?limit=${parPage}` + (avant ? `&before=${avant}` : "");
    const rep = await fetchImpl(url);
    if (!rep.ok) throw new Error(`Manifold : HTTP ${rep.status}`);
    const lot = await rep.json();
    if (!Array.isArray(lot) || lot.length === 0) break;
    for (const m of lot) {
      if (m.outcomeType !== "BINARY" || !m.isResolved) continue;
      if (m.resolution !== "YES" && m.resolution !== "NO") continue;
      if (!m.resolutionTime || m.resolutionTime < borne) continue;
      cas.push({
        id: `mf-${m.id}`,
        source: "manifold",
        date: new Date(m.createdTime).toISOString(),
        enonce: nettoyer(m.question),
        contexte: m.closeTime ? `Date de clôture prévue : ${new Date(m.closeTime).toISOString().slice(0, 10)}` : "",
        resultat: m.resolution === "YES" ? 1 : 0,
        mesure: null,
      });
    }
    avant = lot[lot.length - 1].id;
  }
  return cas;
}

export function tauxDeBase(cas) {
  if (!cas.length) return null;
  return cas.reduce((s, c) => s + c.resultat, 0) / cas.length;
}
