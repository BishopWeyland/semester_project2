import { token, userName } from "./storage.mjs";
import { API_BASE_URL } from "./baseurl.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const name = urlParams.get("name");

console.log(name);

const profileLink = document.querySelector(".profile-link");

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

    const avatar = json.avatar
      ? `<img src="${json.avatar}"/>`
      : '<div class="no-avatar"><i class="fa-solid fa-user"></i></div>';
    profileLink.innerHTML = `<a class="nav-link" href="profile.html?name=${userName}" >${avatar}${userName}</a>`;
  } catch (error) {
    console.log(error);
  }
}
getProfile(`${API_BASE_URL}/api/v1/auction/profiles/${name}`);
