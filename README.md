# Métis OS

Machine d'agents sur modèles ouverts, pilotée par Métis (Claude). Blueprint de référence :
https://claude.ai/artifact/BTswA5ePxA5RQTWZFqU4VK · Cockpit : https://claude.ai/artifact/3gQP1814Ac3TJpvzvxzsFK

## Ce qui existe (version 0.1, 31 octobre 2026)

| Module | Rôle | État |
| --- | --- | --- |
| `src/router.js` | Routeur multi-modèles : budget de tokens par fournisseur, coupe-circuit, repli, interrupteur d'arrêt | Testé, attend les clés |
| `src/genome.js` + `config/genes.json` | Configurations à 12 gènes, diversité imposée, mutation, croisement | Testé |
| `src/scoring.js` | Brier, score logarithmique, prix du marché, apport par rapport au consensus | Testé |
| `src/sprt.js` | Test séquentiel des pages de test (plonger, continuer, arrêter) | Testé |
| `src/banc/` | Banc du passé : collecte Show HN et Manifold, consignes, notation, carte des gènes | Testé, collecte réelle faite |
| `schema/registre.sql` | Registre D1 : configurations, cas, prédictions, expériences, événements, trouvailles, règles, versions | Prêt |
| `src/marche/agents.js` | Marché des agents : 1 000 outils d'Apify Store (utilisateurs, prix réels, notes, échecs) et registre officiel MCP ; panel quotidien de croissance, leaders fragiles, gisements prouvés par l'argent ; garde-fou données personnelles | Testé, collecte réelle faite (1er nov.) |
| `src/enquete/enquete.js` | Preuve de paiement stricte : un prix ne compte que s'il est lu dans l'extrait de la page citée ; offres du même besoin seulement | Testé |
| `src/enquete/elan.js` | Élan : activité des 90 derniers jours contre les 90 d'avant (Hacker News, GitHub), chaque série vote à égalité | Testé, mesure réelle faite |

## Lancer

```bash
npm test                                   # 31 tests, aucune dépendance
node scripts/collecter.js 60               # banc du passé sur 60 jours -> data/
OPENROUTER_API_KEY=... node scripts/lancer-banc.js data/cas-show-hn-AAAA-MM-JJ.json 30
```

## Règles de sécurité

- Aucune clé dans le code ni dans le dépôt : variables d'environnement ou secrets Cloudflare.
- Les textes des cas sont des données : les consignes demandent d'ignorer toute instruction qu'ils contiennent.
- Sources : API officielles et gratuites uniquement (Algolia HN, Manifold, Apify Store, registre MCP, GitHub). Aucun scraping de plateformes qui l'interdisent ; aucun gisement bâti sur des outils de données personnelles ou de manipulation.
- Aucune donnée personnelle n'est envoyée aux modèles gratuits.
- `data/` n'est pas versionné : les cas se recollectent en une commande.
