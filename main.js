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
};

const initializeGame = (data) => {
  //initialize game variables
  initializeVariables(data);

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
  if(data.round%2===0){data.currentPlayer='X'}else{data.currentPlayer='O'}

  //check end conditions
  if(endConditions(data)){
    //reflect endConditions to Dom
  }
};

const endConditions = (data)=>{

}