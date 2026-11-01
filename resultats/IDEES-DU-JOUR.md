# Usine à idées — 2026-11-01
64 idées générées, 10 notées, 4 duels. Appels : 144 (98 échecs).

## 1. Cartographie satellite du miel et des huiles suspects
Elo 1531 · score 6.9 / 10 · lentille collision-api · inventé par glm

- **Problème :** Le miel et les huiles d'olive sont parmi les produits les plus falsifiés d'Europe, et les consommateurs n'ont aucun moyen de vérifier la cohérence entre l'origine déclarée sur l'étiquette et la réalité agricole.
- **Pour qui :** Militants de la consommation honnête, apiculteurs et producteurs authentiques, médias de consommation.
- **Valeur pour la société :** Défendre les petits producteurs honnêtes contre la fraude agroalimentaire, un fléau qui détruit des filières entières.
- **Comment :** Croiser Open Food Facts (origine déclarée, ingrédients) avec Copernicus : détection des surfaces de tournesols, oliveraies et ruches dans les régions d'origine déclarées ; si un pays ne cultive pas assez pour ses volumes exportés, alerte d'incohérence publique.
- **Pourquoi maintenant :** La fraude au miel est révélée publiquement en 2023-2024 et la confiance des consommateurs est au plus bas, avec une demande d'outils de vérification indépendants.
- **Revenu :** Abonnement 5€/mois pour l'app de vérification grand public, et licence des rapports d'incohérences par filière pour associations et médias.
- **Premier test :** Publier gratuitement un rapport viral sur les incohérences miel/huile d'un pays précis, avec une page de don ou prévente d'abonnement 3€ encaissé via Gumroad.
- **Faille :** La détection des ruches par satellite est irréaliste (elles sont trop petites), et les données Open Food Facts sont imprécises, ce qui risque de produire des alertes fausses ou inexploitables.
- **Mutation proposée :** Remplacer la détection des ruches par l'analyse des flux commerciaux et des données douanières croisées avec les surfaces agricoles visibles (oliveraies, tournesols), et intégrer des bases de données de miel authentifié par ADN (ex. FoodAuthent) pour réduire les faux positifs.

## 2. Chroniqueur automatique des rappels du quotidien
Elo 1516 · score 7.3 / 10 · lentille super-pouvoir-agent · inventé par glm

- **Problème :** Personne ne raconte l'histoire des rappels produits : motifs, nag des fabricants, récurrences — un journalisme de données qui n'existe pas.
- **Pour qui :** Journalistes grand public, créateurs de contenu conso, particuliers exigeants.
- **Valeur pour la société :** Pression démocratique sur les fabricants : rendre visible et mémorable leur historique de défaillances.
- **Comment :** Des agents IA tiennent 24h/24 une base « casier judiciaire » de chaque marque (rappels, Safety Gate, sanctions), génèrent une chronique quotidienne publiée et vendue en flux payant.
- **Pourquoi maintenant :** Les données sont publiques, structurées, et aucun média n'a les moyens humains de tenir un suivi quotidien complet.
- **Revenu :** Flux RSS premium pour rédactions et newsletter grand public à 6€/mois.
- **Premier test :** Publication d'un « top 10 des marques les plus rappelées de 2024 » gratuit, avec accès aux fiches détaillées par marque à 12€ — vente directe sur la page.
- **Faille :** La valeur pour les journalistes est incertaine : peu de rédactions paieront pour un flux alors que les données sont gratuites et que des alertes basiques existent déjà.
- **Mutation proposée :** Cibler directement le consommateur via une extension navigateur qui croise ses achats avec les rappels, et monétiser par un abonnement individuel à 1€/mois avec notification personnalisée.

## 3. Micro-assurance récolte déclenchée par le satellite
Elo 1515 · score 7.0 / 10 · lentille cimetiere · inventé par minimax

