## Le modèle de boîte

Chaque élément est une boîte, de l'intérieur vers l'extérieur : **contenu** → `padding` (marge intérieure) → `border` → `margin` (marge extérieure).

`border: 2px solid #ccc` résume épaisseur, style et couleur. `border-radius` arrondit les coins.

Ajoute toujours `* { box-sizing: border-box; }` à tes projets : la largeur inclut alors le padding et la bordure, ce qui évite les débordements.
