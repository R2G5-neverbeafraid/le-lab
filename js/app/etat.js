/* Le Lab — progression, XP et sauvegarde
   Développé par 25 (TwentyFive) Labs */
"use strict";

const KEY="laboRG.v1";
let S={done:{},xp:0,halved:{},drafts:{},days:[],dv:{},lesson:{}};
try{const raw=localStorage.getItem(KEY);if(raw)S={...S,...JSON.parse(raw)};}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
const allExos=lang=>L[lang].lessons.flatMap((l,li)=>l.exos.map(x=>({...x,li})));
const TITLES=["Débutant","Apprenti","Bricoleur de code","Codeur","Développeur junior","Développeur","Développeur confirmé","Architecte","Maître du code"];
const level=()=>Math.floor(S.xp/100)+1;
function streak(){
  const set=new Set(S.days);let d=new Date(),n=0;
  const k=x=>x.toISOString().slice(0,10);
  if(!set.has(k(d)))d.setDate(d.getDate()-1);
  while(set.has(k(d))){n++;d.setDate(d.getDate()-1);}
  return n;
}
function gain(id,xp){
  if(S.done[id])return;
  const g=S.halved[id]?Math.ceil(xp/2):xp;
  const before=level();
  S.done[id]=true;S.xp+=g;
  const t=new Date().toISOString().slice(0,10);if(!S.days.includes(t))S.days.push(t);
  save();renderStats();
  toast(level()>before?`Niveau ${level()} : ${TITLES[Math.min(level()-1,TITLES.length-1)]} !`:`+${g} XP`);
  confetti();
}
