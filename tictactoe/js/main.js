const X = 'x';
const O = 'circle';

let O_Turn

const winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]'); // getting all cells elements
const board = document.getElementById('board'); // getting the game board element
const winningMessage = document.getElementById('msg'); // getting the winning message element
const restartButton = document.getElementById('restart-btn'); // getting the restart button element
const winningMessageText = document.querySelector('[data-winning-msg]'); // getting the winning message text element

let score_x = 0;
let score_o = 0;

const firstPlayerScore = document.getElementById('score_1'); // getting the score of the first player
const secondPlayerScore = document.getElementById('score_2'); // getting the score of the second player

startGame(); // starting the game

restartButton.addEventListener('click', startGame); // listening on user clicks

// function responsible of starting the game
function startGame() {
    O_Turn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X)
        cell.classList.remove(O)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessage.classList.remove('show')
}

/**
 * function that 
 * 1- identifies the class to add given who's turn it is to play
 * 2- adds the class to the cell
 * 3- checks if a player has won, if not it checks for a draw
 * and if there's no draw yet proceeds to the next player's turn 
 * 
 * @param {*} e event 
 */
function handleClick(e) {
    const cell = e.target
    const currentClass = O_Turn ? O : X
    selectOption(cell, currentClass)
    if (validateWin(currentClass)) {
        finishGame(false)
    } else if (isDraw()) {
        finishGame(true)
    } else {
        swapShapes()
        setBoardHoverClass()
    }
}

function finishGame(draw) {
    if (draw) {
        winningMessageText.innerText = "it's a draw"
    } else {

        if (O_Turn) {
            score_o++;
            secondPlayerScore.innerHTML = `${score_o}`;
        }
        else {
            score_x++;
            firstPlayerScore.innerHTML = `${score_x}`;
        }
        winningMessageText.innerText = `${O_Turn ? "O " : "X "} Won`
    }
    winningMessage.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X) || cell.classList.contains(O)
    })
}

function selectOption(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapShapes() {
    O_Turn = !O_Turn
}

function setBoardHoverClass() {
    board.classList.remove(X)
    board.classList.remove(O)
    if (O_Turn) {
        board.classList.add(O)
    } else {
        board.classList.add(X)
    }
}

function validateWin(currentClass) {
    return winning.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}