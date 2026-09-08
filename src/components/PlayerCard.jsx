import { useSelector } from "react-redux";
import ButtonCapacity from "./ButtonCapacity/ButtonCapacity.jsx";
import ProgressBar from "./ProgressBar/ProgressBar.jsx";

function PlayerCard({ player }) {
  const activePlayerId = useSelector((state) => state.fight.activePlayerId);
  const isCurrentTurn = activePlayerId === player.id;

  return (
    <div
      key={player.id}
      className={`col-sm-3 card center ${
        isCurrentTurn ? "bg-light border-primary shadow" : "opacity-50"
      }`}
      id={`joueur${player.id}`}
      style={{
        borderWidth: isCurrentTurn ? "3px" : "1px",
        transition: "all 0.3s ease"
      }}
    >
      <div className="card-body text-center">
        <h5 className="card-title">
          {player.name} {isCurrentTurn && "⚔️ (À son tour)"}
        </h5>
        <ProgressBar
          pv={player.pv}
          pvMax={player.pvMax}
          faType="fa-heart"
          barName=" : pv "
          bgType="bg-danger"
        />
        <ProgressBar
          pv={player.mana}
          pvMax={player.manaMax}
          faType="fa-fire-alt"
          barName=" : mana "
        />

        <span className="badge badge-danger ml-2 " id="degatSpanJ1"></span>
        <div className="row ">
          <div>
            <ButtonCapacity label="Frappe" damage={5} player={player} />
            <ButtonCapacity label="Boule de feu" damage={15} player={player} />
            <ButtonCapacity label="Coup critique" damage={30} player={player} />
            <ButtonCapacity label="Ultime" damage={50} player={player} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;