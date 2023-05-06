const cityName = document.querySelector(".city-name");
const country = document.querySelector(".country");
const cityTime = document.querySelector(".city-time");
const cityTemp = document.querySelector(".temp");
const description = document.querySelector(".desc");
const image = document.querySelector(".image");
const imageBig = document.querySelector(".right-image");
const tempMax = document.querySelector(".high");
const tempMin = document.querySelector(".low");
const windSpeed = document.querySelector(".wind");
const visibility = document.querySelector(".visibility");
const input = document.getElementById("input");
const search = document.querySelector(".icon");

const apiKey = "832e28020af9958be5dd112335ae7a66";


function searchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
        const timezoneOffset = data.timezone;
        const now = new Date();
        const utcTimestamp = now.getTime();
        const localTimestamp = utcTimestamp + timezoneOffset * 1000;
        const hour = new Date(localTimestamp).getHours();
        const minute = new Date(localTimestamp).getMinutes();
        cityName.innerHTML = data.name;
        country.innerHTML = data.sys.country;
        cityTime.innerHTML = `${hour > 12 ? hour - 12 : hour}:${minute < 10 ? `0${minute}`: minute } ${hour > 12 ? `pm` : `am`}`;
        cityTemp.innerHTML = `${Math.floor(data.main.temp)}°C `;
        description.innerHTML = data.weather[0].description;
        image.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        );
        imageBig.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        );
        tempMax.innerHTML = `High: ${Math.floor(data.main.temp_max) }°C `;
        tempMin.innerHTML = `Low: ${Math.floor(data.main.temp_min) }°C `;
        windSpeed.innerHTML = `Wind: ${data.wind.speed} mph`;
        visibility.innerHTML = `Visibility: ${data.visibility / 1000} km`;
        
    })
    .catch((error) => console.error(error));
}

let currentLocation;


search.addEventListener("click", () => {
  searchWeatherByCity(input.value);
});

window.addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
        e.preventDefault();
        searchWeatherByCity(input.value);
    }
})

searchWeatherByCity("Abuja")



