/* Le Lab — vidéos animées du module Machine Learning (images + sous-titres ; le son est dans son.js)
   Développé par 25 Labs */
"use strict";

const VW=960,VH=540,DISP="Unbounded, system-ui, sans-serif",BODY="Figtree, system-ui, sans-serif",MONO="JetBrains Mono, ui-monospace, monospace";
function CV(){const cs=getComputedStyle(document.documentElement),v=n=>cs.getPropertyValue(n).trim();return{ink:v("--ink"),mute:v("--mute"),line:v("--line"),bg:v("--vbg"),surf:v("--surface"),ok:v("--ok"),bad:v("--bad"),acc:v("--accent"),ml:v("--ml"),sky:v("--py")};}
const E=x=>x<=0?0:x>=1?1:1-Math.pow(1-x,3);
const A=(p,s,d=.6)=>E((p-s)/d);
function T(g,C,s,x,y,o={}){if((o.a??1)<=0)return;g.save();g.globalAlpha=o.a??1;g.fillStyle=o.c||C.ink;g.font=`${o.w||600} ${o.s||26}px ${o.f||BODY}`;g.textAlign=o.al||"left";g.textBaseline="middle";g.fillText(s,x,y);g.restore();}
function rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath();}
function box(g,C,x,y,w,h,label,o={}){if((o.a??1)<=0)return;g.save();g.globalAlpha=o.a??1;rr(g,x,y,w,h,12);g.fillStyle=o.fill||C.surf;g.fill();g.lineWidth=2;g.strokeStyle=o.stroke||C.line;g.stroke();g.restore();T(g,C,label,x+w/2,y+h/2,{al:"center",s:o.s||20,c:o.c||C.ink,a:o.a??1,w:700});}
function arrow(g,C,x1,y1,x2,y2,a=1,c){if(a<=0)return;g.save();g.globalAlpha=a;g.strokeStyle=c||C.mute;g.fillStyle=c||C.mute;g.lineWidth=3;g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();const an=Math.atan2(y2-y1,x2-x1);g.beginPath();g.moveTo(x2,y2);g.lineTo(x2-14*Math.cos(an-.4),y2-14*Math.sin(an-.4));g.lineTo(x2-14*Math.cos(an+.4),y2-14*Math.sin(an+.4));g.fill();g.restore();}
function mango(g,x,y,r,a=1,green){if(a<=0||r<=0)return;g.save();g.globalAlpha=a;g.fillStyle=green?"#86b93c":"#f29a1f";g.beginPath();g.ellipse(x,y,r*1.1,r*.85,-.4,0,7);g.fill();g.fillStyle=green?"#a6cf5a":"#f7b955";g.beginPath();g.ellipse(x-r*.3,y-r*.25,r*.35,r*.2,-.4,0,7);g.fill();g.fillStyle="#3f7a22";g.beginPath();g.ellipse(x+r*.55,y-r*.85,r*.38,r*.15,-.6,0,7);g.fill();g.restore();}
function avocat(g,x,y,r,a=1){if(a<=0||r<=0)return;g.save();g.globalAlpha=a;g.fillStyle="#3c6a20";g.beginPath();g.arc(x,y+r*.2,r*.85,0,7);g.fill();g.beginPath();g.arc(x,y-r*.5,r*.55,0,7);g.fill();g.fillStyle="#cddc72";g.beginPath();g.arc(x,y+r*.25,r*.6,0,7);g.fill();g.fillStyle="#7a4a1c";g.beginPath();g.arc(x,y+r*.3,r*.3,0,7);g.fill();g.restore();}
const fruit=(g,k,x,y,r,a)=>k==="M"?mango(g,x,y,r,a):avocat(g,x,y,r,a);
function tagLbl(g,C,s,x,y,col,a=1){if(a<=0)return;g.save();g.globalAlpha=a;g.font=`700 16px ${BODY}`;const w=g.measureText(s).width+20;rr(g,x-w/2,y-14,w,28,14);g.fillStyle=col;g.fill();g.restore();T(g,C,s,x,y,{al:"center",s:16,c:"#ffffff",a,w:700});}
function plot(g,C,o,a=1){
  const P={...o,px:x=>o.x0+(x-o.xmin)/(o.xmax-o.xmin)*o.w,py:y=>o.y0-(y-o.ymin)/(o.ymax-o.ymin)*o.h};
  if(a>0){g.save();g.globalAlpha=a;g.strokeStyle=C.mute;g.lineWidth=2;g.beginPath();g.moveTo(o.x0,o.y0-o.h);g.lineTo(o.x0,o.y0);g.lineTo(o.x0+o.w,o.y0);g.stroke();
  (o.xt||[]).forEach(v=>T(g,C,String(v),P.px(v),o.y0+20,{al:"center",s:15,c:C.mute,w:500}));
  (o.yt||[]).forEach(v=>T(g,C,typeof v==="number"&&v>=1000?v.toLocaleString("fr-FR"):String(v),o.x0-12,P.py(v),{al:"right",s:15,c:C.mute,w:500}));
  if(o.xl)T(g,C,o.xl,o.x0+o.w,o.y0+46,{al:"right",s:17,c:C.mute});
  if(o.yl)T(g,C,o.yl,o.x0,o.y0-o.h-24,{s:17,c:C.mute});g.restore();}
  return P;
}
const FRUITS=[[300,9,"M"],[280,8,"M"],[340,9,"M"],[260,7,"M"],[320,8,"M"],[200,2,"A"],[230,3,"A"],[180,1,"A"],[250,4,"A"],[210,2,"A"]];
const FPLOT={x0:130,y0:460,w:760,h:360,xmin:150,xmax:370,ymin:0,ymax:10,xt:[150,200,250,300,350],yt:[0,5,10],xl:"Poids (g) →",yl:"Couleur : 0 = vert, 10 = orange"};
const TAXI=[[1,1500],[2,2000],[3,2600],[4,3000],[5,3600],[6,4000]];
const TPLOT={x0:140,y0:470,w:740,h:360,xmin:0,xmax:8,ymin:0,ymax:5500,xt:[0,1,2,3,4,5,6,7,8],yt:[0,1000,2000,3000,4000,5000],xl:"Distance (km) →",yl:"Prix (FC)"};
const mae=(a,b)=>TAXI.reduce((s,[d,p])=>s+Math.abs(p-(a*d+b)),0)/TAXI.length;
function regScene(g,C,P,a,b,resA=1){
  g.save();g.strokeStyle=C.ml;g.lineWidth=4;g.beginPath();g.moveTo(P.px(0),P.py(b));g.lineTo(P.px(8),P.py(a*8+b));g.stroke();g.restore();
  if(resA>0){g.save();g.globalAlpha=resA;g.strokeStyle=C.bad;g.lineWidth=3;TAXI.forEach(([d,p])=>{g.beginPath();g.moveTo(P.px(d),P.py(p));g.lineTo(P.px(d),P.py(a*d+b));g.stroke();});g.restore();}
  TAXI.forEach(([d,p])=>{g.beginPath();g.arc(P.px(d),P.py(p),9,0,7);g.fillStyle=C.sky;g.fill();});
}
function knn(q,k=3){return FRUITS.map(f=>({f,d:Math.hypot((f[0]-q[0])/220,(f[1]-q[1])/10)})).sort((x,y)=>x.d-y.d).slice(0,k);}
const TRAIN=[[1,1.6],[2,2.9],[3,2.3],[4,3.8],[5,3.4],[6,4.9],[7,4.6],[8,6.1]],TEST=[[1.5,2.0],[3.5,3.2],[5.5,4.4],[7.5,5.4]];
const OPLOT={x0:120,y0:470,w:780,h:350,xmin:0,xmax:9,ymin:0,ymax:9,xl:"→",yl:""};
const WIG=(()=>{const pts=[];TRAIN.forEach((p,i)=>{pts.push(p);const n=TRAIN[i+1];if(n)pts.push([(p[0]+n[0])/2,(p[1]+n[1])/2+(i%2?-1.7:1.7)]);});
  const out=[];for(let i=0;i<pts.length-1;i++){const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;for(let t=0;t<1;t+=.05){const t2=t*t,t3=t2*t;const f=(a,b,c,d)=>.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t2+(-a+3*b-3*c+d)*t3);out.push([f(p0[0],p1[0],p2[0],p3[0]),f(p0[1],p1[1],p2[1],p3[1])]);}}out.push(pts[pts.length-1]);return out;})();
