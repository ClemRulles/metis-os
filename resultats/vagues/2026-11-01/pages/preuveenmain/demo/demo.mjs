export function construire(donnees) {
  // Fonction utilitaire pour échapper le texte
  function e(t) {
    if (t === null || t === undefined) return '';
    return String(t)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Récupération des données avec valeurs par défaut
  const meteo = donnees?.meteo || {};
  const rappelconso = donnees?.rappelconso || {};
  const entreprises = donnees?.entreprises || {};

  // --- Traitement Météo ---
  const hourly = meteo?.hourly || {};
  const temps = hourly?.time || [];
  const precipProbas = hourly?.precipitation_probability || [];
  const temperatures = hourly?.temperature_2m || [];

  // On prend l'index du milieu de journée (12h) ou le premier disponible
  const midiIndex = temps.findIndex ? temps.findIndex(t => t.includes('T12:')) : -1;
  const idx = (midiIndex >= 0 && midiIndex < precipProbas.length) ? midiIndex : 0;

  const probaPluie = (idx < precipProbas.length) ? (precipProbas[idx] || 0) : 0;
  const temperature = (idx < temperatures.length) ? (temperatures[idx] || '—') : '—';

  let niveauRisque, couleurRisque;
  if (probaPluie > 50) {
    niveauRisque = 'Risques modérés';
    couleurRisque = '#e67e22'; // Orange
  } else if (probaPluie > 0) {
    niveauRisque = 'Risques faibles';
    couleurRisque = '#f1c40f'; // Jaune
  } else {
    niveauRisque = 'Risques très faibles';
    couleurRisque = '#27ae60'; // Vert
  }

  // --- Traitement Rappel Conso ---
  const rappels = rappelconso?.results || [];
  const lignesRappel = rappels.slice(0, 3).map(r => {
    const marque = e(r?.marque_produit || 'Marque inconnue');
    const motif = e(r?.motif_rappel || 'Motif non précisé');
    const datePub = e(r?.date_publication || '');
    const produit = e(r?.modeles_ou_references || 'Produit non spécifié');
    const categorie = e(r?.categorie_produit || '');
    return `<li class="rappel-item">
      <span class="rappel-icone">⚠️</span>
      <div>
        <strong>${marque}</strong> — ${produit}<br>
        <span class="rappel-motif">${motif}</span><br>
        <span class="rappel-date">Publié le ${datePub}</span>
        ${categorie ? `<span class="rappel-categorie"> • ${categorie}</span>` : ''}
      </div>
    </li>`;
  }).join('');

  // --- Traitement Entreprises ---
  const resultsEntreprises = entreprises?.results || [];
  let nomEntreprise = 'Non trouvée';
  let siren = '';
  let siegeAdresse = '';
  if (resultsEntreprises.length > 0) {
    const premiere = resultsEntreprises[0];
    nomEntreprise = e(premiere?.nom_complet || premiere?.nom_raison_sociale || 'Entreprise');
    siren = e(premiere?.siren || '');
    const siege = premiere?.siege || {};
    siegeAdresse = e(siege?.adresse || '');
  }

  // Date des données (on prend la plus récente parmi les sources)
  const dates = [];
  if (meteo?.hourly?.time?.length > 0) dates.push(meteo.hourly.time[0]);
  if (rappelconso?.results?.length > 0 && rappelconso.results[0]?.date_publication) dates.push(rappelconso.results[0].date_publication);
  if (entreprises?.results?.length > 0 && entreprises.results[0]?.date_mise_a_jour) dates.push(entreprises.results[0].date_mise_a_jour);
  const dateAffichage = dates.length > 0 ? dates.sort().reverse()[0] : 'Non disponible';

  // Construction du HTML
  const html = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PreuveEnMain — Tableau de Bord</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #0d1117;
      color: #c9d1d9;
      line-height: 1.5;
      padding: 16px;
      min-height: 100vh;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: #161b22;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    }
    h1 {
      font-size: 1.4rem;
      margin-bottom: 8px;
      color: #58a6ff;
    }
    .sous-titre {
      color: #8b949e;
      font-size: 0.9rem;
      margin-bottom: 20px;
    }
    .section {
      background: #21262d;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
      border-left: 4px solid #30363d;
    }
    .section h2 {
      font-size: 1.1rem;
      color: #f0f6fc;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .meteo-info {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }
    .meteo-temp {
      font-size: 2rem;
      font-weight: 300;
    }
    .meteo-pluie {
      font-size: 1rem;
      color: #8b949e;
    }
    .indicateur-risque {
      display: inline-block;
      padding: 6px 14px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.9rem;
      color: #fff;
      background: ${couleurRisque};
    }
    .rappel-list {
      list-style: none;
      padding: 0;
    }
    .rappel-item {
      display: flex;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px solid #30363d;
    }
    .rappel-item:last-child { border-bottom: none; }
    .rappel-icone {
      font-size: 1.3rem;
      line-height: 1;
    }
    .rappel-motif {
      color: #e3b341;
      font-weight: 500;
    }
    .rappel-date, .rappel-categorie {
      color: #8b949e;
      font-size: 0.8rem;
    }
    .entreprise-card {
      padding: 8px 0;
    }
    .entreprise-nom {
      font-size: 1.1rem;
      font-weight: 600;
    }
    .entreprise-detail {
      color: #8b949e;
      font-size: 0.85rem;
    }
    .footer {
      margin-top: 24px;
      padding: 16px;
      background: #21262d;
      border-radius: 8px;
      font-size: 0.8rem;
      color: #8b949e;
    }
    .footer h3 {
      color: #58a6ff;
      font-size: 0.95rem;
      margin-bottom: 8px;
    }
    .footer ul {
      list-style: none;
      padding-left: 0;
    }
    .footer li {
      margin-bottom: 4px;
    }
    .footer .mention {
      color: #e3b341;
      font-weight: 500;
      margin-top: 12px;
    }
    .date-donnees {
      text-align: right;
      font-size: 0.8rem;
      color: #6e7681;
      margin-bottom: 16px;
    }
    @media (max-width: 480px) {
      .container { padding: 16px; }
      .meteo-info { flex-direction: column; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🔍 PreuveEnMain — Tableau de Bord</h1>
      <div class="sous-titre">Boulangerie BG — Anticipation Risques & Logistique</div>
      <div class="date-donnees">Données mises à jour : ${e(dateAffichage)}</div>
    </header>

    <!-- Section Météo & Impact -->
    <div class="section">
      <h2>🌤 Météo & Impact Livraison</h2>
      <div class="meteo-info">
        <div>
          <div class="meteo-temp">${e(temperature)}°C</div>
          <div class="meteo-pluie">Probabilité précipitations : ${e(probaPluie)}%</div>
        </div>
        <div>
          <span class="indicateur-risque">${e(niveauRisque)}</span>
        </div>
      </div>
    </div>

    <!-- Section Vigilance Produits -->
    <div class="section">
      <h2>⚠️ Vigilance Produits — Rappels récents</h2>
      ${lignesRappel ? `<ul class="rappel-list">${lignesRappel}</ul>` : '<p style="color:#8b949e;">Aucun rappel récent à afficher.</p>'}
    </div>

    <!-- Section Contexte Local -->
    <div class="section">
      <h2>🏪 Contexte Local — Entreprise cible</h2>
      <div class="entreprise-card">
        <div class="entreprise-nom">${nomEntreprise}</div>
        ${siren ? `<div class="entreprise-detail">SIREN : ${siren}</div>` : ''}
        ${siegeAdresse ? `<div class="entreprise-detail">Siège : ${siegeAdresse}</div>` : ''}
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <h3>📡 Sources des données</h3>
      <ul>
        <li><strong>Open-Meteo</strong> — Données météo (licence Open Data Commons Open Database License (ODbL) v1.0)</li>
        <li><strong>RappelConso</strong> — Alertes produits (licence Ouverte 2.0 / Etalab)</li>
        <li><strong>API Entreprises (recherche-entreprises.api.gouv.fr)</strong> — Données SIRENE (licence Ouverte 2.0)</li>
      </ul>
      <div class="mention">Démonstration : produit en préparation</div>
    </div>
  </div>
</body>
</html>`;

  return html;
}