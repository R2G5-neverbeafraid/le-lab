/* Le Lab — cours : sql
   Développé par 25 (TwentyFive) Labs */
"use strict";

L.sql={name:"SQL",color:"var(--sql)",tag:"Interroger des données",lessons:[
 {t:"SELECT et WHERE",th:`<p>Une base de données range les informations dans des <b>tables</b> (lignes et colonnes). Ici, la base de Peer-Learning a trois tables : <code>etudiants</code>, <code>tuteurs</code> et <code>seances</code>.</p>
<p><code>SELECT colonnes FROM table WHERE condition</code> lit des lignes. <code>*</code> veut dire toutes les colonnes. Les textes vont entre <b>apostrophes</b> : <code>WHERE promo = 'L1'</code>. On combine avec <code>AND</code> / <code>OR</code>.</p>`,
 ex:`SELECT nom, matiere FROM tuteurs WHERE etoiles > 4.5`,
 exos:[
  {id:"sql1a",type:"sql",title:"Les étudiants de L1",xp:15,p:`Affiche le <code>nom</code> et les <code>credits</code> de tous les étudiants de la promo <code>L1</code>.`,
   start:`SELECT \n`,sol:`SELECT nom, credits FROM etudiants WHERE promo = 'L1'`,hint:"SELECT nom, credits FROM etudiants WHERE ..."},
  {id:"sql1b",type:"sql",title:"Deux conditions",xp:15,p:`Affiche le <code>nom</code> des étudiants qui ont <b>60 crédits</b> <b>et</b> qui ne sont pas en L1 (<code>&lt;&gt;</code> veut dire « différent de »).`,
   start:`SELECT \n`,sol:`SELECT nom FROM etudiants WHERE credits = 60 AND promo <> 'L1'`,hint:"WHERE credits = 60 AND promo <> 'L1'"}
 ]},
 {t:"Trier et limiter",th:`<p><code>ORDER BY colonne</code> trie (croissant par défaut, <code>DESC</code> pour décroissant). <code>LIMIT n</code> garde les n premières lignes.</p>
<p>L'ordre d'écriture est toujours : <code>SELECT … FROM … WHERE … ORDER BY … LIMIT …</code></p>`,
 ex:`SELECT nom, credits FROM etudiants ORDER BY credits DESC`,
 exos:[
  {id:"sql2a",type:"sql",title:"Le podium des tuteurs",xp:20,p:`Affiche le <code>nom</code> et les <code>etoiles</code> des <b>3 tuteurs les mieux notés</b>, du meilleur au moins bon.`,
   start:`SELECT \n`,sol:`SELECT nom, etoiles FROM tuteurs ORDER BY etoiles DESC LIMIT 3`,ordered:true,hint:"ORDER BY etoiles DESC LIMIT 3"}
 ]},
 {t:"Compter et regrouper",th:`<p>Les <b>fonctions d'agrégat</b> résument plusieurs lignes en une valeur : <code>COUNT(*)</code>, <code>SUM()</code>, <code>AVG()</code>, <code>MIN()</code>, <code>MAX()</code>.</p>
<p><code>GROUP BY</code> fait un résumé <b>par groupe</b>. On renomme une colonne calculée avec <code>AS</code> :</p>
<pre class="code">SELECT promo, COUNT(*) AS nb FROM etudiants GROUP BY promo</pre>`,
 ex:`SELECT AVG(etoiles) AS moyenne FROM tuteurs`,
 exos:[
  {id:"sql3a",type:"sql",title:"Effectif par promo",xp:20,p:`Affiche chaque <code>promo</code> avec le <b>nombre d'étudiants</b> qu'elle contient.`,
   start:`SELECT \n`,sol:`SELECT promo, COUNT(*) AS nb FROM etudiants GROUP BY promo`,hint:"SELECT promo, COUNT(*) ... GROUP BY promo"},
  {id:"sql3b",type:"sql",title:"Moyenne de crédits en L1",xp:20,p:`Affiche la <b>moyenne des crédits</b> des étudiants de L1 (une seule valeur).`,
   start:`SELECT \n`,sol:`SELECT AVG(credits) AS moyenne FROM etudiants WHERE promo = 'L1'`,hint:"AVG(credits) avec un WHERE."}
 ]},
 {t:"Jointures",th:`<p>La table <code>seances</code> ne contient pas de noms, seulement <code>etudiant_id</code> et <code>tuteur_id</code>. Ce sont des <b>clés étrangères</b> : elles pointent vers l'<code>id</code> d'une autre table.</p>
<p><code>JOIN … ON …</code> recolle les tables. On donne des alias courts pour s'y retrouver :</p>
<pre class="code">SELECT e.nom, s.duree
FROM seances s
JOIN etudiants e ON e.id = s.etudiant_id</pre>
<p>C'est le cœur de toute plateforme qui met en relation des étudiants et des tuteurs.</p>`,
 ex:`SELECT e.nom, s.duree
FROM seances s
JOIN etudiants e ON e.id = s.etudiant_id`,
 exos:[
  {id:"sql4a",type:"sql",title:"Qui a vu qui ?",xp:25,p:`Pour chaque séance, affiche le <b>nom de l'étudiant</b>, le <b>nom du tuteur</b> et la <code>duree</code>. Il faut deux <code>JOIN</code>. Les deux colonnes s'appellent <code>nom</code> : renomme-les avec <code>AS</code> pour ne pas les confondre.`,
   start:`SELECT e.nom AS etudiant, t.nom AS tuteur, s.duree\nFROM seances s\n`,sol:`SELECT e.nom AS etudiant, t.nom AS tuteur, s.duree FROM seances s JOIN etudiants e ON e.id = s.etudiant_id JOIN tuteurs t ON t.id = s.tuteur_id`,
   hint:"JOIN etudiants e ON e.id = s.etudiant_id puis JOIN tuteurs t ON t.id = s.tuteur_id"},
  {id:"sql4b",type:"sql",title:"Temps de tutorat par étudiant",xp:30,p:`Affiche le <b>nom de chaque étudiant</b> qui a eu des séances, avec le <b>total de minutes</b> (<code>SUM(s.duree)</code>).`,
   start:`SELECT e.nom, SUM(s.duree) AS total\nFROM seances s\n`,sol:`SELECT e.nom, SUM(s.duree) AS total FROM seances s JOIN etudiants e ON e.id = s.etudiant_id GROUP BY e.nom`,
   hint:"Un JOIN vers etudiants, puis GROUP BY e.nom."},
  {id:"sql4c",type:"qcm",title:"Modifier des données",xp:10,p:"Rahel vient de valider une UE de 6 crédits. Quelle requête met sa ligne à jour ?",
   opts:["UPDATE etudiants SET credits = credits + 6 WHERE nom = 'Rahel'","UPDATE etudiants SET credits = credits + 6","INSERT INTO etudiants (credits) VALUES (6)","SELECT credits + 6 FROM etudiants WHERE nom = 'Rahel'"],a:0,
   why:"UPDATE … SET modifie. Sans WHERE, la modification touche toutes les lignes de la table : c'est l'erreur la plus dangereuse en SQL."}
 ]}
]};
