/*Global variable */
let fahrenheitLink = document.querySelector("#fahrenheit-link");
let celsiusLink = document.querySelector("#celsius-link");
let celsiusTemp = null;

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

/* Feature to search city and show temp and weather condition*/

function showCity(response) {
  let cityHeader = document.getElementById("currentCity");
  celsiusTemp = response.data.main.temp;
  cityHeader.innerHTML = `${response.data.name}`;
  let tempToday = document.getElementById("tempToday");
  let checkTempToday = Math.round(response.data.main.temp);
  tempToday.innerHTML = `${checkTempToday}`;
  let checkConditionToday = response.data.weather[0].description;
  let todayCondition = document.getElementById("todayCondition");
  todayCondition.innerHTML = `${checkConditionToday}`;
  let iconToday = document.getElementById("iconToday");
  let windElement = document.getElementById("windElement");
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind: ${windSpeed} km/h`;
  /* Changes icons according to weather */
  iconToday.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

/* Feature to get current location and show temp*/

function showCurrentWeather(response) {
  celsiusTemp = response.data.main.temp;
  console.log(celsiusTemp);
  let temperature = Math.round(celsiusTemp);
  let tempToday = document.getElementById("tempToday");
  let checkConditionToday = response.data.weather[0].main;
  let todayCondition = document.getElementById("todayCondition");
  let currentCity = response.data.name;
  let cityHeader = document.getElementById("currentCity");
  let iconToday = document.getElementById("iconToday");
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind: ${windSpeed} km/h`;
  tempToday.innerHTML = `${temperature}`;
  todayCondition.innerHTML = `${checkConditionToday}`;
  cityHeader.innerHTML = `${currentCity}`;
  /* Changes icons according to weather */
  iconToday.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

/* Shows the user London as default*/
findCity("London");

/*Convert temperature to farenheit or celsius, default celsius */

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.getElementById("tempToday");
  console.log(celsiusTemp);
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheitLink.disabled = true;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempToday");
  let temp = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

fahrenheitLink.addEventListener("click", convertToFahrenheit);
celsiusLink.addEventListener("click", convertToCelsius);
