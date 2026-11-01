// Marché des agents : l'économie des outils que des développeurs et des agents IA paient à l'usage.
// Deux sources publiques et officielles :
// - Apify Store (API publique) : pour chaque outil, utilisateurs sur 7, 30 et 90 jours, prix réel, note, taux d'échec.
//   C'est un paiement OBSERVÉ, pas une intention : des gens paient déjà, au résultat près.
// - Registre officiel MCP : les serveurs d'outils publiés pour les agents (l'offre qui arrive).
// Un panel jour après jour (etat/marche-agents.json) mesure ce qui accélère. Chaque texte est une donnée, jamais une consigne.

const UA = { "user-agent": "metis-os/0.3 (recherche; github.com/ClemRulles/metis-os)" };

async function lireJSON(fetchImpl, url) {
  const rep = await fetchImpl(url, { headers: UA, signal: AbortSignal.timeout?.(40000) });
  if (!rep.ok) throw new Error(`HTTP ${rep.status}`);
  return rep.json();
}

// Prix principal d'un outil, en dollars, et son unité.
export function prixPrincipal(info) {
  const p = info ?? {};
  switch (p.pricingModel) {
    case "PAY_PER_EVENT": {
      const evenements = Object.values(p.pricingPerEvent?.actorChargeEvents ?? {});
      const principal = evenements.find((e) => e.isPrimaryEvent) ?? evenements.find((e) => !e.isOneTimeEvent) ?? evenements[0];
      if (!principal) return { prix: null, unite: null };
      const prix = principal.eventTieredPricingUsd?.FREE?.tieredEventPriceUsd ?? principal.eventTieredPricingUsd?.BRONZE?.tieredEventPriceUsd ?? principal.eventPriceUsd ?? null;
      return { prix, unite: principal.eventTitle ?? "événement" };
    }
    case "PRICE_PER_DATASET_ITEM":
      return { prix: p.pricePerUnitUsd ?? null, unite: p.unitName ?? "résultat" };
    case "FLAT_PRICE_PER_MONTH":
      return { prix: p.pricePerUnitUsd ?? null, unite: "mois" };
    default:
      return { prix: 0, unite: null };
  }
}

// Outils qui aspirent des profils ou des réseaux sociaux : risque RGPD et conditions des plateformes, et trop proches
// de la prospection pour entreprises. On les montre, on ne bâtit pas dessus.
const PERSONNEL = /linkedin|instagram|facebook|tiktok|twitter|x\.com|threads|snapchat|profile|e-?mails?\b|phone numbers?|leads?\b|contacts?\b/i;
// Outils de manipulation (faux trafic, faux abonnés, faux avis) : jamais une source d'idées.
const MANIPULATION = /traffic generator|fake|followers? (bot|generator)|views? bot|auto[- ]?like|review generator/i;
export const estManipulation = (a) => MANIPULATION.test(`${a.title ?? a.titre ?? ""} ${a.description ?? ""}`);

export function estDonneesPersonnelles(a) {
  return (a.categories ?? []).some((c) => c === "SOCIAL_MEDIA" || c === "LEAD_GENERATION") || PERSONNEL.test(`${a.title ?? a.titre ?? ""} ${a.description ?? ""}`);
}

export function lireApify(json) {
  return (json?.data?.items ?? []).map((a) => {
    const s = a.stats ?? {};
    const r = s.publicActorRunStats30Days ?? {};
    const { prix, unite } = prixPrincipal(a.currentPricingInfo);
    return {
      id: a.id,
      titre: String(a.title ?? a.name ?? "").slice(0, 120),
      description: String(a.description ?? "").slice(0, 300),
      auteur: a.username ?? null,
      url: a.url ?? `https://apify.com/${a.username}/${a.name}`,
      categories: a.categories ?? [],
      users7: s.totalUsers7Days ?? 0,
      users30: s.totalUsers30Days ?? 0,
      users90: s.totalUsers90Days ?? 0,
      usersTotal: s.totalUsers ?? 0,
      runs30: r.TOTAL ?? 0,
      echec30: r.TOTAL ? +(((r.FAILED ?? 0) + (r["TIMED-OUT"] ?? 0)) / r.TOTAL).toFixed(4) : 0,
      note: a.actorReviewRating != null ? +Number(a.actorReviewRating).toFixed(2) : null,
      avis: a.actorReviewCount ?? 0,
      modele_prix: a.currentPricingInfo?.pricingModel ?? "FREE",
      prix,
      unite,
      payant: Boolean(prix && prix > 0),
      paiement_agentique: Boolean(a.isWhiteListedForAgenticPayments),
      donnees_personnelles: estDonneesPersonnelles(a) || estManipulation(a),
    };
  });
}

