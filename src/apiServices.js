import { apiKey } from "./secrets.js";
import { APIError, handleErrors } from "./customErrors.js";

export async function fetchOwnIP() {
  try {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`
    );
    if (!response.ok) {
      throw new APIError("Failed to fetch the data!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    handleErrors(error);
  }
}

export async function fetchWithIPAddress(ipAddress) {
  try {
    const response = await fetch(`
https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`);
    if (!response.ok) {
      throw new APIError("Failed to fetch the data!");
    }
    const data = await response.json()
    return data
  } catch (error) {
    handleErrors(error);
  }
}

export async function fetchWithDomain(domain) {
    try {
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&domain=${domain}`)
        if (!response.ok) {
            throw new APIError('Failed to fetch the data!');
        }
        const data = await response.json();
        return data;
    } catch(error) {
        handleErrors(error);
    }
}