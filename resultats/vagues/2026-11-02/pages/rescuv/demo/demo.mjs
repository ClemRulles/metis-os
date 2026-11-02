export function construire(donnees) {
  // Échappement HTML
  const e = (str) => {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // Données disponibles
  const rappels = donnees.rappels_produits?.results || [];
  const bodaccErreur = donnees.bodacc_liquidations === undefined || donnees.bodacc_liquidations === null;

  // Date des données (on prend la date la plus récente parmi les rappels)
  let dateDonnees = '';
  if (rappels.length > 0) {
    const dates = rappels.map(r => r.date_publication).filter(Boolean).sort().reverse();
    if (dates.length > 0) {
      const d = new Date(dates[0]);
      dateDonnees = d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    }
  }
  if (!dateDonnees) {
    dateDonnees = 'non disponible';
  }

  // Construction des cartes de rappels
  const cartesRappels = rappels.slice(0, 3).map(r => {
    const datePub = r.date_publication ? new Date(r.date_publication).toLocaleDateString('fr-FR') : 'date inconnue';
    const produit = r.modeles_ou_references || 'produit non spécifié';
    const marque = r.marque_produit || 'marque non spécifiée';
    const motif = r.motif_rappel || 'motif non précisé';
    const distributeur = r.distributeurs || 'distributeur non précisé';
    return `
      <div class="carte">
        <div class="carte-titre">${e(produit)}</div>
        <div class="carte-detail">Marque : ${e(marque)}</div>
        <div class="carte-detail">Date de publication : ${e(datePub)}</div>
        <div class="carte-detail">Motif : ${e(motif)}</div>
        <div class="carte-detail">Distributeur : ${e(distributeur)}</div>
      </div>
    `;
  }).join('');

  // Message d'absence de données BODACC
  const bodaccMessage = bodaccErreur
    ? '<div class="info-erreur">Les données BODACC (liquidations judiciaires) sont temporairement indisponibles. La fonctionnalité de détection d’opportunités de réemploi n’est pas active.</div>'
    : '';

  // Sources (exactement ce qui est fourni)
  const sources = `
    <li>RappelConso (France) — licence : Licence ouverte</li>
  `;

  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bodacc Vert — Radar des Opportunités Circulaires</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #121212;
      color: #e0e0e0;
      line-height: 1.5;
      padding: 1rem;
      min-height: 100vh;
    }
    .conteneur {
      max-width: 800px;
      margin: 0 auto;
    }
    header {
      margin-bottom: 2rem;
      border-bottom: 1px solid #333;
      padding-bottom: 1rem;
    }
    h1 {
      font-size: 1.8rem;
      font-weight: 700;
      color: #ffffff;
    }
    .sous-titre {
      font-size: 1rem;
      color: #aaa;
      margin-top: 0.25rem;
    }
    h2 {
      font-size: 1.3rem;
      font-weight: 600;
      margin: 1.5rem 0 1rem;
      color: #ffffff;
    }
    .info-erreur {
      background: #2a1f1f;
      border-left: 4px solid #e57373;
      padding: 0.75rem 1rem;
      border-radius: 4px;
      margin: 1rem 0;
      color: #e0b3b3;
    }
    .carte {
      background: #1e1e1e;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 0.75rem;
    }
    .carte-titre {
      font-weight: 600;
      font-size: 1.05rem;
      color: #ffffff;
      margin-bottom: 0.3rem;
    }
    .carte-detail {
      font-size: 0.9rem;
      color: #b0b0b0;
      margin-top: 0.15rem;
    }
    .contexte-message {
      background: #1e2a1e;
      border-left: 4px solid #81c784;
      padding: 0.75rem 1rem;
      border-radius: 4px;
      margin: 1rem 0;
      color: #c8e6c9;
    }
    footer {
      margin-top: 2.5rem;
      padding-top: 1rem;
      border-top: 1px solid #333;
      font-size: 0.85rem;
      color: #888;
    }
    footer ul {
      list-style: none;
      padding-left: 0;
      margin-top: 0.5rem;
    }
    footer li {
      margin-bottom: 0.25rem;
    }
    .date-donnees {
      font-size: 0.85rem;
      color: #888;
      margin-bottom: 1rem;
    }
    .mention {
      margin-top: 1rem;
      font-style: italic;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="conteneur">
    <header>
      <h1>Bodacc Vert</h1>
      <div class="sous-titre">Radar des Opportunités Circulaires</div>
    </header>

    <div class="date-donnees">Données du : ${e(dateDonnees)}</div>

    <section>
      <h2>Alerte Liquidations</h2>
      ${bodaccMessage}
      ${!bodaccErreur ? '<p style="color:#888;">Aucune donnée de liquidation disponible pour le moment.</p>' : ''}
    </section>

    <section>
      <h2>Veille Sanitaire &amp; Qualité</h2>
      <div class="contexte-message">
        Attention aux risques liés aux rachats de stocks suite à ces rappels.
      </div>
      ${cartesRappels || '<p style="color:#888;">Aucun rappel récent.</p>'}
    </section>

    <footer>
      <strong>Sources</strong>
      <ul>
        ${sources}
      </ul>
      <div class="mention">Démonstration : produit en préparation</div>
    </footer>
  </div>
</body>
</html>`;
}