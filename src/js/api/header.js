import { token, userName } from "./storage.mjs";
import { API_BASE_URL } from "./baseurl.js";

const profileLink = document.querySelector(".profile-link");

async function getProfileLink(url) {
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
    const avatar = json.avatar
      ? `<img class="me-3" src="${json.avatar}"/>`
      : '<div class="me-3 no-avatar"><i class="fa-solid fa-user"></i></div>';
    profileLink.innerHTML = `
    <a class="my-profile-link"href="my-profile.html">${avatar} <div>${json.name}</div></a>
    `;
  } catch (error) {
    alert(error);
  }
}
getProfileLink(`${API_BASE_URL}/api/v1/auction/profiles/${userName}`);
