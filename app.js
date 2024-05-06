// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key} api call
// 126f6bb1b91f8cb05a1171fda78318fd api key

// SELECT ELEMENTS
const iconelement = document.querySelector(".weather-icon");
const tempelement = document.querySelector(".weather-value p");
const descelement = document.querySelector(".weather-discription p");
const locationelement = document.querySelector(".location p");
const notificationelement = document.querySelector(".notification");

// app data
const weather = {};

weather.temperature = { unit: "celsius" }

// app constants and vars
const kelvin = 273;

// API KEY
const key = "126f6bb1b91f8cb05a1171fda78318fd";

// check whether the browser supportsdeolocations
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setposition, showError);
}

else {
    notificationelement.style.display = 'block';
    notificationelement.innerHTML = "<p>Browser does not support Geolocation</p>"
}

// SET USERS LOCATION
function setposition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude,longitude);
}

// SHOE ERROR WHEN THERE IS ISSUE WITH GEOLOCATION SERVICE
function showError(error) {
    notificationelement.style.display = "block";
    notificationelement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API ROVIDER
function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then((response) => {
		return response.json();
        })
	.then((data) => {
		weather.temperature.value = Math.floor(data.main.temp - kelvin);
		weather.description = data.weather[0].description;
		weather.city = data.name;
		weather.country = data.sys.country;
	})
	.then((ele) => {
		displayWeather();
	})
}

// DISPLAY WEATHER TO UPI
function displayWeather() {
    // iconelement.innerHTML = `<img src ="icon/${weather.iconId}.png"/>`;
    tempelement.innerHTML = `${weather.temperature.value}°<span>C<s/pan>`;
    descelement.innerHTML = weather.description;
    locationelement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C TO F CONVERSION
function cesiustofahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

// WHEN THE YSER CLICKS ON THE TEMPERATURE
tempelement.addEventListener("click", (ele) => {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celsiustofahrenheit(weather.temperature.value);
        fahrenheit = math.floor(fahrenheit);

        tempelement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }

    else {
        tempelement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = 'cesius'
    }
})
