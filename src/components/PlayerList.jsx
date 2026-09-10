import { useSelector } from "react-redux";
import PlayerCard from "./PlayerCard.jsx";
import "./PlayerList.css";

function PlayerList() {
  const players = useSelector((state) => state.fight.players);

  if (!players) {
    return <div className="players-loading">Chargement des joueurs ...</div>;
  }

  const playerList = Array.isArray(players) ? players : Object.values(players);

  return (
    <div className="players-container">
      {playerList.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
}

export default PlayerList;