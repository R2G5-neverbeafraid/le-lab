## Objets et DOM

Un **objet** regroupe des propriétés : `const q = { texte: "…", bonne: "b" }`. On lit `q.texte`.

Le **DOM**, c'est la page HTML vue par JavaScript. Les quatre gestes de base :

- `document.querySelector("#score")` trouve un élément
- `el.textContent = "…"` change son texte
- `el.classList.add("actif")` change son style via une classe
- `el.addEventListener("click", fn)` réagit à un clic

C'est la bonne pratique : on évite les attributs `onclick` dans le HTML et on branche les événements en JavaScript.
