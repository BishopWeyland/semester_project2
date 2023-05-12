import { API_BASE_URL } from "./baseurl.js";
import { userName } from "./storage.mjs";
import { getCurrentBid } from "./curren-bids.js";

const listingContainer = document.querySelector(".listing-container");

async function getListings(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();

    console.log(json);

    let filteredData = json;

    const searchForm = document.querySelector("#search-input");
    searchForm.addEventListener("keyup", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      if (searchTerm !== "") {
        filteredData = json.filter((item) => {
          return (
            (item.title || "").toLowerCase().includes(searchTerm) ||
            (item.seller.name || "").toLowerCase().includes(searchTerm)
          );
        });
      } else {
        filteredData = json;
      }

      renderListings(filteredData);
    });

    function myListings() {
      return json.filter((item) => item.author.name === userName);
    }

    const postsSelect = document.querySelector("#select-listings");

    postsSelect.addEventListener("change", (e) => {
      if (e.target.value === "my-listings") {
        filteredData = myListings();
      } else {
        filteredData = json;
      }

      renderListings(filteredData);
    });

    function renderListings(listings) {
      listingContainer.innerHTML = "";
      if (!listings.length) {
        listingContainer.innerHTML = "no results";
      } else {
        listings.forEach((item) => {
          const allBids = item.bids;
          const currentBid = getCurrentBid(allBids);
          const media = item.media ? `<img src="${item.media}"/>` : "";
          listingContainer.innerHTML += `
          <a href="single-listing.html?id=${item.id}">
            <div class="listing-card m-4 pb-4">
                <img src="${item.media}"/>
                <h2 class="mx-3">${item.title}</h2>
                <p class="mx-3">Current bid: <span class="current-bid">${currentBid} credits</span></p>
            </div>
          </a>`;
        });
      }
    }

    renderListings(filteredData);
  } catch (error) {
    console.log(error);
  }
}

getListings(`${API_BASE_URL}/api/v1/auction/listings/?_seller=true&_bids=true`);
