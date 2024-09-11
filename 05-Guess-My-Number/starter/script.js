"use strict";

function generateRandom() {
  let number = Math.floor(Math.random() * 20) + 1;
  return number;
}

function displayMessage(message) {
  document.querySelector(".message").textContent = message;
}

let randomNumber = generateRandom();
// console.log(randomNumber);

let score = 20;
let highscore = 0;

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  //   NO INPUT
  if (!guess) {
    displayMessage("No Number!");

    // WHEN PLAYER WINS
  } else if (guess === randomNumber) {
    displayMessage("Correct Number!");
    document.querySelector(".number").textContent = guess;
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    highscore = Number(document.querySelector(".highscore").textContent);
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }

    // GUESS IS DIFFERENT
  } else if (guess !== randomNumber) {
    if (score > 1) {
      // document.querySelector(".message").textContent =
      //   guess > randomNumber ? "Too high" : "Too low!";

      displayMessage(guess > randomNumber ? "Too high" : "Too low!");
      score = score - 1;
      document.querySelector(".score").textContent = score;
    } else displayMessage("You lost the game! Try again!");
  }

  // GUESS IS TOO HIGH
  // else if (guess > randomNumber) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "Too high!";
  //     score = document.querySelector(".score").textContent;
  //     document.querySelector(".score").textContent = score - 1;
  //   } else
  //     document.querySelector(".message").textContent =
  //       "You lost the game! Try again!";

  //   // GUESS IS TOO HIGH
  // } else if (guess < randomNumber) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "Too low!";
  //     score = document.querySelector(".score").textContent;
  //     document.querySelector(".score").textContent = score - 1;
  //   } else
  //     document.querySelector(".message").textContent =
  //       "You lost the game! Try again!";
  // }
});

// RELOAD INSTANCE AND PLAY THE GAME AGAIN
document.querySelector(".again").addEventListener("click", function () {
  displayMessage("Start guessing...");
  score = 20;
  document.querySelector(".score").textContent = score;
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".guess").value = "";
  randomNumber = generateRandom();
});
