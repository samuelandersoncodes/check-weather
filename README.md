# Check Weather

> Check Weather is a web application that enables users all over the world to check the current weather of a perticular city by typing the name of the city and clicking on search.

> The web application by default provides users with a five-day weekly forecast of weather codition, wind speed, maximum and minimum temperatures in the lower section.
This forecast starts right from the current day. Thus, unless a user is looking for a different city's current weather, he or she can easily find the weather in his or her city without a search.
View the live web application [here] (https://samuelandersoncodes.github.io/check-weather/) 

![mockup](docs/readme_images/weather_app_mockup.jpg)

## Features

### Existing Features

* Main heading
    * The web application has a clear responsive heading with an icon on the topmost part.
    * This informs the user about the exact use and interactiveness of the application. Thus, to check for a city's current weather. 

![Main heading](docs/readme_images/main_heading.jpg)   

* Input field
    * The input field of the web application allows users to type in a city they want to search.
    * This field is validated and therefore cannot be submitted empty or with an inappropriate data.
    * It has a placeholder text that further informs the user exactly where and what to type in.
    * It also features a hover effect that tells the user beforehand that they are on the field.

![Input field](docs/readme_images/input_field.jpg)

* Search button
    * The web application features a search button that allows users to submit the typed in city in order for them to get the weather of that city displayed.

![Search button](docs/readme_images/search_button.jpg)

* Current weather display section
    * This section of the application displays the typed in city, the current date and its corresponding weather description, weather description icon, temperature, pressure, humidity, and wind speed.
    * In order not to display emptyness or unreal data, it is by default set to the city of Dublin and will change whenever another city is keyed in.

![Current weather display section](docs/readme_images/current_weather_display.jpg)

* Temperature unit conversion 
    * This part of the web application allows the user to convert temperature units from the defaut celsius unit to fahrenheit and vice versa just by clicking on the desired unit.
    * This helps the user to save the time of trying to manually convert units.

![Temperature unit conversion](docs/readme_images/temperature_unit_conversion.jpg)

* Weekly weather forecast section
    * This section has a self-explanatory heading that tells the user clearly that the displayed forecast is only the forecast of their current location.
    * This part of the application displays a five-day consistent weekly weather forecast (starting from the current day) based on the location of the user.
    * The forecast consists of the day of the week, its weather description icon, wind speed,maximum and minimum temperature.
    * The weekly forecast uses geolocation and therefore needs the user to grant location access before they can get the feed. Thus, if users location is off, the app will ask for location access permission first. If access is granted, the forecast section displays alongside the current weather section and vice versa.   

![Weekly weather forecast section](docs/readme_images/weekly_weather_forecast.jpg)

### Features Left to Implement

* As a future enhancement, the city input field will be connected to the weekly weather forecast section so that users can look for other citys' forecast as well. It will be considered to also add two more forecast days adding up to seven instead of just five days.



 