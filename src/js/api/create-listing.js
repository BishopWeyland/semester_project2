import { checkLength } from "./form-validation.mjs";
import { API_BASE_URL } from "./baseurl.js";
import { token } from "./storage.mjs";

async function createListing(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    const json = await response.json();
    return json;
  } catch (error) {
    alert("We are sorry an error had occured!", error);
  } finally {
    submitListing.reset();
    location.reload();
  }
}

const submitListing = document.querySelector("#submit-listing");

submitListing.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = submitListing.title.value.trim();
  const imageURL = submitListing.media.value.trim();
  const deadline = submitListing.deadline.value.trim();
  const description = submitListing.description.value.trim();

  if (!checkLength(title, 5)) {
    alert("Username needs to be atleast 5 characters!");
    return;
  }

  if (!checkLength(description, 20)) {
    alert("Description needs to be atleast 20 characters!");
    return;
  }

  const currentDate = new Date();
  const selectedDate = new Date(deadline);

  if (selectedDate <= currentDate) {
    alert("Please select a future date for the deadline.");
    return;
  }

  const listingData = {
    title: title,
    media: [imageURL],
    endsAt: deadline,
    description: description,
  };

  createListing(`${API_BASE_URL}/api/v1/auction/listings`, listingData);
});
