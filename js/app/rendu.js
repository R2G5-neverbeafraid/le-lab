/* Le Lab — affichage des pages, leçons et exercices
   Développé par 25 Labs */
"use strict";

const $=id=>document.getElementById(id);
const view=$("view");
let route="accueil";
function renderStats(){
  const lv=level(),into=S.xp%100;
  $("stats").innerHTML=`<span class="pill"><span class="lv">NIV ${lv}</span>${esc(TITLES[Math.min(lv-1,TITLES.length-1)])}<span class="xpbar"><i style="width:${into}%"></i></span>${S.xp} XP</span><span class="pill" title="Jours d'affilée avec au moins un exercice réussi">Série : ${streak()} j</span>`;
}
function renderTabs(){
  const items=[["accueil","Accueil",null],...ORDER.map(k=>[HASH[k],L[k].name,L[k].color]),["devoirs","Devoirs","var(--dev)"]];
  $("tabs").innerHTML=items.map(([id,n,c])=>`<button type="button" data-go="${id}" class="${route===id?"on":""}" style="${c?`--c:${c}`:""}">${c?'<span class="sw"></span>':""}${n}</button>`).join("");
}
function progress(lang){const xs=allExos(lang);const d=xs.filter(x=>S.done[x.id]).length;return{d,n:xs.length,p:xs.length?d/xs.length:0};}
const fmtDate=s=>new Date(s+"T18:00:00").toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"});
function daysLeft(s){const d=Math.round((new Date(s+"T18:00:00")-new Date())/864e5);return d<0?"date passée":d===0?"aujourd'hui":d===1?"demain":`dans ${d} jours`;}
function nextExo(){for(const k of ORDER){const x=allExos(k).find(x=>!S.done[x.id]);if(x)return{k,x};}return null;}

function renderHome(){
  const lv=level(),nx=nextExo(),nd=DEVOIRS.find(d=>!(S.dv[d.id]&&S.dv[d.id].rendu));
  const total=ORDER.reduce((a,k)=>a+progress(k).n,0),done=ORDER.reduce((a,k)=>a+progress(k).d,0);
  view.innerHTML=`
  <section class="hero">
    <div class="card">
      <div class="eyebrow">Le Lab · by 25 Labs</div>
      <h1>Bienvenue au Lab. On passe de 3 à 7 sur 10.</h1>
      <p>Cinq langages, plus le machine learning expliqué simplement avec des vidéos animées. Une leçon courte, puis des exercices corrigés tout de suite. Les exemples suivent un fil rouge : Peer-Learning, une plateforme de tutorat entre étudiants. Python, JavaScript, SQL et CSS s'exécutent ici même ; PHP se travaille en lecture de code, puis sur ta machine.</p>
      <div class="actions">${nx?`<button class="btn" type="button" data-resume="${nx.k}|${nx.x.li}">Reprendre : ${esc(L[nx.k].name)} · ${esc(nx.x.title)}</button>`:`<button class="btn" type="button" data-go="devoirs">Tout est fait : place aux devoirs</button>`}<button class="btn ghost" type="button" data-go="devoirs">Voir les devoirs</button></div>
    </div>
    <div class="card level">
      <div class="eyebrow">Progression</div>
      <div class="big">${lv}</div>
      <div class="t">${esc(TITLES[Math.min(lv-1,TITLES.length-1)])}</div>
      <div class="meter"><i style="width:${S.xp%100}%"></i></div>
      <div class="muted">${100-S.xp%100} XP avant le niveau ${lv+1} · ${done}/${total} exercices réussis · série de ${streak()} jour(s)</div>
    </div>
  </section>
  <section class="langs">${ORDER.map(k=>{const p=progress(k);return`<button class="lang" type="button" data-go="${HASH[k]}" style="--c:${L[k].color}"><h3>${L[k].name}</h3><span class="muted">${L[k].tag}</span><div class="meter"><i style="width:${p.p*100}%"></i></div><span class="n">${p.d}/${p.n} exercices</span></button>`;}).join("")}</section>
  <section class="two">
    <div class="card">
      <div class="eyebrow">Prochain devoir</div>
      ${nd?`<h3 style="font-size:19px;margin-bottom:6px">${esc(nd.titre)}</h3><p class="muted" style="margin:0 0 12px">${esc(LANGINFO[nd.lang].name)} · à rendre ${fmtDate(nd.date)} (${daysLeft(nd.date)}).</p><button class="btn small" type="button" data-go="devoirs">Ouvrir la consigne</button>`:`<p>Tous les devoirs sont rendus. Bravo.</p>`}
    </div>
    <div class="card">
      <div class="eyebrow">Comment ça marche</div>
      <p style="margin:0 0 8px">Chaque exercice réussi rapporte des XP. Afficher la solution avant de réussir divise le gain par deux : essaie d'abord, regarde l'indice ensuite.</p>
      <p class="muted" style="margin:0">Raccourci : Ctrl + Entrée exécute le code de l'éditeur. Ta progression reste enregistrée dans ce navigateur.</p>
    </div>
  </section>`;
}

