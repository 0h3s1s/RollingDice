'use strict';

// Select Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const current = document.querySelector('.current');
const score = document.querySelector('.score');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnTheme = document.querySelector('.btn--theme');

const goal = 10;

let scores, currentScore, activePlayer, playing, dice;
let set = 1;

// FUNCTIONS
/**
 * The `init` function initializes the game by setting scores, current score, active player, and other
 * game elements to their initial values.
 */
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // diceEl.classList.add('hidden');
  diceEl.src = `img/dice-set${set}/dice-random.png`;
  dice = 'random';
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

/**
 * The `finish` function changes the playing status, declares a winner, and opens a congratulations
 * window after finishing the game.
 */
const finish = function () {
  // Change playing status, so after finishing the game, the only move possible is to reset the game
  playing = false;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  // Congratulations Window
  openModal();
};

/**
 * The function `addCurrentPointsToScore` updates the score of the active player by adding their
 * current score and resets their current score to zero.
 */
const addCurrentPointsToScore = function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  document.getElementById(`current--${activePlayer}`).textContent = 0;
};

/**
 * The switchPlayer function updates the active player, resets their current score to zero, and toggles
 * the 'player--active' class between two players in a game.
 */
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

/**
 * The function `changeTheme` changes the font, background, and dice-image displayed based on a specified
 * set number.
 */
const changeTheme = function () {
  btnNew2.style.width = '20rem';
  if (set === 1) {
    document.body.style.fontFamily = 'Nunito';
    document.body.style.backgroundImage =
      "linear-gradient(to bottom right, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url('img/dice-set3/texture2.jpg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  } else if (set === 2) {
    document.body.style.fontFamily = 'MedievalSharp';
    document.body.style.backgroundImage =
      "linear-gradient(to top left, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/dice-set2/texture.jpg')";
    document.body.style.backgroundBlendMode = 'overlay';
    document.body.style.backgroundSize = 'cover';
  } else if (set === 3) {
    document.body.style.fontFamily = 'Fascinate';
    document.body.style.backgroundImage =
      'linear-gradient(to left, #004080, #87CEEB);';
    document.body.style.backgroundImage =
      'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%), linear-gradient(to left, #004080, #87CEEB)';
    document.body.style.backgroundSize = '100% 100%, 100% 100%;';
  } else if (set === 4) {
    document.body.style.fontFamily = 'Arbutus';
    document.body.style.backgroundImage =
      "linear-gradient(to top left, rgba(80, 40, 20, 0.8), rgba(180, 140, 90, 0.8)), url('/img/dice-set4/texture.jpg')";
    document.body.style.backgroundSize = 'cover, 1000px 1000px';
    document.body.style.backgroundPosition = 'center, top left';
    document.body.style.backgroundRepeat = 'no-repeat, repeat';
    btnNew2.style.width = '23rem';
  }

  // When changing theme, check if the was a dice already rolled to match the image
  if (typeof dice == 'undefined') {
    diceEl.src = `img/dice-set${set}/dice-random.png`;
  } else {
    diceEl.src = `img/dice-set${set}/dice-${dice}.png`;
  }
};

// ROLLIND DICE FUNCTIONALITY
/* The `btnRoll.addEventListener('click, function () { ... })` code block is adding an event listener
to the "Roll Dice" button in the game. When the button is clicked, the following actions are
performed: 
  1. System check's if the game is still on by looking at 'playing' variable is true or false
      In case the still was already finished because a player has already reached the score goal, a modal opens up.
  2. Creates a random dice number, and loads a dice image with the corresponding number on the 'dice' variable.
  3. Checks if the dice is different than number 1:
    If YES, adds dice number to the score. Checks if the score has reached the score goal, in case yes finish, if not the player still has the turn and can keep playing until gets a dice with a number 1 or uses 'hold' button.
    If No, switches player turn.
*/
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-set${set}/dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // Check if CurrentScore + ActivePlayer score is >= goal points
      if (currentScore + scores[activePlayer] >= goal) {
        addCurrentPointsToScore();
        finish();
      }
    } else {
      // Switch to next player
      switchPlayer();
    }
  } else {
    openModal();
  }
});

// PLAYER HOLD SCORE FUNCTIONALITY
/* The `btnHold.addEventListener('click', function () { ... })` code block is adding an event listener
to the "Hold" button in the game. When the "Hold" button is clicked, the following actions are
performed: 
  1. System checks if players are still playing
  2. If yes, adds points to the score display and checks if the player reached score goal, in case finishes the game and opens a modal displaying a congratulations to the active player, otherwise switch player*/
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    addCurrentPointsToScore();

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= goal) {
      // Finish Game
      finish();
    } else {
      // Switch to the next player
      switchPlayer();
    }
  } else {
    openModal();
  }
});

// On Click it resets the Game
btnNew.addEventListener('click', init);

// Changes dice theme on click
btnTheme.addEventListener('click', function () {
  if (set < 4) {
    set++;
    changeTheme();
  } else {
    set = 1;
    changeTheme();
  }
});

// MODAL WINNING WINDOW
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsShowModal = document.querySelectorAll('.show-modal');
const btnNew2 = document.querySelector('.btn--new2');
let h1Modal = document.querySelector('.h1Modal');

// Open Modal
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  h1Modal.textContent = `🎉PLAYER ${activePlayer + 1} WON!!🎉`;
};

// Close Modal
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', closeModal);
btnNew2.addEventListener('click', function () {
  closeModal();
  init();
});
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
