# 8. Métis, le matin : Donner des yeux à une machine



*2026-11-02 · 10 min · leçon : Donner des yeux à une IA : la recherche web*



Hier, la machine a lu 763 textes réels, produit 645 idées notées, pour 0,47 dollar et 27 minutes de travail. La leçon du jour : comment une IA voit le web grâce à la recherche externe, ce que coûte une vraie enquête, et pourquoi la citation change tout.



**Métis :** Bonjour, c'est Métis. Le deuxième novembre, un lundi matin, votre machine a déjà travaillé.

**Léa :** Bonjour Métis. Trois chiffres pour commencer, comme d'habitude ?

**Métis :** Trois chiffres, oui. La machine a lu 763 textes réels. Elle en a tiré 645 idées notées. Le tout pour 0,47 dollar et 27 minutes de travail.

**Léa :** Moins de cinquante centimes pour parcourir tout ça. Et techniquement, ça s'est bien passé ?

**Métis :** Presque. Mercury a échoué 46 fois sur 100 appels, à cause d'un fournisseur saturé, donc nous avons un point technique à surveiller, mais rien de bloquant.

**Léa :** Bon. 763 textes, ça veut dire que la machine est sortie chercher l'information sur le web, hier.

**Métis :** Exactement, et c'est parfait pour aujourd'hui. Parce que la leçon du jour, c'est justement ça : donner des yeux à une IA. La recherche web.

**Léa :** Des yeux. Pourquoi cette image ?

**Métis :** Parce qu'une IA de base est née à une date précise. Imaginez un consultant brillant, mais enfermé dans une salle depuis deux ans, sans fenêtre, sans téléphone. Il connaît tout par cœur, jusqu'au jour où la porte s'est fermée. Après, plus rien.

**Léa :** Donc si je lui pose une question sur hier, il invente ?

**Métis :** Il peut inventer, oui, ou il avoue ne pas savoir. Les deux se ressemblent dans votre tête : vous n'avez pas votre réponse. La recherche web, c'est la fenêtre. On l'ouvre, et soudain le consultant peut vérifier, comparer, citer.

**Léa :** Concrètement, comment on ouvre cette fenêtre ?

**Métis :** Il y a plusieurs façons. La plus simple, c'est le plugin web. Vous demandez à votre modèle : va chercher sur le web. Le modèle, lui-même, lance une recherche, lit les pages, et intègre ce qu'il a trouvé dans sa réponse.

**Léa :** C'est le réflexe que tout le monde connaît, dans les assistants grand public.

**Métis :** C'est ça. Mais quand vous construisez une machine comme la nôtre, vous ne passez pas par le plugin de quelqu'un d'autre. Vous connectez directement des moteurs de recherche spécialisés, pensés pour les programmes, pas pour les humains.

**Léa :** Par exemple lesquels ?

**Métis :** Deux familles. D'un côté, Parallel : très rapide, très bon pour lancer beaucoup de recherches en même temps. Vous lui donnez vingt questions, il revient avec vingt lots de résultats presque instantanément.

**Léa :** Et de l'autre ?

**Métis :** De l'autre, Exa. Exa ne cherche pas seulement par mots-clés, il cherche par sens. Vous pouvez lui demander des pages qui ressemblent à une idée, même si aucun mot de votre idée n'y figure. C'est un moteur qui raisonne un peu.

**Léa :** Donc Parallel pour le volume, Exa pour la finesse ?

**Métis :** C'est une bonne façon de le dire. Et dans notre machine, hier, ces moteurs ont servi à quinze reprises. Quinze enquêtes web.

**Léa :** Quinze enquêtes. Racontez-m'en une, une vraie.

**Métis :** Avec plaisir. La machine a repéré une idée d'API SEO, une interface pour connaître la santé d'un site web. Avant de vous en parler, elle a ouvert la fenêtre. Elle est allée lire les pages des concurrents, elle a lu les tarifs affichés, elle a vérifié qui payait déjà.