function renderLang(lang){
  const C=L[lang],li=Math.min(S.lesson[lang]||0,C.lessons.length-1),les=C.lessons[li];
  view.innerHTML=`<div class="lview" style="--c:${C.color}">
   <aside class="side">
     <div class="head"><h2>${C.name}</h2><p>${C.tag}</p></div>
     ${C.lessons.map((l,i)=>{const d=l.exos.filter(x=>S.done[x.id]).length;return`<button type="button" class="lesson-btn ${i===li?"on":""}" data-lesson="${i}"><span class="k">${String(i+1).padStart(2,"0")}</span>${esc(l.t)}<span class="st ${d===l.exos.length?"full":""}">${d}/${l.exos.length}</span></button>`;}).join("")}
   </aside>
   <div class="main">
     <section class="card theory"><div class="eyebrow">Leçon ${li+1} sur ${C.lessons.length}</div><h2>${esc(les.t)}</h2>${les.video?`<div class="vid" data-vid="${les.video}"></div>`:""}${les.th}
       ${les.ex?`<div class="example"><div class="eyebrow" style="margin:6px 0 0">Exemple</div><pre class="code">${esc(les.ex)}</pre>
       ${lang==="php"?`<div class="muted">Résultat affiché :</div><div class="out">${esc(les.out)}</div>`:lang==="css"?"":`<div class="row"><button class="btn small ghost" type="button" id="runEx">Exécuter l'exemple</button></div><div id="exOut"></div>`}
       </div>`:""}
       ${lang==="sql"?schemaHTML():""}
     </section>
     ${les.exos.map(x=>exoHTML(lang,x)).join("")}
     <div class="actions">${li>0?`<button class="btn ghost" type="button" data-lesson="${li-1}">← Leçon précédente</button>`:""}${li<C.lessons.length-1?`<button class="btn" type="button" data-lesson="${li+1}">Leçon suivante →</button>`:`<button class="btn" type="button" data-go="${HASH[ORDER[ORDER.indexOf(lang)+1]]||"devoirs"}">${ORDER[ORDER.indexOf(lang)+1]?"Langage suivant : "+L[ORDER[ORDER.indexOf(lang)+1]].name+" →":"Passer aux devoirs →"}</button>`}</div>
   </div></div>`;
  bindLesson(lang,les);
}
function schemaHTML(){
  const t=[["etudiants","SELECT * FROM etudiants"],["tuteurs","SELECT * FROM tuteurs"],["seances","SELECT * FROM seances"]];
  return`<details class="schema" style="margin-top:14px"><summary>Voir les tables de la base</summary><div class="tbls">${t.map(([n,q])=>`<div><div class="eyebrow" style="margin:0 0 4px">${n}</div>${tableHTML(runSQL(q).rows)}</div>`).join("")}</div></details>`;
}
function exoHTML(lang,x){
  const done=!!S.done[x.id];
  const head=`<div class="ex-top"><h3>${esc(x.title)}</h3><span class="tag ${done?"ok":""}">${done?"Réussi":"+"+x.xp+" XP"}</span></div><p class="prompt">${x.p}</p>`;
  const tail=`<div class="verdict" data-v></div><div class="hint" data-h hidden></div>`;
  let body="";
  if(x.type==="code"||x.type==="sql"){
    body=`<textarea class="ed" data-ed spellcheck="false" autocapitalize="off" autocomplete="off" id="ed-${x.id}" aria-label="Éditeur">${esc(S.drafts[x.id]??x.start)}</textarea>
    <div class="actions"><button class="btn small ghost" type="button" data-run>Exécuter</button><button class="btn small" type="button" data-check>Vérifier</button><button class="btn small ghost" type="button" data-hint>Indice</button><button class="btn small ghost" type="button" data-sol>Solution</button><span class="kbd">Ctrl + Entrée</span></div>
    <div data-o></div>`;
  }else if(x.type==="css"){
    body=`<div class="cssgrid"><textarea class="ed" data-ed spellcheck="false" id="ed-${x.id}" aria-label="Éditeur CSS">${esc(S.drafts[x.id]??x.start)}</textarea><div class="preview" data-prev></div></div>
    <div class="actions"><button class="btn small" type="button" data-check>Vérifier</button><button class="btn small ghost" type="button" data-hint>Indice</button><button class="btn small ghost" type="button" data-sol>Solution</button><span class="kbd">L'aperçu se met à jour pendant que tu tapes</span></div>`;
  }else if(x.type==="fit"){
    body=`<canvas class="pg" data-cv aria-label="Graphique des courses"></canvas><div class="sliders"><label for="a-${x.id}">Prix par km (a) : <b data-av>200</b> FC<input type="range" min="0" max="1000" step="50" value="200" data-a id="a-${x.id}"></label><label for="b-${x.id}">Prix de départ (b) : <b data-bv>2500</b> FC<input type="range" min="0" max="3000" step="100" value="2500" data-b id="b-${x.id}"></label></div>`;
  }else if(x.type==="knn"){
    body=`<canvas class="pg" data-cv aria-label="Graphique des fruits, touche pour placer un fruit mystère"></canvas><div class="info" data-info></div>`;
  }else if(x.type==="qcm"){
    body=`<div class="opts">${x.opts.map((o,i)=>`<button type="button" class="opt" data-opt="${i}"><code>${esc(o)}</code></button>`).join("")}</div>`;
  }else{
    body=`<pre class="code">${esc(x.code)}</pre><div class="actions"><input class="ans" data-ans id="ans-${x.id}" placeholder="Ta réponse" autocomplete="off" aria-label="Ta réponse"><button class="btn small" type="button" data-check>Vérifier</button><button class="btn small ghost" type="button" data-hint>Indice</button></div>`;
  }
  return`<section class="ex ${done?"done":""}" data-exo="${x.id}">${head}${body}${tail}</section>`;
}

