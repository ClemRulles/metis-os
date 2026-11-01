# Usine à idées — 2026-11-01
156 idées générées, 108 notées, 48 duels. Appels : 394 (144 échecs).

## 1. Détective de fraude aux données ouvertes
Elo 1564 · score 6.6 / 10 · lentille luxe-democratise · inventé par glm

- **Problème :** Quand une entreprise voisine brûle illégalement des déchets ou exploite sans autorisation, les citoyens n'ont ni outil ni méthode pour le détecter avant l'accident.
- **Pour qui :** Collectivités de petite taille, associations, citoyens alertés qui n'ont pas les moyens d'un bureau d'investigation.
- **Valeur pour la société :** Met la capacité de contre-expertise publique, réservée aux ONG établies, dans les mains de n'importe qui.
- **Comment :** Agent qui recoupe en continu détections thermiques NASA FIRMS, registres ouverts et historiques Wikidata des sites pour signaler des incohérences suspectes avec un score de signalement argumenté.
- **Pourquoi maintenant :** Les données thermiques satellite sont désormais de qualité journalistique et accessibles gratuitement ; le légal demandé explose.
- **Revenu :** Abonnement 4 euros/mois par site surveillé, dossier de signalement documenté à 29 euros.
- **Premier test :** Produire gratuitement un dossier documenté pour une association environnementale connue, lui proposer ensuite un abonnement mensuel de surveillance à 4 euros.
- **Faille :** Le besoin réel des collectivités et associations pour ce service est incertain ; elles peuvent manquer de compétences pour utiliser les signalements ou de budget pour un abonnement même à 4 €. De plus, la confiance en un agent automatisé pour des décisions critiques (pollution) est faible sans validation humaine coûteuse.
- **Mutation proposée :** Cibler d'abord les médias locaux et journalistes d'investigation comme clients payants (dossier vendu 50-100 €), et offrir une version gratuite aux associations avec alertes simples mais limitées, créant ainsi un effet de réputation qui attire les abonnés payants.

## 2. Douanoscope : le détecteur d'impossibilités commerciales
Elo 1563 · score 7.3 / 10 · lentille evolution · inventé par glm

