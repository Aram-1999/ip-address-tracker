import {
  fetchOwnIP,
  fetchWithIPAddress,
  fetchWithDomain,
} from "./apiServices.js";
import { APIError } from "./customErrors.js";
import { isDomain, isIP } from "./utilityFunctions.js";

const textInput = document.getElementById("text-input");
const submitBtn = document.getElementById("submit-btn");
const ipAddress = document.getElementById("ip-address").lastElementChild;
const location = document.getElementById("location").lastElementChild;
const timezone = document.getElementById("timezone").lastElementChild;
const isp = document.getElementById("isp").lastElementChild;
const mapDiv = document.getElementById("map");
const inputForm = document.getElementById("input-form");
const inputError = document.getElementById('input-error')

let map;

function mapRendering(data) {
      map = L.map(mapDiv).setView([data.location.lat, data.location.lng], 13);

    const locationIcon = L.icon({
      iconUrl: '../images/icon-location.svg'
    })

    L.marker([data.location.lat, data.location.lng], {icon: locationIcon}).addTo(map);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await fetchOwnIP();
    ipAddress.textContent = data.ip;
    location.innerHTML = `<p>${
      data.location.city + ", " + data.location.region
    }</p><p>${data.location.postalCode}</p>`;
    timezone.textContent = "UTC " + data.location.timezone;
    isp.textContent = data.isp;

    mapRendering(data)
  } catch (error) {
    console.error(error);
  }
});

function cleanUp() {
  ipAddress.textContent = "";
  location.innerHTML = "";
  timezone.textContent = "";
  isp.textContent = "";
  map?.remove();
}

textInput.addEventListener("blur", missingValueCheck);

function missingValueCheck() {
  let errorMessage;
  if (textInput.validity.valueMissing) {
    errorMessage = 'The input can not be empty!'
  } else if (!isIP(textInput.value) && !isDomain(textInput.value)) {
    errorMessage = "Please enter a valid IP address or domain name!";
  } else {
    errorMessage = ""
  }
  textInput.setCustomValidity(errorMessage);
  inputError.textContent = errorMessage;
}

inputForm.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    missingValueCheck()
    if (!textInput.checkValidity()) {
      return
    }
    cleanUp();
    let data;
    const inputValue = textInput.value;
    if (isIP(inputValue)) {
      data = await fetchWithIPAddress(inputValue);
    } else if (isDomain(inputValue)) {
      data = await fetchWithDomain(inputValue);
    } else {
      throw new Error("The database doesn't have any information about this address")
    }
    textInput.value = "";

    ipAddress.textContent = data.ip;
    location.innerHTML = `<p>${
      data.location.city + ", " + data.location.region
    }</p><p>${data.location.postalCode}</p>`;
    timezone.textContent = "UTC " + data.location.timezone;
    isp.textContent = data.isp;

    mapRendering(data)
  } catch (error) {
    console.error(error);
  }
});
