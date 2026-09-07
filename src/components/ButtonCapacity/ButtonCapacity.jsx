 import "./ButtonCapacity.css";
 import { useDispatch ,useSelector} from "react-redux";
 import { hitMonster } from "../../features/fight/fightSlice";
function ButtonCapacity() {
 
  const dispatch = useDispatch();


   const fight = () => {
    console.log("aie !");

    dispatch(hitMonster(5));

  };

  return (
    <button
      type="button"
      onClick={fight}
      className="btn btn-success material-tooltip-main "
    >
      hit
      <i className="fas fa-bomb"></i> 5<i className="fas fa-fire-alt"></i> - 5
    </button>
  );
}

export default ButtonCapacity;
