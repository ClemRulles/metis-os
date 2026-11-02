export function construire(donnees) {
  // Fonction utilitaire pour échapper le texte
  function e(t) {
    if (t === null || t === undefined) return '';
    return String(t)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Récupération des données
  const rappelconso = donnees.rappelconso || {};
  const openalex = donnees.openalex || {};

  // --- Traitement des rappels conso ---
  const rappels = (rappelconso.results || []).slice(0, 5);
  const motsClefs = ['cuisine', 'ustensile', 'alimentaire', 'couteau', 'poêle', 'casserole', 'assiette', 'verre', 'bol', 'planche', 'saladier', 'moule', 'robot', 'mixeur', 'grille-pain', 'bouilloire', 'cafetière'];
  let alerteRouge = false;
  let detailsAlerte = [];
  rappels.forEach(r => {
    const texte = (r.categorie_produit || '') + ' ' + (r.sous_categorie_produit || '') + ' ' + (r.modeles_ou_references || '') + ' ' + (r.marque_produit || '');
    const trouve = motsClefs.some(mot => texte.toLowerCase().includes(mot));
    if (trouve) {
      alerteRouge = true;
      detailsAlerte.push({
        marque: e(r.marque_produit || 'Non spécifiée'),
        produit: e(r.modeles_ou_references || 'Non spécifié'),
        motif: e(r.motif_rappel || 'Non spécifié'),
        date: e(r.date_publication ? r.date_publication.substring(0, 10) : 'Date inconnue')
      });
    }
  });

  // --- Traitement OpenAlex ---
  let scoreDon = 0;
  let hitCount = 0;
  let openalexOk = false;
  if (openalex && openalex.meta && openalex.meta.count !== undefined) {
    hitCount = openalex.meta.count;
    openalexOk = true;
  } else if (Array.isArray(openalex.results)) {
    hitCount = openalex.results.length;
    openalexOk = true;
  }
  scoreDon = Math.round((hitCount / 1000) * 10 * 100) / 100;

  // --- Date des données ---
  let dateDonnees = 'Non disponible';
  if (rappelconso && rappelconso.results && rappelconso.results.length > 0 && rappelconso.results[0].date_publication) {
    dateDonnees = rappelconso.results[0].date_publication.substring(0, 10);
  } else if (openalex && openalex.meta && openalex.meta.count !== undefined) {
    dateDonnees = new Date().toISOString().substring(0, 10);
  }

  // --- Construction du HTML ---
  let alertesHtml = '';
  if (alerteRouge) {
    alertesHtml = `<div style="background:#fce4e4;border:1px solid #d32f2f;border-radius:8px;padding:12px;margin:12px 0;">
      <h3 style="color:#d32f2f;margin:0 0 8px 0;">⚠️ Alerte sanitaire détectée</h3>
      <p style="margin:0 0 8px 0;">Des rappels concernant des ustensiles de cuisine ou produits alimentaires courants ont été trouvés :</p>
      <ul style="margin:0;padding-left:20px;">`;
    detailsAlerte.forEach(a => {
      alertesHtml += `<li><strong>${a.marque}</strong> – ${a.produit} (motif : ${a.motif}, publié le ${a.date})</li>`;
    });
    alertesHtml += `</ul></div>`;
  } else {
    alertesHtml = `<div style="background:#e8f5e9;border:1px solid #2e7d32;border-radius:8px;padding:12px;margin:12px 0;">
      <p style="color:#2e7d32;font-weight:bold;margin:0;">✅ Aucun risque sanitaire détecté sur les catégories standards</p>
    </div>`;
  }

  let openalexHtml = '';
  if (openalexOk) {
    openalexHtml = `<div style="background:#f5f5f5;border:1px solid #ddd;border-radius:8px;padding:12px;margin:12px 0;">
      <p style="margin:0 0 8px 0;">Publications académiques liées au travail du bois/vintage : <strong>${e(hitCount)}</strong> résultats</p>
      <p style="margin:0;">Score de don estimé : <strong>${e(scoreDon)}/10</strong> (plus le score est élevé, plus la réutilisation est recommandée)</p>
    </div>`;
  } else {
    openalexHtml = `<div style="background:#fff3e0;border:1px solid #e65100;border-radius:8px;padding:12px;margin:12px 0;">
      <p style="color:#e65100;margin:0;">⚠️ Les données OpenAlex n'ont pas pu être récupérées. Le score de don n'est pas disponible.</p>
    </div>`;
  }

  // Estimation valeur (simulation)
  const estimationHtml = `<div style="background:#f5f5f5;border:1px solid #ddd;border-radius:8px;padding:12px;margin:12px 0;">
    <p style="margin:0 0 8px 0;"><strong>Estimation de valeur (simulation)</strong></p>
    <p style="margin:0;">Cette fonctionnalité est en préparation. Les données macroéconomiques (inflation Eurostat) seront intégrées ultérieurement.</p>
  </div>`;

  const html = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Le Déméteur – Rapport de Tri Sécurisé</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.5;
      margin: 0;
      padding: 16px;
      background: #fff;
      color: #222;
    }
    @media (prefers-color-scheme: dark) {
      body { background: #1e1e1e; color: #e0e0e0; }
      .card { background: #2a2a2a; border-color: #444; }
      h1, h2 { color: #e0e0e0; }
      .alerte { background: #3a1a1a; border-color: #d32f2f; }
      .succes { background: #1a3a1a; border-color: #2e7d32; }
      .info { background: #2a2a2a; border-color: #555; }
    }
    .card {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin: 12px 0;
    }
    h1 { font-size: 1.4rem; margin: 0 0 8px 0; }
    h2 { font-size: 1.1rem; margin: 0 0 8px 0; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem; }
    .badge-vert { background: #2e7d32; color: #fff; }
    .badge-rouge { background: #d32f2f; color: #fff; }
    .sources { font-size: 0.85rem; color: #666; margin-top: 16px; }
    @media (prefers-color-scheme: dark) {
      .sources { color: #aaa; }
    }
  </style>
</head>
<body>
  <h1>Le Déméteur : Estimation de la valeur du tri et alerte sécurité</h1>
  <p style="color:#666;font-size:0.9rem;">Rapport de Tri Sécurisé – Données du ${e(dateDonnees)}</p>

  <h2>Alertes Rappels Produits</h2>
  ${alertesHtml}

  <h2>Potentiel de Don &amp; Recyclage</h2>
  ${openalexHtml}

  <h2>Estimation Valeur Estimée</h2>
  ${estimationHtml}

  <div class="sources">
    <h3 style="font-size:1rem;margin:8px 0;">Sources</h3>
    <ul style="margin:0;padding-left:20px;">
      <li>RappelConso (France) — licence : Licence ouverte</li>
    </ul>
    <p style="font-style:italic;margin:8px 0 0 0;">Démonstration : produit en préparation</p>
  </div>
</body>
</html>`;

  return html;
}