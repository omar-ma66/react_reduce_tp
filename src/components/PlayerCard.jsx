import ButtonCapacity from "./ButtonCapacity/ButtonCapacity.jsx";
import ProgressBar from "./ProgressBar/ProgressBar.jsx";

function PlayerCard({ player }) {
  return (
    <div
      key={player.id}
      className="col-sm-3 card center"
      id={`joueur${player.id}`}
    >
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

        <span className="badge badge-danger ml-2 " id="degatSpanJ1"></span>
        <div className="row ">
          <div>
            {/* 1. Attaque basique : 5 dégâts, 0 Mana */}
            <ButtonCapacity label="Frappe" type="damage" value={5} manaCost={0} icon="fa-fist-raised" player={player} />
            
            {/* 2. Attaque puissante : 20 dégâts, 10 Mana */}
            <ButtonCapacity label="Boule de feu" type="damage" value={20} manaCost={10} icon="fa-fire-alt" player={player} />
            
            {/* 3. Soin : Soigne jusqu'à 15 PV en dépensant jusqu'à 15 Mana */}
            <ButtonCapacity label="Soin" type="heal" value={15} icon="fa-medkit" player={player} />
            
            {/* 4. Méditation : Récupère jusqu'à 15 Mana en dépensant jusqu'à 15 PV */}
            <ButtonCapacity label="Méditation" type="manaRegen" value={15} icon="fa-bolt" player={player} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;