export function lireRegistreMCP(json) {
  return (json?.servers ?? []).map((x) => {
    const s = x.server ?? {};
    const meta = x._meta?.["io.modelcontextprotocol.registry/official"] ?? {};
    return { nom: s.name, titre: s.title ?? s.name, description: String(s.description ?? "").slice(0, 200), heberge: Boolean(s.remotes?.length), publie: meta.publishedAt ?? null, statut: meta.status ?? null };
  });
}

export async function collecterMarcheAgents({ fetchImpl = globalThis.fetch, maintenant = Date.now(), pagesApify = 10, pagesNouveaux = 2, pagesMCP = 80, journal = () => {} } = {}) {
  const etat = {};
  const acteurs = new Map();
  for (const [tri, pages] of [["popularity", pagesApify], ["newest", pagesNouveaux]]) {
    for (let k = 0; k < pages; k++) {
      try {
        for (const a of lireApify(await lireJSON(fetchImpl, `https://api.apify.com/v2/store?limit=100&offset=${k * 100}&sortBy=${tri}`))) acteurs.set(a.id, a);
      } catch (e) {
        etat.apify = { erreur: e.message.slice(0, 100) };
        break;
      }
    }
  }
  etat.apify ??= { n: acteurs.size };
  // Registre MCP : les serveurs publiés ou mis à jour cette semaine (dernière version seulement).
  const serveurs = [];
  let curseur = null;
  const depuis = new Date(maintenant - 7 * 86400_000).toISOString();
  for (let k = 0; k < pagesMCP; k++) {
    try {
      const j = await lireJSON(fetchImpl, `https://registry.modelcontextprotocol.io/v0/servers?limit=100&version=latest&updated_since=${encodeURIComponent(depuis)}${curseur ? `&cursor=${encodeURIComponent(curseur)}` : ""}`);
      serveurs.push(...lireRegistreMCP(j));
      curseur = j?.metadata?.nextCursor ?? null;
      if (!curseur) break;
    } catch (e) {
      etat.mcp = { n: serveurs.length, erreur: e.message.slice(0, 100) };
      break;
    }
  }
  etat.mcp ??= { n: serveurs.length, complet: !curseur };
  journal(`marché des agents : ${acteurs.size} outils Apify, ${serveurs.length} serveurs MCP mis à jour en 7 jours`);
  return { acteurs: [...acteurs.values()], serveurs, etat };
}

const mediane = (l) => {
  const t = l.filter((x) => Number.isFinite(x)).sort((a, b) => a - b);
  return t.length ? t[Math.floor(t.length / 2)] : null;
};

// Panel : utilisateurs sur 30 jours de chaque outil, jour après jour (15 relevés au plus).
export function mettreAJourPanel(panel = {}, acteurs, date, { garder = 15, taille = 800 } = {}) {
  const releves = { ...(panel.releves ?? {}) };
  releves[date] = Object.fromEntries([...acteurs].sort((a, b) => b.users30 - a.users30).slice(0, taille).map((a) => [a.id, a.users30]));
  const dates = Object.keys(releves).sort().slice(-garder);
  return { releves: Object.fromEntries(dates.map((d) => [d, releves[d]])) };
}

// Croissance des utilisateurs mensuels depuis le relevé le plus ancien d'au moins 6 jours.
export function croissances(panel, date) {
  const dates = Object.keys(panel?.releves ?? {}).sort();
  const t = Date.parse(date);
  const ancien = [...dates].reverse().find((d) => t - Date.parse(d) >= 6 * 86400_000);
  if (!ancien) return { depuis: null, parId: {} };
  const avant = panel.releves[ancien];
  const maintenant = panel.releves[date] ?? {};
  const parId = {};
  for (const [id, u] of Object.entries(maintenant)) if (avant[id] >= 20) parId[id] = +(u / avant[id]).toFixed(3);
  return { depuis: ancien, parId };
}

