// Routeur multi-modèles : fournisseurs compatibles OpenAI, budget de tokens par fournisseur et par jour,
// coupe-circuit après échecs répétés, repli automatique, interrupteur d'arrêt global.
// Aucune clé dans le code : elles viennent de l'environnement (variables ou secrets Cloudflare).

export const FOURNISSEURS_PAR_DEFAUT = [
  {
    id: "openrouter",
    url: "https://openrouter.ai/api/v1/chat/completions",
    cle: "OPENROUTER_API_KEY",
    tokensParJour: 3_000_000, // plafond de sécurité : environ 0,50 $ par jour au pire
    requetesParMinute: 200, // modèles payants
    requetesParMinuteGratuits: 18, // limite d'OpenRouter pour les modèles « :free », partagée par tout le compte
    modeles: {
      // Gratuits (limités à environ 1 000 requêtes par jour au total).
      gemma: "google/gemma-4-31b-it:free",
      nemotron: "nvidia/nemotron-3.5-lightning:free",
      inkling: "thinkingmachines/inkling-small:free",
      // Quasi gratuits : environ 0,00002 $ par prédiction (prix relevés le 1er novembre 2026).
      deepseek: "deepseek/deepseek-v4-flash",
      qwen: "qwen/qwen3.7-flash",
      glm: "z-ai/glm-5.3-flash",
      mistral: "mistralai/mistral-small-24b-instruct-2501",
      llama: "meta-llama/llama-3.1-8b-instruct",
      minimax: "minimax/minimax-m3.1-flash",
      mimo: "xiaomi/mimo-v2.6-flash",
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
  tentativesMax = 4,
  attente429Ms = 8_000,
  dormir = (ms) => new Promise((r) => setTimeout(r, ms)),
} = {}) {
  const etat = new Map(); // fournisseur -> { jour, tokens, fenetre: [] }
  const circuits = new Map(); // "fournisseur|cerveau" -> { echecs, coupeJusqua } : un modèle en panne ne coupe pas les autres
  const circuitDe = (id, cerveau) => {
    const cle = `${id}|${cerveau}`;
    if (!circuits.has(cle)) circuits.set(cle, { echecs: 0, coupeJusqua: 0 });
    return circuits.get(cle);
  };
  const jourDe = (t) => new Date(t).toISOString().slice(0, 10);

  function etatDe(id) {
    const t = maintenant();
    let e = etat.get(id);
    if (!e || e.jour !== jourDe(t)) {
      e = { jour: jourDe(t), tokens: 0, fenetre: [], fenetreGratuits: [] };
      etat.set(id, e);
    }
    e.fenetre = e.fenetre.filter((x) => t - x < 60_000);
    e.fenetreGratuits = (e.fenetreGratuits ?? []).filter((x) => t - x < 60_000);
    return e;
  }

  function disponible(f, cerveau, tokensEstimes) {
    if (!env[f.cle]) return "clé absente";
    if (!f.modeles[cerveau]) return "modèle absent";
    const e = etatDe(f.id);
    if (circuitDe(f.id, cerveau).coupeJusqua > maintenant()) return "coupe-circuit";
    if (e.tokens + tokensEstimes > f.tokensParJour) return "budget épuisé";
    if (e.fenetre.length >= f.requetesParMinute) return "limite par minute";
    if (estGratuit(f, cerveau) && e.fenetreGratuits.length >= (f.requetesParMinuteGratuits ?? f.requetesParMinute)) return "limite par minute";
    return null;
  }

  // Attente avant de pouvoir réessayer un fournisseur limité par minute.
  const estGratuit = (f, cerveau) => String(f.modeles[cerveau] ?? "").endsWith(":free");

  function attentePourFenetre(f, cerveau) {
    const e = etatDe(f.id);
    const pleine = (liste, max) => (liste.length >= max ? Math.max(0, 60_000 - (maintenant() - liste[0])) + 250 : 0);
    return Math.max(
      pleine(e.fenetre, f.requetesParMinute),
      estGratuit(f, cerveau) ? pleine(e.fenetreGratuits, f.requetesParMinuteGratuits ?? f.requetesParMinute) : 0
    );
  }

  // Une limite de débit (par minute ou HTTP 429) n'est pas une panne : on attend et on réessaie.
  async function appeler(options) {
    let derniere;
    for (let tentative = 0; tentative <= tentativesMax; tentative++) {
      try {
        return await essayer(options);
      } catch (err) {
        derniere = err;
        if (!(err instanceof ErreurRouteur) || !err.details.attenteMs || tentative === tentativesMax) throw err;
        await dormir(Math.min(err.details.attenteMs * (tentative + 1), 65_000));
      }
    }
    throw derniere;
  }

  async function essayer({ cerveau, messages, temperature = 0.5, maxTokens = 800, tokensEstimes }) {
    if (arretGlobal()) throw new ErreurRouteur("interrupteur d'arrêt activé");
    const estimation = tokensEstimes ?? Math.ceil(JSON.stringify(messages).length / 3.5) + maxTokens;
    const refus = [];
    let attenteMs = 0;
    const noterAttente = (ms) => {
      if (ms > 0) attenteMs = attenteMs === 0 ? ms : Math.min(attenteMs, ms);
    };
    for (const f of fournisseurs) {
      const raison = disponible(f, cerveau, estimation);
      if (raison) {
        refus.push(`${f.id} : ${raison}`);
        if (raison === "limite par minute") noterAttente(attentePourFenetre(f, cerveau));
        continue;
      }
      const e = etatDe(f.id);
      e.fenetre.push(maintenant());
      if (estGratuit(f, cerveau)) e.fenetreGratuits.push(maintenant());
      try {
        const rep = await fetchImpl(f.url, {
          method: "POST",
          headers: { "content-type": "application/json", authorization: `Bearer ${env[f.cle]}` },
          body: JSON.stringify({ model: f.modeles[cerveau], messages, temperature, max_tokens: maxTokens }),
        });
        if (rep.status === 429) {
          refus.push(`${f.id} : HTTP 429`);
          noterAttente(attente429Ms);
          continue;
        }
        if (!rep.ok) throw new Error(`HTTP ${rep.status}`);
        const json = await rep.json();
        const texte = json?.choices?.[0]?.message?.content;
        if (typeof texte !== "string") throw new Error("réponse sans texte");
        const consommes = json?.usage?.total_tokens ?? estimation;
        e.tokens += consommes;
        circuitDe(f.id, cerveau).echecs = 0;
        return { texte, fournisseur: f.id, modele: f.modeles[cerveau], tokens: consommes };
      } catch (err) {
        const c = circuitDe(f.id, cerveau);
        c.echecs += 1;
        if (c.echecs >= seuilCoupeCircuit) {
          c.coupeJusqua = maintenant() + pauseCoupeCircuitMs;
          c.echecs = 0;
        }
        refus.push(`${f.id} : ${err.message}`);
      }
    }
    throw new ErreurRouteur(`aucun fournisseur pour ${cerveau}`, { refus, attenteMs });
  }

  function rapport() {
    return fournisseurs.map((f) => {
      const e = etatDe(f.id);
      return {
        fournisseur: f.id,
        tokensUtilises: e.tokens,
        tokensRestants: Math.max(0, f.tokensParJour - e.tokens),
        modelesCoupes: [...circuits.entries()].filter(([k, c]) => k.startsWith(`${f.id}|`) && c.coupeJusqua > maintenant()).map(([k]) => k.split("|")[1]),
        cle: Boolean(env[f.cle]),
      };
    });
  }

  return { appeler, rapport };
}
