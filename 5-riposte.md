# Royal Rumble Partie 5 - Riposte

## 👹 Le monstre contre-attaque !

Jusqu'à présent, notre jeu est plutôt facile : nous frappons le monstre sans risque. Mais tout combat digne de ce nom implique du danger ! Il est temps que notre monstre se défende.

* Créer le reducer `hitBack`
* Intégrer le déclenchement de cette action dans la fonction fight de `ButtonCapacity.js`
* Au déclenchement de l'action, dans le reducer, retirer 5 pv à un joueur
* Faire en sorte que le joueur qui à tapé le monstre reçoit les dégâts en retour sur sa barre de pv

## 💻 Visualiser la contre-attaque
Après cette implémentation, chaque attaque contre le monstre devrait déclencher une riposte. Vous pourrez observer :

1. La barre de vie du monstre diminue quand vous l'attaquez

2. La barre de vie du joueur diminue quand le monstre riposte

3. Dans Redux DevTools, vous verrez deux actions se succéder : `hitMonster` puis `hitBack`

> 💡 Astuce : Avec Redux Toolkit et Immer, la mise à jour des objets imbriqués (comme un joueur dans un tableau de joueurs) se fait de manière simple et intuitive. Redux Toolkit s'occupe de toute la complexité liée à l'immutabilité.

## 🎯 Défi : Améliorer la mécanique de combat
Pour rendre le jeu plus intéressant, essayez d'implémenter ces fonctionnalités :

1. Faites varier les dégâts du monstre de façon aléatoire (entre 3 et 8 points)
2. Ajoutez une probabilité (20%) que le monstre rate son attaque
3. Affichez un message temporaire dans l'UI quand le monstre frappe

👉 [Partie 6](6-gameplay.md) : Ajout de gameplay !