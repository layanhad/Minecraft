const grid = document.getElementById('grid');
const sizeInput = document.getElementById('sizeInput');
let world = [];
let worldSize = 10;

function createWorld() {
    const size = parseInt(sizeInput.value, 10) || worldSize;
    if (isNaN(size) || size < 10 || size > 50) {
        alert("Please enter a valid world size between 10 and 50.");
        return;
    }

    worldSize = size;
    grid.innerHTML = ''; 
    world = [];

    const dirtHeight = Math.floor(size / 3);
    const stoneLevel = size - dirtHeight - 1;
    const grassLevel = stoneLevel - 1;

    for (let row = 0; row < size; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        let rowTiles = [];
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
        }

        grid.appendChild(rowDiv);  
        world.push(rowTiles);     
    }
}


createWorld();
