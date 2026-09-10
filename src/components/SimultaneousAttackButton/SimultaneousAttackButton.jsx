import { useDispatch, useSelector } from "react-redux";
import { simultaneousAttack } from "../../features/fight/fightSlice";
import "./SimultaneousAttackButton.css";

function SimultaneousAttackButton() {
  const dispatch = useDispatch();
  const monsterHitBackCount = useSelector((state) => state.fight.monsterHitBackCount);
  const gameStatus = useSelector((state) => state.fight.gameStatus);

  // Disponible si le monstre n'a pas riposté au moins 2 fois et que le jeu est en cours
  const isAvailable = monsterHitBackCount >= 2 && gameStatus === "PLAYING";

  if (!isAvailable) return null; // Le bouton reste masqué tant que la condition n'est pas remplie

  return (
    <div className="simultaneous-attack-container">
      <button
        type="button"
        className="btn-simultaneous-attack"
        onClick={() => dispatch(simultaneousAttack())}
      >
        ⚡ ATTAQUE SIMULTANÉE DES 4 JOUEURS (Coût : -75% Mana) ⚡
      </button>
    </div>
  );
}

export default SimultaneousAttackButton;