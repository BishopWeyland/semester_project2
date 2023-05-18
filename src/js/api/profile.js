import { token } from "./storage.mjs";
import { API_BASE_URL } from "./baseurl.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const name = urlParams.get("name");

console.log(name);

async function getProfile(url) {
  try {
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, fetchOptions);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}
getProfile(`${API_BASE_URL}/api/v1/auction/profiles/${name}`);