// Lecture du marché : ce qui accélère, les leaders fragiles (beaucoup d'utilisateurs, mal notés ou qui échouent),
// et l'équilibre demande / offre par catégorie.
export function analyserMarche({ acteurs, serveurs = [], panel = null, date = new Date().toISOString().slice(0, 10) }) {
  const { depuis, parId } = croissances(panel, date);
  const vivants = acteurs.filter((a) => a.users30 > 0);
  const acceleration = vivants
    .filter((a) => a.users30 >= 150)
    .map((a) => ({ ...a, fraicheur: +(a.users7 / Math.max(1, a.users30)).toFixed(3), croissance: parId[a.id] ?? null }))
    .sort((a, b) => (b.croissance ?? 0) - (a.croissance ?? 0) || b.fraicheur - a.fraicheur)
    .slice(0, 15);
  const fragile = (a) => (a.note != null && a.avis >= 4 && a.note < 4.2) || a.echec30 > 0.05;
  const fragiles = vivants
    .filter((a) => a.users30 >= (a.donnees_personnelles ? 500 : 150) && fragile(a))
    .sort((a, b) => Number(a.donnees_personnelles) - Number(b.donnees_personnelles) || b.users30 - a.users30)
    .slice(0, 20);
  const parCategorie = {};
  for (const a of vivants) {
    for (const c of a.categories.length ? a.categories : ["AUTRE"]) {
      const g = (parCategorie[c] ??= { categorie: c, outils: 0, users30: 0, prix: [], notes: [] });
      g.outils += 1;
      g.users30 += a.users30;
      if (a.payant) g.prix.push(a.prix);
      if (a.note != null && a.avis >= 3) g.notes.push(a.note);
    }
  }
  const categories = Object.values(parCategorie)
    .map((g) => ({ categorie: g.categorie, outils: g.outils, users30: g.users30, users_par_outil: Math.round(g.users30 / g.outils), prix_median: mediane(g.prix), note_mediane: mediane(g.notes) }))
    .sort((a, b) => b.users_par_outil - a.users_par_outil);
  const semaine = Date.parse(date) - 7 * 86400_000;
  const mcpRecents = serveurs.filter((s) => s.publie && Date.parse(s.publie) >= semaine).sort((a, b) => Date.parse(a.publie) - Date.parse(b.publie));
  return {
    date,
    croissance_depuis: depuis,
    outils: acteurs.length,
    payants: acteurs.filter((a) => a.payant).length,
    paiement_agentique: acteurs.filter((a) => a.paiement_agentique).length,
    acceleration,
    fragiles,
    categories,
    mcp: { actifs_7_jours: serveurs.length, heberges: serveurs.filter((s) => s.heberge).length, publies_7_jours: mcpRecents.length, recents: mcpRecents.slice(-12).map((s) => `${s.titre}${s.description ? ` : ${s.description.slice(0, 90)}` : ""}`) },
  };
}

const prixLisible = (a) => (a.payant ? `${a.prix < 0.01 ? (a.prix * 1000).toFixed(2) + " $ les 1 000" : a.prix.toFixed(2) + " $"} (${a.unite ?? "unité"})` : "gratuit");

