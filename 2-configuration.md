# Royal Rumble Partie 2 - Configuration

## 🛠️ Installation de Redux Toolkit

Première étape, installons Redux Toolkit ! Cette bibliothèque moderne simplifie considérablement l'utilisation de Redux en réduisant le code à écrire et en intégrant les bonnes pratiques.

```bash
# Installez Redux Toolkit et React-Redux si ce n'est pas déjà fait
npm install @reduxjs/toolkit react-redux
```

> 💡 Redux Toolkit est développé par l'équipe officielle de Redux et est maintenant l'approche recommandée pour utiliser Redux.


## 🏗️ Création du Redux Store

Commençons par configurer notre store central qui gérera tout l'état de notre application :

- Dans le dossier `src` créez un dossier `store` puis un fichier `store.js`

```js
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {}, // Nous ajouterons nos reducers ici
});
```

## 🍕 Création de notre premier Slice

Les "slices" sont un concept clé de Redux Toolkit. Ils regroupent la logique liée à une partie spécifique de notre état (reducers, actions, etc.) :

- Dans le dossier `src`créez un dossier `features` puis un dossier `fight` dans lequel vous créerez le fichier `fightSlice.js`.

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: [
    // Nous stockerons nos combattants ici sous forme de tableau
    // Exemple: 1: { name: "John", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 1 },
  ],
  monster: {
    // Notre boss à combattre
    // Exemple: { name: "Dragon", pv: 200, pvMax: 200, strength: 15 }
  },
};

export const fightSlice = createSlice({
  name: "fight",
  initialState,
  reducers: {
    // Nous ajouterons nos actions ici plus tard
  },
});

// Nous exportons le reducer généré automatiquement
export default fightSlice.reducer;
```

> 🔍 Remarque importante : Nous utilisons un tableau pour stocker les joueurs plutôt qu'un objet, car cela facilitera leur manipulation et leur affichage.

## 🔌 Connecter le Slice au Store

Maintenant, connectons notre fightSlice au store principal `store.js` :

```js
import { configureStore } from "@reduxjs/toolkit";
import fightReducer from "../features/fight/fightSlice";

export const store = configureStore({
  reducer: {
    fight: fightReducer,
  },
  // Le DevTools Redux est activé par défaut en développement !
});
```

## 🌐 Rendre le Store accessible à toute l'application

Pour que tous nos composants puissent accéder au store Redux, nous devons envelopper notre application avec le composant Provider :

- Modifiez `main.jsx`

```js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

## 🪝 Utiliser les hooks de Redux

Maintenant que notre store est configuré, nous pouvons accéder à notre état depuis n'importe quel composant grâce au hook useSelector :

```js
import React from "react";
import ProgressBar from "./ProgressBar";
import { useSelector } from "react-redux";

function Monster() {
  // Le hook useSelector nous permet d'extraire des données du store Redux
  const monster = useSelector((state) => state.fight.monster);

  return (

    ...

    <ProgressBar
      pv={monster.pv}
      pvMax={monster.pvMax}
      bgType="bg-danger"
      faType="fa-heart"
      barName=" : pv"
    />

    ...

  );
};

export default Monster;
```

## 🧪 Tester notre configuration

Pour vérifier que notre configuration fonctionne :

1. Ajoutez des données d'exemple dans l'état initial du monstre dans `fightSlice` :

```js
monster: {
  name: "Crypto",
  pv: 800,
  pvMax: 800
}
```

2. Relancez l'application et vérifiez que les informations du monstre s'affichent correctement

>💡 Astuce : Installez l'extension [Redux DevTools](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) pour votre navigateur. Elle vous permettra de visualiser l'état de votre store et de suivre les actions.

## ✅ Ce que vous avez appris

Comment configurer Redux Toolkit avec `configureStore`
Comment organiser votre état avec les slices
Comment connecter le store Redux à votre application React
Comment accéder à l'état avec le hook `useSelector`

👉 [Partie 3](3-mise-en-pratique.md) : 🔨 Mise en pratique
