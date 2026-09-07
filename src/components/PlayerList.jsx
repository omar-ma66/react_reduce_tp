import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import PlayerCard from "./PlayerCard.jsx";

function PlayerList() {
  // const [players] = useState({
  //   1: { name: "John", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 1 },
  //   2: { name: "Jack", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 2 },
  //   3: { name: "Jessy", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 3 },
  //   4: { name: "Jenny", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 4 },
  // }); 

const players = useSelector((state)=>state.fight.players) ;

if(!players )
{
  return ( <div>Chargement des joueurs ...</div>)
}

const playerList = Array.isArray(players) ? players : Object.values(players) ;
  return (
    <div className="row">
      {playerList.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
}

export default PlayerList;
