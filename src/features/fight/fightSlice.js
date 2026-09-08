import { createSlice } from "@reduxjs/toolkit";

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
  activePlayerId: 1,
  message: "",
  gameStatus: "PLAYING",
};

const getNextActivePlayer = (players, currentId) => {
  const playerIds = Object.keys(players).map(Number);
  const currentIndex = playerIds.indexOf(currentId);

  for (let i = 1; i <= playerIds.length; i++) {
    const nextIndex = (currentIndex + i) % playerIds.length;
    const nextId = playerIds[nextIndex];
    if (players[nextId].pv > 0) {
      return nextId;
    }
  }
  return currentId;
};

export const fightSlice = createSlice({
  name: "fight",
  initialState,
  reducers: {
    useCapacity: (state, action) => {
      if (state.gameStatus !== "PLAYING") return;

      const { playerId, type, value } = action.payload;
      const player = state.players[playerId];

      if (!player || player.pv <= 0) return;

      if (type === "damage") {
        // Attaque ordinaire
        state.monster.pv = Math.max(0, state.monster.pv - value);
        if (state.monster.pv === 0) {
          state.gameStatus = "VICTORY";
          state.message = "🎉 Victoire ! Vous avez vaincu le monstre !";
          return;
        }
      } else if (type === "heal") {
        // Soin : Soigne X PV en consommant X Mana
        const actualHeal = Math.min(value, player.mana); // Ne peut pas soigner plus que le mana disponible
        const realHealedPv = Math.min(actualHeal, player.pvMax - player.pv); // Ne dépasse pas les pvMax

        player.pv += realHealedPv;
        player.mana -= realHealedPv; // Coûte autant de mana que de PV restaurés
        state.message = `${player.name} se soigne de ${realHealedPv} PV en dépensant ${realHealedPv} Mana !`;
      } else if (type === "manaRegen") {
        // Régénération de Mana : Gagne X Mana en consommant X PV
        const actualRegen = Math.min(value, player.pv - 1); // Conserve au moins 1 PV pour ne pas se tuer soi-même
        const realManaGain = Math.min(actualRegen, player.manaMax - player.mana);

        player.mana += realManaGain;
        player.pv -= realManaGain; // Coûte autant de PV que de Mana restauré
        state.message = `${player.name} sacrifie ${realManaGain} PV pour regagner ${realManaGain} Mana !`;
      }
    },

    hitBack: (state, action) => {
      if (state.gameStatus !== "PLAYING") return;

      const playerId = action.payload;
      const player = state.players[playerId];

      if (player && player.pv > 0) {
        const hasMissed = Math.random() < 0.2;

        if (hasMissed) {
          state.message = `${state.monster.nom} a raté sa riposte contre ${player.name} !`;
        } else {
          const monsterDamage = Math.floor(Math.random() * 6) + 3;
          player.pv = Math.max(0, player.pv - monsterDamage);

          if (player.pv === 0) {
            state.message = `${player.name} est K.O. !`;
          } else if (!state.message) {
            state.message = `${state.monster.nom} inflige ${monsterDamage} dégâts à ${player.name} !`;
          }
        }
      }

      const allPlayersDead = Object.values(state.players).every(
        (p) => p.pv === 0
      );

      if (allPlayersDead) {
        state.gameStatus = "DEFEAT";
        state.message = "💀 Défaite ! Tous les joueurs ont été éliminés...";
      } else {
        state.activePlayerId = getNextActivePlayer(state.players, playerId);
      }
    },

    clearMessage: (state) => {
      if (state.gameStatus === "PLAYING") {
        state.message = "";
      }
    },
  },
});

export const { useCapacity, hitBack, clearMessage } = fightSlice.actions;
export default fightSlice.reducer;