import { id } from "./single-listing.js";
import { API_BASE_URL } from "./baseurl.js";
import { token } from "./storage.mjs";

const bidForm = document.getElementById("bid-form");

if (!token) {
  bidForm.style.display = "none";
}

const makeBid = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
    throw new Error(`Error making bid: ${error.message}`);
  } finally {
    document.getElementById("bid-input").value = "";
  }
};

bidForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const bidValue = Number(document.getElementById("bid-input").value);

  if (bidValue >= 1 && bidValue <= 1000) {
    const postData = { amount: bidValue };
    const bidUrl = `${API_BASE_URL}/api/v1/auction/listings/${id}/bids`;
    try {
      const response = await makeBid(bidUrl, postData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("Please enter a bid between 1 and 1000.");
  }
});
