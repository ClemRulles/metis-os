# Opportunités du 2026-11-02

762 textes réels lus → 431 douleurs → 1144 gisements, plus 12 gisements du marché des agents (948 outils payants observés) et 24 failles calculées (14 transplants vérifiés). 793 idées générées, 607 critiquées, 80 duels, 15 enquêtes web. Coût : 0.458 $ en 1848 appels, 29 min.

Classement fondé sur les preuves (douleur ou faille mesurée, prix lu sur la page ou paiement observé, espace libre, originalité mesurée contre le réflexe d'un assistant IA, élan sur 90 jours, risque) ; l'avis des IA pèse 18 %.

## 1. API Sémantique GitHub Issues
**Score 7.36 / 10** · douleur 8.0 · paiement 9 · espace 7.0 · élan 5.3 · critique 7.5 · tournoi 8.0 · risque 5 — donnees-et-api, née d'une faille calculée (mieux-que-le-paye)

- **Problème :** Les développeurs et autres agents IA ont besoin de comprendre la *réalité* du statut d'un projet (votes, sentiments, blocages) bien au-delà des simples statuts 'open/closed' fournis par l'API standard, pour prioriser leurs propres builds ou contributions.
- **Pour qui :** Autres agents IA, outils d'analyse de code, chefs de produit techniques.
- **Solution :** Un endpoint API RapidAPI qui agrège, classe et indexe les tickets GitHub par popularité, ancienneté et sentiment communautaire, offrant des données structurées prêtes à l'emploi pour les scripts automatisés.
- **Valeur pour la société :** Optimiser l'allocation des ressources logicielles mondiales en connectant directement les besoins des utilisateurs aux projets les plus demandés mais négligés.
- **Canal :** place-de-marche-api — premiers clients : Développeurs de bots GitHub ou d'outils de veille technique postulant sur Hacker News.
- **Revenu :** Abonnement mensuel ou pay-per-call sur RapidAPI. (29)
- **Premier test :** Publier la spécification OpenAPI de l'endpoint sur RapidAPI avec 10 requêtes gratuites. Vérifier si des développeurs l'ajoutent à leur watchlist.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin ; 3 outils payants utilisés sur le marché des agents
- **Originalité mesurée :** 6.88/10
  - Marché des agents : [RAG Web Browser](https://apify.com/apify/rag-web-browser) — 32568 utilisateurs/30 j, 0.00228 $ par Fetched page
  - Marché des agents : [Google News Scraper](https://apify.com/lhotanova/google-news-scraper) — 250 utilisateurs/30 j, 0.002 $ par News result
  - Marché des agents : [G2 Reviews Scraper Real-Time (2026)](https://apify.com/zen-studio/g2-reviews-scraper) — 175 utilisateurs/30 j, 0.00649 $ par Review scraped
  - Serveurs MCP déjà publiés sur ce besoin : 0
- **Élan :** ×1.09 sur 90 jours — « github issues » HN 144 contre 134, GitHub 5667 contre 4346 ; « sentiment analysis » HN 52 contre 57
- **Faille :** Faille (fonction réclamée, jamais faite) : microsoft/vscode : Allow to change the font size and font of the workbench
  - [GitHub](https://github.com/microsoft/vscode/issues/519) — At the moment, we can only change the font size / font of the editor. If we want to change the font size, we need to use a roundabout method of "zooming in / ou
- **Enquête :** verdict creuser — Le besoin est documenté (les agents ont besoin de plus que du statut binaire et du RAG sémantique) et aucun concurrent direct n'apparaît, mais aucune preuve que quelqu'un paie déjà pour ce type de données ni de prix de référence : il faut valider la willingness-to-pay via le test RapidAPI avant d'investir.
  - Concurrents : aucun trouvé
  - Qui paie déjà : Aucune offre payante couvrant exactement ce besoin n'apparaît dans les résultats de recherche. Les équipes paient déjà GitHub Copilot (agent consommant les issues) et des outils de recherche IA d'entreprise comme Glean, mais pas pour une API d'analyse sémantique des issues en tant que telle.
  - Angle libre : Aucun concurrent identifié dans les résultats : le créneau d'une API clé-en-main qui score les issues GitHub (popularité, sentiment, blocages) pour consommation automatisée par agents est vacant — l'angle libre est la donnée structurée 'prête à scripter' (endpoint unique, pas un outil à installer), là où les existants sont des assistants intégrés à un IDE ou des plateformes de recherche internes.
  - Risque juridique : moyen — Dépendance totale aux API GitHub (rate limits, conditions d'utilisation sur la republication de données et l'analyse de contenu utilisateur) et à la marketplace RapidAPI ; pas de risque légal majeur mais un risque de plateforme fort.
- **Faille :** La valeur repose uniquement sur l'agrégation de données publiques. Un LLM avancé ou un scraper sophistiqué pourrait reproduire une grande partie de cette fonctionnalité sans passer par une API dédiée, rend la barrière à l'entrée trop faible.
- **Mutation proposée :** Dépasser la simple agrégation de données pour fournir une 'prédiction de résolution' ou un 'score de santé du projet' basé sur les métriques agrégées (taux de réponse vs. volume de votes, vélocité des commentaires, etc.), transformant l'API d'un simple flux de données en un outil de prise de décision stratégique.

## 2. Outil de test automatique de compatibilité des dépendances alternatives
**Score 6.75 / 10** · douleur 6.9 · paiement 4 · espace 7.0 · élan 7.3 · critique 7.7 · tournoi 8.0 · risque 10 — donnees-et-api, née d'une faille calculée (transplant-adapte)

- **Problème :** Les développeurs qui veulent remplacer CRA par une alternative moderne (Vite, Next.js, etc.) ne savent pas si leurs bibliothèques seront compatibles.
- **Pour qui :** Équipes de développement qui évaluent des migrations et veulent un rapport de compatibilité avant de s'engager.
- **Solution :** Un agent IA qui analyse les dépendances d'un projet CRA, teste leur compatibilité avec plusieurs frameworks modernes, et produit un tableau comparatif avec les risques.
- **Valeur pour la société :** Réduit les erreurs de migration et les régressions, améliorant la fiabilité des applications web.
- **Canal :** place-de-marche-api — premiers clients : Développeurs sur GitHub qui cherchent à migrer et laissent des commentaires dans les issues de CRA.
- **Revenu :** Paiement à l'usage via API, facturé par analyse de dépôt. (5.99)
- **Premier test :** Mettre en ligne une API gratuite pour les 100 premières analyses, puis activer le paiement avec un seuil de requêtes.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin
- **Originalité mesurée :** 6.3/10
  - Serveurs MCP déjà publiés sur ce besoin : 0
- **Élan :** ×1.9 sur 90 jours — « dependency compatibility » HN 0 contre 1, GitHub 130 contre 67 ; « CRA migration » HN 0 contre 0
- **Faille :** Faille (logiciel très utilisé, abandonné) : react/create-react-app : Set up a modern web app by running one command.
  - [GitHub](https://github.com/react/create-react-app) — Set up a modern web app by running one command.
- **Enquête :** verdict creuser — Le problème est réel et documenté mais aucune preuve de paiement pour ce besoin précis n'a été trouvée : à valider via les 100 analyses gratuites avant d'activer le paiement à 5,99 €.
  - Concurrents : [TestSprite](https://www.testsprite.com/use-cases/fr/ai-contract-testing-tool) (prix ?, ressemblance 3/10)
  - Qui paie déjà : Aucune offre payante identifiée dans les résultats pour ce besoin précis ; les équipes paient aujourd'hui des outils généralistes (Dependabot, GitHub Advanced Security, agents de migration comme GitHub Copilot App Modernization) mais rien pour un rapport de compatibilité CRA→frameworks modernes.
  - Angle libre : Un rapport comparatif multi-frameworks (Vite, Next.js, Remix) avec scoring de risque par dépendance, généré automatiquement avant engagement de migration — les outils existants font des PR de migration (Copilot, Dependabot) mais pas d'évaluation comparative a priori.
  - Risque juridique : faible — Analyse technique de dépendances open source, sans données personnelles ni contenu protégé redistribué.
- **Faille :** La complexité de l'écosystème JavaScript rend le test de compatibilité universel extrêmement difficile. Un seul changement de version ou une interaction subtile entre deux dépendances peut invalider le test, menaçant la fiabilité du rapport.
- **Mutation proposée :** Limiter l'offre initiale à un 'Score de Risque de Migration' basé sur une base de données de changements de breaking changes connus des frameworks cibles (ex: Next.js 13 vs 14), plutôt qu'un test d'exécution complet, ce qui est plus rapide à maintenir et plus facile à monétiser.

## 3. LocalPermit Scout
**Score 6.33 / 10** · douleur 7.6 · paiement 3 · espace 7.0 · élan 5.1 · critique 7.6 · tournoi 8.0 · risque 10 — local-et-territoire, née d'une douleur réelle

- **Problème :** Les particuliers veulent savoir si un projet (clôture, abri de jardin) est autorisé dans leur rue mais doivent parcourir des documents PDF incompréhensibles des communes.
- **Pour qui :** Propriétaires et locataires souhaitant faire des travaux légers.
- **Solution :** Moteur de recherche sémantique sur les PLU (Plans Locaux d'Urbanisme) et arrêtés municipaux : posez une question naturelle (« Puis-je mettre une pergola de 10m² ? ») et obtenez la réponse exacte avec citation de l'article.
- **Valeur pour la société :** Démocratise l'accès à l'information urbaine et réduit les erreurs coûteuses de construction non conforme.
- **Canal :** seo-programmatique — premiers clients : Pages SEO générées automatiquement pour chaque commune + « Permis de construire [NomCommune] ».
- **Revenu :** Abonnement léger ou paiement à la requête approfondie. (1.90)
- **Premier test :** Scanner les données ouvertes de 3 grandes villes francophones, créer 10 pages cibles et lancer 50€ de pub Facebook locale ciblant les propriétaires.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin ; 5 personnes disent payer déjà
- **Originalité mesurée :** 5/10 — proche de l'idée réflexe « Plateforme de financement participatif pour projets climatiques »
- **Élan :** ×1.02 sur 90 jours — « zoning rules » HN 20 contre 21, GitHub 8 contre 11 ; « building permit » HN 11 contre 7
- **Preuve de terrain :** gisement « Support client inaccessible en cas de bug applicatif », 23 mentions (App Store fr, App Store be, App Store us, Hacker News)
  - « l'appli me donne une erreur à chaque fois que j'essaye de créer un compte » — [App Store be](https://apps.apple.com/be/app/action/id1531860284?uo=2)
  - « App gets stuck a few times a week... Reporting the problem in the lesson doesn’t help. » — [App Store be](https://apps.apple.com/be/app/duolingo-language-chess/id570060128?uo=2)
  - « App gets stuck a few times a week when I provide the correct answer but it keeps saying it is wrong » — [App Store be](https://apps.apple.com/be/app/duolingo-language-chess/id570060128?uo=2)
- **Enquête :** verdict creuser — Le problème est documenté et l'angle sémantique est libre, mais aucune offre payante ni concurrent ne prouve que quelqu'un est prêt à payer 1,90 € pour cette information gratuite ailleurs.
  - Concurrents : aucun trouvé
  - Qui paie déjà : Aucun produit payant identifié dans les résultats de recherche : les particuliers s'informent via le service-public.gouv.fr, les sites de mairies et des blogs gratuits. Personne ne paie aujourd'hui pour cette réponse.
  - Angle libre : Réponse naturelle avec citation exacte de l'article du PLU (article, zone, seuil) et alerte sur les secteurs protégés — aucun concurrent n'offre un moteur sémantique par question sur les PLU
  - Risque juridique : faible — Redistribution d'informations réglementaires publiques (données ouvertes, documents officiels) avec citations ; pas de conseil juridique si la réponse reste descriptive et renvoie vers la mairie
- **Faille :** Le risque principal réside dans l'interprétation juridique des documents. Les PLU sont souvent ambigus, contradictoires ou nécessitent une connaissance contextuelle (ex: zones protégées, servitudes) qu'un RAG simple ne peut garantir. Une réponse 'techniquement correcte' mais juridiquement incomplète expose l'utilisateur et le service à un risque de non-conformité coûteux.
- **Mutation proposée :** Intégrer un système de qualification de la réponse (ex: 'Information générale basée sur l'article X. Ceci ne constitue pas un conseil juridique. Consultez un professionnel local pour la validation finale.') et développer un modèle de service à deux niveaux : une réponse gratuite/basique et une 'Vérification Contextuelle' payante qui croise les données du PLU avec les cartes de zonage officielles.

## 4. ReviewPulse Alerts : Veille Concurrentielle Automatisée
**Score 6 / 10** · douleur 6.1 · paiement 4 · espace 4.0 · élan 4.6 · critique 7.4 · tournoi 8.0 · risque 10 — createurs, née du marché des agents (agent-client)

- **Problème :** Les créateurs de produits ignorent ce que les concurrents entendent jusqu'à ce que la crise éclate publiquement.
- **Pour qui :** Marques indépendantes et artisans lançant de nouveaux produits physiques.
- **Solution :** Service qui surveille les nouveautés des produits concurrents et alerte sur les sentiments négatifs récurrents avant le lancement.
- **Valeur pour la société :** Incite à l'amélioration continue de la qualité des produits consommables.
- **Canal :** communautes — premiers clients : Groupes Discord de 'Maker' et forums Reddit r/nosleep (pour fiction) ou r/entrepreneur.
- **Revenu :** Pay-per-alert sur crédit prépayé. (29 € pour 50 alertes)
- **Premier test :** Poster un thread utile sur Hacker News analysant un cas concret avec des screenshots de l'outil.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin
- **Originalité mesurée :** 6.97/10
  - Marché des agents : [Amazon Reviews Scraper](https://apify.com/junglee/amazon-reviews-scraper) — 2491 utilisateurs/30 j, 0.006 $ par Review
  - Marché des agents : [Leboncoin Monitoring Scraper](https://apify.com/saswave/advanced-leboncoin-scraper) — 30 utilisateurs/30 j, 0.0015 $ par result
  - Marché des agents : [Competitive Intelligence Agent](https://apify.com/apify/competitive-intelligence-agent) — 6 utilisateurs/30 j, 0.007 $ par Single Competitor AI Analysis
- **Élan :** ×0.89 sur 90 jours — « competitive intelligence » HN 1 contre 10, GitHub 542 contre 679 ; « social listening » HN 6 contre 6
- **Preuve de terrain :** Marché des agents : Amazon Reviews Scraper — outil payé par 2491 utilisateurs en 30 jours
- **Enquête :** verdict creuser — Le besoin est réel et prouvé, mais le marché est saturé d'outils généralistes ; il faut vérifier que le segment artisans/marques indépendantes paie réellement pour ce niveau de veille.
  - Concurrents : [Meltwater Social Listening](https://www.meltwater.com/fr/capabilities/social-listening) (prix ?, ressemblance 7/10) ; [Brand24 (outils de surveillance des concurrents)](https://brand24.com/blog/fr/outils-de-surveillance-des-concurrents) (prix ?, ressemblance 7/10) ; [Cikski](https://decisionia.com/outils-ia-veille-concurrentielle-entreprises) (prix ?, ressemblance 6/10) ; [Emplifi (social listening autonome IA)](https://emplifi.io/fr/resources/ai-and-social-listening-for-trends/) (prix ?, ressemblance 6/10)
  - Qui paie déjà : Les entreprises paient déjà des outils de social listening et de veille concurrentielle (Meltwater, Brand24, Cikski), mais les prix exacts ne figurent pas sur les pages trouvées.
  - Angle libre : Aucun concurrent trouvé ne cible spécifiquement les marques indépendantes et artisans de produits physiques avec des alertes sur les sentiments négatifs récurrents avant un lancement, à un prix micro (29 €).
  - Risque juridique : faible — Surveiller des informations publiques (avis, réseaux sociaux) est légal ; seule une vigilance sur les CGU des plateformes scrapées est nécessaire.
- **Faille :** Le risque juridique et opérationnel lié au scraping massif de données de concurrentiels est la faille principale. De plus, le 'sentiment négatif' est souvent subjectif et nécessite une contextualisation fine pour être réellement exploitable par un créateur.
- **Mutation proposée :** Transformer le service d'une simple 'alerte' (signal) en un 'rapport d'impact' (insight) en structurant les données par attribut de produit (ex: 'le plastique est fragile' vs 'le design est laid') et en intégrant un filtre de pertinence basé sur la taille de l'échantillon de critiques.

## 5. JobMatch IA
**Score 5.99 / 10** · douleur 6.0 · paiement 8 · espace 5.0 · élan 5.2 · critique 7.2 · tournoi 6.0 · risque 0 — travail-et-carrieres, née du marché des agents (besoin-final)

- **Problème :** Les chercheurs d'emploi passent des heures à trier des offres Indeed peu pertinentes ; le scraper existant est mal noté (3,01) car il livre des listings bruts sans valeur ajoutée.
- **Pour qui :** Demandeurs d'emploi actifs sur Indeed, en France et pays francophones.
- **Solution :** Un agent IA qui, à partir d'une requête, scrape les offres Indeed via l'API Apify, puis les classe automatiquement par pertinence, compétences requises, salaire estimé et localisation, en générant un rapport personnalisé envoyé par e-mail.
- **Valeur pour la société :** Réduit le temps de recherche d'emploi et le stress lié à la surcharge d'information, en rapprochant plus vite les talents des postes adaptés.
- **Canal :** seo-programmatique — premiers clients : Poster sur les groupes Facebook « Recherche d'emploi en France » et sur le forum « Les Forums de l'Emploi ».
- **Revenu :** Vente à l'unité d'un rapport personnalisé (5 €) ou abonnement mensuel (15 € pour 5 rapports). (5)
- **Premier test :** Créer une page web simple avec un formulaire (titre de poste, ville) ; envoyer le premier rapport à 10 demandeurs d'emploi recrutés via un post ciblé, leur demander un paiement PayPal de 5 €.
- **Preuve de paiement :** 1 prix lus sur la page, 1 offres payantes du même besoin
- **Originalité mesurée :** 7.22/10
  - Marché des agents : [Indeed Scraper](https://apify.com/misceres/indeed-scraper) — 2050 utilisateurs/30 j, 0.006 $ par Job listing
  - Marché des agents : [💡 Indeed Jobs Scraper](https://apify.com/valig/indeed-jobs-scraper) — 5125 utilisateurs/30 j, 0.0001 $ par result
  - Marché des agents : [Indeed Jobs Scraper | Remove Duplicate Jobs](https://apify.com/cheap_scraper/indeed-job-scraper) — 174 utilisateurs/30 j, 0.001 $ par Result
- **Élan :** ×1.05 sur 90 jours — « job search » HN 88 contre 97, GitHub 7983 contre 6626 ; « job scraping » HN 0 contre 0
- **Preuve de terrain :** Marché des agents : Indeed Scraper — outil payé par 2050 utilisateurs en 30 jours
- **Enquête :** verdict creuser — L'angle B2C francophone avec rapport IA est réel mais le socle technique repose sur du scraping d'Indeed à revendre, juridiquement risqué, et aucune preuve de demande payante côté demandeurs d'emploi n'a été trouvée.
  - Concurrents : [Indeed Scraper (Apify)](https://apify.com/automation-lab/indeed-scraper) (0,003 $ par listing + 0,005 $ par run (1 000 offres ≈ 3,01 $), ressemblance 7/10) ; [Indeed Jobs Scraper (orgupdate)](https://apify.com/orgupdate/indeed-jobs-scraper) (pay-per-event (prix exact non affiché), ressemblance 6/10) ; [Indeed Jobs Scraper (factden)](https://apify.com/factden/indeed-jobs-scraper) (pay-per-event (prix exact non affiché), ressemblance 6/10) ; [Indeed Jobs Scraper (schnellscrapers)](https://apify.com/schnellscrapers/indeed-jobs-scraper/input-schema) (pay-per-event (prix exact non affiché), ressemblance 5/10)
  - Qui paie déjà : Les recruteurs, cabinets de staffing et coachs carrière paient déjà pour ces scrapers Apify ; on ne trouve pas dans les résultats de preuve que des demandeurs d'emploi paient individuellement pour du tri d'offres. ([preuve](https://apify.com/automation-lab/indeed-scraper))
  - Angle libre : La couche IA de filtrage et le rapport e-mail personnalisé pour le demandeur d'emploi final — tous les concurrents livrent des données brutes aux développeurs et recruteurs, aucun ne s'adresse au chercheur d'emploi en France avec un produit fini clé en main.
  - Risque juridique : eleve — Le scraping d'Indeed contrevient à ses CGU (Indeed poursuit activement les scrapers), et la revente de données issues du scraping à des tiers aggrave l'exposition juridique.
- **Faille :** Le service est une amélioration d'un filtre existant (Indeed) et non une rupture. La valeur est fragile car elle dépend entièrement de la qualité du scraping et de la persistance de l'API Apify. De plus, la distribution organique sur les groupes Facebook est un canal à faible conversion et très saturé.
- **Mutation proposée :** Transformer le rapport de simple 'liste filtrée' en 'stratégie de candidature'. L'agent IA doit analyser le CV de l'utilisateur (fourni par lui) et, pour chaque offre, fournir un 'Score de Match' précis, une liste des 'Compétences Manquantes' par rapport au poste, et suggérer les mots-clés à utiliser dans la lettre de motivation pour maximiser les chances de passage au recrutement.

## Suivantes
6. **Radar Droits Scolaire + Handicap** (5.98) — Les droits (AESH, aménagements d'examens, transports spécialisés) dépendent de circulaires qui changent sans prévenir ; les parents découvrent leurs droits après la date limite.
7. **Cartographie des pièges payants des apps** (5.95) — Les abonnements d'essai gratuits qui se transforment en prélèvements coûteux sont le piège n°1 des apps gratuites, et chaque utilisateur l'apprend à ses dépens.
8. **SkillGap Analyzer: Comparateur de Postes pour Freelances** (5.87) — Les freelances ne savent pas quels skills sont demandés pour passer au niveau supérieur ou changer de niche.
9. **SubCancel : Le Nettoyage Intelligent des Abonnements Oubliés** (5.84) — Les ménages paient pour des abonnements oubliés (streaming, logiciels, apps) qui se renouvellent automatiquement. Trouver ces abonnements dans ses relevés bancaires et les résilier est fastidieux et souvent décourageant.
10. **AuthMatrix : Audit de Compatibilité OAuth** (5.8) — Les utilisateurs ne peuvent connecter que Gmail/Outlook car les intégrations tierces gèrent mal les autres fournisseurs (Yahoo, Proton, comptes corporate), créant des barrières d'accès injustes.

## Gisements les plus forts
- **Abus des abonnements mobiles** — 61 mentions (1 aujourd'hui), 4 sources, force 18.048
- **Service client défaillant après paiement** — 19 mentions (2 aujourd'hui), 5 sources, force 14.187
- **Tarification abusive des contenus numériques** — 75 mentions (0 aujourd'hui), 4 sources, force 14.156
- **Résiliation d'abonnement impossible** — 35 mentions (0 aujourd'hui), 3 sources, force 12.643
- **Outils utilitaires et de développement manquants** — 84 mentions (40 aujourd'hui), 5 sources, force 11.868
- **Remboursements et compensations de livraison non honorés** — 27 mentions (4 aujourd'hui), 3 sources, force 11.495
- **Problèmes de performance des applications mobiles** — 53 mentions (5 aujourd'hui), 4 sources, force 11.137
- **Non-remboursement en cas de vol par le livreur** — 14 mentions (7 aujourd'hui), 3 sources, force 9.801
- **Retards de livraison imprévisibles** — 23 mentions (6 aujourd'hui), 3 sources, force 9.68
- **Support client inaccessible en cas de bug applicatif** — 23 mentions (1 aujourd'hui), 4 sources, force 9.395
- **Qualité dégradée des livraisons de repas** — 12 mentions (2 aujourd'hui), 4 sources, force 8.653
- **Frais de services cachés et perçus comme abusifs** — 18 mentions (2 aujourd'hui), 4 sources, force 8.555

## Santé
- Sources : hn 53 ; hn_achat 59 ; appstore 1546 ; stackexchange 180 ; lemmy 150
- qwen : 354 ok, 1 échecs (0 %), 9385 ms — réponse illisible (fin : stop) : []
- deepseek : 341 ok, 0 échecs (0 %), 10135 ms
- mercury : 119 ok, 208 échecs (64 %), 11067 ms — aucun fournisseur pour mercury (openrouter : HTTP 429 ; groq : clé absente)
- glm : 352 ok, 4 échecs (1 %), 7374 ms — réponse illisible (fin : stop) : {"idees": [2, 1, 4, 3, 5]}
- mistral : 23 ok, 3 échecs (12 %), 31114 ms — aucun fournisseur pour mistral (openrouter : HTTP 429 ; groq : clé absente)
- Atlas vivant : 24/36 API répondent (muettes : seismes, eonet, openfoodfacts, essais-cliniques, openfda, osm, gdelt, solaire, eurostat, gutendex, openverse, nasa-apod)
- Étapes : radar 342 s (cumul 0.0305 $) ; marche 6 s (cumul 0.0305 $) ; atlas 25 s (cumul 0.0305 $) ; failles 232 s (cumul 0.1228 $) ; usine 993 s (cumul 0.3752 $) ; enquete 29 s (cumul 0.4581 $) ; elan 96 s (cumul 0.4581 $)