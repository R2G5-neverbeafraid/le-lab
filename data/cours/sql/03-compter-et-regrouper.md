## Compter et regrouper

Les **fonctions d'agrégat** résument plusieurs lignes en une valeur : `COUNT(*)`, `SUM()`, `AVG()`, `MIN()`, `MAX()`.

`GROUP BY` fait un résumé **par groupe**. On renomme une colonne calculée avec `AS` :

```
SELECT promo, COUNT(*) AS nb FROM etudiants GROUP BY promo
```
