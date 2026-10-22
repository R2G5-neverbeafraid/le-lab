/* Le Lab — devoirs
   Développé par 25 Labs */
"use strict";

const DEVOIRS=[
 {id:"d1",lang:"py",date:"2026-10-28",titre:"Calculateur de crédits LMD",
  txt:"Un script Python qui demande au clavier (input) les notes de 5 UE, puis affiche la moyenne, les crédits obtenus (6 par UE validée à 10 ou plus) et le statut du semestre.",
  checks:["Une fonction moyenne(notes) et une fonction statut(credits)","Les notes sont lues avec input() et converties avec float()","Une boucle for qui compte les UE validées","Un affichage propre avec des f-strings","Testé avec au moins 3 jeux de notes différents"]},
 {id:"d2",lang:"css",date:"2026-11-04",titre:"La grille des tuteurs, version responsive",
  txt:"Construis la page « Nos tuteurs » d'une plateforme Peer-Learning et fais toute la mise en page des cartes à la main : 3 colonnes sur ordinateur, 2 sur tablette, 1 sur téléphone.",
  checks:["box-sizing: border-box sur tous les éléments","Cartes avec padding, bordure et coins arrondis","Avatar et nom alignés avec Flexbox","Grille CSS avec repeat() et gap","Deux media queries (tablette et téléphone), testées en réduisant la fenêtre"]},
 {id:"d3",lang:"js",date:"2026-11-11",titre:"Un quiz qui se mélange à chaque partie",
  txt:"Construis un quiz de culture web d'au moins 20 questions qui se régénère : à chaque nouvelle partie, 10 questions tirées au hasard, dans un ordre différent.",
  checks:["Les questions sont un tableau d'objets {texte, choix, bonne}","Une fonction melanger(tableau) (algorithme de Fisher-Yates)","Bouton « Rejouer » branché avec addEventListener","Score calculé avec une fonction séparée","Meilleur score gardé dans localStorage"]},
 {id:"d4",lang:"sql",date:"2026-11-18",titre:"La base de données Peer-Learning",
  txt:"Dans MySQL (XAMPP / phpMyAdmin) ou SQLite, crée la vraie base du projet : étudiants, tuteurs, séances. Remplis-la et écris les requêtes dont le site aurait besoin.",
  checks:["Trois tables avec clé primaire et clés étrangères","Au moins 8 lignes par table (INSERT)","Une requête avec WHERE et ORDER BY","Une requête avec GROUP BY et COUNT ou SUM","Une requête avec deux JOIN","Le tout enregistré dans un fichier peer_learning.sql"]},
 {id:"d5",lang:"php",date:"2026-11-25",titre:"Le formulaire de contact côté serveur",
  txt:"Un formulaire de contact qui valide seulement dans le navigateur ne protège rien. Fais-le traiter par PHP : vérification des champs sur le serveur, puis enregistrement dans la base du devoir 4.",
  checks:["Formulaire en method=\"post\"","Vérification des champs vides et de l'email avec filter_var()","Enregistrement avec PDO et une requête préparée","Affichage sécurisé avec htmlspecialchars()","Une page qui liste les messages reçus"]},
 {id:"d6",lang:"dev",date:"2026-12-09",titre:"Projet final : Peer-Learning dynamique",
  txt:"Assemble tout : la liste des tuteurs vient de la base (PHP + SQL), on la filtre en direct (JavaScript), elle est mise en forme proprement (CSS), et un script Python produit un petit rapport de statistiques à partir d'un export CSV.",
  checks:["tuteurs.php lit les tuteurs depuis MySQL","Champ de recherche qui filtre les cartes sans recharger (JS)","Mise en page responsive (CSS du devoir 2)","Export CSV des séances","rapport.py : minutes de tutorat par tuteur et par étudiant","Un README qui explique comment lancer le projet"]}
];
const LANGINFO={...Object.fromEntries(ORDER.map(k=>[k,{name:L[k].name,color:L[k].color}])),dev:{name:"Projet final",color:"var(--dev)"}};
