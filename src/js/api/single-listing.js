import { API_BASE_URL } from "./baseurl.js";
import { token } from "./storage.mjs";

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
    console.log(item);

    const allBids = item.bids;

    let currentBid = 0;

    for (let i = 0; i < allBids.length; i++) {
      const obj = allBids[i];
      if (obj.amount > currentBid) {
        currentBid = obj.amount;
      }
    }

    const timestamp = item.endsAt;
    const date = new Date(timestamp);
    const now = new Date();

    let timer;

    if (now > date) {
      timer = `<p class="timer">The time has run out</p>`;
    } else {
      const diff = date - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();

      timer = `<p>Time left: <span class="timer">${days} days, ${hours} hours, ${minutes} minutes.</span></p>`;
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
    <p>Seller: <a href="" class="seller-link">${item.seller.name}</a></p>
</div>
`;
    title.innerHTML = `${item.title} | QuickBids`;
  } catch (error) {
    console.log(error);
  }
};

getListing(
  `${API_BASE_URL}/api/v1/auction/listings/${id}/?_seller=true&_bids=true`
);
