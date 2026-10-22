/* Le Lab — cours : python
   Développé par 25 Labs */
"use strict";

L.py={name:"Python",color:"var(--py)",tag:"Logique, calculs, scripts",lessons:[
 {t:"Variables, types et affichage",th:`<p>Une <b>variable</b> est une étiquette posée sur une valeur. Python devine le type tout seul :</p>
<ul><li><code>int</code> : nombre entier, <code>42</code></li><li><code>float</code> : nombre à virgule, <code>12.5</code></li><li><code>str</code> : texte, <code>"RG"</code></li><li><code>bool</code> : <code>True</code> ou <code>False</code></li></ul>
<p>Pour mélanger texte et variables, la <b>f-string</b> est l'outil le plus pratique : on met un <code>f</code> devant les guillemets et les variables entre accolades. Pour convertir : <code>int("12")</code>, <code>str(5)</code>, <code>float("3.5")</code>.</p>
<p>Attention aux trois divisions : <code>/</code> donne toujours un float, <code>//</code> la division entière, <code>%</code> le reste.</p>`,
 ex:`nom = "RG"
credits = 42
moyenne = 13.5
print(type(credits))
print(f"{nom} a {credits} crédits et {moyenne} de moyenne")
print(7 / 2, 7 // 2, 7 % 2)`,
 exos:[
  {id:"py1a",type:"code",title:"Ton bilan de semestre",xp:15,
   p:`Crée trois variables : <code>prenom</code> (vaut <code>"RG"</code>), <code>ue_validees</code> (vaut <code>4</code>) et <code>credits_par_ue</code> (vaut <code>6</code>). Calcule <code>total</code>, puis affiche exactement :<br><code>RG a validé 4 UE, soit 24 crédits.</code>`,
   start:`# Écris ton code ici\n`,expected:`RG a validé 4 UE, soit 24 crédits.`,
   hint:`total = ue_validees * credits_par_ue, puis print(f"{prenom} a validé {ue_validees} UE, soit {total} crédits.")`,
   sol:`prenom = "RG"\nue_validees = 4\ncredits_par_ue = 6\ntotal = ue_validees * credits_par_ue\nprint(f"{prenom} a validé {ue_validees} UE, soit {total} crédits.")`},
  {id:"py1b",type:"predict",title:"Lis le code",xp:10,code:`a = 17\nb = 5\nprint(a // b, a % b)`,p:"Qu'affiche ce programme ?",answers:["3 2"],hint:"17 = 5 × 3 + 2."}
 ]},
 {t:"Conditions et fonctions",th:`<p>Une <b>condition</b> exécute un bloc seulement si un test est vrai. Les comparaisons : <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;=</code>… On combine avec <code>and</code>, <code>or</code>, <code>not</code>.</p>
<p>En Python, ce sont les <b>4 espaces d'indentation</b> qui délimitent les blocs. Pas d'accolades : une indentation fausse est une erreur.</p>
<p>Une <b>fonction</b> (<code>def</code>) range du code réutilisable. Elle reçoit des paramètres et renvoie un résultat avec <code>return</code>. Dès que <code>return</code> s'exécute, la fonction s'arrête.</p>`,
 ex:`def mention(note):
    if note >= 16:
        return "Très bien"
    elif note >= 14:
        return "Bien"
    elif note >= 10:
        return "Passable"
    else:
        return "Échec"

print(mention(15))
print(mention(8))`,
 exos:[
  {id:"py2a",type:"code",title:"Statut LMD",xp:20,
   p:`Écris la fonction <code>statut(credits)</code> qui renvoie <code>"Validé"</code> à partir de 60 crédits, <code>"Compensable"</code> de 45 à 59, et <code>"Ajourné"</code> en dessous de 45. <span class="muted">(Règle simplifiée pour l'exercice.)</span>`,
   start:`def statut(credits):\n    # à toi de jouer\n    pass\n`,
   tests:`print(statut(60))\nprint(statut(52))\nprint(statut(30))\nprint(statut(45))`,expected:`Validé\nCompensable\nAjourné\nCompensable`,
   hint:"Commence par le cas le plus haut : if credits >= 60, puis elif credits >= 45, puis else.",
   sol:`def statut(credits):\n    if credits >= 60:\n        return "Validé"\n    elif credits >= 45:\n        return "Compensable"\n    else:\n        return "Ajourné"`}
 ]},
 {t:"Listes et boucles",th:`<p>Une <b>liste</b> range plusieurs valeurs dans l'ordre : <code>notes = [12, 8, 15]</code>. Le premier élément est <code>notes[0]</code>, le dernier <code>notes[-1]</code>. <code>len(notes)</code> donne la taille, <code>notes.append(11)</code> ajoute à la fin.</p>
<p>La boucle <code>for</code> parcourt chaque élément. <code>range(n)</code> fabrique les nombres de 0 à n-1. Le schéma de base à connaître par cœur : <b>initialiser un accumulateur</b>, puis le mettre à jour dans la boucle.</p>`,
 ex:`notes = [12, 8, 15, 10]
total = 0
for n in notes:
    total += n
print("Moyenne :", total / len(notes))

for i in range(3):
    print("Tour", i)`,
 exos:[
  {id:"py3a",type:"code",title:"Moyenne arrondie",xp:20,
   p:`Écris <code>moyenne(notes)</code> qui renvoie la moyenne de la liste, arrondie à 2 décimales avec <code>round(valeur, 2)</code>.`,
   start:`def moyenne(notes):\n    pass\n`,tests:`print(moyenne([12, 15, 9]))\nprint(moyenne([10, 11]))\nprint(moyenne([13, 14, 14]))`,expected:`12.0\n10.5\n13.67`,
   hint:"Additionne avec une boucle (ou sum), divise par len(notes), puis round(..., 2).",
   sol:`def moyenne(notes):\n    total = 0\n    for n in notes:\n        total += n\n    return round(total / len(notes), 2)`},
  {id:"py3b",type:"code",title:"Combien de réussites ?",xp:20,
   p:`Écris <code>nb_reussites(notes)</code> qui compte les notes supérieures ou égales à 10. Une liste vide renvoie 0.`,
   start:`def nb_reussites(notes):\n    pass\n`,tests:`print(nb_reussites([8, 12, 10, 9]))\nprint(nb_reussites([]))\nprint(nb_reussites([10, 10, 10]))`,expected:`2\n0\n3`,
   hint:"Un compteur à 0, une boucle, un if note >= 10: compteur += 1.",
   sol:`def nb_reussites(notes):\n    compteur = 0\n    for n in notes:\n        if n >= 10:\n            compteur += 1\n    return compteur`}
 ]},
 {t:"Dictionnaires",th:`<p>Un <b>dictionnaire</b> associe des clés à des valeurs : <code>{"Python": "Prisca", "CSS": "Joël"}</code>. On lit avec <code>d["Python"]</code>, mais si la clé n'existe pas, c'est une erreur. <code>d.get(cle, defaut)</code> renvoie une valeur par défaut à la place.</p>
<p><code>cle in d</code> teste si une clé existe. <code>for cle, valeur in d.items():</code> parcourt les paires. Une liste de dictionnaires, c'est la forme typique des données d'un site web : un fichier <code>data.js</code>, une réponse d'API…</p>`,
 ex:`tuteurs = {"Python": "Prisca", "CSS": "Joël", "SQL": "Naomie"}
print(tuteurs["SQL"])
print(tuteurs.get("PHP", "personne"))
for matiere, nom in tuteurs.items():
    print(matiere, "→", nom)`,
 exos:[
  {id:"py4a",type:"code",title:"Trouver un tuteur",xp:20,
   p:`Écris <code>trouver_tuteur(matiere, tuteurs)</code> qui renvoie le nom du tuteur de la matière, ou <code>"Aucun tuteur"</code> si elle n'est pas dans le dictionnaire.`,
   start:`def trouver_tuteur(matiere, tuteurs):\n    pass\n`,
   tests:`t = {"Python": "Prisca", "CSS": "Joël"}\nprint(trouver_tuteur("CSS", t))\nprint(trouver_tuteur("PHP", t))`,expected:`Joël\nAucun tuteur`,
   hint:"Une seule ligne suffit avec .get().",sol:`def trouver_tuteur(matiere, tuteurs):\n    return tuteurs.get(matiere, "Aucun tuteur")`},
  {id:"py4b",type:"code",title:"Compter par promotion",xp:25,
   p:`Écris <code>compter_par_promo(etudiants)</code> : elle reçoit une liste de dictionnaires <code>{"nom": ..., "promo": ...}</code> et renvoie un dictionnaire qui compte les étudiants par promo.`,
   start:`def compter_par_promo(etudiants):\n    compte = {}\n    # parcours la liste et remplis compte\n    return compte\n`,
   tests:`r = compter_par_promo([{"nom": "A", "promo": "L1"}, {"nom": "B", "promo": "L2"}, {"nom": "C", "promo": "L1"}])\nprint(r["L1"], r["L2"], r.get("L3", 0))`,expected:`2 1 0`,
   hint:`Pour chaque étudiant e : p = e["promo"] ; compte[p] = compte.get(p, 0) + 1`,
   sol:`def compter_par_promo(etudiants):\n    compte = {}\n    for e in etudiants:\n        p = e["promo"]\n        compte[p] = compte.get(p, 0) + 1\n    return compte`}
 ]}
]};
