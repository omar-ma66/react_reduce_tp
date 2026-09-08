import "./ButtonCapacity.css";
import { useDispatch, useSelector } from "react-redux";
import { hitMonster, hitBack, clearMessage } from "../../features/fight/fightSlice";

function ButtonCapacity({ label = "hit", damage = 5, icon = "fa-fire-alt", player }) {
  const dispatch = useDispatch();
  const gameStatus = useSelector((state) => state.fight.gameStatus);
  const activePlayerId = useSelector((state) => state.fight.activePlayerId);

  // Le bouton est actif SEULEMENT si :
  // - C'est le tour du joueur
  // - Le joueur a des PV > 0
  // - La partie est toujours en cours ("PLAYING")
  const isMyTurn = activePlayerId === player?.id;
  const isDisabled = !isMyTurn || player?.pv === 0 || gameStatus !== "PLAYING";

  const fight = () => {
    if (isDisabled) return;

    dispatch(hitMonster(damage));

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
      onClick={fight}
      disabled={isDisabled}
      className={`btn ${isDisabled ? "btn-secondary" : "btn-success"} material-tooltip-main`}
    >
      {label} <i className="fas fa-bomb"></i> {damage} <i className={`fas ${icon}`}></i>
    </button>
  );
}

export default ButtonCapacity;