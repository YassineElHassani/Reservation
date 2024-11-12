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
placeInputs.forEach((place) => {
  place.addEventListener("click", () => {
    if (place.getAttribute("active") === "true") {
      place.setAttribute("style", "border-radius: 5px; width: 50px; height: 50px; font-size: 15pt; color: #2e6c8e; background-color: #a6cde2; border: 3px solid #2e6c8e;");
      place.textContent = "➕";
      place.setAttribute("active", "false");
      countPlaces--;
    } else {
      if (countPlaces < countA + countK) {
        place.setAttribute("style", "border-radius: 15px; width: 50px; height: 50px; font-size: 15pt; color: #0ce053; background-color: #a6cde2; border: 3px solid #0ce053;");
        place.textContent = "✅";
        place.setAttribute("active", "true");
        countPlaces++;
      } else {
        alert("You can't select more places!");
      }
    }
  });
});

function getTickets(ticketData) {
  const ticketSection = document.getElementById("user-info");
  ticketSection.innerHTML = "";
  
  for (let i = 0; i < ticketData.selectedPlaces; i++) {
    const ticketHTML = `
      <div class="ticket-container">
        <div class="ticket-header">
          <img src="./assets/airplane.png" alt="Airline Logo" class="ticket-logo">
          <h2>Flight Ticket</h2>
          <p>Booking Code: <span class="booking-code">A1B2C3</span></p>
        </div>
        <table class="ticket-table">
          <tr>
            <th>Nom et prénom</th>
            <td>${ticketData.name}</td>
          </tr>
          <tr>
            <th>E-mail</th>
            <td>${ticketData.email}</td>
          </tr>
          <tr>
            <th>Téléphone</th>
            <td>${ticketData.phone}</td>
          </tr>
          <tr>
            <th>Gare de départ</th>
            <td>${ticketData.depart}</td>
          </tr>
          <tr>
            <th>Gare d'arrivée</th>
            <td>${ticketData.finish}</td>
          </tr>
          <tr>
            <th>Compagnie aérienne</th>
            <td>${ticketData.flight}</td>
          </tr>
          <tr>
            <th>Date de réservation</th>
            <td>${ticketData.date}</td>
          </tr>
          <tr>
            <th>Heure de départ</th>
            <td>${ticketData.tempsDeDepart}</td>
          </tr>
          <tr>
            <th>Heure d'arrivée</th>
            <td>${ticketData.TempsDArrival}</td>
          </tr>
          <tr>
            <th>Prix total</th>
            <td>${ticketData.totalPrix}</td>
          </tr>
        </table>
        <div class="ticket-footer">
          <div class="qr-code">
            <img height="150px" width="150px" src="./assets/qr-code.svg"/>
          </div>
        </div>
      </div>
    `;

    ticketSection.innerHTML += ticketHTML;
  }

  const style = document.createElement("style");
  style.innerHTML = `
    .ticket-container {
      max-width: 500px;
      margin: 20px auto;
      padding: 20px;
      border: 2px solid #333;
      border-radius: 10px;
      font-family: Arial, sans-serif;
      background-color: #f7f7f7;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .ticket-header {
      text-align: center;
      margin-bottom: 20px;
    }
    .ticket-logo {
      width: 50px;
      margin-bottom: 10px;
    }
    .ticket-header h2 {
      font-size: 20px;
      margin: 0;
    }
    .booking-code {
      font-weight: bold;
      color: #333;
    }
    .ticket-table {
      width: 100%;
      border-collapse: collapse;
    }
    .ticket-table th, .ticket-table td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
      font-size: 14px;
    }
    .ticket-table th {
      background-color: #e9ecef;
      font-weight: bold;
    }
    .ticket-footer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #555;
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
