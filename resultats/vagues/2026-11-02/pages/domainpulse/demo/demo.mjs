export function construire(donnees) {
  const d = donnees || {};
  const meteo = d.meteo || {};
  const air = d.air || {};

  const esc = (v) =>
    String(v == null ? "" : v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const num = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };
  const arr = (v) => (Array.isArray(v) ? v : []);
  const fmt = (n, dec = 0) =>
    n == null ? "—" : n.toLocaleString("fr-FR", { maximumFractionDigits: dec });

  const h = meteo.hourly || {};
  const times = arr(h.time).map((t) => esc(String(t || "")));
  const temps = arr(h.temperature_2m).map(num);
  const uv = arr(h.uv_index).map(num);
  const precip = arr(h.precipitation_probability).map(num);

  const tempsVal = temps.filter((v) => v != null);
  const uvVal = uv.filter((v) => v != null);
  const precipVal = precip.filter((v) => v != null);

  const tMin = tempsVal.length ? Math.min(...tempsVal) : null;
  const tMax = tempsVal.length ? Math.max(...tempsVal) : null;
  const tMoy = tempsVal.length
    ? tempsVal.reduce((a, b) => a + b, 0) / tempsVal.length
    : null;
  const uvMax = uvVal.length ? Math.max(...uvVal) : null;
  const uvMoy = uvVal.length ? uvVal.reduce((a, b) => a + b, 0) / uvVal.length : null;
  const precipMax = precipVal.length ? Math.max(...precipVal) : null;

  const a = air.hourly || {};
  const pm25 = arr(a.pm2_5).map(num);
  const ozone = arr(a.ozone).map(num);
  const birch = arr(a.birch_pollen).map(num);
  const grass = arr(a.grass_pollen).map(num);
  const ragweed = arr(a.ragweed_pollen).map(num);

  const pm25Val = pm25.filter((v) => v != null);
  const ozoneVal = ozone.filter((v) => v != null);
  const birchVal = birch.filter((v) => v != null);
  const grassVal = grass.filter((v) => v != null);
  const ragweedVal = ragweed.filter((v) => v != null);

  const pm25Max = pm25Val.length ? Math.max(...pm25Val) : null;
  const ozoneMax = ozoneVal.length ? Math.max(...ozoneVal) : null;
  const birchMax = birchVal.length ? Math.max(...birchVal) : null;
  const grassMax = grassVal.length ? Math.max(...grassVal) : null;
  const ragweedMax = ragweedVal.length ? Math.max(...ragweedVal) : null;

  const airDispo =
    pm25Val.length || ozoneVal.length || birchVal.length || grassVal.length || ragweedVal.length;

  // Seuils
  const SEUIL_PM25 = 15;
  const SEUIL_BIRCH = 80;
  const SEUIL_GRASS = 50;
  const SEUIL_RAGWEED = 30;
  const SEUIL_UV = 6;

  // Score global 0-100
  let score = 0;
  let scoreMax = 0;
  const facteurs = [];

  if (pm25Max != null) {
    scoreMax += 30;
    score += Math.min(30, (pm25Max / SEUIL_PM25) * 30);
    if (pm25Max > SEUIL_PM25) facteurs.push(`PM2.5 élevée (${fmt(pm25Max)} µg/m³)`);
  }
  if (ozoneMax != null) {
    scoreMax += 10;
    score += Math.min(10, (ozoneMax / 100) * 10);
    if (ozoneMax > 100) facteurs.push(`Ozone élevé (${fmt(ozoneMax)} µg/m³)`);
  }
  if (birchMax != null) {
    scoreMax += 20;
    score += Math.min(20, (birchMax / SEUIL_BIRCH) * 20);
    if (birchMax > SEUIL_BIRCH) facteurs.push(`Pollen de bouleau élevé (${fmt(birchMax)} grains/m³)`);
  }
  if (grassMax != null) {
    scoreMax += 20;
    score += Math.min(20, (grassMax / SEUIL_GRASS) * 20);
    if (grassMax > SEUIL_GRASS) facteurs.push(`Pollen de graminées élevé (${fmt(grassMax)} grains/m³)`);
  }
  if (ragweedMax != null) {
    scoreMax += 10;
    score += Math.min(10, (ragweedMax / SEUIL_RAGWEED) * 10);
    if (ragweedMax > SEUIL_RAGWEED) facteurs.push(`Pollen d'ambroisie élevé (${fmt(ragweedMax)} grains/m³)`);
  }
  if (uvMax != null) {
    scoreMax += 10;
    score += Math.min(10, (uvMax / SEUIL_UV) * 10);
    if (uvMax > SEUIL_UV) facteurs.push(`Indice UV élevé (${fmt(uvMax, 1)})`);
  }

  const scoreGlobal = scoreMax > 0 ? Math.round((score / scoreMax) * 100) : 0;
  const alerte = scoreGlobal >= 70 ? "élevé" : scoreGlobal >= 40 ? "modéré" : "faible";

  // Date des données
  const dateStr = times.length ? times[0].slice(0, 10) : "inconnue";

  // Graphique température (barres)
  const tMinG = tMin != null ? tMin : 0;
  const tMaxG = tMax != null ? tMax : 10;
  const tRange = tMaxG - tMinG || 1;
  const bars = temps
    .map((t, i) => {
      if (t == null) return `<div class="bar-slot"><div class="bar" style="height:0%"></div><span class="bar-label">${i}</span></div>`;
      const hPct = Math.max(4, ((t - tMinG) / tRange) * 100);
      return `<div class="bar-slot"><div class="bar" style="height:${hPct.toFixed(1)}%" title="${fmt(t, 1)} °C"></div><span class="bar-label">${i}</span></div>`;
    })
    .join("");

  // Jauges pollens
  const jauge = (label, val, seuil) => {
    if (val == null)
      return `<div class="jauge-row"><span class="jauge-label">${esc(label)}</span><div class="jauge-track"><div class="jauge-fill" style="width:0%"></div></div><span class="jauge-val">—</span></div>`;
    const pct = Math.min(100, (val / (seuil * 1.5)) * 100);
    const niveau = val > seuil ? "élevé" : val > seuil * 0.5 ? "modéré" : "faible";
    const cls = niveau === "élevé" ? "jauge-rouge" : niveau === "modéré" ? "jauge-orange" : "jauge-vert";
    return `<div class="jauge-row"><span class="jauge-label">${esc(label)}</span><div class="jauge-track"><div class="jauge-fill ${cls}" style="width:${pct.toFixed(1)}%"></div></div><span class="jauge-val">${fmt(val)} (${esc(niveau)})</span></div>`;
  };

  const jauges =
    jauge("Bouleau", birchMax, SEUIL_BIRCH) +
    jauge("Graminées", grassMax, SEUIL_GRASS) +
    jauge("Ambroisie", ragweedMax, SEUIL_RAGWEED);

  // Alerte globale
  let alerteHtml = "";
  if (facteurs.length) {
    alerteHtml = `<div class="alerte alerte-${alerte}"><strong>Risque ${esc(alerte)} :</strong> ${facteurs.map(esc).join(", ")}. ${
      scoreGlobal >= 70 ? "Prudence recommandée." : "Surveillez les symptômes."
    }</div>`;
  } else if (!airDispo && uvMax == null) {
    alerteHtml = `<div class="alerte alerte-faible">Données insuffisantes pour calculer une alerte.</div>`;
  } else {
    alerteHtml = `<div class="alerte alerte-faible">Aucune alerte majeure détectée.</div>`;
  }

  // Section air : si non dispo
  const airSection = airDispo
    ? `<div class="carte">
        <h2>Qualité de l'air</h2>
        <div class="grille-2">
          <div>
            <p><strong>PM2.5 max :</strong> ${pm25Max != null ? fmt(pm25Max) + " µg/m³" : "—"} <span class="seuil">(seuil OMS : ${SEUIL_PM25} µg/m³)</span></p>
            <p><strong>Ozone max :</strong> ${ozoneMax != null ? fmt(ozoneMax) + " µg/m³" : "—"}</p>
          </div>
          <div>
            <p><strong>Pollens :</strong></p>
            ${jauges}
          </div>
        </div>
      </div>`
    : `<div class="carte">
        <h2>Qualité de l'air</h2>
        <p class="vide">Données de qualité de l'air non disponibles pour cette démonstration.</p>
      </div>`;

  // Section météo
  const meteoSection = `<div class="carte">
    <h2>Météo – Paris</h2>
    <div class="grille-2">
      <div>
        <p><strong>Température :</strong> min ${fmt(tMin, 1)} °C / max ${fmt(tMax, 1)} °C / moy ${fmt(tMoy, 1)} °C</p>
        <p><strong>Indice UV :</strong> max ${fmt(uvMax, 1)} / moy ${fmt(uvMoy, 1)} ${uvMax != null && uvMax > SEUIL_UV ? '<span class="badge badge-rouge">danger</span>' : ""}</p>
        <p><strong>Précipitations max :</strong> ${precipMax != null ? fmt(precipMax) + " %" : "—"}</p>
      </div>
      <div class="graphique">
        <div class="barres">${bars}</div>
        <p class="legende">Température horaire (°C)</p>
      </div>
    </div>
  </div>`;

  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Santé environnementale à Paris</title>
<style>
:root{--bg:#0f172a;--card:#1e293b;--text:#e2e8f0;--muted:#94a3b8;--accent:#38bdf8;--green:#4ade80;--orange:#fb923c;--red:#f87171;--border:#334155}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--text);line-height:1.6;padding:1rem;max-width:720px;margin:0 auto}
h1{font-size:1.4rem;margin-bottom:.5rem;color:var(--accent)}
h2{font-size:1.1rem;margin-bottom:.75rem;color:var(--text)}
.date{color:var(--muted);font-size:.85rem;margin-bottom:1.5rem}
.carte{background:var(--card);border:1px solid var(--border);border-radius:.75rem;padding:1rem 1.25rem;margin-bottom:1rem}
.grille-2{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
@media(max-width:540px){.grille-2{grid-template-columns:1fr}}
p{margin-bottom:.4rem;font-size:.95rem}
.seuil{color:var(--muted);font-size:.8rem}
.badge{display:inline-block;padding:.1rem .4rem;border-radius:.3rem;font-size:.75rem;font-weight:600}
.badge-rouge{background:var(--red);color:#000}
.barres{display:flex;align-items:flex-end;gap:2px;height:80px;padding:0 .25rem}
.bar-slot{flex:1;display:flex;flex-direction:column;align-items:center;height:100%}
.bar{width:100%;background:var(--accent);border-radius:2px 2px 0 0;min-height:2px;transition:height .3s}
.bar-label{font-size:.6rem;color:var(--muted);margin-top:2px}
.legende{font-size:.75rem;color:var(--muted);text-align:center;margin-top:.25rem}
.jauge-row{display:flex;align-items:center;gap:.5rem;margin-bottom:.4rem;font-size:.85rem}
.jauge-label{width:5.5rem;flex-shrink:0}
.jauge-track{flex:1;height:.5rem;background:var(--border);border-radius:.25rem;overflow:hidden}
.jauge-fill{height:100%;border-radius:.25rem;transition:width .3s}
.jauge-vert{background:var(--green)}
.jauge-orange{background:var(--orange)}
.jauge-rouge{background:var(--red)}
.jauge-val{width:6rem;text-align:right;font-size:.8rem;color:var(--muted)}
.alerte{padding:.75rem 1rem;border-radius:.5rem;margin-top:.75rem;font-size:.9rem}
.alerte-faible{background:#14532d33;border:1px solid var(--green)}
.alerte-modéré{background:#78350f33;border:1px solid var(--orange)}
.alerte-élevé{background:#7f1d1d33;border:1px solid var(--red)}
.score{font-size:2rem;font-weight:700;color:var(--accent)}
.vide{color:var(--muted);font-style:italic}
.sources{font-size:.85rem;color:var(--muted)}
.sources li{margin-bottom:.25rem}
.mention{font-size:.8rem;color:var(--muted);margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--border)}
</style>
</head>
<body>
<h1>Santé environnementale à Paris aujourd'hui</h1>
<p class="date">Données du ${esc(dateStr)}</p>

${meteoSection}

${airSection}

<div class="carte">
  <h2>Alerte globale</h2>
  <p>Score : <span class="score">${scoreGlobal}</span>/100</p>
  ${alerteHtml}
</div>

<div class="carte sources">
  <h2>Sources</h2>
  <ul>
    <li>Open-Meteo prévisions — licence : CC BY 4.0</li>
  </ul>
</div>

<p class="mention">Démonstration : produit en préparation.</p>
</body>
</html>`;

  return html;
}