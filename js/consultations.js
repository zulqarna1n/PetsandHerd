// Doctor list with WhatsApp numbers
const medics = [
  { specialty: "Surgeon", name: "Dr. Ahmed", phone: "923159239893" },
  { specialty: "Surgeon", name: "Dr. Sara", phone: "923002222222" },
  { specialty: "General Practitioner", name: "Dr. Ali", phone: "923139697188" },
  { specialty: "Nutritionist", name: "Dr. Fatima", phone: "923004444444" },
  { specialty: "Neurology", name: "Dr. Kamran", phone: "923005555555" },
  { specialty: "Orthopedics", name: "Dr. Zain", phone: "923006666666" }
];

function renderSpecialties() {
  const specialties = [...new Set(medics.map(m => m.specialty))];
  const options = specialties.map(s => `<option value="${s}">${s}</option>`).join("");
  document.getElementById("specialty").innerHTML = options;
}

function renderMedics() {
  const selected = document.getElementById("specialty").value;
  const filtered = medics.filter(m => m.specialty === selected);
  const options = filtered.map(m => `<option value="${m.phone}">${m.name} - ${m.specialty}</option>`).join("");
  document.getElementById("doctor").innerHTML = options;
}

function renderAnimals() {
  const animals = ["Dog", "Cat", "Rabbit", "Bird", "Fish", "Hamster", "Other"];
  const options = animals.map(a => `<option value="${a}">${a}</option>`).join("");
  document.getElementById("animal-select").innerHTML = options;
}

document.addEventListener("DOMContentLoaded", () => {
  renderAnimals();
  renderSpecialties();
  renderMedics();
  document.getElementById("specialty").addEventListener("change", renderMedics);
});

function onSubmit(event) {
  event.preventDefault();

  const clientName = event.target["client-name"].value;
  const telephone = event.target["client-tel"].value;
  const animal = event.target["animal-select"].value;
  const specialty = event.target["specialty"].value;
  const doctorPhone = event.target["doctor"].value;
  const doctorName = document.querySelector("#doctor option:checked").text;
  const date = event.target["date-query"].value;

  const message = `📋 New Appointment Request:
👤 Client: ${clientName}
📞 Phone: ${telephone}
🐾 Animal: ${animal}
🩺 Specialty: ${specialty}
👨‍⚕️ Doctor: ${doctorName}
📅 Date: ${date}`;

  const whatsappUrl = `https://wa.me/${doctorPhone}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");

  document.getElementById("status").innerText = "Your request was sent via WhatsApp!";
  event.target.reset();
}
