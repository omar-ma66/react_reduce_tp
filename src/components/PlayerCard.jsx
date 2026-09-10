import { useState, useEffect, useRef } from "react";
import ButtonCapacity from "./ButtonCapacity/ButtonCapacity.jsx";
import ProgressBar from "./ProgressBar/ProgressBar.jsx";
import "./PlayerCard.css";

function PlayerCard({ player ,backcolor }) {
  const [isHit, setIsHit] = useState(false);
  const [lastDamage, setLastDamage] = useState(null);
  const prevPvRef = useRef(player.pv);

  useEffect(() => {
    const prevPv = prevPvRef.current;
    
    if (player.pv < prevPv) {
      const damageTaken = prevPv - player.pv;
      setLastDamage(damageTaken);
      setIsHit(true);

      const timer = setTimeout(() => {
        setIsHit(false);
        setLastDamage(null);
      }, 800);

      prevPvRef.current = player.pv;
      return () => clearTimeout(timer);
    }

    prevPvRef.current = player.pv;
  }, [player.pv]);


   

  return (
    <div
      key={player.id}
      className={`player-card ${isHit ? "player-card-hit" : ""} ${backcolor}` }
      id={`joueur${player.id}`}
    >
      {isHit && lastDamage !== null && (
        <span className="damage-floating">-{lastDamage} PV</span>
      )}

      <div className="player-card-body">
        {/* Avatar du personnage */}
        <div className="player-avatar-wrapper">
          <img
            src={player.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=" + player.name}
            alt={player.name}
            className="player-avatar"
          />
        </div>

        <h5 className="player-card-title">{player.name}</h5>
        
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
          bgType="bg-primary"
        />

        <div className="player-actions">
          <ButtonCapacity label="Frappe" type="damage" value={5} manaCost={0} icon="fa-fist-raised" player={player} />
          <ButtonCapacity label="Boule de feu" type="damage" value={20} manaCost={10} icon="fa-fire-alt" player={player} />
          <ButtonCapacity label="Soin" type="heal" value={15} icon="fa-medkit" player={player} />
          <ButtonCapacity label="Méditation" type="manaRegen" value={15} icon="fa-bolt" player={player} />
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;