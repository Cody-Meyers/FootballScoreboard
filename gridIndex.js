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

// Array Manipulation Base Functions
// -Style Display Functions
const changeToDisplayBlock = (thisArrayValue) => {
  thisArrayValue.style.display = "block";
};
const changeToDisplayNone = (thisArrayValue) => {
  thisArrayValue.style.display = "none";
};

// --Splice/Slice Functions
const spliced = (
  spliceArrayStartIndexNumber,
  splaceHowManyIndexNumbers,
  arrayToRunFunctionOn,
  styleDisplayFunctionChoice
) => {
  arraySpliced = arrayToRunFunctionOn.splice(
    spliceArrayStartIndexNumber,
    splaceHowManyIndexNumbers
  );
  arraySpliced.forEach(styleDisplayFunctionChoice);
};
const sliced = (
  sliceArrayStartIndexNumber,
  arrayToRunFunctionOn,
  styleDisplayFunctionChoice
) => {
  arraySliced = arrayToRunFunctionOn.slice(sliceArrayStartIndexNumber);
  arraySliced.forEach(styleDisplayFunctionChoice);
};

// Array Fields to Manipulate

// Play Form Input Options Display Change based on Selection
const typeOfPlaySelect = document.querySelector(".typeOfPlay");
typeOfPlaySelect.addEventListener("change", () => {
  const playIndex = typeOfPlaySelect.selectedIndex;
  typeOfPlaySelectFunction(playIndex);
});

