let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

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

h2.innerHTML = `${day} ${hours}:${minutes} ${year}`;

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let key = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${key}`).then(currentWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(currentWeather);
}

function getCurrentLocation(location) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function currentWeather(response) {
  event.preventDefault();
  let description = response.data.weather[0].description;
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `It is currently ${temperature}°C, ${description}, in ${response.data.name}`;
}

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentLocation);
