
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; 
let count = 0; 
let gameOver = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  gameOver = false;
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if(gameOver)return;

    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    if(checkWinner()){
        gameOver = true;
        return;
    }
    if(count === 9){
        gameDraw();
        gameOver = true;
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let a = boxes[pattern[0]].innerText;
    let b = boxes[pattern[1]].innerText;
    let c = boxes[pattern[2]].innerText;

    if (a && b && c && a === b && b === c) {
        showWinner(a);
        return true;
      
    }
  }
  return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


let toggle = document.getElementById("toggle");
let body = document.body;

let savedMode = localStorage.getItem("mode");

if(savedMode === "dark"){
    body.classList.add("dark");
    toggle.classList.add("active");
}

toggle.addEventListener("click",() =>{

    if(body.classList.contains("dark")){
        body.classList.remove("dark");
        toggle.classList.remove("active");
        localStorage.setItem("mode" , "light");
    }else{
        body.classList.add("dark");
        toggle.classList.add("active");
        localStorage.setItem("mode" , "dark");
    }
});