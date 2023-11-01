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
