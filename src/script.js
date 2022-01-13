/*Global variable */
let fahrenheitLink = document.querySelector("#fahrenheit-link");
let celsiusLink = document.querySelector("#celsius-link");
let celsiusTemp = null;

/* Feature 1*/
let currentTime = new Date();
let dateTimeSelector = document.getElementById("dateTime");

function formatDay(date) {
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

dateTimeSelector.innerHTML = formatDay(currentTime);

function daysName(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
/* Forecast*/

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 forecastDay">
        <div class="weather-forecast-date">${daysName(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "7470741e49d4adfb678d9b0f8b991155";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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
  let humidityElement = document.getElementById("humidityElement");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  /* Changes icons according to weather */
  iconToday.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function findCity(city) {
  let apiKey = "7470741e49d4adfb678d9b0f8b991155";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCity);
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
  let temperature = Math.round(celsiusTemp);
  let tempToday = document.getElementById("tempToday");
  let checkConditionToday = response.data.weather[0].main;
  let todayCondition = document.getElementById("todayCondition");
  let currentCity = response.data.name;
  let cityHeader = document.getElementById("currentCity");
  let iconToday = document.getElementById("iconToday");
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind: ${windSpeed} km/h`;
  let humidityElement = document.getElementById("humidityElement");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  tempToday.innerHTML = `${temperature}`;
  todayCondition.innerHTML = `${checkConditionToday}`;
  cityHeader.innerHTML = `${currentCity}`;
  /* Changes icons according to weather */
  iconToday.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function retrievePosition(position) {
  let apiKey = "7470741e49d4adfb678d9b0f8b991155";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
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
