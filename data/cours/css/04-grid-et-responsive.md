## Grid et responsive

CSS Grid gère **deux dimensions** à la fois. `grid-template-columns: repeat(3, 1fr)` crée 3 colonnes égales (`fr` = une part de l'espace libre).

Une **media query** applique des règles seulement sous une condition, souvent la largeur de l'écran :

```
@media (max-width: 600px) {
  .grille { grid-template-columns: 1fr; }
}
```

Méthode conseillée : écris d'abord la version mobile, puis élargis.
