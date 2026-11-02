// Routeur multi-modèles : fournisseurs compatibles OpenAI, budget de tokens par fournisseur et par jour,
// coupe-circuit après échecs répétés, repli automatique, interrupteur d'arrêt global.
// Aucune clé dans le code : elles viennent de l'environnement (variables ou secrets Cloudflare).

export const FOURNISSEURS_PAR_DEFAUT = [
  {
    id: "groq",
    url: "https://api.groq.com/openai/v1/chat/completions",
    cle: "GROQ_API_KEY",
    // Gratuit (sans carte) : environ 30 requêtes par minute, 1 000 par jour et 200 000 jetons par jour PAR MODÈLE.
    // Placé en premier : tant que son quota gratuit tient, les appels ne coûtent rien ; au-delà (429 ou
    // budget atteint), le routeur passe à OpenRouter.
    tokensParJour: 600_000,
    requetesParMinute: 28,
    modeles: {
      llama: "llama-3.3-70b-versatile",
      qwen: "qwen/qwen3.8-27b",
      gptoss: "openai/gpt-oss-120b",
    },
    // Ces modèles « réfléchissent » : on masque la réflexion pour ne recevoir que la réponse.
    parametres: { qwen: { reasoning_format: "hidden" }, gptoss: { include_reasoning: false, reasoning_effort: "low" } },
  },
  {
    id: "openrouter",
    url: "https://openrouter.ai/api/v1/chat/completions",
    cle: "OPENROUTER_API_KEY",
    tokensParJour: 3_000_000, // plafond de sécurité : environ 0,50 $ par jour au pire
    requetesParMinute: 200, // modèles payants
    requetesParMinuteGratuits: 18, // limite d'OpenRouter pour les modèles « :free », partagée par tout le compte
    reflexionObligatoire: ["glm", "minimax"], // ces modèles refusent effort "none" (sonde du 1er nov.)
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
      // Éclaireur du 1er nov. : note 8,9/9 sur nos épreuves, 7 s contre 56 s pour deepseek (0,10 $ / 0,35 $ par million).
      mercury: "inception/mercury-3",
      nemotronsuper: "nvidia/nemotron-3.5-super-vl",
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
  tentativesMax = 2,
  attente429Ms = 5_000,
  delaiRequeteMs = 45_000, // une requête qui ne répond pas en 45 s est abandonnée
  dormir = (ms) => new Promise((r) => setTimeout(r, ms)),
  plafondCoutUsd = Infinity, // coût maximal d'un passage : au-delà, plus aucun appel ne part
} = {}) {
  let coutUsd = 0;
  let appels = 0;
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

  // json : demande un objet JSON (response_format) ; raisonnement : "none" coupe la réflexion pour les tâches
  // structurées, "low" la garde courte ; web : { engine, max_results } branche la recherche web d'OpenRouter.
  async function essayer({ cerveau, messages, temperature = 0.5, maxTokens = 800, tokensEstimes, json = false, raisonnement = "low", web = null }) {
    if (arretGlobal()) throw new ErreurRouteur("interrupteur d'arrêt activé");
    if (coutUsd >= plafondCoutUsd) throw new ErreurRouteur(`plafond de coût atteint (${coutUsd.toFixed(3)} $)`);
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
        const corps = { model: f.modeles[cerveau], messages, temperature, max_tokens: maxTokens };
        if (f.id === "openrouter") {
          corps.usage = { include: true };
          // En mode JSON, la réflexion n'est jamais renvoyée (exclude) : seule la réponse compte.
          const obligatoire = (f.reflexionObligatoire ?? []).includes(cerveau);
          corps.reasoning = raisonnement === "none" && !obligatoire ? { effort: "none" } : json ? { effort: "low", exclude: true } : { effort: "low" };
          if (json) corps.response_format = { type: "json_object" };
          if (web) corps.plugins = [{ id: "web", engine: web.engine ?? "parallel", max_results: web.max_results ?? 5 }];
        } else {
          Object.assign(corps, f.parametres?.[cerveau] ?? {});
          if (json) corps.response_format = { type: "json_object" };
        }
        const envoyer = (b) =>
          fetchImpl(f.url, {
            signal: typeof AbortSignal !== "undefined" && AbortSignal.timeout ? AbortSignal.timeout(delaiRequeteMs) : undefined,
            method: "POST",
            headers: { "content-type": "application/json", authorization: `Bearer ${env[f.cle]}` },
            body: JSON.stringify(b),
          });
        appels += 1;
        let rep = await envoyer(corps);
        // Certains modèles refusent de couper leur réflexion, ou le mode JSON : on réessaie une fois sans ces options.
        if (rep.status === 400 && (corps.reasoning?.effort === "none" || corps.response_format)) {
          const repli = { ...corps, reasoning: { effort: "low", exclude: Boolean(json) } };
          delete repli.response_format;
          appels += 1;
          rep = await envoyer(repli);
        }
        if (rep.status === 429) {
          refus.push(`${f.id} : HTTP 429`);
          noterAttente(attente429Ms);
          continue;
        }
        if (!rep.ok) throw new Error(`HTTP ${rep.status}`);
        const reponse = await rep.json();
        // Les modèles qui « réfléchissent » peuvent renvoyer un contenu vide et leur réponse dans le champ
        // reasoning : on lit le contenu d'abord, puis la réflexion en secours.
        const msg = reponse?.choices?.[0]?.message ?? {};
        const contenu = typeof msg.content === "string" && msg.content.trim() ? msg.content : null;
        const texte = contenu ?? (!json && typeof msg.reasoning === "string" && msg.reasoning.trim() ? msg.reasoning : null);
        if (texte == null) throw new Error(`réponse vide (fin : ${reponse?.choices?.[0]?.finish_reason ?? "inconnue"})`);
        const consommes = reponse?.usage?.total_tokens ?? estimation;
        e.tokens += consommes;
        const cout = Number(reponse?.usage?.cost);
        if (Number.isFinite(cout)) coutUsd += cout;
        circuitDe(f.id, cerveau).echecs = 0;
        // L'extrait de la page (quand le moteur le renvoie) sert à vérifier qu'un prix cité y figure vraiment.
        const citations = (msg.annotations ?? []).map((a) => a?.url_citation).filter(Boolean).map((c) => ({ url: c.url, titre: c.title ?? null, extrait: typeof c.content === "string" ? c.content.slice(0, 4000) : null }));
        return { texte, fournisseur: f.id, modele: f.modeles[cerveau], tokens: consommes, cout: Number.isFinite(cout) ? cout : null, finDeReponse: reponse?.choices?.[0]?.finish_reason ?? null, citations };
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
    throw new ErreurRouteur(`aucun fournisseur pour ${cerveau} (${refus.join(" ; ")})`, { refus, attenteMs });
  }

  const cout = () => ({ usd: +coutUsd.toFixed(4), appels });

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

  return { appeler, rapport, cout };
}
