import { API_BASE_URL } from "./baseurl.js";
import { checkLength, validateEmail } from "./form-validation.mjs";

async function login(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    const json = await response.json();
    const accessToken = json.accessToken;
    localStorage.setItem(`accessToken`, accessToken);
    localStorage.setItem(`name`, json.name);
    localStorage.setItem(`credits`, json.credits);
    if (accessToken) {
      window.location.href = "index.html";
    }
    return json;
  } catch (error) {
    alert("We are sorry an error had occured!", error);
  }
}

const loginUser = document.querySelector("#login-form");

loginUser.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginUser.email.value.trim();
  const password = loginUser.password.value.trim();

  if (!checkLength(password, 8)) {
    alert("Password needs to be atleast 5 characters!");
    return;
  }
  if (!validateEmail(email)) {
    alert("You must use a noroff e-mail!");
    return;
  }

  const userData = {
    email: email,
    password: password,
  };

  login(`${API_BASE_URL}/api/v1/auction/auth/login`, userData);
});
