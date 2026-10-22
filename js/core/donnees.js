/* Le Lab — chargement du contenu depuis data/ (JSON et Markdown)
   Pour ajouter ou corriger une leçon, il suffit de modifier les fichiers de data/cours/.
   Développé par 25 Labs */
"use strict";

let MODULES = [];   // la liste des modules, dans l'ordre des onglets
const COURS = {};   // le contenu de chaque module, par identifiant (python, sql…)
let DEVOIRS = [];   // les devoirs
let SQL_BASE = "";  // le script qui crée la base de démonstration

async function lireTexte(chemin) {
  const r = await fetch("data/" + chemin, { cache: "no-cache" });
  if (!r.ok) throw new Error(`Fichier introuvable : data/${chemin} (${r.status})`);
  return r.text();
}
const lireJSON = async chemin => JSON.parse(await lireTexte(chemin));

/** Charge tout le contenu du site. Les fichiers sont lus en parallèle. */
async function chargerDonnees() {
  const [index, devoirs, base] = await Promise.all([lireJSON("cours.json"), lireJSON("devoirs.json"), lireTexte("sql/base.sql")]);
  MODULES = index.modules;
  DEVOIRS = devoirs.devoirs;
  SQL_BASE = base;
  await Promise.all(MODULES.map(async m => {
    const cours = await lireJSON(m.fichier);
    // Chaque leçon pointe vers un fichier Markdown : on le lit et on le convertit en HTML.
    await Promise.all(cours.lecons.map(async l => {
      l.theorieHTML = mdEnHTML((await lireTexte(l.theorie)).replace(/^## .*\n+/, ""));
    }));
    COURS[m.id] = { ...m, ...cours };
  }));
}

/** Tous les exercices d'un module, avec le numéro de leur leçon. */
const exercicesDe = id => COURS[id].lecons.flatMap((l, li) => l.exercices.map(x => ({ ...x, li })));

/** Le nom et la couleur d'un module (ou du projet final). */
function infoModule(id) {
  if (id === "projet") return { nom: "Projet final", couleur: "var(--dev)" };
  const m = MODULES.find(m => m.id === id);
  return { nom: m.nom, couleur: `var(${m.couleur})` };
}
