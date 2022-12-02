import './jumpGame.css';
import { useState, useRef, KeyboardEvent } from 'react';


class Player {
    xPosition:number = 0;
    yPosition:number = 0;
    height:number = 50;
    width:number = 50;
    onGround:boolean;


    xForce:number = 0;
    yForce:number = 0;

    static gravityForce:number = 750;
    static maxVelocity:number = 100;
    static forceToIncreaseVelocity:number = 1200;
    static frictionForce:number = 50;
    static frictionForceGround:number = 600;

    public static xVelocity(force:number):number {
        return Math.round(force / this.forceToIncreaseVelocity)
    }
    public static yVelocity(force:number):number {
        return Math.round((force + this.gravityForce) / this.forceToIncreaseVelocity)
    }

    static reverseForce(force:number):number {
        return force < 0 ? Math.abs(force) : 0 - force;
    }

    constructor(x:number, y:number, xForce:number, yForce:number, ground:boolean) {
        this.xPosition = x;
        this.yPosition = y;
        this.xForce = xForce;
        this.yForce = yForce + Player.gravityForce;
        this.onGround = ground;
    }
}

export function Game() {

    const [running, setRunning] = useState<boolean>(true);
    const [player, setPlayer] = useState<Player>(new Player(0,0,0,0, false));

    const maxHeight = 788;
    const maxWidth = 788;

    let tickTimer = useRef<undefined | ReturnType<typeof setTimeout>>()

    clearTimeout(tickTimer.current);

    if (running) {
        tickTimer.current = setTimeout(() => gameTick(), 10);
    }

    function gameTick() {
        let playerNextXPosition = player.xPosition + Player.xVelocity(player.xForce);
        let playerNextYPosition = player.yPosition + Player.yVelocity(player.yForce);
        let nextYforce = 0;
        if (playerNextYPosition + player.height > maxHeight) {
            playerNextYPosition = maxHeight - player.height;
            nextYforce = Player.reverseForce(player.yForce) / 2;
        }
        setPlayer(new Player(
            playerNextXPosition,
            playerNextYPosition,
            player.xForce,
            nextYforce === 0 ? player.yForce : nextYforce,
            maxHeight - player.height === player.yPosition));
    }

    function handleKeyDown(e:KeyboardEvent) {
        e.preventDefault();
        if (e.code === "KeyP") {
            setRunning(!running);
            return;
        }
        console.log(e.code)
        switch (e.code) {
            case "Space": {
                console.log(maxHeight - player.height - 10)
                if (player.yPosition > maxHeight - player.height - 10) {
                    console.log("jausers");
                    player.yForce += -35000;
                }
            } break;
            case "ArrowRight": {
                player.xForce += 2500;
            } break;
            case "ArrowLeft": {
                player.xForce -= 2500;
            }
        }
    }



    return (
        <div id="game-area" tabIndex={0} onKeyDown={handleKeyDown}>
            <div id="player" style={{top: player.yPosition, left: player.xPosition }}><p>X: {player.xPosition} <br/> Y: {player.yPosition}</p></div>
        </div>
    );
}