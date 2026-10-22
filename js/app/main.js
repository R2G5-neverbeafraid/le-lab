/* Le Lab — démarrage
   Développé par 25 Labs */
"use strict";

renderStats();
const h=(location.hash||"").slice(1);
go(["accueil","devoirs",...Object.values(HASH)].includes(h)?h:"accueil",false);
