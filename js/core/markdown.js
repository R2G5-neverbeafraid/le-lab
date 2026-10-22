/* Le Lab — petit moteur Markdown (titres, paragraphes, listes, code, gras, italique, liens)
   Suffisant pour les leçons de data/cours/ : pas besoin de bibliothèque externe.
   Développé par 25 Labs */
"use strict";

/** Transforme le Markdown d'une ligne : `code`, **gras**, *italique*, [lien](url), retour à la ligne. */
function mdEnLigne(texte) {
  // On découpe autour des `code` pour ne jamais transformer ce qu'ils contiennent.
  return String(texte).split(/(`[^`]+`)/).map(morceau => {
    if (morceau.startsWith("`") && morceau.endsWith("`") && morceau.length > 1) {
      return "<code>" + esc(morceau.slice(1, -1)) + "</code>";
    }
    return esc(morceau)
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
      .replace(/\*(.+?)\*/g, "<i>$1</i>")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/ {2}\n/g, "<br>");
  }).join("");
}

/** Transforme un document Markdown complet en HTML. */
function mdEnHTML(source) {
  const lignes = String(source).replace(/\r/g, "").split("\n");
  const html = [];
  let i = 0;
  while (i < lignes.length) {
    const ligne = lignes[i];
    if (ligne.startsWith("```")) {                       // bloc de code
      const bloc = [];
      i++;
      while (i < lignes.length && !lignes[i].startsWith("```")) bloc.push(lignes[i++]);
      i++;
      html.push('<pre class="code">' + esc(bloc.join("\n")) + "</pre>");
    } else if (/^#{2,4} /.test(ligne)) {                 // titre
      const n = ligne.match(/^#+/)[0].length;
      html.push(`<h${n}>${mdEnLigne(ligne.slice(n + 1))}</h${n}>`);
      i++;
    } else if (/^- /.test(ligne)) {                      // liste à puces
      const items = [];
      while (i < lignes.length && /^- /.test(lignes[i])) items.push(lignes[i++].slice(2));
      html.push("<ul>" + items.map(t => "<li>" + mdEnLigne(t) + "</li>").join("") + "</ul>");
    } else if (ligne.trim() === "") {
      i++;
    } else {                                             // paragraphe
      const para = [];
      while (i < lignes.length && lignes[i].trim() !== "" && !/^(```|#{2,4} |- )/.test(lignes[i])) para.push(lignes[i++]);
      html.push("<p>" + mdEnLigne(para.join("\n")) + "</p>");
    }
  }
  return html.join("\n");
}