**Léa :** Et elle a trouvé quoi ?

**Métis :** Elle a trouvé des concurrents, quatre, avec leurs prix et leurs faiblesses. Elle a trouvé un outil payant utilisé par 483 personnes en trente jours. Ça, c'est une preuve. Elle n'aurait jamais pu l'inventer.

**Léa :** Mais attendez. Une IA peut aussi citer un lien qui n'existe pas, non ? On en a parlé la semaine dernière.

**Métis :** Vous avez très bonne mémoire, et c'est exactement le point. La semaine dernière, notre question portait sur les faits sans source vérifiable. La recherche web transforme cette question. Elle ne supprime pas le doute, elle le déplace.

**Léa :** Comment ça, elle le déplace ?

**Métis :** Avant, la machine affirmait ou avouait son ignorance, et vous n'aviez rien pour vérifier. Maintenant, elle cite. Elle peut dire : ce prix, je l'ai lu sur cette page, à cette adresse. Vous pouvez aller voir vous-même. La citation, c'est le passage de la parole au document.

**Léa :** Donc une réponse avec citation vaut plus qu'une réponse sans ?

**Métis :** Elle vaut plus, à condition de faire la distinction entre deux sortes de citations. Une vraie citation vient d'une page que la machine a réellement consultée pendant sa recherche. Une fausse citation vient de sa mémoire, et elle peut parfaitement ressembler à un lien plausible et ne mener nulle part.

**Léa :** Comment on fait la différence, nous, simples humains ?

**Métis :** En gardant la règle qu'on s'est donnée : on ne compte une preuve que si la machine peut dire où, quand, et ce qu'elle y a lu exactement. Dans notre pipeline, les enquêtes alimentent une section preuve, avec les liens. Si le lien n'existe pas, la preuve tombe avec lui.

**Léa :** Bon. Et combien ça coûte, une enquête ? Parce que j'imagine qu'ouvrir la fenêtre, ce n'est pas gratuit.

**Métis :** Excellente question, et le chiffre est joli. Hier, nos quinze enquêtes web ont coûté, à elles toutes, la part finale de nos 0,47 dollar. L'étape enquête elle-même a duré 42 secondes et n'a ajouté que 0,08 dollar au total de la course.

**Léa :** 42 secondes et 8 centimes pour quinze enquêtes ? Ça me paraît presque trop bon marché.

**Métis :** Presque. Parce que le coût réel n'est pas là. Regardez le reste de la course : 763 textes bruts lus, 417 douleurs repérées, 1 477 gisements, 800 idées générées, 80 duels, le tout en 1 697 appels aux modèles. Les enquêtes ne coûtent pas cher parce que tout le reste a déjà filtré.

**Léa :** Donc on n'enquête pas sur tout ?

**Métis :** Jamais. Enquêter sur tout, ce serait payer pour lire mille pages dont 99 pour cent sont inutiles. La stratégie est ailleurs : on laisse les modèles bon marché trier d'abord, les critiques noter ensuite, les duels départager encore, et on ouvre la fenêtre web seulement pour les finalistes.

**Léa :** Combien de finalistes, hier ?

**Métis :** 32 finalistes, pour 15 enquêtes. Donc environ une enquête pour deux finalistes. Chaque enquête est un investissement concentré, pas une dépense dispersée.

**Léa :** Et la fenêtre a des limites, j'imagine.

**Métis :** Trois grandes limites. La première : le web est un instantané. Ce que le moteur vous renvoie peut dater, être incomplet, ou être absent simplement parce que personne n'a publié la page.

**Léa :** La deuxième ?

**Métis :** La deuxième : ce que la machine lit, elle le lit mal parfois. Les pages sont pleines de publicités, de menus, de textes en vrac. Extraire un prix fiable d'une page, c'est déjà un métier. Hier, sur trois prix lus, c'est trois lectures qui ont réussi, mais chaque lecture reste un pari.

**Léa :** Et la troisième ?

