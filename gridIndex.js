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
  if (side == ".visitor-score-points") {
    console.log("Successfully reset Visitor Side Score");
  } else {
    console.log("Successfully reset Home Side Score");
  }
}

// Set Score Manually
function setScore(setFormClass, setInputClass, side) {
  event.preventDefault();
  const enteredScore = document.querySelector(setInputClass).value;
  console.log(enteredScore);
  if (enteredScore == "") {
    console.log("Need to enter Score to set manually");
    return;
  } else {
    console.log("got here");
    document.querySelector(side).innerText = "";
    document.querySelector(side).append(enteredScore);
    document.querySelector(setFormClass).reset();
  }
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

// Create Array to Index Function - create the initial Array to Manipulate
const createArrayIndex = (parentClassOfElementsToArray) => {
  const inputOptionsFormParent = document.querySelector(
    parentClassOfElementsToArray
  );
  const inputOptionsFormChildNodes = inputOptionsFormParent.children;
  const inputOptionsFormParentArray = [...inputOptionsFormChildNodes];
  return inputOptionsFormParentArray;
};

// -Style Display Functions
const changeToDisplayBlock = (thisArrayValue) => {
  thisArrayValue.style.display = "block";
  // thisArrayValue.style.justifycontent = "space-between";
  // thisArrayValue.style.flexdirection = "column";
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

// ---Select Option Value Update Function
const selectOptionValueUpdate = (selectElementClassName, thisNumberIndex) => {
  const changeThisEl = document.querySelector(selectElementClassName);
  changeThisEl.selectedIndex = thisNumberIndex;
};

// Array Fields to Manipulate

// -Play Form Input Options Display Change based on Selection
const typeOfPlaySelect = document.querySelector(".typeOfPlay");
typeOfPlaySelect.addEventListener("change", () => {
  const playIndex = typeOfPlaySelect.selectedIndex;
  typeOfPlaySelectFunction(playIndex);
});
const typeOfPlaySelectFunction = (playIndex) => {
  console.log("Type of Play Index: " + playIndex);
  inputOptionsFormParentArray = createArrayIndex(".playsForm");
  inputOptionsFormParentArray2 = createArrayIndex(".yardLines");
  if (playIndex === 1) {
    spliced(4, 1, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(3, inputOptionsFormParentArray, changeToDisplayBlock);
    flagSelectFunction(0);
    selectOptionValueUpdate(".flagChoice", 0);
  } else if (playIndex === 2) {
    spliced(3, 2, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(3, inputOptionsFormParentArray, changeToDisplayBlock);
    flagSelectFunction(0);
    selectOptionValueUpdate(".flagChoice", 0);
  } else if (playIndex === 3) {
    spliced(3, 1, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(3, inputOptionsFormParentArray, changeToDisplayBlock);
    flagSelectFunction(0);
    selectOptionValueUpdate(".flagChoice", 0);
  } else if (playIndex === 4) {
    spliced(3, 3, inputOptionsFormParentArray, changeToDisplayNone);
    spliced(4, 1, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(3, inputOptionsFormParentArray, changeToDisplayBlock);
    spliced(2, 1, inputOptionsFormParentArray2, changeToDisplayNone);
    sliced(0, inputOptionsFormParentArray2, changeToDisplayBlock);
    flagSelectFunction(1);
    selectOptionValueUpdate(".flagChoice", 1);
  } else {
    sliced(3, inputOptionsFormParentArray, changeToDisplayNone);
    flagSelectFunction(0);
    selectOptionValueUpdate(".flagChoice", 0);
  }
};

// -Play Form Flag Input Options Display Change based on Selection
const flagSelect = document.querySelector(".flagChoice");
flagSelect.addEventListener("change", () => {
  const flagIndex = flagSelect.selectedIndex;
  flagSelectFunction(flagIndex);
});
const flagSelectFunction = (flagIndex) => {
  console.log("Type of Flag Index: " + flagIndex);
  inputOptionsFormParentArray = createArrayIndex(".flag");
  if (flagIndex === 1) {
    sliced(1, inputOptionsFormParentArray, changeToDisplayBlock);
  } else {
    sliced(1, inputOptionsFormParentArray, changeToDisplayNone);
  }
};

// -Play Form Fumble Input Options Display Change based on Selection
const fumbleSelect = document.querySelector(".fumbleChoice");
fumbleSelect.addEventListener("change", () => {
  const fumbleIndex = fumbleSelect.selectedIndex;
  fumbleSelectFunction(fumbleIndex);
});
const fumbleSelectFunction = (fumbleIndex) => {
  console.log("Type of Fumble Index: " + fumbleIndex);
  inputOptionsFormParentArray = createArrayIndex(".fumbleOptions");
  if (fumbleIndex === 1) {
    sliced(1, inputOptionsFormParentArray, changeToDisplayBlock);
  } else {
    sliced(1, inputOptionsFormParentArray, changeToDisplayNone);
  }
};

// -Play Form Pass Play Input Options Display Change based on Selection
const passPlaySelect = document.querySelector(".classPassPlayDuring");
passPlaySelect.addEventListener("change", () => {
  const passPlayIndex = passPlaySelect.selectedIndex;
  passPlayFunction(passPlayIndex);
});
const passPlayFunction = (passPlayIndex) => {
  console.log("Pass Play Index: " + passPlayIndex);
  inputOptionsFormParentArray = createArrayIndex(".passOptions");
  if (passPlayIndex === 1) {
    spliced(3, 1, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(0, inputOptionsFormParentArray, changeToDisplayBlock);
    fumbleSelectFunction(0);
    selectOptionValueUpdate(".fumbleChoice", 0);
  } else if (passPlayIndex === 2) {
    spliced(1, 3, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(0, inputOptionsFormParentArray, changeToDisplayBlock);
    fumbleSelectFunction(0);
    selectOptionValueUpdate(".fumbleChoice", 0);
  } else if (passPlayIndex === 3) {
    spliced(1, 3, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(0, inputOptionsFormParentArray, changeToDisplayBlock);
    fumbleSelectFunction(1);
    selectOptionValueUpdate(".fumbleChoice", 1);
  } else {
    spliced(1, 3, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(0, inputOptionsFormParentArray, changeToDisplayBlock);
    fumbleSelectFunction(0);
    selectOptionValueUpdate(".fumbleChoice", 0);
  }
};

// -Play Form Pass Play Result Input Options Display Change based on Selection
const passPlayResultSelect = document.querySelector(".passPlayResult");
passPlayResultSelect.addEventListener("change", () => {
  const passPlayResultIndex = passPlayResultSelect.selectedIndex;
  passPlayResultFunction(passPlayResultIndex);
});
const passPlayResultFunction = (passPlayResultIndex) => {
  console.log("Pass Play Results Index: " + passPlayResultIndex);
  inputOptionsFormParentArray = createArrayIndex(".passOptions");
  if (passPlayResultIndex === 1) {
    spliced(3, 1, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(0, inputOptionsFormParentArray, changeToDisplayBlock);
    flagSelectFunction(0);
    selectOptionValueUpdate(".flagChoice", 0);
  } else if (passPlayResultIndex === 2) {
    spliced(3, 1, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(0, inputOptionsFormParentArray, changeToDisplayBlock);
    flagSelectFunction(0);
    selectOptionValueUpdate(".flagChoice", 0);
  } else if (passPlayResultIndex === 3) {
    spliced(3, 1, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(0, inputOptionsFormParentArray, changeToDisplayBlock);
    flagSelectFunction(0);
    selectOptionValueUpdate(".flagChoice", 0);
  } else if (passPlayResultIndex === 4) {
    sliced(0, inputOptionsFormParentArray, changeToDisplayBlock);
    flagSelectFunction(0);
    selectOptionValueUpdate(".flagChoice", 0);
  } else if (passPlayResultIndex === 5) {
    spliced(2, 2, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(0, inputOptionsFormParentArray, changeToDisplayBlock);
    flagSelectFunction(1);
    selectOptionValueUpdate(".flagChoice", 1);
  } else {
    spliced(2, 3, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(0, inputOptionsFormParentArray, changeToDisplayBlock);
    flagSelectFunction(0);
    selectOptionValueUpdate(".flagChoice", 0);
  }
};

// -Play Form End of Play Input Options Display Change based on Selection
const endPlaySelect = document.querySelector(".endOfPlayChoice");
endPlaySelect.addEventListener("change", () => {
  const endPlayIndex = endPlaySelect.selectedIndex;
  endPlayFunction(endPlayIndex);
});
const endPlayFunction = (endPlayIndex) => {
  console.log("End of Play Index: " + endPlayIndex);
  inputOptionsFormParentArray = createArrayIndex(".playEndOptions");
  const endingYardsNumber = document.getElementById("yardLinesEndingNumber");
  if (endPlayIndex === 1) {
    spliced(4, 1, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(0, inputOptionsFormParentArray, changeToDisplayBlock);
    endingYardsNumber.value = "";
  } else if (endPlayIndex === 2) {
    spliced(2, 1, inputOptionsFormParentArray, changeToDisplayNone);
    spliced(3, 1, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(0, inputOptionsFormParentArray, changeToDisplayBlock);
    endingYardsNumber.value = "";
  } else if (endPlayIndex === 3) {
    spliced(2, 2, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(0, inputOptionsFormParentArray, changeToDisplayBlock);
    endingYardsNumber.value = 0;
  } else {
    spliced(2, 3, inputOptionsFormParentArray, changeToDisplayNone);
    sliced(0, inputOptionsFormParentArray, changeToDisplayBlock);
    endingYardsNumber.value = "";
  }
};

// Play Form Reset Function
const playFormResetButtonEl = document.querySelector(".resetPlayFormButton");
const playFormResetButtonFunction = playFormResetButtonEl.addEventListener(
  "click",
  () => {
    const playFormToResetEl = document.querySelector(".playsForm");

    typeOfPlaySelectFunction(0);
    playFormToResetEl.reset();
    console.log("Successfully Reset Play Form");
  }
);

// Set initial state:
typeOfPlaySelectFunction(0);

// API Options
const API_URL_JSONSERVER = "http://localhost:3500/";
const API_URL_JSONSERVER_GAME_INFO = "http://localhost:3500/gameInfo";
const API_URL_REQRES = "https://reqres.in/api/users";

// Play Form Submission to API
const playFormEl = document.querySelector(".playsForm");
playFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  playFormSubmit();
  playFormEl.reset();
  typeOfPlaySelectFunction();
  console.log("Successfully Submitted Play Form");
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

// const teamSelectOptionsDropDown = document.querySelector(".teamVisitorSelect");
// teamSelectOptionsDropDown.addEventListener("input", (event) => {
//   oninput = (event) => {
//     console.log("heard click");
//   };
// });
// teamSelectOptionsDropDown.addEventListener("change", () => (this.size = 0));
// teamSelectOptionsDropDown.addEventListener("onblur", () => (this.size = 0));

// New Game Creation
const newGameFormEl = document.querySelector(".newGameForm");
newGameFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  newGameSubmit();
  newGameFormEl.reset();
  console.log("Successfully Started New Game");
});

async function newGameSubmit() {
  const grabIdEl = document.querySelector("#newGameUniqueId");
  const randomIdGenerated = crypto.randomUUID();
  grabIdEl.value = randomIdGenerated;
  console.log("New Game ID: " + randomIdGenerated);

  const formData = new FormData(newGameFormEl);
  console.log(formData.get("teamVisitor"));
  console.log(formData.get("teamHome"));

  const formDataEntries = Object.fromEntries(formData);
  console.log(formDataEntries);
  try {
    const res = await fetch("http://localhost:3500/gameInfo", {
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
    resetScore(".visitor-score-points");
    resetScore(".home-score-points");
    playFormResetButtonEl.click();
  } catch (error) {
    console.log(error);
  }
}

// below is attempted code at creating a new Top Level Key for creating 'new leagues'
// const createNewLeagueEl = document.querySelector("#createLeagueFormSubmitId");

// const createNewLeagueFunction = () => {
//   event.preventDefault();
//   const newLeagueNameEl = document.querySelector(".newLeagueName");
//   const newLeagueNameValue = newLeagueNameEl.value;
//   console.log(newLeagueNameValue);

//   const createleagueObject = {};
//   createleagueObject[newLeagueNameValue] = [];
//   // console.log(createLeagueObject);

//   const existingDatabase = JSON.parse(fs.readFileSync("./data/db.json"));
//   const mergeDatabase = Object.assign(existingDatabase, createleagueObject);
//   fs.writeFileSync("./data/db.json", JSON.stringify(mergeDatabase));

// try {
//   const res = await fetch("http://localhost:3500", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(createleagueObject),
//   });
//   if (!res.ok) {
//     console.log(dataResponseData.description);
//     return;
//   }
//   const dataResponseData = await res.json();
//   console.log("Created new League Successfully" + dataResponseData);
// } catch (error) {
//   console.log(error);
// }
// };
// createNewLeagueEl.addEventListener("click", createNewLeagueFunction);

// const createNewLeagueEl = document.querySelector(".leagueCreationForm");
// createNewLeagueEl.addEventListener("submit", (event) => {
//   event.preventDefault();
//   createNewLeagueEl.reset();
//   console.log("Successfully Created New League");
// });

// Create New League Function
const createNewLeagueEl = document.querySelector(".leagueCreationForm");
createNewLeagueEl.addEventListener("submit", (event) => {
  event.preventDefault();
  createNewLeagueFunction();
  createNewLeagueEl.reset();
  console.log("Successfully Created New League");
});
const createNewLeagueFunction = async () => {
  event.preventDefault();
  const newLeagueNameEl = document.querySelector(".leagueNewName");
  const newLeagueNameValue = newLeagueNameEl.value;
  console.log(newLeagueNameValue);
  const formData = new FormData(createNewLeagueEl);
  console.log(formData);
  const formDataEntries = Object.fromEntries(formData);
  console.log(formDataEntries);
  try {
    const res = await fetch("http://localhost:3500/leagues/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataEntries),
    });
    const dataResponseData = await res.json();
    if (!res.ok) {
      console.log(dataResponseData.description);
      return;
    }
    console.log("Created new League Successfully" + dataResponseData);
  } catch (error) {
    console.log(error);
  }
};

const selectLeagueEl = document.querySelector("#leagueSelectOptions");
selectLeagueEl.addEventListener("click", (event) => {
  // event.preventDefault();
  showLeagues();
  console.log("Select Leage Option Clicked");
});

const showLeagues = async () => {
  try {
    const res = await fetch("http://localhost:3500/leagues/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataResponseData = await res.json();
    console.log(dataResponseData);

    if (!res.ok) {
      console.log(dataResponseData.description);
      return;
    }

    // Filter API "leagues" GET's showLeagues Response Data with only Objects with leagueNames
    const filteredLeagueObjects = dataResponseData.filter(
      (object) => object.leagueNames
    );
    console.log(filteredLeagueObjects);

    // Creates an Array of League Option Names from Objects created by filteredLeagueObjects
    const databaseLeagueOptions = [];
    for (i = 0; i < filteredLeagueObjects.length; i++) {
      databaseLeagueOptions.push(filteredLeagueObjects[i].leagueNames);
    }
    console.log(databaseLeagueOptions);

    // Grabs current Select Options from HTML #leagueSelectOptions and creates an array of the Options
    const selectLeagueDropDownIndexedOptions = document.querySelector(
      "#leagueSelectOptions"
    ).options;
    const currentLeageOptions = [];
    for (let i = 0; i < selectLeagueDropDownIndexedOptions.length; i++) {
      const selectOption = selectLeagueDropDownIndexedOptions[i].innerText;
      console.log(selectOption);
      currentLeageOptions.push(selectOption);
    }
    console.log(currentLeageOptions);

    // Uses API Array of League Names and compares to existing Select Options from HTMl #leagueSelectOptions
    const leaguesToAddToOptions = databaseLeagueOptions.filter(
      (string) => !currentLeageOptions.includes(string)
    );
    console.log(leaguesToAddToOptions);

    // Creates 'Options' in HTML #leagueSelectOptions drop down with League names from API "leagues"
    const selectLeagueDropDown = document.querySelector("#leagueSelectOptions");
    const leagueSelectionOptions = () => {
      for (let i = 0; i < leaguesToAddToOptions.length; i++) {
        let option = leaguesToAddToOptions[i];
        let optionEl = document.createElement("option");
        optionEl.textContent = option;
        selectLeagueDropDown.appendChild(optionEl);
      }
      console.log("Added League Option to Drop Down");
    };

    // Checks if leaguesToAddToOptions array is empty, if not then runs function to add league options
    if (leaguesToAddToOptions.length === 0) {
      console.log("No additional Leagues to Add");
    } else {
      leagueSelectionOptions();
    }
  } catch (error) {
    console.log(error);
  }
};
