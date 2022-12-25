import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  return new URLSearchParams(search).get("adventure");

  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let resObj = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );
    let data = await resObj.json();

    // Place holder for functionality to work in the Stubs
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM({ name, subtitle, images, content }) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let headingContent = document.getElementById("adventure-name");
  headingContent.textContent = name;

  let subtitleContent = document.getElementById("adventure-subtitle");
  subtitleContent.textContent = subtitle;

  let photoGallery = document.getElementById("photo-gallery");
  Array.isArray(images) &&
    images.length !== 0 &&
    images.forEach((image, index) => {
      let imgContainer = document.createElement("div");
      let imgEle = document.createElement("img");

      imgEle.classList.add("activity-card-image");

      imgEle.setAttribute("src", image);
      imgEle.setAttribute("alt", `image${index}`);

      imgContainer.append(imgEle);
      photoGallery.append(imgContainer);
    });

  let advContent = document.getElementById("adventure-content");
  advContent.textContent = content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = "";

  let carouselSlide = document.createElement("div");
  carouselSlide.classList.add("carousel", "slide");
  carouselSlide.setAttribute("id", "carouselExampleIndicators");
  carouselSlide.setAttribute("data-bs-ride", "carousel");

  let carouselIndicators = document.createElement("div");
  carouselIndicators.classList.add("carousel-indicators");

  Array.isArray(images) &&
    images.length !== 0 &&
    images.forEach((image, index) => {
      let buttonEle = document.createElement("button");

      if (index === 0) {
        buttonEle.classList.add("active");
        buttonEle.setAttribute("aria-current", "true");
      }

      buttonEle.setAttribute("type", "button");
      buttonEle.setAttribute("data-bs-target", "#carouselExampleIndicators");
      buttonEle.setAttribute("data-bs-slide-to", `${index}`);
      buttonEle.setAttribute("aria-label", `Slide ${index + 1}`);

      carouselIndicators.append(buttonEle);
    });

  carouselSlide.append(carouselIndicators);

  let carouselInner = document.createElement("div");
  carouselInner.classList.add("carousel-inner");

  Array.isArray(images) &&
    images.length !== 0 &&
    images.forEach((image, index) => {
      let imgContainer = document.createElement("div");
      let imgEle = document.createElement("img");

      imgContainer.classList.add("carousel-item");
      imgEle.classList.add("d-block", "w-100");

      imgEle.style.objectFit = "cover";
      imgEle.style.objectPosition = "center";
      imgEle.style.height = "70vh";
      imgEle.style.overflow = "hidden";

      if (index === 0) {
        imgContainer.classList.add("active");
      }

      imgEle.setAttribute("src", image);
      imgEle.setAttribute("alt", `image${index}`);

      imgContainer.append(imgEle);
      carouselInner.append(imgContainer);
    });

  carouselSlide.append(carouselInner);

  let prevButtonContainer = document.createElement("button");
  prevButtonContainer.classList.add("carousel-control-prev");
  prevButtonContainer.setAttribute("type", "button");
  prevButtonContainer.setAttribute(
    "data-bs-target",
    "#carouselExampleIndicators"
  );
  prevButtonContainer.setAttribute("data-bs-slide", "prev");

  let prevIconEle = document.createElement("span");
  prevIconEle.classList.add("carousel-control-prev-icon");
  prevIconEle.setAttribute("aria-hidden", "true");
  prevButtonContainer.append(prevIconEle);

  let prevTextEle = document.createElement("span");
  prevTextEle.classList.add("visually-hidden");
  prevTextEle.textContent = "Previous";
  prevButtonContainer.append(prevTextEle);

  carouselSlide.append(prevButtonContainer);

  let nextButtonContainer = document.createElement("button");
  nextButtonContainer.classList.add("carousel-control-next");
  nextButtonContainer.setAttribute("type", "button");
  nextButtonContainer.setAttribute(
    "data-bs-target",
    "#carouselExampleIndicators"
  );
  nextButtonContainer.setAttribute("data-bs-slide", "next");

  let nextIconEle = document.createElement("span");
  nextIconEle.classList.add("carousel-control-next-icon");
  nextIconEle.setAttribute("aria-hidden", "true");
  nextButtonContainer.append(nextIconEle);

  let nextTextEle = document.createElement("span");
  nextTextEle.classList.add("visually-hidden");
  nextTextEle.textContent = "Next";
  nextButtonContainer.append(nextTextEle);

  carouselSlide.append(nextButtonContainer);

  photoGallery.append(carouselSlide);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel({ available, costPerHead }) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (available) {
    let soldOutEle = document.getElementById("reservation-panel-sold-out");
    soldOutEle.style.display = "none";

    let reservationEle = document.getElementById("reservation-panel-available");
    reservationEle.style.display = "block";

    let costPerHeadEle = document.getElementById("reservation-person-cost");
    costPerHeadEle.textContent = costPerHead;
  } else {
    let reservationEle = document.getElementById("reservation-panel-available");
    reservationEle.style.display = "none";

    let soldOutEle = document.getElementById("reservation-panel-sold-out");
    soldOutEle.style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM({ costPerHead }, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  let reservationCostEle = document.getElementById("reservation-cost");
  let totalCost = costPerHead * parseInt(persons);
  reservationCostEle.textContent = isNaN(totalCost) ? 0 : totalCost;
}

//Implementation of reservation form submission
function captureFormSubmit({ id }) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  let bodyData = {};

  let formEle = document.getElementById("myForm");
  formEle.addEventListener("submit", async (event) => {
    event.preventDefault();

    let children = event.target.elements;
    bodyData.name = children["name"].value;
    bodyData.date = children["date"].value;
    bodyData.person = children["person"].value;
    bodyData.adventure = id;

    try {
      await fetch(`${config.backendEndpoint}/reservations/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(bodyData),
      });
      alert("Success!");
      window.location.reload();
    } catch (error) {
      alert("Failed!");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved({ reserved }) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  let bannerElement = document.getElementById("reserved-banner");

  if (reserved) {
    bannerElement.style.display = "block";
  } else {
    bannerElement.style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
