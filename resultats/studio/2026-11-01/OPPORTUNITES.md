# Opportunités du 2026-11-01

762 textes réels lus → 457 douleurs → 787 gisements, plus 12 gisements du marché des agents (955 outils payants observés). 658 idées générées, 518 critiquées, 80 duels, 15 enquêtes web. Coût : 0.362 $ en 977 appels, 21 min.

Classement fondé sur les preuves (douleur réelle, prix lu sur la page ou paiement observé sur le marché, espace libre, élan sur 90 jours, risque) ; l'avis des IA pèse environ 30 %.

## 1. Le Contrôleur de Compatibilité API
**Score 7.46 / 10** · douleur 7.3 · paiement 10 · espace 4.0 · élan 4.8 · critique 7.5 · tournoi 8.0 · risque 10 — donnees-et-api, née d'une douleur réelle

- **Problème :** Les développeurs intègrent des APIs qui changent ou tombent en panne, rendant leurs applications inutilisables sans qu'ils le sachent immédiatement.
- **Pour qui :** Développeurs indépendants et petites startups SaaS qui dépendent de données externes.
- **Solution :** Un agent IA qui surveille 24h/24 les changements de structure (schema) et les temps de réponse des APIs critiques, alertant avant que le bug n'arrive chez l'utilisateur final.
- **Valeur pour la société :** Stabilise l'écosystème numérique en empêchant la propagation de services défectueux basés sur des sources fiables.
- **Canal :** place-de-marche-api — premiers clients : Communautés Discord de développeurs No-Code/Low-Code (Bubble, Make).
- **Revenu :** Abonnement mensuel par API surveillée (SaaS B2B). (19€/mois pour 5 APIs.)
- **Premier test :** Proposer une surveillance gratuite pendant 7 jours pour 3 APIs populaires du domaine public, avec rapport d'alerte prédictif.
- **Preuve de paiement :** 2 prix lus sur la page, 2 offres payantes du même besoin ; 3 outils payants utilisés sur le marché des agents ; 11 personnes disent payer déjà
  - Marché des agents : [Google Flights API](https://apify.com/johnvc/google-flights-data-scraper-flight-and-price-search) — 356 utilisateurs/30 j, 0.03 $ par Page Processed
  - Marché des agents : [Shopee Scraper](https://apify.com/gio21/shopee-scraper) — 329 utilisateurs/30 j, 0.0085 $ par Product scraped
  - Marché des agents : [✨ Google Shopping Scraper](https://apify.com/damilo/google-shopping-apify) — 273 utilisateurs/30 j, 0.0035 $ par result
  - Serveurs MCP déjà publiés sur ce besoin : 0
- **Élan :** ×0.93 sur 90 jours — « api monitoring » HN 0 contre 2, GitHub 4304 contre 5012 ; « breaking changes » HN 178 contre 176
- **Preuve de terrain :** gisement « Fonctionnalités défaillantes dans les applications payantes », 26 mentions (App Store fr, App Store be, App Store us)
  - « les offres souvent ne marche pas et impossible de payer les commandes. L’application a que des bugs en ce moment. » — [App Store fr](https://apps.apple.com/fr/app/burger-king-france/id924879230?uo=2)
  - « Ou on vend de la formation ou on fait une application pratique et utile ! Il faut choisir ! » — [App Store fr](https://apps.apple.com/fr/app/premiers-secours-ifrc/id1312876691?uo=2)
  - « Bouton appareil photo ne fonctionne pas. Arnaque le bouton Appareil photo pour prendre les champignons en photo ne fonctionne pas. J’ai payé en plus 😭😭 » — [App Store fr](https://apps.apple.com/fr/app/picture-mushroom-champignon/id1474578078?uo=2)
- **Enquête :** verdict creuser — Le besoin est réel et prouvé, mais l'espace est déjà encombré (Canary Ops, PulseAPI, x402, open source) avec des plans gratuits : il faut valider que les devs indés paieront 19 €/mois pour de la surveillance prédictive de schéma plutôt que d'utiliser ces alternatives gratuites ou à l'usage.
  - Concurrents : [Canary Ops](https://canaryops.dev/) (Gratuit jusqu'à 10 moniteurs (plan payant non affiché sur la page), ressemblance 7/10) ; [PulseAPI](https://pulseapi.io/) (Plan gratuit disponible, plans payants avec diagnostic IA (prix exact non affiché sur la page), ressemblance 8/10) ; [x402 openapi-diff (API à l'usage)](https://dev.to/hal_gobvan_16a285d49bda97/two-new-x402-apis-for-ai-agents-openapi-breaking-change-diff-rate-limit-policy-inference-4afj) (0,0005 $ par appel (USDC sur Base), ressemblance 6/10) ; [API Contract Monitoring Platform (open source)](https://github.com/Reddy9063/API-Contract-Monitoring-Platform) (prix ?, ressemblance 7/10)
  - Qui paie déjà : Des développeurs indés et équipes d'intégration paient déjà au usage pour de la détection de breaking changes (x402 à 0,0005 $/appel) et des plans payants de monitoring d'APIs avec diagnostic IA (PulseAPI) ; les outils open source (oasdiff, plateformes GitHub) montrent que la communauté bricole déjà ce besoin gratuitement. ([preuve](https://dev.to/hal_gobvan_16a285d49bda97/two-new-x402-apis-for-ai-agents-openapi-breaking-change-diff-rate-limit-policy-inference-4afj))
  - Angle libre : Personne ne combine encore surveillance continue du schéma + latence avec une alerte prédictive orientée devs indés à prix fixe bas (19 €/mois pour 5 APIs) : les concurrents font soit du uptime/diagnostic (Canary Ops, PulseAPI), soit du diff ponctuel à l'usage (x402), soit de la réparation de code (agents), mais pas de rapport prédictif « avant que le bug n'arrive chez l'utilisateur » packagé pour un public non-enterprise.
  - Risque juridique : faible — Le service interroge des endpoints publics ou autorisés et alerte le client ; pas de traitement de données personnelles sensibles, mais attention aux CGU des APIs surveillées (scraping de specs) et à la RGPD si les payloads contiennent des données utilisateurs.
- **Faille :** Le marché des outils de monitoring est saturé. Le défi est de prouver la valeur critique (le 'pain') de l'alerte de changement de schéma avant que le développeur ne soit exposé à un bug réel, ce qui rend la conversion du test gratuit difficile.
- **Mutation proposée :** Ne pas se limiter à l'alerte de panne, mais fournir un 'Indice de Volatilité' ou un 'Score de Santé' pour chaque API, permettant aux développeurs de prioriser la refonte ou le remplacement des dépendances les plus risquées.

## 2. APIPrixFinal
**Score 7.42 / 10** · douleur 7.4 · paiement 9 · espace 7.0 · élan 8.0 · critique 7.6 · tournoi 6.0 · risque 5 — donnees-et-api, née d'une douleur réelle

- **Problème :** Les développeurs d'apps de e-commerce ne savent pas calculer le prix final réel d'un produit car les frais varient selon les plateformes.
- **Pour qui :** Les développeurs d'applications mobiles de comparaison de prix et d'agrégateurs e-commerce.
- **Solution :** Une API qui renvoie le prix final toutes frais inclus (service, livraison, taxes) pour un produit et une destination donnés, agrégé depuis des dizaines de sources.
- **Valeur pour la société :** Rend possible une génération d'outils grand-public qui affichent enfin le vrai prix, profitant à tous les consommateurs.
- **Canal :** place-de-marche-api — premiers clients : Les développeurs présents sur RapidAPI et les catalogues MCP cherchant des sources de données prix fiables.
- **Revenu :** Paiement à l'usage par requête, avec palier mensuel pour les gros volumes. (0,005€ par requête API)
- **Premier test :** Publier sur RapidAPI et enregistrer 1000 requêtes payantes dès la première semaine grâce à un lancement ciblé auprès des développeurs.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin ; 1 outils payants utilisés sur le marché des agents ; 9 personnes disent payer déjà
  - Marché des agents : [Google Flights API](https://apify.com/johnvc/google-flights-data-scraper-flight-and-price-search) — 356 utilisateurs/30 j, 0.03 $ par Page Processed
  - Marché des agents : [FuelPrices | Pay Per Result, Easy to Use, No Cookies](https://apify.com/johnvc/fuelprices) — 58 utilisateurs/30 j, 0.001 $ par result
  - Serveurs MCP déjà publiés sur ce besoin : 0
- **Élan :** ×2.26 sur 90 jours — « landed cost » HN 2 contre 0, GitHub 194 contre 84 ; « price comparison API » HN 0 contre 0
- **Preuve de terrain :** gisement « Frais de services cachés et perçus comme abusifs », 16 mentions (App Store fr, App Store be, App Store us, Lemmy lemmy.world)
  - « When you get to the register, the item rings up for $6, so with tax, you pay $6.60. » — [Lemmy lemmy.world](https://lemmy.today/comment/27558083)
  - « Aucune réduction. Pas de réduction et des frais de traitement et livraison » — [App Store fr](https://apps.apple.com/fr/app/uber-eats-livraison-de-repas/id1058959277?uo=2)
  - « Frais de services indécent. Il faut arrêter de prendre les gens pour des cons. Frais de services de quoi exactement ? » — [App Store fr](https://apps.apple.com/fr/app/uber-eats-livraison-de-repas/id1058959277?uo=2)
- **Enquête :** verdict creuser — Le besoin est réel et l'angle API développeur inoccupé, mais aucune preuve directe que des développeurs paient pour ce service précis et le modèle d'agrégation soulève des risques juridiques et techniques à valider avant de foncer.
  - Concurrents : [Prisync](https://www.lafabriquedunet.fr/logiciels/marketing-digital/veille-tarifaire) (99 €/mois, ressemblance 4/10) ; [Paarly](https://www.lafabriquedunet.fr/logiciels/marketing-digital/veille-tarifaire) (prix ?, ressemblance 4/10) ; [Price2Spy](https://www.lafabriquedunet.fr/logiciels/marketing-digital/veille-tarifaire) (prix ?, ressemblance 4/10)
  - Qui paie déjà : Les e-commerçants et responsables pricing paient déjà des outils de veille tarifaire (Prisync 99 €/mois, Paarly, Price2Spy) pour surveiller les prix concurrents, mais ce sont des SaaS pour marchands, pas des API de prix final consommateur pour développeurs : personne ne paie encore exactement pour ce besoin.
  - Angle libre : Aucun acteur trouvé n'expose une API développeur qui renvoie le prix final toutes frais inclus (livraison, taxes, frais de service) pour un produit et une destination donnés : les outils existants font de la veille tarifaire B2B pour marchands, pas de l'agrégation 'landed cost' orientée apps de comparaison.
  - Risque juridique : moyen — Agréger des prix depuis des dizaines de sources implique du scraping ou des accords avec les plateformes : conditions d'utilisation restrictives, blocages techniques et risque de contestation sur la réutilisation des données de tiers.
- **Faille :** Le modèle repose entièrement sur le scraping de données de prix et de frais, ce qui contrevient très probablement aux Conditions Générales de Vente (CGV) de la majorité des marchands e-commerce. Ce risque juridique est majeur et peut entraîner le blocage des sources de données et des poursuites.
- **Mutation proposée :** Diversifier la source de données en privilégiant les API de partenaires (si disponibles) ou en se concentrant sur des niches où les données sont semi-structurées (ex: marketplaces ayant des flux de données ou des règles de calcul de frais standardisées), réduisant ainsi la dépendance au scraping illégal.

## 3. Preuve avant mise à jour
**Score 6.87 / 10** · douleur 6.7 · paiement 3 · espace 8.0 · élan 8.4 · critique 6.9 · tournoi 10.0 · risque 10 — createurs, née d'une douleur réelle

- **Problème :** Les créateurs qui vivent de leurs apps d'e-commerce ou de leur app communautaire perdent des clients quand une mise à jour obligatoire bloque l'accès au moment critique (comme les codes promo fast-food en boutique).
- **Pour qui :** Les créateurs et petits vendeurs qui ont une app ou une webapp mobile utilisée sur place par leurs clients.
- **Solution :** Un outil en libre-service qui, avant chaque publication, fait tester automatiquement la nouvelle version par des scénarios d'usage réels générés par les agents (parcours client, temps de chargement, flux critique) et produit un rapport « prêt ou pas » avec simulation du coût d'une mise à jour bloquante.
- **Valeur pour la société :** Moins d'outils dégradés pour les clients finaux ; les petits vendeurs apprennent à ne pas casser l'expérience au pire moment.
- **Canal :** place-de-marche-numerique — premiers clients : Sur Gumroad et les communautés de makers (Indie Hackers, X des indie devs), en vendant un audit de pré-publication à l'unité.
- **Revenu :** Vente à l'unité par audit, puis abonnement pour les tests à chaque publication. (19 euros par audit de version, 39 euros par mois en illimité.)
- **Premier test :** En 2 semaines : mettre en vente l'audit unitaire sur Gumroad, poster le rapport d'une app réelle sur Indie Hackers, et mesurer 10 achats à 19 euros.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin ; 2 personnes disent payer déjà ; l'enquête dit ne pas avoir trouvé de paiement
- **Élan :** ×2.58 sur 90 jours — « pre-release testing » HN 4 contre 3, GitHub 77 contre 28 ; « critical user flows » HN 0 contre 1
- **Preuve de terrain :** gisement « Mises à jour dégradant l'expérience utilisateur », 18 mentions (App Store be, App Store us, App Store fr)
  - « À chaque fois que j’arrive au BK, il y a une mise à jour à faire. Et la dernière plus de deux minutes » — [App Store fr](https://apps.apple.com/fr/app/burger-king-france/id924879230?uo=2)
  - « J’ai vraiment préférée la version initiale, celle qui y était avant puisque vraiment tout était détaillé » — [App Store fr](https://apps.apple.com/fr/app/premiers-secours-ifrc/id1312876691?uo=2)
  - « Fonctionnait bien, puis sans explication ne fonctionne plus depuis quelques semaines. » — [App Store fr](https://apps.apple.com/fr/app/pronote/id1138223804?uo=2)
- **Enquête :** verdict creuser — Les résultats de recherche fournis ne documentent ni concurrents ni demande pour ce produit précis : il faut refaire une recherche ciblée (tests automatisés mobiles, release blockers, app store rejection) avant tout lancement.
  - Concurrents : aucun trouvé
  - Qui paie déjà : Non identifiable dans les résultats fournis : aucune preuve que des créateurs d'apps e-commerce paient déjà pour un audit pré-publication de ce type.
  - Angle libre : Les résultats de recherche fournis ne contiennent rien sur ce besoin (CRM, bornes de commande, Shopify, témoignages clients, Slack) : impossible de vérifier la concurrence ni la demande. Un angle possible serait la simulation chiffrée du coût d'une mise à jour bloquante, mais elle reste non validée par les sources.
  - Risque juridique : faible — Outil d'audit logiciel sans traitement de données personnelles particulières ni enjeu réglementaire identifié.
- **Faille :** La défensibilité est faible : un outil open source ou un agent IA gratuit pourrait rapidement reproduire la même fonctionnalité, et les créateurs pourraient préférer une solution gratuite.
- **Mutation proposée :** Proposer une intégration profonde avec les plateformes d'e-commerce (Shopify, WooCommerce) et un service de surveillance continue des performances après mise à jour, avec alertes en temps réel et un historique des impacts, créant ainsi une barrière à la copie par les données et l'intégration.

## 4. Alt-Text Forge
**Score 6.81 / 10** · douleur 6.0 · paiement 8 · espace 4.0 · élan 5.8 · critique 7.0 · tournoi 8.0 · risque 10 — donnees-et-api, née du marché des agents (agent-client)

- **Problème :** Des millions d'images en ligne n'ont pas de texte alternatif, et les scrapers d'images comme Google Images retournent des descriptions vides ou de mauvaise qualité qui plombent les agents et l'accessibilité.
- **Pour qui :** Agences web, plateformes e-commerce et agents IA qui ingèrent des catalogues d'images et ont besoin de descriptions fiables et normalisées.
- **Solution :** Une API qui prend un lot d'URLs d'images et retourne un alt-text conforme aux normes WCAG, multilingue, avec niveau de détail paramétrable et contrôle qualité automatique par un second agent vérificateur.
- **Valeur pour la société :** Améliorer massivement l'accessibilité du web pour les utilisateurs de lecteurs d'écran, à l'échelle programmatique.
- **Canal :** place-de-marche-api — premiers clients : Les vendeurs d'actors Apify qui scrapent des catalogues e-commerce, contactés sur le hub communautaire Apify, plus un Show HN.
- **Revenu :** Pay-per-use (0,01 € par image décrite, gratuit jusqu'à 500 images)
- **Premier test :** En 14 jours : offrire 1 000 descriptions gratuites aux 10 premiers développeurs qui répondent sur le forum Apify, puis leur proposer un pack payant.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin ; 1 outils payants utilisés sur le marché des agents
  - Marché des agents : [Google Images Scraper](https://apify.com/hooli/google-images-scraper) — 534 utilisateurs/30 j, 0.0035 $ par Scraped image
  - Serveurs MCP déjà publiés sur ce besoin : 0
- **Élan :** ×1.27 sur 90 jours — « alt text » HN 33 contre 22, GitHub 595 contre 535 ; « image accessibility » HN 0 contre 0
- **Preuve de terrain :** Marché des agents : Google Images Scraper — outil payé par 534 utilisateurs en 30 jours
- **Enquête :** verdict creuser — Le besoin est bien documenté et l'angle API multilingue avec double vérification n'est pas couvert par les plugins WordPress trouvés, mais aucune offre payante avec prix vérifié n'a été trouvée dans les sources : le prix de 0,01 €/image reste à valider face à des concurrents non listés (AltText.ai, etc.).
  - Concurrents : [neo Alt (neo-wp)](https://neo-wp.com/fr/wp-how-to/wordpress-bulk-alt-text-generator-ai) (prix ?, ressemblance 7/10)
  - Qui paie déjà : Les équipes web et e-commerce paient déjà des agences/rédacteurs pour l'accessibilité et le SEO d'images, mais aucun concurrent avec prix affiché n'apparaît dans les résultats : impossible de prouver un flux payant direct avec ces sources.
  - Angle libre : Une API générique (hors WordPress) avec contrôle qualité par second agent vérificateur, niveau de détail paramétrable et sortie multilingue normalisée pour pipelines d'agents IA et scrapers — les concurrents trouvés sont des plugins WordPress intégrés à la médiathèque, pas des API batch.
  - Risque juridique : faible — Génération de descriptions d'images : pas de données personnelles ni de contenu protégé copié, conformité WCAG plutôt un argument commercial.
- **Faille :** La défensibilité est faible : un modèle de vision multimodal (ex. GPT-4o) peut générer un alt-text acceptable gratuitement ou à coût marginal, et des API concurrentes (AWS, Google) proposent déjà la description d'image. Sans données propriétaires ou réseau de confiance, l'offre est facilement copiée.
- **Mutation proposée :** Au lieu d'une simple API de description, créer un registre public et vérifié d'alt-texts (via signature de hachage d'image) où chaque description est notée et auditable, et où les utilisateurs peuvent réclamer des corrections. Le réseau de confiance et l'historique des vérifications deviennent alors un actif défendable.

## 5. PreuveEnMain : terminal de preuve de livraison payé à la pièce chez les commerçants locaux
**Score 6.8 / 10** · douleur 7.3 · paiement 5 · espace 6.0 · élan 8.6 · critique 6.9 · tournoi 6.0 · risque 10 — local-et-territoire, née d'une douleur réelle

- **Problème :** Les commerçants locaux livrant eux-mêmes n'ont aucun moyen de prouver la bonne remise et se font acheter à faux par des clients malhonnêtes, tandis que des clients sont spoliés par des livreurs véreux.
- **Pour qui :** Commerçants de proximité, épiceries de quartier, bouchers, fleuristes qui livrent en ville et associations de commerçants.
- **Solution :** Une borne QR posée en caisse où le client signe numériquement et photographie sa réception, archivée automatiquement et consultable en cas de litige ou de contestation.
- **Valeur pour la société :** Protège le commerce de proximité, acteur économique et social des quartiers, contre la fraude et le vol.
- **Canal :** communautes — premiers clients : Chambres de commerce locales, forums de commerçants, groupes WhatsApp de commerçants de centre-ville.
- **Revenu :** Abonnement mensuel par borne + option dossier illimité. (29 €/mois par borne)
- **Premier test :** Placer 3 bornes chez 3 commerçants d'un quartier test et encaisser 3 abonnements sous 14 jours.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin ; 6 personnes disent payer déjà
- **Élan :** ×2.73 sur 90 jours — « proof of delivery » HN 3 contre 4, GitHub 196 contre 70 ; « ePOD » HN 0 contre 0
- **Preuve de terrain :** gisement « Non-remboursement en cas de vol par le livreur », 7 mentions (App Store fr, App Store be, App Store us)
  - « Me sont volé plus de 30€ que le livreur a livré mais jamais sont venu » — [App Store fr](https://apps.apple.com/fr/app/deliveroo-faites-vous-livrer/id1001501844?uo=2)
  - « Me sont volé plus de 30€ que le livreur a livré mais jamais sont venu » — [App Store fr](https://apps.apple.com/fr/app/deliveroo-faites-vous-livrer/id1001501844?uo=2)
  - « on m’explique tout simplement que je n’ai pas de preuve. » — [App Store fr](https://apps.apple.com/fr/app/uber-eats-livraison-de-repas/id1058959277?uo=2)
- **Enquête :** verdict creuser — Le besoin de preuve de livraison est documenté et les solutions ePOD existent mais ciblent les flottes B2B ; il faut valider que les commerçants locaux livrant eux-mêmes sont assez nombreux et prêts à payer 29 €/mois.
  - Concurrents : [Dashdoc (ePOD / preuve de livraison numérique)](https://www.dashdoc.com/fr/blog/preuve-de-livraison) (prix ?, ressemblance 7/10) ; [Solutions ePOD génériques (signature + photo géolocalisée + horodatage)](https://innovia-transport.com/preuve-livraison-pod) (prix ?, ressemblance 8/10) ; [Bopizy (Click & Collect pour commerçants, avec preuve de retrait en magasin)](https://www.bopizy.com/) (49,90 € HT/mois, ressemblance 4/10)
  - Qui paie déjà : Les transporteurs et flottes paient déjà des TMS/ePOD (Dashdoc) ; les commerçants paient des solutions de vente en ligne (Bopizy), mais aucun payeur identifié pour un ePOD dédié aux livreurs-commerçants de quartier.
  - Angle libre : Un ePOD payé à la pièce et ultra-simple (borne QR en caisse) pour le livreur-commerçant local, alors que les solutions existantes visent les flottes et TMS B2B, pas l'épicerie du quartier.
  - Risque juridique : faible — Archiver des photos et signatures de réception est un traitement standard ; il faut simplement un consentement RGPD clair du client livré et une durée de conservation définie.
- **Faille :** Le modèle est trop réactif et repose sur une adoption volontaire (le client doit accepter de signer numériquement). La friction d'ajouter une étape matérielle (la borne) au processus de livraison est un frein majeur à l'adoption par les petits commerçants.
- **Mutation proposée :** Transformer la borne de simple 'terminal de signature' en 'terminal de contrôle de qualité et de livraison'. L'agent IA devrait analyser non seulement la signature, mais aussi les photos prises (ex: état du produit, température, conformité de l'emballage) pour fournir au commerçant un rapport de qualité immédiat, transformant la preuve de livraison en preuve de service.

## Suivantes
6. **Place de marché de datasets de prix aériens pour analystes et médias** (6.5) — Chaque acteur du voyage repaie le même scraping ; il manque un dataset commun, propre et auditable.
7. **CodePermisAI : Le Tuteur qui Ne Sature Pas** (6.38) — Les candidats abandonnent la théorie parce que les QCM classiques sont répétitifs et ne ciblent pas leurs lacunes spécifiques, contrairement aux promesses des apps qui disent 'progresser vite'.
8. **Vérificateur d'agences d'immigration** (6.28) — Les candidats à l'immigration paient des « agences » frauduleuses sans aucun moyen de vérifier leur légitimité avant de payer des milliers d'euros.
9. **ModeNormal** (6.2) — Les apps éducatives surchargent l'utilisateur de notifications, récompenses et distractions qui brisent la concentration et l'envie d'apprendre.
10. **CacheCast : Buffer Prédictif Vidéo Mobile** (6.11) — Dans les régions à connectivité instable ou chère, les plateformes de streaming coupent la lecture après quelques minutes, empêchant le téléchargement intégral ou la visualisation continue de contenus éducatifs ou divertissants.

## Gisements les plus forts
- **Abus des abonnements mobiles** — 60 mentions (9 aujourd'hui), 4 sources, force 18.011
- **Service client défaillant après paiement** — 17 mentions (7 aujourd'hui), 5 sources, force 14.204
- **Tarification abusive des contenus numériques** — 74 mentions (15 aujourd'hui), 4 sources, force 14.118
- **Résiliation d'abonnement impossible** — 35 mentions (8 aujourd'hui), 3 sources, force 12.643
- **Remboursements et compensations de livraison non honorés** — 23 mentions (5 aujourd'hui), 3 sources, force 11.305
- **Problèmes de performance des applications mobiles** — 48 mentions (9 aujourd'hui), 4 sources, force 10.769
- **Support client inaccessible en cas de bug applicatif** — 22 mentions (1 aujourd'hui), 4 sources, force 9.443
- **Retards de livraison imprévisibles** — 17 mentions (5 aujourd'hui), 3 sources, force 8.718
- **Frais de services cachés et perçus comme abusifs** — 16 mentions (4 aujourd'hui), 4 sources, force 8.345
- **Violations de confidentialité et spam dans les apps de santé** — 17 mentions (5 aujourd'hui), 4 sources, force 8.218
- **Publicité intrusive dans les applications gratuites** — 36 mentions (5 aujourd'hui), 3 sources, force 8.016
- **Fonctionnalités défaillantes dans les applications payantes** — 26 mentions (5 aujourd'hui), 3 sources, force 7.943

## Santé
- Sources : hn 53 ; hn_achat 59 ; appstore 1219 ; stackexchange 180 ; lemmy 150
- mercury : 41 ok, 0 échecs (0 %), 5247 ms
- mimo : 239 ok, 0 échecs (0 %), 9705 ms
- qwen : 216 ok, 0 échecs (0 %), 9460 ms
- deepseek : 241 ok, 2 échecs (1 %), 10564 ms — aucun fournisseur pour deepseek (openrouter : réponse vide (fin : length) ; groq : clé absente)
- mistral : 12 ok, 1 échecs (8 %), 12681 ms — réponse illisible (fin : stop) : []
- glm : 217 ok, 7 échecs (3 %), 6352 ms — réponse illisible (fin : stop) : {"} }$্ট। ेேகཟンемаяান্ত্টा , здо วา ォ<unused2130>ाની,емаяníkaးा้น ঁ1।วา}! $,    ": 1, "},ッシемая.्याемаяวา।ा}وري": "}وري"
- Atlas vivant : 26/36 API répondent (muettes : seismes, eonet, essais-cliniques, openfda, osm, gdelt, solaire, gutendex, openverse, nasa-apod)
- Étapes : radar 346 s (cumul 0.0385 $) ; marche 8 s (cumul 0.0385 $) ; atlas 24 s (cumul 0.0385 $) ; usine 746 s (cumul 0.2764 $) ; enquete 24 s (cumul 0.3619 $) ; elan 88 s (cumul 0.3619 $)