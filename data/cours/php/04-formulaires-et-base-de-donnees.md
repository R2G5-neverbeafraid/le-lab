## Formulaires et base de données

Quand un formulaire est envoyé, PHP récupère les champs dans `$_POST` (méthode post, données invisibles dans l'URL) ou `$_GET` (données visibles dans l'URL, pour une recherche par exemple).

Deux règles de sécurité non négociables :

- Pour **afficher** une donnée tapée par un visiteur : `htmlspecialchars($texte)`, sinon il peut injecter du HTML ou du JavaScript.
- Pour l'**envoyer en SQL** : une requête préparée avec PDO. Jamais de concaténation de texte dans une requête.
