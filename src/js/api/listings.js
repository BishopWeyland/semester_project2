import { API_BASE_URL } from "./baseurl.js";

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

    // function myListings() {
    //   return json.filter((item) => item.author.name === userName);
    // }

    // const postsSelect = document.querySelector("#select-listings");

    // postsSelect.addEventListener("change", (e) => {
    //   if (e.target.value === "my-listings") {
    //     filteredData = myListings();
    //   } else {
    //     filteredData = json;
    //   }

    //   renderPosts(filteredData);
    // });

    function renderListings(listings) {
      listingContainer.innerHTML = "";
      if (!listings.length) {
        listingContainer.innerHTML = "no results";
      } else {
        listings.forEach((item) => {
          const media = item.media ? `<img src="${item.media}"/>` : "";
          listingContainer.innerHTML += `
    <div class="listing-card">
        <img src="${item.media}"/>
        <h2>${item.title}</h2>
        <p>Current bid: <span class="current-bid">${item._count.bids} credits</span></p>
    </div>`;
        });
      }
    }

    renderListings(filteredData);
  } catch (error) {
    console.log(error);
  }
}

getListings(`${API_BASE_URL}/api/v1/auction/listings/?_seller=true`);
