"use strict";

let score = 20;
let highscore = 20;

const againButton = document.querySelector(".again");
const question = document.querySelector(".number");

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

function increaseAttempts() {
  score--;
  if (score < 0) {
    score = 0;
  }
  document.querySelector(".score").textContent = score;
}

function countRecord() {
  let record = document.querySelector(".highscore").textContent;
  let currentRecord = parseInt(record, 10);

  let attempts = 20 - score;

  if (attempts < currentRecord) {
    document.querySelector(".highscore").textContent = attempts;
  }
}

function winGame(secretNumber) {
  displayMessage("Вы выиграли!");
  question.textContent = secretNumber;
  document.querySelector("body").classList.add("win-game");
}
function loseTheGame(secretNumber) {
  document.querySelector("body").classList.add("lose-game");
  displayMessage("Вы проиграли!");

  document.querySelector(".score").textContent = "0";
  question.textContent = secretNumber;
}
function playTheGame() {
  let secretNumber = Math.trunc(Math.random() * 20) + 1;
  let checkButton = document.querySelector(".check");
  checkButton.addEventListener("click", () => {
    let guess = Number(document.querySelector(".guess").value);
    if (score > 1) {
      if (guess > 0 && guess < 21) {
        if (guess < secretNumber) {
          displayMessage("Слишком мало!");
          increaseAttempts();
        } else if (guess > secretNumber) {
          displayMessage("Слишком много!");
          increaseAttempts();
        } else if (guess === secretNumber) {
          winGame(secretNumber);
          countRecord();
        }
      } else {
        displayMessage("Введите число от 1 до 20");
      }
    } else {
      loseTheGame(secretNumber);
    }
  });

  againButton.addEventListener("click", () => {
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    score = 20;
    document.querySelector(".score").textContent = 20;
    displayMessage("Начните угадывать...");
    document.querySelector("body").classList.remove("win-game");
    document.querySelector("body").classList.remove("lose-game");
    question.textContent = "?";
    document.querySelector(".guess").value = "";
  });
}

function main() {
  playTheGame();
}
main();
