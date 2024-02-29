const apiKey = "1da73595a47b504c9a36265c88ef5936";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search__input");
const searchButton = document.querySelector(".search__button");

async function getWeatherInfo(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        let data = await response.json();

        console.log(data);
        
        document.querySelector(".weather__city-name").innerHTML = data.name;
        document.querySelector(".weather__temp").innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherImage = document.querySelector(".weather__image");
        weatherImage.src = "images/" + `${data.weather[0].main}` + ".png";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    }
}

searchButton.addEventListener("click", function () {
    getWeatherInfo(searchBox.value);
})
