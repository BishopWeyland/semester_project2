import { API_BASE_URL } from "./baseurl.js";
import { token } from "./storage.mjs";
import { getCurrentBid } from "./curren-bids.js";

export { id };

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const listingImg = document.querySelector(".listing-img");
const listingContent = document.querySelector(".listing-content");
const title = document.querySelector("title");

const getListing = async function (url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const item = await res.json();

    const allBids = item.bids;

    const currentBid = getCurrentBid(allBids);

    const timestamp = item.endsAt;
    const date = new Date(timestamp);
    const now = new Date();

    let timer;

    if (now > date) {
      timer = `<p class="timer">The time has run out</p>`;
      const bidForm = document.getElementById("bid-form");
      bidForm.style.display = "none";
    } else {
      const diff = date - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();

      timer = `<p>Time left: <span class="timer">${days} days, ${hours} hours, ${minutes} minutes.</span></p>`;
    }

    const viewBids = document.querySelector(".view-bids");

    if (item.bids.length === 0) {
      viewBids.innerHTML = "<p>No bids for this item.</p>";
    } else {
      for (let i = 0; i < item.bids.length; i++) {
        viewBids.innerHTML += `
      <div class="bids-info">
        <p class="me-5">Amount: <span class="current-bid">${item.bids[i].amount} credits</span></p>
        <p>Bidder: <a href="profile.html?name=${item.bids[i].bidderName}" class="seller-link">${item.bids[i].bidderName}</a></p>
      </div>`;
      }
    }

    const fallbackImage = "../../images/undraw_snap_the_moment_re_88cu.svg";

    listingImg.innerHTML = `<img src="${item.media}" onerror="this.src='${fallbackImage}'"/>`;
    listingContent.innerHTML = `
<div class="listing-description mb-5">
    <h1>${item.title}</h1>
    <p>${item.description}</p>
</div>
<div class="listing-info">
    <p>Current bid: <span class="current-bid">${currentBid}</span></p>
    ${timer}
    <p>Seller: <a href="profile.html?name=${item.seller.name}" class="seller-link">${item.seller.name}</a></p>
</div>
`;
    title.innerHTML = `${item.title} | QuickBids`;
  } catch (error) {
    alert(error);
  }
};

getListing(
  `${API_BASE_URL}/api/v1/auction/listings/${id}/?_seller=true&_bids=true`
);
