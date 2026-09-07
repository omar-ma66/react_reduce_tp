# Royal Rumble Partie 6 - Gameplay

## Ajout de gameplay !

Voici une liste de fonctionnalités à ajouter si vous êtes arrivé au bout du TP !

## Gérer les conditions de victoire et de défaite
* Si un joueur n’a plus de PV, il ne peut plus attaquer.
* Si tous les joueurs n’ont plus de PV, la partie se termine par une défaite.
* Si le monstre n’a plus de PV, la partie se termine par une victoire.

## Implémenter un système de tour !
* Si un joueur attaque le monstre, il ne peut plus attaquer tant que les autres joueurs n'ont pas agi.
* Représenter cette fonctionnalité en changeant le background de la carte du joueur et en rendant les boutons non clickable.

## Capacité avancé
* Chaque joueur reçoit 4 capacités différentes.
* Une des capacités doit être un sort de soin qui coûte autant de mana que de pv restauré.
* Une des capacités doit rendre du mana, le coût de cette capacité se manifeste par la perte de point de vie par le joueur.

## Gestion de la Mana
* Quand un joueur utilise une capacité, il perd du mana correspondant au coût de la capacité
* Si un joueur n'a pas la mana suffisante pour lancer un sort, le bouton devient bleu et ne peut plus être utilisé.

## Animation visuelle
* Lorsqu'un joueur perd des pv, déclencher une animation visuelle

## Riposte aléatoire
* Lorsqu'un joueur attaque le monstre, la riposte à une chance sur deux d'être déclenchée
* La cible de la riposte est aléatoire entre les 4 joueurs
* A la fin du tour des 4 joueurs, le monstre déclenche une attaque 2 fois plus puissante qu'une attaque normale

## D’autres idées ? Soyez créatifs 🎊