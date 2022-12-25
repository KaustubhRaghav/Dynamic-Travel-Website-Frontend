import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  try {
    let resObj = await fetch(`${config.backendEndpoint}/reservations/`);
    let data = await resObj.json();
    return data;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  let bannerEle = document.getElementById("no-reservation-banner");
  let tableEle = document.getElementById("reservation-table-parent");

  if (Array.isArray(reservations) && reservations.length !== 0) {
    bannerEle.style.display = "none";
    tableEle.style.display = "block";

    let tableBodyEle = document.getElementById("reservation-table");

    reservations.forEach(
      ({ adventure, adventureName, date, id, name, person, price, time }) => {
        let tableRowEle = document.createElement("tr");

        let transitionIdTabledata = document.createElement("td");
        let bookingNameTableData = document.createElement("td");
        let adventureTableData = document.createElement("td");
        let personsTableData = document.createElement("td");
        let dateTableData = document.createElement("td");
        let priceTableData = document.createElement("td");
        let bookingTimeTableData = document.createElement("td");
        let actionTableData = document.createElement("td");

        transitionIdTabledata.textContent = id;
        bookingNameTableData.textContent = name;
        adventureTableData.textContent = adventureName;
        personsTableData.textContent = person;
        priceTableData.textContent = price;

        transitionIdTabledata.classList.add("fw-bold");

        let dateObj = new Date(date);
        let formattedDate = dateObj.toLocaleString("en-IN").split(",")[0];

        dateTableData.textContent = formattedDate;

        let bookingDateObj = new Date(time);
        let formattedBookingTime =
          bookingDateObj.toLocaleDateString("en-IN", {
            day: "numeric",
            year: "numeric",
            month: "long",
          }) +
          ", " +
          bookingDateObj.toLocaleTimeString("en-IN");

        bookingTimeTableData.textContent = formattedBookingTime;

        let actionButton = document.createElement("button");
        let anchorTagEle = document.createElement("a");

        actionButton.classList.add("reservation-visit-button");
        anchorTagEle.textContent = "Visit Adventure";

        actionButton.setAttribute("id", id);
        actionButton.setAttribute("type", "button");
        anchorTagEle.setAttribute("href", `../detail/?adventure=${adventure}`);

        actionButton.style.padding = "0px";
        anchorTagEle.style.padding = "10px";

        actionButton.append(anchorTagEle);
        actionTableData.append(actionButton);

        tableRowEle.append(
          transitionIdTabledata,
          bookingNameTableData,
          adventureTableData,
          personsTableData,
          dateTableData,
          priceTableData,
          bookingTimeTableData,
          actionTableData
        );

        tableBodyEle.append(tableRowEle);
      }
    );
  } else {
    bannerEle.style.display = "block";
    tableEle.style.display = "none";
  }
}

export { fetchReservations, addReservationToTable };
