"use strict";

let points = 0;

let lives = 3;

window.addEventListener("load", start);

function start() {
  console.log("JS is running");

  // Animation start
  document.querySelector("#pill1_container").classList.add("falling");
  document.querySelector("#pill2_container").classList.add("falling");
  document.querySelector("#pill3_container").classList.add("falling");
  document.querySelector("#lemon_container").classList.add("horizontalfall");
  document.querySelector("#cuff_container").classList.add("horizontal");
  // Klik
  document
    .querySelector("#pill1_container")
    .addEventListener("click", clickPill1);

  document
    .querySelector("#pill2_container")
    .addEventListener("click", clickPill2);

  document
    .querySelector("#pill3_container")
    .addEventListener("click", clickPill3);

  document
    .querySelector("#lemon_container")
    .addEventListener("click", clickLemon);

  document
    .querySelector("#cuff_container")
    .addEventListener("click", clickCuff);
}

// PILL 1 JS

function clickPill1() {
  console.log("Click pill1");
  // forhindr gentagne clicks
  document
    .querySelector("#pill1_container")
    .removeEventListener("click", clickPill1);

  // Stop pill container
  document.querySelector("#pill1_container").classList.add("paused");

  // Tilføj forsvind animation
  document.querySelector("#pill1_sprite").classList.add("zoom_out");

  document
    .querySelector("#pill1_container")
    .addEventListener("animationend", pill1Gone);
  incrementPoints();

  // Dissapear
}

function pill1Gone() {
  // fjern event der bringer os herind
  document
    .querySelector("#pill1_container")
    .removeEventListener("animationend", pill1Gone);
  document;

  // fjern forsvind-animation
  document.querySelector("#pill1_sprite").classList.remove("zoom_out");

  // fjern pause
  document.querySelector("#pill1_container").classList.remove("paused");

  // genstart falling animation
  document.querySelector("#pill1_container").classList.remove("falling");
  document.querySelector("#pill1_container").offsetWidth;
  document.querySelector("#pill1_container").classList.add("falling");

  // gør det muligt at klikke på coin igen
  document
    .querySelector("#pill1_container")
    .addEventListener("click", clickPill1);
}

// PILL 2 JS

function clickPill2() {
  console.log("Click pill2");
  // forhindr gentagne clicks
  document
    .querySelector("#pill2_container")
    .removeEventListener("click", clickPill2);

  // Stop pill container
  document.querySelector("#pill2_container").classList.add("paused");

  // Tilføj forsvind animation
  document.querySelector("#pill2_sprite").classList.add("zoom_out");

  document
    .querySelector("#pill2_container")
    .addEventListener("animationend", pill2Gone);
  incrementPoints();
}

function pill2Gone() {
  // fjern event der bringer os herind
  document
    .querySelector("#pill2_container")
    .removeEventListener("animationend", pill2Gone);
  document;

  // fjern forsvind-animation
  document.querySelector("#pill2_sprite").classList.remove("zoom_out");

  // fjern pause
  document.querySelector("#pill2_container").classList.remove("paused");

  // genstart falling animation
  document.querySelector("#pill2_container").classList.remove("falling");
  document.querySelector("#pill2_container").offsetWidth;
  document.querySelector("#pill2_container").classList.add("falling");

  // gør det muligt at klikke på coin igen
  document
    .querySelector("#pill2_container")
    .addEventListener("click", clickPill2);
}

// PILL 3 JS

function clickPill3() {
  console.log("Click pill3");
  // forhindr gentagne clicks
  document
    .querySelector("#pill1_container")
    .removeEventListener("click", clickPill3);

  // Stop pill container
  document.querySelector("#pill3_container").classList.add("paused");

  // Tilføj forsvind animation
  document.querySelector("#pill3_sprite").classList.add("zoom_out");

  document
    .querySelector("#pill3_container")
    .addEventListener("animationend", pill3Gone);
  incrementPoints();
}

function pill3Gone() {
  // fjern event der bringer os herind
  document
    .querySelector("#pill3_container")
    .removeEventListener("animationend", pill3Gone);
  document;

  // fjern forsvind-animation
  document.querySelector("#pill3_sprite").classList.remove("zoom_out");

  // fjern pause
  document.querySelector("#pill3_container").classList.remove("paused");

  // genstart falling animation
  document.querySelector("#pill3_container").classList.remove("falling");
  document.querySelector("#pill3_container").offsetWidth;
  document.querySelector("#pill3_container").classList.add("falling");

  // gør det muligt at klikke på coin igen
  document
    .querySelector("#pill3_container")
    .addEventListener("click", clickPill3);
}

// Lemon JS

function clickLemon() {
  console.log("Click lemon");
  // forhindr gentagne clicks
  document
    .querySelector("#lemon_container")
    .removeEventListener("click", clickLemon);

  // Stop pill container
  document.querySelector("#lemon_container").classList.add("paused");

  // Tilføj forsvind animation
  document.querySelector("#lemon_sprite").classList.add("zoom_in");

  document
    .querySelector("#lemon_container")
    .addEventListener("animationend", lemonGone);
  decrementPoints();

  // Dissapear
}

function lemonGone() {
  // fjern event der bringer os herind
  document
    .querySelector("#lemon_container")
    .removeEventListener("animationend", lemonGone);
  document;

  // fjern forsvind-animation
  document.querySelector("#lemon_sprite").classList.remove("zoom_in");

  // fjern pause
  document.querySelector("#lemon_container").classList.remove("paused");

  // genstart falling animation
  document.querySelector("#lemon_container").classList.remove("horizontalfall");
  document.querySelector("#lemon_container").offsetWidth;
  document.querySelector("#lemon_container").classList.add("horizontalfall");

  // gør det muligt at klikke på coin igen
  document
    .querySelector("#lemon_container")
    .addEventListener("click", clickLemon);
}

// HANDCUFF JS
function clickCuff() {
  console.log("Click cuff");
  // forhindr gentagne clicks
  document
    .querySelector("#cuff_container")
    .removeEventListener("click", clickCuff);

  // Stop pill container
  document.querySelector("#cuff_container").classList.add("paused");

  // Tilføj forsvind animation
  document.querySelector("#cuff_sprite").classList.add("zoom_in");

  document
    .querySelector("#cuff_container")
    .addEventListener("animationend", cuffGone);
  incrementPoints();
}

function cuffGone() {
  // fjern event der bringer os herind
  document
    .querySelector("#cuff_container")
    .removeEventListener("animationend", cuffGone);
  document;

  // fjern forsvind-animation
  document.querySelector("#cuff_sprite").classList.remove("zoom_in");

  // fjern pause
  document.querySelector("#cuff_container").classList.remove("paused");

  // genstart falling animation
  document.querySelector("#cuff_container").classList.remove("horizontal");
  document.querySelector("#cuff_container").offsetWidth;
  document.querySelector("#cuff_container").classList.add("horizontal");

  // gør det muligt at klikke på coin igen
  document
    .querySelector("#cuff_container")
    .addEventListener("click", clickCuff);
}

// point og liv funktioner

function incrementPoints() {
  console.log("incrementPoints");
  points++;
  displayPoints();
}

function decrementPoints() {
  console.log("decrementPoints");
  points--;
  displayPoints();
}

function displayPoints() {
  document.querySelector("#pill_count").textContent = points;
}

// GAME OVER AND LEVEL COMPLETE FUNKTIONER

if (lives <= 0) {
  gameOver();
} else {
  levelComplete();
}

function gameOver() {
  console.log("Game over");
}
