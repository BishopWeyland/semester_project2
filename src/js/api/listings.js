import { API_BASE_URL } from "./baseurl.js";
import { token, userName } from "./storage.mjs";
import { getCurrentBid } from "./curren-bids.js";

const listingContainer = document.querySelector(".listing-container");

async function getListings(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();

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
      return json.filter((item) => item.seller.name === userName);
    }

    const listingSelect = document.querySelector("#select-listings");

    if (!token || token === undefined) {
      listingSelect.style.display = "none";
    }

    listingSelect.addEventListener("change", (e) => {
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
          const fallbackImage =
            "../../images/undraw_snap_the_moment_re_88cu.svg";
          listingContainer.innerHTML += `
          <a href="single-listing.html?id=${item.id}">
            <div class="listing-card m-4 pb-4">
                <img src="${item.media}" onerror="this.src='${fallbackImage}'"/>
                <h2 class="mx-3">${item.title}</h2>
                <p class="mx-3">Current bid: <span class="current-bid">${currentBid} credits</span></p>
            </div>
          </a>`;
        });
      }
    }

    renderListings(filteredData);
  } catch (error) {
    alert(error);
  }
}

getListings(
  `${API_BASE_URL}/api/v1/auction/listings/?_seller=true&_bids=true&_active=true`
);
