## Entraînement, test et pièges

Comment savoir si la machine a vraiment appris ? Exactement comme à l'école : avec un examen qu'elle n'a jamais vu.

On coupe les données en deux. Environ 80 % servent à l'**entraînement** ; les 20 % restants sont cachés et servent au **test** à la fin. Si un prof donnait les sujets de l'examen à l'avance, une bonne note ne prouverait rien.

Trois pièges à connaître :

- **Le surapprentissage** : le modèle apprend les exemples par cœur, jusqu'aux petites erreurs. Parfait à l'entraînement, nul au test.
- **Le sous-apprentissage** : le modèle est trop simple pour saisir la tendance. Mauvais partout.
- **Le biais** : si les exemples ne représentent pas tout le monde, le modèle sera injuste. Un système de reconnaissance de visages entraîné surtout sur des visages à peau claire fonctionne moins bien sur les peaux foncées. Ce problème a été mesuré sur de vrais systèmes commerciaux.
