/* Le Lab — base SQL de démonstration (AlaSQL)
   Développé par 25 Labs */
"use strict";

const SEED=[
 "CREATE TABLE etudiants (id INT, nom STRING, promo STRING, credits INT)",
 "INSERT INTO etudiants VALUES (1,'Rahel','L1',48),(2,'Grace','L1',60),(3,'Jonathan','L2',55),(4,'Merveille','L1',30),(5,'Christian','L2',60),(6,'Divine','L3',52)",
 "CREATE TABLE tuteurs (id INT, nom STRING, matiere STRING, etoiles NUMBER)",
 "INSERT INTO tuteurs VALUES (1,'Prisca','Python',4.8),(2,'Joël','CSS',4.5),(3,'Naomie','SQL',4.9),(4,'Fiston','JavaScript',4.2),(5,'Bénédicte','PHP',4.6)",
 "CREATE TABLE seances (id INT, etudiant_id INT, tuteur_id INT, duree INT)",
 "INSERT INTO seances VALUES (1,1,1,60),(2,1,3,45),(3,4,2,30),(4,2,4,90),(5,3,1,60)"
];
let dbN=0;
function runSQL(q){
  if(typeof alasql==="undefined")return{err:"Le moteur SQL n'a pas pu se charger. Recharge la page."};
  try{
    const db=new alasql.Database("labo"+(dbN++));
    SEED.forEach(s=>db.exec(s));
    const clean=q.trim().replace(/;\s*$/,"");
    if(!clean)return{err:"Écris une requête."};
    const r=db.exec(clean);
    return{rows:Array.isArray(r)?r:null,info:Array.isArray(r)?null:"Requête exécutée ("+r+")"};
  }catch(e){return{err:String(e.message||e)};}
}
function tableHTML(rows){
  if(!rows||!rows.length)return'<p class="muted">Aucune ligne.</p>';
  const cols=Object.keys(rows[0]);
  return`<div class="tablewrap"><table class="res"><thead><tr>${cols.map(c=>`<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${cols.map(c=>`<td>${esc(r[c]??"NULL")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
const rowKey=r=>JSON.stringify(Object.values(r).map(v=>typeof v==="number"?Math.round(v*100)/100:v));
function sameRows(a,b,ordered){
  if(!a||!b||a.length!==b.length)return false;
  if(a.length&&Object.keys(a[0]).length!==Object.keys(b[0]).length)return false;
  let A=a.map(rowKey),B=b.map(rowKey);if(!ordered){A.sort();B.sort();}
  return A.every((x,i)=>x===B[i]);
}
