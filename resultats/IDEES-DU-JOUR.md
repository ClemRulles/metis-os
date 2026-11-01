# Usine à idées — 2026-11-01
204 idées générées, 174 notées, 48 duels. Appels : 379 (70 échecs).

## 1. La Bande du Matin : un journal sonore de 7 minutes pour les aînés, commandé et payé par leurs enfants
Elo 1564 · score 7.6 / 10 · lentille bien-commun · inventé par mimo

- **Problème :** Isolement des personnes âgées et information locale de sécurité (feux actifs, canicule, prix de l'énergie) noyées dans des flux numériques qu'elles ne savent pas lire.
- **Pour qui :** Adultes de 40 à 60 ans inquiets pour un parent seul, qui cherchent un cadeau utile plutôt qu'un objet, et les aînés concernés.
- **Valeur pour la société :** Maintient un lien intergénérationnel régulier et livre l'alerte locale critique dans un format audible, sans smartphone ni application à installer.
- **Comment :** Chaque matin, des agents compilent ENTSO-E (prix et heures), NASA FIRMS (feux actifs près du domicile) et l'agenda local en un MP3 narré, envoyé par e-mail et écoutable sur un simple haut-parleur ou téléphone.
- **Pourquoi maintenant :** Les API sont ouvertes et gratuites et la génération audio narrée est devenue crédible : un journal hyperlocal quotidien à coût marginal est enfin possible, alors que la fracture numérique des aînés est un sujet de politique publique.
- **Revenu :** Abonnement familial à 12 €/mois réglé par l'enfant, jamais par l'aîné démarché ; pas d'appel, tout se passe sur la page de commande.
- **Premier test :** Prototype audio livré à la main sur 3 villes pilotes, puis page de commande : 20 abonnements prépayés en 14 jours via les réseaux familiaux et les communautés de seniors.
- **Faille :** L'aîné doit posséder une adresse e-mail et un moyen d'écouter un fichier audio, ce qui est une barrière pour les moins connectés ; la qualité de la narration synthétique peut rebuter certains auditeurs.
- **Mutation proposée :** Ajouter un petit boîtier audio dédié (coût <20€) fourni avec l'abonnement, qui se connecte au wifi et lit le journal automatiquement chaque matin, supprimant toute manipulation pour l'aîné.

## 2. Caducée 2.0 : la bourse des rappels produits, du signalement à la mise hors ligne automatique
Elo 1563 · score 7.5 / 10 · lentille evolution · inventé par mimo

- **Problème :** Les e-commerçants de compléments alimentaires et cosmétiques découvrent un rappel ou un signalement réglementaire des jours après la mise en ligne, pendant que leurs fiches vendent encore — un risque sanitaire et juridique silencieux.
- **Pour qui :** Petits e-commerçants et marketplaces de produits à forte rotation (compléments, cosmétiques, jouets), ainsi que les marques elles-mêmes.
- **Valeur pour la société :** Fermer la fenêtre entre l'alerte publique d'une autorité et le retrait du produit du marché, en transformant un signal public inexploité en action automatique et traçable.
- **Comment :** Des agents surveillent en continu les signaux publics de rappel et de non-conformité (RASFF, affichages nationaux), les associent aux références produits, et livrent une clé API qui désactive automatiquement la fiche produit concernée sur le CMS du marchand, avec journal public de chaque intervention.
- **Pourquoi maintenant :** Les API de CMS (Shopify, WooCommerce, PrestaShop) sont standardisées, les registres de signalement européens sont ouverts, et la sensibilité des consommateurs à la traçabilité n'a jamais été aussi élevée.
- **Revenu :** Abonnement SaaS à partir de 39 €/mois par boutique, plus un forfait d'intégration technique unique vendu en self-service sur le site (aucun appel, tout se branche en vidéo-guidé et e-mail).
- **Premier test :** En deux semaines : brancher la démo publique sur trois boutiques Shopify réelles, les faire signer à 39 €/mois après une alerte réelle survenue pendant l'essai, avec paiement en ligne immédiat.
- **Faille :** Risque juridique majeur lié aux faux positifs : si l'agent désactive une fiche par erreur de matching (référence SKU vs dénomination réglementaire), le vendeur subit une perte de CA immédiate et peut vous réclamer des dommages-intérêts. Les registres publics utilisent des codes ou noms génériques, rarement les références exactes des CMS, ce qui rend l'automatisation totale dangereuse sans base de correspondances validée.
- **Mutation proposée :** Remplacer le déclenchement automatique par un workflow à seuil de confiance : l'agent classe chaque alerte par probabilité et ne propose la mise hors ligne qu'au-delà d'un seuil configurable, avec validation en un clic côté marchand. Construire progressivement un jeu de données propriétaire de mapping marque/référence/CODES_UE pour verrouiller la defensibilité, et inclure une clause de limitation de responsabilité ainsi qu'un crédit de remboursement garanti en cas de faux positif avéré.

## 3. Terminus : l'observatoire citoyen des transformations du territoire, validé par la foule
Elo 1532 · score 7.5 / 10 · lentille evolution · inventé par mimo

- **Problème :** Les changements du territoire (défrichement, chantier sauvage, étendue urbaine) sont visibles sur les satellites mais illisibles pour les habitants et les collectivités, qui découvrent les faits accomplis trop tard.
- **Pour qui :** Collectivités et associations de riverains, plus tout citoyen abonné gratuitement à sa commune — les collectivités paient, les citoyens créent la masse.
- **Valeur pour la société :** Rendre la transformation physique du territoire lisible, contestable et archivée en temps réel par ceux qui l'habitent, avec une trace publique de ce qui a été observé et quand.
- **Comment :** Des agents comparent chaque mois les images Sentinel de chaque commune, isolent les changements significatifs, et publient une fiche horodatée que les internautes confirment ou infirment en un clic ; le taux de validation citoyenne devient le score de fiabilité visible de chaque détection.
- **Pourquoi maintenant :** Les archives Sentinel et Copernicus sont gratuites et régulières, les API d'observation de la Terre de l'UE sont ouvertes, et les modèles de détection de changement d'image suffisent pour industrialiser la surveillance de 35 000 communes.
- **Revenu :** Abonnement communal type 150–400 €/an pour les collectivités (accès à l'historique complet, export, alerte réglementaire de chantier non déclaré), le service citoyen restant gratuit et ouvert.
- **Premier test :** En deux semaines : prendre trois communes pilotes, diffuser les 20 premiers changements détés, lancer la validation citoyenne par e-mail, et vendre l'accès annuel complet à l'une des trois communes via un e-mail de présentation chiffré.
- **Faille :** La validation citoyenne dépend d'une masse critique d'utilisateurs actifs, difficile à atteindre en zone rurale et risquant de biaiser la fiabilité ; sans elle, la promesse de crédibilité s'effondre.
- **Mutation proposée :** Remplacer la validation par un clic citoyen par un croisement automatique avec les données ouvertes des permis de construire et du cadastre, ce qui rend le service fiable sans dépendre de la foule tout en conservant une interface de signalement pour les riverains.

## 4. Le registre des disparitions de transport public
Elo 1532 · score 7.4 / 10 · lentille evolution · inventé par glm

- **Problème :** Quand une ligne de bus ou de train disparaît ou se dégrade dans une petite ville, personne ne le documente : les données GTFS changent en silence et les habitants découvrent à leurs dépens.
- **Pour qui :** Élus locaux, associations d'usagers, médias territoriaux, collectifs de mobilité.
- **Valeur pour la société :** Rendre visible et datable l'érosion du service public de transport dans les territoires, commune par commune, avec preuve historique incontestable.
- **Comment :** Des agents surveillent les archives GTFS de milliers de réseaux, détectent suppressions et dégradations de lignes, et publient un atlas public gratuit où chaque commune peut recevoir par e-mail son historique de service.
- **Pourquoi maintenant :** Les GTFS sont publiés en open data par la plupart des réseaux européens et le débat sur la désertification des transports est au sommet de l'agenda politique local.
- **Revenu :** Atlas gratuit + abonnement 20 €/mois pour collectifs et médias (alertes ciblées, archives complètes) ; rapports territoriaux imprimables à 40 €.
- **Premier test :** Produire en une semaine un rapport gratuit sur 10 agglomérations moyennes, l'envoyer aux associations d'usagers locales, et vendre la version complète France entière à 39 € en ligne.
- **Faille :** La version gratuite risque de cannibaliser les abonnements payants, car la valeur perçue par les associations et médias locaux est insuffisante pour justifier 20 €/mois – ils préféreront consulter l'atlas gratuit ou attendre qu'un bénévole fasse le travail.
- **Mutation proposée :** Remplacer le modèle d'abonnement par un service de « certification » payante pour les collectivités : un rapport annuel officiel de l'évolution du service sur leur territoire, utilisable dans les débats publics et les dossiers de subvention – combiné à une API gratuite pour les médias et associations, mais un tarif pour les collectivités (200 €/an) qui ont un vrai besoin de preuve chiffrée.

## 5. Observatoire des citations : quels médias et quelles sources nourrissent réellement les IA du monde
Elo 1532 · score 7.0 / 10 · lentille travail-invisible · inventé par mimo

- **Problème :** Personne ne mesure en continu quelles sources (médias, encyclopédies, blogs) sont citées par les grands modèles, alors que cette visibilité décide déjà de la survie économique de milliers de rédactions indépendantes.
- **Pour qui :** Journalistes indépendants, rédactions en ligne, chercheurs en sciences de l'information et médias alternatifs qui veulent comprendre leur présence ou leur absence dans les réponses des IA.
- **Valeur pour la société :** Rendre visible la concentration cachée de l'information derrière les IA, pour que le débat public ne repose pas sur cinq sources invisibles sélectionnées par des modèles opaques.
- **Comment :** Une armée d'agents interroge en boucle plusieurs systèmes d'IA publics, compare les réponses, extrait et normalise toutes les sources citées, puis croise le tout avec les bases de médias de 77 pays publiées quotidiennement.
- **Pourquoi maintenant :** Les IA génératives sont devenues le premier point d'entrée de l'information pour des centaines de millions de personnes, mais aucun référentiel public de leurs citations n'existe encore.
- **Revenu :** Abonnement mensuel aux données brutes et aux classements (à partir de 29 €/mois) plus API payante pour rédactions et chercheurs, facturation 100 % en ligne, aucun appel.
- **Premier test :** En deux semaines : mesurer les citations d'un panel de 500 questions d'actualité sur 3 modèles d'IA, publier un premier classement « qui est cité en France » en accès gratuit partiel, et vendre 10 abonnements early-bird à 29 € aux rédactions contactées par e-mail.
- **Faille :** Les clients visés (rédactions indépendantes, chercheurs) sont les moins solvables et n'achètent pas un classement : ils achètent un changement. Sans preuve qu'être cité ou non dans les IA modifie leur trafic ou leurs revenus, l'abonnement à 29 € reste un gadget de curiosité. De plus, les réponses des modèles varient énormément d'une requête à l'autre : sans méthodologie statistique solide et documentée, les données sont contestables et la valeur perçue s'effondre.
- **Mutation proposée :** Transformer l'observatoire en produit d'action, pas de constat : pour chaque média abonné, un rapport mensuel « votre visibilité IA vs vos concurrents » avec les questions exactes où vous apparaissez ou disparaissez, et des recommandations techniques (structure, sitemap, licensing LLM) pour devenir citable. Ajouter un classement public gratuit et viral (communiqués de presse, relais chez les chercheurs) comme aimant, et vendre l'accès API à des acteurs solvables : agences de presse, plateformes de vérification, fonds qui parient sur l'écosystème média. C'est la preuve d'impact, pas la donnée brute, qui déclenche le paiement.

## 6. Obsolète.io — alerter les développeurs sur leurs dépendances abandonnées
Elo 1532 · score 7.0 / 10 · lentille signal-faible · inventé par glm

- **Problème :** Des milliers de projets open source critiques sont maintenus par une seule personne épuisée ou plus du tout : les utilisateurs ne le découvrent qu'au moment de la faille.
- **Pour qui :** Mainteneurs de projets open source et développeurs solo qui veulent savoir quelles briques de leur stack risquent de mourir sous leurs pieds.
- **Valeur pour la société :** Renforcer la santé de l'infrastructure logicielle mondiale, bien commun invisible dont dépend l'économie entière.
- **Comment :** Des agents IA croisent npm, PyPI et GitHub pour calculer un « score de fragilité » de chaque dépendance (activité du mainteneur, dette, bus factor) et envoient une veille hebdomadaire claire.
- **Pourquoi maintenant :** Les failles via dépendances (xz, log4shell) ont rendu la question brûlante, mais aucun service grand public n'explique la vulnérabilité humaine des dépendances.
- **Revenu :** Abonnement 5 €/mois pour la veille personnalisée sur ses propres dépôts ; version gratuite sur les projets publics.
- **Premier test :** Publier des scores de fragilité gratuits pour 500 projets populaires, avec lien de paiement « surveillez vos dépôts » ; viser 10 payeurs en 2 semaines.
- **Faille :** Le score de fragilité repose sur des données publiques et un algorithme facilement reproductible ; les développeurs peuvent déjà évaluer eux-mêmes l'activité des mainteneurs, ce qui limite la valeur perçue et la disposition à payer.
- **Mutation proposée :** Ajouter un réseau de confiance où les mainteneurs s'inscrivent volontairement et où les utilisateurs peuvent souscrire à un engagement de reprise (fork garanti) en cas d'abandon, créant ainsi une barrière d'entrée par la communauté et la confiance.

## 7. Le Traducteur — chaque courrier d'administration en plan d'action de 5 points
Elo 1532 · score 6.9 / 10 · lentille luxe-democratise · inventé par mimo

- **Problème :** Un courrier de la CAF, de l'administration fiscale ou d'une préfecture déclenche anxiété, erreurs de réponse et délais perdus, faute d'accès à l'interprète que les aisés engagent pour eux.
- **Pour qui :** Les 12 millions de Français peu familiers du langage administratif, les nouveaux arrivants et les personnes âgéesaidées par leurs enfants.
- **Valeur pour la société :** Transforme un accès aux droits obstrué par la langue administrative en autonomie réelle, sans remplacer ni contredire le service public.
- **Comment :** L'utilisateur photographie son courrier ; l'agent en extrait le sens, le renvoie en français simple : ce qu'on me demande, la date limite, où cliquer ou écrire, et les textes publics correspondants, avec suppression automatique du document après 24 h.
- **Pourquoi maintenant :** La qualité des modèles multimodaux rend la lecture de documents administratifs fiable en 2024, alors que les listes d'attente des assistants sociaux n'ont jamais été plus longues.
- **Revenu :** 4 € par document, ou pack 10 documents à 29 € ; base légale du traitement : consentement explicite + minimisation, purge automatique, aucune donnée conservée.
- **Premier test :** Compte TikTok/Reels publiant 10 traductions de courriers types réels (anonymisés) + lien de paiement direct : viser 25 documents traduits payés en 14 jours.
- **Faille :** La défense est faible : n'importe quel assistant IA gratuit (ChatGPT, Claude) peut déjà lire et simplifier un document administratif, sans frais, ce qui rend difficile de justifier 4 € par traduction, surtout sans données propriétaires ou réseau verrouillé.
- **Mutation proposée :** Ajouter une couche de vérification humaine par des bénévoles ou retraités (ex‑fonctionnaires) pour garantir l'exactitude des plans d'action, et créer une base de modèles de courriers anonymisés qui améliore l'agent au fil du temps, transformant le service en référence fiable que les outils gratuits ne peuvent pas égaler.

## 8.  Veille des « cygnes faibles » ASX-liée ESEF
Elo 1501 · score 7.1 / 10 · lentille travail-invisible · inventé par glm

- **Problème :** L'ESEF impose depuis 2021 des comptes annuels lisibles par machine pour toutes les sociétés européennes, mais ce trésor n'est exploité par personne en dehors des banques : déclassifications de risques, impairements, gestions douteuses restent enfouies pendant des semaines.
- **Pour qui :** Les rédacteurs financiers indépendants, les podcasters économie FR, les investisseurs individuels européens (hors conseil personnalisé : information factuelle source-documentée).
- **Valeur pour la société :** Transparence renforcée : signale des signaux de faiblesse financiers des entreprises européennes bien avant les groupes média aux incentifs publicitaires, servant la surveillance citoyenne du tissu économique.
- **Comment :** Des agents ingèrent chaque nouveau rapport ESEF publié, comparent ses wordings, comptes et notes par rapport aux années N-1/N-2, et sortent chaque vendredi « les 10 signaux les plus faibles de la semaine » avec les extraits sources (paragraphes pédisation, changements d'auditeur, glissements de trésorerie).
- **Pourquoi maintenant :** Le rapport ESEF récent dernier descend un rapport suffisant de qualité, tandis que les scenarii de crise européenne (veille rate, révision fraude) rendent le temps réel aux signaux précieux en attendant.
- **Revenu :** Bulletin hebdo à 12 €/mois, top-3 gratuit pour propulser le vis sur Reddit r/europe et les lecteurs finance FR ; bloc « sources » cliquables comme preuve de travail réel.
- **Premier test :** Une page produit + 3 numéros gratuits programmés avant tout paiement, bouton Stripe actif dès le jour 1, signal depuis HN/Reddit « j'ai lu 400 rapports annuels cette semaine pour vous » — les 30 premiers payeurs valident le prix.
- **Faille :** ...
- **Mutation proposée :** ...

## 9. Veille des Frontières de Feu
Elo 1500 · score 7.4 / 10 · lentille futur-a-rebours · inventé par minimax

- **Problème :** Pendant les incendies, lesirst? habitants et serenity gestionnaires de zones deMaker$: manque une anticipation locale lisible des fumées et des déplacements possibles.
- **Pour qui :** Habitants des zones rurales, voyageurs, Blackjack? collectives deorski? Parish.
- **Valeur pour la société :** Améliorer la preparedness? preparedness et la coordination locale en diffusant une informationEnvironmental environmental claire, sans simuler une authority.
- **Comment :** Un tableau de bord combine detections FIRMS, prévisions de vent et données publiques pour signaler les zones fumeuses, avec des liens vers les consignes officielles.
- **Pourquoi maintenant :** Les detections satellitaires sont quasi temps réel et les événements récents montrent un besoin concret de coordination à l’échelle locale.
- **Revenu :** Abonnement à 4,99 euros par mois pour les alertes par courriel et la carte hors ligne, complété par un sponsoring transparent d’associations locales.
- **Premier test :** Publier gratuitement une carte pour une région et vendre 15 abonnements d’alerte avant abonnement à un tarif fondateur.
- **Faille :** La dépendance à des données satellitaires publiques (FIRMS) entraîne des délais et des faux positifs (brûlis agricoles), ce qui réduit la fiabilité perçue et peut dissuader l'abonnement face à des alternatives gratuites comme Watch Duty.
- **Mutation proposée :** Ajouter un mécanisme de validation communautaire où les abonnés signalent et confirment les fumées visibles, couplé à un croisement multi-sources (satellites, capteurs locaux, rapports citoyens) via agents IA pour filtrer les fausses alertes, puis proposer une version freemium avec un abonnement premium pour les alertes ultra-locales et la carte hors ligne sans publicité.

## 10. Registry-Motion Index : l'indice « activité réelle vs activité déclarée » à l'usage ponctuel
Elo 1500 · score 7.2 / 10 · lentille collision-api · inventé par mimo

- **Problème :** Journalistes, chercheurs et investisseurs particuliers paient cher des bases propriétaires alors que le signal le plus honnête — une entreprise bouge-t-elle physiquement ? — reste enfoui dans deux silos non connectés.
- **Pour qui :** Journalistes indépendants, doctorants en économie, analystes en fonds propres et citoyens enquêteurs, acheteurs à la requête.
- **Valeur pour la société :** Rend enfin mesurable et vérifiable l'écart déclarations/physique pour des dizaines de milliers d'entreprises, ce qui renforce le débat public sur la transparence des comptes.
- **Comment :** Un score par entité (événements registre + dynamique des actifs liés) publié en API et en fiches publiques, livré comme données brutes avec la méthode et les sources, sans interprétation ni conseil.
- **Pourquoi maintenant :** Les modèles de fondations cartographiques (cf. états spatiaux) rendent soudain automatisable le recollement image/trajet/regardé — capacité inexistable il y a 18 mois.
- **Revenu :** Marketplace d'API : 200 crédits offerts, puis 0,05 €/requête et pack chercheur à 29 €/mois, encaissement instantané par paiement en ligne.
- **Premier test :** Publier 50 fiches publiques très virales (les 50 plus grands écarts du trimestre), poster les liens sur data-twitter et 2 Slack data, viser 3 acheteurs de crédits et 29 €/mois de pack avant le jour 14.
- **Faille :** La corrélation entre activité physique (images satellite, trajectoires) et activité déclarée est intrinsèquement bruitée et peut produire des faux positifs embarrassants, surtout si la méthode de score n'est pas validée. L'accès aux sources (registres payants, OpenSky avec limites) n'est pas garanti gratuitement, et leur croisement peut violer des conditions d'utilisation.
- **Mutation proposée :** Spécialiser l'indice sur un secteur à haute valeur probante (logistique, transport) où le lien physique/déclaré est plus direct. Ajouter un mécanisme de validation communautaire pour réduire les faux positifs et créer un réseau de confiance, rendant la donnée plus défendable et précieuse.

## Santé des cerveaux
- minimax : 11 ok, 9 échecs (JSON illisible : [
  {
    "titre": "L’Archive Vivante",
    "probleme": "Des millions d’ouvrages, cartes et archives libres de droits do)
- glm : 73 ok, 2 échecs (JSON illisible : ```json
[
  {
    "titre": "Verdis-je ? Le Dr Drop de la toiture solaire",
    "probleme": "Les propriétaires se font dé)
- deepseek : 93 ok, 7 échecs (JSON illisible : ```json
[
  {
    "titre": "Boutique Fantôme (GhostDuty Detector)",
    "probleme": "Un cosmétique ou aliment change de )
- mimo : 77 ok, 9 échecs (JSON illisible : ```json
[
  {
    "titre": "Quartier Clair : la fiche environnementale d'une adresse, achetée en 1 clic",
    "probleme")
- qwen : 55 ok, 43 échecs (JSON illisible : Here's a thinking process:

1.  **Analyze User Input:**
   - **Role:** Visionary inventor in a young, ambitious, and aud)

## Lentilles
- futur-a-rebours : 20 idées, score moyen 5.31, 2 finalistes
- collision-api : 24 idées, score moyen 6.35, 3 finalistes
- cimetiere : 20 idées, score moyen 6.1, 2 finalistes
- travail-invisible : 20 idées, score moyen 6.25, 4 finalistes
- signal-faible : 19 idées, score moyen 5.75, 1 finalistes
- transplant : 16 idées, score moyen 5.69, 1 finalistes
- inversion : 16 idées, score moyen 6.15, 0 finalistes
- super-pouvoir-agent : 16 idées, score moyen 6.15, 2 finalistes
- bien-commun : 17 idées, score moyen 6.17, 1 finalistes
- luxe-democratise : 20 idées, score moyen 6.11, 3 finalistes
- evolution : 16 idées, score moyen 6.32, 5 finalistes