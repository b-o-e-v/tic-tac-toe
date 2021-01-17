let game = document.getElementById("game");                         // получили div game
let message = document.getElementById("message");                   // получили параграф message
let restart = document.getElementById("restart");                   // получили input restart
let win_x = document.getElementById("win_x");                       // получили доступ к span win_x
let win_0 = document.getElementById("win_0");                       // получили доступ к span win_0
let win_draw = document.getElementById("win_draw");                 // получили доступ к span win_draw
let cells = document.getElementsByClassName("game__cell");          // получили div game__cell
let player = "X";                                                   // задали переменную и присвоили ей строку со значением "x"
let paused = false;                                                 // задали переменную и присвоили ей булевое значение false
let data = [];                                                      // здесь будут храниться отмеченные ячейки
let win = {                                                         // создали объект в виде пар «ключ: значение»
    X: 0, 
    "0": 0, 
    draw: 0
};                                  
let stepCount = 0;                                                  // задали переменную, которая считает количество ходов
let winIndex = [                                                    // создали массив с вариантами победы
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

for (let i = 0; i < cells.length; i++) {                            // цикл по массиву cells
    addEvent(cells[i]);                                             // описание функции addEvent ниже
}

restart.addEventListener("click", gameRestart);                     // описание функции gameRestart ниже
function addEvent(game__cell) {                                     // ФУНКЦИЯ addEvent
    game__cell.addEventListener('click', step);                     // Событие КЛИК
    function step() {                                               // ФУНКЦИЯ addEvent
        if (!game__cell.innerHTML && !paused) {                     // если отсутствует innerHTML и не пауза
            game__cell.innerHTML = player;                          // прописать после клика значение игрока
            let id = game__cell.getAttribute('data-id');            // задали переменную и присвоили ей значения атрибутов ячеек
            data[id] = player;                                      // ячейка присваивается конкретному игроку
            stepCount++;                                            // посчитали ход
            if (checkWin()) {                                       // если функция checkWin принимает значение ИСТИНА
                message.innerHTML = 'Выиграл: ' + player;           // выводится сообщение о том, кто выиграл
                win[player]++;                                      // обновление статистики
                stepCount = 0;                                      // обнуление количества ходов
                paused = true;                                      // пауза
            } else {
                changePlayer();                                     // смена игрока
            }
            if (stepCount >= 9) {                                   // если количество ходов больше или равно 9
                win.draw++;                                         // ничья
                stepCount = 0;                                      // обнуление количества ходов
                message.innerHTML = 'Ничья';                        // выводится сообщение о ничье
            }
            updateStatistics();                                     // обновление статистики
        }	
    }
}

function checkWin() {                                               // ФУНКЦИЯ checkWin (проверка победителя)
    for (let i = 0; i < winIndex.length; i++) {                     // цикл по массиву с вариантами победы
        let id = winIndex[i];                                       // задали переменную id
        let check = data[id[0]] &&                                  // задали переменную check
            data[id[0]] == data[id[1]] &&                           // сравнение значений массива отмеченных значений
            data[id[1]] == data[id[2]];                             // и вариантов победы
        if (check) {
            return true;
        }
    }
    return false;
}

function changePlayer() {                                           // ФУНКЦИЯ changePlayer (смена игрока)
    if (player === 'X') {                                           // если игрок = x, то
        player = '0';                                               // очередь игрока = 0
    } else {                                                        // иначе ходит игрок x
        player = 'X';
    }
    message.innerHTML = 'Ходит: ' + player;                         // выводит сообщение о том, какой игрок ходит
}

function clear() {                                                  // ФУНКЦИЯ clear
    for (var i = 0; i < cells.length; i++) {                        // цикл по массиву cells,
        cells[i].innerHTML = '';                                    // чтобы значение каждой ячейки приравнять пустое значение
    }
}

function gameRestart() {                                            // ФУНКЦИЯ gameRestart
    clear();                                                        // описание функции clear выше
    changePlayer();                                                 // описание функции changePlayer выше
    data = [];                                                      // отмеченные ячейки переходят в начальное состояние
    paused = false;
}

function updateStatistics() {                                       // ФУНКЦИЯ updateStatistics
    win_x.innerHTML = win.X;                                        // обновляет объект win
    win_0.innerHTML = win['0']; 
    win_draw.innerHTML = win.draw; 
}