import { API_BASE_URL } from "./baseurl.js";

async function getListings(url) {
  const response = await fetch(url);
  const json = await response.json();

  console.log(json);
}

getListings(`${API_BASE_URL}/api/v1/auction/listings`);
