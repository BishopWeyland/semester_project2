import { token, userName } from "./storage.mjs";
import { API_BASE_URL } from "./baseurl.js";

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
      : '<i class="fa-solid fa-user me-3"></i>';
    profileLink.innerHTML = `
    <a class="my-profile-link"href="my-profile.html">${avatar} <div>${json.name}</div></a>
    `;
  } catch (error) {
    console.log(error);
  }
}
getProfile(`${API_BASE_URL}/api/v1/auction/profiles/${userName}`);
