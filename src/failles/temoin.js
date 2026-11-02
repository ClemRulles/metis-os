// Le témoin : ce qu'un assistant IA généraliste proposerait spontanément, sans données, sur chaque arène.
// 1) Les inventeurs reçoivent ces idées comme « à ne pas refaire ».
// 2) Chaque finaliste est comparé au témoin : plus il lui ressemble, plus il perd en originalité mesurée.
// C'est le test « est-ce qu'un ChatGPT l'aurait sorti ? », calculé au lieu d'être deviné.
import { pool, extraireListe } from "../commun/outils.js";

export function messagesTemoin(arene, description, n = 25) {
  return [
    { role: "system", content: `Tu es un assistant IA généraliste. On te demande des idées de business en ligne. Réponds comme tu le ferais spontanément, sans chercher l'originalité. Réponds uniquement en JSON : {"idees": [{"titre": "...", "solution": "<une phrase>"}]} avec ${n} idées.` },
    { role: "user", content: `Donne-moi ${n} idées de business en ligne rentables dans ce domaine : ${arene} (${description}).` },
  ];
}

const VIDES = new Set("les des une un le la de du et en pour par avec sans sur dans aux au qui que leur leurs vos votre son ses plus tout tous pas est sont the and for with your from that this into app application plateforme platform outil tool service site web ligne online ia ai intelligence artificielle agent agents client clients utilisateurs users".split(" "));
export function jetons(t) {
  return new Set(
    String(t ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .split(/[^a-z0-9]+/)
      .map((m) => (m.length > 5 ? m.replace(/(s|x|es|ment|tion|ions)$/, "") : m))
      .filter((m) => m.length >= 4 && !VIDES.has(m))
  );
}

export function similarite(a, b) {
  if (!a.size || !b.size) return 0;
  let commun = 0;
  for (const m of a) if (b.has(m)) commun += 1;
  // Recouvrement rapporté au plus petit des deux : une idée courte entièrement contenue dans une autre est banale.
  return commun / Math.min(a.size, b.size);
}

export function banalite(idee, temoins) {
  const j = jetons(`${idee.titre} ${idee.solution} ${idee.probleme ?? ""}`);
  let max = 0;
  let proche = null;
  for (const t of temoins) {
    const s = similarite(j, t.jetons ?? jetons(`${t.titre} ${t.solution}`));
    if (s > max) [max, proche] = [s, t.titre];
  }
  return { similarite: +max.toFixed(3), proche, originalite: +Math.max(0, Math.min(10, 10 * (1 - max / 0.6))).toFixed(2) };
}

export async function genererTemoins({ arenes, demandeur, cerveaux, journal = () => {} }) {
  const entrees = Object.entries(arenes);
  const res = await pool(entrees, 6, async ([cle, desc], k) => {
    const { valeur } = await demandeur.demander([cerveaux[k % cerveaux.length]], messagesTemoin(cle, desc), { temperature: 0.7, maxTokens: 3000, autres: cerveaux, lire: (t) => { const l = extraireListe(t, "idees", "titre"); return l.length ? l : null; } });
    return [cle, (valeur ?? []).map((i) => ({ titre: String(i.titre).slice(0, 120), solution: String(i.solution ?? "").slice(0, 240) }))];
  });
  const parArene = Object.fromEntries(res);
  const tous = Object.values(parArene).flat().map((t) => ({ ...t, jetons: jetons(`${t.titre} ${t.solution}`) }));
  journal(`témoin : ${tous.length} idées « réflexe d'assistant IA » sur ${entrees.length} arènes`);
  return { parArene, tous };
}
