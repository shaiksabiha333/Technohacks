// script.js
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "2675de535bc3fbef45a810958e0e5049"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p>${error.message}</p>`;
  }
}

function displayWeather(data) {
  const weatherDiv = document.getElementById("weatherResult");
  weatherDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>🌡 Temperature: ${data.main.temp} °C</p>
    <p>☁ Condition: ${data.weather[0].description}</p>
    <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
  `;
}