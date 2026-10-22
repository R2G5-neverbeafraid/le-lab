/* Le Lab — exécution de SQL avec sql.js (le vrai moteur SQLite, compilé pour le navigateur)
   La base de démonstration est décrite dans data/sql/base.sql.
   Développé par 25 Labs */
"use strict";

const SQLJS_URL = "https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/";
let moteurSQL = null;

async function chargerSQL() {
  if (!moteurSQL) {
    moteurSQL = chargerScript(SQLJS_URL + "sql-wasm.js")
      .then(() => initSqlJs({ locateFile: f => SQLJS_URL + f }))
      .catch(e => { moteurSQL = null; throw e; });
  }
  return moteurSQL;
}

/**
 * Exécute une ou plusieurs requêtes sur une base neuve.
 * Renvoie { tableau: {colonnes, lignes} } pour un SELECT, { info } sinon, ou { err }.
 */
async function runSQL(requete) {
  let SQL;
  try { SQL = await chargerSQL(); }
  catch (e) { return { err: "Le moteur SQL n'a pas pu se charger. Vérifie ta connexion internet, puis réessaie." }; }
  if (!requete.trim()) return { err: "Écris une requête." };
  const db = new SQL.Database();
  try {
    db.exec(SQL_BASE);
    const resultats = db.exec(requete);
    const modifiees = db.getRowsModified();
    if (!resultats.length) return { info: `Requête exécutée. Lignes modifiées : ${modifiees}.` };
    const dernier = resultats[resultats.length - 1];   // on affiche le dernier SELECT
    return { tableau: { colonnes: dernier.columns, lignes: dernier.values } };
  } catch (e) {
    return { err: String(e.message || e) };
  } finally {
    db.close();
  }
}

function tableHTML(t) {
  if (!t || !t.lignes.length) return '<p class="muted">Aucune ligne.</p>';
  return `<div class="tablewrap"><table class="res"><thead><tr>${t.colonnes.map(c => `<th>${esc(c)}</th>`).join("")}</tr></thead>`
    + `<tbody>${t.lignes.map(l => `<tr>${l.map(v => `<td>${esc(v ?? "NULL")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

/** Compare deux résultats : mêmes valeurs, même nombre de colonnes ; l'ordre compte seulement si demandé. */
function memesLignes(a, b, ordonne) {
  if (!a || !b || a.lignes.length !== b.lignes.length || a.colonnes.length !== b.colonnes.length) return false;
  const cle = l => JSON.stringify(l.map(v => typeof v === "number" ? Math.round(v * 100) / 100 : v));
  const A = a.lignes.map(cle), B = b.lignes.map(cle);
  if (!ordonne) { A.sort(); B.sort(); }
  return A.every((x, i) => x === B[i]);
}
