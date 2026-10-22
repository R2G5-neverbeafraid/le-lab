/* Le Lab — exécution de Python dans le navigateur (Skulpt)
   Développé par 25 Labs */
"use strict";

function builtinRead(x){if(Sk.builtinFiles===undefined||Sk.builtinFiles.files[x]===undefined)throw "Fichier introuvable : "+x;return Sk.builtinFiles.files[x];}
async function runPy(code){
  if(typeof Sk==="undefined")return{out:"",err:"Le moteur Python n'a pas pu se charger. Vérifie ta connexion puis recharge la page."};
  let out="";
  Sk.configure({output:t=>{out+=t;},read:builtinRead,__future__:Sk.python3,execLimit:5000});
  try{await Sk.misceval.asyncToPromise(()=>Sk.importMainWithBody("<stdin>",false,code,true));return{out,err:null};}
  catch(e){return{out,err:String(e)};}
}
