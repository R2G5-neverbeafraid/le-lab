# Le Lab

**Développé par 25 Labs.**

Un site gratuit pour apprendre à coder et comprendre le machine learning en partant des bases. Tout se passe dans le navigateur : une leçon courte, un exemple, puis des exercices corrigés tout de suite.

## Au programme

| Module | Contenu | Comment on pratique |
|---|---|---|
| Python | variables, conditions, boucles, listes, dictionnaires | vrai Python 3 dans la page ([Pyodide](https://pyodide.org)) |
| JavaScript | variables, fonctions, tableaux, objets, DOM | exécution dans la page |
| CSS | sélecteurs, modèle de boîte, Flexbox, Grid, responsive | éditeur avec aperçu en direct |
| SQL | SELECT, WHERE, ORDER BY, GROUP BY, JOIN | vrai SQLite dans la page ([sql.js](https://sql.js.org)) |
| PHP | syntaxe, boucles, tableaux, formulaires, PDO | lecture et complétion de code |
| Machine Learning | de A à Z, expliqué simplement, 6 vidéos animées avec voix off et musique | labos interactifs, exercices Python, un vrai modèle scikit-learn |

En plus : XP, niveaux, série de jours, sauvegarde et restauration de la progression, et 6 devoirs à faire sur sa machine (VS Code, Live Server, XAMPP).

Le fil rouge des exemples : **Peer-Learning**, une plateforme de tutorat entre étudiants.

## Organisation des fichiers

```
index.html                     structure de la page et chargement des scripts
css/style.css                  tous les styles (thème clair et sombre, téléphone)
assets/                        favicon et icônes

data/                          LE CONTENU (à modifier pour ajouter des leçons)
  cours.json                   la liste des modules, dans l'ordre des onglets
  cours/<module>.json          les leçons d'un module : exemple et exercices
  cours/<module>/NN-titre.md   le texte de chaque leçon, en Markdown
  devoirs.json                 les devoirs, leurs dates et leurs critères
  sql/base.sql                 la base de démonstration (étudiants, tuteurs, séances)

js/core/utils.js               petites fonctions partagées
js/core/markdown.js            conversion du Markdown des leçons en HTML
js/core/donnees.js             chargement de data/
js/moteurs/python.js           Python avec Pyodide, dans un Web Worker
js/moteurs/javascript.js       JavaScript dans un Web Worker
js/moteurs/sql.js              SQLite avec sql.js
js/moteurs/css.js              aperçu CSS et vérification des exercices
js/ml/videos.js                images et sous-titres des vidéos ML
js/ml/son.js                   musique et voix off des vidéos ML
js/ml/labos.js                 labos interactifs (régression, plus proches voisins)
js/app/etat.js                 progression, XP, niveaux, sauvegarde
js/app/rendu.js                affichage des pages et correction des exercices
js/app/effets.js               notifications et confettis
js/app/main.js                 démarrage
```

### Ajouter une leçon

1. Écris le texte dans un nouveau fichier `data/cours/<module>/NN-titre.md`.
2. Ajoute la leçon dans `data/cours/<module>.json` : son titre, le chemin du fichier Markdown, un exemple et ses exercices. Copie une leçon existante pour avoir le bon format.

Types d'exercices : `code` (comparé à `attendu`, avec des `tests` facultatifs), `sql` (comparé au résultat de la `solution`), `css` (des `verifications` sur l'aperçu), `qcm`, `predict` (deviner l'affichage), `fill` (compléter le code).

## Lancer le site

Le site lit ses leçons dans `data/` : il faut donc l'ouvrir avec un serveur, pas en double-cliquant sur `index.html`.

- En ligne : la version GitHub Pages du dépôt.
- Sur ton ordinateur : ouvre le dossier dans VS Code et clique sur **Go Live** (extension Live Server).

Une connexion internet est nécessaire la première fois pour charger les polices, Python et SQLite. Le code des exercices s'exécute dans un Web Worker : une boucle infinie est arrêtée au bout de quelques secondes sans bloquer la page.

La progression est enregistrée dans le navigateur de chaque visiteur (`localStorage`). Le bouton « Télécharger » de l'accueil la sauvegarde dans un fichier, à réimporter sur un autre appareil.

---

© 2026 25 Labs, Kinshasa.
