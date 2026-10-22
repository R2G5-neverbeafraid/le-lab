/* Le Lab — labos interactifs du module Machine Learning
   Développé par 25 Labs */
"use strict";

function bindFit(box,x,setV,gain){
  const cv=box.querySelector("[data-cv]"),ia=box.querySelector("[data-a]"),ib=box.querySelector("[data-b]");
  let g=sizeCanvas(cv);
  const draw=()=>{const a=+ia.value,b=+ib.value,C=CV();box.querySelector("[data-av]").textContent=a;box.querySelector("[data-bv]").textContent=b.toLocaleString("fr-FR");
    g.setTransform(cv.width/VW,0,0,cv.width/VW,0,0);g.fillStyle=C.bg;g.fillRect(0,0,VW,VH);const P=plot(g,C,TPLOT);regScene(g,C,P,a,b);errBox(g,C,mae(a,b),1);
    if(mae(a,b)<=150&&!box.classList.contains("done")){setV(box,true,`Bravo ! Avec a = ${a} et b = ${b}, ton modèle se trompe de ${Math.round(mae(a,b))} FC en moyenne. C'est exactement ce que fait la machine, mais toute seule et très vite.`);gain(x.id,x.xp);}};
  ia.oninput=ib.oninput=draw;new ResizeObserver(()=>{g=sizeCanvas(cv);draw();}).observe(cv);draw();
}
function bindKnn(box,x,setV,gain){
  const cv=box.querySelector("[data-cv]"),info=box.querySelector("[data-info]"),got=new Set();let g=sizeCanvas(cv),q=null;
  const draw=()=>{const C=CV();g.setTransform(cv.width/VW,0,0,cv.width/VW,0,0);g.fillStyle=C.bg;g.fillRect(0,0,VW,VH);const P=plot(g,C,FPLOT);
    if(q){const nb=knn(q);nb.forEach(n=>{g.save();g.setLineDash([6,6]);g.strokeStyle=C.ink;g.lineWidth=2.5;g.beginPath();g.moveTo(P.px(q[0]),P.py(q[1]));g.lineTo(P.px(n.f[0]),P.py(n.f[1]));g.stroke();g.restore();});}
    FRUITS.forEach(f=>fruit(g,f[2],P.px(f[0]),P.py(f[1]),18,1));
    if(q){const nb=knn(q),m=nb.filter(n=>n.f[2]==="M").length,win=m>=2?"M":"A";fruit(g,win,P.px(q[0]),P.py(q[1]),26,1);g.save();g.strokeStyle=C.ink;g.lineWidth=3;g.beginPath();g.arc(P.px(q[0]),P.py(q[1]),34,0,7);g.stroke();g.restore();
      info.textContent=`Ses 3 voisins : ${m} mangue(s), ${3-m} avocat(s). Verdict : ${win==="M"?"mangue":"avocat"}.`;got.add(win);}
    else T(g,C,"Touche le graphique pour placer le fruit mystère",480,40,{al:"center",s:20,c:C.mute});};
  cv.addEventListener("click",e=>{const r=cv.getBoundingClientRect(),lx=(e.clientX-r.left)/r.width*VW,ly=(e.clientY-r.top)/r.height*VH;
    const o=FPLOT,X=o.xmin+(lx-o.x0)/o.w*(o.xmax-o.xmin),Y=o.ymin+(o.y0-ly)/o.h*(o.ymax-o.ymin);
    q=[Math.max(o.xmin,Math.min(o.xmax,X)),Math.max(o.ymin,Math.min(o.ymax,Y))];draw();
    if(got.size===2&&!box.classList.contains("done")){setV(box,true,"Bravo ! Tu as vu les deux verdicts. Remarque : près de la frontière entre les groupes, un petit déplacement suffit à changer le vote.");gain(x.id,x.xp);}});
  new ResizeObserver(()=>{g=sizeCanvas(cv);draw();}).observe(cv);draw();
}
