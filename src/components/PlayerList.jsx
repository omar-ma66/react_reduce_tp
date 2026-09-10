import { useSelector } from "react-redux";
import PlayerCard from "./PlayerCard.jsx";
import "./PlayerList.css";

function PlayerList() {
  const players = useSelector((state) => state.fight.players);
const background = ["backcolor1","backcolor2","backcolor3","backcolor4"];
  if (!players) {
    return <div className="players-loading">Chargement des joueurs ...</div>;
  }

  const playerList = Array.isArray(players) ? players : Object.values(players);

  return (
    <div className="players-container">
      {playerList.map((player) => (
        <PlayerCard key={player.id} player={player} backcolor={background[player.id - 1]} />
      ))}
    </div>
  );
}

export default PlayerList;