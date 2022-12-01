import { Counter } from "./components/counter";
import { GameOfLife } from "./components/gameOfLife";

function App() {
  
  return (
    <>
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
