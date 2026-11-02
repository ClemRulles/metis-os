# Opportunités du 2026-11-02

446 textes réels lus → 183 douleurs → 916 gisements, plus 12 gisements du marché des agents (944 outils payants observés). 663 idées générées, 523 critiquées, 80 duels, 15 enquêtes web. Coût : 0.352 $ en 943 appels, 20 min.

Classement fondé sur les preuves (douleur réelle, prix lu sur la page ou paiement observé sur le marché, espace libre, élan sur 90 jours, risque) ; l'avis des IA pèse environ 30 %.

## 1. BugAlert
**Score 7.53 / 10** · douleur 7.3 · paiement 10 · espace 3.0 · élan 6.0 · critique 8.0 · tournoi 8.0 · risque 10 — createurs, née d'une douleur réelle

- **Problème :** Les utilisateurs payants découvrent des bugs bloquants et estiment leur abonnement escroquerie, ce qui ruine la réputation des petits développeurs qui n'ont pas le temps de lire tous les avis négatifs.
- **Pour qui :** Indépendants et petits studios d'applications mobiles qui vendent en abonnement mais n'ont pas d'équipe QA.
- **Solution :** Un agent surveille en continu les avis récents de l'App Store et du Play Store d'une app, détecte les signaux de bugs récurrents, les regroupe par sévérité et envoie un rapport quotidien priorisé directement au développeur.
- **Valeur pour la société :** Moins d'applications cassées payantes, des consommateurs mieux servis, et des développeurs honnêtes qui corrigent vite au lieu de perdre des abonnés.
- **Canal :** place-de-marche-api — premiers clients : Forum IndieDev sur Reddit, serveur Discord des French Tech Dev, groupe LinkedIn 'Indie Makers France'.
- **Revenu :** Abonnement mensuel SaaS par application suivie. (29€/mois)
- **Premier test :** Offrir à 5 développeurs indépendants une version gratuite pendant 2 semaines, puis leur proposer un abonnement à 29€/mois avec alertes Slack/email si le rapport leur a fait gagner du temps.
- **Preuve de paiement :** 1 prix lus sur la page, 1 offres payantes du même besoin ; 3 outils payants utilisés sur le marché des agents ; 12 personnes disent payer déjà
  - Marché des agents : [Google Play Store Reviews Scraper](https://apify.com/neatrat/google-play-store-reviews-scraper) — 399 utilisateurs/30 j, 0.00015 $ par review
  - Marché des agents : [Google Play Scraper](https://apify.com/curious_coder/google-play-scraper) — 122 utilisateurs/30 j, 0.0003 $ par result
  - Marché des agents : [Fast Google Play Reviews Scraper API | Android App Reviews](https://apify.com/theagents/googleplay-reviews) — 117 utilisateurs/30 j, 0.0001 $ par review
  - Serveurs MCP déjà publiés sur ce besoin : 0
- **Élan :** ×1.31 sur 90 jours — « app store reviews » HN 8 contre 5, GitHub 489 contre 394 ; « bug triage » HN 2 contre 7
- **Preuve de terrain :** gisement « Fonctionnalités défaillantes dans les applications payantes », 27 mentions (App Store fr, App Store be, App Store us)
  - « J ai une gros bug depuis 1 semaine je n’arriver plus à insérer des photos sur la conversation Et je paye un abonnement vraiment une escroquerie » — [App Store fr](https://apps.apple.com/fr/app/chatgpt/id6448311069?uo=2)
  - « les offres souvent ne marche pas et impossible de payer les commandes. L’application a que des bugs en ce moment. » — [App Store fr](https://apps.apple.com/fr/app/burger-king-france/id924879230?uo=2)
  - « Ou on vend de la formation ou on fait une application pratique et utile ! Il faut choisir ! » — [App Store fr](https://apps.apple.com/fr/app/premiers-secours-ifrc/id1312876691?uo=2)
- **Enquête :** verdict creuser — Le besoin est réel et Heednest le valide, mais il arrive avec exactement la même promesse (avis groupés, sévérité, issues, réponses) : il faut soit un différenciateur fort (risque de churn abonnés payants, alertes temps réel), soit accepter d'arriver second sur un créneau déjà occupé.
  - Concurrents : [Heednest](https://heednest.com/) (null (bêta privée début 2027, pricing fondateur annoncé), ressemblance 9/10) ; [Appxiom](https://www.appxiom.com/) (null (essai gratuit, pricing non affiché), ressemblance 6/10) ; [TestPilot](https://testpilot.minitap.ai/) (null (pricing annoncé mais non visible dans les résultats), ressemblance 4/10) ; [Bugsmash](https://bugsmash.dev/) (null (démarrage gratuit, pricing non affiché), ressemblance 3/10)
  - Qui paie déjà : Personne ne paie encore publiquement pour ce besoin précis dans les résultats : Heednest est en bêta privée (pricing fondateur annoncé mais non chiffré), Appxiom et Bugsmash offrent des essais gratuits sans prix affiché. Le marché payant le plus proche reste les outils de monitoring (Sentry, Bugsnag) absents des résultats. ([preuve](https://heednest.com/))
  - Angle libre : Heednest couvre déjà la surveillance d'avis + GitHub (etannonce l'extension Play Store) : l'angle restant est la spécialisation 'abonnés payants en colère' — score de risque de churn/désabonnement par bug, alertes temps réel (< 24h) plutôt que digest quotidien, et focus petits studios vendant en abonnement.
  - Risque juridique : faible — Agrégation de contenus publics via API officielles App Store/Play Store, sans données personnelles sensibles.
- **Faille :** Le risque majeur réside dans le 'bruit' des avis : l'agent doit impérativement distinguer un bug technique reproductible d'une insatisfaction utilisateur ou d'un problème lié à la configuration de l'appareil. Si le taux de faux positifs est élevé, le développeur ignorera le rapport (fatigue d'alerte).
- **Mutation proposée :** Intégrer un système de 'recommandation de patch' ou de 'priorisation par impact business'. Au lieu de simplement signaler le bug, l'agent devrait proposer une classification de la sévérité basée non seulement sur le langage (ex: 'crash'), mais aussi sur l'impact potentiel (ex: 'bloque le paiement' vs 'problème d'esthétique').

## 2. Le Relais de Voix : la mémoire parlée des aînés, livrée en abonnement familial
**Score 6.77 / 10** · douleur 7.0 · paiement 10 · espace 4.0 · élan 5.5 · critique 7.0 · tournoi 6.0 · risque 5 — familles-et-aines, visionnaire (signal-faible)

- **Problème :** Les petits-enfants veulent garder les histoires et la voix de leurs grands-parents, mais personne ne trouve le temps ni la méthode pour les enregistrer, et les enregistrements restent dispersés ou perdus.
- **Pour qui :** Les petits-enfants et enfants d'aînés de 40-60 ans qui paient pour la tranquillité et la mémoire familiale.
- **Solution :** Un agent IA appelle ou guide l'aîné par téléphone ou via une box simple, pose les bonnes questions de biographie orale, transcrit, indexe et livre chaque mois un épisode audio monté et partageable à la famille.
- **Valeur pour la société :** Préserver la transmission intergénérationnelle, lutter contre l'isolement des aînés en donnant un prétexte régulier d'échange parlé.
- **Canal :** place-de-marche-numerique — premiers clients : Groupes Facebook et forums d'aidants (France Aidants, Aidants Family), offres cadeau sur Gumroad pour la fête des grands-parents.
- **Revenu :** Abonnement mensuel familial avec épisode livré chaque mois. (19 euros par mois par famille, offre cadeau 49 euros pour 3 mois.)
- **Premier test :** En 2 semaines : vendre 10 coffrets cadeaux à 49 euros sur Gumroad et livrer le premier épudio à chaque famille avec un vrai enregistrement téléphonique guidé.
- **Preuve de paiement :** 2 prix lus sur la page, 2 offres payantes du même besoin
- **Élan :** ×1.14 sur 90 jours — « family legacy » HN 2 contre 2, GitHub 88 contre 110 ; « oral history » HN 36 contre 21
- **Enquête :** verdict creuser — Le besoin est prouvé et payant mais le créneau est déjà bondé ; seule la mécanique d'appel sortant + épisode audio mensuel clé en main est vraiment différenciante, à valider avant d'investir.
  - Concurrents : [Essenz](https://myessenz.com/index_en.html) (prix ?, ressemblance 8/10) ; [Heirlūum](https://heirluum.co/) (prix ?, ressemblance 7/10) ; [Living Memoirs](https://living-memoirs.noematic.eu/) (15 €/mois (après beta), ressemblance 8/10) ; [Ystory](https://www.rfgenealogie.com/infos/ystory-l-application-pour-raconter-sa-vie) (5 €/an (stockage après abonnement), ressemblance 7/10)
  - Qui paie déjà : Des familles adultes (enfants/petits-enfants d'aînés) paient déjà des abonnements de biographie orale (Living Memoirs 15 €/mois, Ystory) et des coffrets cadeaux type StoryWorth ; le marché du cadeau familial est le point d'entrée prouvé. ([preuve](https://living-memoirs.noematic.eu/))
  - Angle libre : Aucun concurrent trouvé ne fait d'appels téléphoniques sortants automatiques à l'aîné avec livraison mensuelle d'un épisode audio monté et partageable : tous reposent sur l'initiative de la famille ou d'une app à installer.
  - Risque juridique : moyen — Enregistrement téléphonique de personnes âgées : consentement, RGPD (données vocales sensibles, durée de conservation après décès), et droits sur les voix des défunts.
- **Faille :** La promesse d'un épisode monté chaque mois repose sur la coopération d'un aîné souvent réticent ou fatigué ; sans engagement garanti de sa part, le service peut livrer des épisodes vides ou médiocres, et l'abonné se désengage vite.
- **Mutation proposée :** Ajouter un 'kit de lancement' physique ou numérique qui engage l'aîné (questionnaire illustré, invitation à raconter une histoire précise) et un mécanisme de remplacement : si l'aîné ne répond pas, l'agent produit un épisode à partir d'archives familiales (photos, lettres) fournies par l'abonné, garantissant une livraison mensuelle même sans appel réussi.

## 3. Resili.io : L'API de Résiliation pour Développeurs
**Score 6.75 / 10** · douleur 8.1 · paiement 5 · espace 7.0 · élan 5.8 · critique 7.6 · tournoi 8.0 · risque 5 — donnees-et-api, née d'une douleur réelle

- **Problème :** Il n'existe aucun standard technique pour vérifier ou déclencher la fin d'un contrat numérique, forçant chaque utilisateur à chercher manuellement.
- **Pour qui :** Développeurs d'applications financières, agrégateurs de budget (type Bankin', Linxo), et agents IA personnels.
- **Solution :** Une API REST qui prend un nom de service et un ID utilisateur (ou un screenshot) et retourne le lien exact de résiliation, la date de prochain prélèvement et la procédure requise.
- **Valeur pour la société :** Standardisation de la portabilité et de la résiliation numérique, rendant le marché plus concurrentiel et juste.
- **Canal :** place-de-marche-api — premiers clients : Groupes Slack de développeurs Fintech et startups AgriTech/Fintech françaises.
- **Revenu :** Abonnement mensuel par clé API + coût par appel. (29)
- **Premier test :** Listage sur RapidAPI et Apify Store avec un plan gratuit limité à 50 appels/mois pour validation technique.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin ; 32 personnes disent payer déjà
  - Marché des agents : [Booking.com Search Scraper - Hotels, Prices & Reviews](https://apify.com/scrapercompany/booking-search-scraper) — 0 utilisateurs/30 j, 0.006 $ par Booking.com results page
  - Serveurs MCP déjà publiés sur ce besoin : 0
- **Élan :** ×1.26 sur 90 jours — « subscription cancellation » HN 0 contre 2, GitHub 113 contre 89 ; « cancellation API » HN 1 contre 0
- **Preuve de terrain :** gisement « Résiliation d'abonnement impossible », 35 mentions (App Store be, App Store us, App Store fr)
  - « Geraak er niet vanaf. Heb alles geprobeerd om het het abonnement op te zeggen maar geraak er niet vanaf. » — [App Store be](https://apps.apple.com/be/app/kobo-books-audiobooks/id301259483?uo=2)
  - « You can only cancel your subscription through a desktop computer, not through the mobile app. » — [App Store be](https://apps.apple.com/be/app/audible-audiobooks-podcasts/id379693831?uo=2)
  - « Vous avez renouveler l’abonnement sans mon consentement bande de voleur 💔🤬🤬🤬🤬 » — [App Store be](https://apps.apple.com/be/app/dramawave-dramas-reels/id6670430706?uo=2)
- **Enquête :** verdict creuser — L'idée est plausiblement nouvelle mais les résultats fournis ne contiennent aucune preuve de demande ni de concurrent direct avec prix : il faut valider la demande (forums devs,拟 clients type agrégateurs) et les CGU des services cibles avant de foncer.
  - Concurrents : [OIB Solutions - API Assurance](https://oib-solutions.com/api-assurance) (prix ?, ressemblance 3/10)
  - Qui paie déjà : Non identifiable dans les résultats : aucun concurrent direct avec prix public trouvé (pas de plateforme type 'cancellation API' ou 'subscription termination API' dans les résultats fournis).
  - Angle libre : Aucun acteur ne normalise la résiliation en API inter-services (lien de résiliation + prochaine date de prélèvement + procédure) pour les apps financières et agents IA ; OIB ne couvre que l'assurance en B2B2C, pas la résiliation multi-verticale.
  - Risque juridique : moyen — Automatiser ou pointer les procédures de résiliation de tiers peut heurter leurs CGU (scraping, screenshots) et touche à des données personnelles (RGPD) ; la loi française sur la résiliation en 3 clics joue plutôt en faveur du produit mais impose de la rigueur.
- **Faille :** La dépendance aux données de scraping et à la maintenance manuelle des procédures de résiliation est le point de rupture. Les entreprises changent leurs conditions générales et leurs interfaces sans préavis, rendant l'API fragile et sujette à des erreurs critiques si elle n'est pas mise à jour en temps réel.
- **Mutation proposée :** Développer une couche de validation de la procédure (workflow) plutôt qu'un simple lien. Intégrer un système de monitoring web automatisé pour détecter les changements de CGU/UI et notifier le client API des procédures obsolètes, transformant le service en un outil de 'gestion de risque de résiliation' plutôt qu'un simple répertoire.

## 4. Dialectomètre : choisissez votre dialecte, on construit le programme
**Score 6.64 / 10** · douleur 7.0 · paiement 5 · espace 6.0 · élan 6.3 · critique 7.3 · tournoi 6.0 · risque 10 — apprendre, née d'une douleur réelle

- **Problème :** Les apps enseignent un standard générique et ignorent les dialectes (arabe maghrébin, espagnol mexicain, portugais brésilien), rendant l'apprentissage inutile pour de nombreux apprenants.
- **Pour qui :** Apprenants d'arabe, d'espagnol ou de portugais qui ont besoin du dialecte de leur région ou de leur pays cible, pas du MSA ou du castillan pur.
- **Solution :** Un générateur de programmes d'apprentissage paramétrable : l'utilisateur choisit son dialecte cible, son niveau et son objectif, et l'IA construit un parcours complet (vocabulaire, grammaire, audio) à partir de sources ouvertes et de corpus spécifiques.
- **Valeur pour la société :** Valorisation des langues et des dialectes minoritaires, réduction de la prédominance d'un seul standard dans l'apprentissage en ligne.
- **Canal :** place-de-marche-numerique — premiers clients : Communautés de la diaspora maghrébine en France (groupes Facebook, forums), apprenants d'espagnol latino-américain sur Reddit.
- **Revenu :** Vente à l'unité du pack dialecte (un dialecte = un pack payant). (19,99 € par pack dialecte)
- **Premier test :** Créer un pack « Arabe tunisien débutant complet » et le vendre sur Gumroad à 19,99 €, promu sur 3 groupes Facebook de la diaspora, avec objectif de 20 ventes en 14 jours.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin ; 3 personnes disent payer déjà
- **Élan :** ×1.45 sur 90 jours — « arabic dialects » HN 1 contre 1, GitHub 142 contre 97 ; « dialect learning » HN 0 contre 0
- **Preuve de terrain :** gisement « Applications d'apprentissage des langues inadaptées », 7 mentions (App Store us, App Store be, App Store fr)
  - « Après plus d’une année assidue en anglais il n’y a aucune progression pour parler !!! » — [App Store fr](https://apps.apple.com/fr/app/duolingo-langues-et-%C3%A9checs/id570060128?uo=2)
  - « Spijtig maar veel te duur » — [App Store be](https://apps.apple.com/be/app/speak-learn-english-learna/id6478287397?uo=2)
  - « I need to teach pronunciation, but they are almost entirely unable to do it » — [App Store us](https://apps.apple.com/us/app/learna-speak-learn-english/id6478287397?uo=2)
- **Enquête :** verdict creuser — Le besoin est réel et documenté (frustration dialecte des apps, pénurie de ressources pour l'arabe dialectal), mais aucune offre payante directe n'a été trouvée dans les résultats : il faut vérifier manuellement les acteurs existants (TalkInArabic, cours de dialecte sur Udemy/italki) et valider la volonté de payer à 19,99 € sur la diaspora avant de foncer.
  - Concurrents : [Duolingo (et alternatives listées)](https://www.jotme.io/fr/blog/duolingo-alternatives) (prix ?, ressemblance 4/10)
  - Qui paie déjà : Les apprenants paient déjà des cours particuliers et des apps génériques (Duolingo, Busuu) qui ne couvrent pas les dialectes ; l'Inalco vend une formation académique complète (licence, année intensive) mais académique et coûteuse, pas un pack numérique à 20 €. Aucune offre payante directe par dialecte n'apparaît dans les résultats.
  - Angle libre : Aucun acteur ne propose de packs complets par dialecte (tunisien, algérien, marocain) avec audio et grammaire : la lacune est documentée côté recherche comme côté apps grand public. Attention toutefois : créer du contenu de qualité par dialecte est coûteux, et des acteurs (TalkInArabic, Mango Languages hors résultats fournis) existent probablement — à vérifier manuellement.
  - Risque juridique : faible — Vente de contenus pédagogiques originaux générés à partir de sources ouvertes ; risque faible tant qu'on ne copie pas des manuels protégés.
- **Faille :** La défensibilité est faible : un assistant IA gratuit (ex. ChatGPT) peut déjà générer des leçons de dialecte sur demande, ce qui rend difficile de justifier un paiement récurrent ou même unitaire pour un pack.
- **Mutation proposée :** Créer une plateforme collaborative où les locuteurs natifs valident et enrichissent les contenus générés par l'IA, créant ainsi un réseau de confiance et une base de données propriétaire difficile à reproduire.

## 5. KidScore
**Score 6.34 / 10** · douleur 7.3 · paiement 5 · espace 6.0 · élan 5.9 · critique 7.1 · tournoi 8.0 · risque 5 — familles-et-aines, née d'une douleur réelle

- **Problème :** Les parents installent des applis pour enfants sans savoir qu'ils y seront harcelés de pubs et de demandes d'achat in-app agressives.
- **Pour qui :** Parents d'enfants de 3 à 12 ans, grands-parents qui offrent des tablettes.
- **Solution :** Un annuaire vérifié d'applis pour enfants où des agents analysent les avis, extraient les mentions de pubs, d'achats piégeux et de contenus inadaptés, et produisent une fiche parent simple : « nombre de pubs signalées, pression d'achat, alternatives propres ».
- **Valeur pour la société :** Protège les enfants du harcèlement publicitaire et des achats impulsifs, en donnant aux parents un pouvoir de choix fondé sur des faits.
- **Canal :** communautes — premiers clients : Groupes Facebook et forums de parents (Maman Testeuse, RedditParentalité), où les demandes « appli sans pub pour mon enfant » sont quotidiennes.
- **Revenu :** Abonnement familial annuel donnant accès aux fiches complètes et aux alertes sur les nouvelles applis. (19 euros par an par famille.)
- **Premier test :** 2 semaines : 100 fiches gratuites en ligne, un post dans 5 groupes de parents, et vente de l'accès complet à 19 euros ; viser 25 familles payantes.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin ; 2 personnes disent payer déjà
  - Marché des agents : [Amazon Reviews Scraper](https://apify.com/web_wanderer/amazon-reviews-extractor) — 641 utilisateurs/30 j, 0.001 $ par Review
  - Marché des agents : [Kleinanzeigen Listings Scraper](https://apify.com/barefoot_grade/kleinanzeigen-scraper) — 1 utilisateurs/30 j, 0.00075 $ par Listing
- **Élan :** ×1.3 sur 90 jours — « kids apps » HN 1 contre 2, GitHub 1190 contre 1188 ; « in-app purchases » HN 29 contre 16
- **Preuve de terrain :** gisement « Publicité intrusive dans les applications gratuites », 36 mentions (App Store fr, App Store be, App Store us)
  - « Beaucoup trop de pub comparé à avant sa devient illisible. Trop de pub / ilissible » — [App Store be](https://apps.apple.com/be/app/wattpad-read-write-stories/id306310789?uo=2)
  - « Energie en навязчивость рекламы портит все впечатление от приложения » — [App Store be](https://apps.apple.com/be/app/duolingo-language-chess/id570060128?uo=2)
  - « Application nulle les histoires sont interminables lorsque l’on ne paye pas, je ne recommande pas du tout » — [App Store fr](https://apps.apple.com/fr/app/reelshort-stream-drama-tv/id1636235979?uo=2)
- **Enquête :** verdict creuser — L'angle est distinct du contrôle parental et le prix est crédible, mais les résultats ne contiennent aucune preuve directe que des parents paieraient pour un annuaire de fiches : tester la demande avant de construire.
  - Concurrents : [Bark](https://play.google.com/store/apps/details?id=cm.pt.barkparent) ($14/mois ou $99/an, ressemblance 3/10) ; [Kidden Parental Control](https://play.google.com/store/apps/details?hl=en_US&id=com.applyft.kidden.parent) (prix ?, ressemblance 2/10) ; [Kids360](https://apps.apple.com/lc/app/parental-control-kids360/id1596059191) (prix ?, ressemblance 2/10) ; [SafeKiddo](https://apps.apple.com/us/app/safekiddo-parental-control/id1483440638) (prix ?, ressemblance 2/10)
  - Qui paie déjà : Les parents paient pour du contrôle parental (Bark $14/mois, filtres web, temps d'écran) mais aucun acteur trouvé dans ces résultats ne vend un annuaire de fiches « propreté publicitaire » des applis enfants ; preuve indirecte d'un budget parental pour la sécurité numérique.
  - Angle libre : Aucun concurrent des résultats ne fait d'analyse des avis pour quantifier pubs et pression d'achat in-app : un annuaire type « label propre » indépendant des magasins d'applis est un angle libre, à condition de valider la demande hors contrôle parental.
  - Risque juridique : moyen — Publier des accusations de « pubs agressives » ou « achats piégeux » sur des applis nommées expose à la diffamation ; il faut documenter chaque fiche et rester factuel.
- **Faille :** La défendabilité est faible : un assistant IA gratuit peut demain analyser les mêmes avis et produire des fiches équivalentes, rendant l'abonnement difficile à justifier.
- **Mutation proposée :** Ajouter un volet communautaire où les parents peuvent signaler en direct des applis non répertoriées ou des changements récents, et intégrer un outil de blocage automatique des applis dangereuses via un partenariat avec les stores (Play Store, App Store) pour verrouiller l'accès depuis le compte parent.

## Suivantes
6. **FactureBloquee** (6.27) — Les problèmes de facturation d'abonnements d'apps (double prélèvement, résiliation ignorée) rencontrent un support inexistant et les utilisateurs abandonnent des dizaines d'euros.
7. **FicheProduit — générateur de fiches produit conformes aux règles européennes pour vendeurs en ligne** (6.25) — Depuis le règlement européen 2024/825 (REEN) et les lois française sur l'information des consommateurs, chaque fiche produit doit mentionner origine, durabilité, réparabilité, indicateur environnemental. Les micro-vendeurs Etsy/Leboncoin n'ont ni le temps ni la culture réglementaire pour le faire correctement et risquent une amende.
8. **DisputeDoc Generator** (6.19) — Les utilisateurs ignorent qu'ils ont des droits spécifiques (ex: délai de rétractation, produit non conforme) et ne savent pas quoi écrire.
9. **AcheteurMultiEcran** (6.19) — Les petits vendeurs en ligne perdent des clients dont le panier ou la session ne suit pas entre mobile et ordinateur, et ne peuvent pas diagnostiquer eux-mêmes ces ruptures de parcours multi-appareils.
10. **Tracabilité des Litiges de Service Client en Temps Réel** (6.14) — Les consommateurs ne savent pas où porter plainte et les données sur les plaintes ne sont pas accessibles ; les entreprises ne sont pas incitées à répondre rapidement.

## Gisements les plus forts
- **Abus des abonnements mobiles** — 60 mentions (0 aujourd'hui), 4 sources, force 18.011
- **Service client défaillant après paiement** — 17 mentions (0 aujourd'hui), 5 sources, force 14.204
- **Tarification abusive des contenus numériques** — 75 mentions (1 aujourd'hui), 4 sources, force 14.156
- **Résiliation d'abonnement impossible** — 35 mentions (0 aujourd'hui), 3 sources, force 12.643
- **Remboursements et compensations de livraison non honorés** — 23 mentions (0 aujourd'hui), 3 sources, force 11.305
- **Problèmes de performance des applications mobiles** — 48 mentions (0 aujourd'hui), 4 sources, force 10.769
- **Support client inaccessible en cas de bug applicatif** — 22 mentions (0 aujourd'hui), 4 sources, force 9.443
- **Retards de livraison imprévisibles** — 17 mentions (0 aujourd'hui), 3 sources, force 8.718
- **Qualité dégradée des livraisons de repas** — 10 mentions (1 aujourd'hui), 4 sources, force 8.61
- **Outils utilitaires et de développement manquants** — 44 mentions (17 aujourd'hui), 4 sources, force 8.559
- **Frais de services cachés et perçus comme abusifs** — 16 mentions (0 aujourd'hui), 4 sources, force 8.345
- **Violations de confidentialité et spam dans les apps de santé** — 17 mentions (0 aujourd'hui), 4 sources, force 8.218

## Santé
- Sources : hn 53 ; hn_achat 59 ; appstore 5 ; stackexchange 180 ; lemmy 150
- qwen : 234 ok, 0 échecs (0 %), 8439 ms
- mercury : 33 ok, 0 échecs (0 %), 5317 ms
- deepseek : 245 ok, 0 échecs (0 %), 7231 ms
- mistral : 6 ok, 1 échecs (14 %), 15661 ms — réponse illisible (fin : stop) : []
- mimo : 185 ok, 37 échecs (17 %), 15906 ms — aucun fournisseur pour mimo (openrouter : The operation was aborted due to timeout ; groq : clé absente)
- glm : 236 ok, 0 échecs (0 %), 5294 ms
- Atlas vivant : 26/36 API répondent (muettes : seismes, eonet, essais-cliniques, openfda, osm, gdelt, solaire, gutendex, openverse, nasa-apod)
- Étapes : radar 219 s (cumul 0.0231 $) ; marche 5 s (cumul 0.0231 $) ; atlas 24 s (cumul 0.0231 $) ; usine 854 s (cumul 0.2656 $) ; enquete 25 s (cumul 0.352 $) ; elan 90 s (cumul 0.352 $)