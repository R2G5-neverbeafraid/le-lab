## Dictionnaires

Un **dictionnaire** associe des clés à des valeurs : `{"Python": "Prisca", "CSS": "Joël"}`. On lit avec `d["Python"]`, mais si la clé n'existe pas, c'est une erreur. `d.get(cle, defaut)` renvoie une valeur par défaut à la place.

`cle in d` teste si une clé existe. `for cle, valeur in d.items():` parcourt les paires. Une liste de dictionnaires, c'est la forme typique des données d'un site web : un fichier `data.js`, une réponse d'API…
