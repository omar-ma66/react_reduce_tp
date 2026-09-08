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

  // Le bouton est désactivé si :
  // - Ce n'est pas son tour / joueur KO / partie finie
  // - Manque de mana
  // - Conditions de soin/regen non remplies
  const isDisabled =
    !isMyTurn ||
    !isPlayerAlive ||
    !isGamePlaying ||
    (type === "damage" && hasNotEnoughMana) ||
    isHealInvalid ||
    isManaRegenInvalid;

  // Choix de la couleur Bootstrap :
  // - Bleu (btn-primary) si le bouton est bloqué à cause du MANA INSUFFISANT
  // - Gris (btn-secondary) pour les autres désactivations
  // - Vert (btn-success) quand il est actif
  let buttonStyle = "btn-success";
  if (isDisabled) {
    buttonStyle = hasNotEnoughMana ? "btn-primary" : "btn-secondary";
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
      className={`btn ${buttonStyle} material-tooltip-main m-1`}
    >
      {label} <i className={`fas ${icon}`}></i> ({value})
      {manaCost > 0 && <span className="ml-1">💧{manaCost}</span>}
    </button>
  );
}

export default ButtonCapacity;