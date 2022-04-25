function displayTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  time = document.querySelector("#date");
  time.innerHTML = `${day}, ${hour}:${minutes}`;
}

function search(city) {
  let apiKey = "7fbc99e26b128af1fc9815e393cfbb4b";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-3">
        <div class = "day">${day}</div>
          <img 
          src = "http://openweathermap.org/img/wn/02d@2x.png"
          alt = ""
          width = "34"
          />
          <div>
          <span class="temp-forecast">17° | <span class="min-temp">4°</span></div>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemp(response) {
  celsiusTemperature = response.data.main.temp;
  let temp = Math.round(celsiusTemperature);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${temp}`;

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;

  feltTemperature = response.data.main.feels_like;
  let temperatureFelt = document.querySelector("#felt");
  temperatureFelt.innerHTML = `Feels like ${Math.round(feltTemperature)}°C`;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed} m/s`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${response.data.weather[0].description}`);
}

function showCurrentPosition(position) {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
  let apiKey = "7fbc99e26b128af1fc9815e393cfbb4b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(fahrenheitTemp);

  let feltFahrenheitTemp = (feltTemperature * 9) / 5 + 32;
  let felt = document.querySelector("#felt");
  felt.innerHTML = `Feels like ${Math.round(feltFahrenheitTemp)} °F`;

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);

  let felt = document.querySelector("#felt");
  felt.innerHTML = `Feels like ${Math.round(feltTemperature)} °C`;

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

let celsiusTemperature = null;
let feltTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let searchPosition = document.querySelector("#current-position");
searchPosition.addEventListener("click", showCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Berlin");

displayTime();
displayForecast();
