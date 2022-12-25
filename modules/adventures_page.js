import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let queryParams = new URLSearchParams(search);
  return queryParams.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let resObj = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    let adventures = await resObj.json();
    return adventures;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let row = document.getElementById("data");
  Array.isArray(adventures) &&
    adventures.forEach(
      ({ id, category, image, name, costPerHead, duration }) => {
        let column = document.createElement("div");
        let anchor = document.createElement("a");
        let banner = document.createElement("div");
        let imageContainer = document.createElement("div");
        let imgEle = document.createElement("img");
        let textContainer = document.createElement("div");
        let textRow1 = document.createElement("div");
        let textCol11 = document.createElement("div");
        let textCol12 = document.createElement("div");
        let nameText = document.createElement("h6");
        let costText = document.createElement("h6");
        let textRow2 = document.createElement("div");
        let textCol21 = document.createElement("div");
        let textCol22 = document.createElement("div");
        let durationText = document.createElement("h6");
        let timeText = document.createElement("h6");

        column.classList.add("col-12", "col-sm-6", "col-lg-3", "mb-3");
        anchor.classList.add("activity-card", "border", "rounded-3");
        banner.classList.add("category-banner");
        imageContainer.classList.add("h-75", "w-100");
        textContainer.classList.add("h-25", "w-100", "p-2");
        textRow1.classList.add("row");
        textCol11.classList.add("col-6");
        textCol12.classList.add("col-6", "text-end");
        textRow2.classList.add("row");
        textCol21.classList.add("col-6");
        textCol22.classList.add("col-6", "text-end");

        anchor.setAttribute("href", `detail/?adventure=${id}`);
        anchor.setAttribute("id", id);
        imgEle.setAttribute("src", image);
        imgEle.setAttribute("alt", name);

        banner.textContent = category;
        nameText.textContent = name;
        costText.textContent = "₹" + costPerHead;
        durationText.textContent = "Duration";
        timeText.textContent = duration + " Hours";

        textCol11.append(nameText);
        textCol12.append(costText);
        textRow1.append(textCol11, textCol12);
        textCol21.append(durationText);
        textCol22.append(timeText);
        textRow2.append(textCol21, textCol22);
        textContainer.append(textRow1, textRow2);
        imageContainer.append(imgEle);
        anchor.append(banner, imageContainer, textContainer);
        column.append(anchor);
        row.append(column);
      }
    );

  let addAdvColumn = document.createElement("div");
  let addAdvContainer = document.createElement("button");
  let plusText = document.createElement("h1");
  let addAdvText = document.createElement("h3");

  addAdvColumn.classList.add("col-12", "col-sm-6", "col-lg-3", "mb-3");
  addAdvContainer.classList.add(
    "d-flex",
    "flex-column",
    "justify-content-center",
    "align-items-center",
    "w-100",
    "h-100",
    "btn",
    "btn-outline-success"
  );

  addAdvContainer.setAttribute("type", "button");

  plusText.textContent = "+";
  addAdvText.textContent = "Add New Adventure";

  addAdvContainer.append(plusText, addAdvText);
  addAdvColumn.append(addAdvContainer);
  row.append(addAdvColumn);

  addAdvContainer.addEventListener("click", async () => {
    let currentCity = new URLSearchParams(window.location.search).get("city");
    let bodyContent = {
      city: currentCity,
    };
    let url = `${config.backendEndpoint}/adventures/new`;
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(bodyContent),
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  return list.filter(
    (listItem) => listItem.duration >= low && listItem.duration <= high
  );
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  return list.filter(
    (listItem) => listItem.category && categoryList.includes(listItem.category)
  );
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  let filterContents = Object.keys(filters);

  if (filterContents.length !== 0) {
    if (
      filterContents.includes("duration") &&
      filters["duration"].length !== 0 &&
      filterContents.includes("category") &&
      filters["category"].length !== 0
    ) {
      let categoryArr = filters["category"];
      let durationArr = filters.duration.split("-");
      let lowLimit = durationArr[0];
      let highLimit = durationArr[1];
      let filterCategoryArr = filterByCategory(list, categoryArr);
      let filterDurationArr = filterByDuration(
        filterCategoryArr,
        parseInt(lowLimit),
        parseInt(highLimit)
      );
      return filterDurationArr;
    } else if (
      filterContents.includes("duration") &&
      filters["duration"].length !== 0
    ) {
      let durationArr = filters.duration.split("-");
      let lowLimit = durationArr[0];
      let highLimit = durationArr[1];
      return filterByDuration(list, parseInt(lowLimit), parseInt(highLimit));
    } else if (
      filterContents.includes("category") &&
      filters["category"].length !== 0
    ) {
      let categoryArr = filters["category"];
      return filterByCategory(list, categoryArr);
    }
  }

  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters = JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let container = document.getElementById("category-list");

  filters["category"].length !== 0 &&
    filters["category"].forEach((item) => {
      let pill = document.createElement("button");
      let cancelPill = document.createElement("span");

      pill.classList.add("category-filter");
      cancelPill.classList.add("ms-3");

      pill.textContent = item;
      cancelPill.textContent = "X";

      pill.append(cancelPill);
      container.append(pill);

      pill.addEventListener("click", async (event) => {
        let pillText = event.target.textContent;
        let modifiedPillText = pillText.substring(0, pillText.length - 1);
        let modifiedcategoryArr = filters.category.filter(
          (item) => item !== modifiedPillText
        );
        let modifiedFilters = { ...filters, category: modifiedcategoryArr };
        let cityName = new URLSearchParams(window.location.search).get("city");
        let resObj = await fetch(
          `${config.backendEndpoint}/adventures?city=${cityName}`
        );
        let adventuresList = await resObj.json();

        document.getElementById("data").textContent = "";
        document.getElementById("category-list").textContent = "";

        let filteredAdventuresList = filterFunction(
          adventuresList,
          modifiedFilters
        );
        addAdventureToDOM(filteredAdventuresList);
        generateFilterPillsAndUpdateDOM(modifiedFilters);
        saveFiltersToLocalStorage(modifiedFilters);
      });
    });

  document.getElementById("duration-select").value = filters.duration;
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
