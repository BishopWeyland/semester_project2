import { token } from "./storage.mjs";

const navUl = document.querySelector(".navbar-nav");

function userMenu() {
  if (token) {
    navUl.innerHTML = `
    <li class="nav-item me-3">
      <a class="nav-link" href="create-account.html">
        <i class="fa-solid fa-user me-3"></i>Hello
      </a>
    </li>
    <li class="nav-item me-3 p-2">
      <button class="logout-button pb-2">
        <i class="fa-sharp fa-solid fa-right-from-bracket me-3"></i>Logout
      </button>
    </li>`;
  }
}

userMenu();
