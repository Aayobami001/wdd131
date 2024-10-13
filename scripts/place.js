// Get the current year and display it in the footer
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Get the last modified date and display it in the footer
const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = "Last Modification: " + lastModified;

// Static values for temperature and wind speed (in °C and km/h)
const temperature = 10; // degrees Celsius
const windSpeed = 5; // km/h

// Function to calculate wind chill factor in Celsius
function calculateWindChill(temp, wind) {
    // Wind chill formula in Celsius: 
    // 13.12 + 0.6215T - 11.37V^0.16 + 0.3965TV^0.16
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)).toFixed(2);
}

// Function to check if wind chill calculation is viable
function displayWindChill() {
    const windChillElement = document.getElementById('wind-chill');
    if (temperature <= 10 && windSpeed > 4.8) {
        // Viable for wind chill calculation
        const windChill = calculateWindChill(temperature, windSpeed);
        windChillElement.textContent = `${windChill} °C`;
    } else {
        // Conditions not met, display "N/A"
        windChillElement.textContent = 'N/A';
    }
}

// Execute when the page loads
window.onload = displayWindChill;