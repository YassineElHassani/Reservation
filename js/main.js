const prevBtn = document.querySelectorAll(".btn-prev");
const nextBtn1 = document.querySelectorAll(".btn-next1");
const nextBtn2 = document.querySelectorAll(".btn-next2");
const choice1 = document.querySelectorAll(".choice1");
const choice2 = document.querySelectorAll(".choice2");
const choice3 = document.querySelectorAll(".choice3");
const choice4 = document.querySelectorAll(".choice4");
const nextBtn4 = document.querySelectorAll(".btn-next4");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let phoneInput = document.getElementById("phone");
let departInput = document.getElementById("depart");
let finishInput = document.getElementById("finish");
let dateInput = document.getElementById("date");
let c1 = document.getElementById("c1");
let c2 = document.getElementById("c2");
let c3 = document.getElementById("c3");
let c4 = document.getElementById("c4");
let place1Input = document.getElementById("place1");
let place2Input = document.getElementById("place2");
let place3Input = document.getElementById("place3");
let place4Input = document.getElementById("place4");
let place5Input = document.getElementById("place5");
let place6Input = document.getElementById("place6");
let place7Input = document.getElementById("place7");
let place8Input = document.getElementById("place8");

let countAdult = document.getElementById("countAdult");
let CountKids = document.getElementById("CountKids");
let countA = 1;
let countK = 1;

let total = document.getElementById("totalPrix");

// countPerson functions
function addCountAdult() {
  if(countA >= 1) {
    countA++;
  } else {
    countAdult.reset();
  }
  countAdult.innerHTML = `${countA}`;
}

function minCountAdult() {
  if(countA <= 1) {
    countAdult.reset();
  } else {
    countA--;
  }
  countAdult.innerHTML = `${countA}`;
}

function addCountKids() {
  if(countK >= 1) {
    countK++;
  } else {
    countKids.reset();
  }
  countKids.innerHTML = `${countK}`;
}

function minCountKids() {
  if(countK <= 1) {
    countKids.reset();
  } else {
    countK--;
  }
  countKids.innerHTML = `${countK}`;
}

let adultPrix = 500 * countA;
let kidsPrix = 100 * countK;


total = adultPrix + kidsPrix;

// console.log("this total: " + total);


// setUp all Next buttons
function getTheInfo() {
  return {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value
  }
}

function getVolsInfo() {
  return {
    depart: departInput.value,
    finish: finishInput.value,
    date: dateInput.value
  }
}

function getThePlaces() {
  return {
    place1: place1Input.value,
    place2: place2Input.value,
    place3: place3Input.value,
    place4: place4Input.value,
    place5: place5Input.value,
    place6: place6Input.value,
    place7: place7Input.value,
    place8: place8Input.value
  }
}

var infoData, volsData, flightData, placesData;

nextBtn1.forEach(btn => {
  btn.addEventListener('click', () => {
    infoData = getTheInfo();
    console.log(infoData);
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  });
});

nextBtn2.forEach(btn => {
  btn.addEventListener('click', () => {
    volsData = getVolsInfo();
    console.log(volsData);
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  });
});

choice1.forEach(btn => {
  btn.addEventListener('click', () => {
    flightData = "flight1";
    console.log(flightData);
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  });
});

choice2.forEach(btn => {
  btn.addEventListener('click', () => {
    flightData = "flight2";
    console.log(flightData);
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  });
});

choice3.forEach(btn => {
  btn.addEventListener('click', () => {
    flightData = "flight3";
    console.log(flightData);
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  });
});

choice4.forEach(btn => {
  btn.addEventListener('click', () => {
    flightData = "flight4";
    console.log(flightData);
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  });
});

nextBtn4.forEach(btn => {
  btn.addEventListener('click', () => {
    placesData = getThePlaces();
    console.log(placesData);
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  });
});

// Prev buttons & task progress

let formStepsNum = 0;

prevBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressBar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressBar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}