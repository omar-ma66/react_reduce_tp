import { useState, useEffect, useRef } from "react";
import ButtonCapacity from "./ButtonCapacity/ButtonCapacity.jsx";
import ProgressBar from "./ProgressBar/ProgressBar.jsx";
import "./PlayerCard.css";

function PlayerCard({ player }) {
  const [isHit, setIsHit] = useState(false);
  const [lastDamage, setLastDamage] = useState(null);
  const prevPvRef = useRef(player.pv);

  useEffect(() => {
    const prevPv = prevPvRef.current;
    
    // Si les PV ont diminué, on déclenche l'animation
    if (player.pv < prevPv) {
      const damageTaken = prevPv - player.pv;
      setLastDamage(damageTaken);
      setIsHit(true);

      // On réinitialise l'animation après 800ms
      const timer = setTimeout(() => {
        setIsHit(false);
        setLastDamage(null);
      }, 800);

      // Met à jour la référence
      prevPvRef.current = player.pv;
      return () => clearTimeout(timer);
    }

    prevPvRef.current = player.pv;
  }, [player.pv]);

  return (
    <div
      key={player.id}
      className={`col-sm-3 card center ${isHit ? "player-card-hit" : ""}`}
      id={`joueur${player.id}`}
      style={{ position: "relative" }}
    >
      {/* Affichage du nombre de dégâts flottant au-dessus du joueur */}
      {isHit && lastDamage !== null && (
        <span className="damage-floating">-{lastDamage} PV</span>
      )}

      <div className="card-body text-center">
        <h5 className="card-title">{player.name}</h5>
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

        <div className="row mt-2">
          <div>
            <ButtonCapacity label="Frappe" type="damage" value={5} manaCost={0} icon="fa-fist-raised" player={player} />
            <ButtonCapacity label="Boule de feu" type="damage" value={20} manaCost={10} icon="fa-fire-alt" player={player} />
            <ButtonCapacity label="Soin" type="heal" value={15} icon="fa-medkit" player={player} />
            <ButtonCapacity label="Méditation" type="manaRegen" value={15} icon="fa-bolt" player={player} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;