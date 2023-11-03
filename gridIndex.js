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

// -Create Coin DIV's
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

// ---Select Coin at End of Coin Animation then call function to remove Coin DIV
function coinAnimationEndFunction() {
  const animationEndDivRemove = document.querySelector(".coin-transform");
  animationEndDivRemove.addEventListener("animationend", scoreCoinRemove);
}
// ---Remove Coin DIV
function scoreCoinRemove() {
  const coinDiv = document.querySelector(".coin-transform");
  coinDiv.remove(coinDiv);
}
