# 1. Métis, le matin — Épisode 1 : ce qu'est vraiment un modèle de langage



*2026-11-01 · 9 min · leçon : Ce qu'est vraiment un modèle de langage*



Premier épisode du podcast : Métis et Léa présentent la machine et décortiquent ce qu'est vraiment un modèle de langage, du mot suivant aux jetons. L'opportunité du jour est l'assistant de révision vocale pour le code de la route, et Clément reçoit une question à trancher dans le Cockpit.



**Métis :** Bonjour Clément. Bienvenue dans Métis, le matin, ton nouveau rendez-vous quotidien. Chaque matin, je te raconte ce que la machine a fait pendant la nuit, je t'explique une notion qui compte, et je te propose une piste concrète pour agir. Tout en français, en dix minutes à peine, promis.

**Léa :** Bonjour Clément, moi c'est Léa. Je suis l'apprentie de l'équipe, et mon rôle est simple : je pose les questions que tu te poserais toi-même si tu avais le temps. Métis, c'est la stratège qui pilote la machine. Et aujourd'hui, c'est notre tout premier épisode, alors on va faire les présentations dans l'ordre.

**Métis :** La machine, donc. C'est un système que nous avons construit, et qui tourne tout seul pendant la nuit. Il lit des centaines de textes réels écrits par de vraies personnes, il y repère des douleurs, c'est-à-dire des problèmes concrets que des gens rencontrent, et il transforme ces douleurs en idées d'activités possibles. Chaque matin, je t'en raconte une, avec ses preuves.

**Léa :** Et cette nuit, elle a fait quoi, la machine, pour son premier jour raconté ?

**Métis :** Le dernier passage a duré vingt minutes et cinquante-cinq secondes, pour un coût de zéro dollar trente-deux. En tout, huit cent quatre-vingt-quatre appels à des modèles. La machine a lu six cent soixante-dix-huit textes bruts, en a tiré trois cent quatre-vingt-treize douleurs, puis quatre cent vingt-six gisements, autrement dit des zones où une douleur revient chez plusieurs personnes.

**Léa :** Et à partir de ça ?

**Métis :** Cinq cent quatre-vingt-quinze idées générées, dont cinq cent dix-sept ont été notées par des critiques. Soixante-dix-huit ont été jugées non conformes, ce qui laisse quatre cent trente-neuf idées validées. Puis trente-deux finalistes, quatre-vingts duels entre idées pour les départager, et quinze enquêtes sur le web pour vérifier ce qui existe déjà. Cinq sources ont nourri tout ça : cinquante-trois textes de Hacker News, mille cent quatre-vingt-neuf avis de boutiques d'applications, cent quatre-vingts de Stack Exchange et cent vingt-cinq de Lemmy.

**Léa :** Un mot sur la santé de la machine elle-même ? Tout s'est bien passé ?

**Métis :** Presque parfaitement. Nous utilisons plusieurs cerveaux, c'est-à-dire plusieurs modèles de langage différents, pour ne pas dépendre d'un seul. Qwen a traité deux cent cinq demandes sans aucun échec, en neuf secondes et quart en moyenne. Mimo, deux cent vingt-six sans échec, dix secondes en moyenne. Mistral, quatorze demandes, zéro échec. Deepseek a eu trois échecs sur deux cent huit, soit un pour cent, à cause d'une clé absente chez un fournisseur. Et Glm a eu cinq échecs sur deux cent trente et un, deux pour cent, avec des réponses illisibles. Deux parasites seulement ont filtré dans les résultats, sur presque sept cents textes.

**Léa :** Tu viens de dire le mot qui nous sert de leçon aujourd'hui : modèle de langage. On l'utilise tout le temps, mais Clément mérite la vraie définition, sans jargon.

**Métis :** Allons-y. Un modèle de langage, au fond, ne fait qu'une seule chose : il prédit le mot suivant. Imagine une phrase suspendue : le chat est assis sur le. Toi, tu complètes sans réfléchir : canapé, tapis, fauteuil. Le modèle fait exactement ça, mais avec des probabilités calculées sur des quantités astronomiques de textes. Il a appris quels mots suivent quels mots, dans quels contextes, avec quelle fréquence.

**Léa :** Attends, c'est tout ? Tout ce qu'on appelle l'intelligence artificielle, ça se résume à deviner le mot d'après ?

**Métis :** C'est tout, et c'est énorme. Parce que pour bien deviner le mot suivant dans une phrase difficile, il faut implicitement saisir la grammaire, le sens, le style, parfois même la logique d'un raisonnement. Le modèle n'a pas été programmé avec des règles. Il a absorbé des régularités. Un peu comme un enfant qui apprend sa langue en écoutant parler, sans jamais ouvrir un livre de grammaire.

**Léa :** Et les jetons, alors ? Tu m'as dit qu'on expliquerait ce mot.

**Métis :** Les jetons, c'est la monnaie du modèle. Avant de prédire, le modèle découpe le texte en petits morceaux qu'on appelle des jetons. Un jeton, c'est parfois un mot entier, parfois un fragment de mot, parfois un signe de ponctuation. Le mot incroyable, par exemple, peut devenir deux ou trois jetons. Et le modèle ne prédit pas un mot d'un coup : il prédit un jeton, puis un autre, puis un autre, un à la fois, jusqu'à la fin de la réponse.

**Léa :** Donc quand la machine nous écrit une idée d'activité cette nuit, elle ne l'a pas pensée d'un bloc. Elle l'a écrite jeton après jeton ?