const wigAt=x=>{let best=WIG[0];for(const p of WIG)if(Math.abs(p[0]-x)<Math.abs(best[0]-x))best=p;return best[1];};
function curve(g,P,pts,frac,col,w,a=1){if(a<=0)return;const n=Math.max(2,Math.floor(pts.length*frac));g.save();g.globalAlpha=a;g.strokeStyle=col;g.lineWidth=w;g.lineJoin="round";g.beginPath();pts.slice(0,n).forEach((p,i)=>i?g.lineTo(P.px(p[0]),P.py(p[1])):g.moveTo(P.px(p[0]),P.py(p[1])));g.stroke();g.restore();}
function dots(g,P,pts,col,r=8,a=1){if(a<=0)return;g.save();g.globalAlpha=a;g.fillStyle=col;pts.forEach(([x,y])=>{g.beginPath();g.arc(P.px(x),P.py(y),r,0,7);g.fill();});g.restore();}
function neuronBase(g,C,p,showCalc){
  const ins=[["Couleur = 9",.5,150],["Poids = 3",.3,270],["Taches = 1",-.4,390]];
  ins.forEach(([l,w,y],i)=>{const a=A(p,i*.5);g.save();g.globalAlpha=a;g.strokeStyle=w<0?C.bad:C.sky;g.lineWidth=2+Math.abs(w)*10;g.beginPath();g.moveTo(250,y);g.lineTo(450,270);g.stroke();g.restore();
    g.save();g.globalAlpha=a;g.beginPath();g.arc(190,y,42,0,7);g.fillStyle=C.surf;g.fill();g.strokeStyle=C.line;g.lineWidth=2;g.stroke();g.restore();
    T(g,C,l.split(" = ")[1],190,y,{al:"center",s:26,w:800,a,f:DISP});T(g,C,l.split(" = ")[0],190,y-60,{al:"center",s:16,c:C.mute,a});
    T(g,C,"× "+String(w).replace(".",","),350,(y+270)/2-18,{al:"center",s:18,c:w<0?C.bad:C.sky,a:A(p,1.5+i*.4),w:700});});
  const a=A(p,1.2);g.save();g.globalAlpha=a;g.beginPath();g.arc(520,270,70,0,7);g.fillStyle=C.surf;g.fill();g.strokeStyle=C.ml;g.lineWidth=4;g.stroke();g.restore();
  T(g,C,"Σ",520,270,{al:"center",s:48,w:800,a,f:DISP,c:C.ml});
  if(showCalc)T(g,C,"9 × 0,5 + 3 × 0,3 + 1 × (−0,4) = 5",480,490,{al:"center",s:24,a:showCalc,f:MONO,w:600});
}
const VIDEOS={
 v1:{title:"Règles ou exemples ?",scenes:[
  {d:6,cap:"Imagine : tu veux apprendre à un ordinateur à reconnaître une mangue.",draw(g,C,p){T(g,C,"C'est quoi le",480,150,{s:42,al:"center",f:DISP,w:800,a:A(p,0)});T(g,C,"machine learning ?",480,215,{s:52,al:"center",f:DISP,w:800,c:C.ml,a:A(p,.4)});mango(g,480,370,75*A(p,1.2,.8),A(p,1.2));}},
  {d:8,cap:"Méthode classique : tu écris toi-même les règles. Mais une mangue peut être verte, petite ou tachée… et les règles se trompent.",draw(g,C,p){
   T(g,C,"Méthode classique : écrire les règles",60,60,{s:28,f:DISP,w:700});box(g,C,60,110,500,260,"",{});
   ["SI couleur = orange","ET forme = ronde","ET poids > 250 g","ALORS c'est une mangue"].forEach((l,i)=>T(g,C,l,90,160+i*55,{f:MONO,s:22,a:A(p,.5+i*.7),c:i===3?C.ml:C.ink}));
   mango(g,770,220,75*A(p,4,.6),A(p,4),true);T(g,C,"Une mangue verte…",770,330,{al:"center",s:22,a:A(p,4.4)});T(g,C,"Les règles disent : NON",770,385,{al:"center",s:26,w:800,c:C.bad,a:A(p,5.6)});}},
  {d:8,cap:"Machine learning : au lieu des règles, on montre plein d'exemples avec la bonne réponse.",draw(g,C,p){
   T(g,C,"Machine learning : montrer des exemples",60,60,{s:28,f:DISP,w:700});
   const ks=["M","A","M","M","A","A","M","A"];ks.forEach((k,i)=>{const x=150+(i%4)*220,y=190+Math.floor(i/4)*190,a=A(p,.4+i*.55);if(k==="M")mango(g,x,y,48,a,i===3);else avocat(g,x,y,48,a);tagLbl(g,C,k==="M"?"mangue":"avocat",x,y+78,k==="M"?"#d97a10":"#3c6a20",a);});}},
  {d:9,cap:"L'ordinateur cherche tout seul ce qui différencie une mangue d'un avocat. Il fabrique la règle : c'est ça, apprendre.",draw(g,C,p){
   T(g,C,"Programmation classique",60,90,{s:20,c:C.mute,a:A(p,0)});const a1=A(p,.2);
   box(g,C,60,120,160,64,"Règles",{a:a1});box(g,C,240,120,160,64,"Données",{a:a1});arrow(g,C,410,152,460,152,a1);box(g,C,470,120,180,64,"Programme",{a:a1});arrow(g,C,660,152,710,152,a1);box(g,C,720,120,180,64,"Réponses",{a:a1});
   T(g,C,"Machine learning",60,300,{s:20,c:C.ml,a:A(p,2.5),w:800});const a2=A(p,2.8);
   box(g,C,60,330,160,64,"Données",{a:a2});box(g,C,240,330,160,64,"Réponses",{a:a2});arrow(g,C,410,362,460,362,a2,C.ml);box(g,C,470,330,180,64,"Apprentissage",{a:a2,stroke:C.ml});arrow(g,C,660,362,710,362,A(p,4),C.ml);
   box(g,C,720,330,180,64,"La règle !",{a:A(p,4.5),fill:C.ml,stroke:C.ml,c:"#ffffff"});}}
 ]},
 v2:{title:"Les données",scenes:[
  {d:7,cap:"Pour apprendre, la machine a besoin de données : un tableau où chaque ligne est un exemple.",draw(g,C,p){table(g,C,p,0);}},
  {d:7,cap:"Les colonnes qu'on mesure s'appellent les caractéristiques. La bonne réponse s'appelle l'étiquette.",draw(g,C,p){table(g,C,99,0);
   const a=A(p,.5);g.save();g.globalAlpha=a;g.setLineDash([10,8]);g.lineWidth=3;g.strokeStyle=C.sky;rr(g,80,55,520,410,14);g.stroke();g.strokeStyle=C.ml;rr(g,620,55,250,410,14);g.stroke();g.restore();
   T(g,C,"Caractéristiques : ce qu'on mesure",340,500,{al:"center",s:20,c:C.sky,w:800,a});T(g,C,"Étiquette : la réponse",745,500,{al:"center",s:20,c:C.ml,w:800,a:A(p,1.8)});}},
  {d:8,cap:"On peut dessiner chaque fruit comme un point : le poids à l'horizontale, la couleur à la verticale.",draw(g,C,p){const P=plot(g,C,FPLOT,A(p,0));FRUITS.forEach((f,i)=>fruit(g,f[2],P.px(f[0]),P.py(f[1]),18,A(p,.8+i*.4)));}},
  {d:7,cap:"Regarde : les mangues et les avocats forment deux groupes bien séparés. C'est ce que la machine va utiliser.",draw(g,C,p){const P=plot(g,C,FPLOT);FRUITS.forEach(f=>fruit(g,f[2],P.px(f[0]),P.py(f[1]),18,1));
   const a=A(p,.6);g.save();g.globalAlpha=a;g.setLineDash([8,7]);g.lineWidth=3;g.strokeStyle="#e08a16";g.beginPath();g.ellipse(P.px(300),P.py(8.2),180,90,0,0,7);g.stroke();g.strokeStyle="#4f8a2b";g.beginPath();g.ellipse(P.px(215),P.py(2.4),150,90,0,0,7);g.stroke();g.restore();
   T(g,C,"les mangues",P.px(300),P.py(8.2)-115,{al:"center",s:20,w:800,c:"#d97a10",a:A(p,1.2)});T(g,C,"les avocats",P.px(215),P.py(2.4)-110,{al:"center",s:20,w:800,c:"#4f8a2b",a:A(p,1.8)});}}
 ]},
 v3:{title:"Apprendre en se trompant",scenes:[
  {d:7,cap:"Exemple : on veut deviner le prix d'une course en taxi-moto selon la distance. Chaque point est une vraie course.",draw(g,C,p){T(g,C,"Prix d'une course en taxi-moto",480,40,{al:"center",s:24,f:DISP,w:700});const P=plot(g,C,TPLOT,A(p,0));TAXI.forEach(([d,pr],i)=>dots(g,P,[[d,pr]],C.sky,9,A(p,.8+i*.5)));}},
  {d:8,cap:"La machine commence avec une droite choisie au hasard. Les traits rouges sont ses erreurs : elle est loin du compte.",draw(g,C,p){const P=plot(g,C,TPLOT);const k=A(p,.3,1.5);g.save();g.globalAlpha=k;regScene(g,C,P,150,3000,A(p,2,1));g.restore();if(k<1)dots(g,P,TAXI,C.sky,9);errBox(g,C,mae(150,3000),A(p,3.5));}},
  {d:10,cap:"À chaque essai, elle déplace un peu la droite dans le sens qui réduit l'erreur. On répète ça des milliers de fois.",draw(g,C,p){const P=plot(g,C,TPLOT);const k=E(p/8.5),a=150+350*k,b=3000-2000*k;regScene(g,C,P,a,b);errBox(g,C,mae(a,b),1,Math.round(1+k*1999));}},
  {d:8,cap:"L'erreur est petite : le modèle est entraîné. Il peut maintenant estimer le prix d'une course de 7 km, qu'il n'a jamais vue.",draw(g,C,p){const P=plot(g,C,TPLOT);regScene(g,C,P,500,1000,.4);const a=A(p,.8);g.save();g.globalAlpha=a;g.setLineDash([7,6]);g.strokeStyle=C.ml;g.lineWidth=2;g.beginPath();g.moveTo(P.px(7),P.py(0));g.lineTo(P.px(7),P.py(4500));g.lineTo(P.px(0),P.py(4500));g.stroke();g.restore();
   g.save();g.globalAlpha=a;g.beginPath();g.arc(P.px(7),P.py(4500),13,0,7);g.fillStyle=C.ml;g.fill();g.restore();T(g,C,"7 km → environ 4 500 FC",P.px(7)-10,P.py(4500)-45,{al:"right",s:24,w:800,c:C.ml,a:A(p,2)});}}
 ]},
 v4:{title:"Les plus proches voisins",scenes:[
  {d:7,cap:"Un nouveau fruit arrive. On connaît son poids et sa couleur, mais pas ce que c'est.",draw(g,C,p){const P=plot(g,C,FPLOT);FRUITS.forEach(f=>fruit(g,f[2],P.px(f[0]),P.py(f[1]),18,1));mystery(g,C,P,[265,5.5],A(p,1.2),1+.08*Math.sin(p*5));}},
  {d:8,cap:"On regarde ses 3 voisins les plus proches. Ce 3, c'est le « k » de la méthode des k plus proches voisins.",draw(g,C,p){const P=plot(g,C,FPLOT);const q=[265,5.5],nb=knn(q);FRUITS.forEach(f=>fruit(g,f[2],P.px(f[0]),P.py(f[1]),18,1));
   nb.forEach((n,i)=>{const a=A(p,1+i*1.1);g.save();g.globalAlpha=a;g.setLineDash([6,6]);g.strokeStyle=C.ink;g.lineWidth=2.5;g.beginPath();g.moveTo(P.px(q[0]),P.py(q[1]));g.lineTo(P.px(n.f[0]),P.py(n.f[1]));g.stroke();g.restore();});
   const far=nb[2].f,R=Math.hypot(P.px(far[0])-P.px(q[0]),P.py(far[1])-P.py(q[1]))+26;g.save();g.globalAlpha=A(p,4.5);g.strokeStyle=C.ml;g.lineWidth=3;g.beginPath();g.arc(P.px(q[0]),P.py(q[1]),R*A(p,4.5,1.2),0,7);g.stroke();g.restore();mystery(g,C,P,q,1,1);}},
  {d:7,cap:"Les voisins votent : 2 mangues contre 1 avocat. Le nouveau fruit est donc… une mangue !",draw(g,C,p){const P=plot(g,C,FPLOT);const q=[265,5.5];FRUITS.forEach(f=>fruit(g,f[2],P.px(f[0]),P.py(f[1]),18,1));
   box(g,C,640,30,280,110,"",{a:A(p,0)});mango(g,680,62,16,A(p,.5));T(g,C,"Mangues : 2",710,62,{s:22,w:800,a:A(p,.5)});avocat(g,680,108,16,A(p,1.2));T(g,C,"Avocats : 1",710,108,{s:22,w:800,a:A(p,1.2)});
   if(p<3.2)mystery(g,C,P,q,1,1);else{mango(g,P.px(q[0]),P.py(q[1]),26*A(p,3.2,.5)+.1,1);T(g,C,"= mangue !",P.px(q[0])+40,P.py(q[1]),{s:26,w:800,c:"#d97a10",a:A(p,3.6)});}}},
  {d:7,cap:"Pas besoin de formule compliquée. Toute l'idée tient en une phrase.",draw(g,C,p){T(g,C,"« Dis-moi qui sont tes voisins,",480,220,{al:"center",s:34,f:DISP,w:700,a:A(p,.3)});T(g,C,"je te dirai qui tu es. »",480,280,{al:"center",s:34,f:DISP,w:700,c:C.ml,a:A(p,1.2)});T(g,C,"k-NN : k plus proches voisins",480,370,{al:"center",s:20,c:C.mute,a:A(p,2.4)});}}
 ]},
 v5:{title:"Par cœur ou compris ?",scenes:[
  {d:7,cap:"Pour vérifier qu'un modèle a vraiment appris, on cache une partie des données. C'est le jeu de test, comme un examen surprise.",draw(g,C,p){const P=plot(g,C,OPLOT);dots(g,P,TRAIN,C.sky,9,A(p,.3));TEST.forEach((t,i)=>{const a=A(p,2+i*.4);g.save();g.globalAlpha=a;g.setLineDash([5,5]);g.strokeStyle=C.mute;g.lineWidth=2;g.strokeRect(P.px(t[0])-15,P.py(t[1])-15,30,30);g.restore();T(g,C,"?",P.px(t[0]),P.py(t[1]),{al:"center",s:18,c:C.mute,a,w:800});});
   T(g,C,"● entraînement",640,60,{s:20,c:C.sky,w:800,a:A(p,.3)});T(g,C,"? test (caché)",640,95,{s:20,c:C.mute,w:800,a:A(p,2)});}},
  {d:8,cap:"Ce premier modèle passe par TOUS les points d'entraînement. Il a appris par cœur, comme un élève qui récite sans comprendre.",draw(g,C,p){const P=plot(g,C,OPLOT);curve(g,P,WIG,A(p,.3,5),C.bad,4);dots(g,P,TRAIN,C.sky,9);T(g,C,"Modèle « par cœur »",640,60,{s:22,c:C.bad,w:800});}},
  {d:8,cap:"Ce deuxième modèle est plus simple. Il rate un peu les points, mais il a saisi la tendance générale.",draw(g,C,p){const P=plot(g,C,OPLOT);curve(g,P,WIG,1,C.bad,3,.25);curve(g,P,Array.from({length:41},(_,j)=>[j/40*9,1+.6*j/40*9]),A(p,.3,3),C.ok,5);dots(g,P,TRAIN,C.sky,9);T(g,C,"Modèle simple",640,60,{s:22,c:C.ok,w:800});}},
  {d:9,cap:"L'examen révèle la vérité : les nouveaux points sont loin de la courbe « par cœur » et proches de la droite. Ce piège s'appelle le surapprentissage.",draw(g,C,p){const P=plot(g,C,OPLOT);curve(g,P,WIG,1,C.bad,3,.7);g.save();g.strokeStyle=C.ok;g.lineWidth=4;g.beginPath();g.moveTo(P.px(0),P.py(1));g.lineTo(P.px(9),P.py(6.4));g.stroke();g.restore();dots(g,P,TRAIN,C.sky,7,.5);
   TEST.forEach(t=>{const a=A(p,.5);dots(g,P,[t],C.ml,11,a);g.save();g.lineWidth=3;g.globalAlpha=A(p,2);g.strokeStyle=C.bad;g.beginPath();g.moveTo(P.px(t[0])-6,P.py(t[1]));g.lineTo(P.px(t[0])-6,P.py(wigAt(t[0])));g.stroke();g.globalAlpha=A(p,3.5);g.strokeStyle=C.ok;g.beginPath();g.moveTo(P.px(t[0])+6,P.py(t[1]));g.lineTo(P.px(t[0])+6,P.py(1+.6*t[0]));g.stroke();g.restore();});
   T(g,C,"Par cœur : grosses erreurs au test",160,40,{s:21,c:C.bad,w:800,a:A(p,2.2)});T(g,C,"Simple : petites erreurs, il a compris",160,75,{s:21,c:C.ok,w:800,a:A(p,3.8)});}}
 ]},
 v6:{title:"Du neurone à Claude",scenes:[
  {d:8,cap:"Un neurone artificiel reçoit des nombres. Il multiplie chacun par un poids, qui dit son importance, puis il additionne tout.",draw(g,C,p){neuronBase(g,C,p,A(p,4.5));}},
  {d:7,cap:"Si la somme atteint le seuil, le neurone s'allume et répond 1. Sinon il reste éteint : 0. Apprendre, c'est régler les poids.",draw(g,C,p){neuronBase(g,C,9,1);arrow(g,C,595,270,745,270,A(p,.3),C.ml);T(g,C,"seuil = 3",670,240,{al:"center",s:18,c:C.mute,a:A(p,.6)});T(g,C,"5 ≥ 3",670,305,{al:"center",s:20,w:800,a:A(p,1.5)});
   const on=A(p,2.5);g.save();g.beginPath();g.arc(810,270,52,0,7);g.fillStyle=on>0?C.ml:C.surf;g.globalAlpha=Math.max(.3,on);g.fill();g.strokeStyle=C.ml;g.lineWidth=4;g.stroke();g.restore();T(g,C,"1",810,270,{al:"center",s:40,w:800,f:DISP,c:"#ffffff",a:on});T(g,C,"→ mangue",810,350,{al:"center",s:22,w:800,c:C.ml,a:A(p,3.5)});}},
  {d:8,cap:"On empile des milliers de neurones en couches : c'est un réseau de neurones. Avec beaucoup de couches, on parle de deep learning.",draw(g,C,p){const L=[3,5,5,2],X=[170,390,610,830];const pos=L.map((n,i)=>Array.from({length:n},(_,j)=>[X[i],270+(j-(n-1)/2)*80]));
   for(let i=0;i<3;i++)pos[i].forEach(a=>pos[i+1].forEach(b=>{g.save();g.globalAlpha=.35*A(p,i*.8+.5);g.strokeStyle=C.mute;g.lineWidth=1.2;g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.stroke();g.restore();}));
   if(p>3){for(let k=0;k<14;k++){const i=k%3,a=pos[i][k%pos[i].length],b=pos[i+1][(k*3)%pos[i+1].length],t=((p*0.6+k*.37)%1);g.beginPath();g.arc(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,5,0,7);g.fillStyle=C.ml;g.fill();}}
   pos.forEach((ly,i)=>ly.forEach(([x,y])=>{const a=A(p,i*.8);g.save();g.globalAlpha=a;g.beginPath();g.arc(x,y,22,0,7);g.fillStyle=C.surf;g.fill();g.strokeStyle=i===3?C.ml:C.sky;g.lineWidth=3;g.stroke();g.restore();}));
   ["entrées","couche cachée","couche cachée","sortie"].forEach((l,i)=>T(g,C,l,X[i],500,{al:"center",s:17,c:C.mute,a:A(p,i*.8)}));}},
  {d:10,cap:"Les IA comme Claude sont des réseaux géants, entraînés sur des milliards de phrases à deviner le mot suivant. Puis on recommence, mot après mot.",draw(g,C,p){T(g,C,"Ce soir, on mange du …",80,110,{s:36,f:DISP,w:700,a:A(p,0)});
   [["pondu",.48],["poisson",.27],["pain",.12],["riz",.08]].forEach(([w,v],i)=>{const y=200+i*68,a=A(p,1.2+i*.4);T(g,C,w,80,y,{s:24,w:700,a});g.save();g.globalAlpha=a;rr(g,240,y-18,560*v*A(p,1.2+i*.4,1.2)+2,36,8);g.fillStyle=i===0?C.ml:C.line;g.fill();g.restore();T(g,C,Math.round(v*100)+" %",250+560*v+16,y,{s:20,c:C.mute,a,f:MONO});});
   T(g,C,"Le modèle choisit un mot probable, l'ajoute, et recommence.",80,490,{s:21,c:C.mute,a:A(p,5.5)});}}
 ]}
};
function table(g,C,p){
  const cols=[["Poids (g)",190],["Couleur (0 à 10)",450],["Réponse",745]];cols.forEach(([h,x])=>T(g,C,h,x,90,{al:"center",s:20,w:800,c:C.mute,a:A(p,0)}));
  g.save();g.globalAlpha=A(p,0);g.strokeStyle=C.line;g.lineWidth=2;g.beginPath();g.moveTo(90,115);g.lineTo(870,115);g.stroke();g.restore();
  [0,5,1,6,2,7].forEach((fi,i)=>{const f=FRUITS[fi],y=155+i*52,a=A(p,.6+i*.5);T(g,C,String(f[0]),190,y,{al:"center",s:22,f:MONO,a});T(g,C,String(f[1]),450,y,{al:"center",s:22,f:MONO,a});tagLbl(g,C,f[2]==="M"?"mangue":"avocat",745,y,f[2]==="M"?"#d97a10":"#3c6a20",a);});
}
function errBox(g,C,e,a,n){if(a<=0)return;box(g,C,600,20,320,n?96:64,"",{a});T(g,C,"Erreur moyenne : "+Math.round(e).toLocaleString("fr-FR")+" FC",620,52,{s:21,w:800,c:e<200?C.ok:C.bad,a});if(n)T(g,C,"Essai n° "+n.toLocaleString("fr-FR"),620,88,{s:18,c:C.mute,a,f:MONO});}
function mystery(g,C,P,q,a,s=1){if(a<=0)return;g.save();g.globalAlpha=a;g.beginPath();g.arc(P.px(q[0]),P.py(q[1]),22*s,0,7);g.fillStyle=C.mute;g.fill();g.restore();T(g,C,"?",P.px(q[0]),P.py(q[1])+1,{al:"center",s:24,w:800,c:"#ffffff",a});}
function sizeCanvas(cv){const d=devicePixelRatio||1,w=cv.clientWidth||600;cv.width=Math.round(w*d);cv.height=Math.round(w*9/16*d);const g=cv.getContext("2d");g.setTransform(cv.width/VW,0,0,cv.width/VW,0,0);return g;}
/* Lecteur vidéo : anime les scènes, affiche les sous-titres et joue la bande-son. */
function mountVideo(el,id){
  const V=VIDEOS[id],debuts=[];let total=0;V.scenes.forEach(s=>{debuts.push(total);total+=s.d;});
  el.innerHTML=`<canvas aria-label="Animation : ${esc(V.title)}"></canvas><p class="vcap"></p><div class="vctl"><button type="button" class="btn small" data-play>▶ Regarder</button><div class="vbar" role="slider" tabindex="0" aria-label="Position de la vidéo" aria-valuemin="0" aria-valuemax="${total}"><i></i></div><span class="vtime"></span><button type="button" class="btn small ghost" data-son aria-pressed="true">Son activé</button></div>`;
  const cv=el.querySelector("canvas"),cap=el.querySelector(".vcap"),btn=el.querySelector("[data-play]"),btnSon=el.querySelector("[data-son]"),bar=el.querySelector(".vbar"),fillEl=bar.querySelector("i"),tm=el.querySelector(".vtime");
  const son=creerBandeSon();
  let g=sizeCanvas(cv),t=0,playing=false,last=0,sceneJouee=-1;
  const fmt=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;
  const sceneA=at=>{let i=0;while(i<V.scenes.length-1&&at>=debuts[i+1])i++;return i;};
  function frame(at){
    const i=sceneA(at),sc=V.scenes[i],p=at-debuts[i],C=CV();
    g.setTransform(cv.width/VW,0,0,cv.width/VW,0,0);g.fillStyle=C.bg;g.fillRect(0,0,VW,VH);
    try{sc.draw(g,C,p);}catch(e){console.error(e);}
    T(g,C,`${i+1} / ${V.scenes.length}`,VW-24,VH-22,{al:"right",s:15,c:C.mute,f:MONO,w:500});
    cap.textContent=sc.cap;fillEl.style.width=(at/total*100)+"%";tm.textContent=`${fmt(at)} / ${fmt(total)}`;bar.setAttribute("aria-valuenow",Math.round(at));
  }
  function rest(){frame(t>0?t:V.scenes[0].d-.01);if(t===0){fillEl.style.width="0%";tm.textContent=`0:00 / ${fmt(total)}`;}}
  function loop(now){
    if(!el.isConnected){playing=false;son.arreter();return;}
    if(!playing)return;
    const dt=Math.min(.1,(now-last)/1000);last=now;
    const i=sceneA(t),fin=i<V.scenes.length-1?debuts[i+1]:total;
    // Si la voix n'a pas fini sa phrase, l'image attend juste avant la scène suivante.
    t=(t+dt>=fin-.02&&son.parle())?Math.max(t,fin-.02):t+dt;
    if(t>=total){t=total;playing=false;btn.textContent="↺ Revoir";son.arreter();sceneJouee=-1;frame(total-.001);return;}
    const j=sceneA(t);if(j!==sceneJouee){sceneJouee=j;son.scene(j,V.scenes[j].cap);}
    frame(t);requestAnimationFrame(loop);
  }
  btn.onclick=()=>{
    if(playing){playing=false;btn.textContent="▶ Reprendre";son.pause();return;}
    if(t>=total)t=0;
    playing=true;btn.textContent="❚❚ Pause";last=performance.now();
    const j=sceneA(t);
    if(sceneJouee===j)son.reprendre(j,V.scenes[j].cap);else{sceneJouee=j;son.scene(j,V.scenes[j].cap);}
    requestAnimationFrame(loop);
  };
  btnSon.onclick=()=>{const a=son.basculer();btnSon.textContent=a?"Son activé":"Son coupé";btnSon.setAttribute("aria-pressed",String(a));};
  const seek=x=>{t=Math.max(0,Math.min(total-.01,x));const j=sceneA(t);if(playing&&j!==sceneJouee){sceneJouee=j;son.scene(j,V.scenes[j].cap);}else if(!playing)sceneJouee=-1;frame(t);};
  bar.onclick=e=>{const r=bar.getBoundingClientRect();seek((e.clientX-r.left)/r.width*total);};
  bar.onkeydown=e=>{if(e.key==="ArrowRight")seek(t+3);if(e.key==="ArrowLeft")seek(t-3);};
  new ResizeObserver(()=>{g=sizeCanvas(cv);playing?frame(t):rest();}).observe(cv);
  rest();
}
