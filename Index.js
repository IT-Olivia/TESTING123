document.addEventListener("DOMContentLoaded", function() {
  const holes = document.querySelectorAll('.hole');
  const score = document.querySelector('#score > span');
  const moles = document.querySelectorAll('.mole');
  const startButton = document.querySelector('#startButton');
  const timerDisplay = document.querySelector('#timer');
  const cursor = document.querySelector("#cursor");
  const malletImageUrl = 'assets/mallet.png'; // Corrected path

  cursor.style.cursor = `url(${malletImageUrl}), auto`; // Corrected cursor style

  let time = 0;
  let timer;
  let lastHole = 0;
  let points = 0;
  let difficulty = "hard";

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function setDelay(difficulty) {
    if (difficulty === "easy") {
      return 1500; // 1.5 seconds
    } else if (difficulty === "normal") {
      return 1000; // 1 second
    } else if (difficulty === "hard") {
      return randomInteger(600, 1200);
    } else {
      startGame();
      return 1500; 
    }
  }

  function chooseHole(holes) {
    const index = randomInteger(0, 8);
    const hole = holes[index];
    if (hole === lastHole) {
      return chooseHole(holes);
    }
    lastHole = hole;
    return hole;
  }

  function gameOver() {
    if (time > 0){
      let timeoutId = showUp();
      return timeoutId; 
    } else {
      let gameStopped = stopGame();
      return gameStopped;
    }
  } 

  function showUp() {
    let delay = setDelay('easy');
    const hole = chooseHole(holes);  
    return showAndHide(hole, delay);
  }

  function showAndHide(hole, delay){
    toggleVisibility(hole);
    const timeoutID = setTimeout(() => {
      toggleVisibility(hole); 
      gameOver();
    }, delay);
    return timeoutID;
  }

  function toggleVisibility(hole){
    hole.classList.toggle('show');
    console.log(hole.innerHTML);
    console.log(hole.classList);
    return hole;
  }

  function updateScore() {
    points++; 
    score.textContent = points; 
    updateScoreboard(points); 
    return points; 
  }

  function clearScore() {
    points = 0;
    score.textContent = points; 
    return points;
  }

  function updateTimer() {
    if (time > 0){
      time -= 1;
      timerDisplay.textContent = time;
    }
    return time;
  }

  function startTimer() {
    timer = setInterval(updateTimer, 1000);
    return timer;
  }

  startTimer();

  function whack(event) {
    console.log("whack!")
    updateScore()
    return points;
  }

  function setEventListeners(){
    moles.forEach(
      mole => mole.addEventListener('click', whack)
    );
    return moles;
  }

  function setDuration(duration) {
    time = duration;
    return time;
  }

  function stopGame(){ 
    clearInterval(timer);
    return "game stopped";
  }

  function play(){
    playAudio(song);
  }

  function startGame(){
    setDuration(25);
    showUp();
    return "game started";
  }

  startButton.addEventListener("click", startGame);

});

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
