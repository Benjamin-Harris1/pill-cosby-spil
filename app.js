"use strict";

let points = 0;

let lives = 3;

let isGameRunning = false;

window.addEventListener("load", ready);

function ready() {
  console.log("JS is running");
  document.querySelector("#btn_start").addEventListener("click", startGame);
  document.querySelector("#btn_return").addEventListener("click", showStartScreen);
  document.querySelector("#btn_restart").addEventListener("click", startGame);
}

function startGame() {
  isGameRunning = true;

  // Start background music
  document.querySelector("#backgroundsound").volume = 0.5;
  document.querySelector("#backgroundsound").play();

  resetLives();

  resetPoints();

  showGame();

  startTime();

  animationStart();

  regClick();

  startPositions();

  setupRestart();
}

function startTime() {
  document.querySelector("#time_sprite").classList.add("shrink");
  document.querySelector("#time_sprite").addEventListener("animationend", timeisUp);
}

function timeisUp() {
  console.log("Time is up");
  if (points >= 10) {
    levelComplete();
  } else {
    gameOver();
  }
}

function regClick() {
  document.querySelector("#pill1_container").addEventListener("click", clickPill);
  document.querySelector("#pill2_container").addEventListener("click", clickPill);
  document.querySelector("#pill3_container").addEventListener("click", clickPill);
  document.querySelector("#poison1_container").addEventListener("click", clickPoison);
  document.querySelector("#poison2_container").addEventListener("click", clickPoison);
  document.querySelector("#cuff_container").addEventListener("click", clickCuff);
  document.querySelector("#heart_container").addEventListener("click", clickHeart);
}

function animationStart() {
  document.querySelector("#pill1_container").classList.add("falling");
  document.querySelector("#pill2_container").classList.add("falling");
  document.querySelector("#pill3_container").classList.add("falling");
  document.querySelector("#poison1_container").classList.add("sidetoside1");
  document.querySelector("#poison2_container").classList.add("sidetoside2");
  document.querySelector("#cuff_container").classList.add("horizontal");
  document.querySelector("#heart_container").classList.add("falling");
}

function startPositions() {
  document.querySelector("#pill1_container").classList.add("position1");
  document.querySelector("#pill2_container").classList.add("position2");
  document.querySelector("#pill3_container").classList.add("position3");
  document.querySelector("#heart_container").classList.add("position4");
  document.querySelector("#poison1_container").classList.add("position6");
  document.querySelector("#poison2_container").classList.add("position7");
}

function setupRestart() {
  document.querySelector("#pill1_container").addEventListener("animationiteration", pillRestart);
  document.querySelector("#pill2_container").addEventListener("animationiteration", pillRestart);
  document.querySelector("#pill3_container").addEventListener("animationiteration", pillRestart);
  document.querySelector("#heart_container").addEventListener("animationiteration", heartRestart);
  document.querySelector("#poison1_container").addEventListener("animationiteration", poisonRestart);
  document.querySelector("#poison2_container").addEventListener("animationiteration", poisonRestart);
}

