## Sélecteurs et texte

Une règle CSS = un **sélecteur** + des **déclarations** : `.nom { color: navy; }`.

- `p` cible toutes les balises p
- `.carte` cible la classe carte
- `#titre` cible l'id titre
- `.carte .nom` cible un .nom **dans** une .carte

Si deux règles se contredisent, la plus **spécifique** gagne (id > classe > balise), sinon la dernière écrite.

Propriétés de texte utiles : `color`, `font-size`, `font-weight` (400 normal, 700 gras), `text-transform`, `line-height`.
