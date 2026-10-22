/* Le Lab — exécution de JavaScript dans un Web Worker
   Le code de l'élève tourne à part : une boucle infinie ne bloque pas la page.
   Développé par 25 Labs */
"use strict";

const JS_LIMITE_MS = 5000;

const JS_WORKER = `
const formater = v => typeof v === "string" ? v : (() => { try { return JSON.stringify(v); } catch (e) { return String(v); } })();
self.onmessage = e => {
  const lignes = [];
  const ecrire = (...a) => lignes.push(a.map(formater).join(" "));
  const console = { log: ecrire, error: ecrire, warn: ecrire, info: ecrire };
  try {
    new Function("console", e.data)(console);
    self.postMessage({ sortie: lignes.join("\\n"), erreur: null });
  } catch (err) {
    self.postMessage({ sortie: lignes.join("\\n"), erreur: err.name + " : " + err.message });
  }
};`;

/** Exécute du code JavaScript. Renvoie { out, err }. */
function runJS(code) {
  return new Promise(resolve => {
    let w;
    try { w = new Worker(URL.createObjectURL(new Blob([JS_WORKER], { type: "text/javascript" }))); }
    catch (e) { resolve(runJSDirect(code)); return; }
    const minuteur = setTimeout(() => {
      w.terminate();
      resolve({ out: "", err: `Ton programme tourne depuis plus de ${JS_LIMITE_MS / 1000} secondes : il y a sans doute une boucle infinie. Il a été arrêté.` });
    }, JS_LIMITE_MS);
    w.onmessage = e => { clearTimeout(minuteur); w.terminate(); resolve({ out: e.data.sortie, err: e.data.erreur }); };
    w.onerror = e => { clearTimeout(minuteur); w.terminate(); e.preventDefault(); resolve({ out: "", err: "SyntaxError : " + (e.message || "erreur de syntaxe") }); };
    w.postMessage(code);
  });
}

/** Solution de secours si les workers sont interdits : exécution directe (sans protection contre les boucles infinies). */
function runJSDirect(code) {
  const lignes = [];
  const f = v => typeof v === "string" ? v : (() => { try { return JSON.stringify(v); } catch (e) { return String(v); } })();
  const c = { log: (...a) => lignes.push(a.map(f).join(" ")) };
  c.error = c.warn = c.info = c.log;
  try { new Function("console", code)(c); return { out: lignes.join("\n"), err: null }; }
  catch (e) { return { out: lignes.join("\n"), err: e.name + " : " + e.message }; }
}
