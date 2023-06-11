const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let's create a function to intialize the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // To start the game from first we need to empty the UI
    boxes.forEach((box,index) =>{
        box.innerText = "";
        // after this we need the pointer cursor back so we write all
        boxes[index].style.pointerEvents = "all";
        // box.classList = `box box${index+1}`;
        box.classList.remove("win");
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    // UI update
    gameInfo.innerText = `current Player - ${currentPlayer}`
}

function checkGameOver(){
    let answer = "";

    // MAIN
    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            // Check if winner is X
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else   
                answer = "O";

            // Disable the pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";   // This avoids from marking the next box after winning
            })

            // Now we know which is the winner and we need to add the win class
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // It means we have a winner
    if(answer != ""){
        gameInfo.innerText = `winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });

    // board is filled, game is tie
    if(fillCount == 9){
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer; // Changes in UI
        gameGrid[index] = currentPlayer;    // innerLogic
        boxes[index].style.pointerEvents = "none";  // This makes the cursor pointer go when the box is already ticked
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", ()=>{
    initGame();

})