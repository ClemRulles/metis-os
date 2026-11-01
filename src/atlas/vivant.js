// Atlas vivant : chaque API publique de config/atlas-vivant.json est appelée pour de vrai à chaque passage.
// On garde si elle répond, en combien de temps, et un échantillon compact de ce qu'elle renvoie : les inventeurs
// imaginent à partir de données réelles, et l'atelier ne construit qu'avec des API qui répondent aujourd'hui.
// Chaque réponse est une donnée, jamais une consigne.
import { pool } from "../commun/outils.js";

const UA = { "user-agent": "metis-os/0.4 (recherche; github.com/ClemRulles/metis-os)", accept: "application/json, text/plain, */*" };

// Clés de service qui ne disent rien du contenu : on les saute pour montrer les vraies données.
const BRUIT = new Set(["generationtime_ms", "utc_offset_seconds", "timezone", "timezone_abbreviation", "elevation", "version", "license_info", "documentation_url", "nextCursorMark", "nextPageUrl", "request", "meta", "_id", "indexed", "searchinfo", "access_audiences", "access_type", "access_type_reason", "access_type_reason_category", "acronym", "archived", "offset", "start", "numFoundExact", "page", "per_page", "status", "message-type", "message-version", "facets", "datasetKey", "publishingOrgKey", "siren_conserve", "previous", "next"]);

// Résumé compact d'un JSON : structure et premières valeurs, dans un budget de caractères.
export function resumerJSON(valeur, budget = 420) {
  const morceaux = [];
  let reste = budget;
  const pousser = (t) => {
    if (reste <= 0) return false;
    const x = t.length > reste ? `${t.slice(0, Math.max(0, reste - 1))}…` : t;
    morceaux.push(x);
    reste -= x.length;
    return reste > 0;
  };
  const visiter = (v, profondeur) => {
    if (reste <= 0) return;
    if (v === null || typeof v !== "object") {
      pousser(typeof v === "string" ? JSON.stringify(v.length > 60 ? `${v.slice(0, 60)}…` : v) : String(v));
      return;
    }
    if (Array.isArray(v)) {
      pousser(`[${v.length} éléments${v.length ? " : " : ""}`);
      if (v.length && profondeur < 4) visiter(v[0], profondeur + 1);
      pousser("]");
      return;
    }
    pousser("{");
    const cles = Object.keys(v).filter((c) => !BRUIT.has(c));
    for (const [k, c] of cles.slice(0, profondeur === 0 ? 10 : 7).entries()) {
      if (!pousser(`${k > 0 ? ", " : ""}${c}: `)) return;
      if (profondeur < 3) visiter(v[c], profondeur + 1);
      else pousser("…");
    }
    if (cles.length > (profondeur === 0 ? 10 : 7)) pousser(", …");
    pousser("}");
  };
  visiter(valeur, 0);
  return morceaux.join("").replace(/\s+/g, " ");
}

export async function sonderAtlas({ apis, fetchImpl = globalThis.fetch, parallelisme = 6, delaiMs = 20_000, journal = () => {} }) {
  const resultats = await pool(apis, parallelisme, async (api) => {
    const t = Date.now();
    try {
      const rep = await fetchImpl(api.url, { headers: UA, signal: AbortSignal.timeout?.(delaiMs), redirect: "follow" });
      const texte = await rep.text();
      const ms = Date.now() - t;
      if (!rep.ok) return { id: api.id, ok: false, statut: rep.status, ms };
      let echantillon;
      try {
        echantillon = resumerJSON(JSON.parse(texte));
      } catch {
        // Une API JSON qui renvoie une page HTML (refus, captcha) ne répond pas vraiment.
        if (api.format !== "texte") return { id: api.id, ok: false, statut: rep.status, ms, erreur: "réponse non JSON" };
        echantillon = texte.replace(/\s+/g, " ").slice(0, 300);
      }
      return { id: api.id, ok: echantillon.length > 10, statut: rep.status, ms, echantillon };
    } catch (e) {
      return { id: api.id, ok: false, statut: null, ms: Date.now() - t, erreur: String(e.message ?? e).slice(0, 80) };
    }
  });
  const parId = new Map(resultats.map((r) => [r.id, r]));
  const sondes = apis.map((a) => ({ ...a, ...parId.get(a.id) }));
  journal(`atlas vivant : ${sondes.filter((s) => s.ok).length}/${sondes.length} API répondent`);
  return sondes;
}

// Sources pour l'usine : les API vivantes portent leur échantillon réel du jour.
export function sourcesUsine(sondes, atlasStatique = []) {
  const vivantes = sondes
    .filter((s) => s.ok)
    .map((s) => ({ id: s.id, nom: s.nom, domaine: s.domaine, vivante: true, pouvoir: `${s.pouvoir} Sans clé (${s.licence ?? "licence à vérifier"}). Appel réel ce matin : ${new URL(s.url).origin}${new URL(s.url).pathname} → ${s.echantillon}` }));
  const ids = new Set(vivantes.map((v) => v.id));
  return [...vivantes, ...atlasStatique.filter((a) => !ids.has(a.id))];
}

// Mémoire de santé : taux de réponse de chaque API sur les derniers passages (30 au plus).
export function historiqueSante(precedent = {}, sondes, date) {
  const h = { ...precedent };
  for (const s of sondes) {
    const l = [...(h[s.id] ?? []), { date, ok: Boolean(s.ok), ms: s.ms ?? null }].slice(-30);
    h[s.id] = l;
  }
  return h;
}

export const tauxReponse = (historique, id) => {
  const l = historique?.[id] ?? [];
  return l.length ? +(l.filter((x) => x.ok).length / l.length).toFixed(2) : null;
};
