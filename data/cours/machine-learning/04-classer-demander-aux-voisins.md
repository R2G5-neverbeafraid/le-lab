## Classer : demander aux voisins

Parfois, on ne veut pas prédire un nombre mais une **catégorie** : mangue ou avocat, spam ou pas spam, chat ou chien. Ça s'appelle la **classification**.

La méthode la plus simple du monde s'appelle **k plus proches voisins** (*k-NN*). Un nouveau fruit arrive ? On le place sur le graphique, on regarde les `k` exemples les plus proches de lui, et ils votent. La majorité gagne.

On prend souvent `k = 3` ou `k = 5` : un nombre impair, pour qu'il n'y ait jamais d'égalité entre deux catégories. La « proximité », c'est la distance à vol d'oiseau, calculée avec le théorème de Pythagore : `√(dx² + dy²)`.

C'est la même idée que les recommandations : « les gens qui aiment ce que tu aimes ont aussi aimé… ».
