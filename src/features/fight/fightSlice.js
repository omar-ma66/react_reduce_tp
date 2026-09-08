import { createSlice } from "@reduxjs/toolkit";

/* ################################################################################################## */
const initialState = {
  players: {
    1: { name: "John", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 1 },
    2: { name: "Jack", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 2 },
    3: { name: "Jessy", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 3 },
    4: { name: "Jenny", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 4 },
  },
  monster: {
    nom: "Crypto",
    pv: 800,
    pvMax: 800,
  },
  message: "",
  gameStatus: "PLAYING", // États possibles: "PLAYING", "VICTORY", "DEFEAT",
  activePlayerId: 1, // ID du joueur c'est donc a lui de jouer .
};
/* ################################################################################################## */
// Fonction utilitaire pour trouver le prochain joueur vivant
const getNextActivePlayer = (players, currentId) => {
  const playerIds = Object.keys(players).map(Number);
  const currentIndex = playerIds.indexOf(currentId);for (let i = 1; i <= playerIds.length; i++) {
    const nextIndex = (currentIndex + i) % playerIds.length;
    const nextId = playerIds[nextIndex];
    if (players[nextId].pv > 0) {
      return nextId;
    }
  }
  return currentId;
};



/* ################################################################################################## */

export const fightSlice = createSlice({
  name: "fight",
  initialState,
  reducers: {
    hitMonster: (state, action) => {
      if (state.gameStatus !== "PLAYING") return;

      const damage = action.payload;
      state.monster.pv = Math.max(0, state.monster.pv - damage);

      // Condition de VICTOIRE
      if (state.monster.pv === 0) {
        state.gameStatus = "VICTORY";
        state.message = "🎉 Victoire ! Vous avez vaincu le monstre !";
      }
    },
    hitBack: (state, action) => {
      if (state.gameStatus !== "PLAYING") return;

      const playerId = action.payload;
      const player = state.players[playerId];

      if (player && player.pv > 0) {
        const hasMissed = Math.random() < 0.2;

        if (hasMissed) {
          state.message = `${state.monster.nom} a raté son attaque contre ${player.name} !`;
        } else {
          const monsterDamage = Math.floor(Math.random() * 6) + 3;
          player.pv = Math.max(0, player.pv - monsterDamage);

          if (player.pv === 0) {
            state.message = `${player.name} est K.O. !`;
          } else {
            state.message = `${state.monster.nom} inflige ${monsterDamage} dégâts à ${player.name} !`;
          }
        }
      }

      // Condition de DÉFAITE : tous les joueurs ont 0 PV
      const allPlayersDead = Object.values(state.players).every(
        (p) => p.pv === 0,
      );

      if (allPlayersDead) {
        state.gameStatus = "DEFEAT";
        state.message = "💀 Défaite ! Tous les joueurs ont été éliminés...";
      }else{
        state.activePlayerId = getNextActivePlayer(state.players,playerId);
      }
    },
    clearMessage: (state) => {
      // On ne réinitialise pas le message si le jeu est terminé
      if (state.gameStatus === "PLAYING") {
        state.message = "";
      }
    },
  },
});
/* ################################################################################################## */

export const { hitMonster, hitBack, clearMessage } = fightSlice.actions;
export default fightSlice.reducer;
