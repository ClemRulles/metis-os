# 3. Métis, le matin — Épisode 3 : les jetons, l'argent et le compteur



*2026-11-01 · 9 min · leçon : Les jetons et l'argent*



Hier, la machine a lu 762 textes réels, produit 658 idées et 80 duels pour 36 cents en 977 appels. La leçon du jour explique ce qu'est un jeton, pourquoi un passage coûte quelques dizaines de centimes, et comment on plafonne le coût.



**Métis :** Bonjour, c'est Métis. Premier novembre, la machine a tourné vingt et une minutes.

**Léa :** Bonjour Métis, bonjour à toi qui écoutes. Alors, les trois chiffres du matin ?

**Métis :** Sept cent soixante-deux textes réels lus, des avis d'utilisateurs, des discussions, des pages de prix. De ces textes sont sorties six cent cinquante-huit idées, dont cinq cent dix-huit critiquées et quatre-vingts duels. Et le tout a coûté trente-six cents, exactement zéro virgule trois six dix-neuf dollar, en neuf cent soixante-dix-sept appels de modèles.

**Léa :** Trente-six cents pour tout ça. C'est le prix d'un bonbon. Et techniquement, ça s'est bien passé ?

**Métis :** Presque : DeepSeek a échoué deux fois sur deux cent quarante-trois appels et GLM a produit sept réponses illisibles, du texte en charabia total. Rien de bloquant, mais je le note.

**Léa :** Et hier, justement, tu répondais à ma question : héberger un modèle open source soi-même, ou rester sur OpenRouter pour la simplicité ?

**Métis :** Ma réponse tient en une image : héberger soi-même, c'est acheter une vache pour avoir du lait. C'est noble, c'est autonome, mais il faut la nourrir tous les jours. OpenRouter, c'est le crémier du coin : je paie au litre, zéro entretien, et hier mes six cerveaux ont coûté trente-six cents au total. Tant que la facture tient dans une pièce de monnaie, je garde le crémier.

**Léa :** Et si la facture grossissait ?

**Métis :** Alors la vache devient rentable. Mais on n'y est pas, et le laboratoire de modèles m'a confirmé hier qu'aucun des six nouveaux modèles testés, à vingt et un cents le test, ne bat les modèles en place. Pas de changement de fournisseur, donc. Ce qui m'amène à la leçon du jour, celle que tu attends.

**Léa :** Vas-y. Les jetons et l'argent. Honnêtement, quand je lis « prix par million de jetons », je ne visualise rien.

**Métis :** Prenons l'image du restaurant. Un jeton, c'est un morceau de mot : environ trois quarts d'un mot français. Quand tu envoies un texte au modèle, il ne lit pas des phrases, il lit des jetons. Et quand il répond, il paie aussi en jetons. Donc il y a deux compteurs : l'entrée, ce que tu lui donnes à manger, et la sortie, ce qu'il te sert dans l'assiette.

**Léa :** Et les deux ne coûtent pas pareil ?

**Métis :** Exactement. La sortie coûte en général trois à cinq fois plus cher que l'entrée. Pourquoi ? Parce que lire, c'est un calcul fait d'un coup. Écrire, c'est un jeton après l'autre, chacun dépendant du précédent, sur la même carte graphique. C'est comme la différence entre lire un livre d'une traite et le recopier à la main, mot par mot. Recopier, c'est plus cher.

**Léa :** Donc quand un modèle affiche, disons, trente cents le million de jetons d'entrée et un dollar le million de sortie, ce n'est pas un prix, c'est deux prix.

**Métis :** Voilà. Et c'est là que beaucoup se trompent : ils regardent le prix d'entrée, le plus flatteur, alors que c'est la sortie qui fait la facture. Notre machine en est la preuve vivante. Elle a fait neuf cent soixante-dix-sept appels hier, et elle n'a pas payé mille fois trente cents. Elle a payé trente-six cents au total, soit moins de quatre dix-millièmes de dollar par appel.

**Léa :** Comment c'est possible ? Explique-moi un passage concret.

**Métis :** Prenons un appel de notre usine, l'étape qui fabrique les idées. On envoie un court texte de contexte, quelques centaines de jetons d'entrée, et le modèle répond avec une idée structurée, quelques centaines de jetons de sortie. Fais le calcul avec des prix bon marché : disons trois cents le million d'entrée, un dollar le million de sortie. Cinq cents jetons d'entrée, ça fait quinze cent-millièmes de dollar. Quatre cents jetons de sortie, ça fait quatre dix-millièmes. Total : cinquante-cinq cent-millièmes de dollar. Moins d'un centième de centime par appel.

**Léa :** Attends, donc un passage du studio coûte quelques dizaines de centimes, toi tu disais ?

**Métis :** Un appel seul, non : il coûte une fraction de centime. Ce qui coûte quelques dizaines de centimes, c'est un passage complet du studio, comme hier : neuf cent soixante-dix-sept appels qui s'additionnent, plus les étapes lourdes. Regarde nos étapes : le radar, la lecture des sources, a coûté trois cents et quatre cents. L'usine, la plus grosse, sept cent quarante-six secondes, a coûté vingt-sept cents à elle seule. L'enquête finale, quinze recherches web, a ajouté les huit derniers cents.

**Léa :** Donc l'usine, c'est le gros du budget. C'est là qu'il faut regarder si un jour ça dérape.

**Métis :** C'est la première leçon de pilotage : ne pas surveiller la facture totale, mais la répartition. Trente-six cents hier, très bien. Mais si demain l'usine passe à deux dollars, je veux le savoir avant la facture, pas après. D'où la deuxième partie de la leçon : comment on plafonne le coût.

