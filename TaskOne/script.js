document.getElementById("AgeForm").addEventListener("submit", function (event) {
  event.preventDefault();
  calculateAge();
});

const inputs = document.querySelectorAll("#day, #month, #year");
inputs.forEach((input) => {
  input.addEventListener("input", function () {
    clearErrorMessage();
    if (isDateValid()) {
      calculateAge();
    }
  });
});

function calculateAge() {
  const day = parseInt(document.getElementById("day").value);
  const month = parseInt(document.getElementById("month").value) - 1;
  const year = parseInt(document.getElementById("year").value);

  const today = new Date();
  const birthDate = new Date(year, month, day);

  if (!isDateValid(day, month, year, birthDate)) {
    showErrorMessage("Invalid date entered. Please check your input.");
    return;
  }

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  document.getElementById(
    "result"
  ).textContent = `Your age is ${ageYears} years, ${ageMonths} months, and ${ageDays} days🤪`;
}

function isDateValid(day, month, year, birthDate) {
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return false;
  }
  if (
    month < 0 ||
    month > 11 ||
    day < 1 ||
    day > 31 ||
    year < 1900 ||
    year > new Date().getFullYear()
  ) {
    return false;
  }
  return (
    birthDate &&
    birthDate.getDate() === day &&
    birthDate.getMonth() === month &&
    birthDate.getFullYear() === year
  );
}

function showErrorMessage(message) {
  const errorMessageDiv = document.getElementById("error-message");
  errorMessageDiv.textContent = message;
  errorMessageDiv.classList.remove("hidden");
}

function clearErrorMessage() {
  const errorMessageDiv = document.getElementById("error-message");
  errorMessageDiv.textContent = "";
  errorMessageDiv.classList.add("hidden");
}
