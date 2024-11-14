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

let formStepsNum = 0;

let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let phoneInput = document.getElementById("phone");
let departInput = document.getElementById("depart");
let finishInput = document.getElementById("finish");
let dateInput = document.getElementById("date");
let placeInputs = document.querySelectorAll(".place");

let countAdult = document.getElementById("countAdult");
let countKids = document.getElementById("countKids");
let countA = 0;
let countK = 0;
let total = document.getElementById("totalPrix");

const flightOptions = {
  flight1: {flight: "Royal Air Maroc", tempsDeDepart: "6:30", TempsDArrival: "8:45"},
  flight2: {flight: "Rayanair", tempsDeDepart: "10:00", TempsDArrival: "15:45"},
  flight3: {flight: "Air Arabia", tempsDeDepart: "14:15", TempsDArrival: "20:00"},
  flight4: {flight: "Emirates", tempsDeDepart: "18:00", TempsDArrival: "3:00"},
};

let selectedFlight = {};

document.addEventListener("DOMContentLoaded", function() {
  const dateInput = document.getElementById("date");
  
  const today = new Date().toISOString().split("T")[0];
  
  dateInput.setAttribute("min", today);
});

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

function updateFormSteps() {
  formSteps.forEach((formStep) => {
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

function addCountAdult() {
  if(countA + countK < 16) {
    countA++;
  }
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
  if(countK + countA < 16) {
    countK++;
  }
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

function populateFormData() {
  nameInput.value = placesData.name || "";
  emailInput.value = placesData.email || "";
  phoneInput.value = placesData.phone || "";
  departInput.value = placesData.depart || "";
  finishInput.value = placesData.finish || "";
  dateInput.value = placesData.date || "";
  countAdult.innerHTML = placesData.countAdult || 0;
  countKids.innerHTML = placesData.countKids || 0;
  flightOptions.value = placesData.flightOptions || "";
}

let countPlaces = 0;

function toggleAddingPlaces() {
  const addingPlaces = document.getElementById("addingPlaces");
  
  addingPlaces.style.display = (countPlaces === countA + countK) ? "none" : "flex";
}

placeInputs.forEach((place) => {
  place.addEventListener("click", () => {
    if (place.getAttribute("active") === "true") {
      place.setAttribute(
        "style",
        "border-radius: 5px; width: 50px; height: 50px; font-size: 15pt; color: #2e6c8e; background-color: #a6cde2; border: 3px solid #2e6c8e;"
      );
      place.textContent = "➕";
      place.setAttribute("active", "false");
      countPlaces--;
    } else {
      if (countPlaces < countA + countK) {
        place.setAttribute(
          "style",
          "border-radius: 15px; width: 50px; height: 50px; font-size: 15pt; color: #0ce053; background-color: #a6cde2; border: 3px solid #0ce053;"
        );
        place.textContent = "✅";
        place.setAttribute("active", "true");
        countPlaces++;
      } else {
        alert("You can't select more places!");
      }
    }
    toggleAddingPlaces();
  });
});

function getTickets(ticketData) {
  const ticketSection = document.getElementById("user-info");
  ticketSection.innerHTML = "";
  
  for (let i = 0; i < ticketData.selectedPlaces; i++) {
    const ticketHTML = `
      <div id="ticket-container">
        <div class="top">
            <img src="./assets/airplane.png">
            <p>AirLine</p>
        </div>
        <div class="sec-top">
            <p class="para">Date: ${ticketData.date}</p>
            <p class="para">Flight Company: ${ticketData.flight}</p>
        </div>
        <div class="inside-info">
            <p>Name: ${ticketData.name}</p>
            <p>Email: ${ticketData.email}</p>
            <p>Phone: ${ticketData.phone}</p>
        </div><br>
        <div class="sec-info">
            <p>Départ: ${ticketData.depart}</p>
            <p>Arrivée: ${ticketData.finish}</p>
        </div><br>
        <div class="ter-info">
            <p>${ticketData.tempsDeDepart}</p>
            <p>${ticketData.TempsDArrival}</p>
        </div>
        <div class="bottom">
            <p>BOOKING CODE: <span><b>A1B2C3</b></span></p>
            <p class="total"><b>${ticketData.totalPrix}</b></p>
            <img src="./assets/qr-code.svg">
        </div>
    </div><br><br><br>
    `;

    ticketSection.innerHTML += ticketHTML;
  }

  const style = document.createElement("style");
  style.innerHTML = `
    #ticket-container {
        height: 300px;
        width: 600px;
        background-image: url('./assets/lineVols.png');
        background-position: center;
        border-radius: 30px;
        border: dashed 2px black;
    }
    .top {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #2e6c8e;
        height: 50px;
        width: 600px;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
    }
    .top img {
        height: 40px;
        width: 40px;
    }
    .top p {
        color: #cac8c8;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 40px;
    }
    .sec-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        width: 600px;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        z-index: 1;
    }
    .sec-top .para {
        padding: 10px;
        color: black;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .inside-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-left: 10px;
        padding-right: 10px;
        flex-wrap: wrap;
        color: black;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .sec-info {
        display: flex;
        justify-content: space-between;
        padding-left: 10px;
        padding-right: 10px;
        color: black;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .ter-info {
        display: flex;
        justify-content: space-between;
        padding-left: 10px;
        padding-right: 10px;
        color: black;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #2e6c8e;
        height: 50px;
        width: 600px;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        margin-top: 24px;
    }
    .bottom p {
        color: #FFF;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        margin-left: 20px;
    }
    .bottom p span {
        font-size: 20px;
    }
    .bottom .total {
        color: red;
        font-size: large;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .bottom img {
        height: 50px;
        width: 50px;
        margin-right: 20px;
    }
  `;
  document.head.appendChild(style);
}


function getData() {
  return {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    depart: departInput.value,
    finish: finishInput.value,
    date: dateInput.value,
    countAdult: countA,
    countKids: countK,
    totalPrix: total.innerHTML,
    selectedPlaces: countPlaces,
  };
}

nextBtn1.forEach((btn) => {
  btn.addEventListener("click", () => {
    if(nameInput.value != "" && emailInput.value != "" && phoneInput.value != "") {
      formStepsNum++;
      updateFormSteps();
      updateProgressBar();
    } else {
      alert("Please fill all the info!!");
    }
  });
});

nextBtn2.forEach((btn) => {
  btn.addEventListener("click", () => {
    if(departInput.value != "" && finishInput.value != "" && dateInput.value != "") {
      formStepsNum++;
      updateFormSteps();
      updateProgressBar();
    } else {
      alert("Please fill all the info!!");
    }
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
    getTickets(placesData);
    console.log(placesData);
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  });
});

document.getElementById("download-btn").addEventListener("click", () => {
  const ticketSection = document.getElementById("user-info");
  
  const options = {
    margin: 10,
    filename: 'Flight_Tickets.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(options).from(ticketSection).save();
});
