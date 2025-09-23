function renderSpecialties() {
  const specialties = [
    "Cardiology",
    "General Practice",
    "Nutrition",
    "Neurology",
    "Orthopedics",
  ];

  const options = specialties
    .map((specialty) => `<option value="${specialty}">${specialty}</option>`)
    .join("");

  document.getElementById("specialty").innerHTML = options;
}

function renderMedics() {
  const medics = [
    { specialty: "Nutrition", name: "Dr. Ana" },
    { specialty: "Nutrition", name: "Dr. Carlos" },
    { specialty: "Nutrition", name: "Dr. John" },

    { specialty: "Neurology", name: "Dr. Maria" },
    { specialty: "Neurology", name: "Dr. Peter" },
    { specialty: "Neurology", name: "Dr. Sophia" },

    { specialty: "Orthopedics", name: "Dr. Andrew" },
    { specialty: "Orthopedics", name: "Dr. Gabriel" },
    { specialty: "Orthopedics", name: "Dr. Laura" },

    { specialty: "Cardiology", name: "Dr. Camila" },
    { specialty: "Cardiology", name: "Dr. Lucas" },
    { specialty: "Cardiology", name: "Dr. Rachel" },

    { specialty: "General Practice", name: "Dr. Fernando" },
    { specialty: "General Practice", name: "Dr. Julia" },
    { specialty: "General Practice", name: "Dr. Mark" },
  ].filter(
    (medic) => medic.specialty === document.getElementById("specialty").value
  );

  const options = medics
    .map(
      (medic) =>
        `<option value="${medic.name}">${medic.name} - ${medic.specialty}</option>`
    )
    .join("");

  document.getElementById("doctor").innerHTML = options;
}

function renderAnimals() {
  const animals = [
    "Dog",
    "Rabbit",
    "Cat",
    "Hamster",
    "Bird",
    "Fish",
    "Other",
  ];

  const options = animals
    .map((animal) => `<option value="${animal}">${animal}</option>`)
    .join("");

  document.getElementById("animal-select").innerHTML = options;
}

document.addEventListener("DOMContentLoaded", () => {
  renderAnimals();
  renderSpecialties();
  addOtherAnimalListener();
  addOtherMedicListener();
  renderMedics();
  renderCalendar();
});

function addOtherAnimalListener() {
  const select = document.getElementById("animal-select");
  select.addEventListener("change", (event) => {
    if (event.target.value === "Other") {
      otherAnimal();
    } else {
      const div = document.getElementById("other-animal-div");
      div && div.remove();
    }
  });
}

function addOtherMedicListener() {
  document
    .getElementById("specialty")
    .addEventListener("change", renderMedics);
}

function onSubmit(event) {
  event.preventDefault();

  const clientName = event.target["client-name"].value;
  const telephone = event.target["client-tel"].value;
  const animal = event.target["animal-select"].value;
  const otherAnimal = event.target["other-animal"]?.value;
  const specialty = event.target["specialty"].value;
  const doctor = event.target["doctor"].value;
  const date = event.target["date-query"].value;

  updateLocalStorage({
    clientName,
    telephone,
    animal: animal === "Other" ? otherAnimal : animal,
    specialty,
    doctor,
    date,
  });

  document.getElementById("status").innerText =
    "Appointment booked successfully!";
  event.target.reset();
}

function updateLocalStorage(item) {
  const localStorageData =
    localStorage.getItem("@vetpet:appointments") || "[]";

  const parsed = JSON.parse(localStorageData);

  localStorage.setItem(
    "@vetpet:appointments",
    JSON.stringify([...parsed, item])
  );

  renderCalendar();
}

function getLocalStorage() {
  const localStorageData =
    localStorage.getItem("@vetpet:appointments") || "[]";

  return JSON.parse(localStorageData).map((item) => {
    const date = new Date(item.date);

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return {
      ...item,
      date: date.toLocaleString("en-US", options),
    };
  });
}

function renderCalendar() {
  const dataQuerys = getLocalStorage();

  const sectionData = document.getElementById("specific-query");
  sectionData.innerHTML = "";

  dataQuerys.forEach((item) => {
    const query = document.createElement("div");
    query.classList.add("card-query", "card");
    query.innerHTML = `
      <h4>${item.clientName}</h4>
      <p class="card-query-date"><i class="ph ph-calendar"></i> ${item.date}</p>
      <div class="card-query-body">
        <p><i class="ph ph-paw-print"></i> ${item.animal}</p>
        <p><i class="ph ph-pulse"></i> ${item.specialty}</p>
        <p><i class="ph ph-stethoscope"></i> ${item.doctor}</p>
      </div>
    `;
    sectionData.appendChild(query);
  });
}

function otherAnimal() {
  const animalDiv = document.getElementById("animal-form-group");

  const div = document.createElement("div");
  div.classList.add("custom-form-item");
  div.id = "other-animal-div";

  const label = document.createElement("label");
  label.setAttribute("for", "other-animal");
  label.classList.add("form-label");
  label.innerText = "Which one?";

  const input = document.createElement("input");
  input.type = "text";
  input.required = true;
  input.minLength = 3;
  input.classList.add("form-control");
  input.name = "other-animal";
  input.id = "other-animal";

  div.appendChild(label);
  div.appendChild(input);
  animalDiv.appendChild(div);
}
