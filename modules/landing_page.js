import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let resObj = await fetch(`${config.backendEndpoint}/cities`);
    let data = await resObj.json();
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let rowDiv = document.getElementById("data");
  let columnDiv = document.createElement("div");
  let anchorTag = document.createElement("a");
  let imageDiv = document.createElement("div");
  let imageEle = document.createElement("img");
  let tileTextDiv = document.createElement("div");
  let cityName = document.createElement("h5");
  let places = document.createElement("h6");

  columnDiv.classList.add("col-12", "col-sm-6", "col-lg-3", "mb-3");
  anchorTag.classList.add("tile");
  imageDiv.classList.add("overflow-hidden", "w-100", "h-100");
  imageEle.classList.add("rounded-3");
  tileTextDiv.classList.add(
    "tile-text",
    "text-white",
    "d-flex",
    "flex-column",
    "align-items-center",
    "w-100"
  );

  anchorTag.setAttribute("href", `pages/adventures/?city=${id}`);
  anchorTag.setAttribute("id", id);
  imageEle.setAttribute("src", image);
  imageEle.setAttribute("alt", city);

  cityName.textContent = city;
  places.textContent = description;

  imageDiv.append(imageEle);
  tileTextDiv.append(cityName, places);
  anchorTag.append(imageDiv, tileTextDiv);
  columnDiv.append(anchorTag);
  rowDiv.append(columnDiv);
}

function searchResult(citiesArr) {
  let searchBar = document.getElementById("landingPageSearch")
  searchBar.addEventListener("input", (event) => {
    let searchText = event.target.value
    let modifiedCitiesArr = citiesArr.filter(cityEle => cityEle.city.toLowerCase() === searchText.toLowerCase())
    if (modifiedCitiesArr.length > 0) {
      document.getElementById("data").innerHTML = ""
      modifiedCitiesArr.forEach((key) => {
        addCityToDOM(key.id, key.city, key.description, key.image);
      });
    } else if (modifiedCitiesArr.length === 0) {
      document.getElementById("data").innerHTML = ""
      citiesArr.forEach((key) => {
        addCityToDOM(key.id, key.city, key.description, key.image);
      });
    }
  })
}

window.addEventListener("load", async () => {
  let cities = await fetchCities();
  searchResult(cities)
})

export { init, fetchCities, addCityToDOM };
