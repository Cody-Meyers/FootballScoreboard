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

// Below function is an alternate else if else if else - may be usefull
// function tickerCenterTransformation() {
//   const element = document.querySelector(".header-ticker-center");
//   const eV = document.querySelector(".header-ticker-visitor");
//   const eH = document.querySelector(".header-ticker-home");
//   const eVTest = eV.classList.contains(".transform-hidden");
//   const eHTest = eV.classList.contains(".transform-hidden");

//   if (!eVTest) {
//     eV.classList.add("transform-hidden");
//     element.classList.toggle("header-ticker-transform");
//     element.classList.toggle("transform-hidden");
//   } else if (!eHTest) {
//     eH.classList.add("transform-hidden");
//     element.classList.toggle("header-ticker-transform");
//     element.classList.toggle("transform-hidden");
//   } else {
//     element.classList.toggle("header-ticker-transform");
//     element.classList.toggle("transform-hidden");
//   }
// }

const tickerHomeTransformButton = document.querySelector(
  "#button-ticker-h-transform"
);
tickerHomeTransformButton.addEventListener("click", tickerHomeTransformation);

function tickerHomeTransformation() {
  const element = document.querySelector(".header-ticker-home");
  element.classList.toggle("header-ticker-transform");
  element.classList.toggle("transform-hidden");
}

// !Below are Coin Transformation attempts -- need to add this functionality AFTER the creation of the Coin Div function: visitorScoreCoin -- needs to remove DIV after animation completes
// const scoreCoinVisitorTransformButton = document.querySelector("#button-score-coin-visitor-transform");
// scoreCoinVisitorTransformButton.addEventListener("click" scoreVisitorTransformation);

// function scoreVisitorTransformation() {
//   const element = document.querySelector(".visitor-score-coin");
//   element.classList.toggle(".transform-hidden-coin");
//   element.classList.toggle(".visitor-coin-transform");
// }

// const element = document.querySelector("#button-score-coin-visitor-transform");
// element.addEventListener("animationstart", listener, false);
// element.addEventListener("animationend", listener, false);
// element.addEventListener("animationiteration", listener, false);

// element.className = "coin-easeOutBounce";

// function listener(event) {
//   const e = document.createElement("p");
//   e.textContent = "";
// }

// function scoreCoinValue(score) {
//   document.getElementById("visitor-score-coin-id").innerHTML = score;
// }

// function scoreChange(visitorScoreValue, homeScoreValue) {
//   const eVisitorScoreCoin = document.getElementbyID("visitor-score-coin-id");
//   const eHomeScoreCoin = document.getElementbyID("home-score-coin-id");
//   const eVisitorScore = document.getElementbyID("visitor-score-id");
//   const eHomeScore = document.getElementbyID("home-score-id");

//   eVisitorScoreCoin.innerHTML = visitorScoreValue;
//   eVisitorScore.innerHTML = `evisitorScore.innerHTML + visitorScoreValue`;
//   eHomeScoreCoin.innerHTML = homeScoreValue;
//   eHomeScore.innerHTML = homeScoreValue;
// }

// const scoreCoinVisitorTransformButtonFieldGoal = document.querySelector(
//   "#button-score-coin-visitor-transform"
// );
// scoreCoinVisitorTransformButtonFieldGoal.addEventListener(
//   "click",
//   visitorScoreCoin
// );

// function visitorScoreCoin(e) {
//   const eVisitorScoreCoin = document.createElement("div");
//   const eVisitorScoreValue = document.createTextNode(e);

//   eVisitorScoreCoin.appendChild(eVisitorScoreValue);

//   document
//     .getElementById("visitor-score-coin-id")
//     .appendChild(eVisitorScoreCoin);
// }

function visitorScoreCoin(e) {
  const eVisitorScoreCoin = document.createElement("div");
  const eVisitorScoreCoinValue = document.createTextNode(e);

  document
    .getElementById("visitor-score-coin-id")
    .appendChild(eVisitorScoreCoin)
    .classList.add("visitor-score-coin-transform-class");

  eVisitorScoreCoin.appendChild(eVisitorScoreCoinValue);

  document
    .getElementById("visitor-score-coin-id")
    .appendChild(eVisitorScoreCoin);
}

function homeScoreCoin(e) {
  const eHomeScoreCoin = document.createElement("div");
  const eHomeScoreCoinValue = document.createTextNode(e);

  document
    .getElementById("home-score-coin-id")
    .appendChild(eHomeScoreCoin)
    .classList.add("home-score-coin-transform-class");

  eHomeScoreCoin.appendChild(eHomeScoreCoinValue);

  document.getElementById("home-score-coin-id").appendChild(eHomeScoreCoin);
}
