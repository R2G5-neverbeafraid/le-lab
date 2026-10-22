# Le Lab

**Développé par 25 (TwentyFive) Labs.**

Un site gratuit pour apprendre à coder et comprendre le machine learning en partant des bases. Tout se passe dans le navigateur : une leçon courte, puis des exercices corrigés tout de suite.

## Au programme

| Module | Contenu | Comment on pratique |
|---|---|---|
| Python | variables, conditions, boucles, listes, dictionnaires | le code s'exécute dans la page |
| JavaScript | variables, fonctions, tableaux, objets, DOM | le code s'exécute dans la page |
| CSS | sélecteurs, modèle de boîte, Flexbox, Grid, responsive | éditeur avec aperçu en direct |
| SQL | SELECT, WHERE, ORDER BY, GROUP BY, JOIN | requêtes exécutées sur une vraie petite base |
| PHP | syntaxe, boucles, tableaux, formulaires, PDO | lecture et complétion de code |
| Machine Learning | de A à Z, expliqué simplement, avec 6 vidéos animées | labos interactifs + exercices Python |

En plus : XP, niveaux, série de jours, et 6 devoirs à faire sur sa machine (VS Code, Live Server, XAMPP).

Le fil rouge des exemples : **Peer-Learning**, une plateforme de tutorat entre étudiants.

## Organisation des fichiers

```
index.html                  page d'entrée : structure HTML et chargement des scripts
css/style.css               tous les styles (thème clair et sombre)
js/core/utils.js            petites fonctions partagées
js/core/cours.js            registre des cours et ordre des onglets
js/cours/python.js          leçons et exercices Python
js/cours/javascript.js      leçons et exercices JavaScript
js/cours/css.js             leçons et exercices CSS
js/cours/sql.js             leçons et exercices SQL
js/cours/php.js             leçons et exercices PHP
js/cours/machine-learning.js leçons et exercices Machine Learning
js/cours/devoirs.js         les 6 devoirs et leurs critères
js/moteurs/python.js        exécution de Python (Skulpt)
js/moteurs/javascript.js    exécution de JavaScript
js/moteurs/sql.js           base de démonstration et exécution SQL (AlaSQL)
js/moteurs/css.js           aperçu CSS en direct
js/ml/videos.js             les 6 vidéos animées du module ML
js/ml/labos.js              labos interactifs (régression, plus proches voisins)
js/app/etat.js              progression, XP, niveaux, sauvegarde
js/app/rendu.js             affichage des pages et correction des exercices
js/app/effets.js            notifications et confettis
js/app/main.js              démarrage
```

Pour ajouter une leçon, il suffit de modifier le fichier du langage dans `js/cours/`.

## Lancer le site

Un seul fichier, aucune installation. Ouvre `index.html` dans un navigateur, ou utilise la version en ligne (GitHub Pages). Une connexion internet est nécessaire pour charger les polices et les moteurs Python ([Skulpt](https://skulpt.org)) et SQL ([AlaSQL](https://github.com/AlaSQL/alasql)).

La progression est enregistrée dans le navigateur de chaque visiteur (`localStorage`).

---

© 2026 25 (TwentyFive) Labs, Kinshasa.
