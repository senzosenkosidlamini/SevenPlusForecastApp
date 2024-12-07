function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `img src= "${response.condition.icon_url}" class="weather-app-icon"/>`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours} :${minutes}`;
}

function searchCity(city) {
  let apiKey = "f453aef40oa9243878d838b26aet3b6c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#weather-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  let forecastHtml = " ";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `    <div class="weather-forecast-day">
        <div class="weather-forecast-date">Wednesday</div>
        <div class="weather-forecast-icon">⛈</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature"><strong>20°c</strong></div>
          <div class="weather-forecast-temperature">10°c</div>
        </div>
      </div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let weatherFormElement = document.querySelector("#weatherForm");
weatherFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Boksburg");
displayForecast();
