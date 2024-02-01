let currentPlayer = "";
const squares = document.querySelectorAll(".box");
const board = document.getElementById("board");
let rowOne = [];
let rowTwo = [];
let rowThree = [];
const startButton = document.getElementById("start-game");
const currentPLayerText = document.getElementById("current-player-text")
const gameOverText = document.getElementById("game-over-text");
const restartGameButton = document.getElementById("restart-game");
let winConditions = [];


function startGame() {
    currentPLayerText.classList.remove("hide");
    startButton.classList.add("hide");
    currentPlayer = playerInit();


    for (let i=0; i<squares.length; i++) {
        if (squares[i].id.split("\-")[0] === "one") {
            rowOne.push(squares[i]);
        } else if (squares[i].id.split("\-")[0] === "two") {
            rowTwo.push(squares[i]);
        } else if (squares[i].id.split("\-")[0] === "three") {
            rowThree.push(squares[i]);
        }
    }

    currentPLayerText.innerHTML = `It Is Player ${currentPlayer}'s Turn`;
}

function playerInit() {
    if (!currentPlayer) {
        if (Math.floor(Math.random() * 2)===1) {
            currentPlayer = "X";
            return currentPlayer
        } 
        currentPlayer = "O";
        return currentPlayer
    }
}

function takeSquare(square) {
    const currentSquare = document.getElementById(square);
    if (!currentPlayer || currentSquare.innerHTML) {
        return;
    }
    currentSquare.innerHTML = currentPlayer;
    winConditions = [rowOne[0].innerHTML===rowTwo[1].innerHTML && rowOne[0].innerHTML===rowThree[2].innerHTML && rowOne[0].innerHTML, rowOne[2].innerHTML===rowTwo[1].innerHTML && rowOne[2].innerHTML===rowThree[0].innerHTML && rowOne[2].innerHTML, rowCheck(rowOne), rowCheck(rowTwo), rowCheck(rowThree), colCheck(0), colCheck(1), colCheck(2)];
    if (winCheck()) {
        return;
    }
    if (currentPlayer==="X") {
        currentPlayer = "O";
        currentPLayerText.innerHTML = `It Is Player ${currentPlayer}'s Turn`;
        return
    }
    currentPlayer = "X";
    currentPLayerText.innerHTML = `It Is Player ${currentPlayer}'s Turn`;
    return
}

function rowCheck(rowArray) {
    if (rowArray[0].innerHTML===rowArray[1].innerHTML && rowArray[0].innerHTML===rowArray[2].innerHTML && rowArray[0].innerHTML) {
        return true;
    }
    return false;
}

function colCheck(arrayIndex) {
    if (rowOne[arrayIndex].innerHTML===rowTwo[arrayIndex].innerHTML && rowOne[arrayIndex].innerHTML===rowThree[arrayIndex].innerHTML && rowOne[arrayIndex].innerHTML) {
        return true;
    }
    return false;
}


function winCheck() {
    for (let i=0; i<winConditions.length; i++) {
        if (winConditions[i]) {
            endGame();
            return true;
        }
    }
}

function endGame() {
    gameOverText.innerHTML = `The Winner Is ${currentPlayer}!`
    currentPLayerText.classList.add("hide");
    gameOverText.classList.remove("hide");
    board.classList.add("hide");
    restartGameButton.classList.remove("hide");
}

function restartGame() {
    settingReset();
    currentPLayerText.classList.remove("hide");
    return startGame();
}

function settingReset() {
    currentPlayer = "";
    for (let i=0;i<rowOne.length;i++) {
        rowOne[i].innerHTML = "";
        rowTwo[i].innerHTML = "";
        rowThree[i].innerHTML = "";
    }
    gameOverText.classList.add("hide");
    board.classList.remove("hide");
    restartGameButton.classList.add("hide");
}

function home() {
    settingReset();
    startButton.classList.remove("hide");
}