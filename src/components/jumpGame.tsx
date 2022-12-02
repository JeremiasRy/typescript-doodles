import './jumpGame.css';
import { useState, useRef, KeyboardEvent } from 'react';


class Player {
    xPosition:number = 0;
    yPosition:number = 0;
    height:number = 50;
    width:number = 50;

    xForce:number = 0;
    yForce:number = 0;

    static gravityForce:number = 750;
    static maxVelocity:number = 100;
    static forceToIncreaseVelocity:number = 1000;
    static frictionForce:number = 50;
    static frictionForceGround:number = 300;

    public static xVelocity(force:number):number {
        return Math.round(force / this.forceToIncreaseVelocity);
    }
    public static yVelocity(force:number):number {
        return Math.round((force + this.gravityForce) / this.forceToIncreaseVelocity);
    }

    static reverseForce(force:number):number {
        return force < 0 ? Math.abs(force) : 0 - force;
    }

    constructor(x:number, y:number, xForce:number, yForce:number, ground:boolean) {
        this.xPosition = x;
        this.yPosition = y;
        if (ground) {
            if (xForce < 0) {
                this.xForce = xForce + Player.frictionForceGround > 0 ? 0 : xForce + Player.frictionForceGround;
            } else {
                this.xForce = xForce - Player.frictionForceGround < 0 ? 0 : xForce - Player.frictionForceGround;
            }
        } else {
            if (xForce < 0) {
                this.xForce = xForce + Player.frictionForce > 0 ? 0 : xForce + Player.frictionForce;
            } else {
                this.xForce = xForce - Player.frictionForce < 0 ? 0 : xForce - Player.frictionForce;
            }
        }
        this.yForce = yForce + Player.gravityForce;
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
        switch (e.code) {
            case "Space": {
                if (player.yPosition > maxHeight - player.height - 10) {
                    player.yForce += -35000;
                }
            } break;
            case "ArrowRight": {
                if (Math.abs(player.xForce) < Player.forceToIncreaseVelocity) {
                    player.xForce += 10000
                } else {
                    player.xForce += 1500;
                }
                
            } break;
            case "ArrowLeft": {
                if (Math.abs(player.xForce) < Player.forceToIncreaseVelocity) {
                    player.xForce -= 10000
                } else {
                    player.xForce -= 1500;
                }

            }
        }
    }



    return (
        <div id="game-area" tabIndex={0} onKeyDown={handleKeyDown}>
            <div id="player" style={{top: player.yPosition, left: player.xPosition }}><p>X: {player.xPosition} <br/> Y: {player.yPosition}</p></div>
        </div>
    );
}