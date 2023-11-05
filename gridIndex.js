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

const tickerVisitorTransformButton = document.querySelector(
  "#button-ticker-v-transform"
);
tickerVisitorTransformButton.addEventListener(
  "click",
  tickerVisitorTransformation
);

function tickerVisitorTransformation() {
  const element = document.querySelector(".header-ticker-visitor");
  element.classList.toggle("header-ticker-transform");
  element.classList.toggle("transform-hidden");
}

const tickerCenterTransformButton = document.querySelector(
  "#button-ticker-center-transform"
);
tickerCenterTransformButton.addEventListener(
  "click",
  tickerCenterTransformation
);

function tickerCenterTransformation() {
  const element = document.querySelector(".header-ticker-center");
  const eV = document.querySelector(".header-ticker-visitor");
  const eH = document.querySelector(".header-ticker-home");
  const eVTest = eV.classList.contains(".transform-hidden");
  const eHTest = eV.classList.contains(".transform-hidden");

  if (!(eVTest || eHTest)) {
    eV.classList.add("transform-hidden");
    eH.classList.add("transform-hidden");
    element.classList.toggle("header-ticker-transform");
    element.classList.toggle("transform-hidden");
  } else {
    element.classList.toggle("header-ticker-transform");
    element.classList.toggle("transform-hidden");
  }
}

const tickerHomeTransformButton = document.querySelector(
  "#button-ticker-h-transform"
);
tickerHomeTransformButton.addEventListener("click", tickerHomeTransformation);

function tickerHomeTransformation() {
  const element = document.querySelector(".header-ticker-home");
  element.classList.toggle("header-ticker-transform");
  element.classList.toggle("transform-hidden");
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

// ---Select Coin at End of Coin Animation then call function to remove Coin DIV
// function coinAnimationEndFunction() {
//   const animationEndDivRemove = document.querySelector(".coin-transform");
//   animationEndDivRemove.addEventListener("animationend", scoreCoinRemove);
// }
// ----Remove Coin DIV
// function scoreCoinRemove() {
//   const coinDiv = document.querySelector(".coin-transform");
//   coinDiv.remove(coinDiv);
// }

// function homeScoreCoinRemove() {
//   const eHomeScoreCoinDivParent = document.getElementById("home-score-coin-id");

//   if (eHomeScoreCoinDivParent.hasChildNodes()) {
//     eHomeScoreCoinDivParent.removeChild(eHomeScoreCoinDivParent.children[0]);
//   }
// }

// --Visitor Coin DIV Creation
// function visitorScoreCoin(e) {
//   const eVisitorScoreCoin = document.createElement("div");
//   const eVisitorScoreCoinValue = document.createTextNode(e);

//   document
//     .getElementById("visitor-score-coin-id")
//     .appendChild(eVisitorScoreCoin)
//     .classList.add("visitor-score-coin-transform-class", "coin-transform");

//   eVisitorScoreCoin.appendChild(eVisitorScoreCoinValue);

//   document
//     .getElementById("visitor-score-coin-id")
//     .appendChild(eVisitorScoreCoin);
// }

// --Home Coin DIV Creation
// function homeScoreCoin(e) {
//   const eHomeScoreCoin = document.createElement("div");
//   const eHomeScoreCoinValue = document.createTextNode(e);

//   document
//     .getElementById("home-score-coin-id")
//     .appendChild(eHomeScoreCoin)
//     .classList.add("home-score-coin-transform-class", "coin-transform");

//   eHomeScoreCoin.appendChild(eHomeScoreCoinValue);

//   document.getElementById("home-score-coin-id").appendChild(eHomeScoreCoin);
// }

// const API_URL = "http://localhost:3500";

// fetch("http://localhost:3500/scores", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     id: 2,
//     "score-visitor": 2,
//     points: 1,
//   }),
// })
//   .then((response) => response.json())
//   .then((response) => console.log(response.status));

fetch("http://localhost:3500/scores")
  .then((response) => response.json())
  .then((response) => console.log(response));

fetch("http://localhost:3500/scores")
  .then((response) => response.json())
  .then((response) => console.log(JSON.stringify(response)));

// fetch("http://localhost:3500/scores")
// .then((response) => response.json()).map(scores.points)

// let visitorScoring = document.getElementById("visitor-score-points");

getScores = async () => {
  const visitorScoring = document.getElementById("visitor-score-points");
  fetch("http://localhost:3500/scores/1")
    .then((response) => response.json())
    .then((data) => {
      console.log(JSON.stringify(data));
      visitorScoring.innerHTML(`${data.score}`);
      // data.forEach((x) => {
      //   console.log(data);
      //   visitorScoring.innerHTML(`<h2>${x.score}</h2>`);
    });
};
// const visitorScoring = document.getElementById("visitor-score-points");
// const objToParse = JSON.parse(grabScore.map());
// visitorScoring.innerHTML = objToParse.score;

// getScores = async (x) => {
//   const grabScore = await fetch("http://localhost:3500/visitorScore").then(
//     (response) => response.json()
//   );
//   const visitorScoring = document.getElementById("visitor-score-points");
//   const objToParse = JSON.parse(grabScore.map());
//   visitorScoring.innerHTML = objToParse.score;
// };

// getScores = async (x) => {
//   const grabScore = await fetch("http://localhost:3500/visitorScore").then(
//     (response) => response.json()
//   );
//   visitorScoring.innerHTML = grabScore.map(x) => {
//     JSON.stringify(x.score)
//     return response;
//   };
// };

// return (visitorScoring.innerHTMl = await grabScore.map((x) => {
//   return JSON.stringify(x.score);
// }

// const scoring = (getScores = async (x) => {
//   const grabScore = await fetch("http://localhost:3500/visitorScore").then(
//     (response) => response.json()
//   );
//   return (visitorScoring.innerHTMl = grabScore.map((x) => {
//     return JSON.stringify(x.score);
//   }));
// });

// return visitorScore.append.(grabScore.score).innerHTML;

// const async getScores = () => {
//   return (visitorScore.innerHTML = await fetch(
//     "http://localhost:3500/visitorScore"
//   ).then((response) => response.json()));
// };

getScores();

// async function getScore() {
//   try {
//     const response = await fetch(API_URL);
//     const listScore = await response.json();
//     setItems(listScore);
//     console.log(listScore);
//   } catch (error) {
//     console.log(error.stack);
//   }
//   async () => await getScore();
// }
// [];

// const currentVisitorScore =
//   document.getElementById("visitor-score-points").innerHTML;
// console.log(currentVisitorScore);

// const currentScore = {
//   score: 1,
//   logScore: function () {
//     console.log(this.score);
//   },
// };
