import { useState, useEffect } from "react"
import './gameOfLife.css'

class TableSquare {
    row: number;
    column: number;
    alive: boolean;
    neighbours: TableSquare[] = [];
    
    constructor(row:number, column:number, alive:boolean) {
        this.row = row;
        this.column = column;
        this.alive = alive;
    }
}

class Table {
    rows: number;
    columns: number;
    cells:TableSquare[][];

    getCell(row:number, col:number) {
        return this.cells[row][col];
    }

    constructor(rows:number, columns:number, cells:TableSquare[][]) {        
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

function aliveCheck() {

}
function deadCheck() {

}


export function GameOfLife() {
    const rows = 25;
    const columns = 25;
    
    const [currentTable, setCurrentTable] = useState<Table>({} as Table);
    const [initialRender, setInitialRender] = useState<boolean>(true)
    const [nextGeneration, setNextGeneration] = useState<Table>();

    if (initialRender) {
        let cells:TableSquare[][] = [];
        for (let iRow = 0; iRow < rows; iRow++) {
            cells[iRow] = []
            for (let iCol = 0; iCol < columns; iCol++) {
                cells[iRow][iCol] = new TableSquare(iRow, iCol, false)
            }
        }
        setCurrentTable(new Table(rows, columns, cells));
        setInitialRender(false);
    }
    

    function toggleAlive(row:number, column:number) {
        let cells:TableSquare[][] = [];
        cells = currentTable.cells.map(tableRow => tableRow.map(cell => new TableSquare(cell.row, cell.column, (cell.row === row && cell.column === column) ? cell.alive = !cell.alive : cell.alive)))
        setCurrentTable(new Table(rows, columns, cells));
    }
    
    if (currentTable.cells === undefined) {
        return (
            <></>
        );
    }

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