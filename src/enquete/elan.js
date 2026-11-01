// Élan : un besoin ou une technologie qui accélère vaut plus qu'un besoin installé. Pour chaque finaliste, on
// compare l'activité des 90 derniers jours aux 90 jours d'avant, sur deux sources publiques et gratuites :
// Hacker News (ce dont les gens qui construisent parlent) et GitHub (ce qu'ils construisent).
// Rapport > 1 = ça monte. Note sur 10, 5 = stable ou pas assez de signal. Chaque nombre est une donnée publique.

const UA = { "user-agent": "metis-os/0.3 (recherche; github.com/ClemRulles/metis-os)" };
const JOUR = 86400_000;

async function lireJSON(fetchImpl, url, entetes = {}) {
  const rep = await fetchImpl(url, { headers: { ...UA, ...entetes }, signal: AbortSignal.timeout?.(30000) });
  if (!rep.ok) throw new Error(`HTTP ${rep.status}`);
  return rep.json();
}

// Chaque série (une source, une expression) vote à égalité : la plus bavarde n'écrase pas les autres.
export function noteElan(series, plancher = 12) {
  const utiles = series.filter((s) => s.recent + s.avant >= plancher);
  if (!utiles.length) return { note: 5, rapport: null, faible: true };
  const log = utiles.reduce((t, s) => t + Math.log2((s.recent + 3) / (s.avant + 3)), 0) / utiles.length;
  return { note: +Math.max(0, Math.min(10, 5 + 2.5 * log)).toFixed(2), rapport: +(2 ** log).toFixed(2), faible: false };
}

export async function mesurerElan({ mots = [], fetchImpl = globalThis.fetch, maintenant = Date.now(), jetonGitHub = null, attendre = (ms) => new Promise((r) => setTimeout(r, ms)), pauseGitHubMs = jetonGitHub ? 2200 : 6500 } = {}) {
  const fin = Math.floor(maintenant / 1000);
  const milieu = Math.floor((maintenant - 90 * JOUR) / 1000);
  const debut = Math.floor((maintenant - 180 * JOUR) / 1000);
  const iso = (s) => new Date(s * 1000).toISOString().slice(0, 10);
  const mesures = [];
  for (const [k, mot] of mots.slice(0, 2).entries()) {
    const m = { mot };
    try {
      const hn = async (a, b) => (await lireJSON(fetchImpl, `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(`"${mot}"`)}&tags=(story,comment)&numericFilters=created_at_i>${a},created_at_i<=${b}&hitsPerPage=0`)).nbHits ?? 0;
      m.hn = { recent: await hn(milieu, fin), avant: await hn(debut, milieu) };
    } catch (e) {
      m.hn = { erreur: e.message };
    }
    if (k === 0) {
      // GitHub est limité (30 recherches par minute avec jeton) : une seule expression par idée.
      try {
        const entetes = jetonGitHub ? { authorization: `Bearer ${jetonGitHub}` } : {};
        const gh = async (a, b) => {
          await attendre(pauseGitHubMs);
          return (await lireJSON(fetchImpl, `https://api.github.com/search/repositories?q=${encodeURIComponent(`${mot} in:name,description,topics created:${iso(a)}..${iso(b)}`)}&per_page=1`, entetes)).total_count ?? 0;
        };
        m.github = { recent: await gh(milieu, fin), avant: await gh(debut, milieu) };
      } catch (e) {
        m.github = { erreur: e.message };
      }
    }
    mesures.push(m);
  }
  const series = mesures.flatMap((m) => [m.hn, m.github].filter((s) => s && !s.erreur));
  const { note, rapport, faible } = noteElan(series);
  return { note, rapport, faible, mesures };
}

export async function mesurerElanDes(idees, options = {}) {
  for (const idee of idees) {
    const mots = idee.enquete?.mots_cles_en ?? [];
    if (!mots.length) continue;
    idee.elan = await mesurerElan({ ...options, mots });
  }
}
