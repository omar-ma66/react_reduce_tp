import "./ButtonCapacity.css";
import { useDispatch, useSelector } from "react-redux";
import { useCapacity, hitBack, clearMessage } from "../../features/fight/fightSlice";

function ButtonCapacity({ label = "Capacité", type = "damage", value = 5, icon = "fa-star", player }) {
  const dispatch = useDispatch();
  const gameStatus = useSelector((state) => state.fight.gameStatus);
  const activePlayerId = useSelector((state) => state.fight.activePlayerId);

  const isMyTurn = activePlayerId === player?.id;
  
  // Vérifications d'éligibilité selon le type de capacité
  let isResourceMissing = false;
  if (type === "heal") {
    // Impossible si pas de mana ou PV déjà au max
    isResourceMissing = player?.mana === 0 || player?.pv === player?.pvMax;
  } else if (type === "manaRegen") {
    // Impossible si PV trop bas (<= 1) ou Mana déjà au max
    isResourceMissing = player?.pv <= 1 || player?.mana === player?.manaMax;
  }

  const isDisabled = !isMyTurn || player?.pv === 0 || gameStatus !== "PLAYING" || isResourceMissing;

  const handleAction = () => {
    if (isDisabled) return;

    // 1. Déclenche l'action (dégâts, soin ou regen de mana)
    dispatch(useCapacity({ playerId: player.id, type, value }));

    // 2. Le monstre réplique ensuite
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
      className={`btn ${isDisabled ? "btn-secondary" : "btn-success"} material-tooltip-main m-1`}
    >
      {label} <i className={`fas ${icon}`}></i> ({value})
    </button>
  );
}

export default ButtonCapacity;