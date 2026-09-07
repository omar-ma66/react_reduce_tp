# Royal Rumble Partie 3 - Mise en pratique

Dans le composant `PlayerList` vous avez l'élément suivant :

```js
const [players] = useState({
  1: { name: "John", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 1 },
  2: { name: "Jack", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 2 },
  3: { name: "Jessy", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 3 },
  4: { name: "Jenny", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 4 },
});
```

Vous devez faire en sortes que ça devienne un état global.

Utilisez **useSelector** dans le composant `PlayerList`.
Aidez-vous de ce qui a été fait avec le composant `Monster`.

⚠️ Initialement c'était un objet { } mais dans notre slice ça devra être un tableau !

👉 [Partie 4](4-actions.md) : 🎬 Actions
