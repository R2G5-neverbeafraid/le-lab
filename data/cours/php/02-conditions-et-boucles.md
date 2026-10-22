## Conditions et boucles

Les conditions ressemblent au JavaScript : `if (...) { } elseif (...) { } else { }` (attention, `elseif` s'écrit en un mot).

La boucle reine de PHP est `foreach`, pour parcourir un tableau :

```
foreach ($cours as $c) { echo $c; }
foreach ($cours as $i => $c) { echo "$i : $c"; }
```
