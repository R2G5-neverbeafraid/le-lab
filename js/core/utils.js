/* Le Lab — fonctions utilitaires
   Développé par 25 Labs */
"use strict";

const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const norm=s=>String(s??"").replace(/\r/g,"").split("\n").map(l=>l.trimEnd()).join("\n").trim();
