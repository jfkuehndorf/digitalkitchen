document.addEventListener("DOMContentLoaded", function () {
  fetch("./profile-data.json") // Make sure this path is correct!
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Loaded data:", data);

      const profileSection = document.querySelector(".profile-section");
      if (!profileSection) {
        console.log("Profile section container not found");
        return;
      }

      const profileDetails = `
        <div class="profile-details">
          <div class="profile-image">
            <img src="${data.profile.image}" alt="Profile Picture" style="width: 100%; height: 100%; border-radius: 50%">
          </div>
          <h2 class="profile-name">${data.profile.name}</h2>
          <p class="profile-info">${data.profile.info}</p>
                    <div class="settings-dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Settings
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a class="dropdown-item" href="#">Edit Profile</a></li>
              <li><a class="dropdown-item" href="#">Account Settings</a></li>
              <li><a class="dropdown-item" href="#">Log Out</a></li>
            </ul>
          </div>
        </div>
      `;

      const posts = data.posts
        .map(
          (post) => `
        <div class="post-card">
          <div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-content">${post.content}</p>
          </div>
          <img src="${post.image}" alt="img">
          <button class="btn btn-primary">Read More</button>
        </div>
      `
        )
        .join("");

      profileSection.innerHTML =
        profileDetails +
        `<div class="posts-section">
            <div class="posts-top">
          <div class="item"></div>
          <h2 class="item">Your Posts</h2>
          <a href="../community/community.html"><button class="item">
            <img
              src="https://cdn.glitch.global/b1ffc2c1-b0c6-42f1-8269-ef8e4ae6c4b9/1535273-200.png?v=1714010414612"
              alt="post"
            />
            <p>
              New Post
            </p>
          </button></a>
        </div>` +
        posts +
        "</div>";
    })
    .catch((error) => {
      console.error("Error loading profile data:", error);
    });
});
