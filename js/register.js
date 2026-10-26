const registerForm = document.querySelector("#registerForm");
const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");
const uploadInput = document.querySelector("#uploadInput");
const showButton = document.querySelector("#showButton");
const fileName = document.querySelector(".file-name");
const errorMessage = document.querySelector("#errorMessage")

uploadInput.addEventListener("change", () => {
  if (uploadInput.files && uploadInput.files.length > 0) {
    const fileName1 = uploadInput.files[0].name;
    fileName.textContent = `📄 ${fileName1}`;
  } else {
    fileName.textContent = "click upload a avatar picture";
  }
});

showButton.addEventListener("click", () => {
  if (passwordInput.type == "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("username", usernameInput.value);
    formData.append("password", passwordInput.value);
    formData.append("file", uploadInput.files[0]);

    const res = await axios.post(
      "https://n30-youtube-api.onrender.com/register",
      formData,
    );

    window.localStorage.setItem("profileImg", res.data.data.profileImg);
    window.localStorage.setItem("token", res.data.token);

    if (res.data.status == 200) {
      window.location = "../admin.html";
    }
  } catch (error) {
    errorMessage.textContent = "Bu username'ga ega foydalanuvchi majvud";
  }
});
