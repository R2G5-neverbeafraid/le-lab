/* Le Lab — aperçu CSS en direct et vérification des exercices CSS
   Les vérifications sont décrites dans data/cours/css.json (sélecteur, propriété, valeur attendue).
   Développé par 25 Labs */
"use strict";

const CSS_HTML = `<div class="grille">${[
  ["PK", "Prisca K.", "Python · L3", "Algorithmique et premiers scripts."],
  ["JM", "Joël M.", "CSS · L2", "Flexbox, Grid et responsive."],
  ["NB", "Naomie B.", "SQL · L3", "Requêtes, jointures et modélisation."]
].map(([a, n, m, b]) => `<article class="carte"><div class="rangee"><span class="avatar">${a}</span><div><h3 class="nom">${n}</h3><p class="matiere">${m}</p></div></div><p class="bio">${b}</p></article>`).join("")}</div>`;

const CSS_BASE = `:host{display:block;background:#ffffff;color:#1c2033;font:14px/1.45 system-ui,sans-serif;padding:14px}
.carte{background:#f5f6fb}.avatar{width:40px;height:40px;border-radius:50%;background:#dfe5ff;color:#2a3592;display:inline-grid;place-items:center;font-weight:700;flex:none}
h3{margin:0;font-size:15px;font-weight:400}p{margin:4px 0}.matiere{color:#5a6180;font-size:15px}.bio{font-size:13px;color:#3c4260}`;

/** Affiche le CSS de l'élève sur les cartes tuteurs, dans une zone isolée (shadow DOM). */
function apercuCSS(racine, css) {
  racine.innerHTML = `<style>${CSS_BASE}</style><style>${css}</style>${CSS_HTML}`;
}

/** Applique les vérifications ; renvoie le message de la première qui échoue, ou null si tout est bon. */
function verifierCSS(racine, verifications) {
  for (const v of verifications) {
    const el = racine.querySelector(v.selecteur);
    if (!el) return v.message;
    const valeur = getComputedStyle(el).getPropertyValue(v.propriete).trim();
    let ok = true;
    if (v.egal !== undefined) ok = valeur === v.egal;
    if (v.min !== undefined) ok = parseFloat(valeur) >= v.min;
    if (v.colonnes !== undefined) ok = valeur !== "none" && valeur.split(/\s+/).length === v.colonnes;
    if (!ok) return v.message;
  }
  return null;
}
