const gameField = document.getElementById('gameField');
const bombSelector = document.getElementById('bombSelector');
const winChanceDisplay = document.getElementById('winChance');
const gameHashDisplay = document.getElementById('gameHash');
const loader = document.getElementById('loader');
const gameInfo = document.getElementById('gameInfo');
let bombCount = 3;
let field = [];
const totalCells = 25;


function initializeField() {
    gameField.innerHTML = '';
    field = Array(totalCells).fill(0);
    placeMines();
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gameField.appendChild(cell);
    }
}


bombSelector.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        bombSelector.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        bombCount = parseInt(e.target.getAttribute('data-bombs'));
        initializeField();
    }
});


function placeMines() {
    field = Array(totalCells).fill(0);
    let placedMines = 0;
    while (placedMines < bombCount) {
        const randomIndex = Math.floor(Math.random() * totalCells);
        if (field[randomIndex] === 0) {
            field[randomIndex] = 1;
            placedMines++;
        }
    }
}


function generateWinChance() {
    return Math.floor(Math.random() * 16) + 82;
}


function generateGameHash() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let hash = '';
    for (let i = 0; i < 10; i++) {
        hash += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return hash;
}


function getSignal() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('safe');
        cell.innerHTML = '';
    });

    gameInfo.style.display = 'none';
    loader.style.display = 'block';
    setTimeout(() => {
        let safeCellsToShow;
        if (bombCount === 3) {
            safeCellsToShow = Math.floor(Math.random() * 3) + 5;
        } else if (bombCount === 7) {
            safeCellsToShow = 3;
        } else if (bombCount === 6) {
            safeCellsToShow = 4;
        } else {
            safeCellsToShow = Math.floor(Math.random() * 3) + 4;
        }

        const safeIndices = [];
        for (let i = 0; i < totalCells; i++) {
            if (field[i] === 0) {
                safeIndices.push(i);
            }
        }

        const selectedSafeIndices = [];
        while (selectedSafeIndices.length < safeCellsToShow && safeIndices.length > 0) {
            const randomIndex = Math.floor(Math.random() * safeIndices.length);
            selectedSafeIndices.push(safeIndices[randomIndex]);
            safeIndices.splice(randomIndex, 1);
        }

        selectedSafeIndices.forEach(index => {
            cells[index].classList.add('safe');
            const diamondImg = document.createElement('img');
            diamondImg.src = 'assets/diamondCenter.webp';
            diamondImg.alt = 'Diamond';
            diamondImg.classList.add('diamond-icon');
            cells[index].appendChild(diamondImg);
        });


        winChanceDisplay.textContent = `${generateWinChance()}%`;
        gameHashDisplay.textContent = generateGameHash();
        loader.style.display = 'none';
        gameInfo.style.display = 'block';
    }, 1000);
}


initializeField();
