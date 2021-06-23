

// Main Weather Display //


const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const dateElement = document.querySelector(".date p");

const weather = {};

weather.temperature = {
    unit : "celsius"
}


// Search-Bar for searching //


const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

const searchPress = document.querySelector(".glass");
searchPress.addEventListener('click', function(){
	getResults(searchbox.value);
	getForecastLocation(searchbox.value);
});

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
	getForecastLocation(searchbox.value);
  }
}


// Function for Displaying Weather //


function displayWeather(){
	iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
	tempElement.innerHTML = `${weather.temperature.value} ° <span>C</span>`;
	descElement.innerHTML = weather.description;
	locationElement.innerHTML = `${weather.city}, ${weather.country}`;
	
	let now = new Date();
	let date = dateElement;
	date.innerText = dateBuilder(now);
}


// To be used in the displayWeather Function //


function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}


// Converting Celsius to Fahrenheight //


function celsiusToFahrenheit(temperature){
	return (temperature * 9/5) + 32;
}

tempElement.addEventListener("click", function(){
	
	if(weather.temperature.value === undefined) return;
	
	if(weather.temperature.unit === "celsius"){
		
		let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
		
		fahrenheit = Math.floor(fahrenheit);
		
		tempElement.innerHTML = `${fahrenheit} ° <span>F</span>`;
		
		weather.temperature.unit = "fahrenheit";
		
	} else {
		
		tempElement.innerHTML = `${weather.temperature.value} ° <span>C</span>`;
		
		weather.temperature.unit = "celsius";
		
	}
	
})


// Getting Users Location //

							 
if (navigator.geolocation) {
 
	navigator.geolocation.getCurrentPosition(getPosition, showError);
	
} else {

	notificationElement.style.display = "block";
 	notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>";
 
}

function getPosition(position){
	
	let latitude = position.coords.latitude;
	
	let longitude = position.coords.longitude;
	
	getWeather(latitude, longitude);
	
	getForecast(latitude, longitude);
	
}

function showError(error) {
  
	notificationElement.style.display = "block";
	
	notification.innerHTML = `<p> ${error.message} </p>`;
}

const KELVIN = 273;
const key = "18210166d858949db9d1f289b320bc8c";

function getWeather(latitude, longitude){
	
	let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
	
	fetch(api).then(function(response){
		
		let data = response.json();
		
		return data;
		
	}).then(function(data){
		
		weather.temperature.value = Math.floor(data.main.temp - KELVIN);
		
		weather.description = data.weather[0].description;
		
		weather.iconId = data.weather[0].icon;
		
		weather.city = data.name;
		
		weather.country = data.sys.country;
		
	}).then(function(){
		
		displayWeather();
		
	});
	
}

function getResults(query){
	
	let api = `http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${key}`;
	
	fetch(api).then(function(response){
		
		let data = response.json();
		
		return data;
		
	}).then(function(data){
		
		weather.temperature.value = Math.floor(data.main.temp - KELVIN);
		
		weather.description = data.weather[0].description;
		
		weather.iconId = data.weather[0].icon;
		
		weather.city = data.name;
		
		weather.country = data.sys.country;
		
	}).then(function(){
		
		displayWeather();
		
	});
	
}


// Forecast Weather //


// Day One //


const tempForecastElementOne = document.querySelector(".temperature-value-forecast-one p");
const descForecastElementOne = document.querySelector(".temperature-description-forecast-one p");
const dayElementOne = document.querySelector(".days-one p");
const iconElementForecastOne = document.querySelector(".weather-icon-one");


// Day Two //


const tempForecastElementTwo = document.querySelector(".temperature-value-forecast-two p");
const descForecastElementTwo = document.querySelector(".temperature-description-forecast-two p");
const dayElementTwo = document.querySelector(".days-two p");
const iconElementForecastTwo = document.querySelector(".weather-icon-two");


// Day Three //


const tempForecastElementThree = document.querySelector(".temperature-value-forecast-three p");
const descForecastElementThree = document.querySelector(".temperature-description-forecast-three p");
const dayElementThree = document.querySelector(".days-three p");
const iconElementForecastThree = document.querySelector(".weather-icon-three");


// Day Four //


const tempForecastElementFour = document.querySelector(".temperature-value-forecast-four p");
const descForecastElementFour = document.querySelector(".temperature-description-forecast-four p");
const dayElementFour = document.querySelector(".days-four p");
const iconElementForecastFour = document.querySelector(".weather-icon-four");


// Day Five //


const tempForecastElementFive = document.querySelector(".temperature-value-forecast-five p");
const descForecastElementFive = document.querySelector(".temperature-description-forecast-five p");
const dayElementFive = document.querySelector(".days-five p");
const iconElementForecastFive = document.querySelector(".weather-icon-five");


// Day One //


function displayForecastOne(){
	iconElementForecastOne.innerHTML = `<img src="icons/${weather.iconIdOne}.png"/>`;
	tempForecastElementOne.innerHTML = `${weather.temperatureOne} ° <span>C</span>`;
	descForecastElementOne.innerHTML = weather.descriptionOne;
	
	let now = new Date();
	let date = dayElementOne;
	const tomorrow = new Date(now);
  	tomorrow.setDate(tomorrow.getDate() + 1);
	date.innerText = dayBuilder(tomorrow);
}


// Day Two //


