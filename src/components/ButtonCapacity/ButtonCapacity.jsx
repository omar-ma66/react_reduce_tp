import "./ButtonCapacity.css";
import { useDispatch, useSelector } from "react-redux";
import { hitMonster, hitBack, clearMessage } from "../../features/fight/fightSlice";

function ButtonCapacity({ label = "hit", damage = 5, icon = "fa-fire-alt", player }) {
  const dispatch = useDispatch();
  const gameStatus = useSelector((state) => state.fight.gameStatus);

  // Le joueur ne peut plus attaquer s'il a 0 PV ou si la partie est finie
  const isDisabled = player?.pv === 0 || gameStatus !== "PLAYING";

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