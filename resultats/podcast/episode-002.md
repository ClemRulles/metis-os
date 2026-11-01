# 2. Métis, le matin — Épisode 2 : les poids, la carte graphique et nos modèles chinois



*2026-11-01 · 9 min · leçon : Open source, poids et hébergement*



Métis explique ce que sont les poids d'un modèle, pourquoi un modèle gratuit coûte quand même de l'argent, et comment OpenRouter nous donne accès à des modèles chinois comme DeepSeek, Qwen, GLM et MiMo. L'opportunité du jour est un comparateur de salaires pour frontaliers Belgique-Luxembourg.



**Métis :** Bonjour Clément. Dimanche premier novembre, la machine a tourné vingt et une minutes pendant ton sommeil.

**Léa :** Et elle a travaillé dur, apparemment.

**Métis :** Elle a lu sept cent soixante et un textes réels, en a tiré six cent soixante-dix idées, dont trente-deux finalistes après les duels. Coût total : trente-sept centimes de dollar, en neuf cent quatre-vingt-trois appels aux modèles.

**Léa :** Trente-sept centimes pour tout ça. C'est le prix d'un morceau de pain.

**Métis :** Un seul accroc : le modèle Qwen a produit une réponse illisible une fois, coupée avant la fin, et le modèle GLM en a perdu cinq. Rien de grave, tout a été compensé.

**Léa :** Et le labo, il a testé de nouveaux modèles cette semaine, non ?

**Métis :** Si. Six nouveaux challengers contre sept modèles en place, pour deux centièmes de dollar de coût de test. Verdict : aucun nouveau modèle ne bat les modèles en place cette semaine. Le meilleur reste DeepSeek v4 flash, avec neuf sur neuf.

**Léa :** Parfait, on garde l'équipe gagnante. Alors, la leçon du jour. Tu m'avais promis qu'on parlerait d'open source.

**Métis :** C'est le cœur de l'épisode. Hier, on a vu qu'un modèle de langage, c'est une machine à prédire le mot suivant, entraînée sur des montagnes de textes. Aujourd'hui, on va ouvrir le capot.

**Léa :** J'ouvre le capot. Qu'est-ce que je trouve dedans ?

**Métis :** Un nombre gigantesque de petits réglages, qu'on appelle les poids. Imagine une recette de cuisine qui n'a pas dix ingrédients, mais des milliards de dosages. Un peu plus de sel ici, un peu moins de levain là. Chaque dosage est un poids.

**Léa :** Donc quand le modèle a été entraîné, il a juste ajusté ces dosages jusqu'à ce que ses prédictions soient bonnes ?

**Métis :** Exactement. Entraîner, c'est ça : goûter des milliards de fois, et corriger les dosages à chaque erreur. À la fin, tu obtiens un fichier, ou plutôt une pile de fichiers, qui ne contient que ces nombres. Pas de code intelligent, pas de recette magique. Juste les dosages.

**Léa :** Et ce fichier, c'est ce qu'on appelle le modèle ?

**Métis :** Oui. Quand on dit qu'un modèle est open source, ça veut dire que ce fichier de poids est téléchargeable par tout le monde. Tu peux le copier, l'installer chez toi, le modifier même. C'est comme si un grand chef publiait sa recette complète, dosages compris.

**Léa :** Attends. Si la recette est gratuite et publique, pourquoi tout le monde ne cuisine pas gratuitement ?

**Métis :** Voilà la question clé. Parce que la recette ne coûte rien, mais le four coûte cher. Un modèle de langage, ça tourne sur une carte graphique, le composant conçu à l'origine pour les jeux vidéo et devenu le carburant de l'intelligence artificielle. Et une carte graphique capable de faire tourner un gros modèle, ça coûte des milliers d'euros, parfois des dizaines de milliers.

**Léa :** Donc « modèle gratuit » ne veut pas dire « service gratuit ».

**Métis :** Jamais. Celui qui te donne la recette gratuitement ne te prête pas sa cuisine. Quelqu'un doit posséder les cartes graphiques, les allumer, les refroidir, les réparer, et payer l'électricité. C'est pour ça que même un modèle open source finit par te coûter quelques centièmes de centime à chaque question.

**Léa :** Et nous, on possède pas de cartes graphiques, je présume.

**Métis :** Non, et on n'en veut pas, du moins pas encore. On passe par un intermédiaire qui s'appelle OpenRouter. Imagine un menu unique au restaurant, mais derrière, la cuisine peut être n'importe laquelle : tu commandes un plat par son nom, et OpenRouter l'achemine vers la bonne cuisine, celle qui a le modèle en stock.

**Léa :** Donc toi, la machine, tu écris toujours la même chose au même endroit, et OpenRouter se charge de trouver qui fait tourner le modèle ?

**Métis :** Exactement. Une seule adresse, une seule facture, et derrière, des dizaines de fournisseurs qui hébergent les poids et me les louent à la seconde. Si un fournisseur tombe en panne, j'en choisis un autre qui sert le même modèle, sans changer une ligne de mon code.

**Léa :** Et c'est là que les modèles chinois entrent en scène ?

**Métis :** Oui, et c'est la partie la plus intéressante pour nous. Depuis deux ans, des laboratoires chinois publient des modèles open source dont les poids sont téléchargeables gratuitement : DeepSeek, Qwen, GLM, MiMo. Et ils sont bons. Vraiment bons.

**Léa :** Pourquoi est-ce que ça change la donne, des modèles gratuits et bons ?

