const prevBtn = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
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
let place1Input = document.getElementById("place1");
let place2Input = document.getElementById("place2");
let place3Input = document.getElementById("place3");
let place4Input = document.getElementById("place4");
let place5Input = document.getElementById("place5");
let place6Input = document.getElementById("place6");
let place7Input = document.getElementById("place7");
let place8Input = document.getElementById("place8");

let countAdult = document.getElementById("countAdult");
let countKids = document.getElementById("countKids");
let countA = 0;
let countK = 0;

let total = document.getElementById("totalPrix");

// Prev buttons & task progress
let formStepsNum = 0;

// Populate initial flight data
const flightOptions = {
  flight1: { flight: "Royal Air Maroc", tempsDeDepart: "6:30", TempsDArrival: "8:45" },
  flight2: { flight: "Rayanair", tempsDeDepart: "10:00", TempsDArrival: "15:45" },
  flight3: { flight: "Air Arabia", tempsDeDepart: "14:15", TempsDArrival: "20:00" },
  flight4: { flight: "Emirates", tempsDeDepart: "18:00", TempsDArrival: "3:00" },
};
let selectedFlight = {};

// Function to go to previous step
prevBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (formStepsNum > 0) {
      formStepsNum--;
    }
    updateFormSteps();
    updateProgressBar();
    populateFormData();
  });
});

// Function to update the active form step
function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.remove("form-step-active");
  });
  formSteps[formStepsNum].classList.add("form-step-active");
}

// Function to update the progress bar
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

// Count person functions
function addCountAdult() {
  countA++;
  countAdult.innerHTML = `${countA}`;
  updateTotal();
}

function minCountAdult() {
  if (countA > 0) {
    countA--;
  }
  countAdult.innerHTML = `${countA}`;
  updateTotal();
}

function addCountKids() {
  countK++;
  countKids.innerHTML = `${countK}`;
  updateTotal();
}

function minCountKids() {
  if (countK > 0) {
    countK--;
  }
  countKids.innerHTML = `${countK}`;
  updateTotal();
}

function updateTotal() {
  let adultPrix = 500 * countA;
  let kidsPrix = 100 * countK;
  total.innerHTML = `Total: ${adultPrix + kidsPrix} MAD`;
}

// Populate form data when going back to a previous step
function populateFormData() {
  nameInput.value = placesData.name || "";
  emailInput.value = placesData.email || "";
  phoneInput.value = placesData.phone || "";
  departInput.value = placesData.depart || "";
  finishInput.value = placesData.finish || "";
  dateInput.value = placesData.date || "";
  place1Input.value = placesData.place1 || "";
  place2Input.value = placesData.place2 || "";
  place3Input.value = placesData.place3 || "";
  place4Input.value = placesData.place4 || "";
  place5Input.value = placesData.place5 || "";
  place6Input.value = placesData.place6 || "";
  place7Input.value = placesData.place7 || "";
  place8Input.value = placesData.place8 || "";
  countAdult.innerHTML = placesData.countAdult || 0;
  countKids.innerHTML = placesData.countKids || 0;
  flightOptions.value = placesData.flightOptions || "";
}

// Save and retrieve the form data for places
function getData() {
  return {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    depart: departInput.value,
    finish: finishInput.value,
    date: dateInput.value,
    place1: place1Input.value,
    place2: place2Input.value,
    place3: place3Input.value,
    place4: place4Input.value,
    place5: place5Input.value,
    place6: place6Input.value,
    place7: place7Input.value,
    place8: place8Input.value,
    countAdult: countA,
    countKids: countK,
    totalPrix: total.innerHTML,
  };
}

// Handling next buttons to progress to the next step
nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  });
});

choice1.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedFlight = flightOptions.flight1;
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  });
});

choice2.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedFlight = flightOptions.flight2;
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  });
});

choice3.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedFlight = flightOptions.flight3;
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  });
});

choice4.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedFlight = flightOptions.flight4;
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  });
});

nextBtn4.forEach((btn) => {
  btn.addEventListener("click", () => {
    placesData = {...selectedFlight, ...getData()};
    console.log(placesData);
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  });
});
