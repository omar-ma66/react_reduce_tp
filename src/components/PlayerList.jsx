import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import PlayerCard from "./PlayerCard.jsx";

function PlayerList() {

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
