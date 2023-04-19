const cityName = document.querySelector(".city-name")
const cityTime = document.querySelector(".city-time")
const cityTemp = document.querySelector(".temp")
const description = document.querySelector(".desc")
const tempMax = document.querySelector(".high")
const tempMin = document.querySelector(".low")
const windSpeed = document.querySelector(".wind")
const visibility = document.querySelector(".visibility")
const input = document.getElementById("input")
const search = document.querySelector(".icon")


// const dataArr = []

const apiKey = '832e28020af9958be5dd112335ae7a66';

function searchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        cityName.innerHTML = data.name
        cityTemp.innerHTML = `${Math.ceil(data.main.temp - 273)}°C `
        description.innerHTML = data.weather[0].description
        tempMax.innerHTML = `${Math.ceil(data.main.temp_max - 273)}°C `
        tempMin.innerHTML = `${Math.ceil(data.main.temp_min - 273)}°C `
        windSpeed.innerHTML = `Wind: ${data.wind.speed} mph`
        visibility.innerHTML = `Visibility: ${data.visibility / 1000} km`
        // cityTime.innerHTML = input.value

    })
    .catch(error => console.error(error));
}

search.addEventListener("click", () => {
    searchWeatherByCity(input.value)
    console.log(input.value)
})

