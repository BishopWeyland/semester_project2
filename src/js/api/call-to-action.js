import { token } from "./storage.mjs";

const callToAction = document.querySelector(".call-to-action");

if (token) {
  callToAction.style.display = "none";
}
