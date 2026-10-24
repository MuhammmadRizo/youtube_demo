const adminWrapper = document.querySelector(".admin-wrapper");
const videosList = document.querySelector("#videosList");
const videoForm = document.querySelector("#videoForm");
const videoInput = document.querySelector("#videoInput");
const uploadInput = document.querySelector("#uploadInput");
const logoutBtn = document.querySelector("#logoutBtn");

logoutBtn.addEventListener("click", () => {
  window.location = "../login.html";

  window.localStorage.clear();
});

let token = window.localStorage.getItem("token");

if (!token) {
  window.location = "../register.html";
}

async function getVideos() {
  let file = await axios.get(
    "https://n30-youtube-api-qys5.onrender.com/files/my",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  );

  file = file.data.data;

  adminWrapper.innerHTML = null;

  for (const f of file) {
    adminWrapper.innerHTML += `
        <ul id="videosList" class="videos-list video-item">
            <video controls="true" src="${f.viewFile}"></video>
            <p class="content" contenteditable="true">${f.videoInput}</p>
            <img class="delete-icon" src="./img/delete.png" width="25">
        </ul>
    `;
  }
}


// deleteIcon.addEventListener("click", () => {
//   console.log("clicked");
// });

videoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formVideoData = new FormData();

  formVideoData.append("videoInput", videoInput.value);
  formVideoData.append("file", uploadInput.files[0]);

  const res = await axios.post(
    "https://n30-youtube-api-qys5.onrender.com/files",
    formVideoData,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  );

  console.log(res.data);

  if (res.data.status == 200) {
    getVideos();
    videoInput.value = ""
  }
});

getVideos();
