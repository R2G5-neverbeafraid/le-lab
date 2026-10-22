/* Le Lab — effets : notification et confettis
   Développé par 25 (TwentyFive) Labs */
"use strict";

let tt;function toast(m){const t=$("toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("on"),1800);}
function confetti(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const c=$("confetti"),g=c.getContext("2d"),d=devicePixelRatio||1;c.width=innerWidth*d;c.height=innerHeight*d;
  const cs=getComputedStyle(document.documentElement),cols=["--py","--js","--css","--sql","--php","--dev"].map(v=>cs.getPropertyValue(v).trim());
  const P=Array.from({length:90},()=>({x:c.width/2,y:c.height*.75,vx:(Math.random()-.5)*16*d,vy:(-Math.random()*16-6)*d,s:(4+Math.random()*5)*d,c:cols[Math.floor(Math.random()*cols.length)],r:Math.random()*6}));
  let f=0;(function tick(){g.clearRect(0,0,c.width,c.height);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.55*d;p.r+=.2;g.save();g.translate(p.x,p.y);g.rotate(p.r);g.fillStyle=p.c;g.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);g.restore();});if(++f<70)requestAnimationFrame(tick);else g.clearRect(0,0,c.width,c.height);})();
}
