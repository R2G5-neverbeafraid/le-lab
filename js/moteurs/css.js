/* Le Lab — aperçu CSS des cartes tuteurs
   Développé par 25 (TwentyFive) Labs */
"use strict";

const CSS_HTML=`<div class="grille">${[["PK","Prisca K.","Python · L3","Algorithmique et premiers scripts."],["JM","Joël M.","CSS · L2","Flexbox, Grid et responsive."],["NB","Naomie B.","SQL · L3","Requêtes, jointures et modélisation."]].map(([a,n,m,b])=>`<article class="carte"><div class="rangee"><span class="avatar">${a}</span><div><h3 class="nom">${n}</h3><p class="matiere">${m}</p></div></div><p class="bio">${b}</p></article>`).join("")}</div>`;
const CSS_BASE=`:host{display:block;background:#ffffff;color:#1c2033;font:14px/1.45 system-ui,sans-serif;padding:14px}
.carte{background:#f5f6fb}.avatar{width:40px;height:40px;border-radius:50%;background:#dfe5ff;color:#2a3592;display:inline-grid;place-items:center;font-weight:700;flex:none}
h3{margin:0;font-size:15px;font-weight:400}p{margin:4px 0}.matiere{color:#5a6180;font-size:15px}.bio{font-size:13px;color:#3c4260}`;
const gcs=el=>getComputedStyle(el);
