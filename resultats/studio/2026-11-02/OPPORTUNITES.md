# Opportunités du 2026-11-02

763 textes réels lus → 417 douleurs → 1477 gisements, plus 12 gisements du marché des agents (950 outils payants observés) et 24 failles calculées (14 transplants vérifiés). 800 idées générées, 645 critiquées, 80 duels, 15 enquêtes web. Coût : 0.470 $ en 1697 appels, 27 min.

Classement fondé sur les preuves (douleur ou faille mesurée, prix lu sur la page ou paiement observé, espace libre, originalité mesurée contre le réflexe d'un assistant IA, élan sur 90 jours, risque) ; l'avis des IA pèse 18 %.

## 1. API « santé SEO d'un domaine » en un seul appel, garanti à jour
**Score 7.28 / 10** · douleur 6.0 · paiement 10 · espace 5.0 · élan 6.8 · critique 7.2 · tournoi 6.0 · risque 5 — donnees-et-api, née du marché des agents (besoin-final)

- **Problème :** Les acteurs du gisement vendent un scraper fragile noté 3/6 : fields mélangés, sorties instables, pas de contrat de service clair. Les développeurs veulent un résultat fiable (autorité, trafic estimé, backlinks, trafic IA) sans déboguer un scrapeur.
- **Pour qui :** Développeurs, agences SEO en marque blanche et agents IA automatisés qui intégrèrent ces données dans leurs pipelines.
- **Solution :** Une API REST + endpoint MCP propre : un appel, un schéma JSON versionné et testé, cache transparent, scoring composite « santé domaine » calculé par nos agents (autorité, tendance de trafic, part du trafic venant des IA). Facturée à l'appel sur Apify Store et RapidAPI.
- **Valeur pour la société :** Baisse du coût et de la barrier d'entrée à des données marché jusqu'ici réservées aux gros budgets, fiabilité et transparence tarifaire.
- **Canal :** place-de-marche-api — premiers clients : Publier deux actors sur l'Apify Store (analyse de domaine + top sites) et répondre utilement dans les threads SEO de Hacker News et r/SEO où les acheteurs du scraper mal noté se plaignent déjà.
- **Revenu :** Paiement à l'usage par appel + abonnement mensuel pour les gros volumes. (0,02 € par appel, packs de 10 000 appels à 120 €/mois.)
- **Premier test :** En 2 semaines : livrer l'endpoint « santé domaine » avec 10 métriques, le mettre en pay-per-result sur Apify Store et viser 20 appels payants dont 5 clients récurrents.
- **Preuve de paiement :** 2 prix lus sur la page, 2 offres payantes du même besoin ; 3 outils payants utilisés sur le marché des agents
- **Originalité mesurée :** 10/10
  - Marché des agents : [Semrush Full API SEO Scraper - Traffic, Authority, Backlinks](https://apify.com/pro100chok/semrush-scraper) — 483 utilisateurs/30 j, 0.015 $ par result
  - Marché des agents : [Google Search Results (~$0.05/1K Results)](https://apify.com/scraperlink/google-search-results-serp-scraper) — 2464 utilisateurs/30 j, 0.0005 $ par search result pages
  - Marché des agents : [Google Search Scraper ($0.15 per 1000 results)](https://apify.com/igolaizola/google-search-scraper-ppe) — 404 utilisateurs/30 j, 0.0003 $ par Result
  - Serveurs MCP déjà publiés sur ce besoin : 0
- **Élan :** ×1.63 sur 90 jours — « domain authority » HN 3 contre 4, GitHub 93 contre 56 ; « SERP API » HN 8 contre 1
- **Preuve de terrain :** Marché des agents : Semrush Full API SEO Scraper - Traffic, Authority, Backlinks — outil payé par 483 utilisateurs en 30 jours
- **Enquête :** verdict creuser — Le besoin est réel et payant mais le marché est saturé d'APIs établies ; il faut valider que le scoring composite et le MCP sont un différenciateur suffisant face à DataForSEO/Ahrefs.
  - Concurrents : [DataForSEO SERP API](https://dataforseo.com/help-center/best-web-search-api-for-developers-what-to-look-for-and-why-dataforseo-serp-api-fits) (pay-as-you-go (tarif à l'appel, non affiché), ressemblance 7/10) ; [SerpApi Google Search API](https://serpapi.com/search-api) (prix ?, ressemblance 6/10) ; [Zenserp](https://www.scraperapi.com/web-scraping/best-web-scraping-apis/google-serp-api/) ($49.99/mois pour 5 000 requêtes, ressemblance 6/10) ; [Apify SERP scrapers](https://www.scraperapi.com/web-scraping/best-web-scraping-apis/google-serp-api/) ($49/mois (~14 000 résultats), ressemblance 6/10)
  - Qui paie déjà : Agences SEO et équipes marketing digital paient déjà des abonnements SERP/SEO APIs (Zenserp, Apify ~50$/mois) et du pay-as-you-go DataForSEO ; les développeurs intègrent ces données dans leurs pipelines. ([preuve](https://www.scraperapi.com/web-scraping/best-web-scraping-apis/google-serp-api/))
  - Angle libre : Aucun concurrent ne vend un score composite « santé domaine » en un seul appel combinant autorité + tendance de trafic + part de trafic venant des IA, avec schéma JSON versionné et endpoint MCP pour agents IA.
  - Risque juridique : moyen — Scraping de données Google et métriques propriétaires (Moz, Ahrefs) : risque de violation des CGU et de dépendance à des données qu'on ne possède pas.
- **Faille :** La défendabilité est faible : un concurrent peut reproduire le même score composite avec des données ouvertes et un LLM, et les API concurrentes (Ahrefs, Semrush) ont déjà des endpoints fiables et des données propriétaires inaccessibles.
- **Mutation proposée :** Ajouter une couche de données exclusives issues de partenariats avec des fournisseurs de logs ou de crawlers spécialisés, et breveter un algorithme de scoring « trafic IA » basé sur des signaux non publics (ex. mentions dans les réponses de modèles propriétaires).

## 2. Le Déméteur : l'agent qui débarasse la maison d'un aîné avant la vente
**Score 6.89 / 10** · douleur 6.0 · paiement 10 · espace 6.0 · élan 5.0 · critique 7.1 · tournoi 8.0 · risque 10 — familles-et-aines, visionnaire (inversion)

- **Problème :** Quand un parent déménage en résidence ou décède, les enfants doivent vider une maison entière : trier, estimer, vendre, donner, jeter — des semaines de travail épuisant sans méthode.
- **Pour qui :** Les enfants adultes d'aînés qui doivent vider un logement en quelques semaines.
- **Solution :** L'aidant photographie pièce par pièce depuis son téléphone ; les agents identifient chaque objet, estiment sa valeur de revente réelle (comparables de ventes), génèrent le plan de tri : ce qui se vend sur Vinted/eBay/Leboncoin avec annonce rédigée, ce qui se donne à quelle association locale, ce qui part. Livré en dossier actionnable + annonces prêtes à publier.
- **Valeur pour la société :** Moins d'objets jetés en déchetterie, plus d'objets redirigés vers revente, don et associations ; désintoxication du stress des aidants.
- **Canal :** communautes — premiers clients : Les groupes Facebook et forums d'aidants (Aidants Mag, groupes « aider un parent »), subreddits r/France et r/declutter : posts utiles de méthode gratuite avec l'outil en lien.
- **Revenu :** Paiement unique par dossier de maison traité, avec palier selon volume. (89 € par logement traité (illimité en objets).)
- **Premier test :** Landing page + traitement gratuit des 10 premiers dossiers contre témoignage, prix affiché à 89 €, annoncé dans 3 groupes d'aidants ; mesurer combien paient au dossier 14.
- **Preuve de paiement :** 2 prix lus sur la page, 2 offres payantes du même besoin
- **Originalité mesurée :** 3.75/10 — proche de l'idée réflexe « Vente de partitions ou tablatures »
- **Élan :** pas assez de signal — « estate clearance » HN 0 contre 0, GitHub 2 contre 3 ; « decluttering service » HN 0 contre 0
- **Enquête :** verdict creuser — Le besoin est massif et prouvé mais les clients paient aujourd'hui pour un débarras clé en main, pas pour un dossier à exécuter eux-mêmes : il faut valider qu'ils paieront 89 € pour le plan seul.
  - Concurrents : [Kietud](https://www.kietud.com) (gratuit pour le devis (10 photos), commission/coordination non affichée, ressemblance 8/10) ; [Spacee](https://www.spacee.fr) (devis immédiat en ligne, prix non affiché, ressemblance 5/10) ; [Diogène France](https://diogene-france.fr/debarras-apres-deces) (800–1 500 € TTC pour 40–60 m², ressemblance 6/10) ; [MyJugaad](https://my-jugaad.eu/vide-logement) (null, ressemblance 5/10)
  - Qui paie déjà : Les héritiers ou le notaire sur les fonds de la succession, typiquement 800–1 500 € pour un débarras physique (Diogène). Le budget existe donc déjà pour la logistique, mais personne ne paie encore uniquement pour le « plan de tri + annonces » sans le débarras. ([preuve](https://diogene-france.fr/debarras-apres-deces))
  - Angle libre : Aucun acteur ne vend un livrable purement digital (estimation objets par photo + annonces prêtes + plan de dons) sans intervention physique ni coordination : Kietud fait la coordination locale à Lyon, les débarrasseurs font la main-d'œuvre, mais personne ne solutionne l'étape « savoir quoi faire de chaque objet » à distance pour 89 €. Risque principal : le client veut souvent que quelqu'un fasse le travail, pas un dossier.
  - Risque juridique : faible — Conseil et rédaction d'annonces ; attention seulement aux estimations de valeur qui pourraient être perçues comme expertise d'inventaire successorale.
- **Faille :** La promesse d'estimation fiable à partir de photos est techniquement difficile : les agents peuvent identifier des objets courants, mais la valeur de revente dépend de l'état, des marques, des variations locales — risque de déception et de demandes de remboursement.
- **Mutation proposée :** Se concentrer sur un sous-ensemble à forte valeur et facilement identifiable (meubles de marque, vaisselle, livres anciens) et fournir une fourchette de prix avec liens vers des comparables réels, en laissant l'utilisateur valider avant de générer les annonces ; ou proposer un service de mise en relation avec des vide-maisons locaux pour les objets complexes.

## 3. Bodacc Vert — Le Radar des Opportunités Circulaires
**Score 6.85 / 10** · douleur 7.0 · paiement 4 · espace 6.0 · élan 5.0 · critique 7.6 · tournoi 6.0 · risque 10 — planete, visionnaire (collision-api)

- **Problème :** Chaque jour, des entreprises industrielles font l'objet de liquidations ou de ventes d'actifs publiées au BODACC : leur matériel (machines, mobilier, stock) finit à la ferraille alors qu'il pourrait être racheté et remis en service. L'information existe mais personne ne la lit ni ne la filtre.
- **Pour qui :** Ressourceries, reconditionneurs, artisans et acheteurs d'occasion professionnelle qui cherchent du matériel à récupérer avant qu'il ne soit détruit.
- **Solution :** Un flux quotidien en libre-service qui filtre les annonces BODACC par code d'activité et localisation, signale les procédures où du matériel réemployable existe probablement, et trie par secteurs à fort potentiel de réemploi (industrie, restauration, BTP). Données ouvertes, aucune récupération interdite.
- **Valeur pour la société :** Donner une seconde vie à des équipements voués à la destruction : réemploi réel, économie circulaire mesurable, avantage pour les petites structures qui ne peuvent pas payer un veilleur.
- **Canal :** communautes — premiers clients : Les communautés d'acteurs du réemploi (réseaux des ressourceries, groupes LinkedIn des acheteurs d'occasion industrielle) : compte gratuit limité, alerte e-mail quotidienne complète en abonnement.
- **Revenu :** Abonnement mensuel à l'alerte filtrée par secteur et région. (15 €/mois, 120 €/an pour l'accès complet aux alertes quotidiennes.)
- **Premier test :** En 2 semaines : diffuser gratuitement pendant 10 jours le digest quotidien des liquidations les plus riches en matériel dans 5 groupes de professionnels du réemploi, puis passer à 15 €/mois. Objectif : 10 abonnés payants.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin
- **Originalité mesurée :** 10/10
- **Élan :** pas assez de signal — « BODACC alerts » HN 0 contre 0, GitHub 1 contre 0 ; « liquidation assets » HN 0 contre 0
- **Enquête :** verdict creuser — L'angle réemploi est différenciant et la donnée est gratuite, mais aucune preuve de prix payant dans le même besoin n'a été trouvée et la demande d'acheteurs de matériel (vs. veille commerciale) reste à valider par le test prévu.
  - Concurrents : [Coxee – Veille BODACC clients](https://coxee.fr/cas/veille-bodacc-clients) (prix ?, ressemblance 6/10) ; [bodacc.io](https://bodacc.io/fr) (prix ?, ressemblance 5/10) ; [Charik (veille BODACC clients/prospects)](https://www.charik.app/blog/bodacc-surveiller-clients-prospects) (prix ?, ressemblance 5/10) ; [NextToYourBusiness (cartographie reprises/cessions)](https://www.data.gouv.fr/reuses/reprises-cessions-dentreprises-marche-de-la-transmission-par-commune) (gratuit, ressemblance 4/10)
  - Qui paie déjà : Non visible dans les résultats : aucune page de prix trouvée pour Coxee, bodacc.io ou Charik ; les acheteurs de veille BODACC payante existent (agences, fournisseurs, mandataires) mais les tarifs exacts ne figurent sur aucune page des résultats.
  - Angle libre : Personne ne filtre le BODACC sous l'angle du réemploi : les concurrents visent les sales/clients (Charik, Coxee) ou la transmission d'entreprises (NextToYourBusiness), pas les acheteurs de matériel à sauver de la ferraille, et aucun ne trie par potentiel de réemployabilité sectorielle.
  - Risque juridique : faible — Données ouvertes sous licence libre (DILA/data.gouv.fr), aucun contact interdit à manipuler si on reste sur le signalement des annonces.
- **Faille :** La défendabilité est fragile : une fois le filtre connu, un concurrent peut copier le code et l'API publique, et la valeur ajoutée (filtrage, résumé) est reproductible par un agent IA gratuit.
- **Mutation proposée :** Ajouter une couche de données propriétaires : historique des ventes réelles, estimation de valeur de revente, contacts vérifiés des liquidateurs, et un système de notation des annonces par les acheteurs, créant un effet de réseau et une barrière à l'entrée.

## 4. Rembourse-moi, vite
**Score 6.84 / 10** · douleur 7.2 · paiement 5 · espace 7.0 · élan 4.4 · critique 7.4 · tournoi 8.0 · risque 5 — grand-public, née d'une douleur réelle

- **Problème :** Les consommateurs victimes de commandes frauduleuses ou non livrées sur des places de marché (Amazon, app stores) n'ont aucun contact humain pour obtenir un remboursement.
- **Pour qui :** Tout acheteur en ligne bloqué par un chatbot ou une absence de service client après un paiement litigieux.
- **Solution :** Un agent IA autonome qui, sur simple envoi du ticket de caisse et des preuves par l'utilisateur, rédige une lettre de mise en demeure conforme au droit français, l'envoie par courrier recommandé électronique (API La Poste) et suit le dossier jusqu'au remboursement.
- **Valeur pour la société :** Rétablit un équilibre de pouvoir entre le consommateur et les géants du commerce électronique, réduit l'impunité des fraudes.
- **Canal :** seo-programmatique — premiers clients : 10 premiers clients via une page SEO optimisée pour « remboursement Amazon impossible », « litige colis non reçu », « contacter service client Amazon », postée sur des forums consommateurs (Que Choisir, 60 Millions de consommateurs).
- **Revenu :** Paiement à l'acte : 5 € par lettre de mise en demeure envoyée, 15 € si le suivi aboutit à un remboursement. (5)
- **Premier test :** Lancer une page vitrine sur Gumroad avec le service à 5 €, générer 10 clients via un post sur un groupe Facebook d'entraide consommateurs, traiter manuellement les 10 premiers dossiers pour valider le modèle.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin ; 6 personnes disent payer déjà
- **Originalité mesurée :** 10/10
- **Élan :** ×0.84 sur 90 jours — « refund automation » HN 0 contre 0, GitHub 44 contre 53 ; « chargeback dispute » HN 1 contre 0
- **Preuve de terrain :** gisement « Impossibilité de contacter l'éditeur pour un remboursement », 10 mentions (App Store us, App Store fr, App Store be)
  - « Trois commandes frauduleuses ont été débitées sur mon compte, Malgré mes preuves et mes démarches, Service client difficilement joignable » — [App Store fr](https://apps.apple.com/fr/app/amazon-fr/id358861688?uo=2)
  - « on ne peut contacter PERSONNE. Pas de mail, pas de chat en ligne, pas de téléphone.. » — [App Store fr](https://apps.apple.com/fr/app/whatnot-live-shopping-vid%C3%A9o/id1488269261?uo=2)
  - « c’est un calvaire de trouver comment communiquer avec un humain » — [App Store fr](https://apps.apple.com/fr/app/amazon-fr/id358861688?uo=2)
- **Enquête :** verdict creuser — Le besoin est massif et prouvé mais personne ne paie encore pour ce service côté consommateur : valider la volonté de payer à 5 € est exactement le bon premier test, en restant prudemment hors du périmètre juridique réglementé.
  - Concurrents : [Agents Handbook - dispute-a-purchase-with-a-merchant-or-chargeback](https://github.com/0xrome/agentshandbook/blob/master/playbooks/dispute-a-purchase-with-a-merchant-or-chargeback/SKILL.md) (Gratuit (playbook open-source), ressemblance 7/10) ; [eesel AI (automatisation remboursements côté marchand)](https://www.eesel.ai/fr/blog/automatisation-des-remboursements-ia-ecommerce) (prix ?, ressemblance 3/10) ; [Intake (agent IA support e-commerce côté marchand)](https://www.intake.es/en/ai-support-ecommerce) (prix ?, ressemblance 2/10) ; [Volubile (agent vocal retail côté marchand)](https://www.volubile.ai/fr/industrie/retail-e-commerce) (prix ?, ressemblance 2/10)
  - Qui paie déjà : Personne ne paie directement pour ce service côté consommateur dans les résultats ; les consommateurs utilisent gratuitement les médiateurs, associations de consommateurs ou chatbots IA génériques. Les marchands, eux, paient des outils IA (eesel, Intake, Volubile) pour traiter ces demandes en amont.
  - Angle libre : Aucun concurrent ne fait l'agent du consommateur : tout l'écosystème IA (eesel, Intake, Volubile) automatise les remboursements côté marchand ; côté consommateur il n'existe qu'un playbook gratuit sans exécution. L'angle libre est l'envoi automatisé de mise en demeure conforme au droit français via LRE (API La Poste) avec suivi jusqu'au remboursement.
  - Risque juridique : moyen — Rédaction de mises en demeure au nom de consommateurs peut toucher au démarchage juridique réglementé (réservé aux avocats en France) ; il faut rester de l'assistance documentaire, pas du conseil juridique.
- **Faille :** Le risque juridique est élevé : l'IA génère des documents légaux (mise en demeure). Si le modèle est imparfait, l'utilisateur est prévenu, mais si l'IA commet une erreur de droit ou de procédure, la responsabilité du service est engagée, ce qui est incompatible avec un modèle de 'faible risque' pour un service d'automatisation juridique.
- **Mutation proposée :** Ne pas se positionner comme un 'rédacteur de lettre', mais comme un 'stratège de litige' : l'IA doit analyser la CGV du géant (Amazon, etc.), les preuves, et les lois applicables, pour proposer un plan d'action (médiation, réclamation interne, mise en demeure) avec une probabilité de succès estimée, et seulement exécuter la démarche la plus efficace.

## 5. FuckMuseum : base de données interactive des erreurs de terminal et de leurs solutions
**Score 6.64 / 10** · douleur 7.1 · paiement 4 · espace 4.0 · élan 4.6 · critique 8.2 · tournoi 6.0 · risque 10 — apprendre, née d'une faille calculée (reprendre-l-abandon)

- **Problème :** Les débutants en ligne de commande se heurtent à des erreurs cryptiques et ne savent pas comment les résoudre, surtout quand TheFuck ne fonctionne pas.
- **Pour qui :** Étudiants en informatique, autodidactes et nouveaux développeurs qui apprennent le terminal.
- **Solution :** Un site généré par agents à partir des erreurs réelles collectées anonymement, avec des explications claires, des vidéos courtes, et un simulateur de terminal qui montre les correctifs en direct.
- **Valeur pour la société :** Démocratise l'apprentissage du terminal, réduit le décrochage technique et crée une ressource pédagogique libre et vivante.
- **Canal :** contenu-court — premiers clients : Publier 10 vidéos TikTok et YouTube Shorts montrant des erreurs courantes et leurs correctifs, et rediriger les spectateurs vers le site; contacter les subreddits d'apprentissage (r/learnprogramming) pour partager la ressource.
- **Revenu :** Vente de cartes de révision numériques et d'un ebook « Les 100 erreurs de terminal les plus fréquentes », plus abonnement premium pour le simulateur avancé. (5)
- **Premier test :** Créer un site avec 50 erreurs documentées, le publier sur Reddit et Product Hunt, et proposer l'ebook à 5 euros aux 10 premiers visiteurs qui s'inscrivent à la newsletter.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin
- **Originalité mesurée :** 10/10
- **Élan :** ×0.9 sur 90 jours — « terminal errors » HN 1 contre 0, GitHub 204 contre 205 ; « command line » HN 528 contre 654
- **Faille :** Faille (logiciel très utilisé, abandonné) : nvbn/thefuck : Magnificent app which corrects your previous console command.
  - [GitHub](https://github.com/nvbn/thefuck) — Magnificent app which corrects your previous console command.
- **Enquête :** verdict creuser — Le besoin est prouvé mais déjà servi gratuitement par TheFuck ; l'angle base de données pédagogique web + simulateur est différenciant, à valider par le test des 50 erreurs avant de créer l'ebook payant.
  - Concurrents : [TheFuck](https://github.com/nvbn/thefuck) (prix ?, ressemblance 7/10) ; [tf-ai (thefuckai)](https://github.com/AspireOne/thefuckai) (prix ?, ressemblance 7/10) ; [TheFuck (PyPI)](https://pypi.org/project/thefuck/3.28) (prix ?, ressemblance 6/10) ; [thefuck — ConfigCrate guide](https://configcrate.com/thefuck-command-corrector.html) (prix ?, ressemblance 4/10)
  - Qui paie déjà : Personne ne paie directement : le besoin est résolu par des outils open source gratuits (TheFuck) et de la documentation gratuite ; les développeurs paient indirectement via des formations CLI et ebooks techniques.
  - Angle libre : Un site web éducatif consultable sans installation (explications pédagogiques, vidéos, simulateur de terminal) alors que TheFuck et ses clones sont des outils CLI sans couche didactique ni base de données d'erreurs documentées pour débutants.
  - Risque juridique : faible — Contenu éducatif original et collecte de données anonymisée ; veiller simplement à ne pas réutiliser le nom 'TheFuck' (open source, licence MIT, mais marque potentielle).
- **Faille :** La valeur ajoutée repose uniquement sur la compilation d'erreurs publiques. Si les solutions générées par l'IA sont trop génériques (ex: 'vérifiez votre syntax'), l'utilisateur ne verra pas de différence significative avec une recherche Google, ce qui fragilise la monétisation des produits premium.
- **Mutation proposée :** Intégrer un système de 'profil d'erreur' (Error Profile) qui ne se contente pas de donner la solution, mais identifie le prérequis manquant (ex: 'Vous n'avez pas installé Node.js', 'Vous n'avez pas configuré votre PATH'), transformant ainsi le catalogue d'erreurs en un parcours d'apprentissage structuré.

## Suivantes
6. **Sismographe salarial ouvert** (6.58) — Les barèmes de salaires vendus aux développeurs et aux agents sont chers, opaques et mal actualisés ; les agents IA qui conseillent des candidats manquent d'une source de salaires fraîche et fiable.
7. **LegacyShift : détecteur de dépendances open source mortes** (6.53) — Des milliers de packages npm comme request (3065 votes, 92 mois sans réponse) sont encore dans des millions de builds, sans que personne ne sache lesquels sont desfailles silencieuses. Les équipes découvrent la mort d'une dépendance le jour d'une faille de sécurité.
8. **Radar de recrutement pour vendeurs B2B** (6.43) — Les petits vendeurs de logiciels et prestataires ne savent pas à qui écrire : les signaux d'achat les plus fiables (une entreprise qui ouvre 5 postes de comptable ou de développeur) sont enterrés dans les job boards et personne ne les rend exploitables aux indépendants.
9. **Verdict sécurité en API pour les agents IA** (6.35) — Les applis d'identification (champignons, plantes) et les agents IA généralistes n'ont aucune source fiable et structurée de verdicts de comestibilité et toxicité ; leurs réponses sont dangereusement vagues.
10. **Radar de trafic IA par domaine : « qui reçoit les clients de ChatGPT ? »** (6.18) — Les e-commerçants et créateurs ignorent si les IA recommandent leurs concurrents plutôt qu'eux ; le scraper du gisement donne le chiffre brut mais aucun plan d'action ni suivi dans le temps.

## Gisements les plus forts
- **Abus des abonnements mobiles** — 61 mentions (0 aujourd'hui), 4 sources, force 18.048
- **Outils utilitaires et de développement manquants** — 148 mentions (34 aujourd'hui), 7 sources, force 16.988
- **Service client défaillant après paiement** — 33 mentions (4 aujourd'hui), 5 sources, force 15.964
- **Tarification abusive des contenus numériques** — 80 mentions (5 aujourd'hui), 4 sources, force 14.538
- **Résiliation d'abonnement impossible** — 35 mentions (0 aujourd'hui), 3 sources, force 12.643
- **Remboursements et compensations de livraison non honorés** — 31 mentions (3 aujourd'hui), 3 sources, force 11.794
- **Problèmes de performance des applications mobiles** — 72 mentions (6 aujourd'hui), 4 sources, force 11.762
- **Retards de livraison imprévisibles** — 48 mentions (14 aujourd'hui), 3 sources, force 10.92
- **Non-remboursement en cas de vol par le livreur** — 16 mentions (1 aujourd'hui), 3 sources, force 10.388
- **Support client inaccessible en cas de bug applicatif** — 29 mentions (3 aujourd'hui), 4 sources, force 9.897
- **Services e-mail privés et de qualité** — 21 mentions (3 aujourd'hui), 3 sources, force 9.397
- **Mises à jour dégradant l'expérience utilisateur** — 37 mentions (2 aujourd'hui), 4 sources, force 9.229

## Santé
- Sources : hn 54 ; hn_achat 59 ; appstore 1546 ; stackexchange 180 ; lemmy 150
- deepseek : 355 ok, 3 échecs (1 %), 8329 ms — réponse illisible (fin : stop) : {"produits": []}
- qwen : 306 ok, 1 échecs (0 %), 10991 ms — réponse illisible (fin : stop) : []
- mistral : 26 ok, 1 échecs (4 %), 13835 ms — réponse illisible (fin : stop) : []
- mercury : 182 ok, 155 échecs (46 %), 9208 ms — aucun fournisseur pour mercury (openrouter : HTTP 429 ; groq : clé absente)
- glm : 327 ok, 0 échecs (0 %), 8009 ms
- Atlas vivant : 24/36 API répondent (muettes : seismes, eonet, gbif, openfoodfacts, essais-cliniques, openfda, osm, gdelt, solaire, gutendex, openverse, nasa-apod)
- Étapes : radar 341 s (cumul 0.0311 $) ; marche 5 s (cumul 0.0311 $) ; atlas 24 s (cumul 0.0311 $) ; failles 195 s (cumul 0.1253 $) ; usine 933 s (cumul 0.3877 $) ; enquete 42 s (cumul 0.47 $) ; elan 87 s (cumul 0.47 $)