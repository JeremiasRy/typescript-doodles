import { useRef, useState, useEffect } from "react"
import './gameOfLife.css'

class Cell {
    row: number;
    column: number;
    alive: boolean;
    neighboursAlive(tableRef:Table):number {
        let neighbouringCells = [];
        for (let iRow = this.row - 1 < 0 ? 0 : this.row - 1; iRow <= this.row + 1; iRow++) {
            if (iRow >= tableRef.rows) {
                continue;
            }
            for (let iCol = this.column - 1 < 0 ? 0 : this.column - 1; iCol <= this.column + 1; iCol++) {
                if (iCol >= tableRef.columns) {
                    continue;
                }
                neighbouringCells.push(tableRef.getCell(iRow, iCol))  
            }
        }
        return neighbouringCells.filter(cell => (cell.column !== this.column || cell.row !== this.row) && cell.alive).length;
    }
    
    constructor(row:number, column:number, alive:boolean) {
        this.row = row;
        this.column = column;
        this.alive = alive;
    }
}

class Table {
    rows: number;
    columns: number;
    cells:Cell[][];
    getCell(row:number, col:number) {
        return this.cells[row][col];
    }

    constructor(rows:number, columns:number, cells:Cell[][]) {        
        this.columns = columns;
        this.rows = rows;
        this.cells = [];
        for (let iRow = 0; iRow < rows; iRow++) {
            this.cells[iRow] = [];
            for (let iCol = 0; iCol < columns; iCol++) {
                this.cells[iRow][iCol] = cells[iRow][iCol];
            }
        }
    }
}

function nextGenStatus(alive:boolean, neighboursAlive:number):boolean {
    if (alive) {
        return neighboursAlive >= 2 && neighboursAlive <= 3;
    } else {
        return neighboursAlive === 3;
    }
}

export function GameOfLife() {
    const rows = 25;
    const columns = 25;
    
    const [currentTable, setCurrentTable] = useState<Table>({} as Table);
    const [reset, setReset] = useState<boolean>(true)
    const [running, setRunning] = useState<boolean>(false)
    const [nextGeneration, setNextGeneration] = useState<Table>();
    const [generation, setGeneration] = useState<number>(0);

    let timer = useRef<ReturnType<typeof setTimeout>>();

    clearTimeout(timer.current)

    if (running) {
        timer.current = setTimeout(() => createNextGen(), 150);
    } 

    if (reset) {
        let cells:Cell[][] = [];
        for (let iRow = 0; iRow < rows; iRow++) {
            cells[iRow] = []
            for (let iCol = 0; iCol < columns; iCol++) {
                cells[iRow][iCol] = new Cell(iRow, iCol, false)
            }
        }
        setCurrentTable(new Table(rows, columns, cells));
        setNextGeneration(undefined);
        setGeneration(0);
        setReset(false);
        setRunning(false);
    }

    function toggleAlive(row:number, column:number) {
        let cells:Cell[][] = [];
        cells = currentTable.cells.map(tableRow => tableRow.map(cell => new Cell(cell.row, cell.column, (cell.row === row && cell.column === column) ? cell.alive = !cell.alive : cell.alive)))
        setCurrentTable(new Table(rows, columns, cells));
    }

    function advanceGenerationClick() {
        createNextGen();
    }

    function createNextGen() {
        let cells:Cell[][] = [];
        for (let iRow = 0; iRow < rows; iRow++) {
            cells[iRow] = []
            for (let iCol = 0; iCol < columns; iCol++) {
                let currentCell = currentTable.getCell(iRow, iCol);
                cells[iRow][iCol] = new Cell(iRow, iCol, nextGenStatus(currentCell.alive, currentCell.neighboursAlive(currentTable)));
            }
        }
        setNextGeneration(new Table(rows, columns, cells))
    }
    
    if (currentTable.cells === undefined) {
        return (
            <></>
        );
    }

    if (nextGeneration !== undefined) {
        setCurrentTable(nextGeneration);
        setNextGeneration(undefined);
        setGeneration(generation + 1);
    }

    return (
        <div className="game-of-life-wrapper">
            <table className="world-of-cells">
                <tbody>
                    {currentTable.cells.map(tableRow => <tr>{tableRow.map(cell => <td onClick={() => toggleAlive(cell.row, cell.column)} className={cell.alive === true ? "alive" : "dead"}></td>)}</tr>)}
                </tbody>
            </table>
            <div className="controls">
                <button onClick={advanceGenerationClick}>Advance one generation</button>
                <button onClick={() => { setRunning(!running) }}>{running ? "Stop" : "Start" }</button>
                <button onClick={() => { setReset(true) }}>Reset</button>
                <p>Generation: {generation}</p>
            </div>
        </div>
    );
}