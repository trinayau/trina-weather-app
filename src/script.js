/* Add real time date to app*/
let currentTime = new Date();
let dateTimeSelector = document.getElementById("currentDateTime");

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} ${currentHour}:${currentMinute}`;
  return formattedDate;
}

dateTimeSelector.innerHTML = formatDate(currentTime);

/* Feature to change city header into searched header */

function showCity() {
  let userInput = document.getElementById("input-city").value;
  let cityHeader = document.getElementById("currentCity");
  cityHeader.innerHTML = userInput;
}

function preventRefresh(event) {
  event.preventDefault();
  showCity();
}

let form = document.getElementById("search-city-form");
form.addEventListener("submit", preventRefresh);
