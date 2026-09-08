 import "./ButtonCapacity.css";
 import { useDispatch ,useSelector} from "react-redux";
 import { hitMonster,hitBack } from "../../features/fight/fightSlice";
function ButtonCapacity({ label = "hit",damage = 5 ,icon ="fa-fire-alt",player}) 

{
 
  const dispatch = useDispatch();

 
   const fight = () => {
     dispatch(hitMonster(damage));
     if(player && player.id){
      dispatch(hitBack(player.id))
     }
     console.log(`Attaque ${label} lancée avec ${damage} dégats !`);

  };

  return (
    <button
      type="button"
      onClick={fight}
      className="btn btn-success material-tooltip-main "
    >

      {label} <i className="fas fa-bomb"></i> { damage }<i className={`fas ${icon}`}></i>
   
    </button>
  );
}

export default ButtonCapacity;
