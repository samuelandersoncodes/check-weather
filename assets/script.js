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