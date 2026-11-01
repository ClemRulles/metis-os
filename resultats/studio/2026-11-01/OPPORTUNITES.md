# Opportunités du 2026-11-01

761 textes réels lus → 446 douleurs → 607 gisements, plus 12 gisements du marché des agents (958 outils payants observés). 670 idées générées, 493 critiquées, 80 duels, 15 enquêtes web. Coût : 0.377 $ en 983 appels, 21 min.

Classement fondé sur les preuves (douleur réelle, prix lu sur la page ou paiement observé sur le marché, espace libre, élan sur 90 jours, risque) ; l'avis des IA pèse environ 30 %.

## 1. Veille Salaire Frontalier : comparateur de rémunérations transfrontalières
**Score 7.16 / 10** · douleur 7.0 · paiement 9 · espace 7.0 · élan 5.0 · critique 7.9 · tournoi 6.0 · risque 5 — travail-et-carrieres, née du marché des agents (besoin-final)

- **Problème :** Les scrapers Indeed donnent des salaires rarement, et les frontaliers ignorent combien ils devraient demander.
- **Pour qui :** Travailleurs frontaliers Belgique-Luxembourg et employeurs locaux qui veulent rester compétitifs.
- **Solution :** Un site qui croise les offres Indeed (API) avec les données salariales publiques des conventions collectives et des statistiques nationales pour afficher des fourchettes réalistes par métier et zone frontalière.
- **Valeur pour la société :** Favorise la transparence salariale et réduit les inégalités entre pays voisins.
- **Canal :** seo-programmatique — premiers clients : Dans les groupes LinkedIn de frontaliers et via les associations locales de travailleurs frontaliers.
- **Revenu :** Accès premium aux rapports détaillés par entreprise (téléchargement PDF). (5.99)
- **Premier test :** Générer 100 pages SEO pour 20 métiers × 5 zones, puis offrir un rapport premium à 10 frontaliers qui contactent le site via un formulaire.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin ; 1 outils payants utilisés sur le marché des agents ; 2062 personnes disent payer déjà
  - Marché des agents : [Indeed Scraper](https://apify.com/misceres/indeed-scraper) — 2062 utilisateurs/30 j, 0.006 $ par Job listing
- **Élan :** pas assez de signal — « cross border salary comparison » HN 0 contre 0, GitHub 0 contre 0 ; « frontalier salary Luxembourg » HN 0 contre 0
- **Preuve de terrain :** Marché des agents : Indeed Scraper — outil payé par 2062 utilisateurs en 30 jours
- **Enquête :** verdict creuser — Demande forte et public massif (47 % de l'emploi luxembourgeois est frontalier), mais aucun concurrent ni offre payante trouvé dans la recherche : il faut valider la volonté de payer à 5,99 € et la faisabilité légale du scraping Indeed avant de foncer.
  - Concurrents : aucun trouvé
  - Qui paie déjà : Aucune offre payante identifiée dans les résultats de recherche pour ce besoin précis ; les frontaliers consultent gratuitement les statistiques Insee/ADEM et les sites d'emploi.
  - Angle libre : Croiser les fourchettes de conventions collectives luxembourgeoises/belges avec les offres d'emploi réelles par zone frontalière — aucun des résultats trouvés (statistiques publiques, rapports ADEM/LISER) n'offre un comparateur interactif par métier et par zone.
  - Risque juridique : moyen — Scraping de l'API Indeed et réutilisation de données salariales : conditions d'utilisation d'Indeed et RGPD à vérifier ; les données publiques statistiques sont réutilisables mais le scraping d'offres est une zone grise.
- **Faille :** La dépendance aux scrapings de données (Indeed) est fragile et potentiellement contraire aux conditions d'utilisation des plateformes. De plus, la valeur repose entièrement sur la qualité de la corrélation entre données de marché (Indeed) et données légales (conventions), un travail de curation extrêmement complexe et risqué.
- **Mutation proposée :** Ne pas se contenter de croiser les données, mais créer un 'Score de compétitivité salariale' par métier. L'agent IA doit non seulement comparer, mais aussi évaluer le risque de sous-rémunération par rapport aux standards légaux et aux moyennes sectorielles, transformant le comparateur passif en un outil d'aide à la négociation proactif.

## 2. Lettre de libération — générateur légal de résiliation conforme
**Score 6.86 / 10** · douleur 7.9 · paiement 9 · espace 3.0 · élan 5.0 · critique 7.6 · tournoi 8.0 · risque 5 — petits-vendeurs, née d'une douleur réelle

- **Problème :** Les indépendants et petits commerçants sont souvent engagés dans des abonnements logiciels ou services qu'ils ne peuvent pas résilier facilement, et perdent de l'argent.
- **Pour qui :** Les indépendants belges et français qui utilisent des outils SaaS (facturation, comptabilité, marketing) et veulent changer de fournisseur sans litige.
- **Solution :** Un service en ligne où l'utilisateur entre le nom du service, son contrat, et la raison de la résiliation ; l'agent génère une lettre recommandée électronique conforme au droit belge/français, l'envoie au service client, et archive la preuve d'envoi.
- **Valeur pour la société :** Protège les petits entrepreneurs contre les clauses abusives et leur permet de mieux gérer leurs coûts fixes.
- **Canal :** place-de-marche-numerique — premiers clients : 10 indépendants qui publient sur des groupes Facebook « Indépendants Belgique » ou « Freelance France » et qui cherchent à résilier des abonnements à des outils comme Canva ou Adobe.
- **Revenu :** Paiement à l'unité : 9,99 € par lettre de résiliation envoyée et suivie. (9.99)
- **Premier test :** Créer une page Gumroad avec un formulaire simple ; contacter 10 indépendants via des groupes et leur offrir la première lettre gratuite en échange d'un avis ; ensuite leur demander de payer 9,99 € pour une deuxième lettre.
- **Preuve de paiement :** 1 prix lus sur la page, 1 offres payantes du même besoin ; 24 personnes disent payer déjà
- **Élan :** pas assez de signal — « cancel subscription letter » HN 0 contre 0, GitHub 3 contre 0 ; « resiliation abonnement » HN 0 contre 0
- **Preuve de terrain :** gisement « Résiliation d'abonnement impossible », 27 mentions (App Store be, App Store us, App Store fr)
  - « Heb alles geprobeerd om het het abonnement op te zeggen maar geraak er niet vanaf. » — [App Store be](https://apps.apple.com/be/app/kobo-books-audiobooks/id301259483?uo=2)
  - « You can only cancel your subscription through a desktop computer, not through the mobile app. » — [App Store be](https://apps.apple.com/be/app/audible-audiobooks-podcasts/id379693831?uo=2)
  - « ils font des spисания sans préavis du notificationnement! A dans l'application c'est difficile à faire. À cause de cela il est impossible d'obtenir un remboursement » — [App Store be](https://apps.apple.com/be/app/dramawave-dramas-reels/id6670430706?uo=2)
- **Enquête :** verdict creuser — Le besoin est réel et prouvé, mais le marché est déjà occupé par des acteurs européens gratuits ou à ~10 € : seul un angle SaaS B2B belge différencié peut se justifier, à vérifier avant de foncer.
  - Concurrents : [sepastop.eu](https://www.sepastop.eu/fr-fr) (lettres générées gratuitement, envoi payant (prix non affiché dans la source), ressemblance 8/10) ; [resilierabonnement.com](https://resilierabonnement.com/) (10 € par lettre rédigée, ressemblance 7/10) ; [resilier.com (guides + service d'envoi)](https://www.resilier.com/guides/media/resiliation-lindependant) (non affiché dans la source, ressemblance 7/10) ; [JeResilieMonContrat.com (JRMC)](https://www.jeresiliemoncontrat.com/a-propos) (non affiché (B2B, professionnels de l'assurance), ressemblance 5/10)
  - Qui paie déjà : Les consommateurs français paient déjà ~10 € par lettre de résiliation rédigée (resilierabonnement.com) ; sepastop.eu capte le marché européen avec un modèle gratuit/génération + envoi payant. ([preuve](https://resilierabonnement.com/))
  - Angle libre : Se concentrer sur les abonnements SaaS B2B (facturation, comptabilité) avec vérification des conditions contractuelles spécifiques belges et françaises, et l'archivage de la preuve d'envoi comme dossier de litige — aucun concurrent trouvé ne cible spécifiquement les indépendants et leurs outils SaaS en Belgique.
  - Risque juridique : moyen — Concurrents établis depuis 2015 et gratuité croissante (bouton légal de résiliation en 3 clics en France depuis 2023) ; en Belgique, aucune ressource confirmée dans les résultats.
- **Faille :** Le risque juridique est élevé car le service est positionné comme 'légal' et 'conforme'. Si l'IA commet une erreur d'interprétation d'une clause contractuelle ou d'une loi locale (FR/BE), l'utilisateur pourrait subir des conséquences financières ou légales, exposant le service à des risques de responsabilité, même avec des disclaimers. Le service est perçu comme un conseil juridique automatisé.
- **Mutation proposée :** Transformer le service d'un simple 'générateur de lettre' à un 'Analyse de Risque de Résiliation'. L'agent IA doit d'abord analyser le contrat pour fournir un 'Score de Risque' et identifier les clauses pièges (pénalités, préavis abusif, clauses de renouvellement tacite) avant de générer la lettre. Cela passe d'un outil transactionnel à un outil stratégique, augmentant la valeur perçue et justifiant un prix plus élevé.

## 3. Anti-Piège Emploi : détecteur d'arnaques sur les offres Indeed
**Score 6.68 / 10** · douleur 7.0 · paiement 9 · espace 5.0 · élan 7.0 · critique 6.9 · tournoi 10.0 · risque 0 — travail-et-carrieres, née du marché des agents (besoin-final)

- **Problème :** Beaucoup d'offres Indeed sont des arnaques (faux recruteurs, phishing, travail illégal).
- **Pour qui :** Demandeurs d'emploi vulnérables, notamment les jeunes et les personnes âgées en reconversion.
- **Solution :** Un service en ligne où l'utilisateur colle l'URL d'une offre Indeed, et un agent analyse le texte, le nom de l'entreprise et les signaux suspects pour donner un verdict en quelques secondes.
- **Valeur pour la société :** Protège les personnes fragiles contre la fraude et l'exploitation professionnelle.
- **Canal :** communautes — premiers clients : Sur les forums d'entraide (Reddit, groupes Facebook de chômeurs) en proposant l'outil gratuit pour les 10 premiers tests, puis payant.
- **Revenu :** Paiement à l'utilisation : 0,50 € par vérification, forfait illimité pour les centres de formation. (0.5)
- **Premier test :** Tester sur 50 offres suspectes identifiées sur des forums, puis vendre un pack de 20 vérifications à 10 utilisateurs via Gumroad.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin ; 1 outils payants utilisés sur le marché des agents ; 2062 personnes disent payer déjà
  - Marché des agents : [Indeed Scraper](https://apify.com/misceres/indeed-scraper) — 2062 utilisateurs/30 j, 0.006 $ par Job listing
- **Élan :** ×1.76 sur 90 jours — « job scam detector » HN 0 contre 0, GitHub 108 contre 60 ; « fake job posting check » HN 0 contre 0
- **Preuve de terrain :** Marché des agents : Indeed Scraper — outil payé par 2062 utilisateurs en 30 jours
- **Enquête :** verdict creuser — Le problème est réel et documenté, mais le public cible (demandeurs d'emploi vulnérables) est peu enclin à payer 0,50 € quand Indeed et les institutions offrent déjà gratuitement des outils, et le risque juridique (diffamation, marque Indeed, responsabilité) impose un repositionnement prudent avant de foncer.
  - Concurrents : [Indeed (signalement et détection intégrée)](https://support.indeed.com/hc/en-us/articles/360028156452) (gratuit (bouton Signaler, pages d'aide anti-arnaque), ressemblance 6/10) ; [France Travail + cybermalveillance.gouv.fr (guide et signalement)](https://www.francetravail.fr/candidat/soyez-vigilants/fausses-offres-d-emploi.html) (gratuit, ressemblance 5/10) ; [Norton (guide des 17 escroqueries à l'emploi)](https://fr.norton.com/blog/online-scams/job-scams) (gratuit, ressemblance 3/10)
  - Qui paie déjà : Personne ne paie pour ce besoin : les plateformes (Indeed, France Travail) et éditeurs d'antivirus offrent gratuitement conseils et outils de signalement ; aucune offre payante directe trouvée dans les résultats.
  - Angle libre : Aucun acteur ne propose une vérification automatisée offre-par-offre avec verdict instantané : tous donnent des listes de signaux à vérifier manuellement ; un agent qui analyse une URL précise comblerait ce vide.
  - Risque juridique : eleve — Accuser des offres ou entreprises d'être des arnaques expose à la diffamation ; utiliser la marque et le contenu d'Indeed (scraping de leurs URLs, nom dans le produit) pose des problèmes de propriété intellectuelle et de conditions d'utilisation ; responsabilité si un faux négatif fait une victime.
- **Faille :** La défensibilité est faible : un assistant IA gratuit (ex. ChatGPT avec navigation) peut déjà analyser une offre en collant l'URL, ce qui rend le service payant difficile à justifier.
- **Mutation proposée :** Ajouter une base de données privée d'offres frauduleuses vérifiées (crowdsourcing + vérification humaine) et un historique de fiabilité des recruteurs, ce qui crée une barrière par la donnée propriétaire et la confiance accumulée.

## 4. DeepLink Forge : SDK d'appairage anti-boucle open core
**Score 6.58 / 10** · douleur 7.0 · paiement 5 · espace 7.0 · élan 4.7 · critique 6.9 · tournoi 6.0 · risque 10 — petits-vendeurs, née d'une douleur réelle

- **Problème :** Les petits studios qui publient des apps avec compagnon TV réimplémentent mal les deep links et livrent des boucles App Store ; les SDK existants sont chers ou inexistants.
- **Pour qui :** Développeurs indépendants et petits studios qui ajoutent un mode compagnon TV ou second screen à leur app.
- **Solution :** Un SDK open core (gratuit pour l'essentiel) avec des composants testés d'appairage TV : détection d'app installée, fallback web, QR code intelligent qui ouvre l'app au lieu du store, et suite de tests automatiques sur émulateurs.
- **Valeur pour la société :** Moins d'apps défectueuses pour le grand public ; diffuse des standards d'appairage accessibles et testés plutôt que chacun réinvente (et rate) le sien.
- **Canal :** place-de-marche-numerique — premiers clients : Gumroad et Lemon Squeezy pour le pack Pro, plus Show HN et communautés dev (r/androiddev, Discord Flutter) ; les 10 premiers clients sont des indie devs qui viennent de livrer une app TV cassée.
- **Revenu :** Open core : licence Pro payante avec tests automatiques et support de 20 fabricants TV. (79 € la licence Pro à vie, 199 €/an avec mises à jour et tests cloud.)
- **Premier test :** Publier le SDK open source sur GitHub, montrer un avant/après vidéo d'une boucle corrigée sur Show HN et Gumroad ; viser 10 licences en 14 jours.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin ; 10 personnes disent payer déjà ; l'enquête dit ne pas avoir trouvé de paiement
- **Élan :** ×0.93 sur 90 jours — « deferred deep linking » HN 3 contre 0, GitHub 10 contre 11 ; « TV companion app » HN 0 contre 0
- **Preuve de terrain :** gisement « Boucles de connexion application-TV », 13 mentions (App Store fr, App Store be)
  - « impossible d'utiliser la télécommande, à chaque fois ça me renvoi vers l’app store alors que j’ai déjà l’appli » — [App Store fr](https://apps.apple.com/fr/app/netflix-game-controller/id6447582581?uo=2)
  - « ce que je fais en boucle et ça ne marche pas » — [App Store fr](https://apps.apple.com/fr/app/netflix-game-controller/id6447582581?uo=2)
  - « Le QR code ramène quoiqu’il arrive sur l’app store donc impossible d’utiliser l’application » — [App Store fr](https://apps.apple.com/fr/app/netflix-game-controller/id6447582581?uo=2)
- **Enquête :** verdict creuser — L'angle compagnon TV avec tests d'appairage est réel et non couvert, mais la demande payante reste à prouver face à des alternatives open source gratuites et au stigma des SDK de deep linking « bricolables » en quelques jours.
  - Concurrents : [DeferLink](https://github.com/Vlad-tdk/deferlink) (prix ?, ressemblance 5/10) ; [LinkForty](https://github.com/LinkForty/core) (prix ?, ressemblance 4/10) ; [Software Mansion Detour (Android)](https://github.com/software-mansion-labs/android-detour) (prix ?, ressemblance 3/10) ; [Dynalinks](https://github.com/dynalinks/dynalinks-flutter-sdk) (prix ?, ressemblance 3/10)
  - Qui paie déjà : Les studios et éditeurs d'app paient aujourd'hui des abonnements élevés à Branch, AppsFlyer ou Adjust pour le deep linking et l'attribution (référence ~$30k MRR citée dans le projet DeferLink) ; les indés bricolent des solutions open source gratuites. Aucun paiement prouvé spécifiquement pour l'appairage TV/second screen.
  - Angle libre : Personne ne traite le cas spécifique du compagnon TV : détection d'app installée côté TV, QR code qui ouvre l'app au lieu du store, suite de tests automatiques d'appairage sur émulateurs — les concurrents couvrent le deferred deep linking publicitaire, pas le pairing second screen testé.
  - Risque juridique : faible — Outil développeur sans données personnelles ; attention seulement aux marques déposées (App Store, QR Code) et aux règles Apple/Google sur les schemes.
- **Faille :** Le SDK open core est facile à copier ; la valeur payante (tests automatiques, support multi-fabricants) est difficile à défendre face à un concurrent qui reprendrait le code gratuit et proposerait un service similaire à moindre coût.
- **Mutation proposée :** Ajouter un service cloud de monitoring et de détection de régressions en continu (ex : alerte quand une mise à jour d'OS TV casse l'appairage) qui nécessite un abonnement et des données propriétaires (logs anonymisés, matrices de compatibilité) pour créer un verrou technique et data.

## 5. Code de sortie — le standard ouvert pour une résiliation en un clic
**Score 6.49 / 10** · douleur 7.9 · paiement 5 · espace 7.0 · élan 2.0 · critique 8.0 · tournoi 8.0 · risque 5 — donnees-et-api, née d'une douleur réelle

- **Problème :** Chaque service a sa propre procédure de résiliation, rendant la tâche impossible à automatiser de manière générique.
- **Pour qui :** Les développeurs d'agents IA, d'apps de gestion financière et de plateformes de consommation qui veulent offrir une résiliation universelle à leurs utilisateurs.
- **Solution :** Une API ouverte et un standard de données (un schema JSON) que les entreprises peuvent adopter pour déclarer leurs procédures de résiliation ; les agents peuvent interroger cette API pour automatiser la résiliation, et un annuaire public recense les services conformes.
- **Valeur pour la société :** Établit une norme technique qui force la transparence et facilite la mobilité des consommateurs entre services.
- **Canal :** place-de-marche-api — premiers clients : 10 développeurs qui créent des agents IA ou des apps de gestion de budget, contactés via GitHub ou des forums de développeurs (HN, r/artificial), et qui veulent intégrer une résiliation automatique dans leurs produits.
- **Revenu :** Accès gratuit à l'API pour les 1000 premiers appels ; ensuite 0,01 € par appel ou abonnement développeur à 29 €/mois. (29)
- **Premier test :** Créer un endpoint API simple qui retourne les instructions de résiliation pour 5 services populaires (Netflix, Spotify, etc.) ; contacter 10 développeurs et leur demander de payer 29 € pour un accès illimité pendant un mois en échange d'un SDK prêt à l'emploi.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin ; 24 personnes disent payer déjà ; l'enquête dit ne pas avoir trouvé de paiement
  - Serveurs MCP déjà publiés sur ce besoin : 0
- **Élan :** ×0.44 sur 90 jours — « cancel subscription API » HN 0 contre 0, GitHub 4 contre 13 ; « one-click unsubscribe standard » HN 0 contre 0
- **Preuve de terrain :** gisement « Résiliation d'abonnement impossible », 27 mentions (App Store be, App Store us, App Store fr)
  - « Heb alles geprobeerd om het het abonnement op te zeggen maar geraak er niet vanaf. » — [App Store be](https://apps.apple.com/be/app/kobo-books-audiobooks/id301259483?uo=2)
  - « You can only cancel your subscription through a desktop computer, not through the mobile app. » — [App Store be](https://apps.apple.com/be/app/audible-audiobooks-podcasts/id379693831?uo=2)
  - « ils font des spисания sans préavis du notificationnement! A dans l'application c'est difficile à faire. À cause de cela il est impossible d'obtenir un remboursement » — [App Store be](https://apps.apple.com/be/app/dramawave-dramas-reels/id6670430706?uo=2)
- **Enquête :** verdict creuser — Le problème est réel et documenté (loi française de 2023, outils de rétention florissants) mais les résultats ne montrent aucun concurrent direct sur un standard ouvert, et surtout aucun acheteur identifié : les entreprises paient pour retenir, pas pour faciliter le départ, donc la validation du premier test (10 développeurs à 29 €) est indispensable avant d'aller plus loin.
  - Concurrents : [Stripe (gestion des résiliations d'abonnement)](https://stripe.com/fr/resources/more/subscription-cancellations-italy) (prix ?, ressemblance 3/10) ; [Yuma AI (intégration Skio)](https://yuma.ai/fr/integrations/skio) (prix ?, ressemblance 4/10) ; [Xplor Deciplus (historique des résiliations)](https://xplordeciplus.zendesk.com/hc/fr/articles/29217257222812-A-la-d%C3%A9couverte-de-l-historique-des-r%C3%A9siliations) (prix ?, ressemblance 2/10) ; [Automation Anywhere (agents IA gestion de contrats)](https://www.automationanywhere.com/fr/solutions/ai-solution-accelerators/contract-management) (prix ?, ressemblance 3/10)
  - Qui paie déjà : Les entreprises e-commerce et SaaS paient déjà des outils (Yuma AI, Sequenzy, plateformes de gestion d'abonnements comme Skio via Stripe) pour gérer et automatiser le moment de la résiliation — mais elles paient pour RETENIR leurs clients, pas pour aider les consommateurs à partir. Aucune preuve dans les résultats que des développeurs d'agents IA ou d'apps grand public paient pour un standard de résiliation universelle.
  - Angle libre : Aucun acteur trouvé ne propose un standard ouvert interopérable (schema JSON + API publique) que les entreprises déclarent volontairement pour que des agents tiers automatisent la résiliation côté consommateur ; les concurrents existants sont tous côté entreprise (rétention, support, gestion interne) et fermés.
  - Risque juridique : moyen — Le projet repose sur des entreprises qui acceptent de déclarer leurs procédures de résiliation ; sans adoption volontaire, scraper ou documenter leurs procédures soulève des questions de responsabilité et de conformité (données personnelles du compte client, art. L.215-1-1 en France qui impose déjà le trois-clics, ce qui réduit d'autant la valeur du standard dans les zones couvertes par ce type de loi).
- **Faille :** Le succès dépend entièrement de l'adoption par les fournisseurs de services (Netflix, Spotify, etc.). Si ces entreprises ne sont pas incitées à intégrer le standard, l'API reste une curiosité technique sans valeur marchande.
- **Mutation proposée :** Transformer le modèle de revenus en ciblant les entreprises elles-mêmes. Proposer un service 'Compliance-as-a-Service' où l'adoption du standard est présentée comme une obligation réglementaire (DMA/interopérabilité) et un avantage marketing pour améliorer l'expérience client et réduire les coûts de support.

## Suivantes
6. **LitigeAPI** (6.33) — Les développeurs d'app e-commerce, fintech ou assurance n'ont aucune API pour vérifier si une réclamation client de livraison est légitime et conforme au droit UE.
7. **AinéCodeVoisin** (6) — Les apps de révision sont conçues pour des jeunes nés avec le tactile : typographie petite, jargon, pression d'abonnement — les personnes âgées qui repassent un code (permis retiré, contrôle médical) sont totalement ignorées.
8. **Médiateur IA pour Apps Défectueuses** (5.84) — Impossible de contacter l'éditeur pour obtenir un remboursement après achat d'une app qui ne marche pas.
9. **Vengez-Vous En Don** (5.75) — Quand une plateforme refuse un remboursement légitime, le client se sent impuissant et n'a aucun levier public.
10. **Rembourseur Automatique d'Apps** (5.62) — Les utilisateurs d'apps défectueuses ne peuvent pas contacter l'éditeur pour obtenir un remboursement.

## Gisements les plus forts
- **Abus des abonnements mobiles** — 51 mentions (6 aujourd'hui), 3 sources, force 14.662
- **Tarification abusive des contenus numériques** — 59 mentions (13 aujourd'hui), 4 sources, force 13.583
- **Résiliation d'abonnement impossible** — 27 mentions (16 aujourd'hui), 3 sources, force 11.475
- **Remboursements et compensations de livraison non honorés** — 18 mentions (5 aujourd'hui), 3 sources, force 10.706
- **Service client défaillant après paiement** — 10 mentions (4 aujourd'hui), 4 sources, force 10.57
- **Problèmes de performance des applications mobiles** — 39 mentions (11 aujourd'hui), 4 sources, force 10.543
- **Support client inaccessible en cas de bug applicatif** — 21 mentions (2 aujourd'hui), 4 sources, force 9.289
- **Publicité intrusive dans les applications gratuites** — 31 mentions (4 aujourd'hui), 3 sources, force 7.67
- **Accès payant verrouillé aux services numériques** — 19 mentions (2 aujourd'hui), 4 sources, force 7.612
- **Violations de confidentialité et spam dans les apps de santé** — 12 mentions (3 aujourd'hui), 4 sources, force 7.479
- **Retards de livraison imprévisibles** — 12 mentions (3 aujourd'hui), 3 sources, force 7.442
- **Non-remboursement en cas de vol par le livreur** — 6 mentions (2 aujourd'hui), 3 sources, force 7.351

## Santé
- Sources : hn 53 ; hn_achat 58 ; appstore 1219 ; stackexchange 180 ; lemmy 150
- mercury : 44 ok, 0 échecs (0 %), 5276 ms
- qwen : 226 ok, 1 échecs (0 %), 7911 ms — réponse illisible (fin : length) : {
  "valeur_societale": 6,
  "originalite": 5,
  "avantage_agents": 8,
  "defensibilite": 3,
  "argent_rapide": 2,
  "di
- mimo : 248 ok, 0 échecs (0 %), 10587 ms
- mistral : 13 ok, 0 échecs (0 %), 11519 ms
- deepseek : 217 ok, 0 échecs (0 %), 12001 ms
- glm : 229 ok, 5 échecs (2 %), 6664 ms — réponse illisible (fin : stop) : {"idees": [{"": "Analyse de Faisabilité Transfrontalière de Poste", "arene": "travail-et-carrieres", "probleme": "Les tr
- Étapes : radar 325 s (cumul 0.0393 $) ; marche 6 s (cumul 0.0393 $) ; usine 764 s (cumul 0.2929 $) ; enquete 29 s (cumul 0.3766 $) ; elan 130 s (cumul 0.3766 $)