const typeOfPlaySelectFunction = (playIndex) => {
  console.log("Type of Play Index: " + playIndex);
  const inputOptionsFormParent = document.querySelector(".playsForm");
  const inputOptionsFormChildNodes = inputOptionsFormParent.children;
  const inputOptionsFormParentArray = [...inputOptionsFormChildNodes];

  if (playIndex === 1) {
    spliced(4, 1, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(2, inputOptionsFormParentArray, changeToDisplayBlock);
  } else if (playIndex === 2) {
    spliced(3, 1, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(2, inputOptionsFormParentArray, changeToDisplayBlock);
  } else {
    sliced(2, inputOptionsFormParentArray, changeToDisplayNone);
  }
};

// Below is DRY Function with the Base Array Function still inside
// const typeOfPlaySelectFunction = (playIndex) => {
//   console.log("Type of Play Index: " + playIndex);
//   const inputOptionsFormParent = document.querySelector(".playsForm");
//   const inputOptionsFormChildNodes = inputOptionsFormParent.children;
//   const inputOptionsFormParentArray = [...inputOptionsFormChildNodes];

//   const changeToDisplayBlock = (e) => {
//     e.style.display = "block";
//   };

//   const changeToDisplayNone = (e) => {
//     e.style.display = "none";
//   };

//   const spliced = (n1, n2, d1) => {
//     arraySpliced = inputOptionsFormParentArray.splice(n1, n2);
//     arraySpliced.forEach(d1);
//   };

//   const sliced = (n1, d1) => {
//     arraySliced = inputOptionsFormParentArray.slice(n1);
//     arraySliced.forEach(d1);
//   };

//   if (playIndex === 1) {
//     spliced(4, 1, changeToDisplayNone);
//     sliced(2, changeToDisplayBlock);
//   } else if (playIndex === 2) {
//     spliced(3, 1, changeToDisplayNone);
//     sliced(2, changeToDisplayBlock);
//   } else {
//     sliced(2, changeToDisplayNone);
//   }
// };

// Below is Working semi-DRY
// const typeOfPlaySelect = document.querySelector(".typeOfPlay");
// typeOfPlaySelect.addEventListener("change", () => {
//   const playIndex = typeOfPlaySelect.selectedIndex;
//   typeOfPlaySelectFunction(playIndex);
// });

// const typeOfPlaySelectFunction = (playIndex) => {
//   console.log("Type of Play Index: " + playIndex);
//   const inputOptionsFormParent = document.querySelector(".playsForm");
//   const inputOptionsFormChildNodes = inputOptionsFormParent.children;
//   const inputOptionsFormParentArray = [...inputOptionsFormChildNodes];

//   const changeToDisplayBlock = (e) => {
//     e.style.display = "block";
//   };
//   const changeToDisplayNone = (e) => {
//     e.style.display = "none";
//   };

//   if (playIndex === 1) {
//     const inputOptionsFormParrentArraySpliced =
//       inputOptionsFormParentArray.splice(4, 1);
//     inputOptionsFormParrentArraySpliced.forEach(changeToDisplayNone);
//     const inputOptionsFormParrentArraySplicedSliced =
//       inputOptionsFormParentArray.slice(2);
//     inputOptionsFormParrentArraySplicedSliced.forEach(changeToDisplayBlock);
//   } else if (playIndex === 2) {
//     const inputOptionsFormParrentArraySpliced =
//       inputOptionsFormParentArray.splice(3, 1);
//     inputOptionsFormParrentArraySpliced.forEach(changeToDisplayNone);
//     const inputOptionsFormParrentArraySplicedSliced =
//       inputOptionsFormParentArray.slice(2);
//     inputOptionsFormParrentArraySplicedSliced.forEach(changeToDisplayBlock);
//   } else {
//     const inputOptionsFormParrentArraySpliced =
//       inputOptionsFormParentArray.slice(2);
//     inputOptionsFormParrentArraySpliced.forEach(changeToDisplayNone);
//   }
// };

// Below is Original Function
// const typeOfPlaySelectFunction = (playIndex) => {
//   console.log("Type of Play Index: " + playIndex);
//   const inputSideOptions = document.querySelector(".sideSelectOptions");
//   const inputPassOptions = document.querySelector(".passOptions");
//   const inputRushOptions = document.querySelector(".rushOptions");
//   const inputYardsOptions = document.querySelector(".yardsOptions");
//   const inputResultOptions = document.querySelector(".playResultOptions");
//   const inputDefenseOptions = document.querySelector(".defenseOptions");
//   if (playIndex === 1) {
//     inputSideOptions.style.display = "block";
//     inputPassOptions.style.display = "block";
//     inputRushOptions.style.display = "none";
//     inputYardsOptions.style.display = "block";
//     inputResultOptions.style.display = "block";
//     inputDefenseOptions.style.display = "block";
//   } else if (playIndex === 2) {
//     inputSideOptions.style.display = "block";
//     inputPassOptions.style.display = "none";
//     inputRushOptions.style.display = "block";
//     inputYardsOptions.style.display = "block";
//     inputResultOptions.style.display = "block";
//     inputDefenseOptions.style.display = "block";
//   } else {
//     inputSideOptions.style.display = "none";
//     inputPassOptions.style.display = "none";
//     inputRushOptions.style.display = "none";
//     inputYardsOptions.style.display = "none";
//     inputResultOptions.style.display = "none";
//     inputDefenseOptions.style.display = "none";
//   }
// };

// API Options
const API_URL_JSONSERVER = "http://localhost:3500/";
const API_URL_REQRES = "https://reqres.in/api/users";

// Play Form Submission to API
const playFormEl = document.querySelector(".playsForm");
playFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  playFormSubmit();
  playFormEl.reset();
  typeOfPlaySelectFunction();
});
async function playFormSubmit() {
  const grabIdEl = document.querySelector("#formUniqueId");
  const randomIdGenerated = crypto.randomUUID();
  grabIdEl.value = randomIdGenerated;
  console.log("Play ID: " + randomIdGenerated);

  const formData = new FormData(playFormEl);
  console.log(formData.get("player_passer_number"));
  console.log(formData.get("player_receiver_number"));
  console.log(formData.get("player_rusher_number"));
  console.log(formData.get("player_defense_number"));

  const formDataEntries = Object.fromEntries(formData);
  console.log(formDataEntries);
  try {
    const res = await fetch(API_URL_REQRES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataEntries),
    });
    if (!res.ok) {
      console.log(dataResponseData.description);
      return;
    }
    const dataResponseData = await res.json();
    console.log(dataResponseData);
  } catch (error) {
    console.log(error);
  }
}

const vQuarterbackStatsEl = document.querySelector(".vQuarterbackStats");
vQuarterbackStatsEl.addEventListener("click", (event) => {
  event.preventDefault();
  qbStatsFunction();
});

