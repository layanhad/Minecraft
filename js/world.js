const grid = document.getElementById('grid');
const startButton = document.getElementById('start');
const sizeInput = document.getElementById('sizeInput');

let world = [];
let initialWorld = [];
let worldSize = 10; 
startButton.addEventListener('click', createWorld);

function createWorld() {
    const size = parseInt(sizeInput.value, 10) || worldSize;
    if (isNaN(size) || size < 10 || size > 50) {
        alert("Please enter a valid world size between 10 and 50.");
        return;
    }

    worldSize = size;
    grid.innerHTML = '';
    world = [];
    initialWorld = [];

    const dirtHeight = Math.floor(size / 3);
    const stoneLevel = size - dirtHeight - 1;
    const grassLevel = stoneLevel - 1;

    for (let row = 0; row < size; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        let rowTiles = [];
        let initialRowTiles = [];
        for (let col = 0; col < size; col++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');

            let tileType;
            if (row >= size - dirtHeight) {
                tileType = 'dirt';
            } else if (row === stoneLevel) {
                tileType = 'stone';
            } else if (row === grassLevel) {
                tileType = 'grass';
            } else {
                tileType = 'sky';
            }

            tile.dataset.type = tileType;
            rowDiv.appendChild(tile);
            rowTiles.push(tile);
            initialRowTiles.push(tileType);
        }

        grid.appendChild(rowDiv);
        world.push(rowTiles);
        initialWorld.push(initialRowTiles);
    }

    if (size >= 10 && size <= 15) {
        generateTree(grassLevel, Math.floor(size / 2)); 
    } else if (size > 15 && size <= 25) {
        generateTree(grassLevel, Math.floor(size / 3)); 
        generateTree(grassLevel, Math.floor(2 * size / 3)); 
    } else if (size > 25) {
        generateTree(grassLevel, Math.floor(size / 4));
        generateTree(grassLevel, Math.floor(size / 2)); 
        generateTree(grassLevel, Math.floor(3 * size / 4));
    }
}

function generateTree(grassLevel, col) {
    const treeHeight = Math.floor(Math.random() * 3) + 4;

    for (let i = 0; i < treeHeight; i++) {
        const row = grassLevel - i - 1;
        if (row >= 0 && world[row] && world[row][col]) {
            world[row][col].dataset.type = 'wood';
        }
    }

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const leafRow = grassLevel - treeHeight + i;
            const leafCol = col + j;
            if (leafRow >= 0 && leafCol >= 0 && leafCol < worldSize && world[leafRow] && world[leafRow][leafCol]) {
                world[leafRow][leafCol].dataset.type = 'leaves';
            }
        }
    }
}

createWorld();