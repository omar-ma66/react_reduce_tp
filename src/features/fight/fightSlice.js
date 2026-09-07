import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
  players: 
    // Nous stockerons nos combattants ici sous forme de tableau
    // Exemple: 1: { name: "John", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 1 },
    {
     1:{ name: "John", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 1 },
     2:{ name: "Jack", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 2 },
     3:{ name: "Jessy", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 3 },
     4:{ name: "Jenny", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 4 },
  }
  ,
  monster: {
    // Notre boss à combattre
    // Exemple: { name: "Dragon", pv: 200, pvMax: 200, strength: 15 }
    nom: "Crypto",
    pv:800,
    pvMax:800
  },
};

export const fightSlice = createSlice({
  name: "fight",
  initialState,
  reducers: {
    // Nous ajouterons nos actions ici plus tard
    hitMonster:(state,action) =>{ const damage = action.payload }
  },
});

// Nous exportons le reducer généré automatiquement
export const  { hitMonster } = fightSlice.actions ;
export default fightSlice.reducer;