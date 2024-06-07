const yourWeatherTab = document.querySelector("button[data-userWeather]");
const searchWeatherTab = document.querySelector("button[data-searchWeather]");
const grantLocationContainer = document.querySelector(
  ".grant-location-container"
);
const searchFormContainer = document.querySelector(".form-container");
const input = document.querySelector("input[data-searchInput]");
const form = document.querySelector("form");
const grantAccessButton = document.querySelector("button[data-grantAccess]");
const userInfoContainer = document.querySelector(".user-info-container");
const cityName = document.querySelector("p[data-cityName]");
const countryIcon = document.querySelector("img[data-countryIcon]");
const weatherDesc = document.querySelector("p[data-weatherDesc]");
const weatherIcon = document.querySelector("img[data-weatherIcon ]");
const dataTemp = document.querySelector("p[data-temp]");
const dataWindSpeed = document.querySelector("p[data-windspeed]");
const dataHumidity = document.querySelector("p[data-humidity]");
const dataCloudness = document.querySelector("p[data-cloudiness]");
const loadingContainer = document.querySelector(".loading-container");

function selectTab(e) {
  // selecting the tab which is clicked
  userInfoContainer.classList.remove("active");
  yourWeatherTab.classList.remove("active");
  searchWeatherTab.classList.remove("active");
  e.target.classList.add("active");

  if (yourWeatherTab.classList.contains("active")) {
    grantLocationContainer.classList.add("active");
    searchFormContainer.classList.remove("active");
  } else if (searchWeatherTab.classList.contains("active")) {
    searchFormContainer.classList.add("active");
    grantLocationContainer.classList.remove("active");
  }
}

function showWeatherData(data, identifier) {
  loadingContainer.classList.add("active");
  setTimeout(() => {
    loadingContainer.classList.remove("active");
  }, 500);
  if (identifier === "button") {
    grantLocationContainer.classList.remove("active");
  }
  userInfoContainer.classList.add("active");
  cityName.textContent = `${data.name}`;
  weatherDesc.textContent = `${data.weather[0].description}`;
  weatherIcon.src = `./assets/${data.weather[0].main}.svg`;
  dataTemp.textContent = `${(data.main.temp - 273.15).toFixed(2)} °C`;
  dataWindSpeed.textContent = `${data.wind.speed} m/s`;
  dataHumidity.textContent = `${data.main.humidity} %`;
  dataCloudness.textContent = `${data.clouds.all} %`;
}

async function fetchWeatherData(e) {
  e.preventDefault();
  const city = e.target.querySelector("input").value;
  let data;
  let response;
  try {
    response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=62010d117319a1d08d7af4ddbc81b656`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    data = await response.json();
  } catch (e) {
    console.log(e);
  } finally {
    if (response && response.ok) {
      showWeatherData(data);
    }
  }
}

async function fetchWeatherDataForButton(lat, lng) {
  let data;
  let response;
  try {
    response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=62010d117319a1d08d7af4ddbc81b656`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    data = await response.json();
  } catch (e) {
    console.log(e);
  } finally {
    if (response && response.ok) {
      showWeatherData(data, "button");
    }
  }
}

function getCurrentPositionAsync() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchCurrentLocationWeather() {
  let position;
  try {
    position = await getCurrentPositionAsync();
  } catch (error) {
    console.error("Error getting location:", error);
  } finally {
    fetchWeatherDataForButton(
      position.coords.latitude,
      position.coords.longitude
    );
  }
}

form.addEventListener("submit", fetchWeatherData);
yourWeatherTab.addEventListener("click", selectTab);
searchWeatherTab.addEventListener("click", selectTab);
grantAccessButton.addEventListener("click", fetchCurrentLocationWeather);
