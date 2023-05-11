const logout = document.querySelector(".logout-button");

logout.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "index.html";
});
