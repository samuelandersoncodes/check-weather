/**
 * Displayed date on the app
 * Gets and formats days, months and year 
 */
function formatDate(date) {
  // Puts days in an array for chronological update
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  // Puts months in an array for chronological update
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
    "December"
  ];

  // Gets days, months and year stored in variables
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentYear = date.getFullYear();
  let currentDate = date.getDate();

  // Formats the chronology of date elements
  let formattedDate = `${currentDay} ${currentMonth} ${currentDate}, ${currentYear}`;
  return formattedDate;
}

// Injects formatted current date into the date placeholder
let date = new Date();
let dateElement = document.getElementById("date-placeholder");
dateElement.innerHTML = formatDate(date);

/**
 * Calls api data from the fetchWeather method for event listening
 * when user enters a city
 */
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.getElementById("city-input");
  weather.fetchWeather(cityInput.value);
}

// Event listener for the above function
let inputField = document.getElementById("input-field");
inputField.addEventListener("submit", handleSubmit);

/**
 * With the fetch method
 * Gets weather from the openweathermap api
 */
let weather = {
  apiKey: "dd9de2db37b425827a3d32ecdc9508d4",
  fetchWeather: function (city) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
      )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  /**
   * Weather elements
   * Displays fetchted data onto the app 
   */
  displayWeather: function (data) {
    // Get and store HTML elements into variables
    let city = document.getElementById("city-placeholder")
    let temp = document.getElementById("temperature");
    let humidity = document.getElementById("humidity");
    let wind = document.getElementById("wind");
    let pressure = document.getElementById("pressure");
    let description = document.getElementById("weather-description");
    let iconElement = document.getElementById("icon");
    let dateElement = document.getElementById("date-placeholder");

    // Inject fetched api data into the above variables' innerhtml
    city.innerHTML = (data.name);
    temp.innerHTML = Math.round(data.main.temp);
    humidity.innerHTML = Math.round(data.main.humidity);
    wind.innerHTML = Math.round(data.wind.speed);
    pressure.innerHTML = Math.round(data.main.pressure);
    description.innerHTML = data.weather[0].description;
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", data.weather[0].icon);
    dateElement.innerHTML = formatDate(data.dt * 1000);
  }
};

/**
 * Default weather display
 * before user enters a city
 */
function search(city) {
  weather.fetchWeather(city);
}
search('Dublin');

/**
 * Breaks out latitude and longitude coordinates
 * once it gets the location from the geolocation API
 * and parses it to the getForecast function 
 */
let gotPosition = function (pos) {
  let lat = pos.coords.latitude;
  let lon = pos.coords.longitude;
  getForecast(lat, lon);
}

/**
 * Recieves the above coordinates into the openweathermap API url 
 * parses it to the getWeatherText async function
 */
let getForecast = function (lat, lon) {
  let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=dd9de2db37b425827a3d32ecdc9508d4`
  getWeatherText(url);
}

/**
 * Fetches the openweathermap api data asyncronously
 * and parses it to the parseWeather function 
 */
async function getWeatherText(url) {
  let weatherObject = await fetch(url);
  let weatherText = await weatherObject.text();
  parseWeather(weatherText);
}

/**
 * Converts parsed data into JSON
 * stores it in the dailyForecast variable 
 * and loops through it 
 * extracting the needed data into variables 
 * and parsed into the displayWeatherDay fuction
 */
let parseWeather = function (weatherText) {

  // Converts data into json
  let weatherJSON = JSON.parse(weatherText);

  // Stores needed json data
  let dailyForecast = weatherJSON.list;

  // Loops through daily forecast data
  for (i = 0; i < dailyForecast.length; i++) {
    let day = dailyForecast[i]
    let today = new Date().getDay() + i;
    if (today > 6) {
      today -= 7;
      break;
    }

    // Specific json data stored into variables
    let dayOfWeek = getDayOfWeek(today);
    let description = day.weather[0].description;
    let icon = day.weather[0].icon;
    let highTemp = kelvinToCelsius(day.main.temp_max);
    let lowTemp = kelvinToCelsius(day.main.temp_min);
    let windSpeed = day.wind.speed;

    displayWeatherDay(dayOfWeek, description, icon, highTemp, lowTemp, windSpeed);
  }
}

/**
 * Displayed daily weather forecast elements 
 * Injects the various specific data into the HTML dynamically
 */
let displayWeatherDay = function (dayOfWeek, description, icon, highTemp, lowTemp, windSpeed) {
  let out = "<div class='weatherDay'><img src='https://openweathermap.org/img/wn/" + icon + ".png'/>";
  out += "<h2>" + dayOfWeek + "</h2>";
  out += "<h3>" + description + "</h3>";
  out += "<p>High Temperature: " + highTemp + "°C" + "</p>";
  out += "<p>Low Temperature: " + lowTemp + "°C" + "</p>";
  out += "<p>Wind speed: " + Math.round(windSpeed) + "km/h" + "</p></div>";
  document.getElementById("forecast").innerHTML += out;
}

/**
 * An array for the chronological loop through the days of the week
 */
let getDayOfWeek = function (dayNum) {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  return (weekday[dayNum]);
}

/**
 *  Converts kelvin min and max temperatures into celsius
 */
let kelvinToCelsius = function (kelvinTemp) {
  const celsius = kelvinTemp - 273;
  return Math.round(celsius)
}

/* 
Uses the geolocation library to run the getCurrentPosition method
And calls the gotPosition function when position is available
*/
navigator.geolocation.getCurrentPosition(gotPosition);