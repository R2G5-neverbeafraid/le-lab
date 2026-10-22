/* Le Lab — exécution de JavaScript
   Développé par 25 (TwentyFive) Labs */
"use strict";

function fmtJS(v){if(typeof v==="string")return v;try{return JSON.stringify(v);}catch(e){return String(v);}}
async function runJS(code){
  const logs=[];const c={log:(...a)=>logs.push(a.map(fmtJS).join(" ")),error:(...a)=>logs.push(a.map(fmtJS).join(" ")),warn:(...a)=>logs.push(a.map(fmtJS).join(" "))};
  try{new Function("console",code)(c);return{out:logs.join("\n"),err:null};}
  catch(e){return{out:logs.join("\n"),err:e.name+" : "+e.message};}
}
