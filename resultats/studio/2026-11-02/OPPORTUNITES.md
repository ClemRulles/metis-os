# Opportunités du 2026-11-02

762 textes réels lus → 413 douleurs → 1317 gisements, plus 12 gisements du marché des agents (949 outils payants observés) et 24 failles calculées (14 transplants vérifiés). 795 idées générées, 643 critiquées, 80 duels, 15 enquêtes web. Coût : 0.454 $ en 1671 appels, 28 min.

Classement fondé sur les preuves (douleur ou faille mesurée, prix lu sur la page ou paiement observé, espace libre, originalité mesurée contre le réflexe d'un assistant IA, élan sur 90 jours, risque) ; l'avis des IA pèse 18 %.

## 1. Souscripteur Express
**Score 7.1 / 10** · douleur 8.1 · paiement 9 · espace 5.0 · élan 4.8 · critique 6.7 · tournoi 10.0 · risque 5 — grand-public, née d'une douleur réelle

- **Problème :** Les utilisateurs sont piégés par des abonnements impossibles à résilier, avec renouvellements automatiques non consentis et débits excessifs.
- **Pour qui :** Toute personne ayant un abonnement récurrent (app, salle de sport, streaming) qu'elle n'arrive pas à annuler.
- **Solution :** Un site libre-service où l'utilisateur décrit son abonnement ; nos agents identifient le canal de résiliation exact (page web, email type, formulaire), génèrent les documents nécessaires et envoient automatiquement les demandes de résiliation avec accusés de réception.
- **Valeur pour la société :** Renforce le pouvoir des consommateurs face aux pratiques abusives, réduit le gaspillage financier et le stress.
- **Canal :** seo-programmatique — premiers clients : Cibler les forums d'entraide (Reddit, UFC Que Choisir) et les groupes Facebook de consommateurs mécontents.
- **Revenu :** Frais par résiliation réussie + abonnement premium pour suivi des renouvellements. (9.99)
- **Premier test :** Créer une landing page avec un formulaire de demande de résiliation, traiter manuellement 10 cas pour valider la faisabilité et faire payer 10 utilisateurs via un lien de paiement.
- **Preuve de paiement :** 1 prix lus sur la page, 1 offres payantes du même besoin ; 32 personnes disent payer déjà
- **Originalité mesurée :** 7.22/10
- **Élan :** ×0.93 sur 90 jours — « cancel subscription » HN 1 contre 2, GitHub 134 contre 144 ; « subscription trap » HN 2 contre 1
- **Preuve de terrain :** gisement « Résiliation d'abonnement impossible », 35 mentions (App Store be, App Store us, App Store fr)
  - « Geraak er niet vanaf. Heb alles geprobeerd om het het abonnement op te zeggen maar geraak er niet vanaf. » — [App Store be](https://apps.apple.com/be/app/kobo-books-audiobooks/id301259483?uo=2)
  - « You can only cancel your subscription through a desktop computer, not through the mobile app. » — [App Store be](https://apps.apple.com/be/app/audible-audiobooks-podcasts/id379693831?uo=2)
  - « Vous avez renouveler l’abonnement sans mon consentement bande de voleur 💔🤬🤬🤬🤬 » — [App Store be](https://apps.apple.com/be/app/dramawave-dramas-reels/id6670430706?uo=2)
- **Enquête :** verdict creuser — Le besoin est massif et documenté (12-16 abonnements par Français, régulateurs mobilisés), mais les solutions gratuites existantes et l'absence de preuve de paiement exigent de valider d'abord la disposition à payer 9,99€ via le test manuel prévu.
  - Concurrents : [Origame](https://www.jaimelesstartups.fr/origame-centralisation-des-abonnements-mensuels-pour-faire-des-economies) (gratuit (dashboard), économies jusqu'à 1000€/an, ressemblance 6/10) ; [SignalConso (DGCCRF)](https://signal.conso.gouv.fr/fr/renouvellement-abonnement-non-desire) (gratuit, ressemblance 5/10) ; [Litige.fr](https://www.litige.fr/articles/abonnement-impossible-resilier-solutions) (null, ressemblance 4/10)
  - Qui paie déjà : Aucune offre payante directe et chiffrée trouvée dans les résultats pour un service de résiliation d'abonnements ; les solutions existantes (SignalConso, Origame) sont gratuites, ce qui pose la question de la disposition à payer 9,99€. ([preuve](https://www.jaimelesstartups.fr/origame-centralisation-des-abonnements-mensuels-pour-faire-des-economies))
  - Angle libre : Aucun concurrent ne fait de la résiliation assistée avec envoi automatique des demandes et accusés de réception : Origame centralise et change de fournisseur, SignalConso signale mais ne résilie pas pour l'utilisateur. Un service 'on fait la démarche à votre place, avec preuve d'envoi' reste un angle libre, à condition de prouver que les gens paieront alors que des alternatives gratuites existent.
  - Risque juridique : moyen — Le service agit pour le compte de tiers dans des démarches contractuelles (mandat, RGPD, éventuelle réglementation sur les démarches en nom d'autrui) ; le cadre légal existe déjà (art. L215-1 C. conso) mais l'opérationnalisation par un tiers nécessite un mandat clair.
- **Faille :** Le canal principal (forums et groupes Facebook) est difficile à monétiser sans spam ou sans collecte de coordonnées, et le paiement par résiliation réussie crée une incitation à la tromperie si l'annulation échoue ou si l'utilisateur pouvait le faire seul gratuitement.
- **Mutation proposée :** Spécialiser le site sur les abonnements à forte valeur et juridiquement sensibles (ex. assurances auto, mutuelles) avec un outil de génération de lettre type et de suivi automatisé des accusés de réception, et facturer un abonnement mensuel forfaitaire (sans pourcentage) plutôt qu'un frais par résiliation, pour aligner l'incitation et éviter tout conflit d'intérêt.

## 2. IR-Flash : Générateur de Data Rooms & Q&A pour Startups
**Score 6.62 / 10** · douleur 8.0 · paiement 9 · espace 3.0 · élan 4.9 · critique 7.4 · tournoi 8.0 · risque 5 — travail-et-carrieres, née d'une faille calculée (reprendre-l-abandon)

- **Problème :** Les fondateurs passent des semaines à préparer les Due Diligence et répondent aux questions récurrentes des investisseurs, souvent de manière incohérente.
- **Pour qui :** Fondateurs de startups en phase Seed ou Série A cherchant à lever des fonds rapidement.
- **Solution :** Un SaaS libre-service qui analyse les slides deck et le modèle financier pour générer automatiquement une Data Room structurée et un jeu de réponses Q&A cohérent basé sur les données fournies.
- **Valeur pour la société :** Démocratise l'accès aux marchés financiers en rendant la professionnalisation de la relation investisseur accessible sans coûts de consultants élevés.
- **Canal :** place-de-marche-api — premiers clients : Communautés Slack/Twitter de founders (« YC Startup School », « French Tech »).
- **Revenu :** Abonnement mensuel (SaaS) pour l'accès complet au générateur. (97)
- **Premier test :** Lancer un formulaire Typeform demandant le pitch deck : les 10 premiers reçoivent gratuitement une ébauche de Data Room générée par l'IA via email.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin ; 2 outils payants utilisés sur le marché des agents
- **Originalité mesurée :** 5.83/10
  - Marché des agents : [Booking Scraper](https://apify.com/voyager/booking-scraper) — 1100 utilisateurs/30 j, 0.005 $ par Scraped place result
  - Marché des agents : [Booking Reviews Scraper](https://apify.com/voyager/booking-reviews-scraper) — 546 utilisateurs/30 j, 0.002 $ par Scraped review
  - Marché des agents : [Google Hotels Scraper - Prices, OTA Rates, Room Rates & Reviews](https://apify.com/factden/google-hotels-scraper) — 47 utilisateurs/30 j, 0.004 $ par Hotel
  - Serveurs MCP déjà publiés sur ce besoin : 0
- **Élan :** ×0.97 sur 90 jours — « data room » HN 4 contre 8, GitHub 1287 contre 1133 ; « due diligence » HN 235 contre 185
- **Faille :** Faille (ça marche à l'étranger, rien ici) : Outil d'IA native pour la gestion des relations investisseurs (IR) générant des visions stratégiques.
  - [Y Combinator Fall 2026](https://usecollarai.com) — Collar — AI-Native Investor Relations. We are a team of ex-intelligence, ex-finance, and most importantly, ex-founders who have known each other for over 5 year
- **Enquête :** verdict creuser — Le besoin est bien documenté et Pageform occupe déjà le créneau avec un produit proche et gratuit en entrée : il faut valider un angle différenciant (génération auto + Q&A) et un prix avant de foncer.
  - Concurrents : [Pageform (Startup Data Room)](https://pageform.io/startup-data-room) (prix ?, ressemblance 9/10) ; [Pageform (Fundraising Data Room)](https://pageform.io/fundraising-data-room) (prix ?, ressemblance 9/10)
  - Qui paie déjà : Les fondateurs en levée (Seed/Série A) paient déjà des data rooms virtuelles (Pageform, et historiquement DocSend, Ansarada, Datasite — non vérifiés dans ces résultats) et des conseils (avocats, CFO à temps partagé) pour préparer la due diligence.
  - Angle libre : Aucun concurrent des résultats ne génère automatiquement la data room ET les réponses Q&A cohérentes à partir du deck et du modèle financier : Pageform structure et analyse l'engagement mais part des documents existants ; l'angle 'génération + cohérence des réponses' reste ouvert, à condition de prouver que les fondateurs veulent de l'automatisé plutôt que du sur-mesure.
  - Risque juridique : moyen — Traitement de documents financiers et juridiques sensibles (RGPD, confidentialité vis-à-vis des investisseurs, responsabilité en cas d'erreur dans les réponses Q&A générées par IA).
- **Faille :** Le risque principal réside dans la confiance et la qualité du contenu. Si l'IA génère des réponses ou des structures de Data Room qui semblent génériques ou contiennent des 'hallucinations' financières/légales, le fondateur perd immédiatement confiance, rendant le SaaS inutilisable pour un processus aussi critique que la levée de fonds. La distribution est également trop vague (communautés Slack/Twitter) sans canal d'acquisition structuré.
- **Mutation proposée :** Intégrer un système de 'validation par l'humain' ou de 'niveau de confiance' sur chaque réponse générée par l'IA. L'outil ne doit pas fournir la réponse finale, mais un 'brouillon optimisé' avec des alertes claires : 'Cette réponse est basée sur l'hypothèse X du modèle financier ; veuillez la vérifier.' De plus, cibler des intégrations directes (API) avec des outils de gestion de projet/CRM VC (ex: Notion, Airtable) pour passer du générateur au workflow de DD.

## 3. La Fenêtre Pêche
**Score 6 / 10** · douleur 7.0 · paiement 2 · espace 6.0 · élan 6.0 · critique 7.2 · tournoi 6.0 · risque 10 — culture-et-loisirs, visionnaire (api-vivante)

- **Problème :** Les pêcheurs côtiers perdent des sorties entières à cause d'une houle ou d'une température d'eau mal jugée, et aucun outil ne croise conditions marine et fenêtres réellement praticables par type de pêche.
- **Pour qui :** Pêcheurs récréatifs côtiers et plongeurs qui planifient leurs sorties de bord de mer.
- **Solution :** Pour chaque spot côtier de France, des milliers de pages générées automatiquement qui traduisent houle, température et météo en verdict simple : « fenêtre 6h-10h exploitable pour la pêche du bord », avec pages par port et par technique.
- **Valeur pour la société :** Réduit les prises de risque en mer pour les amateurs mal équipés en données professionnelles.
- **Canal :** seo-programmatique — premiers clients : Les 10 premiers clients via forums et groupes Facebook/Discord de pêche du bord par région, en postant leurs pages de port favorites.
- **Revenu :** Freemium : pages publiques, abonnement pour alertes SMS/e-mail de fenêtre de pêche sur ses 5 spots favoris. (4,99 €/mois)
- **Premier test :** Publier 200 pages de ports gratuits, vendre l'alerte e-mail quotidienne à prix de lancement pendant 2 semaines et compter les payeurs.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin
- **Originalité mesurée :** 6.3/10
- **Élan :** ×1.31 sur 90 jours — « fishing forecast » HN 0 contre 0, GitHub 52 contre 39 ; « surf conditions » HN 2 contre 1
- **Enquête :** verdict creuser — Le besoin est réel, documenté et le marché (1,25 Md€) existe, mais aucun concurrent payant n'apparaît dans les résultats : il faut vérifier manuellement les apps existantes (marées, Windy, apps de pêche) et valider que des pêcheurs paient 4,99 €/mois pour une information agrégée.
  - Concurrents : aucun trouvé
  - Qui paie déjà : Aucune offre payante identifiée dans les résultats pour la traduction météo-marine en fenêtres de pêche ; les pêcheurs paient déjà du matériel et consultent des outils gratuits (marées, météo marine Météo-France).
  - Angle libre : Personne ne croise automatiquement houle, température de l'eau, marée et technique de pêche pour produire un verdict « fenêtre praticable » par spot et par technique, en pages SEO programm.
  - Risque juridique : faible — Agrégation de données météo publiques avec attribution ; pas de données personnelles sensibles, mais prudence sur la fiabilité des conseils de sécurité.
- **Faille :** La défensibilité est faible : une fois les pages indexées, un concurrent ou un assistant IA gratuit peut reproduire le verdict à partir des mêmes APIs ouvertes, et l'abonnement alerte est trop facile à cloner.
- **Mutation proposée :** Ajouter un réseau social de partage de prises réelles (photos, conditions du jour) modéré par les utilisateurs, ce qui crée une base de données propriétaire et un effet réseau difficile à copier.

## 4. Radar de salaires réels par métier et ville en France
**Score 5.9 / 10** · douleur 9.0 · paiement 4 · espace 4.0 · élan 2.4 · critique 7.3 · tournoi 8.0 · risque 5 — travail-et-carrieres, née d'une faille calculée (transplant-adapte)

- **Problème :** Aucun service francophone ne montre les salaires réellement affichés dans les offres (plus de 40 % des offres françaises publient désormais une fourchette légale) : les sites existants recyclent des moyennes datées ou des données américaines.
- **Pour qui :** Chercheurs d'emploi, personnes en reconversion et salariés en négociation annuelle qui veulent savoir ce que leur poste vaut aujourd'hui, dans leur ville.
- **Solution :** Un site en SEO programmatique générant des milliers de pages « salaire de [métier] à [ville] en [mois] » calculées uniquement à partir des fourchettes affichées dans les offres collectées via des APIs officielles, avec graphiques partageables.
- **Valeur pour la société :** Transparence salariale : réduit l'écart de négociation entre candidats et employeurs, et expose publiquement les écarts femmes-hommes et juniors-seniors par secteur.
- **Canal :** seo-programmatique — premiers clients : Les 10 premiers clients viennent du SEO (pages « salaire développeur Lyon » déjà recherchées des dizaines de milliers de fois par mois) et de Reddit/Facebook emploi France où les fils de négociation de salaire sont récurrents.
- **Revenu :** Freemium : pages publiques gratuites, abonnement pour les rapports détaillés par entreprise, séniorité et évolution sur 12 mois. (49 €/an le rapport illimité, ou 6,99 €/mois.)
- **Premier test :** Publier 500 pages sur les 20 métiers les plus recherchés, ajouter un rapport payant unique à 9 € sur les pages les plus visitées, et mesurer 10 ventes en 2 semaines.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin
- **Originalité mesurée :** 6.3/10
  - Marché des agents : [Indeed Scraper : Scrape jobs posted on Indeed. Get detailed information from this job portal about saved and sponsored jobs. Specify the search based on loca](https://apify.com/misceres/indeed-scraper) — 2050 utilisateurs/30 j, 0.006 $ par Job listing
- **Élan :** ×0.49 sur 90 jours — « salary transparency » HN 1 contre 0, GitHub 17 contre 38 ; « salary comparison » HN 1 contre 0
- **Faille :** Faille (demande payée, mal servie) : Indeed Scraper : Scrape jobs posted on Indeed. Get detailed information from this job portal about saved and sponsored jobs. Specify the search based on loca
  - [Apify Store](https://apify.com/misceres/indeed-scraper) — Scrape jobs posted on Indeed. Get detailed information from this job portal about saved and sponsored jobs. Specify the search based on location with the output
- **Enquête :** verdict creuser — Le besoin est réel et documenté, mais le marché français du salaire par métier/ville est déjà saturé d'outils gratuits adossés à des données officielles : il faut d'abord prouver que quelqu'un paierait 49 €/an pour une donnée que tous les concurrents donnent gratuitement.
  - Concurrents : [France Salaires (francesalaires.fr)](https://francesalaires.fr/) (Gratuit, ressemblance 7/10) ; [Apec — Simulateur salaire](https://www.apec.fr/tous-nos-outils/fiche-outils/simulateur-salaire-apec--calculez-votre-salaire.html) (Gratuit, ressemblance 7/10) ; [Salairia — positionnement dans la distribution des salaires](https://salairia.com/simulateurs/ou-se-situe-mon-salaire) (Gratuit, ressemblance 6/10) ; [Salaire-metier.com](https://salaire-metier.com/salaire-assistant-rh) (Gratuit, ressemblance 6/10)
  - Qui paie déjà : Personne ne paie pour des données salariales en France d'après les résultats : tous les concurrents trouvés (Apec, France Salaires, Salairia, WAAGE, TJMètre, salaire-metier.com) sont gratuits et financés par la publicité, les commissions d'offres d'emploi ou des données d'entreprises. Les offres payantes comparables (Glassdoor, Levels.fyi, payscale) n'apparaissent pas dans les résultats.
  - Angle libre : Calculer les fourchettes uniquement à partir des salaires réellement affichés dans les offres (et non des moyennes INSEE ou des déclarations), avec fraîcheur mensuelle par ville — aucun concurrent trouvé ne le fait, mais c'est une différence de méthode difficile à percevoir pour l'utilisateur, et la directive européenne sur la transparence salariale (juin 2026) va pousser tous les acteurs à afficher des fourchettes.
  - Risque juridique : moyen — Réutilisation des données d'offres d'emploi via des APIs officielles (France Travail) soumise à des conditions d'usage et d'attribution, et mention légale obligatoire des sources (INSEE, DARES) déjà appliquée par les concurrents ; pas de données personnelles sensibles, donc risque contenu.
- **Faille :** La défensibilité est faible : un concurrent (ou un assistant IA gratuit) peut reproduire l'agrégation des fourchettes salariales à partir des mêmes API officielles, et le freemium ne crée pas de verrou fort (pas de données propriétaires, pas de réseau).
- **Mutation proposée :** Ajouter un module de benchmark personnalisé où l'utilisateur importe son CV (anonymisé) et obtient une estimation ajustée à son profil, ce qui crée des données d'entraînement exclusives et une barrière à la copie.

## 5. CodeBruit — les stats publiques d'échec transformées en carte des pièges
**Score 5.83 / 10** · douleur 6.5 · paiement 5 · espace 6.0 · élan 5.0 · critique 6.8 · tournoi 8.0 · risque 5 — apprendre, née d'une douleur réelle

- **Problème :** Aucune app ne dit quels sont réellement les questions et thèmes qui font échouer les candidats : tout le monde révise à l'aveugle des milliers de questions identiques.
- **Pour qui :** Candidats pressés (examens imminents) qui veulent réviser en priorité ce qui fait vraiment échouer.
- **Solution :** Un site gratuit qui agrège et analyse les données ouvertes et les retours publics sur les échecs au code par thème, et classe publiquement les « 50 pièges qui coûtent le plus de points », avec un quiz gratuit centré uniquement dessus.
- **Valeur pour la société :** Réviser moins mais mieux, réduire l'écart entre ceux qui peuvent payer des packs complets et les autres.
- **Canal :** bouche-a-oreille-produit — premiers clients : Le classement des pièges est partageable en un clic (« tu rates probablement le piège n°7 ») dans les groupes de candidats et sur les réseaux, attirant les premiers visiteurs sans pub.
- **Revenu :** Quiz des 50 pièges gratuit et partageable ; rapport personnel « mes 10 pièges probables » en achat unique après un auto-diagnostic rapide. (3,90 euros le rapport personnalisé des pièges probables.)
- **Premier test :** Publier la carte des 50 pièges avec quiz gratuit et widget partageable ; vendre le rapport à 3,90 euros et viser 25 ventes en 14 jours via le partage du widget.
- **Preuve de paiement :** 0 prix lus sur la page, 0 offres payantes du même besoin ; 8 personnes disent payer déjà
- **Originalité mesurée :** 5/10 — proche de l'idée réflexe « Données de santé publique ouvertes »
- **Élan :** pas assez de signal — « driving theory traps » HN 0 contre 0, GitHub 0 contre 0 ; « exam failure statistics » HN 0 contre 0
- **Preuve de terrain :** gisement « Applications de révision inefficaces », 11 mentions (App Store fr, App Store be)
  - « Beuge répétitif. Franchement, l’application Ornikar est vraiment décevante. Quand on révise le code, les images ne s’affichent qu’une fois sur deux et l’application n’arrête pas de buguer. » — [App Store fr](https://apps.apple.com/fr/app/code-de-la-route-2026-ornikar/id1612432450?uo=2)
  - « Nullissime. Je n’ai pas eu mon code avec Ornikar. Les fiches des séries se répètent, le format est difficilement lisible sur laptop. » — [App Store fr](https://apps.apple.com/fr/app/code-de-la-route-2026-ornikar/id1612432450?uo=2)
  - « Très déçu ! » — [App Store fr](https://apps.apple.com/fr/app/code-de-la-route-2026-ornikar/id1612432450?uo=2)
- **Enquête :** verdict creuser — Le besoin est prouvé et l'angle data est différenciant, mais le seul concurrent trouvé est gratuit et il faut d'abord vérifier l'accès réel aux données d'échec avant de vendre un rapport à 3,90 €.
  - Concurrents : [Théorique en Poche — guide des pièges de l'examen théorique](https://theorique-en-poche.be/theorie/guide/pieges-examen) (gratuit (page de guide), ressemblance 7/10)
  - Qui paie déjà : Aucune offre payante identifiée dans les résultats pour ce besoin précis ; les candidats au code paient déjà des packs de révision (tests blancs) chez les auto-écoles et plateformes classiques, mais rien n'apparaît ici sur un produit « pièges » payant.
  - Angle libre : Agrégation quantitative de données réelles d'échec (thèmes/fautes les plus éliminatoires) pour classer les pièges par coût en points, plutôt qu'une simple liste éditoriale de conseils comme le font les guides gratuits existants.
  - Risque juridique : moyen — Exploiter des « données publiques d'échec » suppose que ces données soient réellement ouvertes et réutilisables : les statistiques officielles d'examen peuvent être protégées ou indisponibles, et le mot « code » peut viser une marque ou un service public.
- **Faille :** Le rapport personnalisé à 3,90€ repose sur un auto-diagnostic rapide, mais sans données fiables sur l'utilisateur (ses lacunes réelles), la valeur perçue est faible et le passage à l'achat incertain.
- **Mutation proposée :** Remplacer le rapport générique par un mini-quiz adaptatif de 5 questions qui identifie les 3 pièges les plus probables pour l'utilisateur, puis vendre l'accès au diagnostic complet (20 questions) pour 3,90€, avec un taux de conversion plus élevé car la valeur est démontrée avant l'achat.

## Suivantes
6. **Agent chasseur de contenu commercial incomplet** (5.77) — Les familles achètent des applis éducatives ou des jeux (surtout Apple Store) qui se révèlent être des arnaques (contenu incomplet, photo trompeuse, IA bâclée).
7. **FichesBrutes — les annales officielles transformées en entraînement** (5.67) — Chaque examen (concours, code, capacités professionnelles) possède des annales et sujets officiels publics, mais les apps marchandisent des versions appauvries et buggées de ces contenus.
8. **L'Archiviste Juridique Grand Public** (5.63) — Les consommateurs signent des CGV, des abonnements et des contrats de service complexes qu'ils ne comprennent pas, perdant leurs droits face aux clauses abusives.
9. **ScamShield — Vérificateur de réputation de vendeur avant achat** (5.41) — Les avis en ligne sont souvent faux, et les consommateurs se font arnaquer sur des boutiques en ligne inconnues, sans savoir si le vendeur a des antécédents de non-remboursement.
10. **La boîte noire de l'aidant familial** (5.36) — Les aidants de personnes âgées réinventent seuls des procédures tacites (quels papiers pour quel dossier, qui appeler, dans quel ordre) que des millions d'aidants avant eux ont déjà résolues mais jamais écrites.

## Gisements les plus forts
- **Abus des abonnements mobiles** — 61 mentions (0 aujourd'hui), 4 sources, force 18.048
- **Outils utilitaires et de développement manquants** — 114 mentions (30 aujourd'hui), 7 sources, force 16.135
- **Service client défaillant après paiement** — 29 mentions (10 aujourd'hui), 5 sources, force 15.799
- **Tarification abusive des contenus numériques** — 75 mentions (0 aujourd'hui), 4 sources, force 14.156
- **Résiliation d'abonnement impossible** — 35 mentions (0 aujourd'hui), 3 sources, force 12.643
- **Remboursements et compensations de livraison non honorés** — 28 mentions (1 aujourd'hui), 3 sources, force 11.507
- **Problèmes de performance des applications mobiles** — 66 mentions (13 aujourd'hui), 4 sources, force 11.467
- **Retards de livraison imprévisibles** — 34 mentions (11 aujourd'hui), 3 sources, force 10.39
- **Non-remboursement en cas de vol par le livreur** — 15 mentions (1 aujourd'hui), 3 sources, force 10.105
- **Support client inaccessible en cas de bug applicatif** — 26 mentions (3 aujourd'hui), 4 sources, force 9.564
- **Services e-mail privés et de qualité** — 18 mentions (2 aujourd'hui), 3 sources, force 8.857
- **Fonctionnalités défaillantes dans les applications payantes** — 31 mentions (1 aujourd'hui), 3 sources, force 8.701

## Santé
- Sources : hn 53 ; hn_achat 59 ; appstore 1546 ; stackexchange 180 ; lemmy 150
- mercury : 205 ok, 156 échecs (43 %), 8108 ms — aucun fournisseur pour mercury (openrouter : HTTP 429 ; groq : clé absente)
- deepseek : 293 ok, 1 échecs (0 %), 10254 ms — réponse illisible (fin : stop) : {"produits": []}
- qwen : 325 ok, 0 échecs (0 %), 10592 ms
- mistral : 28 ok, 1 échecs (3 %), 27320 ms — réponse illisible (fin : stop) : {"produits": []}
- glm : 339 ok, 1 échecs (0 %), 7634 ms — réponse illisible (fin : stop) : {"idees": [{"": "Le Moteur de Conformité de Dispositif (Device Compliance Engine) pour MedTech", "arene": "donnees-et-ap
- Atlas vivant : 26/36 API répondent (muettes : seismes, eonet, openfoodfacts, essais-cliniques, openfda, osm, solaire, gutendex, openverse, nasa-apod)
- Étapes : radar 355 s (cumul 0.0321 $) ; marche 8 s (cumul 0.0321 $) ; atlas 25 s (cumul 0.0321 $) ; failles 234 s (cumul 0.125 $) ; usine 865 s (cumul 0.3713 $) ; enquete 82 s (cumul 0.4541 $) ; elan 95 s (cumul 0.4541 $)