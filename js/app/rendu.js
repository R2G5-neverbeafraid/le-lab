/* Le Lab — affichage des pages (accueil, leçons, devoirs) et correction des exercices
   Développé par 25 Labs */
"use strict";

const view = $("view");
let route = "accueil";

/* ---------- En-tête et onglets ---------- */

function renderStats() {
  $("stats").innerHTML = `<span class="pill"><span class="lv">NIV ${niveau()}</span>${esc(titreNiveau())}<span class="xpbar"><i style="width:${S.xp % 100}%"></i></span>${S.xp} XP</span>`
    + `<span class="pill" title="Jours d'affilée avec au moins un exercice réussi">Série : ${serie()} j</span>`;
}

function renderTabs() {
  const items = [["accueil", "Accueil", null], ...MODULES.map(m => [m.id, m.nom, `var(${m.couleur})`]), ["devoirs", "Devoirs", "var(--dev)"]];
  $("tabs").innerHTML = items.map(([id, nom, c]) =>
    `<button type="button" data-go="${id}" class="${route === id ? "on" : ""}" style="${c ? `--c:${c}` : ""}">${c ? '<span class="sw"></span>' : ""}${esc(nom)}</button>`).join("");
}

/* ---------- Petits calculs ---------- */

function progression(id) {
  const xs = exercicesDe(id), d = xs.filter(x => S.done[x.id]).length;
  return { d, n: xs.length, p: xs.length ? d / xs.length : 0 };
}
const fmtDate = s => new Date(s + "T18:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
function joursRestants(s) {
  const d = Math.round((new Date(s + "T18:00:00") - new Date()) / 864e5);
  return d < 0 ? "date passée" : d === 0 ? "aujourd'hui" : d === 1 ? "demain" : `dans ${d} jours`;
}
function prochainExercice() {
  for (const m of MODULES) { const x = exercicesDe(m.id).find(x => !S.done[x.id]); if (x) return { id: m.id, x }; }
  return null;
}

/* ---------- Accueil ---------- */

function renderHome() {
  const nx = prochainExercice(), nd = DEVOIRS.find(d => !(S.dv[d.id] && S.dv[d.id].rendu));
  const total = MODULES.reduce((a, m) => a + progression(m.id).n, 0), faits = MODULES.reduce((a, m) => a + progression(m.id).d, 0);
  view.innerHTML = `
  <section class="hero">
    <div class="card">
      <div class="eyebrow">Le Lab · by 25 Labs</div>
      <h1>Bienvenue au Lab. On passe de 3 à 7 sur 10.</h1>
      <p>Cinq langages, plus le machine learning expliqué simplement avec des vidéos animées. Une leçon courte, un exemple, puis des exercices corrigés tout de suite. Python (le vrai Python 3), JavaScript, SQL (le vrai SQLite) et CSS s'exécutent ici même ; PHP se travaille en lecture de code.</p>
      <div class="actions">${nx
        ? `<button class="btn" type="button" data-resume="${nx.id}|${nx.x.li}">Reprendre : ${esc(COURS[nx.id].nom)} · ${esc(nx.x.titre)}</button>`
        : `<button class="btn" type="button" data-go="devoirs">Tout est fait : place aux devoirs</button>`}<button class="btn ghost" type="button" data-go="devoirs">Voir les devoirs</button></div>
    </div>
    <div class="card level">
      <div class="eyebrow">Progression</div>
      <div class="big">${niveau()}</div>
      <div class="t">${esc(titreNiveau())}</div>
      <div class="meter"><i style="width:${S.xp % 100}%"></i></div>
      <div class="muted">${100 - S.xp % 100} XP avant le niveau ${niveau() + 1} · ${faits}/${total} exercices réussis · série de ${serie()} jour(s)</div>
    </div>
  </section>
  <section class="langs">${MODULES.map(m => { const p = progression(m.id); return `<button class="lang" type="button" data-go="${m.id}" style="--c:var(${m.couleur})"><h3>${esc(m.nom)}</h3><span class="muted">${esc(m.accroche)}</span><div class="meter"><i style="width:${p.p * 100}%"></i></div><span class="n">${p.d}/${p.n} exercices</span></button>`; }).join("")}</section>
  <section class="two">
    <div class="card">
      <div class="eyebrow">Prochain devoir</div>
      ${nd ? `<h3 class="h-dv">${esc(nd.titre)}</h3><p class="muted p-dv">${esc(infoModule(nd.module).nom)} · à rendre ${fmtDate(nd.date)} (${joursRestants(nd.date)}).</p><button class="btn small" type="button" data-go="devoirs">Ouvrir la consigne</button>` : `<p>Tous les devoirs sont rendus. Bravo.</p>`}
    </div>
    <div class="card">
      <div class="eyebrow">Ta sauvegarde</div>
      <p class="p-sv">Ta progression est gardée dans ce navigateur. Pour la retrouver sur un autre téléphone ou ordinateur, sauvegarde-la puis importe-la là-bas.</p>
      <div class="actions"><button class="btn small" type="button" id="sv-telecharger">Télécharger</button><button class="btn small ghost" type="button" id="sv-copier">Copier le code</button><button class="btn small ghost" type="button" id="sv-importer">Importer</button></div>
      <div class="sv-panneau" id="sv-panneau" hidden>
        <label for="sv-texte" class="muted">Colle ton code de sauvegarde, ou choisis un fichier .json :</label>
        <textarea id="sv-texte" class="sv-texte" spellcheck="false" autocomplete="off"></textarea>
        <input type="file" id="sv-fichier" accept=".json,application/json">
        <div class="actions"><button class="btn small" type="button" id="sv-valider">Remplacer ma progression</button><button class="btn small ghost" type="button" id="sv-annuler">Annuler</button></div>
      </div>
      <div class="verdict" id="sv-msg"></div>
    </div>
  </section>
  <section class="card how">
    <div class="eyebrow">Comment ça marche</div>
    <p>Chaque exercice réussi rapporte des XP. Afficher la solution ou la correction avant de réussir divise le gain par deux : essaie d'abord, regarde l'indice ensuite. Raccourci : Ctrl + Entrée exécute le code de l'éditeur.</p>
  </section>`;
  brancherSauvegarde();
}

function brancherSauvegarde() {
  const msg = $("sv-msg"), panneau = $("sv-panneau"), texte = $("sv-texte");
  const dire = (ok, t) => { msg.className = "verdict " + (ok ? "ok" : "bad"); msg.textContent = t; };
  $("sv-telecharger").onclick = () => { telechargerSauvegarde(); dire(true, "Fichier de sauvegarde téléchargé."); };
  $("sv-copier").onclick = () => {
    const code = codeSauvegarde();
    panneau.hidden = false; texte.value = code;
    navigator.clipboard.writeText(code).then(() => dire(true, "Code copié. Garde-le dans tes notes ou envoie-le-toi."), () => { texte.select(); dire(true, "Le code est sélectionné ci-dessus : copie-le avec Ctrl + C."); });
  };
  $("sv-importer").onclick = () => { panneau.hidden = false; texte.value = ""; texte.focus(); msg.textContent = ""; msg.className = "verdict"; };
  $("sv-annuler").onclick = () => { panneau.hidden = true; msg.textContent = ""; msg.className = "verdict"; };
  $("sv-fichier").onchange = e => { const f = e.target.files[0]; if (f) f.text().then(t => { texte.value = t; }); };
  $("sv-valider").onclick = () => {
    try { restaurer(lireSauvegarde(texte.value)); renderStats(); renderHome(); toast("Progression restaurée"); }
    catch (e) { dire(false, e.message); }
  };
}

/* ---------- Page d'un module ---------- */

function renderModule(id) {
  const C = COURS[id], li = Math.min(S.lesson[id] || 0, C.lecons.length - 1), les = C.lecons[li];
  const ordre = MODULES.findIndex(m => m.id === id), suivant = MODULES[ordre + 1];
  const ex = les.exemple;
  const executable = ["python", "javascript", "sql"].includes(ex.langage);
  view.innerHTML = `<div class="lview" style="--c:var(${C.couleur})">
   <aside class="side">
     <div class="head"><h2>${esc(C.nom)}</h2><p>${esc(C.accroche)}</p></div>
     ${C.lecons.map((l, i) => { const d = l.exercices.filter(x => S.done[x.id]).length; return `<button type="button" class="lesson-btn ${i === li ? "on" : ""}" data-lesson="${i}"><span class="k">${String(i + 1).padStart(2, "0")}</span>${esc(l.titre)}<span class="st ${d === l.exercices.length ? "full" : ""}">${d}/${l.exercices.length}</span></button>`; }).join("")}
   </aside>
   <div class="main">
     <section class="card theory"><div class="eyebrow">Leçon ${li + 1} sur ${C.lecons.length}</div><h2>${esc(les.titre)}</h2>
       ${les.video ? `<div class="vid" data-vid="${les.video}"></div>` : ""}${les.theorieHTML}
       <div class="example"><div class="eyebrow">Exemple</div><pre class="code">${esc(ex.code)}</pre>
       ${ex.sortie ? `<div class="muted">Résultat affiché :</div><div class="out">${esc(ex.sortie)}</div>` : ""}
       ${executable ? `<div class="row"><button class="btn small ghost" type="button" id="runEx">Exécuter l'exemple</button></div><div id="exOut"></div>` : ""}
       </div>
       ${id === "sql" ? `<details class="schema" id="schema"><summary>Voir les tables de la base</summary><div class="tbls" id="tbls"><p class="muted">Chargement…</p></div></details>` : ""}
     </section>
     ${les.exercices.map(x => exoHTML(id, x)).join("")}
     <div class="actions">${li > 0 ? `<button class="btn ghost" type="button" data-lesson="${li - 1}">← Leçon précédente</button>` : ""}${li < C.lecons.length - 1
       ? `<button class="btn" type="button" data-lesson="${li + 1}">Leçon suivante →</button>`
       : `<button class="btn" type="button" data-go="${suivant ? suivant.id : "devoirs"}">${suivant ? "Module suivant : " + esc(suivant.nom) + " →" : "Passer aux devoirs →"}</button>`}</div>
   </div></div>`;
  brancherLecon(id, les);
  // Sur téléphone, la leçon en cours reste visible dans la rangée des leçons.
  const actif = view.querySelector(".lesson-btn.on");
  if (actif) actif.parentElement.scrollLeft = actif.offsetLeft - 16;
}

/** Exécute du code selon son langage et affiche le résultat dans la zone o. */
async function executer(langage, code, o) {
  if (langage === "sql") {
    o.innerHTML = '<div class="out muted">Exécution…</div>';
    const r = await runSQL(code);
    o.innerHTML = r.err ? `<div class="out err">${esc(r.err)}</div>` : r.tableau ? tableHTML(r.tableau) : `<div class="out">${esc(r.info)}</div>`;
    return r;
  }
  o.innerHTML = '<div class="out muted">Exécution…</div>';
  const r = langage === "python" ? await runPy(code, t => { o.innerHTML = `<div class="out muted">${esc(t)}</div>`; }) : await runJS(code);
  o.innerHTML = `<div class="out ${r.err ? "err" : ""}">${esc((r.out || (r.err ? "" : "(rien n'a été affiché)")) + (r.err ? (r.out ? "\n" : "") + r.err : ""))}</div>`;
  return r;
}

function brancherLecon(id, les) {
  const runEx = $("runEx");
  if (runEx) runEx.onclick = () => executer(les.exemple.langage, les.exemple.code, $("exOut"));
  const schema = $("schema");
  if (schema) schema.addEventListener("toggle", async () => {
    if (!schema.open || schema.dataset.charge) return;
    schema.dataset.charge = "1";
    const morceaux = [];
    for (const t of ["etudiants", "tuteurs", "seances"]) {
      const r = await runSQL(`SELECT * FROM ${t}`);
      morceaux.push(`<div><div class="eyebrow">${t}</div>${r.err ? `<p class="muted">${esc(r.err)}</p>` : tableHTML(r.tableau)}</div>`);
    }
    $("tbls").innerHTML = morceaux.join("");
  });
  const vd = view.querySelector("[data-vid]"); if (vd) mountVideo(vd, vd.dataset.vid);
  les.exercices.forEach(x => brancherExo(id, x));
}

/* ---------- Exercices ---------- */

const langageDe = id => ({ python: "python", "machine-learning": "python", javascript: "javascript", sql: "sql" })[id];

function exoHTML(id, x) {
  const fait = !!S.done[x.id];
  const tete = `<div class="ex-top"><h3>${esc(x.titre)}</h3><span class="tag ${fait ? "ok" : ""}">${fait ? "Réussi" : "+" + x.xp + " XP"}</span></div>${x.consigne ? `<p class="prompt">${mdEnLigne(x.consigne)}</p>` : ""}`;
  const pied = `<div class="verdict" data-v></div><div class="hint" data-h hidden></div>`;
  const aide = `<button class="btn small ghost" type="button" data-hint>Indice</button>`;
  let corps = "";
  if (x.type === "code" || x.type === "sql") {
    corps = `<textarea class="ed" data-ed spellcheck="false" autocapitalize="off" autocomplete="off" id="ed-${x.id}" aria-label="Éditeur de code">${esc(S.drafts[x.id] ?? x.depart)}</textarea>
    <div class="actions"><button class="btn small ghost" type="button" data-run>Exécuter</button><button class="btn small" type="button" data-check>Vérifier</button>${aide}<button class="btn small ghost" type="button" data-sol>Solution</button><span class="kbd">Ctrl + Entrée</span></div>
    <div data-o></div>`;
  } else if (x.type === "css") {
    corps = `<div class="cssgrid"><textarea class="ed" data-ed spellcheck="false" id="ed-${x.id}" aria-label="Éditeur CSS">${esc(S.drafts[x.id] ?? x.depart)}</textarea><div class="preview" data-prev></div></div>
    <div class="actions"><button class="btn small" type="button" data-check>Vérifier</button>${aide}<button class="btn small ghost" type="button" data-sol>Solution</button><span class="kbd">L'aperçu se met à jour pendant que tu tapes</span></div>`;
  } else if (x.type === "fit") {
    corps = `<canvas class="pg" data-cv aria-label="Graphique des courses"></canvas><div class="sliders"><label for="a-${x.id}"><span>Prix par km (a) : <b data-av>200</b> FC</span><input type="range" min="0" max="1000" step="50" value="200" data-a id="a-${x.id}"></label><label for="b-${x.id}"><span>Prix de départ (b) : <b data-bv>2500</b> FC</span><input type="range" min="0" max="3000" step="100" value="2500" data-b id="b-${x.id}"></label></div>`;
  } else if (x.type === "knn") {
    corps = `<canvas class="pg" data-cv aria-label="Graphique des fruits : touche pour placer un fruit mystère"></canvas><div class="info" data-info></div>`;
  } else if (x.type === "qcm") {
    corps = `<div class="opts">${x.options.map((o, i) => `<button type="button" class="opt" data-opt="${i}"><code>${esc(o)}</code></button>`).join("")}</div>
    <div class="actions"><button class="btn small ghost" type="button" data-corr>Voir la correction</button></div>`;
  } else {
    corps = `<pre class="code">${esc(x.code)}</pre><div class="actions"><input class="ans" data-ans id="ans-${x.id}" placeholder="Ta réponse" autocomplete="off" aria-label="Ta réponse"><button class="btn small" type="button" data-check>Vérifier</button>${aide}<button class="btn small ghost" type="button" data-corr>Voir la correction</button></div>`;
  }
  return `<section class="ex ${fait ? "done" : ""}" data-exo="${x.id}">${tete}${corps}${pied}</section>`;
}

