import {
  fetchOwnIP,
  fetchWithIPAddress,
  fetchWithDomain,
} from "./apiServices.js";
import { isDomain, isIP } from "./utilityFunctions.js";

const textInput = document.getElementById("text-input");
const submitBtn = document.getElementById("submit-btn");
const ipAddress = document.getElementById("ip-address").lastElementChild;
const location = document.getElementById("location").lastElementChild;
const timezone = document.getElementById("timezone").lastElementChild;
const isp = document.getElementById("isp").lastElementChild;
const mapDiv = document.getElementById("map");
const inputForm = document.getElementById("input-form");

let map;

// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     const data = await fetchOwnIP();
//     ipAddress.textContent = data.ip;
//     location.innerHTML = `<p>${
//       data.location.city + ", " + data.location.region
//     }</p><p>${data.location.postalCode}</p>`;
//     timezone.textContent = "UTC " + data.location.timezone;
//     isp.textContent = data.isp;

//     const map = L.map(mapDiv).setView(
//       [data.location.lat, data.location.lng],
//       13
//     );
//     L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       maxZoom: 19,
//       attribution:
//         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//     }).addTo(map);
//   } catch (error) {
//     console.error(error);
//   }
// });

function cleanUp() {
  ipAddress.textContent = "";
  location.innerHTML = "";
  timezone.textContent = "";
  isp.textContent = "";
  map?.remove();
}

textInput.addEventListener("input", () => {
  if (!isIP(textInput.value) && !isDomain(textInput.value)) {
    textInput.setCustomValidity(
      "Please enter a valid IP Address or Domain Name!"
    );
  } else {
    textInput.setCustomValidity("");
  }
});

inputForm.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    console.log("hello");
    cleanUp();
    let data;
    const inputValue = textInput.value;
    console.log(textInput.validity);
    if (isIP(inputValue)) {
      data = await fetchWithIPAddress(inputValue);
    } else if (isDomain(inputValue)) {
      data = await fetchWithDomain(inputValue);
    }
    textInput.value = "";

    ipAddress.textContent = data.ip;
    location.innerHTML = `<p>${
      data.location.city + ", " + data.location.region
    }</p><p>${data.location.postalCode}</p>`;
    timezone.textContent = "UTC " + data.location.timezone;
    isp.textContent = data.isp;

    map = L.map(mapDiv).setView([data.location.lat, data.location.lng], 13);

    L.marker([data.location.lat, data.location.lng]).addTo(map);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
  } catch (error) {
    console.error(error);
  }
});
