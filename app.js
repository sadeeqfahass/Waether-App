const cityName = document.querySelector(".city-name");
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

let dataArr;




function searchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const timezoneOffset = data.timezone;
        const now = new Date();
        const utcTimestamp = now.getTime();
        const localTimestamp = utcTimestamp + timezoneOffset * 1000;
        const hour = new Date(localTimestamp).getHours();
        const minute = new Date(localTimestamp).getMinutes();
        cityName.innerHTML = data.name;
        cityTime.innerHTML = `${hour > 12 ? hour - 12 : hour}:${minute < 10 ? `0${minute}`: minute } ${hour > 12 ? `pm` : `am`}`;
        cityTemp.innerHTML = `${Math.ceil(data.main.temp - 273)}°C `;
        description.innerHTML = data.weather[0].description;
        image.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        );
        imageBig.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        );
        tempMax.innerHTML = `${Math.ceil(data.main.temp_max - 273)}°C `;
        tempMin.innerHTML = `${Math.ceil(data.main.temp_min - 273)}°C `;
        windSpeed.innerHTML = `Wind: ${data.wind.speed} mph`;
        visibility.innerHTML = `Visibility: ${data.visibility / 1000} km`;
        
    })
    .catch((error) => console.error(error));
}

let currentLocation;


search.addEventListener("click", () => {
  searchWeatherByCity(input.value);
});

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(showPosition);
// } else {
//   alert("Geolocation is not supported by this browser.");
// }

// function showPosition(position) {
//   var lat = position.coords.latitude;
//   var long = position.coords.longitude;

//   fetch(
//     `https://api.api-ninjas.com/v1/reversegeocoding?lat=${lat}&lon=${long}`,
//     {
//       method: "GET",
//       headers: {
//         "X-Api-Key": "NYFPRQfFwXnZc+m9MLc5sw==h1wj4MJtYejsXY0v",
//         "Content-Type": "application/json",
//       },
//     }
//   )
//     .then((response) => response.json())
//     .then((response) => {
//       currentLocation = response[0].name;
//       console.log(currentLocation);
//     })
//     .catch((error) => console.error("Error: ", error));
// }

// setTimeout(() => searchWeatherByCity(currentLocation), 5000)


