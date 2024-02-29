const apiKey = "1da73595a47b504c9a36265c88ef5936";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search__input");
const searchButton = document.querySelector(".search__button");

async function getWeatherInfo(city){
    const response = await fetch(apiUrl + city +  `&appid=${apiKey}`);
    let data = await response.json();

    document.querySelector(".weather__city-name").innerHTML = data.name;
    document.querySelector(".weather__temp").innerHTML = Math.round(data.main.temp) + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
}

searchButton.addEventListener("click", function (){
    getWeatherInfo(searchBox.value);
})
