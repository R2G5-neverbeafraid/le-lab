/* Le Lab — démarrage : charge le contenu de data/, puis affiche la page demandée
   Développé par 25 Labs */
"use strict";

(async () => {
  view.innerHTML = '<p class="chargement">Chargement des leçons…</p>';
  try {
    await chargerDonnees();
  } catch (e) {
    view.innerHTML = `<div class="card"><h2>Les leçons n'ont pas pu se charger</h2><p class="muted">${esc(e.message)}</p>`
      + `<p>Si tu as ouvert <code>index.html</code> en double-cliquant dessus, lance plutôt le site avec l'extension Live Server de VS Code, ou ouvre la version en ligne.</p></div>`;
    return;
  }
  renderStats();
  go((location.hash || "").slice(1) || "accueil", false);
})();