function showStartScreen() {
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function resetLives() {
  lives = 3;
  document.querySelector("#heart1").classList.remove("broken_heart");
  document.querySelector("#heart2").classList.remove("broken_heart");
  document.querySelector("#heart3").classList.remove("broken_heart");
  document.querySelector("#heart1").classList.add("active_heart");
  document.querySelector("#heart2").classList.add("active_heart");
  document.querySelector("#heart3").classList.add("active_heart");
}

function resetPoints() {
  points = 0;
  displayPoints();
}

function showGame() {
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

// PILL FUNCTIONS
function clickPill() {
  console.log("Click pill");
  console.log(this);
  let pill = this;

  // Sound
  document.querySelector("#pill_ding").currentTime = 0;
  document.querySelector("#pill_ding").volume = 0.5;
  document.querySelector("#pill_ding").play();
  // forhindr gentagne clicks
  pill.removeEventListener("click", clickPill);

  // Stop pill container
  pill.classList.add("paused");

  // Tilføj forsvind animation
  pill.querySelector("img").classList.add("zoom_out");

  pill.addEventListener("animationend", pillGone);
  incrementPoints();
}

function pillGone() {
  let pill = this;
  // fjern event der bringer os herind
  pill.removeEventListener("animationend", pillGone);

  // fjern forsvind-animation
  pill.querySelector("img").classList.remove("zoom_out");

  // fjern pause
  pill.classList.remove("paused");

  // genstart falling animation
  if (isGameRunning) {
    pillRestart.call(this);
  }
  // gør det muligt at klikke på pill igen
  pill.addEventListener("click", clickPill);
}

function pillRestart() {
  let pill = this;
  pill.classList.remove("falling");
  pill.classList.remove("position1", "position2", "position3");
  pill.offsetWidth;
  pill.classList.add("falling");
  let pos = Math.floor(Math.random() * 3) + 1;
  pill.classList.add("position" + pos);
}

// POISON FUNCTIONS

function clickPoison() {
  console.log("Click poison");
  console.log(this);
  let poison = this;
  // forhindr gentagne clicks
  poison.removeEventListener("click", clickPoison);

  // Audio
  document.querySelector("#poison_sound").currentTime = 0;
  document.querySelector("#poison_sound").play();
  // Stop pill container
  poison.classList.add("paused");

  // Tilføj forsvind animation
  poison.querySelector("img").classList.add("zoom_in");

  poison.addEventListener("animationend", poisonGone);
  decrementPoints();
  decrementLives();
}

function poisonGone() {
  let poison = this;
  // fjern event der bringer os herind
  poison.removeEventListener("animationend", poisonGone);

  // fjern forsvind-animation
  poison.querySelector("img").classList.remove("zoom_in");

  // fjern pause
  if (isGameRunning) {
    poison.classList.remove("paused");
  }

  // genstart falling animation
  poisonRestart.call(this);

  // gør det muligt at klikke på coin igen
  poison.addEventListener("click", clickPoison);
}

function poisonRestart() {
  let poison = this;
  poison.classList.remove("sidetoside1", "sidetoside2");
  poison.classList.remove("position6", "position7");
  poison.offsetWidth;
  let sidetoside = Math.floor(Math.random() * 2) + 1;
  poison.classList.add("sidetoside" + sidetoside);
  // Math random for at få et nummer mellem 5 og 6, så der kan tilføjes position 5 eller 6
  let pos = Math.floor(Math.random() * (7 - 6 + 1)) + 6;
  poison.classList.add("position" + pos);
}

// HANDCUFF FUNCTIONS
function clickCuff() {
  console.log("Click cuff");
  let cuff = this;
  document.querySelector("#pill_ding").currentTime = 0;
  document.querySelector("#pill_ding").volume = 0.5;
  document.querySelector("#pill_ding").play();
  // forhindr gentagne clicks
  cuff.removeEventListener("click", clickCuff);

  // Stop pill container
  cuff.classList.add("paused");

  // Tilføj forsvind animation
  cuff.querySelector("img").classList.add("zoom_out");
  cuff.addEventListener("animationend", cuffGone);
  incrementPoints();
}

function cuffGone() {
  let cuff = this;
  // fjern event der bringer os herind
  cuff.removeEventListener("animationend", cuffGone);

  // fjern forsvind-animation
  cuff.querySelector("img").classList.remove("zoom_out");

  // fjern pause
  cuff.classList.remove("paused");

  // genstart falling animation
  if (isGameRunning) {
    cuff.classList.remove("horizontal");
    cuff.offsetWidth;
    cuff.classList.add("horizontal");
  }

  // gør det muligt at klikke på coin igen
  cuff.addEventListener("click", clickCuff);
}

// HEART FUNCTIONS

function clickHeart() {
  console.log("Click heart");
  let heart = this;

  // Sound
  document.querySelector("#heartsound").currentTime = 0;
  document.querySelector("#heartsound").volume = 0.5;
  document.querySelector("#heartsound").play();
  // Forhindr gentagne clicks
  heart.removeEventListener("click", clickHeart);

  // Stop heart container
  heart.classList.add("paused");

  // sæt forsvind-animation på heart
  heart.querySelector("img").classList.add("zoom_out");

  // når forsvind-animation er færdig: heatGone
  heart.addEventListener("animationend", heartGone);

  incrementLives();
}

function heartGone() {
  let heart = this;
  // fjern event der bringer os herind
  heart.removeEventListener("animationend", heartGone);

  // fjern forsvind-animation
  heart.querySelector("img").classList.remove("zoom_out");

  // fjern pause
  heart.classList.remove("paused");

  // genstart falling animation
  heartRestart.call(this);

  // gør det muligt at klikke på heart igen
  heart.addEventListener("click", clickHeart);
}
function heartRestart() {
  let heart = this;
  heart.classList.remove("falling");
  heart.classList.remove("position1", "position2", "position3", "position4", "position5");
  heart.offsetWidth;
  heart.classList.add("falling");
  let pos = Math.floor(Math.random() * 5) + 1;
  heart.classList.add("position" + pos);
}

// POINT FUNCTIONS //
function incrementPoints() {
  console.log("Giv point");
  points++;
  console.log("har nu " + points + " point");
  displayPoints();
  // if (points >= 10) { Udkommenteret så man får level complete hvis når tiden er løbet
  // levelComplete();
  //}
}

function decrementPoints() {
  console.log("decrementPoints");
  points--;
  displayPoints();
}

function displayPoints() {
  document.querySelector("#pill_count").textContent = points;
}

// LIFE FUNCTIONS
function decrementLives() {
  console.log("mist et liv");
  if (lives <= 1) {
    gameOver();
  } else {
    showDecrementedLives();
  }
  lives--;
}

function incrementLives() {
  console.log("få et liv");
  if (lives >= 3) {
    lives;
  } else lives++;
  showIncrementedLives();
}

function showDecrementedLives() {
  document.querySelector("#heart" + lives).classList.remove("active_heart");
  document.querySelector("#heart" + lives).classList.add("broken_heart");
}

function showIncrementedLives() {
  document.querySelector("#heart" + lives).classList.remove("broken_heart");
  document.querySelector("#heart" + lives).classList.add("active_heart");
}

// GAME OVER AND LEVEL COMPLETE FUNCTIONS
function levelComplete() {
  console.log("Level complete");
  document.querySelector("#levelcompletesound").volume = 0.5;
  document.querySelector("#levelcompletesound").play();
  document.querySelector("#level_complete").classList.remove("hidden");
  stopGame();
}

function gameOver() {
  console.log("Game over");
  document.querySelector("#gameoversound").volume = 0.5;
  document.querySelector("#gameoversound").play();
  document.querySelector("#game_over").classList.remove("hidden");
  stopGame();
}

function stopGame() {
  // Stop animations

  isGameRunning = false;
  document.querySelector("#pill1_container").classList.remove("falling");
  document.querySelector("#pill2_container").classList.remove("falling");
  document.querySelector("#pill3_container").classList.remove("falling");
  document.querySelector("#poison1_container").classList.remove("sidetoside1", "sidetoside2");
  document.querySelector("#poison2_container").classList.remove("sidetoside1", "sidetoside2");
  document.querySelector("#cuff_container").classList.remove("horizontal");
  document.querySelector("#heart_container").classList.remove("falling");
  document.querySelector("#time_sprite").classList.remove("shrink");

  // Remove click
  document.querySelector("#pill1_container").removeEventListener("click", clickPill);
  document.querySelector("#pill2_container").removeEventListener("click", clickPill);
  document.querySelector("#pill3_container").removeEventListener("click", clickPill);
  document.querySelector("#poison1_container").removeEventListener("click", clickPoison);
  document.querySelector("#poison2_container").removeEventListener("click", clickPoison);
  document.querySelector("#cuff_container").removeEventListener("click", clickCuff);
  document.querySelector("#heart_container").removeEventListener("click", clickHeart);

  // Stop sounds
  document.querySelector("#backgroundsound").pause();
  document.querySelector("#pill_ding").pause();
  document.querySelector("#poison_sound").pause();
  document.querySelector("#heartsound").pause();
}