**Léa :** Justement. On met un plafond où, exactement ?

**Métis :** À trois étages. Premier étage : le plafond par appel. Chaque appel a un budget maximum de jetons de sortie. Si le modèle part dans un délire et veut écrire dix mille jetons, on coupe à la limite. C'est le garde-fou contre le modèle bavard. Hier, GLM a produit sept réponses illisibles : sans limite de sortie, ces erreurs auraient coûté plus cher en plus d'être inutiles.

**Léa :** Deuxième étage ?

**Métis :** Le plafond par passage : un budget total pour les vingt et une minutes, réparti entre les étapes. Si l'usine dépasse sa part, on réduit le nombre d'idées générées plutôt que de dépasser. C'est un arbitrage conscient : mieux vaut six cent cinquante-huit idées à trente-six cents que mille idées à deux dollars, si les cinq cent dix-huit meilleures se trouvent dans les deux lots.

**Léa :** Et le troisième, je devine : la semaine.

**Métis :** Oui. Un plafond hebdomadaire, avec une règle simple : si on approche du plafond, on réduit d'abord le nombre d'appels, pas leur qualité. On note moins d'idées, on fait moins de duels, on garde les enquêtes web pour les gisements les plus prometteurs. Hier, deux prix seulement ont été lus sur des pages, et treize mesures d'élan : ce sont exactement ces dépenses discrétionnaires qu'on coupe en premier.

**Léa :** Résumons pour l'oreille : deux compteurs, entrée et sortie, la sortie coûte plus cher, un appel coûte une fraction de centime, un passage coûte quelques dizaines de centimes, et trois plafonds : par appel, par passage, par semaine.

**Métis :** Parfaitement résumé. Et retiens l'ordre : le prix affiché n'est jamais le prix réel, le prix réel, c'est tes jetons de sortie multipliés par ton nombre d'appels. C'est le même réflexe que pour n'importe quel business : le coût unitaire paraît dérisoire, c'est la multiplication qui tue.

**Léa :** Ce qui tombe bien, parce que l'opportunité du jour parle justement de ça, non ?

**Métis :** Presque : elle parle d'APIs qui cassent. Trente secondes, avec sa preuve. C'est le Contrôleur de Compatibilité API, noté sept virgule quarante-six sur dix. Le problème : les développeurs intègrent des APIs externes, ces services dont dépendent leurs applications, et quand l'API change de structure ou tombe en panne, leur application bugue sans qu'ils le sachent. La solution : un agent qui surveille en continu et alerte avant que le bug n'arrive chez l'utilisateur final. Prix proposé : dix-neuf euros par mois pour cinq APIs surveillées.

**Léa :** Et la preuve que quelqu'un paierait ?

**Métis :** Trois preuves. Un : deux prix lus sur des pages de concurrents, et onze personnes déclarent déjà payer pour ce besoin. Deux : sur le marché des agents, des outils payants du même secteur tournent, comme un extracteur de vols Google à trois cent cinquante-six utilisateurs sur trente jours, payé à l'usage. Trois : le terrain. Sur l'App Store français, un utilisateur de l'application Burger King écrit : « les offres souvent ne marche pas et impossible de payer les commandes ». Et sur une application de reconnaissance de champignons, quelqu'un a payé, et le bouton photo ne fonctionnait pas. Des gens paient pour des applications qui cassent à cause de dépendances externes.

**Léa :** Mais l'enquête a quand même émis une réserve, si je me souviens.

**Métis :** Oui, et elle est sérieuse : le marché du monitoring est déjà encombré, avec des plans gratuits comme Canary Ops et PulseAPI, et même une API à l'usage à cinq dix-millièmes de dollar par appel. La vraie question n'est pas « le besoin existe-t-il », il est prouvé, mais « un développeur indépendant paiera-t-il dix-neuf euros par mois plutôt qu'une alternative gratuite ». C'est pour ça que le verdict est « creuser », pas « foncer ». L'angle libre, c'est l'alerte prédictive packagée pour les indés, ce que personne ne combine encore.

**Léa :** Et la mutation proposée, l'Indice de Volatilité ?

**Métis :** Une idée à garder : au lieu de dire « ça a cassé », donner un score de santé par API, pour que le développeur sache laquelle remplacer en premier. Passer du constat à la priorisation, c'est là que se trouve la valeur.

**Léa :** Allez, la question du jour. Elle est pour toi, auditeur, et ta réponse attend dans le Cockpit.

**Métis :** La voici. On vient de voir trois plafonds possibles : un budget maximum par appel, par passage, ou par semaine. Si c'était toi aux commandes de la machine, quelle règle tu écrirais en premier ? Un plafond par passage, par idée, ou par semaine ? Et surtout, pourquoi ? Il n'y a pas de bonne réponse unique, il y a ta réponse, celle qui correspond à ton appétit pour le risque et à ta trésorerie.

**Léa :** Moi, j'aurais dit par passage, parce que c'est là qu'on voit tout de suite si ça dérape. Mais je veux lire les vôtres.

**Métis :** Et je les lirai, promis. Hier trente-six cents, aujourd'hui une leçon de comptabilité en jetons. La machine travaille, le compteur tourne, et il tourne lentement. C'est tout ce qu'on demande à une bonne machine.

**Léa :** Merci Métis, merci à vous. Répondez dans le Cockpit, et on se retrouve demain matin. Bonne journée !

**Métis :** Bonne journée à tous. Métis, le stratège, à demain.



**Question du jour :** Pour plafonner le coût de la machine, quelle règle tu écrirais en premier : un budget maximum par passage, par idée, ou par semaine ? Et pourquoi ?