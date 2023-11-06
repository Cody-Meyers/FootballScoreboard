const asideVisitorTransformButton = document.querySelector(
  "#button-aside-v-transform"
);
asideVisitorTransformButton.addEventListener(
  "click",
  asideVisitorTransformation
);

function asideVisitorTransformation() {
  const element = document.querySelector(".aside-visitor");
  element.classList.toggle("aside-visitor-transform");
  element.classList.toggle("transform-hidden");
}

const asideHomeTransformButton = document.querySelector(
  "#button-aside-h-transform"
);
asideHomeTransformButton.addEventListener("click", asideHomeTransformation);

function asideHomeTransformation() {
  const element = document.querySelector(".aside-home");
  element.classList.toggle("aside-home-transform");
  element.classList.toggle("transform-hidden");
}

// Ticker Transformation/Visibility Function - Visitor/Center/Home
function tickerTransformation(ticker1, ticker2, ticker3) {
  const e1 = document.querySelector(ticker1);
  const e2 = document.querySelector(ticker2);
  const e3 = document.querySelector(ticker3);
  const e2Test = e2.classList.contains("transform-hidden");
  const e3Test = e3.classList.contains("transform-hidden");

  if (!e2Test || !e3Test) {
    e2.classList.add("transform-hidden");
    e3.classList.add("transform-hidden");
    e1.classList.toggle("header-ticker-transform");
    e1.classList.toggle("transform-hidden");
  } else {
    e1.classList.toggle("header-ticker-transform");
    e1.classList.toggle("transform-hidden");
  }
}

// Reset Score
function resetScore(side) {
  document.querySelector(side).innerText = "0";
}

// Set Score Manually
function setScore(setFormClass, setInputClass, side) {
  const enteredScore = document.querySelector(setInputClass).value;
  console.log(enteredScore);

  document.querySelector(side).innerText = "";
  document.querySelector(side).append(enteredScore);
  document.querySelector(setFormClass).reset();
}

// Scoring Function
function scoringFunction(points, coinPoints, scorePoints) {
  checkForCoinDivToRemoveFirst();
  createCoinDiv(points, coinPoints);
  removeCoinDiv();
  addPointsToScore(points, scorePoints);
}

// -Try to remove any existing Coin DIV's when present
function checkForCoinDivToRemoveFirst() {
  try {
    const coinDivPresent = document.querySelector(".coin-transform");
    coinDivPresent.remove(coinDivPresent);
    console.log("Removed Coin DIV");
  } catch (error) {
    console.log("No Coin DIV to Remove");
  }
}

// --Create Coin DIV's
function createCoinDiv(points, side) {
  const eCoin = document.createElement("div");
  const eCoinPoints = document.createTextNode(points);

  document
    .querySelector(side)
    .appendChild(eCoin)
    .classList.add("coin-transform");

  eCoin.appendChild(eCoinPoints);

  document.querySelector(side).appendChild(eCoin);
}

// ---Select Coin at End of Coin Animation then call function to remove Coin DIV
function removeCoinDiv() {
  const animationEndDivRemove = document.querySelector(".coin-transform");
  animationEndDivRemove.addEventListener("animationend", scoreCoinRemove);

  function scoreCoinRemove() {
    const coinDiv = document.querySelector(".coin-transform");
    coinDiv.remove(coinDiv);
  }
}

// -Using current Score add new points and display in Score section
function addPointsToScore(points, side) {
  const currentScore = Number(document.querySelector(side).innerText);
  const pointsToAdd = points;
  const newScore = currentScore + pointsToAdd;

  document.querySelector(side).innerText = "";
  document.querySelector(side).append(newScore);
}

// fetch("http://localhost:3500/scores")
//   .then((response) => response.json())
//   .then((response) => console.log(response));

// fetch("http://localhost:3500/scores")
//   .then((response) => response.json())
//   .then((response) => console.log(JSON.stringify(response)));

// // fetch("http://localhost:3500/scores")
// // .then((response) => response.json()).map(scores.points)

// // let visitorScoring = document.getElementById("visitor-score-points");

// getScores = async () => {
//   const visitorScoring = document.getElementById("visitor-score-points");
//   fetch("http://localhost:3500/scores/1")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(JSON.stringify(data));
//       visitorScoring.innerHTML(`${data.score}`);
//       // data.forEach((x) => {
//       //   console.log(data);
//       //   visitorScoring.innerHTML(`<h2>${x.score}</h2>`);
//     });
// };

// getScores();
