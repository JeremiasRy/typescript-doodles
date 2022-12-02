import { Counter } from "./components/counter";
import { GameOfLife } from "./components/gameOfLife";
import { Game } from "./components/jumpGame";

function App() {
  
  return (
    <>
    <div className="component-wrapper">
      <Game />
    </div>
    <div className="component-wrapper">
      <GameOfLife />
    </div>
    <div className="component-wrapper">
      <Counter />
    </div>
    </>
  );
}

export default App;
