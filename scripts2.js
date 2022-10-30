const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let numberOfmoves = 0;
let correctMoves = 0;

// function to add class flip to card, to toggle the front and back images of cards

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

// function to check if cards match, based on color, clubs and spades of same number match, diamonds and hearts of same number match

function checkForMatch() {
  numberOfmoves++;
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

// function to remove click event listner from the cards if the two cards match. This function also displays whether the user has won, with total number of moves, correct and incorrect moves

function disableCards() {
  correctMoves++;
  if(correctMoves==12)
	alert("You Won!! \n" + " \nTotal Number Of Moves : " + numberOfmoves + " \nIncorrect Moves : " + (parseInt(numberOfmoves) - parseInt(correctMoves)) + " \nCorrect Moves : " + correctMoves);
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

// function to remove class flip from cards if cards dont match

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

// function to reset the board by reinitializing the variables to initial values

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// function to shuffle the cards , to generate a new board every time a game is loaded

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));