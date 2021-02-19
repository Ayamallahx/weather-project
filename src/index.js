let now = new Date();

let date = now.getDate();
let hours = now.getHours();
let year = now.getFullYear();

let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
  }

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12"
];
let month = months[now.getMonth()];

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${date}/${month}/${year}`;
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hours}:${minutes}`;


function switchToF(event) {
  event.preventDefault();
  let celcius = document.querySelector(".celcius-temp");
  console.log(celcius)
  let farenheitNumber = celcius.innerHTML * (9/5) + 32;
  let farenheit = document.querySelector(".farenheit-temp");
  farenheit.innerHTML = Math.round(farenheitNumber);
}
let farenheitConvert = document.querySelector("#farenheit-change");
farenheitConvert.addEventListener("click", switchToF);

function switchtoC(event) {
 event.preventDefault();
 let farenheit = document.querySelector(".farenheit-temp");

if (farenheit.value !== undefined) {
 let celciusNumber = (farenheit.innerHTML- 32) * (5/9);
 let celcius = document.querySelector(".celcius-temp");
 celcius.innerHTML = Math.round(celciusNumber);
}
}
let celciusConvert = document.querySelector("#celcius-change");
celciusConvert.addEventListener("click", switchtoC);


function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = `${cityInput.value}`;

  let apiKey = "4c4b730fc952d2218d8c25bb1938764c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);

  let farenheit = document.querySelector(".farenheit-temp");
  farenheit.innerHTML = null;
}
let buttonClick = document.querySelector("#go-button");
buttonClick.addEventListener("click", showCity);


function showPosition(position) {
  let apiKey = "4c4b730fc952d2218d8c25bb1938764c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector('#location-button');
locationButton.addEventListener('click', getCurrentPosition)

function displayWeather(weather){
  let currentTemperature = Math.round(weather.data.main.temp);
  let location = weather.data.name;
  let humid = weather.data.main.humidity;
  let wind = weather.data.wind.speed;

  let tempDisplay = document.querySelector(".celcius-temp");
  tempDisplay.innerHTML = currentTemperature;

  let locationDisplay = document.querySelector("#city");
  locationDisplay.innerHTML = location;

  let humidDisplay = document.querySelector("#humid");
  humidDisplay.innerHTML = `Humidity: ${humid}%`;

  let windDisplay = document.querySelector("#wind");
  windDisplay.innerHTML =  `Wind: ${wind}km/h`;
}