function bindLesson(lang,les){
  const runEx=$("runEx");
  if(runEx)runEx.onclick=async()=>{
    const o=$("exOut");
    if(lang==="sql"){const r=runSQL(les.ex);o.innerHTML=r.err?`<div class="out err">${esc(r.err)}</div>`:tableHTML(r.rows);return;}
    const r=lang==="py"?await runPy(les.ex):await runJS(les.ex);
    o.innerHTML=`<div class="out ${r.err?"err":""}">${esc((r.out||"")+(r.err?"\n"+r.err:""))}</div>`;
  };
  const vd=view.querySelector("[data-vid]");if(vd)mountVideo(vd,vd.dataset.vid);
  les.exos.forEach(x=>bindExo(lang,x));
}
function setV(box,ok,msg){const v=box.querySelector("[data-v]");v.className="verdict "+(ok?"ok":"bad");v.textContent=msg;if(ok){box.classList.add("done");const t=box.querySelector(".tag");t.className="tag ok";t.textContent="Réussi";}}
function bindExo(lang,x){
  const box=document.querySelector(`[data-exo="${x.id}"]`);if(!box)return;
  const ed=box.querySelector("[data-ed]"),o=box.querySelector("[data-o]"),hint=box.querySelector("[data-h]");
  const hb=box.querySelector("[data-hint]");if(hb)hb.onclick=()=>{hint.hidden=false;hint.innerHTML="<b>Indice :</b> "+esc(x.hint);};
  const sb=box.querySelector("[data-sol]");
  if(sb)sb.onclick=()=>{if(!S.done[x.id]){S.halved[x.id]=true;save();}hint.hidden=false;hint.innerHTML=`<b>Une solution possible</b>${S.done[x.id]?"":" (gain divisé par deux)"} :<pre class="code" style="margin-top:8px">${esc(x.sol)}</pre>`;};
  if(ed){
    let tm;
    ed.addEventListener("input",()=>{clearTimeout(tm);tm=setTimeout(()=>{S.drafts[x.id]=ed.value;save();},300);if(x.type==="css")preview();});
    ed.addEventListener("keydown",e=>{
      if(e.key==="Tab"){e.preventDefault();const s=ed.selectionStart,en=ed.selectionEnd,ind=lang==="py"?"    ":"  ";ed.setRangeText(ind,s,en,"end");ed.dispatchEvent(new Event("input"));}
      if(e.key==="Enter"&&(e.ctrlKey||e.metaKey)){e.preventDefault();(box.querySelector("[data-run]")||box.querySelector("[data-check]")).click();}
    });
  }
  if(x.type==="code"){
    const run=lang==="py"?runPy:runJS,mark=lang==="py"?'print("<<<T>>>")':'console.log("<<<T>>>");';
    box.querySelector("[data-run]").onclick=async()=>{const r=await run(ed.value);o.innerHTML=`<div class="out ${r.err?"err":""}">${esc((r.out||"(rien n'a été affiché)")+(r.err?"\n"+r.err:""))}</div>`;};
    box.querySelector("[data-check]").onclick=async()=>{
      const code=x.tests?ed.value+"\n"+mark+"\n"+x.tests:ed.value;
      const r=await run(code);
      if(r.err){o.innerHTML=`<div class="out err">${esc(r.err)}</div>`;setV(box,false,"Ton code plante avant la fin. Lis l'erreur ci-dessus : elle indique la ligne.");return;}
      let got=r.out;if(x.tests){const i=got.indexOf("<<<T>>>");got=i<0?"":got.slice(i+7);}
      got=norm(got);
      if(got===norm(x.expected)){o.innerHTML="";setV(box,true,"Correct ! Tous les tests passent.");gain(x.id,x.xp);}
      else{o.innerHTML=`<div class="out">Attendu :\n${esc(norm(x.expected))}\n\nObtenu :\n${esc(got||"(rien)")}</div>`;setV(box,false,"Pas encore. Compare ligne par ligne ce qui est attendu et ce que ton code donne.");}
    };
  }
  if(x.type==="sql"){
    box.querySelector("[data-run]").onclick=()=>{const r=runSQL(ed.value);o.innerHTML=r.err?`<div class="out err">${esc(r.err)}</div>`:r.rows?tableHTML(r.rows):`<div class="out">${esc(r.info)}</div>`;};
    box.querySelector("[data-check]").onclick=()=>{
      const r=runSQL(ed.value),ref=runSQL(x.sol).rows;
      if(r.err){o.innerHTML=`<div class="out err">${esc(r.err)}</div>`;setV(box,false,"La requête contient une erreur de syntaxe.");return;}
      o.innerHTML=tableHTML(r.rows);
      if(sameRows(r.rows,ref,x.ordered)){setV(box,true,"Correct ! Le résultat est exactement celui attendu.");gain(x.id,x.xp);}
      else{
        const n=r.rows?r.rows.length:0;
        setV(box,false,`Pas encore : ta requête renvoie ${n} ligne(s) et ${r.rows&&r.rows[0]?Object.keys(r.rows[0]).length:0} colonne(s), il en faut ${ref.length} et ${Object.keys(ref[0]).length}${x.ordered?", dans le bon ordre":""}.`);
      }
    };
  }
  let root;
  function preview(){root.innerHTML=`<style>${CSS_BASE}</style><style>${ed.value}</style>${CSS_HTML}`;}
  if(x.type==="css"){
    const host=box.querySelector("[data-prev]");root=host.attachShadow({mode:"open"});preview();
    box.querySelector("[data-check]").onclick=()=>{
      preview();const q=s=>root.querySelector(s);
      const fail=x.checks.find(([f])=>{try{return !f(q);}catch(e){return true;}});
      if(!fail){setV(box,true,"Correct ! Regarde le résultat dans l'aperçu.");gain(x.id,x.xp);}else setV(box,false,fail[1]);
    };
  }
  if(x.type==="fit")bindFit(box,x,setV,gain);
  if(x.type==="knn")bindKnn(box,x,setV,gain);
  if(x.type==="qcm"){
    box.querySelectorAll("[data-opt]").forEach(b=>b.onclick=()=>{
      const i=+b.dataset.opt;
      if(i===x.a){b.classList.add("right");setV(box,true,"Exact. "+x.why);gain(x.id,x.xp);}
      else{b.classList.add("wrong");setV(box,false,"Non. Relis la question et réessaie.");}
    });
  }
  if(x.type==="predict"||x.type==="fill"){
    const inp=box.querySelector("[data-ans]");
    const chk=()=>{
      const a=inp.value.trim().replace(/\s+/g," ");
      const ok=x.answers.some(r=>x.type==="fill"?r.toLowerCase()===a.toLowerCase():r===a);
      if(ok){setV(box,true,"Exact !");gain(x.id,x.xp);}else setV(box,false,"Ce n'est pas ça. Exécute le code dans ta tête ligne par ligne.");
    };
    box.querySelector("[data-check]").onclick=chk;
    inp.addEventListener("keydown",e=>{if(e.key==="Enter")chk();});
  }
}