function displayForecastTwo(){
	iconElementForecastTwo.innerHTML = `<img src="icons/${weather.iconIdTwo}.png"/>`;
	tempForecastElementTwo.innerHTML = `${weather.temperatureTwo} ° <span>C</span>`;
	descForecastElementTwo.innerHTML = weather.descriptionTwo;
	
	let now = new Date();
	let date = dayElementTwo;
	const tomorrow = new Date(now);
  	tomorrow.setDate(tomorrow.getDate() + 2);
	date.innerText = dayBuilder(tomorrow);
}


// Day Three //


function displayForecastThree(){
	iconElementForecastThree.innerHTML = `<img src="icons/${weather.iconIdThree}.png"/>`;
	tempForecastElementThree.innerHTML = `${weather.temperatureThree} ° <span>C</span>`;
	descForecastElementThree.innerHTML = weather.descriptionThree;
	
	let now = new Date();
	let date = dayElementThree;
	const tomorrow = new Date(now);
  	tomorrow.setDate(tomorrow.getDate() + 3);
	date.innerText = dayBuilder(tomorrow);
}


// Day Four //


function displayForecastFour(){
	iconElementForecastFour.innerHTML = `<img src="icons/${weather.iconIdFour}.png"/>`;
	tempForecastElementFour.innerHTML = `${weather.temperatureFour} ° <span>C</span>`;
	descForecastElementFour.innerHTML = weather.descriptionFour;
	
	let now = new Date();
	let date = dayElementFour;
	const tomorrow = new Date(now);
  	tomorrow.setDate(tomorrow.getDate() + 4);
	date.innerText = dayBuilder(tomorrow);
}


// Day Five //


function displayForecastFive(){
	iconElementForecastFive.innerHTML = `<img src="icons/${weather.iconIdFive}.png"/>`;
	tempForecastElementFive.innerHTML = `${weather.temperatureFive} ° <span>C</span>`;
	descForecastElementFive.innerHTML = weather.descriptionFive;
	
	let now = new Date();
	let date = dayElementFive;
	const tomorrow = new Date(now);
  	tomorrow.setDate(tomorrow.getDate() + 5);
	date.innerText = dayBuilder(tomorrow);
}


function dayBuilder (d) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
	
  return `${day}`;
}


// Forecast based on Latitude and Longitude //


function getForecast(latitude, longitude){
	
	let api = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${key}`;
	
	fetch(api).then(function(response){
		
		let data = response.json();
		
		return data;
		
	}).then(function(data){
		
		// Day One //
	
		weather.temperatureOne = Math.floor(data.list[7].main.temp - KELVIN);
		
		weather.descriptionOne = data.list[7].weather[0].description;
		
		weather.iconIdOne = data.list[7].weather[0].icon;
		
		// Day Two //
		
		weather.temperatureTwo = Math.floor(data.list[15].main.temp - KELVIN);
		
		weather.descriptionTwo = data.list[15].weather[0].description;
		
		weather.iconIdTwo = data.list[15].weather[0].icon;
		
		// Day Three //
		
		weather.temperatureThree = Math.floor(data.list[23].main.temp - KELVIN);
		
		weather.descriptionThree = data.list[23].weather[0].description;
		
		weather.iconIdThree = data.list[23].weather[0].icon;
		
		// Day Four //
		
		weather.temperatureFour = Math.floor(data.list[31].main.temp - KELVIN);
		
		weather.descriptionFour = data.list[31].weather[0].description;
		
		weather.iconIdFour = data.list[31].weather[0].icon;
		
		// Day Three //
		
		weather.temperatureFive = Math.floor(data.list[39].main.temp - KELVIN);
		
		weather.descriptionFive = data.list[39].weather[0].description;
		
		weather.iconIdFive = data.list[39].weather[0].icon;
		
		
	}).then(function(){
		
		displayForecastOne();
		
		displayForecastTwo();
		
		displayForecastThree();
		
		displayForecastFour();
		
		displayForecastFive();
		
	});
	
}


// Forecast based on Search //


function getForecastLocation(query){
	
	let api = `http://api.openweathermap.org/data/2.5/forecast?q=${query}&APPID=${key}`;
	
	fetch(api).then(function(response){
		
		let data = response.json();
		
		return data;
		
	}).then(function(data){
		
		// Day One //
		
		weather.temperatureOne = Math.floor(data.list[7].main.temp - KELVIN);
		
		weather.descriptionOne = data.list[7].weather[0].description;
		
		weather.iconIdOne = data.list[7].weather[0].icon;
		
		// Day Two //
		
		weather.temperatureTwo = Math.floor(data.list[15].main.temp - KELVIN);
		
		weather.descriptionTwo = data.list[15].weather[0].description;
		
		weather.iconIdTwo = data.list[15].weather[0].icon;
		
		// Day Three //
		
		weather.temperatureThree = Math.floor(data.list[23].main.temp - KELVIN);
		
		weather.descriptionThree = data.list[23].weather[0].description;
		
		weather.iconIdThree = data.list[23].weather[0].icon;
		
		// Day Four //
		
		weather.temperatureFour = Math.floor(data.list[31].main.temp - KELVIN);
		
		weather.descriptionFour = data.list[31].weather[0].description;
		
		weather.iconIdFour = data.list[31].weather[0].icon;
		
		// Day Five //
		
		weather.temperatureFive = Math.floor(data.list[39].main.temp - KELVIN);
		
		weather.descriptionFive = data.list[39].weather[0].description;
		
		weather.iconIdFive = data.list[39].weather[0].icon;
		
		
	}).then(function(){
		
		displayForecastOne();
		
		displayForecastTwo();
		
		displayForecastThree();
		
		displayForecastFour();
		
		displayForecastFive();
		
	});
	
}





