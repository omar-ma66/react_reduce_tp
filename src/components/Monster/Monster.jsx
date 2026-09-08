import './Monster.css';
import { useSelector } from "react-redux";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";

function Monster() {

const monstre = useSelector((state)=> state.fight.monster) ;
const message = useSelector((state)=> state.fight.message ) ;

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="card-monstre col-sm-12">
            <div id="monsterCard">
              <div className="text-center">
                { message && ( <div className="alert alert-warning text-center font-weight-bold my-2" role='alert'>{message}</div>)}
                <div className="row">
                  <div className="col-sm-2 offset-sm-3">
                    <span
                      className="badge badge-danger ml-2 "
                      id="degatSpanMonster"
                    ></span>
                    <img
                      className="img-fluid"
                      src="http://res.publicdomainfiles.com/pdf_view/67/13925387417373.png"
                      alt="monster"
                    />
                  </div>

                  <div id="comboOnMonster" className="col-sm-6"></div>
                </div>
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
        </div>
      </div>
    </section>
  );
}

export default Monster;
