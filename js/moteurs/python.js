/* Le Lab — exécution de Python avec Pyodide (le vrai Python 3, compilé pour le navigateur)
   Pyodide tourne dans un Web Worker : la page reste fluide et on peut arrêter
   un programme qui ne finit jamais (boucle infinie).
   Développé par 25 Labs */
"use strict";

const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";
const PY_LIMITE_MS = 10000;   // durée maximale d'exécution (hors chargement)

// Code du worker : charge Pyodide, installe les bibliothèques importées (numpy, scikit-learn…), exécute.
const PY_WORKER = `
importScripts("${PYODIDE_URL}pyodide.js");
const pret = loadPyodide({ indexURL: "${PYODIDE_URL}" });
self.onmessage = async (e) => {
  const { id, code } = e.data;
  let sortie = "";
  try {
    const py = await pret;
    self.postMessage({ id, etape: "paquets" });
    await py.loadPackagesFromImports(code);
    py.setStdout({ batched: t => { sortie += t + "\\n"; } });
    py.setStderr({ batched: t => { sortie += t + "\\n"; } });
    py.setStdin({ stdin: () => { throw new Error("input() ne fonctionne pas dans le Lab : donne les valeurs directement dans ton code."); } });
    self.postMessage({ id, etape: "execution" });
    // Chaque exécution part d'un espace de noms vide.
    await py.runPythonAsync(code, { globals: py.toPy({}) });
    self.postMessage({ id, sortie, erreur: null });
  } catch (err) {
    self.postMessage({ id, sortie, erreur: String(err.message || err) });
  }
};`;

let pyWorker = null, pyCompteur = 0, pyPret = false;

function nouveauWorkerPython() {
  const url = URL.createObjectURL(new Blob([PY_WORKER], { type: "text/javascript" }));
  pyWorker = new Worker(url);
  pyPret = false;
}

/** Ne garde que la partie utile d'une erreur Python (la dernière ligne et la ligne du code). */
function erreurPythonLisible(texte) {
  const lignes = texte.trim().split("\n");
  const ligneCode = [...lignes].reverse().find(l => /File "<exec>", line \d+/.test(l));
  const numero = ligneCode ? ligneCode.match(/line (\d+)/)[1] : null;
  const derniere = lignes[lignes.length - 1];
  return (numero ? `Ligne ${numero} : ` : "") + derniere;
}

/**
 * Exécute du code Python. Renvoie { out, err }.
 * onEtat(texte) reçoit des messages d'attente (« Chargement de Python… »).
 */
function runPy(code, onEtat = () => {}) {
  return new Promise(resolve => {
    try { if (!pyWorker) nouveauWorkerPython(); }
    catch (e) { resolve({ out: "", err: "Ce navigateur ne peut pas lancer Python ici. Ouvre le site en ligne (GitHub Pages)." }); return; }
    const id = ++pyCompteur;
    let minuteur = null;
    const attenteChargement = setTimeout(() => {
      resolve({ out: "", err: "Python n'a pas pu se charger. Vérifie ta connexion internet, puis réessaie." });
      pyWorker.terminate(); pyWorker = null;
    }, 90000);
    if (!pyPret) onEtat("Chargement de Python… (la première fois, quelques secondes)");
    pyWorker.onerror = () => {
      clearTimeout(attenteChargement); clearTimeout(minuteur);
      pyWorker = null;
      resolve({ out: "", err: "Python n'a pas pu se charger ici. Vérifie ta connexion, ou ouvre le site en ligne (GitHub Pages)." });
    };
    pyWorker.onmessage = e => {
      const m = e.data;
      if (m.id !== id) return;
      if (m.etape === "paquets") {
        pyPret = true;
        if (/\b(import|from)\s+(sklearn|numpy|pandas)/.test(code)) onEtat("Chargement des bibliothèques (numpy, scikit-learn)… la première fois, ça peut prendre 20 secondes.");
        return;
      }
      if (m.etape === "execution") {
        clearTimeout(attenteChargement);
        onEtat("Exécution…");
        minuteur = setTimeout(() => {
          pyWorker.terminate(); pyWorker = null;
          resolve({ out: "", err: `Ton programme tourne depuis plus de ${PY_LIMITE_MS / 1000} secondes : il y a sans doute une boucle infinie. Il a été arrêté.` });
        }, PY_LIMITE_MS);
        return;
      }
      clearTimeout(minuteur); clearTimeout(attenteChargement);
      resolve({ out: m.sortie, err: m.erreur ? erreurPythonLisible(m.erreur) : null });
    };
    pyWorker.postMessage({ id, code });
  });
}
