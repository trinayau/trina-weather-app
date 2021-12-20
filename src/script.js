/* Feature 1*/
let currentTime = new Date();
let dateTimeSelector = document.getElementById("dateTime");

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

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} ${currentHour}:${currentMinute}`;
  return formattedDate;
}

dateTimeSelector.innerHTML = formatDate(currentTime);

/* Feature 2 + 3*/

function showCity(response) {
  let cityHeader = document.getElementById("currentCity");
  cityHeader.innerHTML = `${response.data.name}`;
  let tempToday = document.getElementById("tempToday");
  let checkTempToday = Math.round(response.data.main.temp);
  tempToday.innerHTML = `${checkTempToday}°C`;
  let checkConditionToday = response.data.weather[0].main;
  let todayCondition = document.getElementById("todayCondition");
  todayCondition.innerHTML = `${checkConditionToday}`;
}

function findCity(city) {
  let apiKey = "7470741e49d4adfb678d9b0f8b991155";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCity);
  console.log(apiUrl);
}

function preventRefresh(event) {
  event.preventDefault();
  let city = document.getElementById("input-city").value;
  city.trim();
  city.replace(" ", "+");
  findCity(city);
}

let form = document.getElementById("search-city-form");
form.addEventListener("submit", preventRefresh);

/* Bonus Feature to get current location and show temp*/

function showCurrentWeather(response) {
  let checkTempToday = Math.round(response.data.main.temp);
  let tempToday = document.getElementById("tempToday");
  let checkConditionToday = response.data.weather[0].main;
  let todayCondition = document.getElementById("todayCondition");
  let currentCity = response.data.name;
  let cityHeader = document.getElementById("currentCity");
  tempToday.innerHTML = `${checkTempToday}°C`;
  todayCondition.innerHTML = `${checkConditionToday}`;
  cityHeader.innerHTML = `${currentCity}`;
}

function retrievePosition(position) {
  let apiKey = "7470741e49d4adfb678d9b0f8b991155";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log(url);
  axios.get(url).then(showCurrentWeather);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let checkLocation = document.getElementById("currentLocation");
checkLocation.addEventListener("click", getLocation);

findCity("London");
