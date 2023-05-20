import { id } from "./single-listing.js";
import { API_BASE_URL } from "./baseurl.js";
import { token, credits } from "./storage.mjs";

const bidForm = document.getElementById("bid-form");

if (!token) {
  bidForm.style.display = "none";
}

const makeBid = async (url, data) => {
  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 400) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
    throw new Error(`Error making bid: ${error.message}`);
  } finally {
    document.getElementById("bid-input").value = "";
    const message =
      response && response.status === 400
        ? "You need to place a bid that is higher than the current bid!"
        : "Your bid has been placed!";
    alert(message);
  }
};

bidForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const bidValue = Number(document.getElementById("bid-input").value);

  if (bidValue >= 1 && bidValue <= credits) {
    const postData = { amount: bidValue };
    const bidUrl = `${API_BASE_URL}/api/v1/auction/listings/${id}/bids`;
    try {
      const response = await makeBid(bidUrl, postData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  } else {
    alert(`Please enter a bid between 1 and ${credits}.`);
  }
});