function setV(box, ok, msg) {
  const v = box.querySelector("[data-v]");
  v.className = "verdict " + (ok ? "ok" : "bad"); v.textContent = msg;
  if (ok) { box.classList.add("done"); const t = box.querySelector(".tag"); t.className = "tag ok"; t.textContent = "Réussi"; }
}

/** Affiche une aide ; si elle donne la réponse avant la réussite, le gain est divisé par deux. */
function montrerAide(box, x, html, donneLaReponse) {
  if (donneLaReponse && !S.done[x.id]) { S.halved[x.id] = true; save(); }
  const h = box.querySelector("[data-h]");
  h.hidden = false;
  h.innerHTML = html + (donneLaReponse && !S.done[x.id] ? ' <span class="muted">(gain divisé par deux)</span>' : "");
}

function brancherExo(id, x) {
  const box = document.querySelector(`[data-exo="${x.id}"]`); if (!box) return;
  const ed = box.querySelector("[data-ed]"), o = box.querySelector("[data-o]");
  const bIndice = box.querySelector("[data-hint]");
  if (bIndice) bIndice.onclick = () => montrerAide(box, x, "<b>Indice :</b> " + esc(x.indice), false);
  const bSol = box.querySelector("[data-sol]");
  if (bSol) bSol.onclick = () => montrerAide(box, x, `<b>Une solution possible :</b><pre class="code">${esc(x.solution)}</pre>`, true);
  const bCorr = box.querySelector("[data-corr]");
  if (bCorr) bCorr.onclick = () => {
    const rep = x.type === "qcm" ? x.options[x.bonne] : x.reponses[0];
    montrerAide(box, x, `<b>Correction :</b> <code>${esc(rep)}</code><br>${esc(x.explication)}`, true);
  };

  if (ed) {
    let tm;
    ed.addEventListener("input", () => { clearTimeout(tm); tm = setTimeout(() => { S.drafts[x.id] = ed.value; save(); }, 300); if (x.type === "css") apercuCSS(racine, ed.value); });
    ed.addEventListener("keydown", e => {
      if (e.key === "Tab") { e.preventDefault(); const a = ed.selectionStart, b = ed.selectionEnd; ed.setRangeText(langageDe(id) === "python" ? "    " : "  ", a, b, "end"); ed.dispatchEvent(new Event("input")); }
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); (box.querySelector("[data-run]") || box.querySelector("[data-check]")).click(); }
    });
  }

  if (x.type === "code") {
    const lang = langageDe(id), marque = lang === "python" ? 'print("<<<T>>>")' : 'console.log("<<<T>>>");';
    box.querySelector("[data-run]").onclick = () => executer(lang, ed.value, o);
    box.querySelector("[data-check]").onclick = async () => {
      const code = x.tests ? ed.value + "\n" + marque + "\n" + x.tests : ed.value;
      o.innerHTML = '<div class="out muted">Vérification…</div>';
      const r = lang === "python" ? await runPy(code, t => { o.innerHTML = `<div class="out muted">${esc(t)}</div>`; }) : await runJS(code);
      if (r.err) { o.innerHTML = `<div class="out err">${esc(r.err)}</div>`; setV(box, false, "Ton code s'arrête sur une erreur. Lis le message ci-dessus : il indique la ligne."); return; }
      let obtenu = r.out;
      if (x.tests) { const i = obtenu.indexOf("<<<T>>>"); obtenu = i < 0 ? "" : obtenu.slice(i + 7); }
      obtenu = norm(obtenu);
      if (obtenu === norm(x.attendu)) { o.innerHTML = ""; setV(box, true, "Correct ! Tous les tests passent."); gain(x.id, x.xp); }
      else { o.innerHTML = `<div class="out">Attendu :\n${esc(norm(x.attendu))}\n\nObtenu :\n${esc(obtenu || "(rien)")}</div>`; setV(box, false, "Pas encore. Compare ligne par ligne ce qui est attendu et ce que ton code donne."); }
    };
  }

  if (x.type === "sql") {
    box.querySelector("[data-run]").onclick = () => executer("sql", ed.value, o);
    box.querySelector("[data-check]").onclick = async () => {
      const [r, ref] = await Promise.all([runSQL(ed.value), runSQL(x.solution)]);
      if (r.err) { o.innerHTML = `<div class="out err">${esc(r.err)}</div>`; setV(box, false, "La requête contient une erreur. Lis le message ci-dessus."); return; }
      if (!r.tableau) { o.innerHTML = `<div class="out">${esc(r.info)}</div>`; setV(box, false, "Ta requête ne renvoie pas de tableau : il faut un SELECT."); return; }
      o.innerHTML = tableHTML(r.tableau);
      if (memesLignes(r.tableau, ref.tableau, x.ordonne)) { setV(box, true, "Correct ! Le résultat est exactement celui attendu."); gain(x.id, x.xp); }
      else setV(box, false, `Pas encore : ta requête renvoie ${r.tableau.lignes.length} ligne(s) et ${r.tableau.colonnes.length} colonne(s), il en faut ${ref.tableau.lignes.length} et ${ref.tableau.colonnes.length}${x.ordonne ? ", dans le bon ordre" : ""}.`);
    };
  }

  let racine;
  if (x.type === "css") {
    racine = box.querySelector("[data-prev]").attachShadow({ mode: "open" });
    apercuCSS(racine, ed.value);
    box.querySelector("[data-check]").onclick = () => {
      apercuCSS(racine, ed.value);
      const echec = verifierCSS(racine, x.verifications);
      if (!echec) { setV(box, true, "Correct ! Regarde le résultat dans l'aperçu."); gain(x.id, x.xp); } else setV(box, false, echec);
    };
  }

  if (x.type === "fit") bindFit(box, x, setV, gain);
  if (x.type === "knn") bindKnn(box, x, setV, gain);

  if (x.type === "qcm") {
    box.querySelectorAll("[data-opt]").forEach(b => b.onclick = () => {
      const i = +b.dataset.opt;
      if (i === x.bonne) { b.classList.add("right"); setV(box, true, "Exact. " + x.explication); gain(x.id, x.xp); }
      else { b.classList.add("wrong"); setV(box, false, "Non. Relis la question et réessaie."); }
    });
  }

  if (x.type === "predict" || x.type === "fill") {
    const champ = box.querySelector("[data-ans]");
    const verifier = () => {
      const a = champ.value.trim().replace(/\s+/g, " ");
      const ok = x.reponses.some(r => x.type === "fill" ? r.toLowerCase() === a.toLowerCase() : r === a);
      if (ok) { setV(box, true, "Exact !"); gain(x.id, x.xp); }
      else setV(box, false, "Ce n'est pas ça. Exécute le code dans ta tête, ligne par ligne.");
    };
    box.querySelector("[data-check]").onclick = verifier;
    champ.addEventListener("keydown", e => { if (e.key === "Enter") verifier(); });
  }
}

