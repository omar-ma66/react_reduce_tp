import Monster from './components/Monster/Monster';
import PlayerList from './components/PlayerList';
import { useSelector, useDispatch } from 'react-redux';
import { function1, function2, function3 } from './features/Slice/mySlice';
import './App.css';
import SimultaneousAttackButton from './components/SimultaneousAttackButton/SimultaneousAttackButton';

function App() {
  const data_val = useSelector((state) => state.sliceTiroir.data_name);
  const dispatch = useDispatch();

  return (
    <div className="app-main-container">
      <div className="app-debug-toolbar" style={{color:"#000"}}>
        <span className="app-debug-label">{data_val}</span>
        <button className="app-btn-debug" onClick={() => dispatch(function1())}>
          Click function 1
        </button>
        <button className="app-btn-debug" onClick={() => dispatch(function2())}>
          Click function 2
        </button>
        <button className="app-btn-debug" onClick={() => dispatch(function3("super hacker"))}>
          Click function 3
        </button>
      </div>

      <main className="app-content">
        <Monster />
        <SimultaneousAttackButton />
        <section className="app-players-wrapper">
          <PlayerList />
        </section>
      </main>
    </div>
  );
}

export default App;