**Métis :** Exactement. Et ça explique deux choses que tu as peut-être remarquées. D'abord, pourquoi la vitesse varie : cette nuit, Qwen a répondu en moyenne en neuf secondes et quart, Glm en six secondes et trois quarts, Deepseek en près de quinze secondes. Ce sont des modèles différents, avec des façons différentes de produire leurs jetons. Ensuite, pourquoi les erreurs existent : Glm a renvoyé cinq fois une réponse illisible, un objet vide. Le modèle a produit des jetons, mais des jetons qui ne voulaient rien dire.

**Léa :** Voilà la question qui me trotte dans la tête : si le modèle ne fait que prédire des jetons, comment peut-il sembler savoir autant de choses ?

**Métis :** Parce que savoir et comprendre ne sont pas la même chose, et c'est le cœur de la leçon. Le modèle sait sans comprendre, au sens plein du mot. Il n'a jamais vu un code de la route, jamais raté un examen, jamais conduit. Mais il a lu tellement de textes sur tout ça qu'il peut reproduire des réponses plausibles et souvent justes. C'est une mémoire statistique d'une puissance inouïe, pas une expérience vécue.

**Léa :** Et c'est un problème ?

**Métis :** C'est une force et une limite à la fois. La force : le modèle est bon marché et rapide sur des tâches que personne ne voudrait faire à la main. La limite : il peut affirmer avec aplomb quelque chose de faux, parce que son unique critère, c'est la plausibilité, pas la vérité. C'est pour ça que notre machine ne se contente jamais de ce que disent les modèles. Elle fait lire de vrais textes de vraies personnes, elle fait critiquer les idées, elle organise des duels, elle envoie des enquêtes sur le web. L'avis des modèles ne pèse qu'un tiers dans notre classement final.

**Léa :** Donc quand tu dis à Clément que la machine a trouvé une opportunité, ce n'est pas un modèle qui rêve tout seul. C'est une chaîne de vérifications.

**Métis :** Voilà. Et cette nuit, le laboratoire a même testé six nouveaux modèles bon marché contre les sept modèles en place, pour un coût de deux centimes de dollar. Le meilleur nouveau, Mercury trois, a obtenu huit virgule neuf sur neuf, presque le niveau du champion Deepseek quatre flash qui garde neuf sur neuf. Mais aucun nouveau modèle ne bat les modèles en place cette semaine, alors on ne change rien.

**Léa :** Je résume la leçon pour Clément : un modèle de langage prédit le jeton suivant, il sait beaucoup sans rien comprendre, et c'est précisément pour ça qu'il faut l'encadrer avec des preuves réelles. C'est bien ça ?

**Métis :** Parfaitement résumé, Léa. Et maintenant, l'opportunité du jour, trente secondes chrono. Elle s'appelle l'assistant de révision par chat vocal, note de sept virgule six cinq sur dix, la meilleure de la journée. Le problème : les candidats au permis de conduire veulent réviser en voiture ou dans les transports, sans regarder un écran, et les applications actuelles buguent.

**Léa :** Et la preuve ?

**Métis :** Elle vient de la machine elle-même : un gisement nommé applications de révision inefficaces, avec cinq mentions dans les boutiques d'applications françaises et belges. Un utilisateur écrit que l'application se bloque plusieurs fois par semaine alors qu'il donne la bonne réponse. Un autre dit que les images ne s'affichent qu'une fois sur deux. La solution proposée : un agent vocal sur WhatsApp ou Telegram qui pose les questions à voix haute, écoute la réponse et corrige, avec de la répétition espacée, c'est-à-dire revoir chaque question juste avant l'oubli. Abonnement à trois euros quatre-vingt-dix-neuf par mois, premiers clients dans les groupes de candidats au permis.

**Léa :** Mais l'enquête a trouvé des concurrents, non ?

**Métis :** Si, et c'est là qu'il faut rester honnête. Question Permis existe, gratuit avec des annonces. Loudwalk, qui ressemble à huit sur dix, propose déjà de réviser en marchant. Le verdict de l'enquête : creuser, parce que l'angle bot vocal sur WhatsApp avec répétition espacée semble libre, mais la preuve que les gens paient directement reste à valider. Et la faille identifiée, c'est la distribution : compter sur les groupes WhatsApp, c'est peu scalable. D'où la mutation proposée : une landing page ultra-ciblée sur la révision mobile du code de la route.

**Léa :** Ce qui nous amène à la question du jour pour Clément.

**Métis :** La voici, Clément. Pour cet assistant de révision vocale, préfères-tu démarrer par un bot WhatsApp testé avec cinq amis frontaliers, comme le suggère le premier test, ou par une landing page qui capte l'intention de recherche, comme le propose la mutation ? Réponds dans le Cockpit, et demain matin, je te dirai ce que ta réponse change dans nos plans.

**Léa :** Et sur cette note, on boucle le tout premier épisode. Ce que Clément doit retenir ce matin : un modèle de langage prédit des jetons, il sait sans comprendre, et c'est exactement pourquoi notre machine le tient en laisse avec des preuves du monde réel.

**Métis :** Merci Clément, pour cette première matinée ensemble. La machine repart à l'ouvrage dès maintenant, et je te retrouve demain avec de nouveaux chiffres, une nouvelle leçon et une nouvelle piste. Bonne journée, et bonne action.



**Question du jour :** Pour l'assistant de révision vocale du code de la route, préfères-tu démarrer par un bot WhatsApp avec cinq amis testeurs, ou par une landing page ciblée sur la révision mobile, comme le suggère la mutation proposée ?