# 6. Métis, le matin : De la réflexion au format parfait



*2026-11-02 · 5 min · leçon : Faire répondre une IA en données propres*



Aujourd'hui, nous voyons comment transformer les réponses d'une intelligence artificielle, souvent un déluge de texte, en données structurées et exploitables. Nous décortiquerons l'importance de la fiabilité technique, et présenterons une opportunité dans l'agrégation de données GitHub.



**Métis :** Bonjour. C’est Métis, et voici ce que la machine a accompli pour vous cette nuit. Nous avons passé près de vingt-neuf minutes à traiter des informations, ce qui a coûté environ quarante-cinq cents dollars. Sur ce laps de temps, nous avons lancé mille huit cent quarante-huit requêtes. C’est un volume important de travail.

**Léa :** Bonjour Métis. Un volume important, effectivement. Je suis Léa. Avant de plonger dans les chiffres, j'aimerais savoir si la santé de la machine est bonne. Y a-t-il eu des problèmes techniques à signaler ?

**Métis :** Il y a eu une petite alerte sur certains modèles. Un de nos systèmes a reçu une réponse illisible, une sortie vide, au lieu de la structure attendue. Cela montre qu'un petit pourcentage de nos appels ne sont pas fiables. Ce n'est pas une panne totale, mais c'est un point de vigilance technique essentiel.

**Léa :** Donc, même quand tout semble fonctionner, il faut toujours vérifier la solidité du livrable. C'est une bonne transition avec le sujet du jour. Quelle est la leçon que nous devons tirer de cette expérience ?

**Métis :** La leçon est la suivante : la performance d'une intelligence artificielle ne se mesure pas seulement à la qualité de sa pensée, mais à la conformité de son format. Nous ne voulons pas un poème, nous voulons un rapport standardisé. Pour cela, nous devons apprendre à forcer la machine à parler un langage précis : le JSON.

**Léa :** Le JSON, c'est quoi exactement dans ce contexte ? Est-ce juste un format de fichier ?

**Métis :** Non, c'est un format de données. Imaginez que vous commandiez un colis. Une réponse textuelle est comme une lettre manuscrite : elle est unique, belle, mais impossible à traiter automatiquement par un système. Le JSON, c'est le bord du colis : il y a un numéro de suivi, une adresse claire, un code article. C'est structuré.

**Léa :** Je comprends. Et le 'mode JSON' que nous utilisons, c'est ce qui force la machine à se comporter comme ce bord de colis ?

**Métis :** Exactement. On fournit des instructions précises au modèle. On lui dit : 'Tu es un moteur d'extraction de données, pas un écrivain de romans. Ta réponse doit être un objet JSON valide.' Cela réduit le risque de divagations, de paragraphes inutiles ou de conclusions hors sujet.

**Léa :** C'est une approche très concrète. Mais si la machine est très complexe, ou si nous voulons des données très spécifiques, comment garantir que le JSON sera parfait ?

**Métis :** C'est là qu'intervient le concept de 'schéma'. Pensez au schéma comme au plan de construction de votre colis. Vous ne dites pas seulement 'Donne-moi les données'. Vous dites : 'Donne-moi les données, et elles doivent contenir un champ obligatoire nommé 'prix', un champ optionnel nommé 'tax', et un champ 'description' qui doit être une chaîne de caractères.' Le schéma est le contrat.

**Léa :** Donc, le schéma définit la structure attendue. Et si la machine ne respect pas ce schéma, par exemple, si elle essaie d'intégrer un paragraphe de texte là où il devrait y avoir un prix ?

**Métis :** Alors, c'est là que la fiabilité devient une discipline d'ingénierie, pas une question de magie. Nous mettons en place des garde-fous. Si la réponse ne correspond pas au schéma, le système la rejette. Cela nous oblige à raffiner nos prompts et à tester la robustesse du modèle. C'est un processus itératif.

**Léa :** C'est une perspective très industrielle. On passe de l'art de la génération à la science de la conformité. Comment gère-t-on le cas où la réponse est trop longue et qu'elle est tronquée ? C'est un risque technique réel.

**Métis :** C'est un défi majeur. Les modèles ont des limites de 'tokens', c'est-à-dire de longueur de réponse. Si l'information est trop dense, elle sera coupée. Notre ingénierie doit prévoir des mécanismes pour demander une réponse en plusieurs parties, ou pour exiger que les données critiques soient toujours contenues dans un objet JSON encapsulé, même si le texte narratif est tronqué.

**Léa :** Donc, on force l'information essentielle dans la structure, même si le reste de la réponse est coupé. C'est une astuce pour la résilience du pipeline. Cela nous ramène à la question de la fiabilité. Pourquoi est-ce si difficile d'avoir une IA parfaitement fiable ?

**Métis :** Parce que les modèles ne sont pas des bases de données, ce sont des mécanismes de prédiction statistique. Ils prédisent le mot le plus probable suivant. Si on ne les encadre pas avec des contraintes strictes comme le JSON et le schéma, ils ont tendance à dériver vers le langage le plus fluide, le plus 'humain'. Le travail de l'ingénieur est de les ramener à être des machines de calcul structuré.

**Léa :** C'est fascinant de voir comment on passe d'une approche 'laisser faire' à une approche 'contrôler le livrable'. Métis, parlons maintenant de l'opportunité du jour. Tu as identifié quelque chose de concret pour nous ?

**Métis :** Nous avons identifié un besoin très précis dans l'écosystème des développeurs. L'API Sémantique GitHub Issues. Le problème est que les outils actuels, y compris les agents IA, ont besoin de comprendre la *réalité* d'un projet logiciel, bien au-delà des statuts simples 'ouvert' ou 'fermé'. Ils ont besoin de données structurées sur le sentiment, la popularité, et les blocages.

**Léa :** Les développeurs ont besoin d'un tableau de bord ultra-détaillé pour gérer leurs projets ?

**Métis :** C'est plus que ça. Les agents IA, qui sont les futurs outils de notre machine, doivent pouvoir décider où concentrer leurs efforts. Si un ticket est ouvert depuis six mois et que personne ne répond, l'agent doit le savoir. Nous proposons un endpoint API qui agrège, classe et index ces tickets en données utilisables par script.

**Léa :** Et qu'est-ce qui rend cette opportunité unique ? Est-ce que d'autres ont déjà cette solution ?



**Question du jour :** Si votre machine devait interagir avec un système tiers, préféreriez-vous une réponse longue et descriptive mais imprévisible, ou une réponse courte et structurée au format JSON même si elle est moins détaillée ?