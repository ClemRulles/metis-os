// Worker de liste d'attente : compte les visites (sans cookie, sans adresse IP stockée) et enregistre les
// inscriptions consenties. Les statistiques ne sont lisibles qu'avec le jeton STATS_TOKEN (secret Cloudflare).
const CORS = { "access-control-allow-origin": "*", "access-control-allow-methods": "GET,POST,OPTIONS", "access-control-allow-headers": "content-type" };
const json = (corps, status = 200) => new Response(JSON.stringify(corps), { status, headers: { "content-type": "application/json", ...CORS } });
const EXP = /^[a-z0-9-]{3,60}$/;
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i;
const ROBOT = /bot|crawl|spider|preview|headless|lighthouse|monitor/i;

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
    const pays = req.cf?.country ?? null;
    if (req.method === "POST" && url.pathname === "/visite") {
      if (ROBOT.test(req.headers.get("user-agent") ?? "")) return json({ ok: true });
      const d = await req.json().catch(() => ({}));
      if (!EXP.test(d.experience ?? "")) return json({ erreur: "experience" }, 400);
      await env.DB.prepare("INSERT INTO visites (experience, source, pays, jour) VALUES (?, ?, ?, date('now'))").bind(d.experience, String(d.source ?? "").slice(0, 80), pays).run();
      return json({ ok: true });
    }
    if (req.method === "POST" && url.pathname === "/inscription") {
      const d = await req.json().catch(() => ({}));
      if (!EXP.test(d.experience ?? "") || !EMAIL.test(d.email ?? "") || d.accord !== true) return json({ erreur: "donnees" }, 400);
      await env.DB.prepare("INSERT OR IGNORE INTO inscriptions (experience, email, source, pays, accord) VALUES (?, ?, ?, ?, 1)").bind(d.experience, d.email.trim().toLowerCase(), String(d.source ?? "").slice(0, 80), pays).run();
      return json({ ok: true });
    }
    if (req.method === "POST" && url.pathname === "/clic") {
      if (ROBOT.test(req.headers.get("user-agent") ?? "")) return json({ ok: true });
      const d = await req.json().catch(() => ({}));
      if (!EXP.test(d.experience ?? "")) return json({ erreur: "experience" }, 400);
      await env.DB.prepare("INSERT INTO clics (experience, source, pays) VALUES (?, ?, ?)").bind(d.experience, String(d.source ?? "").slice(0, 80), pays).run();
      return json({ ok: true });
    }
    if (req.method === "GET" && url.pathname === "/stats") {
      if (!env.STATS_TOKEN || req.headers.get("authorization") !== `Bearer ${env.STATS_TOKEN}`) return json({ erreur: "acces" }, 401);
      const v = await env.DB.prepare("SELECT experience, COUNT(*) AS visites FROM visites GROUP BY experience").all();
      const i = await env.DB.prepare("SELECT experience, COUNT(*) AS inscriptions FROM inscriptions GROUP BY experience").all();
      const s = await env.DB.prepare("SELECT experience, source, COUNT(*) AS n FROM visites GROUP BY experience, source").all();
      const c = await env.DB.prepare("SELECT experience, COUNT(*) AS clics FROM clics GROUP BY experience").all();
      return json({ visites: v.results, inscriptions: i.results, clics: c.results, sources: s.results });
    }
    return json({ erreur: "introuvable" }, 404);
  },
};
