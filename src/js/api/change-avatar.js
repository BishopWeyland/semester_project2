import { API_BASE_URL } from "./baseurl.js";
import { token, userName } from "./storage.mjs";

const changeAvatar = async (url, data) => {
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
    const json = await res.json();
    return json;
  } catch (error) {
    alert(error);
    throw error;
  } finally {
    changeImg.reset();
    location.reload();
  }
};

const changeImg = document.querySelector("#change-avatar");
const avatar = document.querySelector("#avatar");

changeImg.addEventListener("submit", (e) => {
  e.preventDefault();
  const postData = {
    avatar: avatar.value,
  };

  changeAvatar(
    `${API_BASE_URL}/api/v1/auction/profiles/${userName}/media`,
    postData
  );
});
