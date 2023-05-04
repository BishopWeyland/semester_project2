import { API_BASE_URL } from "./baseurl.js";

const listingContainer = document.querySelector(".listing-container");

async function getListings(url) {
  const response = await fetch(url);
  const json = await response.json();

  console.log(json);

  listingContainer.innerHTML = "";

  for (let i = 0; i < json.length; i++) {
    listingContainer.innerHTML += `
    <div class="listing-card">
        <img src="${json[i].media}"/>
        <h2>${json[i].title}</h2>
        <p>Current bid: <span class="current-bid">${json[i]._count.bids} credits</span></p>
    </div>`;
  }
}

getListings(`${API_BASE_URL}/api/v1/auction/listings`);
