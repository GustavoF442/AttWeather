const apiKey = "75021ab700f228ded290f5984310e49e";
const apiCountryURL = "https://flagcdn.com/w320/"; // URL para as bandeiras
const apiUnsplash = "https://source.unsplash.com/1600x900/?"; // URL para as imagens do Unsplash

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const tempMinElement = document.querySelector("#temp-min span");
const tempMaxElement = document.querySelector("#temp-max span");
const pressureElement = document.querySelector("#pressure span");
const seaLevelElement = document.querySelector("#sea_level span");
const grndLevelElement = document.querySelector("#grnd_level span");

const weatherContainer = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

const toggleLoader = () => {
  loader.classList.toggle("hide");
};

const getWeatherData = async (city) => {
  toggleLoader();

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  toggleLoader();

  return data;
};

const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");
  suggestionContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
  hideInformation();

  const data = await getWeatherData(city);

  if (data.cod === "404") {
    showErrorMessage();
    return;
  }

  cityElement.innerText = data.name;
  tempElement.innerText = `${parseInt(data.main.temp)}°C`;
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryElement.setAttribute("src", apiCountryURL + data.sys.country.toLowerCase() + ".png");
  umidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed} km/h`;
  tempMinElement.innerText = `${data.main.temp_min}°C`;
  tempMaxElement.innerText = `${data.main.temp_max}°C`;
  pressureElement.innerText = `${data.main.pressure} hPa`;
  seaLevelElement.innerText = `${data.main.sea_level} m`;
  grndLevelElement.innerText = `${data.main.grnd_level} m`;

  document.body.style.backgroundImage = `url("${apiUnsplash + encodeURIComponent(city)}")`;

  weatherContainer.classList.remove("hide");
};

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const city = cityInput.value;

  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;

    showWeatherData(city);
  }
});

suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("id");

    showWeatherData(city);
  });
});
