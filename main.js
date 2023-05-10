const btnEasy = document.querySelector("#btn-easy");
const btnNormal = document.querySelector("#btn-normal");
const btnHard = document.querySelector("#btn-hard");

// const firstRow = document.querySelectorAll(".first");
// const secondRow = document.querySelectorAll(".second");
// const thirdRow = document.querySelectorAll(".third");

const displayColor = document.querySelector("#display-color");
const displayScore = document.querySelector("#score");

const highscoreh1 =  document.querySelector("#highscore");
let HIGHSCORE =   localStorage.getItem('highscore');
highscoreh1.textContent = "HighScore: " + HIGHSCORE;

let correctAnswer;
let gamePoints = 0;
let animMiliseconds = 2000;
let mistakes= 0;

btnEasy.addEventListener("click", () => {
  startGame("easy");
});

btnNormal.addEventListener("click", () => {
  startGame("normal");
});

btnHard.addEventListener("click", () => {
  startGame("hard");
});

function startGame(mode) {
  clearTimeout(timeoutID); //cancel timeout if game gets restarted before animations end
  resetColors(-1);
  

  if (mode === "easy") {
    const boxes =document.querySelectorAll(".first"); //1line
    reduceCode(boxes);

  } else if (mode === "normal") {
    const boxes =document.querySelectorAll(".first, .second"); // 2lines
    reduceCode(boxes);

  } else if (mode === "hard") {
    const boxes =document.querySelectorAll(".first, .second, .third");//3lines
    reduceCode(boxes);
  }
}

function reduceCode(boxes){
  const colors = randomColorArray(boxes.length);
  const answerIndex = randomNum(boxes.length);
  correctAnswer = answerIndex;

  gamePoints = boxes.length/3;
  mistakes = boxes.length/3;

  displayColor.textContent = colors[answerIndex];

  boxes.forEach((element, index) => {
    element.style.backgroundColor = colors[index];
  });

}

function randomColorArray(amount) {
  const colorArray = [];

  for (let i = 0; i < amount; i++) {
    const r = randomNum(256);
    const g = randomNum(256);
    const b = randomNum(256);

    colorArray.push(`rgb(${r}, ${g}, ${b})`);
  }
  return colorArray;
}

function randomNum(num) {
  return Math.floor(Math.random() * num);
}
let timeoutID = null;
function resetColors(pos) {
  const boxes =document.querySelectorAll(".first, .second, .third");
  if (pos >= 0){
    boxes.forEach((element,index) => {
      if(index != pos){
        element.style.backgroundColor = "transparent";
      }
      else{
        timeoutID =  setTimeout(()=> { 
          element.style.backgroundColor = "transparent";}, animMiliseconds)
        }
      });
    }
  else{
    boxes.forEach((element) => {
        element.style.backgroundColor = "transparent";
    });
  }
}

function checkAnswer(position) {
  const currentBox = document.querySelector("#box-" + position);
  let bgbox = currentBox.style.backgroundColor;

  const answer = document.querySelector(".answer");

  if (position === correctAnswer) {

    answer.textContent = "CORRECT ANSWER";
    answer.style.opacity = 1;
    answer.style.color = "green";
    
    resetColors(position);
    setTimeout(()=> {   answer.style.opacity = 0;}, animMiliseconds);

    incrementScore(gamePoints);
    correctAnswer = null; //points were still adding up after correct answer
  }
  else { //wrong answer actions
    if(bgbox !="" && bgbox !="transparent"){
      mistakes--;
      if(mistakes >= 0){
        answer.textContent = "Wrong answer, chances left: " + mistakes ;
      }
      if(mistakes < 0){
        answer.textContent = "You lost a point!" ;
        incrementScore(-1);

      }
      answer.style.opacity = 1;
      answer.style.color = "red";
      setTimeout(()=> {   answer.style.opacity = 0;}, animMiliseconds);
      
      currentBox.style.backgroundColor = "transparent";
    }
  } 
}

function incrementScore(num) { 
  let score  = Number( displayScore.textContent.slice(6));//remove `score:` in front and take int
  if(num > 0){
    let currentScore = parseInt(score + num);
    displayScore.textContent = "Score: " + (currentScore);
    displayScore.style.color = "green";

    //highscore
    let HIGHSCORE =   localStorage.getItem('highscore');
    highscoreh1.textContent = "HighScore: " + HIGHSCORE;

    if(HIGHSCORE < currentScore){
      // console.log(HIGHSCORE,currentScore);
      localStorage.setItem('highscore', currentScore);
      // console.log("highscore should become " + currentScore);
      HIGHSCORE = currentScore
      highscoreh1.textContent = "HighScore: " + HIGHSCORE;
      
    }
    

    setTimeout(()=> {       displayScore.style.color = "black";
  }, animMiliseconds);
}

  else{
    displayScore.textContent = "Score: " + (score - 1);
    displayScore.style.color = "red";
    setTimeout(()=> {       displayScore.style.color = "black";
  }, animMiliseconds);
  
}
}
