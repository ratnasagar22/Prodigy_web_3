const statusDisplay=document.querySelector('.game--status');
let gameActive=true;
let currentPlayer="X";
let gameState=["","","","","","","","",""];
const winMsg=() => `Player ${currentPlayer} has won!`;
const drawMsg=() => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML=currentPlayerTurn();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click',handleCellClick));
document.querySelector('.game--restart').addEventListener('click',handleRestartGame);

function handleCellClick(clickedCellEvent){
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
         clickedCell.getAttribute('data-cell-index')
    );

    if (gameState[clickedCellIndex] !== "" || !gameActive){
        return;
    }

    handleCellPlayed(clickedCell,clickedCellIndex);
    handleResultValidatio();

    
}

function handleCellPlayed(clickedCell,clickedCellIndex){
    gameState[clickedCellIndex]=currentPlayer;
    clickedCell.innerHTML=currentPlayer;
}

const winCond = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleResultValidatio() {
    let roundWon=false;
    for (let i=0;i<=7;i++){
        const winningConditions=winCond[i];
        let a=gameState[winningConditions[0]];
        let b=gameState[winningConditions[1]];
        let c=gameState[winningConditions[2]];

        if (a==='' || b=== '' || c=== ''){
            continue;
        }
        if (a===b && b===c){
            roundWon=true;
            break
        }
    }

    if(roundWon){
        statusDisplay.innerHTML=winMsg();
        gameActive=false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw){
        statusDisplay.innerHTML=drawMsg();
        gameActive=false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange(){
    currentPlayer=currentPlayer=== "X" ? "O" : "X";
    statusDisplay.innerHTML=currentPlayerTurn();
}

function handleRestartGame(){
    gameActive = true;
    currentPlayer = "X";
    gameState = ["","","","","","","","",""];
    statusDisplay.innerHTML=currentPlayerTurn();
    document.querySelectorAll('.cell')
    .forEach(cell => cell.innerHTML="");
}

