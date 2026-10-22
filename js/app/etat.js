/* Le Lab — progression, XP, niveaux, sauvegarde et restauration
   Développé par 25 Labs */
"use strict";

const CLE_STOCKAGE = "laboRG.v1";   // nom gardé pour ne pas perdre les progressions existantes
const ETAT_VIDE = () => ({ done: {}, xp: 0, halved: {}, drafts: {}, days: [], dv: {}, lesson: {} });
let S = ETAT_VIDE();
try { const brut = localStorage.getItem(CLE_STOCKAGE); if (brut) S = { ...S, ...JSON.parse(brut) }; } catch (e) {}

// Anciennes sauvegardes : les leçons étaient rangées par code court (py, js…).
const ANCIENS_CODES = { py: "python", js: "javascript", ml: "machine-learning" };
for (const [ancien, nouveau] of Object.entries(ANCIENS_CODES)) {
  if (S.lesson[ancien] !== undefined && S.lesson[nouveau] === undefined) { S.lesson[nouveau] = S.lesson[ancien]; delete S.lesson[ancien]; }
}

function save() { try { localStorage.setItem(CLE_STOCKAGE, JSON.stringify(S)); } catch (e) {} }

const TITRES = ["Débutant", "Apprenti", "Bricoleur de code", "Codeur", "Développeur junior", "Développeur", "Développeur confirmé", "Architecte", "Maître du code"];
const niveau = () => Math.floor(S.xp / 100) + 1;
const titreNiveau = () => TITRES[Math.min(niveau() - 1, TITRES.length - 1)];

/** Nombre de jours d'affilée avec au moins un exercice réussi. */
function serie() {
  const jours = new Set(S.days), cle = d => d.toISOString().slice(0, 10);
  const d = new Date(); let n = 0;
  if (!jours.has(cle(d))) d.setDate(d.getDate() - 1);
  while (jours.has(cle(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

/** Donne les XP d'un exercice réussi (moitié si la solution a été affichée avant). */
function gain(id, xp) {
  if (S.done[id]) return;
  const g = S.halved[id] ? Math.ceil(xp / 2) : xp, avant = niveau();
  S.done[id] = true; S.xp += g;
  const aujourdhui = new Date().toISOString().slice(0, 10);
  if (!S.days.includes(aujourdhui)) S.days.push(aujourdhui);
  save(); renderStats();
  toast(niveau() > avant ? `Niveau ${niveau()} : ${titreNiveau()} !` : `+${g} XP`);
  confetti();
}

/* ---------- Sauvegarde et restauration ---------- */

/** Le code de sauvegarde : la progression en JSON, encodée pour se copier-coller facilement. */
function codeSauvegarde() {
  const donnees = { app: "Le Lab", version: 1, date: new Date().toISOString(), progression: S };
  return btoa(unescape(encodeURIComponent(JSON.stringify(donnees))));
}

/** Lit un code de sauvegarde ou un fichier JSON. Renvoie la progression, ou lève une erreur claire. */
function lireSauvegarde(texte) {
  texte = texte.trim();
  let donnees;
  try { donnees = JSON.parse(texte.startsWith("{") ? texte : decodeURIComponent(escape(atob(texte)))); }
  catch (e) { throw new Error("Ce n'est pas une sauvegarde du Lab. Vérifie que tu as copié tout le code."); }
  const p = donnees && donnees.progression;
  if (!p || typeof p.xp !== "number" || typeof p.done !== "object") throw new Error("Cette sauvegarde est incomplète ou abîmée.");
  return p;
}

function telechargerSauvegarde() {
  const donnees = { app: "Le Lab", version: 1, date: new Date().toISOString(), progression: S };
  const blob = new Blob([JSON.stringify(donnees, null, 1)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `le-lab-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

function restaurer(progression) {
  S = { ...ETAT_VIDE(), ...progression };
  save();
}
