import { useState } from "react";

export function Counter() {
    const [count, setCount] = useState(0);

    const handleClick = (value:number) => {
      setCount(count + value);
    }
  
    return (
      <div className="counter">
        <h1>{count}</h1>
        <button value={1} onClick={e => handleClick(parseInt(e.currentTarget.value))}>Increment</button>
        <button value={-1} onClick={e => handleClick(parseInt(e.currentTarget.value))}>Decrement</button>
        <button value={-count} onClick={e => handleClick(parseInt(e.currentTarget.value))}>Reset</button>
      </div>
    );
}