function renderDevoirs(){
  view.innerHTML=`<div class="card" style="margin-bottom:16px"><div class="eyebrow">Devoirs</div><h2 style="font-size:24px;margin-bottom:6px">Six devoirs, un par semaine</h2><p class="muted" style="margin:0;max-width:70ch">Ils se font sur ta machine, dans VS Code, avec Live Server pour le front et XAMPP pour PHP et MySQL. Note les dates limites dans ton agenda. Coche les points au fur et à mesure ; un devoir rendu rapporte 50 XP.</p></div>
  <div class="dv">${DEVOIRS.map(d=>{
    const st=S.dv[d.id]||{c:[],rendu:false},I=LANGINFO[d.lang],dt=new Date(d.date+"T18:00:00");
    return`<article class="dcard ${st.rendu?"rendu":""}" style="--c:${I.color}">
      <div class="date"><span class="m" style="color:${I.color}">${esc(I.name)}</span><span class="d">${dt.getDate()}</span><span class="m">${dt.toLocaleDateString("fr-FR",{month:"short"})} · ${dt.toLocaleDateString("fr-FR",{weekday:"short"})}</span><span class="left">${st.rendu?"Rendu":daysLeft(d.date)}</span></div>
      <div><h3>${esc(d.titre)}</h3><p>${esc(d.txt)}</p>
      <ul class="checks">${d.checks.map((c,i)=>`<li><label><input type="checkbox" id="${d.id}-c${i}" data-dv="${d.id}" data-i="${i}" ${st.c.includes(i)?"checked":""}> ${esc(c)}</label></li>`).join("")}</ul>
      <div class="actions"><button class="btn small ${st.rendu?"ghost":""}" type="button" data-rendu="${d.id}">${st.rendu?"Marquer comme non rendu":"Marquer comme rendu (+50 XP)"}</button><span class="cal">Échéance : ${fmtDate(d.date)}, 18 h</span></div></div>
    </article>`;}).join("")}</div>`;
  view.querySelectorAll("[data-dv]").forEach(cb=>cb.onchange=()=>{
    const id=cb.dataset.dv,i=+cb.dataset.i,st=S.dv[id]=S.dv[id]||{c:[],rendu:false};
    st.c=cb.checked?[...new Set([...st.c,i])]:st.c.filter(v=>v!==i);save();
  });
  view.querySelectorAll("[data-rendu]").forEach(b=>b.onclick=()=>{
    const id=b.dataset.rendu,st=S.dv[id]=S.dv[id]||{c:[],rendu:false};
    st.rendu=!st.rendu;
    if(st.rendu&&!S.done["dv-"+id])gain("dv-"+id,50);
    save();renderDevoirs();
  });
}

function go(r,push=true){
  route=r;renderTabs();
  const lang=Object.keys(HASH).find(k=>HASH[k]===r);
  if(lang)renderLang(lang);else if(r==="devoirs")renderDevoirs();else{route="accueil";renderTabs();renderHome();}
  if(push){try{history.replaceState(null,"","#"+route);}catch(e){}}
  window.scrollTo({top:0});
}
document.addEventListener("click",e=>{
  const g=e.target.closest("[data-go]");if(g){go(g.dataset.go);return;}
  const rs=e.target.closest("[data-resume]");if(rs){const[k,li]=rs.dataset.resume.split("|");S.lesson[k]=+li;save();go(HASH[k]);return;}
  const l=e.target.closest("[data-lesson]");if(l){const lang=Object.keys(HASH).find(k=>HASH[k]===route);S.lesson[lang]=+l.dataset.lesson;save();renderLang(lang);window.scrollTo({top:0});}
});
