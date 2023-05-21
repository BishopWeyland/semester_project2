import { checkLength, validateEmail } from "./form-validation.mjs";
import { API_BASE_URL } from "./baseurl.js";

async function registerUser(url, data) {
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
    return json;
  } catch (error) {
    alert("We are sorry an error has occured!", error);
  } finally {
    window.location.href = "login.html";
  }
}

const createUser = document.querySelector("#create-user-form");

createUser.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = createUser.username.value.trim();
  const email = createUser.email.value.trim();
  const avatar = createUser.avatar.value.trim();
  const password = createUser.password.value.trim();

  if (!checkLength(username, 5)) {
    alert("Username needs to be atleast 5 characters!");
    return;
  }

  if (!checkLength(password, 8)) {
    alert("Password needs to be atleast 8 characters!");
    return;
  }
  if (!validateEmail(email)) {
    alert("You must use a noroff e-mail!");
    return;
  }

  const userData = {
    name: username,
    email: email,
    avatar: avatar,
    password: password,
  };

  registerUser(`${API_BASE_URL}/api/v1/auction/auth/register`, userData);
});
