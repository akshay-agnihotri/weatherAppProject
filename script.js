const yourWeatherTab = document.querySelector("button[data-userWeather]");
const searchWeatherTab = document.querySelector("button[data-searchWeather]");
const grantLocationContainer = document.querySelector(
  ".grant-location-container"
);
const searchFormContainer = document.querySelector(".form-container");
const input = document.querySelector("input[data-searchInput]");
const form = document.querySelector("form");

function selectTab(e) {
  // selecting the tab which is clicked
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

function fetchApi(e) {
  e.preventDefault(); //to avoid reloading of page
}

form.addEventListener("submit" , fetchApi);
yourWeatherTab.addEventListener("click", selectTab);
searchWeatherTab.addEventListener("click", selectTab);