/* ---------- Devoirs ---------- */

function renderDevoirs() {
  view.innerHTML = `<div class="card dv-intro"><div class="eyebrow">Devoirs</div><h2>Six devoirs, un par semaine</h2><p class="muted">Ils se font sur ta machine, dans VS Code, avec Live Server pour le front et XAMPP pour PHP et MySQL. Note les dates limites dans ton agenda. Coche les points au fur et à mesure ; un devoir rendu rapporte 50 XP.</p></div>
  <div class="dv">${DEVOIRS.map(d => {
    const st = S.dv[d.id] || { c: [], rendu: false }, I = infoModule(d.module), dt = new Date(d.date + "T18:00:00");
    return `<article class="dcard ${st.rendu ? "rendu" : ""}" style="--c:${I.couleur}">
      <div class="date"><span class="m" style="color:${I.couleur}">${esc(I.nom)}</span><span class="d">${dt.getDate()}</span><span class="m">${dt.toLocaleDateString("fr-FR", { month: "short" })} · ${dt.toLocaleDateString("fr-FR", { weekday: "short" })}</span><span class="left">${st.rendu ? "Rendu" : joursRestants(d.date)}</span></div>
      <div><h3>${esc(d.titre)}</h3><p>${esc(d.consigne)}</p>
      <ul class="checks">${d.criteres.map((c, i) => `<li><label><input type="checkbox" id="${d.id}-c${i}" data-dv="${d.id}" data-i="${i}" ${st.c.includes(i) ? "checked" : ""}> ${esc(c)}</label></li>`).join("")}</ul>
      <div class="actions"><button class="btn small ${st.rendu ? "ghost" : ""}" type="button" data-rendu="${d.id}">${st.rendu ? "Marquer comme non rendu" : "Marquer comme rendu (+50 XP)"}</button><span class="cal">Échéance : ${fmtDate(d.date)}, 18 h</span></div></div>
    </article>`; }).join("")}</div>`;
  view.querySelectorAll("[data-dv]").forEach(cb => cb.onchange = () => {
    const id = cb.dataset.dv, i = +cb.dataset.i, st = S.dv[id] = S.dv[id] || { c: [], rendu: false };
    st.c = cb.checked ? [...new Set([...st.c, i])] : st.c.filter(v => v !== i); save();
  });
  view.querySelectorAll("[data-rendu]").forEach(b => b.onclick = () => {
    const id = b.dataset.rendu, st = S.dv[id] = S.dv[id] || { c: [], rendu: false };
    st.rendu = !st.rendu;
    if (st.rendu && !S.done["dv-" + id]) gain("dv-" + id, 50);
    save(); renderDevoirs();
  });
}

/* ---------- Navigation ---------- */

function go(r, majAdresse = true) {
  if (!COURS[r] && r !== "devoirs") r = "accueil";
  route = r; renderTabs();
  if (COURS[r]) renderModule(r); else if (r === "devoirs") renderDevoirs(); else renderHome();
  if (majAdresse) { try { history.replaceState(null, "", "#" + route); } catch (e) {} }
  window.scrollTo({ top: 0 });
}

document.addEventListener("click", e => {
  const g = e.target.closest("[data-go]"); if (g) { go(g.dataset.go); return; }
  const rs = e.target.closest("[data-resume]"); if (rs) { const [id, li] = rs.dataset.resume.split("|"); S.lesson[id] = +li; save(); go(id); return; }
  const l = e.target.closest("[data-lesson]"); if (l && COURS[route]) { S.lesson[route] = +l.dataset.lesson; save(); renderModule(route); window.scrollTo({ top: 0 }); }
});
