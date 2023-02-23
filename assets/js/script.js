let cards = document.querySelectorAll(".card");
let cardArray = [...cards];
let flippedCard = false;
let lockCard = false;
let firstCard, secondCard;
let moves = document.getElementById("moves");
let startButton = document.getElementById("start");
let replayButton = document.getElementById("replay");
let movesCount = 0;

function movesCounter() {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
}

startButton.addEventListener("click", () => {
  startButton.classList.add("hide");
  startGame();
})


replayButton.addEventListener("click", event => {
  window.location.reload();
});

function shuffle() {
  cardArray.forEach((card) => {
    let randomIndex = Math.floor(Math.random() * cardArray.length);
    card.style.order = randomIndex;
    card.children[1].style.backgroundImage = `url(${card.getAttribute(
      "data-image"
    )})`;
  });
}

function flipCard() {
  if (lockCard) return;
  if (this === firstCard) {
    return;
  } else {
    movesCounter();
  }

  this.classList.add("flip");

  if (!flippedCard) {
    flippedCard = true;
    firstCard = this;
    return;
  } 

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockCard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [flippedCard, lockCard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function startGame() {
  shuffle();
  cards.forEach((card) => card.addEventListener("click", flipCard));
}

