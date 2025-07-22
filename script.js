document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.getElementById('grid-container');
    const randomStarsButton = document.getElementById('randomStars');
    const chanceElement = document.getElementById('chance');
    const hashElement = document.getElementById('hash');
    const mineButtons = document.querySelectorAll('.btn-mine');
    
    let selectedMines = 3; // Default value
    let grid = null;

    // Сохраняем исходный HTML сетки
    const originalGridHTML = `
        <svg id="game-grid" width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="56" height="56" fill="url(#pattern0)"/>
            <rect x="66" width="56" height="56" fill="url(#pattern1)"/>
            <rect x="132" width="56" height="56" fill="url(#pattern2)"/>
            <rect x="198" width="56" height="56" fill="url(#pattern3)"/>
            <rect x="264" width="56" height="56" fill="url(#pattern4)"/>
            <rect y="66" width="56" height="56" fill="url(#pattern5)"/>
            <rect x="66" y="66" width="56" height="56" fill="url(#pattern6)"/>
            <rect x="132" y="66" width="56" height="56" fill="url(#pattern7)"/>
            <rect x="198" y="66" width="56" height="56" fill="url(#pattern8)"/>
            <rect x="264" y="66" width="56" height="56" fill="url(#pattern9)"/>
            <rect y="132" width="56" height="56" fill="url(#pattern10)"/>
            <rect x="66" y="132" width="56" height="56" fill="url(#pattern11)"/>
            <rect x="132" y="132" width="56" height="56" fill="url(#pattern12)"/>
            <rect x="198" y="132" width="56" height="56" fill="url(#pattern13)"/>
            <rect x="264" y="132" width="56" height="56" fill="url(#pattern14)"/>
            <rect y="198" width="56" height="56" fill="url(#pattern15)"/>
            <rect x="66" y="198" width="56" height="56" fill="url(#pattern16)"/>
            <rect x="132" y="198" width="56" height="56" fill="url(#pattern17)"/>
            <rect x="198" y="198" width="56" height="56" fill="url(#pattern18)"/>
            <rect x="264" y="198" width="56" height="56" fill="url(#pattern19)"/>
            <rect y="264" width="56" height="56" fill="url(#pattern20)"/>
            <rect x="66" y="264" width="56" height="56" fill="url(#pattern21)"/>
            <rect x="132" y="264" width="56" height="56" fill="url(#pattern22)"/>
            <rect x="198" y="264" width="56" height="56" fill="url(#pattern23)"/>
            <rect x="264" y="264" width="56" height="56" fill="url(#pattern24)"/>
            <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image1" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern2" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern3" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image1" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern4" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern5" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image1" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern6" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern7" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image1" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern8" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern9" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image1" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern10" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern11" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image1" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern12" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern13" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image1" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern14" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern15" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image1" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern16" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern17" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image1" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern18" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern19" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image1" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern20" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern21" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image1" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern22" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern23" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image1" transform="scale(0.00135135)"/>
                </pattern>
                <pattern id="pattern24" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0" transform="scale(0.00135135)"/>
                </pattern>
                <image id="image0" width="740" height="740" xlink:href="assets/image0.png"/>
                <image id="image1" width="740" height="740" xlink:href="assets/image1.png"/>
            </defs>
        </svg>
    `;
    
    // Инициализация сетки
    function initializeGrid() {
        gridContainer.innerHTML = originalGridHTML;
        return document.getElementById('game-grid');
    }
    
    grid = initializeGrid();

    // Генерация случайного хеша
    function generateRandomHash() {
        const chars = '0123456789abcdef';
        let result = '';
        for (let i = 0; i < 10; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // Выбор количества мин
    mineButtons.forEach(button => {
        button.addEventListener('click', function() {
            mineButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            selectedMines = parseInt(this.dataset.mines);
        });
    });

    // Функция для получения случайного числа в диапазоне
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Функция для получения всех клеток сетки
    function getAllCells() {
        return Array.from(grid.getElementsByTagName('rect'));
    }

    // Функция для замены клетки на звезду
    function placeStar(cell) {
        const x = cell.getAttribute('x') || '0';
        const y = cell.getAttribute('y') || '0';
        const star = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        star.setAttribute('x', x);
        star.setAttribute('y', y);
        star.setAttribute('width', '56');
        star.setAttribute('height', '56');
        star.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `star.svg?t=${Date.now()}`);
        cell.parentNode.replaceChild(star, cell);
    }

    // Функция для показа звезд в зависимости от выбранного количества мин
    function showStarsByMinesCount() {
        // Генерируем случайный шанс и хеш
        const randomChance = getRandomInt(84, 96);
        const randomHash = generateRandomHash();
        
        chanceElement.textContent = `Chance: ${randomChance}%`;
        hashElement.textContent = `Hash: #${randomHash}`;
        
        // Сбрасываем сетку до начального состояния
        grid = initializeGrid();
        
        const cells = getAllCells();
        if (cells.length === 0) return;

        // Определяем количество звезд в зависимости от выбранных мин
        let starsCount;
        switch(selectedMines) {
            case 3: starsCount = getRandomInt(8, 9); break;
            case 4: starsCount = 8; break;
            case 5: starsCount = 7; break;
            case 6: starsCount = getRandomInt(5, 7); break;
            case 7: starsCount = getRandomInt(5, 6); break;
            case 8: starsCount = 5; break;
            default: starsCount = 8;
        }

        const selectedCells = [];

        // Выбираем случайные клетки
        while (selectedCells.length < starsCount && cells.length > 0) {
            const randomIndex = getRandomInt(0, cells.length - 1);
            selectedCells.push(cells.splice(randomIndex, 1)[0]);
        }

        // Показываем звезды с задержкой
        selectedCells.forEach((cell, index) => {
            setTimeout(() => {
                placeStar(cell);
            }, 1000 + index * 200); // Начальная задержка 1 сек, затем каждая звезда через 0.2 сек
        });
    }

    // Обработчик клика по кнопке
    randomStarsButton.addEventListener('click', showStarsByMinesCount);
});