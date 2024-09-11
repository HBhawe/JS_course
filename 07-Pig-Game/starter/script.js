"use strict";

// BUTTONS AND IMAGES
const rollDice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const newGame = document.querySelector(".btn--new");
const diceEl = document.querySelector(".dice");

// PLAYER 1
const scorePlayer0 = document.getElementById("score--0");
const currentscorePlayer0 = document.getElementById("current--0");
const player0Section = document.querySelector(".player--0");

// PLAYER 2
const scorePlayer1 = document.getElementById("score--1");
const currentscorePlayer1 = document.getElementById("current--1");
const player1Section = document.querySelector(".player--1");
// let score = document.querySelector;

// INITIALISATION
// hide the image, set it to player 1 and set values for score to 0
diceEl.classList.add("hidden");
let player = 0;
const scores = [0, 0];
scorePlayer0.textContent = 0;
scorePlayer1.textContent = 0;

let currentScore = 0;

// GENERATES A RANDOM NUMBER BETWEEN 1 AND 6 FOR THE DICE ROLL
const diceRoll = function () {
  let dice = Math.floor(Math.random() * 6) + 1;
  return dice;
};

rollDice.addEventListener("click", function () {
  const dice = diceRoll();

  //   display dice image
  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove("hidden");

  if (dice !== 1) {
    currentScore = document.querySelector("#current--0").textContent;
    // document.querySelector("#current--0").textContent =
    //   Number(currentScore) + dice;
    scores[player] = Number(currentScore) + dice;
    document.getElementById(`current--${player}`).textContent = scores[player];
  } else {
    if (player === 0) {
      player = 1;
      player0Section.classList.remove("player--active");
      player1Section.classList.add("player--active");
    } else {
      player = 0;
      player0Section.classList.add("player--active");
      player1Section.classList.remove("player--active");
    }
  }
});

// NEW GAME BUTTON, clears all scores and sets player0 to active
newGame.addEventListener("click", function () {
  player = 0;
  player0Section.classList.add("player--active");
  player1Section.classList.remove("player--active");
  scorePlayer0.textContent = 0;
  currentscorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  currentscorePlayer1.textContent = 0;
  diceEl.classList.add("hidden");
});

// HOLD FUNCTIONALITY, adds current score to score
hold.addEventListener("click", function () {
  let currentScore = Number(
    document.getElementById(`current--${player}`).textContent
  );
  let heldScore = Number(
    document.getElementById(`score--${player}`).textContent
  );
  document.getElementById(`score--${player}`).textContent =
    heldScore + currentScore;
  document.getElementById(`current--${player}`).textContent = 0;
  player = player === 0 ? 1 : 0;
  if (player === 0) {
    player = 1;
    player0Section.classList.remove("player--active");
    player1Section.classList.add("player--active");
  } else {
    player = 0;
    player0Section.classList.add("player--active");
    player1Section.classList.remove("player--active");
  }
});
