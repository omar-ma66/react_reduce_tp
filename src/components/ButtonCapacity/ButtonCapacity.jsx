import "./ButtonCapacity.css";
import { useDispatch, useSelector } from "react-redux";
import { useCapacity, hitBack, clearMessage } from "../../features/fight/fightSlice";

function ButtonCapacity({
  label = "Capacité",
  type = "damage",
  value = 5,
  manaCost = 0,
  icon = "fa-star",
  player,
}) {
  const dispatch = useDispatch();
  const gameStatus = useSelector((state) => state.fight.gameStatus);
  const activePlayerId = useSelector((state) => state.fight.activePlayerId);

  const isMyTurn = activePlayerId === player?.id;
  const isPlayerAlive = player?.pv > 0;
  const isGamePlaying = gameStatus === "PLAYING";

  // Vérification spécifique du manque de mana
  const requiredMana = type === "heal" ? value : manaCost;
  const hasNotEnoughMana = (player?.mana ?? 0) < requiredMana;

  // Conditions spécifiques pour les autres capacités
  const isHealInvalid = type === "heal" && (hasNotEnoughMana || player?.pv === player?.pvMax);
  const isManaRegenInvalid = type === "manaRegen" && (player?.pv <= 1 || player?.mana === player?.manaMax);

  // Conditions de désactivation
  const isDisabled =
    !isMyTurn ||
    !isPlayerAlive ||
    !isGamePlaying ||
    (type === "damage" && hasNotEnoughMana) ||
    isHealInvalid ||
    isManaRegenInvalid;

  // Conditions de désactivation (sans contrainte de tour)
// const isDisabled =
//   !isPlayerAlive ||
//   !isGamePlaying ||
//   (type === "damage" && hasNotEnoughMana) ||
//   isHealInvalid ||
//   isManaRegenInvalid;
// Conditions de désactivation (sans contrainte de tour)



  // Gestion de la variante de style en CSS pur
  let statusClass = "btn-capacity-active";
  if (isDisabled) {
    statusClass = hasNotEnoughMana ? "btn-capacity-no-mana" : "btn-capacity-disabled";
  }

  const handleAction = () => {
    if (isDisabled) return;

    dispatch(useCapacity({ playerId: player.id, type, value, manaCost }));

    if (player && player.id) {
      dispatch(hitBack(player.id));

      setTimeout(() => {
        dispatch(clearMessage());
      }, 2500);
    }
  };

  return (
    <button
      type="button"
      onClick={handleAction}
      disabled={isDisabled}
      className={`btn-capacity ${statusClass}`}
    >
      {label} <i className={`fas ${icon}`}></i> ({value})
      {manaCost > 0 && <span className="mana-cost">💧{manaCost}</span>}
    </button>
  );
}

export default ButtonCapacity;