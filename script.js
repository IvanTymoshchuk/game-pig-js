"use strict";

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
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
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player1El.classList.remove("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.add("player--active");
  diceEl.classList.add("hidden");
};

initGame();

const switchActivePlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", () => {
  if (isPlaying) {
    // 1. Generede a random number

    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // 2. Display number on the dice

    diceEl.classList.remove("hidden");
    diceEl.src = `img/dice${diceNumber}.png`;

    // 3. If the number is 1, switch to the next player, if not - add number to the current score

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (isPlaying) {
    // 1. Add current score to active player total score

    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    // 2. If total score of active player >= 100 , active player won , if not switch active player
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
      switchActivePlayer();
    }
  }
});

btnNew.addEventListener("click", initGame);