**Métis :** Parce que ça casse le monopole du prix. Avant, un modèle de qualité, c'était un abonnement cher chez un grand acteur américain. Maintenant, n'importe quel fournisseur peut télécharger les poids de DeepSeek, les poser sur ses cartes graphiques, et te les revendre au prix qu'il veut. La concurrence fait le reste.

**Léa :** Et nos trente-sept centimes, ils viennent de là ?

**Métis :** En grande partie. Regarde nos cerveaux d'hier. Qwen a traité deux cent vingt-six appels, MiMo deux cent quarante-huit, DeepSeek deux cent dix-sept, GLM deux cent vingt-neuf. Nos quatre bêtes de somme sont tous des modèles chinois ou dérivés de modèles ouverts, servis via OpenRouter.

**Léa :** Et ils ont bien travaillé ?

**Métis :** MiMo : zéro échec sur deux cent quarante-huit appels. DeepSeek : zéro échec aussi. GLM : cinq échecs sur deux cent vingt-neuf, soit deux pour cent, des réponses mal formées qu'on a dû jeter. Qwen : un échec, une réponse coupée avant la fin. Au total, ça fait une poignée de pertes sur près de mille appels.

**Léa :** C'est quand même fou. Des modèles nés en Chine, hébergés qui sait où, et ta machine les appelle comme si c'étaient des collègues.

**Métis :** C'est ça, la révolution silencieuse. Les poids sont publics, l'hébergement est un marché, et un ingénieur seul dans son bureau à Bruxelles accède à la même puissance qu'une grande entreprise. Il y a dix ans, c'était impensable.

**Léa :** Il y a un revers, quand même ?

**Métis :** Deux. D'abord, la dépendance : si OpenRouter tombe, toute la machine s'arrête. Ensuite, la question de confiance : les poids sont publics, mais tu ne sais pas exactement comment ils ont été entraînés, ni quelles données ont servi. Pour nos usages, trier des douleurs et noter des idées, le risque est faible. Pour de la médecine ou du juridique, il faudrait creuser.

**Léa :** Bon, résumons pour être sûre d'avoir compris. Les poids, c'est la recette avec ses milliards de dosages. Open source, c'est la recette donnée gratuitement. Mais le four, la carte graphique, coûte cher, donc le service n'est jamais gratuit. Et OpenRouter, c'est notre serveur qui nous relie à toutes les cuisines.

**Métis :** Impeccable. Et nos quatre cuisines les plus utilisées sont chinoises, gratuites à la base, et excellentes. C'est pour ça qu'on arrive à six cent soixante-dix idées pour trente-sept centimes.

**Léa :** Passons à l'opportunité du jour, alors. Qu'est-ce que la machine a déniché ?

**Métis :** Première du classement, score sept virgule seize sur dix : un comparateur de salaires pour travailleurs frontaliers, Belgique-Luxembourg. Le problème est réel : les frontaliers ne savent pas combien ils devraient demander, et les scrapers d'offres d'emploi donnent rarement les salaires.

**Léa :** Quarante-sept pour cent de l'emploi luxembourgeois est frontalier, c'est énorme comme marché.

**Métis :** Et la preuve de paiement est intéressante : l'enquête n'a trouvé aucun concurrent, aucune offre payante pour ce besoin précis. Mais l'outil qui collecte les données, l'Indeed Scraper sur Apify, est payé par deux mille soixante-deux utilisateurs sur trente jours. Les gens paient déjà pour accéder à ces données d'emploi.

**Léa :** Le prix envisagé, c'est cinq euros quatre-vingt-dix-neuf pour un rapport premium, et le premier test, c'est cent pages de référencement puis dix frontaliers pilotes.

**Métis :** Attention tout de même : la machine a relevé un risque juridique moyen, parce que récupérer les offres d'Indeed est une zone grise dans leurs conditions d'utilisation. Et la faille principale, c'est que la valeur repose sur la qualité du croisement entre offres d'emploi et conventions collectives, un travail délicat.

**Léa :** Et la mutation proposée, elle dit quoi ?

**Métis :** Ne pas se contenter de comparer, mais créer un score de compétitivité salariale : l'outil évalue ton risque de sous-rémunération par rapport aux standards légaux. Ça transforme un comparateur passif en outil de négociation. Deuxième du classement au passage : un générateur de lettres de résiliation d'abonnements pour indépendants, à neuf euros quatre-vingt-dix-neuf la lettre, avec vingt-sept mentions de la douleur dans les avis d'App Store.

**Léa :** Bien. Et donc, la question du jour pour Clément ?

**Métis :** Hier, tu lui as demandé de choisir entre un bot WhatsApp et une landing page pour l'assistant de code de la route. Aujourd'hui, la question vient de la leçon : si un jour il voulait couper les coûts en hébergeant lui-même un petit modèle open source sur sa propre machine, préfère-t-il rester sur OpenRouter pour la simplicité, ou tenter l'auto-hébergement, malgré le temps que ça demandera ?

**Léa :** Il répondra dans le Cockpit, comme hier. Moi, je trouve que trente-sept centimes, c'est déjà difficile à battre.

**Métis :** C'est une réponse en soi. Voilà, Clément, tu sais maintenant ce qu'il y a sous le capot : des poids gratuits, des fours chers, et un aiguilleur nommé OpenRouter. La machine repart ce soir. Bon dimanche, et belle journée.



**Question du jour :** Pour la leçon d'aujourd'hui : si un jour tu devais héberger toi-même un modèle open source sur ta propre machine pour couper les coûts, préfères-tu rester sur OpenRouter pour la simplicité, ou tenter un petit modèle auto-hébergé malgré le temps que ça demandera ?