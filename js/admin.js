const adminWrapper = document.querySelector(".admin-wrapper");
const videosList = document.querySelector("#videosList");
const videoForm = document.querySelector("#videoForm");
const videoInput = document.querySelector("#videoInput");
const uploadInput = document.querySelector("#uploadInput");
const logoutBtn = document.querySelector("#logoutBtn");
const fileName = document.querySelector(".file-name");

uploadInput.addEventListener("change", () => {
  if (uploadInput.files && uploadInput.files.length > 0) {
    const fileName1 = uploadInput.files[0].name;
    fileName.textContent = `📂 ${fileName1}`;
  } else {
    fileName.textContent = "click upload a video";
  }
});

logoutBtn.addEventListener("click", () => {
  window.location = "../login.html";

  window.localStorage.clear();
});

let token = window.localStorage.getItem("token");

if (!token) {
  window.location = "../register.html";
}

async function getVideos() {
  let file = await axios.get("https://n30-youtube-api.onrender.com/files/my", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  file = file.data.data;

  adminWrapper.innerHTML = "";
  for (const f of file) {
    adminWrapper.innerHTML += `
      <ul id="videosList" class="videos-list video-item">
        <video controls="true" src="${f.viewFile}"></video>
        <p class="content">${f.videoInput}</p>
        <div class="videoControlIcons">
          <img class="delete-icon" src="./img/delete.png" width="25">
          <img class="edit-icon" src="./img/edit.png" width="25"/>
        </div>
      </ul>
    `;

    console.log(f.fileId);
  }
  const deleteIcons = adminWrapper.querySelectorAll(".delete-icon");
  const allContents = adminWrapper.querySelectorAll(".content");

  deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener("click", () => {
      console.log("clicked");
    });
  });

  allContents.forEach((classItem) => {
    console.log(classItem.textContent);
  });
}

videoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formVideoData = new FormData();

  formVideoData.append("videoInput", videoInput.value);
  formVideoData.append("file", uploadInput.files[0]);

  const res = await axios.post(
    "https://n30-youtube-api.onrender.com/files",
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
    videoInput.value = "";
    uploadInput.value = "";
    fileName.textContent = "click upload a video";
  }
});

getVideos();
