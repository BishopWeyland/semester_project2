import { token } from "./storage.mjs";

const navUl = document.querySelector(".navbar-nav");

function menuWithoutToken() {
  if (!token || token === undefined) {
    navUl.innerHTML = `
<li class="nav-item me-3">
  <a class="nav-link" href="login.html">
    <i class="fa-sharp fa-solid fa-right-to-bracket me-3"></i>Login
  </a>
</li>
<li class="nav-item me-3">
  <a class="nav-link" href="create-account.html">
    <i class="fa-solid fa-user me-3"></i>Create account
  </a>
</li>`;
  }
}

menuWithoutToken();
