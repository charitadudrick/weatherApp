// -------------------------------
// API KEYS (INSERT YOURS HERE)
// -------------------------------
const OPENWEATHER_KEY = "8a4d9ae7f37ab0203a3bc39452111252";
const UNSPLASH_KEY = "Ngj9XOR3sQIHELd2fjMldEWN93i9VeYT79K9ZNEWqVc";

// -------------------------------
// MAIN WEATHER FUNCTION
// -------------------------------
async function getWeather(city) {
  try {
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_KEY}&units=imperial`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    updateWeatherUI(data);
    updateBackground(city);

  } catch (error) {
    console.error(error);
    document.getElementById("weather-output").innerText =
      "Could not find that city.";
  }
}

// -------------------------------
// UPDATE WEATHER UI
// -------------------------------
function updateWeatherUI(data) {
  const name = data.name;
  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].description;
  const icon = data.weather[0].icon;

  document.getElementById("weather-output").innerHTML = `
    <h2>${name}</h2>
    <p>${temp}°F</p>
    <p>${desc}</p>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
  `;
}

// -------------------------------
// UNSPLASH BACKGROUND IMAGE
// -------------------------------
async function updateBackground(city) {
  try {
    const url =
      `https://api.unsplash.com/photos/random?query=${city}&client_id=${UNSPLASH_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.urls && data.urls.full) {
      document.body.style.backgroundImage = `url('${data.urls.full}')`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    }
  } catch (error) {
    console.log("Unsplash image failed, using default background.");
  }
}

// -------------------------------
// SEARCH BUTTON HANDLER
// -------------------------------
document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  if (city !== "") {
    getWeather(city);
  }
});
