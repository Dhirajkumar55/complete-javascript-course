"use strict";

let randomNumber = Math.floor(Math.random() * 21);
let scoreField = document.querySelector(".score");
let highscoreField = document.querySelector(".highscore");
let guessField = document.querySelector(".guess");
let messageField = document.querySelector(".message");
let bodyField = document.querySelector("body");

document.querySelector(".check").addEventListener("click", function () {
  let inputNumber = Number(guessField.value);

  if (!inputNumber) {
    messageField.innerHTML = "⛔️ No number!";
  } else {
    let score = Number(scoreField.innerHTML);
    if (score < 1) {
      messageField.innerHTML = "💥 You lost the game!";
    } else {
      if (randomNumber > inputNumber) {
        score -= 1;
        scoreField.innerHTML = score;
        messageField.textContent = "📉 too low";
      } else if (randomNumber < inputNumber) {
        score -= 1;
        scoreField.innerHTML = score;
        messageField.textContent = "📈 too high";
      } else {
        document.querySelector(".number").innerHTML = randomNumber;
        if(highscoreField.textContent < score){
          highscoreField.innerHTML = score;
        }
        messageField.textContent = "🎉 correct";
        bodyField.classList.add("green");
      }
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  randomNumber = Math.floor(Math.random() * 21);
  scoreField.innerHTML = "20";
  bodyField.classList.remove("green");
  messageField.innerHTML = "Start guessing..."
  guessField.value = "";
});
