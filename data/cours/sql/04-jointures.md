## Jointures

La table `seances` ne contient pas de noms, seulement `etudiant_id` et `tuteur_id`. Ce sont des **clés étrangères** : elles pointent vers l'`id` d'une autre table.

`JOIN … ON …` recolle les tables. On donne des alias courts pour s'y retrouver :

```
SELECT e.nom, s.duree
FROM seances s
JOIN etudiants e ON e.id = s.etudiant_id
```

C'est le cœur de toute plateforme qui met en relation des étudiants et des tuteurs.
