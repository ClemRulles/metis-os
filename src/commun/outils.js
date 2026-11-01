// Outils communs : hasard reproductible, tirages, file de travail parallèle, lecture robuste du JSON des modèles,
// et un « demandeur » qui appelle les modèles avec repli et tient la santé de chacun.

export function rngDe(graine) {
  let a = graine >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), a | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const choisir = (alea, liste) => liste[Math.floor(alea() * liste.length)];
export function tirer(alea, liste, n) {
  const copie = [...liste];
  const out = [];
  while (copie.length && out.length < n) out.push(copie.splice(Math.floor(alea() * copie.length), 1)[0]);
  return out;
}

export async function pool(taches, parallelisme, fn) {
  const resultats = new Array(taches.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(parallelisme, taches.length) }, async () => {
      while (i < taches.length) {
        const j = i++;
        resultats[j] = await fn(taches[j], j);
      }
    })
  );
  return resultats;
}

// Objets JSON complets trouvés dans un texte, même tronqué (une réponse coupée garde ses premiers objets).
export function objetsComplets(texte) {
  const out = [];
  let profondeur = 0;
  let debut = -1;
  let dansChaine = false;
  let echappe = false;
  for (let i = 0; i < texte.length; i++) {
    const c = texte[i];
    if (dansChaine) {
      if (echappe) echappe = false;
      else if (c === "\\") echappe = true;
      else if (c === '"') dansChaine = false;
      continue;
    }
    if (c === '"') dansChaine = true;
    else if (c === "{") {
      if (profondeur === 0) debut = i;
      profondeur += 1;
    } else if (c === "}" && profondeur > 0) {
      profondeur -= 1;
      if (profondeur === 0 && debut !== -1) {
        try {
          out.push(JSON.parse(texte.slice(debut, i + 1)));
        } catch {
          /* objet abîmé : ignoré */
        }
        debut = -1;
      }
    }
  }
  return out;
}

// Lit le JSON d'une réponse de modèle (blocs ```json, texte autour, virgules finales).
export function extraireJSON(texte) {
  if (typeof texte !== "string") return null;
  const bloc = texte.match(/```(?:json)?\s*([\s\S]*?)```/);
  const source = bloc ? bloc[1] : texte;
  const essais = [];
  const d1 = source.indexOf("{");
  const d2 = source.indexOf("[");
  const ordre = d2 !== -1 && (d1 === -1 || d2 < d1) ? [["[", "]"], ["{", "}"]] : [["{", "}"], ["[", "]"]];
  for (const [ouvre, ferme] of ordre) {
    const debut = source.indexOf(ouvre);
    const fin = source.lastIndexOf(ferme);
    if (debut !== -1 && fin > debut) essais.push(source.slice(debut, fin + 1));
  }
  for (const brut of essais) {
    try {
      return JSON.parse(brut.replace(/,\s*([}\]])/g, "$1"));
    } catch {
      /* essai suivant */
    }
  }
  return null;
}

// Liste d'éléments sous une clé ({"idees": [...]}) ou tableau nu ; sauve les objets complets d'une réponse tronquée.
export function extraireListe(texte, cle, champObligatoire) {
  const json = extraireJSON(texte);
  let liste = Array.isArray(json) ? json : Array.isArray(json?.[cle]) ? json[cle] : null;
  if (!liste && typeof texte === "string") {
    liste = objetsComplets(texte.slice(Math.max(0, texte.indexOf("["))));
  }
  return (liste ?? []).filter((x) => x && typeof x === "object" && (!champObligatoire || (typeof x[champObligatoire] === "string" && x[champObligatoire].trim())));
}

// Appelle un modèle et lit sa réponse ; en cas d'échec, réessaie sur d'autres cerveaux (3 au plus).
export function creerDemandeur({ routeur, alea = Math.random, secours = [] }) {
  const stats = { appels: 0, echecs: 0, parCerveau: {} };
  const noter = (cerveau, ok, erreur, ms) => {
    const s = (stats.parCerveau[cerveau] ??= { ok: 0, echecs: 0, msTotal: 0, exempleErreur: null });
    stats.appels += 1;
    s.msTotal += ms;
    if (ok) s.ok += 1;
    else {
      s.echecs += 1;
      stats.echecs += 1;
      s.exempleErreur ??= String(erreur ?? "").slice(0, 200);
    }
  };
  async function demander(preferes, messages, { lire = extraireJSON, temperature = 0.5, maxTokens = 2000, raisonnement = "none", web = null, autres = secours } = {}) {
    const essais = [...new Set([...preferes, ...tirer(alea, autres, autres.length)])].slice(0, 3);
    for (const cerveau of essais) {
      const t = Date.now();
      try {
        const r = await routeur.appeler({ cerveau, messages, temperature, maxTokens, json: true, raisonnement, web });
        const valeur = lire(r.texte);
        const ok = valeur != null && !(Array.isArray(valeur) && valeur.length === 0);
        noter(cerveau, ok, ok ? null : `réponse illisible (fin : ${r.finDeReponse ?? "?"}) : ${String(r.texte).slice(0, 120)}`, Date.now() - t);
        if (ok) return { valeur, cerveau, citations: r.citations ?? [] };
      } catch (err) {
        noter(cerveau, false, err?.message, Date.now() - t);
        if (/plafond de coût|interrupteur/.test(err?.message ?? "")) break;
      }
    }
    return { valeur: null, cerveau: null, citations: [] };
  }
  const sante = () =>
    Object.fromEntries(Object.entries(stats.parCerveau).map(([c, s]) => [c, { ok: s.ok, echecs: s.echecs, tauxEchec: +(s.echecs / Math.max(1, s.ok + s.echecs)).toFixed(2), msMoyen: Math.round(s.msTotal / Math.max(1, s.ok + s.echecs)), exempleErreur: s.exempleErreur }]));
  return { demander, stats, sante };
}
