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

        // Inject fetched api data into the above variables' innerhtml
        city.innerHTML = (data.name);
        temp.innerHTML = Math.round(data.main.temp);
        humidity.innerHTML = Math.round(data.main.humidity);
        wind.innerHTML = Math.round(data.wind.speed);
        pressure.innerHTML = Math.round(data.main.pressure);
        description.innerHTML = data.weather[0].description;
        iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        iconElement.setAttribute("alt", data.weather[0].icon);
    }
};

/**
 * Default weather display
 * before user enters a city
 */
function search(city){
    weather.fetchWeather(city);
}
search('Dublin');