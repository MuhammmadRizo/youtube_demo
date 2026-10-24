const headerRight = document.querySelector(".header-right");
const navbarList = document.querySelector(".navbar-list");
const iframesWrapper = document.querySelector(".iframes-wrapper");
const iframesList = document.querySelector(".iframes-list");
const homeButton = document.querySelector("#homeButton");

let profileImg = window.localStorage.getItem("profileImg");

async function getAllUser() {
  let users = await axios.get(
    "https://n30-youtube-api-qys5.onrender.com/users",
  );
  users = users.data.data;

  for (const user of users) {
    navbarList.innerHTML += `
        <li class="channel" onclick="getAllVideos(${user.userId})">
            <a href="#">
                <img src="${user.profileImg}" alt="channel-icon" width="30px" height="30px">
                <span>${user.username}</span>
            </a>
        </li>
    `;
    // user click boganda userId va videodagi userId bir birga teng bo'sa chiqishi kerak
  }
}

async function getAllVideos(selectedUser = null) {
  let allVideos = await axios.get(
    "https://n30-youtube-api-qys5.onrender.com/files",
  );
  allVideos = allVideos.data.data;

  if (selectedUser) {
    allVideos = allVideos.filter(
      (video) => String(video.user.userId) === String(selectedUser),
    );
  }

  iframesList.innerHTML = null;

  if (allVideos.length === 0) {
    iframesList.innerHTML = `<h2 style="padding: 20px;">Bu foydalanuvchi videolar yuklamagan</h2>`;
    return;
  }

  for (const video of allVideos) {
    iframesList.innerHTML += `
        <li class="iframe" data-id=${video.user.userId}>
            <video src="${video.viewFile}" controls=""></video>
            <div class="iframe-footer">
                <img src="${video.user.profileImg}" alt="channel-icon">
                <div class="iframe-footer-text">
                    <h3 class="channel-name">${video.videoInput}</h3>
                    <h2 class="iframe-title">${video.user.username}</h2>
                    <time class="uploaded-time">${video.data} | ${new Date().toLocaleTimeString()}</time>
                    <a class="download" href="#">
                        <span>${video.size} MB</span>
                        <img src="./img/download.png">
                    </a>
                </div>
            </div>
        </li>
    `;
  }
}

headerRight.innerHTML += `
    <a id="list" href=${profileImg ? "../admin.html" : "./register.html"}>
        <img class="avatar-img" src="${profileImg ? profileImg : "./img/avatar.jpg"}" alt="avatar-img" width="32px" height="32px">
    </a>
`;

getAllUser();
getAllVideos();