- **Problème :** L’assurance récolte des petits agriculteurs dépend dexpertises coûteuses, de déclarations incomplètes et de délais de paiement longs, ce qui pousse beaucoup à ne pas s’assurer.
- **Pour qui :** Petits producteurs, coopératives agricoles et insurersfengarant leurs原理ments.
- **Valeur pour la société :** Rendre la protection contre les aléas climatiques accessible, accélérer l’indemnisation après une sécheresse ou une inondation, et sécuriser l’approvisionnement local.
- **Comment :** Les agents croisent les images Sentinel avec la météo, la topographie et les calendriers culturaux, puis déclenchent une indemnisation paramétrique selon des seuils préétablis et vérifiables.
- **Pourquoi maintenant :** L’imagerie Sentinel gratuite, la couverture satellite plus fréquente et les agents de calcul rendent viable une underwriting continue qui aurait été trop chère avant 2023.
- **Revenu :** Commission sur les primes souscrites via un comparateur partenaires et API d’indemnisation en marque blanche pour assureurs et coopératives.
- **Premier test :** Choisir une culture et une zone pilote, rendre un calculateur public avec des données historiques, puis proposer aux dix mille producteurs d’un bassin versant un accès à 19 euros par saison avec paiement immédiat pour troisプールss，风险：risque? 
- **Faille :** Nécessite un agrément d'assurance et des partenariats avec des assureurs, ce qui bloque un test rapide et autonome.
- **Mutation proposée :** Proposer un service de scoring de risque climatique en marque blanche pour coopératives, sans assumer le risque d'assurance, avec une preuve de concept gratuite sur une saison.

## 4. Simulation d'électrification domestique ouverte et Gamifiée
Elo 1500 · score 7.0 / 10 · lentille signal-faible · inventé par glm

