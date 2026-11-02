export function construire(donnees) {
  // Fonction d'échappement HTML
  const echapper = (valeur) => {
    if (valeur === null || valeur === undefined) return '';
    return String(valeur)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // Extraction sécurisée des données
  const tendanceTrafic = donnees.tendance_trafic_web || {};
  const tendanceMoteur = donnees.tendance_moteur_recherche || {};
  const interetPublic = donnees.interet_public || {};
  const tendanceRecherche = donnees.tendance_recherche_web || {};

  // Analyse des résultats
  const resultatsOpenAlex = tendanceTrafic.results || [];
  const resultatsCrossref = tendanceMoteur.message?.items || [];
  const resultatsWikidata = interetPublic.search || [];
  const resultatsOpenLibrary = tendanceRecherche.docs || [];

  // Compter les résultats
  const nbOpenAlex = resultatsOpenAlex.length;
  const nbCrossref = resultatsCrossref.length;
  const nbWikidata = resultatsWikidata.length;
  const nbOpenLibrary = resultatsOpenLibrary.length;

  // Extraire les dates de publication
  const dateOpenAlex = resultatsOpenAlex[0]?.publication_date || 'Non disponible';
  const dateCrossref = resultatsCrossref[0]?.published?.date || resultatsCrossref[0]?.created?.date || 'Non disponible';
  const dateWikidata = 'Non disponible'; // Wikidata ne fournit pas de date de publication dans cette requête
  const dateOpenLibrary = 'Non disponible'; // Aucun résultat

  // Titres des résultats
  const titreOpenAlex = resultatsOpenAlex[0]?.title || 'Aucun résultat pertinent';
  const titreCrossref = resultatsCrossref[0]?.title?.[0] || 'Aucun résultat pertinent';
  const titreWikidata = resultatsWikidata[0]?.label || 'Aucune entité trouvée';
  const titreOpenLibrary = 'Aucun ouvrage trouvé';

  // Date du jour pour la page
  const dateDuJour = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calcul du score de documentation
  const scoreDocumentation = Math.min(
    (nbOpenAlex > 0 ? 25 : 0) +
    (nbCrossref > 0 ? 25 : 0) +
    (nbWikidata > 0 ? 25 : 0) +
    (nbOpenLibrary > 0 ? 25 : 0),
    100
  );

  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Radar de trafic IA par domaine — Démonstration</title>
  <style>
    :root {
      --fond: #f5f5f5;
      --texte: #1a1a1a;
      --accent: #2563eb;
      --carte: #ffffff;
      --bordure: #e0e0e0;
      --succes: #16a34a;
      --avertissement: #d97706;
      --erreur: #dc2626;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --fond: #1a1a1a;
        --texte: #f0f0f0;
        --accent: #60a5fa;
        --carte: #2d2d2d;
        --bordure: #404040;
        --succes: #4ade80;
        --avertissement: #fbbf24;
        --erreur: #f87171;
      }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--fond);
      color: var(--texte);
      line-height: 1.6;
      padding: 1rem;
    }
    .conteneur {
      max-width: 900px;
      margin: 0 auto;
    }
    .banniere {
      background: linear-gradient(135deg, var(--accent), #7c3aed);
      color: white;
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 1.5rem;
    }
    .banniere h1 {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
    }
    .banniere p {
      font-size: 0.95rem;
      opacity: 0.95;
    }
    .carte {
      background: var(--carte);
      border: 1px solid var(--bordure);
      border-radius: 12px;
      padding: 1.25rem;
      margin-bottom: 1.25rem;
    }
    .carte h2 {
      font-size: 1.15rem;
      margin-bottom: 1rem;
      color: var(--accent);
      border-bottom: 2px solid var(--bordure);
      padding-bottom: 0.5rem;
    }
    .score {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .score-valeur {
      font-size: 2.5rem;
      font-weight: bold;
      color: var(--accent);
    }
    .score-barre {
      flex: 1;
      height: 12px;
      background: var(--bordure);
      border-radius: 6px;
      overflow: hidden;
    }
    .score-remplissage {
      height: 100%;
      background: var(--accent);
      border-radius: 6px;
      transition: width 0.5s;
    }
    .etat {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .etat-succes { background: var(--succes); color: white; }
    .etat-avertissement { background: var(--avertissement); color: white; }
    .etat-erreur { background: var(--erreur); color: white; }
    .liste-sources {
      list-style: none;
      padding: 0;
    }
    .liste-sources li {
      padding: 0.75rem;
      border-bottom: 1px solid var(--bordure);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
    .liste-sources li:last-child { border-bottom: none; }
    .source-nom {
      font-weight: 600;
      flex: 1;
    }
    .source-detail {
      font-size: 0.85rem;
      color: var(--texte);
      opacity: 0.8;
      text-align: right;
    }
    .date-donnees {
      font-size: 0.85rem;
      color: var(--texte);
      opacity: 0.7;
      margin-bottom: 1rem;
    }
    .mention {
      text-align: center;
      font-size: 0.8rem;
      color: var(--texte);
      opacity: 0.6;
      margin-top: 2rem;
      padding: 1rem;
      border-top: 1px solid var(--bordure);
    }
    .avertissement {
      background: rgba(217, 119, 6, 0.1);
      border-left: 4px solid var(--avertissement);
      padding: 1rem;
      border-radius: 0 8px 8px 0;
      margin: 1rem 0;
    }
    .apercu {
      background: rgba(37, 99, 235, 0.05);
      border: 1px dashed var(--accent);
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
    }
    @media (max-width: 600px) {
      body { padding: 0.5rem; }
      .banniere { padding: 1rem; }
      .carte { padding: 1rem; }
      .liste-sources li { flex-direction: column; align-items: flex-start; }
      .source-detail { text-align: left; }
    }
  </style>
</head>
<body>
  <div class="conteneur">
    <div class="banniere">
      <h1>Radar de trafic IA par domaine</h1>
      <p>Qui reçoit les clients de ChatGPT ? — Démonstration de faisabilité</p>
    </div>

    <div class="date-donnees">
      Données compilées le ${echapper(dateDuJour)} — Les résultats proviennent de requêtes publiques en temps réel.
    </div>

    <div class="carte">
      <h2>État de l'art — Documentation du sujet</h2>
      <div class="score">
        <div class="score-valeur">${scoreDocumentation}%</div>
        <div class="score-barre">
          <div class="score-remplissage" style="width: ${scoreDocumentation}%"></div>
        </div>
      </div>
      <p>
        Score de documentation basé sur la présence de résultats dans les quatre sources interrogées.
        ${scoreDocumentation === 100 ? '<span class="etat etat-succes">Sujet bien documenté</span>' : 
          scoreDocumentation >= 50 ? '<span class="etat etat-avertissement">Documentation partielle</span>' : 
          '<span class="etat etat-erreur">Documentation insuffisante</span>'}
      </p>
    </div>

    <div class="carte">
      <h2>Résultats par source</h2>
      <ul class="liste-sources">
        <li>
          <span class="source-nom">OpenAlex</span>
          <span class="source-detail">
            ${nbOpenAlex > 0 ? '1 résultat trouvé' : 'Aucun résultat'} — Date : ${echapper(dateOpenAlex)}<br>
            <small>${echapper(titreOpenAlex)}</small>
          </span>
        </li>
        <li>
          <span class="source-nom">Crossref</span>
          <span class="source-detail">
            ${nbCrossref > 0 ? '1 résultat trouvé' : 'Aucun résultat'} — Date : ${echapper(dateCrossref)}<br>
            <small>${echapper(titreCrossref)}</small>
          </span>
        </li>
        <li>
          <span class="source-nom">Wikidata</span>
          <span class="source-detail">
            ${nbWikidata > 0 ? 'Entité trouvée' : 'Aucune entité'} — Date : ${echapper(dateWikidata)}<br>
            <small>${echapper(titreWikidata)}</small>
          </span>
        </li>
        <li>
          <span class="source-nom">Open Library</span>
          <span class="source-detail">
            ${nbOpenLibrary > 0 ? 'Ouvrage trouvé' : 'Aucun ouvrage'} — Date : ${echapper(dateOpenLibrary)}<br>
            <small>${echapper(titreOpenLibrary)}</small>
          </span>
        </li>
      </ul>
    </div>

    <div class="carte">
      <h2>Honnêteté des données</h2>
      <div class="avertissement">
        <strong>Important :</strong> Aucune API publique ne fournit actuellement les recommandations réelles de ChatGPT.
        Les données ci-dessus documentent l'existence du sujet dans la littérature scientifique et les bases de connaissances,
        mais ne mesurent pas le trafic réel généré par les IA génératives.
      </div>
      <p>
        Cette démonstration prouve que le sujet est réel et documenté, mais qu'il manque encore une source publique
        pour mesurer les recommandations réelles. Le produit final nécessitera des données propriétaires ou un accès API spécifique.
      </p>
    </div>

    <div class="carte">
      <h2>Aperçu du produit final</h2>
      <div class="apercu">
        <p><strong>Ce que le tableau de bord complet offrira :</strong></p>
        <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
          <li>Classement en temps réel des domaines recommandés par ChatGPT</li>
          <li>Analyse comparative par secteur d'activité</li>
          <li>Suivi historique des recommandations</li>
          <li>Alertes personnalisées sur les changements de trafic</li>
        </ul>
        <p style="margin-top: 0.75rem; font-size: 0.9rem; opacity: 0.8;">
          Ces fonctionnalités nécessiteront un accès aux données des modèles de langage, actuellement indisponible via les API publiques.
        </p>
      </div>
    </div>

    <div class="carte">
      <h2>Sources</h2>
      <ul class="liste-sources">
        <li>
          <span class="source-nom">OpenAlex recherche mondiale</span>
          <span class="source-detail">Licence : CC0</span>
        </li>
        <li>
          <span class="source-nom">Crossref</span>
          <span class="source-detail">Licence : métadonnées ouvertes</span>
        </li>
        <li>
          <span class="source-nom">Wikidata</span>
          <span class="source-detail">Licence : CC0</span>
        </li>
        <li>
          <span class="source-nom">Open Library</span>
          <span class="source-detail">Licence : CC0 pour les données</span>
        </li>
      </ul>
    </div>

    <div class="mention">
      Démonstration : produit en préparation
    </div>
  </div>
</body>
</html>`;
}