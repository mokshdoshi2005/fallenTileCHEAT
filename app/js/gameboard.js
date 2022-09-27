export const GRID_SIZE = 4;
const CELL_SIZE = 70 / GRID_SIZE;   //vmin
const CELL_GAP = 1; //vmin
const GRID_GAP = 2;     //vmin

export default class Grid {
    constructor(gridElement) {
        gridElement.style.setProperty("--GRID-SIZE", GRID_SIZE)
        gridElement.style.setProperty("--CELL-SIZE", `calc(50vmin / ${GRID_SIZE})`)
        gridElement.style.setProperty("--CELL-SIZE-WIDE", `calc(45vmax / ${GRID_SIZE})`)
        gridElement.style.setProperty("--GRID-GAP", `${GRID_GAP}vmin`)
        // gridElement.style.setProperty("--CELL-WIDTH", `149px`)
        this.cells = createCellElement(gridElement,GRID_SIZE).map((cellElement, index) => {
            return new Cell(
                cellElement,
                index % GRID_SIZE,
                Math.floor(index / GRID_SIZE))
        });
        console.log(this.cells)
    }
};

class Cell {
    constructor(cellElement, x, y) {
        this.cellElement= cellElement
        this.x = x
        this.y = y
    }
};

function createCellElement(gridElement,GRID_SIZE) {
    let cells = []
    for ( let i = 0; i<GRID_SIZE*GRID_SIZE; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell")
        
        cell.dataset.x = i % GRID_SIZE;
        cell.dataset.y = Math.floor(i / GRID_SIZE);

        cells.push(cell)
        gridElement.append(cell)
    }
    return cells
};

export function Random() {
    // limit = limit || (GRID_SIZE * GRID_SIZE)
    let number = Math.random()
    number = Math.floor(number * (GRID_SIZE * GRID_SIZE)) 
    console.log(`%c${number}`,'color: #fcba03')
    return number
};

function SetPlayer() {let player = document.querySelector('.player')

    let special = Random();
    // cell.classList.add("player")
    player.dataset.x = special % GRID_SIZE;
    player.dataset.y = Math.floor(special / GRID_SIZE);

    player.style.setProperty("--x", special % GRID_SIZE);
    player.style.setProperty("--y", Math.floor(special / GRID_SIZE));

    console.log(`%c${player}`,'color: #ff0000;')
};
SetPlayer();


export function regenerateblock(block) {
    block.classList.remove('fallen')
    block.style.animation = "reappear 1s ease-in-out 750ms forwards";
    console.log('regenerated',block)
}