- **Problème :** Les fraudes alimentaires (miel, huile d'olive) se cachent dans des volumes exportés impossibles : personne ne croise systématiquement les statistiques douanières Eurostat/Comtrade avec les surfaces cultivées réellement observables par satellite.
- **Pour qui :** Journalistes d'investigation alimentaire, ONG, acheteurs de distributeurs spécialisés, et consommateurs exigeants.
- **Valeur pour la société :** Rendre la fraude agroalimentaire visible par des preuves chiffrées publiques, et pousser les filières vers une traçabilité honnête.
- **Comment :** Des agents IA maintiennent 24h/24 une matrice pays×produit (flux déclarés vs capacité agricole satellitaire vs bases d'authentification ADN publiées) et publient un « indice d'incohérence » sourcé, avec historique vérifiable de chaque alerte passée et son issue.
- **Pourquoi maintenant :** Les scandales miel/huile de 2023-2024 ont créé une demande médiatique forte et les données Copernicus + Comtrade sont libres et fraîches.
- **Revenu :** Rapports pays×produit individuels à 19 € pour journalistes et ONG, puis abonnement flux d'alertes à 29 €/mois pour rédactions et acheteurs.
- **Premier test :** Publier gratuitement l'indice sur le miel pour 10 pays, vendre à 19 € le rapport détaillé « preuves et sources » via un lien partagé dans les communautés de journalistes data sur Slack/Discord.
- **Faille :** Les sources de données (douanes, satellite, ADN) sont imparfaites et peuvent générer des faux positifs ; le marché des journalistes et ONG est restreint et souvent avide de données gratuites, ce qui rend la monétisation fragile.
- **Mutation proposée :** Créer un tableau de bord public gratuit avec l'indice d'incohérence, puis monétiser via des sponsors de filières honnêtes (labels, producteurs) ou un service d'alerte premium pour les acheteurs et certificateurs, en capitalisant sur la crédibilité accumulée par les alertes vérifiées.

## 3. Atlas vivant des chantiers et transformations du territoire
Elo 1532 · score 7.5 / 10 · lentille travail-invisible · inventé par glm

- **Problème :** Les changements du territoire (nouvelles constructions, zones inondées, forêts qui dépérissent, champs laissés à l'abandon) sont visibles dans les images Sentinel gratuites, mais personne ne les compile pour le grand public.
- **Pour qui :** Journalistes locaux, associations environnementales, chercheurs citoyens et curieux de leur région qui veulent voir et documenter ce qui change chez eux.
- **Valeur pour la société :** Démocratise la transparence territoriale : expose les chantiers non déclarés, la déforestation, les zones bâties inondables, autrefois réservés aux experts.
- **Comment :** Des agents IA comparent les images satellites Sentinel de chaque commune mois par mois, détectent les changements significatifs et publient un atlas web gratuit où chacun reçoit par e-mail les changements détectés sur sa zone choisie.
- **Pourquoi maintenant :** Copernicus fournit des images quasi hebdomadaires gratuites et les modèles de vision sont devenus assez bons pour détecter automatiquement les changements à coût quasi nul.
- **Revenu :** Zone de surveillance gratuite (1 commune), abonnement 5 €/mois par région surveillée ; rapports d'évolution d'une zone vendus à l'unité 20 € aux journalistes et associations.
- **Premier test :** Publier l'atlas des 10 plus grandes transformations détectées dans une grande métropole française sur 12 mois, avec option de payer 5 € pour surveiller sa propre commune.
- **Faille :** La détection automatique des changements par satellite est sujette à des faux positifs (nuages, variations saisonnières) et manque de validation terrain, ce qui peut nuire à la crédibilité de l'atlas et créer des conflits (chantiers déclarés vs. non déclarés).
- **Mutation proposée :** Ajouter un système de validation citoyenne (crowdsourcing) où les utilisateurs peuvent confirmer ou infirmer les changements détectés, et nouer des partenariats avec des observatoires locaux pour fiabiliser les données et renforcer la confiance.

## 4. Cartes de citation inverse : qui cite les médias locaux
Elo 1532 · score 7.3 / 10 · lentille inversion · inventé par glm

- **Problème :** Les journaux locaux et médias indépendants nourrissent les grandes plateformes d'information sans jamais savoir combien ni où leur travail est repris, alors qu'une étude récente montre la concentration massive de la citation dans quelques acteurs.
- **Pour qui :** Médias locaux, rédactions indépendantes et chercheurs en économie des médias.
- **Valeur pour la société :** Redonne du pouvoir de négociation aux petits médias, éclaire le débat sur la concentration médiatique et aide à financer un pluralisme fragilisé.
- **Comment :** Inversion : le média qui cite devient le client fourni — nos agents tracent chaque semaine quels textes du média sont repris ou cités en ligne et génèrent un « registre de citation » factuel, sans aucun conseil.
- **Pourquoi maintenant :** L'explosion des contenus générés par IA aggrave la dilution des sources originales et le sujet de la citation des médias fait débat public (droit voisin, IA).
- **Revenu :** Registre mensuel de citation à 29 €/média, vendu par e-mail et site ; export public trimestriel offert pour la visibilité.
- **Premier test :** Produire gratuitement un registre d'un mois pour 10 médias locaux contactés par e-mail, puis leur proposer l'abonnement à 29 €/mois.
- **Faille :** Les médias locaux ont peu de budget et ne voient pas forcément l'intérêt de payer pour un registre de citations, surtout si un outil gratuit peut l'approcher.
- **Mutation proposée :** Proposer un consortium de médias locaux qui partagent les données de citation pour créer un indice public de référence, monétisé via des abonnements aux données agrégées pour les chercheurs ou les grandes plateformes.

## 5. L'indice Caducée public : la bourse des rappels produits
Elo 1532 · score 7.0 / 10 · lentille evolution · inventé par glm

- **Problème :** Les signaux précoces de rappels (dossiers openFDA, EMA, Safety Gate) sont publics mais dispersés et illisibles ; distributeurs et pharmaciens en ligne découvrent les rappels trop tard.
- **Pour qui :** Distributeurs et parapharmacies en ligne qui perdent de l'argent sur chaque lot rappelé découvert tard.
- **Valeur pour la société :** Retirer plus vite les produits dangereux de la vente et créer un précédent de transparence publique avec historique vérifiable des prédictions.
- **Comment :** Agents qui publient un « indice d'attention réglementaire » factuel et sourcé par produit (comptage de signaux publics, jamais de jugement), avec track record public : chaque alerte passée confrontée à son issue réelle.
- **Pourquoi maintenant :** Les bases EMA/openFDA s'ouvrent davantage et un track record de quelques mois devient une barrière copiable.
- **Revenu :** Widget de veille gratuit pour pharmaciens (via groupes pro), puis abonnement API/webhook d'alertes anticipées à 99 €/mois pour distributeurs en ligne.
- **Premier test :** Publier l'indice public sur 200 produits, contacter par e-mail 30 parapharmacies en ligne avec le track record et vendre un pilote webhook à 99 €/mois.
- **Faille :** La monétisation est fragile car les distributeurs peuvent accéder gratuitement aux alertes officielles (Safety Gate, FDA) ; l'indice public ne crée pas une valeur suffisante pour justifier un abonnement récurrent, et le cycle de vente B2B dépasse souvent 30 jours.
- **Mutation proposée :** Cibler un segment à forte rotation et faible marge (ex: compléments alimentaires en ligne) avec un service qui non seulement alerte mais déclenche automatiquement la mise hors ligne des fiches produits via une intégration API CMS, augmentant la valeur perçue et la rétention.

## 6. École d'advocatie par simulation pour jeunes barreaux
Elo 1532 · score 6.8 / 10 · lentille transplant · inventé par glm

- **Problème :** Les jeunes avocats francophones apprennent la plaidoirie sur le dos de vrais clients, car les mises en situation réalistes sont rares et chères.
- **Pour qui :** Jeunes avocats au stage et étudiants en droit francophones préparant les plaidoiries.
- **Valeur pour la société :** Meilleure représentation des justiciables : des professionnels mieux entraînés avant de plaider pour de vrai, accessibles à tous les budgets.
- **Comment :** Simulateur d'audience où un agent IA joue le juge, l'adversaire et le client, avec injection de pièces imprévues, et débriefe la plaidoirie ; inspiré des simulateurs de formation américains, transplanté en français.
- **Pourquoi maintenant :** Les LLM tiennent enfin un rôle d'adversaire crédible et l'affaire du prompt injection brésilien montre que le marché juridique se méfie des robots écrivains, pas des robots entraîneurs.
- **Revenu :** Abonnement étudiant 15-25 euros/mois, packs de préparation à une audience à 30 euros.
- **Premier test :** Session de plaidoirie simulée payante à 10 euros, vendue via Discord et mailing d'écoles du barreau à 40 stagiaires, en 2 semaines.
- **Faille :** La simulation IA peine à reproduire la pression émotionnelle et les imprévus d'une vraie audience, ce qui peut donner un faux sentiment de préparation.
- **Mutation proposée :** Intégrer des sessions de débriefing avec un avocat mentor (payé à la tâche) et proposer des scénarios certifiés par les écoles du barreau pour crédibiliser l'offre.

## 7. CroiseurStat : interrogations inversées sur les données publiques
Elo 1532 · score 6.8 / 10 · lentille signal-faible · inventé par glm

- **Problème :** Eurostat, OCDE et Banque mondiale publient des océans de données, mais personne n'achète les croisements avant qu'une question existe — la valeur dort dans les requêtes non formulées.
- **Pour qui :** Créateurs de contenu économie/démographie, collectivités locales, cabinets de politique publique (hors conseil : livraison de jeux de données sur mesure).
- **Valeur pour la société :** Rendre les statistiques publiques interrogeables en langage naturel, désanctuariser la donnée institutionnelle pour le citoyen.
- **Comment :** Moteur web gratuit en front (« pose ta question, l'agent croise INSEE+Eurostat+Banque mondiale ») avec export PDF/données premium payant : l'IA génère la requête, le graphique et les sources vérifiées.
- **Pourquoi maintenant :** La fiabilité des LLM sur les codes de séries statistiques vient de devenir suffisante ; fenêtre de 12-24 mois avant que les instituts publics le fassent eux-mêmes.
- **Revenu :** Freemium : interrogation gratuite avec watermark, export haute qualité et API à 19 €/mois ou 5 € l'export.
- **Premier test :** Lancer le produit en 1 semaine, publier 3 croisements »surprenants » (ex : densité x communautaire) sur les réseaux sociaux avec lien payant, mesurer les exports payants en 14 jours.
- **Faille :** La fiabilité des réponses statistiques générées par LLM reste incertaine ; les utilisateurs peuvent se méfier et préférer vérifier manuellement, ce qui réduit la valeur perçue et la disposition à payer.
- **Mutation proposée :** Ajouter un système de vérification transparent qui affiche les appels API exacts et les données brutes, et cibler un segment spécifique (ex. collectivités locales) avec des exports standardisés prêts à l'emploi, accompagnés d'une curation humaine pour garantir la fiabilité.

## 8. Rediffuseur de promesses publiques
Elo 1501 · score 6.6 / 10 · lentille travail-invisible · inventé par glm

- **Problème :** Les collectivités et institutions publient des plans, budgets et engagements sur des milliers de pages PDF que personne ne relit ; les promesses non tenues disparaissent dans l'oubli.
- **Pour qui :** Citoyens, journalistes et associations qui veulent savoir ce qui a réellement été promis et fait dans leur ville ou leur région.
- **Valeur pour la société :** Renforce la démocratie en rendant traçables les engagements publics : ce qui était annoncé en 2021 versus ce qui existe en 2025.
- **Comment :** Des agents IA extraient automatiquement les engagements chiffrés des documents publics d'une collectivité, les replient sur les réalisations publiées ensuite, et publient un tableau public « promis vs. fait » mis à jour chaque semaine.
- **Pourquoi maintenant :** Les documents publics sont de plus en plus numérisés et les LLM savent enfin extraire des engagements structurés de PDF arides à grande échelle.
- **Revenu :** Gratuit pour 10 collectivités pilotes ; e-mail hebdomadaire de suivi à 4 €/mois par collectivité pour les citoyens, dossiers complets à 49 € pour les rédactions.
- **Premier test :** Produire le tableau « promis vs. fait » d'une grande ville française pilote, le publier librement et vendre le dossier complet aux journalistes locaux à 49 € via la page web.
- **Faille :** La donnée source est 100 % publique et le tableau « promis vs. fait » est recopiable en un clic : un média, une association ou un assistant IA gratuit peut refaire le même travail demain, et la moindre erreur d'interprétation (qualifier à tort un engagement de « non tenu ») détruit la crédibilité et expose à un risque de contestation.
- **Mutation proposée :** Ne pas vendre le tableau lui-même (gratuit et viral), mais construire la base de données structurée propriétaire la plus complète des engagements publics français, avec historique, sources citées page par page et API/flux RSS — et monétiser l'accès prioritaire aux rédactions, aux candidats et aux observatoires locaux, en commençant par un dossier premium à 49 € sur une ville pilote pour valider la demande.

## 9. Cote de confiance des engagements climatiques locaux
Elo 1500 · score 7.6 / 10 · lentille collision-api · inventé par glm

- **Problème :** Les communes et entreprises affichent des engagements de réduction d'émissions, mais personne ne vérifie publiquement si les capteurs du terrain montrent une amélioration réelle.
- **Pour qui :** Habitants, journalistes locaux et élus qui veulent suivre les promesses de leur commune.
- **Valeur pour la société :** Crée une pression transparente et factuelle sur les engagements environnementaux, sans accusation mais avec des données mesurées.
- **Comment :** Agents qui croisent les mesures OpenAQ/Sensor.Community par commune avec les engagements publics déclarés, et publient un « thermomètre » de suivi annuel par commune, en accès libre avec syndication payante.
- **Pourquoi maintenant :** Les données de capteurs deviennent suffisamment denses pour des comparaisons annuelles crédibles à l'échelle communale.
- **Revenu :** Syndication payante du thermomètre pour médias locaux et widgets intégrables (49 €/an par commune suivie).
- **Premier test :** Publier gratuitement le thermomètre de 20 grandes villes, puis proposer aux journaux locaux en ligne un widget syndiqué payant ; 3 souscriptions visées.
- **Faille :** La couverture et la fiabilité des données OpenAQ/Sensor.Community restent très inégales selon les communes, risquant de produire un thermomètre non représentatif, voire trompeur. De plus, les engagements publics sont souvent formulés de manière vague, rendant la comparaison directe avec des mesures de capteurs contestable.
- **Mutation proposée :** Ajouter un module de signalement collaboratif où les citoyens et associations peuvent remonter des données locales (photos de compteurs, relevés officiels) et commenter le thermomètre, transformant l'outil en plateforme ouverte de vigilance citoyenne. Cela renforce la crédibilité et crée un réseau de contributeurs difficiles à reproduire.

## 10. Traçabilité contractuelle : chaque marché public européen traduit en alertes d'opportunité
Elo 1500 · score 7.5 / 10 · lentille super-pouvoir-agent · inventé par glm

- **Problème :** Les appels d'offres européens sont dispersés sur des dizaines de portails publiés à toute heure ; les PME manquent 80 % des marchés qui les concernent.
- **Pour qui :** PME innovantes européennes qui veulent vendre aux acheteurs publics mais n'ont pas de cellule veille.
- **Valeur pour la société :** Ouvre la commande publique aux petits acteurs au lieu des seuls cabinets spécialisés, rendant la dépense publique plus concurrentielle et diversifiée.
- **Comment :** Des agents scrutent jour et nuit TED, BOAMP et les portaux nationaux, filtrent par métier déclaré de l'abonné et rédigent un résumé exploitable de chaque appel pertinent avec échéances.
- **Pourquoi maintenant :** Les nouveaux seuils et la numérisation complète de la commande publique européenne (2024-2025) rendent le flux integral et lisible par machine.
- **Revenu :** Abonnement 25-50 euros/mois selon fineness du filtrage, avec paiement en ligne ; option « pack premier dépôt » documentaire.
- **Premier test :** Offrir le filtrage manuel-agent à 10 PME d'un seul secteur pendant 2 semaines à 40 euros, recrutées via un post dans une communauté sectorielle en ligne.
- **Faille :** Les données de marchés publics sont ouvertes et gratuites ; un assistant IA concurrent peut offrir le même service sans abonnement, et les PME hésitent à payer pour une information qu'elles perçoivent comme accessible ailleurs.
- **Mutation proposée :** Se spécialiser sur un segment à forte valeur ajoutée (ex. marchés verts, innovation) et ajouter une analyse prédictive du taux de succès basée sur l'historique des attributions, ce qui créerait une couche propriétaire difficile à reproduire.

## Santé des cerveaux
- glm : 69 ok, 6 échecs (JSON illisible : ```json
[
  {
    "titre": "WakeUpLeads : sirene de dépendances abandonnées",
    "probleme": "Des milliers de paquets n)
- minimax : 7 ok, 9 échecs (JSON illisible : [
  {
    "titre": "Mines antipas : un vigie communautaire des dépendances qui meurent",
    "probleme": "Des applicatio)
- mimo : 88 ok, 24 échecs (JSON illisible : The user wants 4 radically different ideas in a JSON table format, following the "cimetière" method (ideas attempted bef)
- deepseek : 46 ok, 44 échecs (JSON illisible : Thinking. 1.  **Analyze the Request:**
    *   Role: A visionary inventor in a young, ambitious, cheeky AI agent organiz)
- qwen : 40 ok, 61 échecs (JSON illisible : Here's a thinking process:

1.  **Analyze User Input:**
   - **Role:** Visionary inventor in a young, ambitious, cheeky )

## Lentilles
- cimetiere : 12 idées, score moyen 5.88, 1 finalistes
- travail-invisible : 12 idées, score moyen 6.1, 4 finalistes
- luxe-democratise : 20 idées, score moyen 6.07, 3 finalistes
- signal-faible : 12 idées, score moyen 5.88, 3 finalistes
- transplant : 16 idées, score moyen 6.29, 3 finalistes
- inversion : 11 idées, score moyen 6.22, 2 finalistes
- super-pouvoir-agent : 16 idées, score moyen 6.29, 3 finalistes
- bien-commun : 17 idées, score moyen 6.09, 2 finalistes
- collision-api : 20 idées, score moyen 5.96, 1 finalistes
- evolution : 12 idées, score moyen 6.31, 2 finalistes
- futur-a-rebours : 8 idées, score moyen 5.61, 0 finalistes