import { token } from "./storage.mjs";
import { API_BASE_URL } from "./baseurl.js";
import { getCurrentBid } from "./curren-bids.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const name = urlParams.get("name");

console.log(name);
const title = document.querySelector("title");
const profileContainer = document.querySelector(".profile-container");

if (!token || token === undefined) {
  profileContainer.innerHTML = `
    <img src="../../images/undraw_mobile_login_re_9ntv.svg"/>
    <div>
     <h1 class="text-align mb-3">Please sign in to view profiles!</h1>
      <div class="justify-content-center">
        <a class="btn btn-light me-3" href="login.html">Login</a>
        <a class="btn btn-dark" href="create-account.html">Create account</a>
      </div>
    </div>
     
  `;
} else {
  profileContainer.style.display = "none";
}

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

    if (!token || token === undefined) {
      title.innerHTML = `Quickbids`;
    } else {
      title.innerHTML = `${json.name} | Quickbids`;
    }

    const avatar = json.avatar
      ? `<img class="me-3" src="${json.avatar}"/>`
      : '<div class="me-3 no-avatar"><i class="fa-solid fa-user"></i></div>';

    const profileInfo = document.querySelector(".my-profile-info");
    profileInfo.innerHTML = `
    <div class="avatar-name mb-3">
    ${avatar} <h1>${json.name}</h1>
    </div>
    <p>${json.name}'s credits: <span class="current-bid">${json.credits} credits</span></p>`;

    const profileListing = document.querySelector(".profile-listing");
    profileListing.innerHTML = `${json.name}'s listings:`;

    if (!token || token === undefined) {
      profileInfo.innerHTML = "";
      profileListing.innerHTML = "";
    }
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}
getProfile(`${API_BASE_URL}/api/v1/auction/profiles/${name}`);

const listingContainer = document.querySelector(".listing-container");

async function getUserListings(url) {
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
    if (!token || token === undefined) {
      listingContainer.innerHTML = "";
    }
  } catch (error) {
    console.log(error);
  }
}

getUserListings(
  `${API_BASE_URL}/api/v1/auction/profiles/${name}/listings?_bids=true`
);
