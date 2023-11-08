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

const API_URL = "http://localhost:3500";

const visitorScoring = fetch("http://localhost:3500/visitorScores/", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => showScore(data));
// .then((response) => console.log(JSON.stringify(response)));

const homeScoring = fetch("http://localhost:3500/homeScores/", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => showScores(data));

function showScores(data) {
  let sum = 0;
  console.log(data);
  console.log(data[0]);
  console.log(data[0].score);
  console.log(data.length);

  data.forEach(addVisitorScores);
  function addVisitorScores(data) {
    sum += data.score;
  }
  console.log(sum);
}

function showScore(data) {
  let sum = 0;
  data.forEach(addVisitorScore);

  function addVisitorScore(data) {
    sum += data.score;
    let displayVisitorScore = document.querySelector(".tempVisitorScore");
    displayVisitorScore.innerText = sum;
  }
  // document.querySelector(".tempVisitorScore").innerText = displayVisitorScore;
  // document.querySelector(".tempVisitorScore").append(displayVisitorScore);
}

const playFormEl = document.querySelector(".playsForm");
playFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  playFormSubmit();
});

async function playFormSubmit() {
  const formData = new FormData(playFormEl);
  console.log(formData.get("player_one_number"));
  const formDataEntries = Object.fromEntries(formData);
  console.log(formDataEntries);
  try {
    const res = await fetch("http://localhost:3500/plays/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataEntries),
    });
    const dataResponseData = await res.json();
    console.log(dataResponseData);
    if (!res.ok) {
      console.log(dataResponseData.description);
      return;
    }
    console.log(dataResponseData);
  } catch (error) {
    console.log(error);
  }
}

// async function playFormSubmit() {
//   const formData = new FormData(playFormEl);
//   console.log(formData);
//   const formDataEntries = Object.fromEntries(formData);
//   console.log(formDataEntries);
//   const res = JSON.stringify(formDataEntries);
//   console.log(res);
//   const dataResponseData = res.parse;
//   console.log(dataResponseData);
// }
