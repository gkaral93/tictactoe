// 1. attach event listener to form to get user data
// attach event click listener to each 'game box'
// 2. initialize game
// 3. check gamemode
// 4. determine current player
// 5. check win conditions, if not met, set other player active

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const form = document.querySelector('#myForm') 
const resetBtn = document.querySelector('#resetBtn')
const newGameBtn = document.querySelector("#restartBtn");

newGameBtn.addEventListener("click", () => {
  location.reload();
});

form.addEventListener('submit',(event)=>{
    //prevent refresh
    event.preventDefault();

    //initialize user form data
    const formData=new FormData(form)
    const data = Object.fromEntries(formData) //transforms a list of key-value pairs into an object.
    document.querySelector('.modal-wrapper').setAttribute('hidden',true)
    initializeGame(data)
})

const initializeVariables=(data)=>{
    data.choice=+data.choice;
    data.board = [0,1,2,3,4,5,6,7,8];
    data.player1='X';
    data.player2='O';
    data.round=0;
    data.currentPlayer='X'
    data.gameOver=false;
}
const addEventListenersToGameBoard = (data) => {
  document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("click", (event) => {
      playMove(event.target, data);
    });
  });
  resetBtn.addEventListener('click',()=>{
    initializeVariables(data)
    resetDom()
    adjustDom("displayTurn", `${data.player1Name}'s turn`);
  })
};

const resetDom = ()=>{
  document.querySelectorAll(".box").forEach((box) => {
    box.className = "box";
    box.textContent = "";
  });
}
const initializeGame = (data) => {
  //initialize game variables
  initializeVariables(data);
  adjustDom('displayTurn',`${data.player1Name}'s turn`)
  addEventListenersToGameBoard(data);
};

const playMove = (box, data) => {
  //is game over? If game over, don't do anything
  if (data.gameOver || data.round > 8) {
    return;
  }
  //check if game box has a letter in it, if so, don't do anything
  if (data.board[box.id] === "X" || data.board[box.id] === "O") {
    return;
  }

  //adjust the DOM for player move, and then check win conditions
  data.board[box.id] = data.currentPlayer;
  box.textContent = data.currentPlayer;
  box.classList.add(data.currentPlayer === "X" ? "player1" : "player2");
  //increase the round
  data.round++;
  
  //check end conditions
  if(endConditions(data)){
    return;
  }
  
  // change current player
  if (data.choice ===0){  // human vs human
    changePlayer(data)

  }else if (data.choice ===1){
   //easy ai and change back to player1
  easyAiMove(data);
  data.currentPlayer = 'X';  // change player mark to 'X' after move
  }
};

const endConditions = (data) => {
  // 3 game states
  // winner, tie, game not finished

  if (checkWinner(data)) {  //show winner
    adjustDom("displayTurn", (data.currentPlayer === "X" ? data.player1Name : data.player2Name) + " has won the game!"
    );
    return true;
  }
  else if (data.round === 9) {
    adjustDom("displayTurn", `It's a tie!`); //show tie
    data.gameOver = true;
    return true;
  }
  return false; // continue game
};

const checkWinner = (data) => {
  let result = false;
winningConditions.forEach(cell =>{
  if(data.board[cell[0]]===data.board[cell[1]] && data.board[cell[0]] ===data.board[cell[2]]){
    result = true
    data.gameOver = true
  }
})
  return result;
};

const adjustDom = (className,textContent) =>{
  const elem = document.querySelector(`.${className}`)
  elem.setAttribute('display','block')
  elem.textContent=textContent
}

const changePlayer = (data) => {
data.currentPlayer = data.currentPlayer==='X'? 'O' : 'X'
//adjust DOM
let displayTurnText = data.currentPlayer === 'X'?data.player1Name : data.player2Name
adjustDom('displayTurn',`${displayTurnText}'s turn`)
}


const easyAiMove = (data) => {
  changePlayer(data); //Change player to O mark so AI plays
  setTimeout(() => {
    let availableSpaces = data.board.filter(
      (space) => space !== "X" && space !== "O"
    );
    let move = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
    data.board[move] = data.player2; //add 'O'
    let box = document.getElementById(`${move}`);
    box.textContent = data.player2;
    box.classList.add("player2"); //styling
      }, 200);

  if (endConditions(data)) {
    return;
  }
  changePlayer(data);
};