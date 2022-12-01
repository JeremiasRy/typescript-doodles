import { useState } from "react";
import './counter.css';

export function Counter() {
    const [count, setCount] = useState(0);

    const handleClick = (value:number) => {
      setCount(count + value);
    }
  
    return (
      <div className="counter">
        <h1>Counter</h1>
        <p>You guessed it! It's a counter!</p>
        <h3>{count}</h3>
        <div className="buttons">
        <button value={1} onClick={e => handleClick(parseInt(e.currentTarget.value))}>Increment</button>
        <button value={-1} onClick={e => handleClick(parseInt(e.currentTarget.value))}>Decrement</button>
        <button value={-count} onClick={e => handleClick(parseInt(e.currentTarget.value))}>Reset</button>
        </div>
      </div>
    );
}