- **Problème :** Les ménages qui veulent passer au tout-électrique (pompe à chaleur, voiture, induction) n'ont aucun outil fiable pour simuler leur courbe de charge et leur facture réelle, et la tendance « électrifier pourrait diviser la consommation mondiale par deux » reste inaccessible au grand public.
- **Pour qui :** Propriétaires en rénovation énergétique et futurs acheteurs de VE, dans les 12-36 mois avant l'explosion de la demande de pilotage domestique.
- **Valeur pour la société :** Accélérer une électrification intelligente (moins de pic réseau, plus de renouvelable absorbée) au lieu d'une électrification chaotique.
- **Comment :** Agents qui génèrent, à partir d'une description libre du logement (texte, pas de donnée sensible), un profil horaire de consommation simulé sur 12 mois avec Open-Meteo (degrés-jours, production PV théorique) et un plan de passage au tout-électrique étape par étape, livré par e-mail sous 24 h.
- **Pourquoi maintenant :** Les prix de l'énergie et la sortie du fioul/gaz rendent la question pressante pour des millions de foyers dès 2025-2027, et les prévisions météo horaires open source rendent la simulation précise et gratuite à produire.
- **Revenu :** Simulation de base gratuite (boucle d'acquisition), plan détaillé personnalisé 19 €, puis affiliation transparente sur équipements sobres.
- **Premier test :** Page « Le tout-électrique en 12 mois : ta feuille de route » ; 30 simulations gratuites offertes la semaine 1 contre partage, puis activation du paiement ; mesurer la conversion sur 2 semaines.
- **Faille :** Faible barrière à l'entrée : un concurrent peut reproduire le service avec un LLM et une API météo gratuite, rendant la différenciation difficile.
- **Mutation proposée :** Intégrer un module de calibration basé sur les factures réelles (upload anonymisé) et créer une communauté d'utilisateurs partageant leurs courbes de charge pour enrichir le modèle et verrouiller l'avantage réseau.

## 5. Le Score-Caducée : noter les notices de médicaments en risque de rappel, en direct
Elo 1500 · score 6.0 / 10 · lentille collision-api · inventé par mimo

- **Problème :** Les laboratoires et pharmacies n'ont aucune visibilité en temps réel sur les effets indésirables qui se cumulent autour d'une molécule avant que l'agence ne déclenche un rappel officiel, trop tard pour protéger les patients.
- **Pour qui :** Pharmacies indépendantes, établissements de santé, distributeurs en ligne.
- **Valeur pour la société :** Détecter la dérive d'un produit dangereux des semaines avant l'alerte publique, au moment où des centaines d'achats peuvent encore être bloqués.
- **Comment :** Croiser openFDA et la base EMA (signaux d'effets indésirables) avec RappelConso et Safety Gate (signaux de rappels déjà confirmés) pour entraîner un score prédictif de risque de rappel par produit, publié sur une page publique consultable sans appel.
- **Pourquoi maintenant :** Safety Gate alimente les rappels européens au jour le jour et openFDA a doublé ses volumes de données ; jamais ces deux flux n'ont été mis en regard automatiquement.
- **Revenu :** Abonnement mensuel par établissement (à partir de 49 €/mois) via inscription en ligne, plus un widget gratuit viral.
- **Premier test :** Publier en 2 semaines une page publique « 50 produits les plus proches d'un rappel cette semaine » et vendre 3 abonnements à des pharmacies indépendantes contactées par e-mail.
- **Faille :** Un score prédictif de dangerosité de médicaments, même agrégé, touche à la pharmacovigilance : un faux signal publié publiquement peut nuire à un laboratoire (diffamation commerciale) ou faussement rassurer sur un produit risqué, et la frontière avec le dispositif médical réglementé (MDR) est floue. De plus, les données sources sont publiques : un concurrent (ou l'IA gratuite de demain) peut reconstruire le score en un week-end, et des pharmacies indépendantes n'achèteront pas 49 €/mois un abonnement par simple e-mail sans preuve d'exactitude passée.
- **Mutation proposée :** Repositionner le score comme un simple « indice d'attention réglementaire » factuel et sourcé (comptage des signaux publics, jamais de jugement de dangerosité), avec un historique public vérifiable : chaque prédiction passée affichée avec son issue réelle (rappel confirmé ou non). Cette transparence crée la confiance et la défensibilité (track record impossible à copier sans historique), réduit le risque juridique, et permet de vendre d'abord un widget d'affiliation/veille gratuit aux pharmaciens via leurs groupes Facebook pro, puis l'abonnement aux distributeurs en ligne qui, eux, ont un vrai enjeu financier (retirer un lot avant rappel = économies mesurables).

## 6. Synthése statistique sur mésure
Elo 1500 · score 5.9 / 10 · lentille travail-invisible · inventé par deepseek

- **Problème :** Les données publiques (Eurostat, OCDE) sont imenses et complexes : un élu local ne peut pas les exploiter pour compárer sa ville avec d’autrès.
- **Pour qui :** Maires de comùunes moyénnes, assoçiations locales, journalistes de proximité.
- **Valeur pour la société :** null
- **Comment :** Agént qui collecte, nettoie et croise les statistiiques (chômage, démographie, etc.) pour gẹnérer un rapport en langage clair, actualisé automatiquement.
- **Pourquoi maintenant :** Généralisation des données ouvertes mais encore très andrộtes pied ; forte demànde de transparance locale.
- **Revenu :** Paiement par rapport (50–100 €) ou forfait trimestriel pour une ville ou une association.
- **Premier test :** Proposer à une mairie de moins de 10 000 habitants un rapport gratuit sur sa démographie, puis lui soumettre un devis de 60 € pour un tableaud de bord mensuel.
- **Faille :** Les données sources sont publiques et gratuites : dès qu'un GPT généraliste sait interroger Eurostat, le rapport perd toute valeur perçue ; et vendre à des mairies sans appel téléphonique est très lent (achats publics, inertie), le test 'gratuit puis devis 60 €' risque de ne convertir personne sous 30 jours.
- **Mutation proposée :** Cesser de vendre un rapport ponctuel et vendre un abonnement 'observatoire territorial clé en main' : page web blanchable par commune, mise à jour continue, comparaison automatique avec les villes jumelles, et diffusion via les réseaux existants (intercommunalités, fédérations d'associations, newsletters de journalistes locaux) plutôt que démarchage mairie par mairie — la défensibilité vient alors du flux actualisé et du réseau, pas du PDF.

## 7. L’atlas à contre-courant
Elo 1500 · score 5.3 / 10 · lentille inversion · inventé par minimax

- **Problème :** Les tableaux statistiques montrent ce qui existe déjà ; ils rarely montrent comment un territoire pourrait changer si une règle, un budget ou un service fonctionnait autrement.
- **Pour qui :** Les citoyens, élèves, associations et élus locaux qui veulent explorer des scénarios territoriaux avant une décision.
- **Valeur pour la société :** L’atlas rend les hypothèses visibles, confronte les modèles existants et ouvre la discussion à des trajectoires non verbales dominantes.
- **Comment :** L’utilisateur choisit un indicateur et une contrainte réelle, puis l’IA simule plusieurs trajectoires avec les données publiques et des hypothèses explicites. Chaque scénario affiche ses sources, ses incertitudes et ses effets possibles, sans prétendre prévoir.
- **Pourquoi maintenant :** Les recherches sur les représentations spatiales des modèles visuels indiquent une capacité croissante à relier images, lieux et contexte, ce qui rend crédible une couche visuelle et cartographique des données.
- **Revenu :** Version gratuite limitée à un scénario, puis abonnement à 6 euros par mois pour les simulations illimitées, l’export et l’archivage.
- **Premier test :** Publier un prototype comparant trois scénarios de mobility-framework pour une ville, enforceable auprès de 150 testers, et obtenir 20 abonnements payants sous deux semaines.
- **Faille :** Le premier paiement en 30 jours est très improbable : personne ne passe de la curiosité à un abonnement de 6 €/mois en 2 semaines pour un prototype de scénarios territoriaux, et la défensibilité est quasi nulle puisque les données sont publiques et l'IA grand public produira des choses similaires gratuitement.
- **Mutation proposée :** Remplacer l'abonnement grand public par des packs thématiques 'atlas d'un territoire' vendus à l'unité (15-30 €) aux associations et collectifs citoyens qui en font un argument dans leurs campagnes — ou prévendre un atlas financé via une page de dons/partenariat citoyen — pour transformer un gadget en objet de mobilisation avec une communauté propriétaire.

## 8. Adventures Temporelles
Elo 1485 · score 3.9 / 10 · lentille collision-api · inventé par mistral

- **Problème :** Les créateurs de contenu cherchent des idées pour des histoires immersives et historiques.
- **Pour qui :** Les créateurs de contenu numérique, YouTubers, et podcasters.
- **Valeur pour la société :** Fournir des idées créatives et fiables pour des histoires captivantes basées sur des événements historiques.
- **Comment :** Créer une plateforme qui génère des scénarii pour des vidéos ou podcasts, utilisant des descriptions et des objets interdi des livres historiques et des rapels de produits dangereux pour ajouter un contexte unique à des récits de fiction.
- **Pourquoi maintenant :** La demande croissante pour des contenus interactifs et immersifs dans le domaine du divertissement.
- **Revenu :** Vente de scénarios personnalisés.
- **Premier test :** Créer 5 scénarios et les vendre à 1€99 pour un événement en ligne organisé sur les réseaux sociaux.
- **Faille :** Le positionnement est flou et le mélange 'rappel-conso + livres historiques' est incohérent : les créateurs historiques n'ont aucun besoin de rappels produits, et des scénarios à 1€99 vendus via un 'événement en ligne' vague ne généreront rien. Surtout, un assistant IA gratuit peut déjà générer des idées d'histoires historiques : la valeur perçue est quasi nulle.
- **Mutation proposée :** Se recentrer sur une niche précise : générer des packs d'épisodes documentés (timeline vérifiée, sources Gutenberg citées, angles narratifs, hooks) pour podcasteurs d'histoire vraie, vendus par abonnement sur Gumroad. La défensibilité vient de la vérification des sources et de la profondeur documentaire — pas de l'idée brute — et le premier euro peut venir d'un pack '10 épisodes prêts à tourner' à 19€ posté dans des communautés de créateurs.

## 9. Utopie Factory : transformer les scénarios impossibles enxpérience
Elo 1484 · score 5.3 / 10 · lentille super-pouvoir-agent · inventé par minimax

- **Problème :** Les forecasts publiques sur les transitions énergétiques, les migrations ou l’IA sont souvent des documents opaques, difficiles à manipuler et rarement reliés à l’histoire.
- **Pour qui :** Élèves, étudiants,Citizens associations, Reveres de politiques publiques et Outsiders.
- **Valeur pour la société :** L’outil rend l’incertitude explorable par l’expérience plutôt que par la宣传, et confronte chaque scénario à des sources historiques sans pretended prédiction.
- **Comment :** Un moteur d’agents simule des centaines de futurs à partir de règles explicites sur la substitution et la complémentarité, puis les publie sous forme de récits, cartes et games branchés issus du domaine public.
- **Pourquoi maintenant :** Les recherches sur les substituts et les complements convergence avec la capacité des agents à construire des scénarios interactifs, ouvrant un produit pédagogique encore inexistant à cette échelle.
- **Revenu :** Accès gratuit à un scénario, puis abonnement à 5 euros par mois et vente d’exercices工作组 pour groupes éducatifs.
- **Premier test :** En deux semaines, lancer un scénario gratuit sur les transports、食品 et l’énergie, mesurer sa complétion et demander un accès à 5 euros par mois aux 30 premiers participants volontaires.
- **Faille :** Le public est flou (élèves, associations, curieux ?), le premier test n'a aucun canal de distribution identifié et l'abonnement à 5 € pour des récits génératifs est très faible face à un assistant gratuit qui peut improviser un scénario interactif sur demande ; la défensibilité repose sur des sources publiques (GDELT, Gutenberg) copiables par tous.
- **Mutation proposée :** Cibler UN acheteur précis — enseignants de SES/histoire-géo — et vendre des packs de scénarios prêts à l'emploi alignés sur le programme (fiches + jeu de branches + corrigés) à 19–29 € l'unité sur une place de marché éducative, avec la base de scénarios tracée et vérifiables comme actif accumulé plutôt qu'un abonnement grand public.

## 10. RappelCarto : la carte vivante des produits dangereux autour de chez vous
Elo 1469 · score 6.2 / 10 · lentille collision-api · inventé par mimo

- **Problème :** Les rappels sont diffusés en liste textuelle illisible sur des sites officiels ; personne ne sait quel produit dangereux est vendu dans son quartier, ses marchés, ses friperies.
- **Pour qui :** Consommateurs citoyens, associations locales de protection, collectivités.
- **Valeur pour la société :** Rendre visible et géolocalisable l'information de sécurité publique, la sortie des listes et l'entrée dans le réel quotidien.
- **Comment :** Croiser les rappels Safety Gate/RappelConso avec les catalogues ouverts de commerce local (fichiers open data des commerce, APIs de marketplaces) pour cartographier quels établissements vendent encore un produit rappelé.
- **Pourquoi maintenant :** Les deux flux sont publiques, gratuits et horodatés ; aucune cartographie croisée n'existe en France aujourd'hui.
- **Revenu :** Freemium : cartographie gratuite, abonnement « quartier » à 3 €/mois pour les alertes push, partenariats avec marques conscientes de leur réputation.
- **Premier test :** Lancer la carte sur 3 villes pilotes et faire payer 20 abonnements mensuels de 3 € sous 2 semaines via une landing page.
- **Faille :** Le croisement est fragile : les catalogues open data de commerce local ne disent pas ce qu'un magasin précis a en stock ni en lots (dates, numéros de lot) — la cartographie risque d'être fausse ou vide, et une fausse alerte « produit dangereux chez ce commerçant » est juridiquement risquée (diffamation commerciale). À cela s'ajoute que 60 € de revenus en 2 semaines ne couvre même pas l'hébergement, et qu'un grand media ou un rappelConso amélioré peut répliquer l'idée en un week-end.
- **Mutation proposée :** Inverser la promesse : au lieu de pointer des magasins (invérifiable), devenir l'agrégateur-alerte par produit et par code-barres — l'utilisateur scanne ou suit une catégorie, l'agent IA surveille en continu Safety Gate + RappelConso + notices, et pousse une alerte datée, sourcée, horodatée, avec lien officiel. Ça supprime le risque juridique, rend les données propres défendables (historique des alertes,base croisée unique), rend l'abonnement 3€ crédible (« on veille pour vous 24/7 »), et se teste en 2 semaines sur une seule catégorie à risque (jouets, cosmétiques) via une landing page + newsletter.

## Lentilles
- collision-api : 12 idées, score moyen 5.74, 4 finalistes
- bien-commun : 8 idées, score moyen null, 0 finalistes
- cimetiere : 8 idées, score moyen 7, 1 finalistes
- travail-invisible : 4 idées, score moyen 5.95, 1 finalistes
- signal-faible : 8 idées, score moyen 6.95, 1 finalistes
- inversion : 4 idées, score moyen 5.25, 1 finalistes
- super-pouvoir-agent : 8 idées, score moyen 6.3, 2 finalistes
- luxe-democratise : 4 idées, score moyen null, 0 finalistes
- futur-a-rebours : 4 idées, score moyen null, 0 finalistes
- transplant : 4 idées, score moyen null, 0 finalistes