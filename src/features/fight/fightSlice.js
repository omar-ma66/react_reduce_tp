import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  monster: { pv: 800, pvMax: 800 },
  players: {
    1: { id: 1, name: "John", pv: 100, pvMax: 100, mana: 30, manaMax: 30, avatar: "/avatar/avatar1.jpg" },
    2: { id: 2, name: "Jack", pv: 100, pvMax: 100, mana: 30, manaMax: 30, avatar: "/avatar/avatar2.jpg" },
    3: { id: 3, name: "Jessy", pv: 100, pvMax: 100, mana: 30, manaMax: 30, avatar: "/avatar/avatar3.jpg" },
    4: { id: 4, name: "Jenny", pv: 100, pvMax: 100, mana: 30, manaMax: 30, avatar: "/avatar/avatar4.jpg" },
  },
  activePlayerId: 1,
  gameStatus: "PLAYING",
  message: "",
  monsterHitBackCount: 0, // Compteur de ripostes consécutives du monstre
};

export const fightSlice = createSlice({
  name: 'fight',
  initialState,
  reducers: {
   useCapacity: (state, action) => {
      const { playerId, type, value, manaCost } = action.payload;
      const player = state.players[playerId];

      if (!player || player.pv <= 0) return;

      if (type === "damage") {
        // Déduire le mana
        if (manaCost && manaCost > 0) {
          player.mana = Math.max(0, player.mana - manaCost);
        }
        // Appliquer les dégâts au monstre
        state.monster.pv = Math.max(0, state.monster.pv - value);

        if (state.monster.pv === 0) {
          state.gameStatus = "VICTORY";
          state.message = "🏆 Victoire ! Le monstre est vaincu !";
        }
      } else if (type === "heal") {
        if (player.mana >= value) {
          player.mana -= value;
          player.pv = Math.min(player.pvMax, player.pv + value);
        }
      } else if (type === "manaRegen") {
        player.mana = Math.min(player.manaMax, player.mana + value);
      }
    },
    
    // Action pour l'Attaque Simultanée des 4 joueurs
    simultaneousAttack: (state) => {
      // Coût normal d'une grosse attaque / 4 (ex: 5 de mana au lieu de 20 par joueur)
      const manaCostPerPlayer = 5; 
      const totalDamage = 120; // Dégâts combinés dévastateurs

      // Vérifier si tous les joueurs vivants ont assez de mana
      const playerList = Object.values(state.players);
      const canExecute = playerList.every(p => p.pv <= 0 || p.mana >= manaCostPerPlayer);

      if (!canExecute) {
        state.message = "Certains joueurs n'ont pas assez de mana pour l'attaque simultanée !";
        return;
      }

      // Consommer 4 fois moins de mana chez chaque joueur vivant
      playerList.forEach(player => {
        if (player.pv > 0) {
          player.mana = Math.max(0, player.mana - manaCostPerPlayer);
        }
      });

      // Infliger les dégâts au monstre
      state.monster.pv = Math.max(0, state.monster.pv - totalDamage);
      
      // Réinitialiser le compteur de non-riposte
      state.monsterHitBackCount = 0;
      state.message = `🔥 ATTAQUE SIMULTANÉE ! Les 4 joueurs infligent ${totalDamage} dégâts au monstre !`;

      if (state.monster.pv === 0) {
        state.gameStatus = "VICTORY";
        state.message = "🏆 Victoire écrasante grâce à l'Attaque Simultanée !";
      }
    },


    hitBack: (state, action) => {
  const playerId = action.payload;

  // Riposte du monstre (ex: 50% de chance)
  if (Math.random() > 0.5) {
    state.monsterHitBackCount = 0;
    if (state.players[playerId] && state.players[playerId].pv > 0) {
      state.players[playerId].pv = Math.max(0, state.players[playerId].pv - 15);
    }
  } else {
    state.monsterHitBackCount += 1;
    state.message = "Le monstre manie mal son arme et rate sa riposte !";
  }

  // Passer la main au joueur suivant (ex: 1 -> 2 -> 3 -> 4 -> 1)
  const playerIds = Object.keys(state.players).map(Number);
  const currentIndex = playerIds.indexOf(state.activePlayerId);
  
  let nextIndex = (currentIndex + 1) % playerIds.length;
  let attempts = 0;

  // Sauter les joueurs morts (pv <= 0)
  while (state.players[playerIds[nextIndex]].pv <= 0 && attempts < playerIds.length) {
    nextIndex = (nextIndex + 1) % playerIds.length;
    attempts++;
  }

  state.activePlayerId = playerIds[nextIndex];
}
    ,
    clearMessage: (state) => {
      state.message = "";
    }
  },
});

export const { useCapacity, hitBack, simultaneousAttack, clearMessage } = fightSlice.actions;
export default fightSlice.reducer;