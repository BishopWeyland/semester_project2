import { token, userName } from "./storage.mjs";
import { API_BASE_URL } from "./baseurl.js";
import { getCurrentBid } from "./curren-bids.js";

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
      ? `<img class="me-3" src="${json.avatar}"/>`
      : '<div class="me-3 no-avatar"><i class="fa-solid fa-user"></i></div>';
    profileLink.innerHTML = `
    <a class="my-profile-link"href="my-profile.html">${avatar} <div>${json.name}</div></a>
    `;

    const profileInfo = document.querySelector(".my-profile-info");
    profileInfo.innerHTML = `
    <div class="avatar-name mb-3">
    ${avatar} <h1>${json.name}</h1>
    </div>
    <p>My credits: <span class="current-bid">${json.credits} credits</span></p>`;
  } catch (error) {
    console.log(error);
  }
}
getProfile(`${API_BASE_URL}/api/v1/auction/profiles/${userName}`);

const listingContainer = document.querySelector(".listing-container");

async function getMyListings(url) {
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
    for (let i = 0; i < json.length; i++) {
      const allBids = json[i].bids;
      const currentBid = getCurrentBid(allBids);
      const fallbackImage = "../../images/undraw_snap_the_moment_re_88cu.svg";
      listingContainer.innerHTML += `
          <a href="single-listing.html?id=${json[i].id}">
            <div class="listing-card m-4 pb-4">
                <img src="${json[i].media}" onerror="this.src='${fallbackImage}'"/>
                <h2 class="mx-3">${json[i].title}</h2>
                <p class="mx-3">Current bid: <span class="current-bid">${currentBid} credits</span></p>
            </div>
          </a>`;
    }
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

getMyListings(
  `${API_BASE_URL}/api/v1/auction/profiles/${userName}/listings?_bids=true`
);