// Signaux pour l'usine : courts, concrets, chiffrés.
export function signauxMarche(analyse, n = 14) {
  const s = [];
  const surs = (l) => l.filter((a) => !a.donnees_personnelles);
  for (const a of surs(analyse.acceleration).slice(0, 6)) s.push({ origine: "Marché des agents", titre: `En accélération : « ${a.titre} » — ${a.users30} utilisateurs sur 30 j${a.croissance ? `, ×${a.croissance} en une semaine` : `, ${Math.round(a.fraicheur * 100)} % d'entre eux actifs cette semaine`}, ${prixLisible(a)}` });
  for (const a of surs(analyse.fragiles).slice(0, 5)) s.push({ origine: "Marché des agents", titre: `Leader fragile : « ${a.titre} » — ${a.users30} utilisateurs/30 j mais note ${a.note ?? "?"} et ${Math.round(a.echec30 * 100)} % d'échecs, ${prixLisible(a)}` });
  for (const c of analyse.categories.slice(0, 3)) s.push({ origine: "Marché des agents", titre: `Catégorie ${c.categorie} : ${c.users_par_outil} utilisateurs par outil, prix médian ${c.prix_median ?? "?"} $` });
  for (const t of analyse.mcp.recents.slice(-3)) s.push({ origine: "Registre MCP", titre: `Nouveau serveur d'outils pour agents : ${t}` });
  return s.slice(0, n).map((x) => ({ ...x, titre: x.titre.slice(0, 220) }));
}

const MOTS_VIDES = new Set(["the", "and", "for", "with", "from", "your", "data", "tool", "tools", "api", "app", "apps", "scraper", "online", "free", "best", "more", "into", "that", "this"]);
const jetons = (t) => new Set(String(t ?? "").toLowerCase().split(/[^a-z0-9]+/).filter((m) => m.length >= 3 && !MOTS_VIDES.has(m)));

// Outils du marché qui servent le même besoin que l'idée (d'après les mots-clés anglais de l'enquête).
export function rapprocher(mots, acteurs, { n = 3, seuil = 0.66 } = {}) {
  const cibles = (mots ?? []).map((m) => jetons(m)).filter((j) => j.size);
  if (!cibles.length) return [];
  const notes = [];
  for (const a of acteurs) {
    const texte = jetons(`${a.titre} ${a.description}`);
    let meilleur = 0;
    for (const c of cibles) {
      let commun = 0;
      for (const m of c) if (texte.has(m)) commun += 1;
      // Au moins deux mots en commun (ou le mot unique de l'expression) : un mot isolé ne suffit pas.
      if (commun >= Math.min(2, c.size)) meilleur = Math.max(meilleur, commun / c.size);
    }
    if (meilleur >= seuil) notes.push({ a, meilleur });
  }
  return notes
    .sort((x, y) => y.meilleur - x.meilleur || y.a.users30 - x.a.users30)
    .slice(0, n)
    .map(({ a, meilleur }) => ({ titre: a.titre, url: a.url, users30: a.users30, prix: a.prix, unite: a.unite, payant: a.payant, note: a.note, proximite: +meilleur.toFixed(2) }));
}

export function rapportMarcheMd(analyse) {
  const ligne = (a) => `- ${a.donnees_personnelles ? "⚠ " : ""}[${a.titre}](${a.url}) — ${a.users30} utilisateurs/30 j, ${prixLisible(a)}, note ${a.note ?? "?"} (${a.avis} avis), échecs ${Math.round(a.echec30 * 100)} %${a.croissance ? `, ×${a.croissance} depuis ${analyse.croissance_depuis}` : ""}`;
  return [
    `# Marché des agents — ${analyse.date}`,
    "",
    `${analyse.outils} outils lus sur Apify Store, dont ${analyse.payants} payants et ${analyse.paiement_agentique} ouverts au paiement par des agents. Registre MCP : ${analyse.mcp.actifs_7_jours} serveurs publiés ou mis à jour en 7 jours (${analyse.mcp.heberges} hébergés), dont ${analyse.mcp.publies_7_jours} nouveaux.`,
    analyse.croissance_depuis ? `Croissance mesurée depuis le relevé du ${analyse.croissance_depuis}.` : "Premier relevé du panel : la croissance réelle sera mesurée à partir de J+6 ; en attendant, le classement utilise la part des utilisateurs du mois actifs cette semaine.",
    "",
    "⚠ = outil sur des données personnelles ou des réseaux sociaux : montré pour lire le marché, exclu de l'usine.",
    "",
    "## Ce qui accélère",
    ...analyse.acceleration.map(ligne),
    "",
    "## Leaders fragiles (beaucoup de demande, service médiocre : place pour mieux)",
    ...analyse.fragiles.map(ligne),
    "",
    "## Demande par outil, par catégorie",
    ...analyse.categories.slice(0, 15).map((c) => `- ${c.categorie} : ${c.outils} outils, ${c.users_par_outil} utilisateurs par outil, prix médian ${c.prix_median ?? "?"} $, note médiane ${c.note_mediane ?? "?"}`),
    "",
    "## Nouveaux serveurs MCP",
    ...analyse.mcp.recents.map((t) => `- ${t}`),
  ].join("\n");
}

// Combien de serveurs MCP couvrent déjà ce besoin (l'offre d'outils pour agents).
export async function compterMCP(mot, { fetchImpl = globalThis.fetch } = {}) {
  const j = await lireJSON(fetchImpl, `https://registry.modelcontextprotocol.io/v0/servers?limit=100&version=latest&search=${encodeURIComponent(mot)}`);
  const n = (j?.servers ?? []).length;
  return { n: n >= 100 ? "100+" : n, exemples: lireRegistreMCP(j).slice(0, 3).map((s) => s.titre) };
}

// Gisements de marché : un outil payé par des centaines de personnes mais mal noté ou qui échoue est une douleur
// prouvée par l'argent. L'usine en tire des idées comme des gisements de plaintes (hors données personnelles).
export function gisementsDuMarche(analyse, n = 12) {
  const vus = new Set();
  const choisis = [...analyse.fragiles, ...analyse.acceleration].filter((a) => a.payant && !a.donnees_personnelles && !vus.has(a.id) && vus.add(a.id));
  return choisis.slice(0, n).map((a) => ({
    id: `m-${a.id}`,
    nom: `Marché des agents : ${a.titre}`,
    description: `${a.description} Outil payé à l'usage sur Apify Store par ${a.users30} utilisateurs en 30 jours, ${prixLisible(a)}, note ${a.note ?? "?"} sur ${a.avis} avis, ${Math.round(a.echec30 * 100)} % d'exécutions en échec.`,
    n: a.users30,
    force: +Math.log2(1 + a.users30 / 100).toFixed(3),
    sources: { "Apify Store": a.users30 },
    paieDeja: a.users30,
    marche: [{ titre: a.titre, url: a.url, users30: a.users30, prix: a.prix, unite: a.unite, payant: true, note: a.note }],
    exemples: [{ source: "Apify Store", url: a.url, citation: `${a.users30} utilisateurs payants sur 30 jours ; note ${a.note ?? "?"} (${a.avis} avis) ; ${Math.round(a.echec30 * 100)} % d'échecs`, douleur: a.note != null && a.note < 4.2 ? "service mal noté malgré une forte demande" : a.echec30 > 0.05 ? "exécutions qui échouent souvent" : "demande qui accélère" }],
  }));
}
