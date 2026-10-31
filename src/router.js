// Routeur multi-modèles : fournisseurs compatibles OpenAI, budget de tokens par fournisseur et par jour,
// coupe-circuit après échecs répétés, repli automatique, interrupteur d'arrêt global.
// Aucune clé dans le code : elles viennent de l'environnement (variables ou secrets Cloudflare).

export const FOURNISSEURS_PAR_DEFAUT = [
  {
    id: "openrouter",
    url: "https://openrouter.ai/api/v1/chat/completions",
    cle: "OPENROUTER_API_KEY",
    tokensParJour: 4_000_000,
    requetesParMinute: 20,
    modeles: {
      deepseek: "deepseek/deepseek-chat-v3-0324:free",
      qwen: "qwen/qwen3-235b-a22b:free",
      glm: "z-ai/glm-4.5-air:free",
      llama: "meta-llama/llama-3.3-70b-instruct:free",
      gemma: "google/gemma-3-27b-it:free",
      mistral: "mistralai/mistral-small-3.2-24b-instruct:free",
      kimi: "moonshotai/kimi-k2:free",
      minimax: "minimax/minimax-m1:free",
    },
  },
  {
    id: "groq",
    url: "https://api.groq.com/openai/v1/chat/completions",
    cle: "GROQ_API_KEY",
    tokensParJour: 200_000,
    requetesParMinute: 30,
    modeles: {
      llama: "llama-3.3-70b-versatile",
      qwen: "qwen/qwen3-32b",
      kimi: "moonshotai/kimi-k2-instruct",
    },
  },
];
// Les identifiants de modèles changent souvent : l'éclaireur de capacité les tient à jour ici (ou dans la base).

export class ErreurRouteur extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = "ErreurRouteur";
    this.details = details;
  }
}

export function creerRouteur({
  fournisseurs = FOURNISSEURS_PAR_DEFAUT,
  env = typeof process !== "undefined" ? process.env : {},
  fetchImpl = globalThis.fetch,
  maintenant = () => Date.now(),
  seuilCoupeCircuit = 3,
  pauseCoupeCircuitMs = 10 * 60 * 1000,
  arretGlobal = () => false,
} = {}) {
  const etat = new Map(); // id -> { jour, tokens, echecs, coupeJusqua, fenetre: [] }
  const jourDe = (t) => new Date(t).toISOString().slice(0, 10);

  function etatDe(id) {
    const t = maintenant();
    let e = etat.get(id);
    if (!e || e.jour !== jourDe(t)) {
      e = { jour: jourDe(t), tokens: 0, echecs: e?.echecs ?? 0, coupeJusqua: e?.coupeJusqua ?? 0, fenetre: [] };
      etat.set(id, e);
    }
    e.fenetre = e.fenetre.filter((x) => t - x < 60_000);
    return e;
  }

  function disponible(f, cerveau, tokensEstimes) {
    if (!env[f.cle]) return "clé absente";
    if (!f.modeles[cerveau]) return "modèle absent";
    const e = etatDe(f.id);
    if (e.coupeJusqua > maintenant()) return "coupe-circuit";
    if (e.tokens + tokensEstimes > f.tokensParJour) return "budget épuisé";
    if (e.fenetre.length >= f.requetesParMinute) return "limite par minute";
    return null;
  }

  async function appeler({ cerveau, messages, temperature = 0.5, maxTokens = 800, tokensEstimes }) {
    if (arretGlobal()) throw new ErreurRouteur("interrupteur d'arrêt activé");
    const estimation = tokensEstimes ?? Math.ceil(JSON.stringify(messages).length / 3.5) + maxTokens;
    const refus = [];
    for (const f of fournisseurs) {
      const raison = disponible(f, cerveau, estimation);
      if (raison) {
        refus.push(`${f.id} : ${raison}`);
        continue;
      }
      const e = etatDe(f.id);
      e.fenetre.push(maintenant());
      try {
        const rep = await fetchImpl(f.url, {
          method: "POST",
          headers: { "content-type": "application/json", authorization: `Bearer ${env[f.cle]}` },
          body: JSON.stringify({ model: f.modeles[cerveau], messages, temperature, max_tokens: maxTokens }),
        });
        if (!rep.ok) throw new Error(`HTTP ${rep.status}`);
        const json = await rep.json();
        const texte = json?.choices?.[0]?.message?.content;
        if (typeof texte !== "string") throw new Error("réponse sans texte");
        const consommes = json?.usage?.total_tokens ?? estimation;
        e.tokens += consommes;
        e.echecs = 0;
        return { texte, fournisseur: f.id, modele: f.modeles[cerveau], tokens: consommes };
      } catch (err) {
        e.echecs += 1;
        if (e.echecs >= seuilCoupeCircuit) {
          e.coupeJusqua = maintenant() + pauseCoupeCircuitMs;
          e.echecs = 0;
        }
        refus.push(`${f.id} : ${err.message}`);
      }
    }
    throw new ErreurRouteur(`aucun fournisseur pour ${cerveau}`, { refus });
  }

  function rapport() {
    return fournisseurs.map((f) => {
      const e = etatDe(f.id);
      return {
        fournisseur: f.id,
        tokensUtilises: e.tokens,
        tokensRestants: Math.max(0, f.tokensParJour - e.tokens),
        coupe: e.coupeJusqua > maintenant(),
        cle: Boolean(env[f.cle]),
      };
    });
  }

  return { appeler, rapport };
}
