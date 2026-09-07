# Royal Rumble Partie 4 - Actions

## 💫 Passons à l'action !

Maintenant que notre store est configuré et accessible, il est temps de lui faire faire quelque chose ! Nous allons créer des actions pour modifier l'état et voir le fruit de notre travail.

## 🛠️ Création d'actions avec Redux Toolkit

L'un des avantages principaux de Redux Toolkit est la simplification dans la création des actions. Plus besoin de créer des action creators et des types d'action séparément - tout est généré automatiquement à partir des `reducers` définis dans votre slice.

Modifions notre `fightSlice` pour permettre d'attaquer le monstre :

```js
export const fightSlice = createSlice({
  name: "fight",
  initialState,
  reducers: {
    hitMonster: (state, action) => {
      // Le payload de l'action contient la force de frappe
      const damage = action.payload;

      // Avec Redux Toolkit, nous pouvons "muter" l'état directement
      // grâce à Immer qui fonctionne sous le capot
      state.monster.pv = Math.max(0, state.monster.pv - damage);

      // Pas besoin de return car Immer s'occupe de créer un nouvel état
    },
  },
});

// Export des actions
export const { hitMonster } = fightSlice.actions;

// Nous exportons le reducer généré automatiquement
export default fightSlice.reducer;
```

> 💡 **Astuce Immer**: Redux Toolkit utilise Immer sous le capot, ce qui vous permet d'écrire votre code comme si vous modifiiez directement l'état (state.monster.pv -= damage), mais en réalité, un nouvel état est créé de façon immuable.

## 🧪 Tester l'action avec useDispatch

Le hook `useDispatch` nous permet d'envoyer des actions à notre store. Utilisons-le dans notre composant pour attaquer le monstre lorsqu'un bouton est cliqué :

```js
import { useDispatch } from "react-redux";
import { hitMonster } from "../../features/fight/fightSlice";
import "./ButtonCapacity.css";

function ButtonCapacity() {
  // useDispatch nous permet de dispatcher des actions
  const dispatch = useDispatch();

  const fight = () => {
    // Dispatche l'action hitMonster avec une force de 5
    dispatch(hitMonster(5));
    console.log("🗡️ Attaque lancée !");
  };

  return (
    <button
      type="button"
      onClick={fight}
      className="btn btn-success material-tooltip-main "
    >
      hit
      <i className="fas fa-bomb"></i> 5<i className="fas fa-fire-alt"></i> - 5
    </button>
  );
}

export default ButtonCapacity;
```

## 📊 Visualiser les changements d'état

Après avoir mis en place notre action, chaque clic sur un bouton de capacité devrait réduire les points de vie du monstre. Vous pouvez voir ces changements :

1. Dans l'interface utilisateur où la barre de vie du monstre diminue
2. Dans les Redux DevTools où vous pouvez observer chaque action et son impact sur l'état

> 🎮 Défi: Modifiez le code pour que chaque type d'attaque fasse des dégâts différents. Par exemple, l'attaque "Frappe" pourrait faire 5 points de dégâts, tandis que "Boule de feu" en ferait 15.

## 🔄 Cycle Redux complet

Félicitations ! Vous venez de compléter votre premier cycle Redux complet :

1. **Composant UI**: L'utilisateur clique sur un bouton

2. **Action**: Une action est dispatchée avec useDispatch

3. **Reducer**: Le reducer traite l'action et modifie l'état

4. **Store**: Le nouvel état est stocké

5. **UI**: Les composants connectés avec useSelector se mettent à jour

## 👨‍🚒 Le monstre doit riposter !

Maintenant que nous pouvons attaquer le monstre, il est temps que celui-ci riposte !

👉 [Partie 5](5-riposte.md) : Riposte du monstre
