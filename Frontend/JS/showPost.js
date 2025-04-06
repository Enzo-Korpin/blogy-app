//this for show user's posts


document.addEventListener("DOMContentLoaded", async () => {
  try {

    const res = await fetch("/posts/posts");
    const posts = await res.json();
    const container = document.querySelector(".blog-show");

    posts.forEach((post) => {
      const postCard = document.createElement("div");
      postCard.className = "blog-card";
      postCard.dataset.id = post._id;
      postCard.innerHTML = `
      <div class="img-test">
            <img src="${post.image}" alt="Post Image" style="width: 100%; height: 100%; border-radius: 1rem;" />
          </div>
          <h1 class="blog-title">${post.title}</h1>
  
          <div class="info">
            <div class="user-name-time">
              <h1 class="user-name-info-data">${post.userName || "Unknown"}</h1>
            </div>
            <div class="user-name-time time">
              <h1>${new Date(post.createdAt).toLocaleDateString()}</h1>
            </div>
          </div>
  
          <p class="blog-disc">${post.description}</p>
  
          <div class="blog-card-interactive">
            <div class="like">
              <i class="fa-solid fa-thumbs-up"></i>
              <h3>${post.like || 0}</h3>
            </div>
            <div class="dislike">
              <i class="fa-solid fa-thumbs-down"></i>
              <h3>${post.dislike || 0}</h3>
            </div>
            <div class="comment" onclick="showComments('${post._id}')">
                  <i class="fa-solid fa-comment"></i>
                  <h3>${post.commentCount || 0}</h3>
            </div>
          </div>
  
          <div class="edit">
            <i class="fa-solid fa-pen-to-square"></i>
            <i class="fa-solid fa-trash"></i>
          </div>
        `;

      container.appendChild(postCard);
    });
  } catch (err) {
    alert("Failed to load posts. Please try again later.");
}});

