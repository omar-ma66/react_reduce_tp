import { useState, useEffect, useRef } from "react";
import "./Monster.css";
import { useSelector } from "react-redux";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";

function Monster() {
  const monstre = useSelector((state) => state.fight.monster);
  const message = useSelector((state) => state.fight.message);
  const gameStatus = useSelector((state) => state.fight.gameStatus);

  const [isHit, setIsHit] = useState(false);
  const [lastDamage, setLastDamage] = useState(null);
  const prevPvRef = useRef(monstre.pv);

  // Détection des dégâts reçus par le monstre
  useEffect(() => {
    const prevPv = prevPvRef.current;

    if (monstre.pv < prevPv) {
      const damageTaken = prevPv - monstre.pv;
      setLastDamage(damageTaken);
      setIsHit(true);

      const timer = setTimeout(() => {
        setIsHit(false);
        setLastDamage(null);
      }, 800);

      prevPvRef.current = monstre.pv;
      return () => clearTimeout(timer);
    }

    prevPvRef.current = monstre.pv;
  }, [monstre.pv]);

  // Détermination de la classe de message
  let alertClass = "monster-alert-warning";
  if (gameStatus === "VICTORY") {
    alertClass = "monster-alert-success";
  } else if (gameStatus === "DEFEAT") {
    alertClass = "monster-alert-danger";
  }

  return (
    <section className="monster-section">
      <div className="monster-container">
        <div className="monster-card">
          {/* Bannière de Victoire / Défaite / Message */}
          {message && (
            <div className={`monster-alert ${alertClass}`} role="alert">
              {message}
            </div>
          )}

          <div className="monster-content">
            <div className={`monster-image-wrapper ${isHit ? "monster-hit" : ""}`}>
              {/* Dégâts flottants au-dessus du monstre */}
              {isHit && lastDamage !== null && (
                <span className="monster-damage-floating">-{lastDamage} PV</span>
              )}
              <img
                className="monster-image"
                src="http://res.publicdomainfiles.com/pdf_view/67/13925387417373.png"
                alt="monster"
              />
            </div>
            <div id="comboOnMonster" className="monster-combo"></div>
          </div>

          <ProgressBar
            pv={monstre.pv}
            pvMax={monstre.pvMax}
            bgType="bg-danger"
            faType="fa-heart"
            barName=" : pv"
          />
        </div>
      </div>
    </section>
  );
}

export default Monster;