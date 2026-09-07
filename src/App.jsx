import './style.css'
import Monster from './components/Monster/Monster'
import PlayerList from './components/PlayerList'
import { useSelector ,useDispatch } from 'react-redux'
import { function1,function2,function3 } from './features/Slice/mySlice'
function App() {
 const data_val = useSelector((state) => state.sliceTiroir.data_name );
 const dispatch = useDispatch();

  return (
    <> 
    <div>
  <span>{data_val}</span>
      <button onClick={()=> dispatch(function1())}> Clik function 1 </button>
      <button onClick={()=> dispatch(function2())}> Clik function 2</button>
      <button onClick={()=> dispatch(function3("super hacker"))}> Clik function 3</button>
    </div>
    <div className="App">
        <Monster />
        <br></br>
        <section className="container-fluid">
          <PlayerList />
        </section >
      </div>
      </>
  )
}

export default App
