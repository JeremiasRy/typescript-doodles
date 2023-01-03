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

    move(leadX:number, leadY:number):void {
        this.xForce += leadX > this.x ? 25 : -25;
        this.yForce += leadY > this.y ? 25 : -25;
        this.xForce += this.xForce > 0 ? -GameArea.friction : GameArea.friction;
        this.yForce += this.yForce > 0 ? -GameArea.friction : GameArea.friction;

        let xMovement = this.xForce > 0 ? Math.abs(this.xForce) / GameArea.forceToMove : -(Math.abs(this.xForce) / GameArea.forceToMove); 
        let yMovement = this.yForce > 0 ? Math.abs(this.yForce) / GameArea.forceToMove : -(Math.abs(this.yForce) / GameArea.forceToMove); 
        this.x += xMovement;
        this.y += yMovement;
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
    const [herd, setHerd] = useState<HerdFish[]>([]);
    const [tick, setTick] = useState(0);

    if (herd.length === 0) {
        initializeHerd();
    }

    let tickTimer = useRef<ReturnType<typeof setTimeout>>();

    if (tickTimer.current) {
        clearTimeout(tickTimer.current);
    }

    function handleMouseMove(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        player.x = e.clientX;
        player.y = e.clientY;
    } 

    setTimeout(() => gameTick(), 30);

    function gameTick() {
        herd.forEach(fish => fish.move(player.x + Math.random() * 100, player.y + Math.random() * 50));
        setTick(tick + 1);
    }
    function initializeHerd() {
        let newArr:HerdFish[] = [];
        for (let i = 0; i < 50; i++) {
            newArr.push(new HerdFish(500 + Math.random() * 500, 250 + Math.random() * 500))
        }
        setHerd(newArr);
    }

    return (
        <div className="fish-wrapper">
            <h1>Move your mouse and see the herd follow</h1>
            <div className="fish-wrapper__lake" onMouseMove={(e) => handleMouseMove(e)}>
                {herd.map(fish => <div className="fish" style={{top: fish.y, left: fish.x}}></div>)}
            </div>
        </div>
    )
}