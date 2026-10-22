/* Le Lab — cours : php
   Développé par 25 (TwentyFive) Labs */
"use strict";

L.php={name:"PHP",color:"var(--php)",tag:"Le code côté serveur",lessons:[
 {t:"Syntaxe et variables",th:`<p>PHP s'exécute sur le <b>serveur</b>, avant que la page arrive dans le navigateur. Le visiteur ne voit jamais ton code PHP, seulement le HTML qu'il produit. Pour pratiquer chez toi : installe <b>XAMPP</b>, ou lance <code>php -S localhost:8000</code> dans ton dossier.</p>
<p>Le code se place entre <code>&lt;?php</code> et <code>?&gt;</code>. Les variables commencent toujours par <code>$</code>. Chaque instruction finit par <code>;</code>.</p>
<p>On colle des textes avec le <b>point</b> <code>.</code> (pas le +). Entre guillemets doubles, les variables sont remplacées : <code>"Salut $nom"</code>. Entre apostrophes, non.</p>`,
 ex:`<?php
$nom = "RG";
$credits = 30;
echo "Bonjour $nom<br>";
echo 'Bonjour $nom<br>';
echo "Crédits : " . ($credits * 2);
?>`,out:`Bonjour RG
Bonjour $nom
Crédits : 60`,
 exos:[
  {id:"php1a",type:"predict",title:"Lis le code",xp:10,code:`<?php\n$ue = 5;\n$par_ue = 6;\necho "Total : " . $ue * $par_ue . " crédits";\n?>`,p:"Qu'affiche ce script ?",answers:["Total : 30 crédits"],hint:"Le point colle les morceaux ; la multiplication passe avant."},
  {id:"php1b",type:"qcm",title:"Guillemets",xp:10,p:`Avec <code>$prenom = "RG";</code>, quelle ligne affiche <code>Salut RG</code> ?`,opts:[`echo "Salut $prenom";`,`echo 'Salut $prenom';`,`echo "Salut " + $prenom;`,`print(Salut, $prenom);`],a:0,why:"Seuls les guillemets doubles remplacent les variables. En PHP, + additionne des nombres ; pour du texte, c'est le point."}
 ]},
 {t:"Conditions et boucles",th:`<p>Les conditions ressemblent au JavaScript : <code>if (...) { } elseif (...) { } else { }</code> (attention, <code>elseif</code> s'écrit en un mot).</p>
<p>La boucle reine de PHP est <code>foreach</code>, pour parcourir un tableau :</p>
<pre class="code">foreach ($cours as $c) { echo $c; }
foreach ($cours as $i => $c) { echo "$i : $c"; }</pre>`,
 ex:`<?php
$notes = [12, 8, 15];
foreach ($notes as $n) {
  if ($n >= 10) { echo "$n OK "; }
  else { echo "$n KO "; }
}
?>`,out:`12 OK 8 KO 15 OK`,
 exos:[
  {id:"php2a",type:"predict",title:"foreach avec index",xp:15,code:`<?php\n$cours = ["HTML", "CSS", "JS"];\nforeach ($cours as $i => $c) {\n  echo $i . "-" . $c . " ";\n}\n?>`,p:"Qu'affiche ce script ? (ignore l'espace final)",answers:["0-HTML 1-CSS 2-JS"],hint:"Les index d'un tableau commencent à 0."}
 ]},
 {t:"Tableaux et fonctions",th:`<p>Deux sortes de tableaux :</p>
<ul><li>indexé : <code>$notes = [12, 15, 9];</code> → <code>$notes[0]</code></li><li>associatif (comme un dictionnaire Python) : <code>$t = ["nom" =&gt; "Prisca", "matiere" =&gt; "Python"];</code> → <code>$t["nom"]</code></li></ul>
<p>Fonctions utiles : <code>count()</code>, <code>array_sum()</code>, <code>in_array()</code>, <code>strtoupper()</code>. On écrit les siennes avec <code>function nom($param) { return ...; }</code>.</p>`,
 ex:`<?php
function moyenne($notes) {
  return array_sum($notes) / count($notes);
}
$tuteur = ["nom" => "Prisca", "matiere" => "Python"];
echo $tuteur["nom"] . " : " . moyenne([12, 16]);
?>`,out:`Prisca : 14`,
 exos:[
  {id:"php3a",type:"fill",title:"Complète la fonction",xp:15,code:`function moyenne($notes) {\n  return array_sum($notes) / ______($notes);\n}`,p:"Quel mot remplace les tirets pour obtenir le nombre de notes ?",answers:["count"],hint:"C'est l'équivalent de len() en Python."},
  {id:"php3b",type:"fill",title:"Lire un tableau associatif",xp:15,code:`$tuteur = ["nom" => "Prisca", "matiere" => "Python"];\necho $tuteur[______];   // doit afficher Python`,p:"Qu'écris-tu entre les crochets ?",answers:['"matiere"',"'matiere'"],hint:"La clé est un texte, donc entre guillemets."}
 ]},
 {t:"Formulaires et base de données",th:`<p>Quand un formulaire est envoyé, PHP récupère les champs dans <code>$_POST</code> (méthode post, données invisibles dans l'URL) ou <code>$_GET</code> (données visibles dans l'URL, pour une recherche par exemple).</p>
<p>Deux règles de sécurité non négociables :</p>
<ul><li>Pour <b>afficher</b> une donnée tapée par un visiteur : <code>htmlspecialchars($texte)</code>, sinon il peut injecter du HTML ou du JavaScript.</li><li>Pour l'<b>envoyer en SQL</b> : une requête préparée avec PDO. Jamais de concaténation de texte dans une requête.</li></ul>`,
 ex:`<?php
$pdo = new PDO("mysql:host=localhost;dbname=peer", "root", "");
$req = $pdo->prepare("INSERT INTO messages (nom, texte) VALUES (?, ?)");
$req->execute([$_POST["nom"], $_POST["texte"]]);
echo "Merci " . htmlspecialchars($_POST["nom"]);
?>`,out:`Merci Grace`,
 exos:[
  {id:"php4a",type:"qcm",title:"Pourquoi préparer ?",xp:10,p:"Pourquoi utiliser <code>prepare()</code> et <code>execute()</code> plutôt que coller <code>$_POST[\"nom\"]</code> dans la requête ?",
   opts:["Pour empêcher les injections SQL : les données ne sont jamais lues comme du code SQL","Parce que c'est plus rapide à écrire","Parce que MySQL refuse les autres requêtes","Pour chiffrer le mot de passe"],a:0,why:"Un visiteur pourrait taper du SQL dans le champ « nom ». Avec une requête préparée, sa saisie reste une simple valeur."},
  {id:"php4b",type:"qcm",title:"GET ou POST ?",xp:10,p:"Ton formulaire de contact envoie un nom et un message à enregistrer. Quelle méthode choisir ?",
   opts:["POST : on modifie des données et rien ne doit apparaître dans l'URL","GET : c'est la méthode par défaut","GET : c'est plus sécurisé","Peu importe"],a:0,why:"GET sert à lire (recherche, filtres). POST sert à envoyer ou modifier des données."}
 ]}
]};
