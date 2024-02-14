"use strict";

///////////////////////////////////////

/* 
ЗАДАЧА: 
Создайте игру в угадай число.


Удачи)
*/
let attemptsNumber = 20;
let highscore = 20;
let currentAttempt;

let input = document.querySelector("input");
let message = document.querySelector(".message");

let againButton = document.querySelector(".again");
let body = document.querySelector("body");
let attempts = document.querySelector(".score");

//

let question = document.querySelector(".number");

function increaseAttempts() {
  currentAttempt = --attemptsNumber;
  attempts.textContent = currentAttempt;
}

function countRecord() {
  let record = document.querySelector(".highscore");
  let recordNumber = record.innerHTML;

  highscore = Number(20 - currentAttempt);
  record.innerHTML = highscore;

  if (highscore < record) {
    record.innerHTML = highscore;
  }
}

function winGame(secretNumber) {
  message.textContent = "Вы выиграли!";
  question.textContent = secretNumber;
  body.style.cssText = `
  background: #60b347;
  `;
}
function loseTheGame(secretNumber) {
  body.style.cssText = `background: #ff0000`;
  message.textContent = "Вы проиграли!";

  attempts.textContent = "0";
  question.textContent = secretNumber;
}
function playTheGame() {
  let secretNumber = Math.trunc(Math.random() * 20) + 1;
  let checkButton = document.querySelector(".check");
  checkButton.addEventListener("click", () => {
    let inputNumber = input.value;
    if (inputNumber > 0 && inputNumber < 21) {
      if (inputNumber < secretNumber) {
        message.textContent = "Слишком мало!";
        increaseAttempts();
      }
      if (inputNumber > secretNumber) {
        message.textContent = "Слишком много!";
        increaseAttempts();
      }
      if (inputNumber == secretNumber) {
        winGame(secretNumber);
        countRecord();
      }
      if (currentAttempt < 0) {
        loseTheGame(secretNumber);
      }
    } else {
      message.textContent = "Введите число от 1 до 20";
    }
  });
}

againButton.addEventListener("click", () => {
  attemptsNumber = 20;
  message.textContent = "Начните угадывать...";
  body.style.cssText = "";
  question.textContent = "?";
  document.querySelector(".guess").value = "";
  playTheGame();
});

function main() {
  playTheGame();
}
main();
