/* Le Lab — cours : css
   Développé par 25 Labs */
"use strict";

L.css={name:"CSS",color:"var(--css)",tag:"Mettre en forme",lessons:[
 {t:"Sélecteurs et texte",th:`<p>Une règle CSS = un <b>sélecteur</b> + des <b>déclarations</b> : <code>.nom { color: navy; }</code>.</p>
<ul><li><code>p</code> cible toutes les balises p</li><li><code>.carte</code> cible la classe carte</li><li><code>#titre</code> cible l'id titre</li><li><code>.carte .nom</code> cible un .nom <b>dans</b> une .carte</li></ul>
<p>Si deux règles se contredisent, la plus <b>spécifique</b> gagne (id &gt; classe &gt; balise), sinon la dernière écrite.</p>
<p>Propriétés de texte utiles : <code>color</code>, <code>font-size</code>, <code>font-weight</code> (400 normal, 700 gras), <code>text-transform</code>, <code>line-height</code>.</p>`,
 ex:`.nom { font-weight: 700; color: #3646e0; }
.matiere { text-transform: uppercase; font-size: 12px; }`,
 exos:[
  {id:"css1a",type:"css",title:"Le nom en valeur",xp:15,
   p:`Dans l'aperçu, mets les noms (<code>.nom</code>) en gras avec <code>font-weight: 700</code> et donne à <code>.matiere</code> une taille de <code>13px</code>.`,
   start:`.nom {\n\n}\n.matiere {\n\n}\n`,
   checks:[[q=>parseInt(gcs(q(".nom")).fontWeight)>=700,"Le nom n'est pas en gras (font-weight: 700)."],[q=>gcs(q(".matiere")).fontSize==="13px","La matière ne fait pas 13px."]],
   hint:"font-weight: 700; dans .nom, font-size: 13px; dans .matiere.",sol:`.nom {\n  font-weight: 700;\n}\n.matiere {\n  font-size: 13px;\n}`}
 ]},
 {t:"Le modèle de boîte",th:`<p>Chaque élément est une boîte, de l'intérieur vers l'extérieur : <b>contenu</b> → <code>padding</code> (marge intérieure) → <code>border</code> → <code>margin</code> (marge extérieure).</p>
<p><code>border: 2px solid #ccc</code> résume épaisseur, style et couleur. <code>border-radius</code> arrondit les coins.</p>
<p>Ajoute toujours <code>* { box-sizing: border-box; }</code> à tes projets : la largeur inclut alors le padding et la bordure, ce qui évite les débordements.</p>`,
 ex:`.carte {
  padding: 16px;
  border: 2px solid #dce1ee;
  border-radius: 12px;
  margin-bottom: 12px;
}`,
 exos:[
  {id:"css2a",type:"css",title:"Une vraie carte",xp:20,
   p:`Donne à <code>.carte</code> un <code>padding</code> de 16px, une bordure pleine de 2px (couleur au choix) et des coins arrondis de 12px.`,
   start:`.carte {\n\n}\n`,
   checks:[[q=>gcs(q(".carte")).paddingTop==="16px","Le padding n'est pas de 16px."],[q=>gcs(q(".carte")).borderTopWidth==="2px"&&gcs(q(".carte")).borderTopStyle==="solid","Il manque une bordure solid de 2px."],[q=>gcs(q(".carte")).borderTopLeftRadius==="12px","Les coins ne sont pas arrondis à 12px."]],
   hint:"border: 2px solid gray; border-radius: 12px;",sol:`.carte {\n  padding: 16px;\n  border: 2px solid #c9cfe2;\n  border-radius: 12px;\n}`}
 ]},
 {t:"Flexbox",th:`<p>Flexbox aligne des éléments sur <b>une ligne</b> (ou une colonne). On l'active sur le <b>parent</b> : <code>display: flex</code>.</p>
<ul><li><code>justify-content</code> : répartition sur l'axe principal (<code>space-between</code>, <code>center</code>…)</li><li><code>align-items</code> : alignement sur l'axe perpendiculaire (<code>center</code> pour centrer verticalement)</li><li><code>gap</code> : espace entre les enfants</li><li><code>flex-direction: column</code> pour empiler</li></ul>`,
 ex:`.rangee {
  display: flex;
  align-items: center;
  gap: 12px;
}`,
 exos:[
  {id:"css3a",type:"css",title:"Avatar à côté du nom",xp:20,
   p:`Dans chaque carte, la <code>.rangee</code> contient l'avatar et le nom. Mets-les côte à côte avec Flexbox, centrés verticalement, avec un <code>gap</code> de 12px.`,
   start:`.rangee {\n\n}\n`,
   checks:[[q=>gcs(q(".rangee")).display==="flex","La rangée n'est pas en display: flex."],[q=>gcs(q(".rangee")).alignItems==="center","Les éléments ne sont pas centrés verticalement (align-items)."],[q=>gcs(q(".rangee")).columnGap==="12px","Le gap n'est pas de 12px."]],
   hint:"Trois lignes : display, align-items, gap.",sol:`.rangee {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}`}
 ]},
 {t:"Grid et responsive",th:`<p>CSS Grid gère <b>deux dimensions</b> à la fois. <code>grid-template-columns: repeat(3, 1fr)</code> crée 3 colonnes égales (<code>fr</code> = une part de l'espace libre).</p>
<p>Une <b>media query</b> applique des règles seulement sous une condition, souvent la largeur de l'écran :</p>
<pre class="code">@media (max-width: 600px) {
  .grille { grid-template-columns: 1fr; }
}</pre>
<p>Méthode conseillée : écris d'abord la version mobile, puis élargis.</p>`,
 ex:`.grille {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}`,
 exos:[
  {id:"css4a",type:"css",title:"La grille des tuteurs",xp:20,
   p:`Transforme <code>.grille</code> en grille de <b>3 colonnes égales</b> avec un espace de 16px entre les cartes.`,
   start:`.grille {\n\n}\n`,
   checks:[[q=>gcs(q(".grille")).display==="grid","La grille n'est pas en display: grid."],[q=>gcs(q(".grille")).gridTemplateColumns.trim().split(/\s+/).length===3,"Il ne faut pas exactement 3 colonnes."],[q=>gcs(q(".grille")).columnGap==="16px","L'espace entre colonnes n'est pas de 16px."]],
   hint:"grid-template-columns: repeat(3, 1fr);",sol:`.grille {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}`},
  {id:"css4b",type:"qcm",title:"Lire une media query",xp:10,p:`Que fait <code>@media (max-width: 600px) { .grille { grid-template-columns: 1fr; } }</code> ?`,
   opts:["Sur les écrans de 600px ou moins, les cartes passent sur une seule colonne","Sur les écrans de plus de 600px, la grille fait 1 colonne","La grille fait toujours 600px de large","Elle supprime la grille sur mobile"],a:0,
   why:"max-width: 600px veut dire « jusqu'à 600px de large ». 1fr = une seule colonne qui prend toute la largeur."}
 ]}
]};
