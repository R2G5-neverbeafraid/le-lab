/* Le Lab — cours : machine-learning
   Développé par 25 Labs */
"use strict";

L.ml={name:"Machine Learning",color:"var(--ml)",tag:"Expliqué simplement, de A à Z",lessons:[
 {t:"C'est quoi le machine learning ?",video:"v1",th:`<p>Quand tu étais petit, personne ne t'a donné une liste de règles pour reconnaître un chat (« quatre pattes, des moustaches, une queue… »). On t'a montré des chats, plein de chats, en disant « ça, c'est un chat ». Et un jour, tu as su le reconnaître tout seul, même un chat que tu n'avais jamais vu.</p>
<p>Le <b>machine learning</b> (en français : <b>apprentissage automatique</b>), c'est faire exactement pareil avec un ordinateur. Au lieu de lui écrire les règles, on lui montre des <b>exemples avec la bonne réponse</b>, et il trouve la règle tout seul.</p>
<ul><li><b>Programmation classique</b> : tu écris les règles, l'ordinateur donne les réponses.</li><li><b>Machine learning</b> : tu donnes des exemples et leurs réponses, l'ordinateur fabrique la règle.</li></ul>
<p>Tu t'en sers tous les jours sans le savoir : le filtre anti-spam de ta boîte mail, les vidéos qu'on te propose, le déverrouillage du téléphone avec ton visage, la traduction automatique, et les assistants comme Claude ou ChatGPT.</p>`,
 exos:[
  {id:"ml1a",type:"qcm",title:"Repérer le machine learning",xp:10,p:"Lequel de ces programmes utilise du machine learning ?",
   opts:["Un filtre anti-spam qui a appris à partir de milliers d'e-mails marqués « spam » ou « pas spam »","Une calculatrice qui fait 2 + 2","Une page web qui affiche la date du jour","Un programme dont toutes les règles ont été écrites à la main"],a:0,
   why:"Le filtre a appris à partir d'exemples étiquetés. Les autres suivent des règles écrites par un humain."},
  {id:"ml1b",type:"qcm",title:"Ce qu'on donne à la machine",xp:10,p:"En machine learning, qu'est-ce qu'on donne à l'ordinateur pour qu'il apprenne ?",
   opts:["Des exemples avec les bonnes réponses","La liste complète des règles","Rien, il devine tout seul","Un processeur plus rapide"],a:0,
   why:"Des exemples et leurs réponses : c'est à partir d'eux que la machine construit sa règle."}
 ]},
 {t:"Les données, la nourriture de la machine",video:"v2",th:`<p>Une machine apprend avec des <b>données</b>, comme toi avec des exercices. Les données ressemblent à un tableau :</p>
<ul><li>chaque <b>ligne</b> est un exemple (ici, un fruit) ;</li><li>chaque <b>colonne</b> est une mesure sur cet exemple.</li></ul>
<p>Les colonnes qu'on mesure s'appellent les <b>caractéristiques</b> (en anglais <i>features</i>) : le poids, la couleur. La colonne avec la bonne réponse s'appelle l'<b>étiquette</b> (en anglais <i>label</i>) : mangue ou avocat.</p>
<p>Deux règles d'or. Plus il y a d'exemples, et plus ils sont variés, mieux la machine apprend. Et si les exemples sont faux, la machine apprend des bêtises : les informaticiens disent <i>garbage in, garbage out</i>, « des déchets en entrée, des déchets en sortie ».</p>`,
 exos:[
  {id:"ml2a",type:"qcm",title:"Trouver l'étiquette",xp:10,p:"On veut prédire si un étudiant va valider son année. On a : ses heures de révision, sa présence en cours, ses notes du premier semestre, et s'il a validé ou non. Quelle colonne est l'<b>étiquette</b> ?",
   opts:["S'il a validé ou non","Ses heures de révision","Sa présence en cours","Ses notes du premier semestre"],a:0,
   why:"L'étiquette est la réponse qu'on veut apprendre à prédire. Les trois autres colonnes sont des caractéristiques."},
  {id:"ml2b",type:"qcm",title:"Des déchets en entrée",xp:10,p:"Dans les exemples d'entraînement, plein d'avocats ont été étiquetés « mangue » par erreur. Que va-t-il se passer ?",
   opts:["La machine apprend ces erreurs et va aussi confondre les avocats avec des mangues","La machine corrige toute seule les erreurs","Rien, les erreurs n'ont pas d'importance","La machine refuse d'apprendre"],a:0,
   why:"La machine ne sait pas que les étiquettes sont fausses. Elle fait confiance aux exemples qu'on lui donne."}
 ]},
 {t:"Apprendre, c'est se tromper de moins en moins",video:"v3",th:`<p>Prenons un exemple concret : deviner le <b>prix d'une course en taxi-moto</b> selon la distance. On a noté plusieurs courses : 1 km, 2 km, 3 km… et leur prix.</p>
<p>La machine cherche une droite qui passe au plus près des points : <code>prix = a × distance + b</code>. Ici, <code>a</code> est le prix de chaque kilomètre et <code>b</code> le prix de départ.</p>
<p>Au début, elle choisit <code>a</code> et <code>b</code> un peu au hasard, et elle se trompe beaucoup. Elle calcule son <b>erreur moyenne</b> : en moyenne, de combien ses prédictions sont loin des vrais prix. Puis elle bouge un tout petit peu <code>a</code> et <code>b</code> dans le sens qui fait baisser l'erreur, et elle recommence, des milliers de fois.</p>
<p>Cette méthode s'appelle la <b>descente de gradient</b>. Imagine que tu descends une colline dans le brouillard : tu ne vois pas le bas, mais tu sens la pente sous tes pieds et tu fais un pas vers le bas, encore et encore. Prédire un nombre (un prix, une température, une note) s'appelle une <b>régression</b>.</p>`,
 exos:[
  {id:"ml3a",type:"fit",title:"Entraîne le modèle toi-même",xp:25,p:"Tu es la machine. Bouge les deux curseurs pour que la droite passe au plus près des courses. Objectif : une erreur moyenne de <b>150 FC ou moins</b>."},
  {id:"ml3b",type:"code",title:"Calculer l'erreur moyenne en Python",xp:25,
   p:`Écris <code>erreur_moyenne(points, a, b)</code>. <code>points</code> est une liste de couples <code>(distance, prix)</code>. Pour chaque course, la prédiction vaut <code>a * distance + b</code> ; l'erreur est l'écart en valeur absolue (<code>abs()</code>) avec le vrai prix. Renvoie la moyenne des erreurs, arrondie à 1 décimale.`,
   start:`def erreur_moyenne(points, a, b):\n    total = 0\n    for distance, prix in points:\n        # calcule la prédiction et ajoute l'écart à total\n        pass\n    return 0\n`,
   tests:`courses = [(1, 1500), (2, 2000), (3, 2600)]\nprint(erreur_moyenne(courses, 500, 1000))\nprint(erreur_moyenne(courses, 0, 0))`,expected:`33.3\n2033.3`,
   hint:"Dans la boucle : prediction = a * distance + b, puis total += abs(prix - prediction). À la fin : return round(total / len(points), 1).",
   sol:`def erreur_moyenne(points, a, b):\n    total = 0\n    for distance, prix in points:\n        prediction = a * distance + b\n        total += abs(prix - prediction)\n    return round(total / len(points), 1)`}
 ]},
 {t:"Classer : demander aux voisins",video:"v4",th:`<p>Parfois, on ne veut pas prédire un nombre mais une <b>catégorie</b> : mangue ou avocat, spam ou pas spam, chat ou chien. Ça s'appelle la <b>classification</b>.</p>
<p>La méthode la plus simple du monde s'appelle <b>k plus proches voisins</b> (<i>k-NN</i>). Un nouveau fruit arrive ? On le place sur le graphique, on regarde les <code>k</code> exemples les plus proches de lui, et ils votent. La majorité gagne.</p>
<p>On prend souvent <code>k = 3</code> ou <code>k = 5</code> : un nombre impair, pour qu'il n'y ait jamais d'égalité entre deux catégories. La « proximité », c'est la distance à vol d'oiseau, calculée avec le théorème de Pythagore : <code>√(dx² + dy²)</code>.</p>
<p>C'est la même idée que les recommandations : « les gens qui aiment ce que tu aimes ont aussi aimé… ».</p>`,
 exos:[
  {id:"ml4a",type:"knn",title:"Joue avec les voisins",xp:20,p:"Touche le graphique pour placer un fruit mystère : ses 3 plus proches voisins votent. Pour réussir, trouve un endroit où il est classé <b>mangue</b> et un autre où il est classé <b>avocat</b>."},
  {id:"ml4b",type:"code",title:"Le plus proche voisin en Python",xp:25,
   p:`Écris <code>plus_proche(point, exemples)</code>. <code>point</code> est un couple <code>(x, y)</code> ; <code>exemples</code> est une liste de <code>(x, y, etiquette)</code>. Renvoie l'étiquette de l'exemple le plus proche. Astuce : pas besoin de racine carrée pour comparer, <code>dx*dx + dy*dy</code> suffit.`,
   start:`def plus_proche(point, exemples):\n    meilleure_distance = None\n    meilleure_etiquette = None\n    # parcours les exemples\n    return meilleure_etiquette\n`,
   tests:`ex = [(1, 1, "avocat"), (8, 9, "mangue"), (2, 3, "avocat")]\nprint(plus_proche((7, 7), ex))\nprint(plus_proche((1, 2), ex))`,expected:`mangue\navocat`,
   hint:"Pour chaque (x, y, etiquette) : d = (x - point[0])**2 + (y - point[1])**2 ; si meilleure_distance est None ou d < meilleure_distance, on garde d et etiquette.",
   sol:`def plus_proche(point, exemples):\n    meilleure_distance = None\n    meilleure_etiquette = None\n    for x, y, etiquette in exemples:\n        d = (x - point[0]) ** 2 + (y - point[1]) ** 2\n        if meilleure_distance is None or d < meilleure_distance:\n            meilleure_distance = d\n            meilleure_etiquette = etiquette\n    return meilleure_etiquette`},
  {id:"ml4c",type:"qcm",title:"Pourquoi k impair ?",xp:10,p:"Pourquoi choisit-on souvent un nombre impair de voisins, comme 3 ou 5, quand il y a deux catégories ?",
   opts:["Pour éviter les égalités au moment du vote","Parce que les ordinateurs n'aiment pas les nombres pairs","Pour aller plus vite","Ça n'a aucune importance"],a:0,why:"Avec 4 voisins, on peut avoir 2 mangues contre 2 avocats. Avec 3, il y a toujours une majorité."}
 ]},
 {t:"Entraînement, test et pièges",video:"v5",th:`<p>Comment savoir si la machine a vraiment appris ? Exactement comme à l'école : avec un examen qu'elle n'a jamais vu.</p>
<p>On coupe les données en deux. Environ 80 % servent à l'<b>entraînement</b> ; les 20 % restants sont cachés et servent au <b>test</b> à la fin. Si un prof donnait les sujets de l'examen à l'avance, une bonne note ne prouverait rien.</p>
<p>Trois pièges à connaître :</p>
<ul><li><b>Le surapprentissage</b> : le modèle apprend les exemples par cœur, jusqu'aux petites erreurs. Parfait à l'entraînement, nul au test.</li><li><b>Le sous-apprentissage</b> : le modèle est trop simple pour saisir la tendance. Mauvais partout.</li><li><b>Le biais</b> : si les exemples ne représentent pas tout le monde, le modèle sera injuste. Un système de reconnaissance de visages entraîné surtout sur des visages à peau claire fonctionne moins bien sur les peaux foncées. Ce problème a été mesuré sur de vrais systèmes commerciaux.</li></ul>`,
 exos:[
  {id:"ml5a",type:"qcm",title:"Par cœur",xp:10,p:"Un modèle a 100 % de bonnes réponses sur ses données d'entraînement, mais seulement 55 % sur le test. Que se passe-t-il ?",
   opts:["Il a appris par cœur au lieu de comprendre : c'est du surapprentissage","Il est parfait, le test est mal fait","Il n'a pas assez de neurones, c'est tout","C'est normal, il faut toujours 100 % à l'entraînement"],a:0,
   why:"Un grand écart entre l'entraînement et le test est le signe classique du surapprentissage."},
  {id:"ml5b",type:"qcm",title:"Le biais",xp:10,p:"Une application de diagnostic de maladies de peau a été entraînée presque uniquement avec des photos de peaux claires. Que risque-t-il d'arriver à Kinshasa ?",
   opts:["Elle se trompera plus souvent, car elle a peu vu de peaux foncées","Rien, la couleur de peau ne change rien pour une machine","Elle sera plus précise","Elle refusera de fonctionner"],a:0,
   why:"Un modèle n'est bon que sur le genre d'exemples qu'il a vus. Des données variées sont une question de qualité et de justice."}
 ]},
 {t:"Neurones, réseaux et IA d'aujourd'hui",video:"v6",th:`<p>Un <b>neurone artificiel</b> est une toute petite calculatrice. Il reçoit des nombres, multiplie chacun par un <b>poids</b> (son importance), additionne le tout, et s'« allume » (donne 1) si la somme dépasse un <b>seuil</b>. Sinon il donne 0. Apprendre, pour un neurone, c'est régler ses poids.</p>
<p>Un neurone seul ne sait pas faire grand-chose. Mais on en empile des milliers, puis des millions, en <b>couches</b> : c'est un <b>réseau de neurones</b>. Quand il y a beaucoup de couches, on parle de <b>deep learning</b> (apprentissage profond).</p>
<p>Les IA qui écrivent, comme Claude, sont des réseaux géants entraînés sur d'énormes quantités de texte avec une tâche toute simple : <b>deviner le mot suivant</b>. À force de le faire sur des milliards d'exemples, le réseau finit par capter la grammaire, des faits, et des façons de raisonner.</p>
<p><b>Et maintenant ?</b> Le chemin classique : Python solide, puis <code>numpy</code> et <code>pandas</code> pour manipuler les données, puis <code>scikit-learn</code> pour tes premiers modèles. Voici le k-NN de la leçon 4 en vrai scikit-learn (à lancer sur ton ordinateur) :</p>
<pre class="code">from sklearn.neighbors import KNeighborsClassifier

X = [[300, 9], [200, 2], [280, 8], [230, 3]]   # poids, couleur
y = ["mangue", "avocat", "mangue", "avocat"]  # étiquettes

modele = KNeighborsClassifier(n_neighbors=3)
modele.fit(X, y)                     # l'entraînement
print(modele.predict([[265, 6]]))    # ['mangue']</pre>
<p>Ensuite, le site Kaggle propose des jeux de données gratuits et des compétitions pour débutants.</p>`,
 exos:[
  {id:"ml6a",type:"code",title:"Code ton premier neurone",xp:25,
   p:`Écris <code>neurone(entrees, poids, seuil)</code> : multiplie chaque entrée par son poids, additionne, et renvoie <code>1</code> si la somme est supérieure ou égale au seuil, sinon <code>0</code>.`,
   start:`def neurone(entrees, poids, seuil):\n    somme = 0\n    # utilise range(len(entrees)) pour avoir les index\n    return 0\n`,
   tests:`print(neurone([1, 0, 1], [0.5, 0.9, 0.4], 0.8))\nprint(neurone([0, 1, 0], [0.5, 0.2, 0.4], 0.8))\nprint(neurone([2, 1], [0.25, 0.5], 1.0))`,expected:`1\n0\n1`,
   hint:"for i in range(len(entrees)): somme += entrees[i] * poids[i] ; puis if somme >= seuil: return 1.",
   sol:`def neurone(entrees, poids, seuil):\n    somme = 0\n    for i in range(len(entrees)):\n        somme += entrees[i] * poids[i]\n    if somme >= seuil:\n        return 1\n    return 0`},
  {id:"ml6b",type:"qcm",title:"Comment apprend une IA qui écrit ?",xp:10,p:"Quelle est la tâche de base avec laquelle on entraîne un grand modèle de langage comme Claude ?",
   opts:["Deviner le mot suivant d'un texte, sur des milliards d'exemples","Apprendre un dictionnaire par cœur","Copier des réponses écrites par des humains pour chaque question possible","Chercher sur Google à chaque fois"],a:0,
   why:"La prédiction du mot suivant, répétée à une échelle énorme, est la base. D'autres étapes d'entraînement viennent ensuite affiner son comportement."}
 ]}
]};
