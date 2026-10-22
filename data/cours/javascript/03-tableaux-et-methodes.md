## Tableaux et méthodes

Un tableau : `const cours = ["HTML", "CSS"]`. `.length` donne la taille, `.push()` ajoute.

Les méthodes à maîtriser, parce qu'elles remplacent la plupart des boucles :

- `.filter(fn)` garde les éléments pour lesquels `fn` renvoie vrai
- `.map(fn)` transforme chaque élément
- `.find(fn)` renvoie le premier qui correspond
- `.join(", ")` colle tout en un texte

On les enchaîne : `tuteurs.filter(...).map(...)`.
