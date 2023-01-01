import React, { useRef, useState } from "react";
import "./FlockOfFish.css"

class Fish {
    x:number;
    y:number;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
}
class HerdFish extends Fish {
    private xForce:number = 0;
    private yForce:number = 0;

    move():void {
        this.xForce += this.xForce > 0 ? -GameArea.friction : GameArea.friction;
        this.yForce += this.yForce > 0 ? -GameArea.friction : GameArea.friction;

        let xMovement = this.xForce > 0 ? Math.abs(this.xForce) / GameArea.forceToMove : -(Math.abs(this.xForce) / GameArea.forceToMove); 
        let yMovement = this.yForce > 0 ? Math.abs(this.yForce) / GameArea.forceToMove : -(Math.abs(this.yForce) / GameArea.forceToMove); 
        this.x += xMovement;
        this.y += yMovement;
    }
    addXforce(leadX:number):void {
        this.xForce += leadX > this.x ? 25 : -25;
    }
    addYforce(leadY:number):void {
        this.yForce += leadY > this.y ? 25 : -25;
    }
    constructor(x:number, y:number) {
        super(x,y);
    }
}
class GameArea {
    static forceToMove:number = 87;
    static friction:number = 15;
}

export default function FlockOfFish() {
    const [player, setPlayer] = useState<Fish>(new Fish(0, 0))
    const [herd, setHerd] = useState<HerdFish>(new HerdFish(500, 500))
    const [tick, setTick] = useState(0);

    let tickTimer = useRef<ReturnType<typeof setTimeout>>();

    if (tickTimer.current) {
        clearTimeout(tickTimer.current);
    }

    function handleMouseMove(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        player.x = e.clientX;
        player.y = e.clientY;
    } 

    setTimeout(() => gameTick(), 40);

    function gameTick() {
        herd.addXforce(player.x);
        herd.addYforce(player.y);
        herd.move();
        setTick(tick + 1);
    }

    return (
        <div className="fish-wrapper">
            <h1>Move your mouse and see the herd follow</h1>
            <div className="fish-wrapper__lake" onMouseMove={(e) => handleMouseMove(e)}>
                <div className="fish" style={{left: herd.x, top: herd.y}}></div>
            </div>
        </div>
    )
}