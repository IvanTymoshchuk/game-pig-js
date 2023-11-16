"use strict";

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let totalScore, currentScore, activePlayer, isPlaying;

const initGame = () => {
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  player0El.classList.remove("player--winner", "player--active");
  player1El.classList.remove("player--winner", "player--active");
  player0El.classList.add("player--active");
  diceEl.classList.add("hidden");
};

initGame();

const togglePlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", () => {
  if (isPlaying) {
    const diceValue = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");
    diceEl.src = `img/dice${diceValue}.png`;

    if (diceValue !== 1) {
      currentScore += diceValue;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      togglePlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (isPlaying) {
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    if (totalScore[activePlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      togglePlayer();
    }
  }
});

btnNew.addEventListener("click", initGame);
