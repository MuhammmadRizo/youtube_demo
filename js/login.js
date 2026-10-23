const loginForm = document.querySelector("#loginForm");
const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");
const errorMessage = document.querySelector("#errorMessage");
const showButton = document.querySelector("#showButton");

showButton.addEventListener("click", () => {
  if (passwordInput.type == "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    let userInfo = {
      username: usernameInput.value,
      password: passwordInput.value,
    };

    const userLog = await axios.post(
      "https://n30-youtube-api-qys5.onrender.com/login",
      userInfo,
    );

    if (userLog.data.status == 200) {
      window.location = "../admin.html";
    }

    window.localStorage.setItem("profileImg", userLog.data.data.profileImg);
    window.localStorage.setItem("token", userLog.data.token);
  } catch (error) {
    errorMessage.textContent = "username yoki parol xato";
  }
});
