/* Le Lab — fonctions utilitaires partagées
   Développé par 25 Labs */
"use strict";

/** Échappe un texte pour l'insérer sans danger dans du HTML. */
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Normalise une sortie de programme : sans \r, sans espaces en fin de ligne, sans lignes vides autour. */
const norm = s => String(s ?? "").replace(/\r/g, "").split("\n").map(l => l.trimEnd()).join("\n").trim();

/** Raccourci pour document.getElementById. */
const $ = id => document.getElementById(id);

/** Charge un script externe une seule fois (Pyodide, sql.js…) et renvoie une promesse. */
const scriptsCharges = {};
function chargerScript(url) {
  if (!scriptsCharges[url]) {
    scriptsCharges[url] = new Promise((ok, ko) => {
      const s = document.createElement("script");
      s.src = url;
      s.onload = ok;
      s.onerror = () => { delete scriptsCharges[url]; ko(new Error("Impossible de charger " + url)); };
      document.head.appendChild(s);
    });
  }
  return scriptsCharges[url];
}
