import { useState, useEffect } from "react"
import './gameOfLife.css'

class Cell {
    row: number;
    column: number;
    alive: boolean;
    neighbours(tableRef:Table):Cell[] {
        let neighbouringCells = [];
        for (let iRow = this.row - 1 < 0 ? 0 : this.row - 1; iRow <= this.row + 1; iRow++) {
            if (iRow >= tableRef.rows) {
                continue;
            }
            for (let iCol = this.column - 1 < 0 ? 0 : this.column - 1; iCol <= this.column + 1; iCol++) {
                neighbouringCells.push(tableRef.getCell(iRow, iCol))  
            }
        }
        return neighbouringCells.filter(cell => cell.column !== this.column || cell.row !== this.row);
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

function aliveCheck(alivecount:number) {

}
function deadCheck(alivecount:number) {

}


export function GameOfLife() {
    const rows = 25;
    const columns = 25;
    
    const [currentTable, setCurrentTable] = useState<Table>({} as Table);
    const [initialRender, setInitialRender] = useState<boolean>(true)
    const [running, setRunning] = useState<boolean>(false)
    const [nextGeneration, setNextGeneration] = useState<Table>();

    if (initialRender) {
        let cells:Cell[][] = [];
        for (let iRow = 0; iRow < rows; iRow++) {
            cells[iRow] = []
            for (let iCol = 0; iCol < columns; iCol++) {
                cells[iRow][iCol] = new Cell(iRow, iCol, false)
            }
        }
        setCurrentTable(new Table(rows, columns, cells));
        setInitialRender(false);
    }
    

    function toggleAlive(row:number, column:number) {
        let cells:Cell[][] = [];
        cells = currentTable.cells.map(tableRow => tableRow.map(cell => new Cell(cell.row, cell.column, (cell.row === row && cell.column === column) ? cell.alive = !cell.alive : cell.alive)))
        setCurrentTable(new Table(rows, columns, cells));
    }
    
    if (currentTable.cells === undefined) {
        return (
            <></>
        );
    }
    console.log(currentTable.cells[1][12].neighbours(currentTable));

    return (
        <div className="game-of-life-wrapper">
            <table>
                <tbody>
                    {currentTable.cells.map(tableRow => <tr>{tableRow.map(cell => <td onClick={() => toggleAlive(cell.row, cell.column)} className={cell.alive === true ? "alive" : "dead"}></td>)}</tr>)}
                </tbody>
            </table>
            {}
        </div>
    );
}