const qbStatsFunction = async () => {
  try {
    const res = await fetch("http://localhost:3500/cowboysRoster/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataResponseData = await res.json();
    console.log(dataResponseData);

    const response2 = await fetch("http://localhost:3500/plays/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataResponseData2 = await response2.json();
    console.log(dataResponseData2);

    if (!res.ok) {
      console.log(dataResponseData.description);
      return;
    }

    // Filter API Visitor Team Response Data by QB Position
    const filteredQbObjects = dataResponseData.filter(
      (object) => object.position === "QB"
    );
    console.log(filteredQbObjects);

    // Visitor Ticker QB Number Insertion
    const vTickerNumberEl = document.querySelector(".vTickerNumber");
    const qbNumber = filteredQbObjects[0].number;
    console.log(qbNumber);
    vTickerNumberEl.innerText = qbNumber;

    // Visitor Ticker QB Position Insertion
    const vTickerLeftEl = document.querySelector(".vTickerLeft");
    const qbPosition = filteredQbObjects[0].position;
    vTickerLeftEl.innerText = qbPosition;

    // Visitor Ticker QB Name Insertion
    const vTickerCenterEl = document.querySelector(".vTickerCenter");
    const qbFirstName = filteredQbObjects[0].player_first_name;
    const qbLastName = filteredQbObjects[0].player_last_name;
    vTickerCenterEl.innerText = qbFirstName + " " + qbLastName;

    // Filter API Plays Response Data by 'visitor' side Completed Passes
    const filteredPassPlaysCompletedObjects = dataResponseData2.filter(
      (object) =>
        object.side === "visitor" &&
        object.type_of_play === "pass" &&
        object.completed_play === "completed"
    );
    console.log(filteredPassPlaysCompletedObjects);
    console.log(filteredPassPlaysCompletedObjects.length);

    // Filter API Plays Response Data by 'visitor' side Attempted Passes
    const filteredPassPlaysObjects = dataResponseData2.filter(
      (object) => object.side === "visitor" && object.type_of_play === "pass"
    );
    console.log(filteredPassPlaysObjects);
    console.log(filteredPassPlaysObjects.length);

    const vTickerRightEl = document.querySelector(".vTickerRight");
    const completedPasses = filteredPassPlaysCompletedObjects.length;
    const attemptedPasses = filteredPassPlaysObjects.length;
    vTickerRightEl.innerText =
      "Passing: " + completedPasses + " / " + attemptedPasses;

    tickerTransformation(
      ".header-ticker-visitor",
      ".header-ticker-center",
      ".header-ticker-home"
    );
  } catch (error) {
    console.log(error);
  }
};
// const qbStatsFunction = async () => {
//   try {
//     const res = await fetch("http://localhost:3500/cowboysRoster/", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const dataResponseData = (response = await res.json());
//     console.log(dataResponseData);

//     if (!res.ok) {
//       console.log(dataResponseData.description);
//       return;
//     }

//     // Filter API Visitor Team Response Data by QB Position
//     const filteredQbObjects = dataResponseData.filter(
//       (object) => object.position === "QB"
//     );
//     console.log(filteredQbObjects);

//     // Visitor Ticker QB Number Insertion
//     const vTickerNumberEl = document.querySelector(".vTickerNumber");
//     const qbNumber = filteredQbObjects[0].number;
//     console.log(qbNumber);
//     vTickerNumberEl.innerText = qbNumber;

//     // Visitor Ticker QB Position Insertion
//     const vTickerLeftEl = document.querySelector(".vTickerLeft");
//     const qbPosition = filteredQbObjects[0].position;
//     vTickerLeftEl.innerText = qbPosition;

//     // Visitor Ticker QB Name Insertion
//     const vTickerCenterEl = document.querySelector(".vTickerCenter");
//     const qbFirstName = filteredQbObjects[0].player_first_name;
//     const qbLastName = filteredQbObjects[0].player_last_name;
//     vTickerCenterEl.innerText = qbFirstName + " " + qbLastName;

//     tickerTransformation(
//       ".header-ticker-visitor",
//       ".header-ticker-center",
//       ".header-ticker-home"
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// Unused Info below vvv
// async function testInfo() {
//   const formData = new FormData(playFormEl);
//   console.log(formData);
//   const formDataEntries = Object.fromEntries(formData);
//   console.log(formDataEntries);
//   const res = JSON.stringify(formDataEntries);
//   console.log(res);
//   const dataResponseData = res.parse;
//   console.log(dataResponseData);
// }

// testInfo();
