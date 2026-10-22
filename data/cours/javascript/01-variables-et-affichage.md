## Variables et affichage

En JavaScript moderne, on déclare avec `const` (valeur qui ne sera pas réassignée) ou `let` (valeur qui change). Oublie `var`.

Les **template literals** utilisent des accents graves ``…`` et `${variable}`, comme les f-strings de Python. `console.log()` affiche dans la console.

Piège classique : `+` colle du texte si l'un des deux est une chaîne, alors que `*`, `-`, `/` convertissent en nombre.
