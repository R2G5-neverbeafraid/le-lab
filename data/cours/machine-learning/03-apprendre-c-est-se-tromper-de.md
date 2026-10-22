## Apprendre, c'est se tromper de moins en moins

Prenons un exemple concret : deviner le **prix d'une course en taxi-moto** selon la distance. On a noté plusieurs courses : 1 km, 2 km, 3 km… et leur prix.

La machine cherche une droite qui passe au plus près des points : `prix = a × distance + b`. Ici, `a` est le prix de chaque kilomètre et `b` le prix de départ.

Au début, elle choisit `a` et `b` un peu au hasard, et elle se trompe beaucoup. Elle calcule son **erreur moyenne** : en moyenne, de combien ses prédictions sont loin des vrais prix. Puis elle bouge un tout petit peu `a` et `b` dans le sens qui fait baisser l'erreur, et elle recommence, des milliers de fois.

Cette méthode s'appelle la **descente de gradient**. Imagine que tu descends une colline dans le brouillard : tu ne vois pas le bas, mais tu sens la pente sous tes pieds et tu fais un pas vers le bas, encore et encore. Prédire un nombre (un prix, une température, une note) s'appelle une **régression**.
