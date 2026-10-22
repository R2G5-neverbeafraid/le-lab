/* Le Lab — cours : javascript
   Développé par 25 Labs */
"use strict";

L.js={name:"JavaScript",color:"var(--js)",tag:"Rendre une page vivante",lessons:[
 {t:"Variables et affichage",th:`<p>En JavaScript moderne, on déclare avec <code>const</code> (valeur qui ne sera pas réassignée) ou <code>let</code> (valeur qui change). Oublie <code>var</code>.</p>
<p>Les <b>template literals</b> utilisent des accents graves <code>\`…\`</code> et <code>\${variable}</code>, comme les f-strings de Python. <code>console.log()</code> affiche dans la console.</p>
<p>Piège classique : <code>+</code> colle du texte si l'un des deux est une chaîne, alors que <code>*</code>, <code>-</code>, <code>/</code> convertissent en nombre.</p>`,
 ex:`const prenom = "RG";
let xp = 10;
xp += 5;
console.log(\`\${prenom} a \${xp} XP\`);
console.log(typeof xp, typeof prenom);
console.log("2" + 2, "2" * 2);`,
 exos:[
  {id:"js1a",type:"code",title:"Message de bienvenue",xp:15,
   p:`Déclare <code>const prenom = "RG"</code> et <code>let xp = 0</code>. Ajoute 25 à <code>xp</code>, puis affiche exactement : <code>Bienvenue RG, tu as 25 XP</code>.`,
   start:`// Écris ton code ici\n`,expected:`Bienvenue RG, tu as 25 XP`,
   hint:"xp += 25; puis console.log(`Bienvenue ${prenom}, tu as ${xp} XP`);",
   sol:"const prenom = \"RG\";\nlet xp = 0;\nxp += 25;\nconsole.log(`Bienvenue ${prenom}, tu as ${xp} XP`);"},
  {id:"js1b",type:"predict",title:"Le piège du +",xp:10,code:`console.log("5" + 3, "5" * 3);`,p:"Qu'affiche cette ligne ?",answers:["53 15"],hint:"+ avec une chaîne colle ; * convertit en nombre."}
 ]},
 {t:"Fonctions et conditions",th:`<p>Deux façons d'écrire une fonction :</p>
<pre class="code">function double(x) { return x * 2; }
const triple = (x) => x * 3;</pre>
<p>Pour comparer, utilise toujours <code>===</code> (même valeur et même type). <code>==</code> fait des conversions surprenantes : <code>"0" == 0</code> est vrai.</p>
<p>Les blocs <code>if / else if / else</code> sont délimités par des accolades.</p>`,
 ex:`function estAdmis(note) {
  if (note >= 10) {
    return "Admis";
  } else {
    return "Ajourné";
  }
}
console.log(estAdmis(12), estAdmis(7));
console.log("0" == 0, "0" === 0);`,
 exos:[
  {id:"js2a",type:"code",title:"Mention du quiz",xp:20,
   p:`Écris <code>mention(note)</code> sur 20 : 16 et plus → <code>"Très bien"</code>, 14 et plus → <code>"Bien"</code>, 12 et plus → <code>"Assez bien"</code>, 10 et plus → <code>"Passable"</code>, sinon <code>"Échec"</code>.`,
   start:`function mention(note) {\n  // à toi\n}\n`,
   tests:`console.log(mention(17));\nconsole.log(mention(14));\nconsole.log(mention(12.5));\nconsole.log(mention(10));\nconsole.log(mention(3));`,
   expected:`Très bien\nBien\nAssez bien\nPassable\nÉchec`,
   hint:"Teste du plus grand au plus petit avec if / else if.",
   sol:`function mention(note) {\n  if (note >= 16) return "Très bien";\n  else if (note >= 14) return "Bien";\n  else if (note >= 12) return "Assez bien";\n  else if (note >= 10) return "Passable";\n  return "Échec";\n}`}
 ]},
 {t:"Tableaux et méthodes",th:`<p>Un tableau : <code>const cours = ["HTML", "CSS"]</code>. <code>.length</code> donne la taille, <code>.push()</code> ajoute.</p>
<p>Les méthodes à maîtriser, parce qu'elles remplacent la plupart des boucles :</p>
<ul><li><code>.filter(fn)</code> garde les éléments pour lesquels <code>fn</code> renvoie vrai</li><li><code>.map(fn)</code> transforme chaque élément</li><li><code>.find(fn)</code> renvoie le premier qui correspond</li><li><code>.join(", ")</code> colle tout en un texte</li></ul>
<p>On les enchaîne : <code>tuteurs.filter(...).map(...)</code>.</p>`,
 ex:`const tuteurs = [
  { nom: "Prisca", matiere: "Python", etoiles: 4.8 },
  { nom: "Joël", matiere: "CSS", etoiles: 4.5 },
];
const top = tuteurs.filter(t => t.etoiles >= 4.6).map(t => t.nom);
console.log(top);
console.log(tuteurs.find(t => t.matiere === "CSS").nom);`,
 exos:[
  {id:"js3a",type:"code",title:"Tuteurs disponibles",xp:20,
   p:`Écris <code>nomsDisponibles(tuteurs)</code> qui renvoie un tableau contenant seulement les <b>noms</b> des tuteurs dont <code>dispo</code> vaut <code>true</code>.`,
   start:`function nomsDisponibles(tuteurs) {\n  // utilise filter puis map\n}\n`,
   tests:`console.log(nomsDisponibles([{nom:"Grace",dispo:true},{nom:"Jonathan",dispo:false},{nom:"Merveille",dispo:true}]).join(", "));\nconsole.log(nomsDisponibles([]).length);`,
   expected:`Grace, Merveille\n0`,hint:"return tuteurs.filter(t => t.dispo).map(t => t.nom);",
   sol:`function nomsDisponibles(tuteurs) {\n  return tuteurs.filter(t => t.dispo).map(t => t.nom);\n}`}
 ]},
 {t:"Objets et DOM",th:`<p>Un <b>objet</b> regroupe des propriétés : <code>const q = { texte: "…", bonne: "b" }</code>. On lit <code>q.texte</code>.</p>
<p>Le <b>DOM</b>, c'est la page HTML vue par JavaScript. Les quatre gestes de base :</p>
<ul><li><code>document.querySelector("#score")</code> trouve un élément</li><li><code>el.textContent = "…"</code> change son texte</li><li><code>el.classList.add("actif")</code> change son style via une classe</li><li><code>el.addEventListener("click", fn)</code> réagit à un clic</li></ul>
<p>C'est la bonne pratique : on évite les attributs <code>onclick</code> dans le HTML et on branche les événements en JavaScript.</p>`,
 ex:`const question = { texte: "CSS veut dire ?", choix: ["a", "b"], bonne: "b" };
console.log(question.texte, question.choix.length);

// Dans une vraie page :
// const btn = document.querySelector("#valider");
// btn.addEventListener("click", () => { ... });`,
 exos:[
  {id:"js4a",type:"code",title:"Le score du quiz",xp:20,
   p:`Écris <code>calculerScore(reponses, corrige)</code> : deux tableaux de même longueur, renvoie le nombre de positions où la réponse est identique au corrigé.`,
   start:`function calculerScore(reponses, corrige) {\n  let score = 0;\n  // une boucle for avec un index i\n  return score;\n}\n`,
   tests:`console.log(calculerScore(["a","c","b"], ["a","b","b"]));\nconsole.log(calculerScore([], []));\nconsole.log(calculerScore(["d","d"], ["d","d"]));`,
   expected:`2\n0\n2`,hint:"for (let i = 0; i < reponses.length; i++) { if (reponses[i] === corrige[i]) score++; }",
   sol:`function calculerScore(reponses, corrige) {\n  let score = 0;\n  for (let i = 0; i < reponses.length; i++) {\n    if (reponses[i] === corrige[i]) score++;\n  }\n  return score;\n}`},
  {id:"js4b",type:"qcm",title:"Écrire dans la page",xp:10,p:`Quelle ligne affiche « Bravo » dans <code>&lt;p id="msg"&gt;&lt;/p&gt;</code> ?`,
   opts:[`document.querySelector("#msg").textContent = "Bravo";`,`document.msg = "Bravo";`,`console.log("#msg", "Bravo");`,`document.querySelector("msg").value = "Bravo";`],a:0,
   why:"querySelector a besoin du # pour un id, et textContent change le texte affiché d'un paragraphe (value sert aux champs de formulaire)."}
 ]}
]};
