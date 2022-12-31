import { useRef, useState } from "react";
import "./FlockOfFish.css"

class Fish {
    x:number;
    y:number;
    private xForce:number = 0;
    private yForce:number = 0;

    move():void {
        this.xForce += this.xForce > 0 ? -GameArea.friction : GameArea.friction;
        this.yForce += this.yForce > 0 ? -GameArea.friction : GameArea.friction;
        if (Math.abs(this.xForce) < GameArea.forceToMove) {
            this.xForce = 0
        }
        if (Math.abs(this.yForce) < GameArea.forceToMove) {
            this.yForce = 0
        }
        let xMovement = this.xForce > 0 ? Math.abs(this.xForce) / GameArea.forceToMove : -(Math.abs(this.xForce) / GameArea.forceToMove); 
        let yMovement = this.yForce > 0 ? Math.abs(this.yForce) / GameArea.forceToMove : -(Math.abs(this.yForce) / GameArea.forceToMove); 
        this.x += xMovement;
        this.y += yMovement;
    }
    addXforce(amount:number):void {
        this.xForce += amount;
    }
    addYforce(amount:number):void {
        this.yForce += amount
    }
    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
}
class GameArea {
    static forceToMove:number = 87;
    static friction:number = 15;
}

export default function FlockOfFish() {
    const [player, setPlayer] = useState<Fish>(new Fish(0, 0))
    const [tick, setTick] = useState(0);

    let tickTimer = useRef<ReturnType<typeof setTimeout>>();

    if (tickTimer.current) {
        clearTimeout(tickTimer.current);
    }
   

    setTimeout(() => gameTick(), 20);

    function gameTick() {
        player.move();
        setTick(tick + 1);
    }

    function handleKeyDown(e:any) {
        e.preventDefault();
        switch (e.code) {
            case "ArrowUp": {
                player.addYforce(-200)
                return
            }
            case "ArrowDown": {
                player.addYforce(200)
                return
            }
            case "ArrowRight": {
                player.addXforce(200)
                return;
            }
            case "ArrowLeft": {
                player.addXforce(-200)
                return;
            }
        }
    }
    return (
        <div className="fish-wrapper">
            <h1>Move the fish and see the herd follow</h1>
            <div className="fish-wrapper__lake" tabIndex={0} onKeyDown={handleKeyDown}>
                <div className="fish" style={{left: player.x, top: player.y}}></div>
            </div>
        </div>
    )
}