**Métis :** La troisième est la plus sournoise : une fois qu'elle a lu, la machine croit savoir. Une enquête qui confirme une idée lui donne de l'assurance, et cette assurance peut dépasser ce que la preuve mérite. Une seule page enthousiaste ne fait pas un marché.

**Léa :** Donc la fenêtre ouvre sur le monde, mais elle déforme aussi.

**Métis :** Toute fenêtre déforme. Le verdict d'hier sur l'idée SEO le montre bien : la machine a creusé, a trouvé le besoin réel et payant, mais elle a aussi noté que le marché est déjà saturé et que la défendabilité est faible. Elle est sortie de l'enquête avec plus de nuances qu'elle n'y est entrée, et c'est exactement le but.

**Léa :** Je résume pour vérifier que j'ai suivi. Une IA sans recherche web est un consultant sans fenêtre : il sait beaucoup, mais rien de frais. La recherche web, ce sont des moteurs spécialisés, Parallel pour le volume, Exa pour le sens. La citation transforme une affirmation en document vérifiable. Et l'enquête ne coûte presque rien parce qu'elle arrive en dernier, après que tout le tri est fait.

**Métis :** Impeccable. J'ajouterais une phrase : la recherche web ne rend pas la machine honnête, elle rend son honnêteté vérifiable. C'est vous qui vérifiez.

**Léa :** Passons à l'opportunité du jour, alors. Trente secondes, avec la preuve.

**Métis :** La voici. Une API de santé SEO de domaine : un seul appel, et vous recevez l'autorité d'un site, son trafic estimé, ses liens entrants, sa part de trafic venu des intelligences artificielles. Score de 7,28 sur 10, la plus haute du jour.

**Léa :** Et la preuve, justement ?

**Métis :** La preuve tient en trois faits mesurés. Deux offres payantes du même besoin ont été repérées, avec prix lus sur la page. Un scraper existant, mal noté, est payé par 483 utilisateurs en trente jours, à 0,015 dollar par résultat. Et la demande grimpe : fois 1,63 sur 90 jours sur les mesures liées.

**Léa :** 483 personnes qui paient pour un outil fragile, c'est un signal clair.

**Métis :** C'est même le plus beau genre de signal : un marché qui paie mal desservi. La première étape de test est écrite, deux semaines, un endpoint avec dix métriques, en paiement à l'usage, et vingt appels payants visés.

**Léa :** Et le risque, puisqu'on parle d'honnêteté ?

**Métis :** Il est réel et il est noté : un concurrent peut reproduire le même score avec des données ouvertes. C'est pour ça que la machine propose une mutation : des données exclusives, et un score de trafic IA fondé sur des signaux non publics. Le sujet est lancé dans le Cockpit, avec les liens de l'enquête.

**Léa :** Alors, la question du jour. Hier, on demandait à qui vous faites confiance quand un fait chiffré tombe sans source. Aujourd'hui, la machine cite. La question devient : quand une machine vous cite une source trouvée sur le web, quelle est votre première réaction ? Cliquer pour vérifier, faire confiance parce que la citation existe, ou reposer la question autrement ?

**Métis :** Répondez dans le Cockpit, vos réponses d'hier nous ont aidés à préparer cet épisode. Pour rappel : hier, la machine a lu 763 textes, noté 645 idées, dépensé 0,47 dollar.

**Léa :** Et la fenêtre, elle, ne s'est ouverte que quinze fois. C'est peut-être ça, la vraie leçon : l'œil coûte moins cher que le tri, mais le tri décide où l'œil regarde.

**Métis :** Bien dit. Je suis Métis, votre machine a déjà recommencé à lire.

**Léa :** Et moi, Léa, je vous retrouve demain matin. Bonne journée, et vérifiez vos liens.



**Question du jour :** Quand une machine vous cite une source trouvée sur le web, quelle est votre première réaction : cliquer pour vérifier, faire confiance parce que la citation existe, ou reposer la question autrement ?