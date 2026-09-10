import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: {
    1: { name: "John", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 1,avatar:"/avatar/avatar1.jpg" },
    2: { name: "Jack", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 2,avatar:"/avatar/avatar2.jpg"},
    3: { name: "Jessy", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 3,avatar:"/avatar/avatar3.jpg" },
    4: { name: "Jenny", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 4,avatar:"/avatar/avatar4.jpg" },
  },
  monster: {
    nom: "Crypto",
    pv: 800,
    pvMax: 800,
  },
  activePlayerId: 1,
  turnsCount: 0, // Compteur d'actions pour détecter la fin d'un tour complet de 4 joueurs
  message: "",
  gameStatus: "PLAYING",
};

// Récupère la liste des joueurs vivants
const getAlivePlayers = (players) => {
  return Object.values(players).filter((p) => p.pv > 0);
};

// Détermine le prochain joueur actif vivant
const getNextActivePlayer = (players, currentId) => {
  const playerIds = Object.keys(players).map(Number); // .map((p)=> return Number(p););
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

      const { playerId, type, value, manaCost = 0 } = action.payload;
      const player = state.players[playerId];

      if (!player || player.pv <= 0) return;

      // Attaque classique / Sort
      if (type === "damage") {
        if (player.mana < manaCost) return;

        player.mana -= manaCost;
        state.monster.pv = Math.max(0, state.monster.pv - value);

        if (state.monster.pv === 0) {
          state.gameStatus = "VICTORY";
          state.message = "🎉 Victoire ! Vous avez vaincu le monstre !";
          return;
        }
      } 
      // Soin
      else if (type === "heal") {
        const actualHeal = Math.min(value, player.mana);
        const realHealedPv = Math.min(actualHeal, player.pvMax - player.pv);

        player.pv += realHealedPv;
        player.mana -= realHealedPv;
        state.message = `${player.name} se soigne de ${realHealedPv} PV en dépensant ${realHealedPv} Mana !`;
      } 
      // Régénération de Mana
      else if (type === "manaRegen") {
        const actualRegen = Math.min(value, player.pv - 1);
        const realManaGain = Math.min(actualRegen, player.manaMax - player.mana);

        player.mana += realManaGain;
        player.pv -= realManaGain;
        state.message = `${player.name} sacrifie ${realManaGain} PV pour regagner ${realManaGain} Mana !`;
      }
    },

    hitBack: (state, action) => {
      if (state.gameStatus !== "PLAYING") return;

      const currentPlayerId = action.payload;
      state.turnsCount += 1;

      // 1. Gestion de la riposte aléatoire (50% de chance)
      const willCounter = Math.random() < 0.5;
      const alivePlayers = getAlivePlayers(state.players);

      if (willCounter && alivePlayers.length > 0) {
        // Cible aléatoire parmi les joueurs vivants
        const randomTarget = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
        const monsterDamage = Math.floor(Math.random() * 6) + 3; // Dégâts normaux (3 à 8)

        randomTarget.pv = Math.max(0, randomTarget.pv - monsterDamage);

        if (randomTarget.pv === 0) {
          state.message = `${state.monster.nom} riposte et met ${randomTarget.name} K.O. (-${monsterDamage} PV) !`;
        } else {
          state.message = `${state.monster.nom} riposte au hasard sur ${randomTarget.name} (-${monsterDamage} PV) !`;
        }
      } else {
        state.message = `${state.monster.nom} n'a pas riposté !`;
      }

      // 2. Attaque spéciale tous les 4 tours d'action
      if (state.turnsCount >= 4) {
        state.turnsCount = 0; // Réinitialise le compteur

        const remainingAlive = getAlivePlayers(state.players);
        if (remainingAlive.length > 0) {
          // Choisit une cible au hasard pour l'attaque puissante
          const bossTarget = remainingAlive[Math.floor(Math.random() * remainingAlive.length)];
          const heavyDamage = (Math.floor(Math.random() * 6) + 3) * 2; // Dégâts x2 (6 à 16)

          bossTarget.pv = Math.max(0, bossTarget.pv - heavyDamage);

          state.message += ` ⚡ ATTAQUE PUISSANTE DU MONSTRE ! ${bossTarget.name} subit ${heavyDamage} dégâts !`;
        }
      }

      // 3. Vérification de fin de partie (Défaite)
      const allPlayersDead = Object.values(state.players).every((p) => p.pv === 0);

      if (allPlayersDead) {
        state.gameStatus = "DEFEAT";
        state.message = "💀 Défaite ! Tous les joueurs ont été éliminés...";
      } else {
        // Passer au joueur suivant
        state.activePlayerId = getNextActivePlayer(state.players, currentPlayerId);
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