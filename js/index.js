//Game Constants & Variables
let Direction = { x: 0, y: 0 };
const foodSound = new Audio("./food.wav");
const gameOverSound = new Audio("./gameover.mp3");
const move = new Audio("./move.wav");
const gamemusic = new Audio("./gamemusic.wav");
let speed = 5;
let lastPaintTime = 0;
let snakeArray = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let score = 0;
//Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function isCollide(snake){
   //if snake hit himself;
   for(let i = 1; i < snakeArray.length; i++){
         if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
          return true;
        }
     }
   //if snake hit the wall;
   if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
    return true;
   }
   return false;
}
function gameEngine() {
  //Part 1: Updating the snake array & Food
    if(isCollide(snakeArray)){
      gameOverSound.play();
      gamemusic.pause();
      Direction = {x : 0, y : 0};
      alert("Game over! press any key to play again")
      snakeArray = [{x : 13,y : 15}];
      gamemusic.play();
      if(score > highScoreVal){
        highScoreVal = score;
        highScore = localStorage.setItem("highScore", JSON.stringify(highScoreVal));
        HighScoreBox.innerHTML = `HighScore: `+ highScoreVal;
      }
      speed = 5;
      score = 0;
      scoreBox.innerHTML = "score: " + score;
    }
    //If you have eaten the food, increment the score and regenerate the food;
    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x){
      foodSound.play();
      score += 1;
      speed += 0.5;
      scoreBox.innerHTML = "score: " + score;
      snakeArray.unshift({x: snakeArray[0].x + Direction.x, y: snakeArray[0].y + Direction.y});
      let a = 2;
      let b = 16;
      food = {x : Math.round(a + (b - a)* Math.random()), y : Math.round(a + (b - a)* Math.random())}
    }
    //Moving the snake;
    for(let i = snakeArray.length - 2; i >= 0; i--){
         snakeArray[i+1] = {...snakeArray[i]};
    }
    snakeArray[0].x += Direction.x;
    snakeArray[0].y += Direction.y;
  //Part 2: Display the snake and Food
  //Display the snake
  board.innerHTML = "";
  snakeArray.forEach((ele, idx) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = ele.y;
    snakeElement.style.gridColumnStart = ele.x;
    if(idx === 0){
      snakeElement.classList.add("head");
    }
    else{
    snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  //Display the food;
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}
//logic to set high Score;
let highScore = localStorage.getItem("highScore");
if(highScore === null){
   highScoreVal = 0;
  highScore = localStorage.setItem("highScore", JSON.stringify(highScoreVal));
}
else{
  highScoreVal = JSON.parse(highScore);
  HighScoreBox.innerHTML = `HighScore: `+ highScoreVal;
}
//main logic start here
gamemusic.play();
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
  Direction = {x : 0, y: 1}// start the game;
  move.play();
  switch(e.key) {
    case "ArrowUp":
      console.log("ArrowUp")
      Direction.x = 0;
      Direction.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown")
      Direction.x = 0;
      Direction.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft")
      Direction.x = -1;
      Direction.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight")
      Direction.x = 1;
      Direction.y = 0;
      break;
  }
})
// //Music On Function;
document.querySelector(".ON").addEventListener("click", () => {
  gamemusic.play();
})
// //Music Off function;
document.querySelector(".OFF").addEventListener("click", () => {
  gamemusic.pause();
})