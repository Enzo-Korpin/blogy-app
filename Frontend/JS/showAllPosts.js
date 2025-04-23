
//this for show all posts
function checkSessionForInteract(res) {
  if (res.redirected) {
    alert("Failed to interact with the post. Please try again later.");
    window.location.href = res.url;
    return true;
  }
  return false;
}




async function likePost(postId) {
  const res = await fetch(`/posts/interact/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "like" }),
  })
  if (checkSessionForInteract(res)) return;
  const data = await res.json();
  const postCard = document.querySelector(`.blog-card[data-id="${postId}"]`);
  const likeIcon = postCard.querySelector(".like i");
  const dislikeIcon = postCard.querySelector(".dislike i");
  const likeCount = postCard.querySelector(".like h3");
  const dislikeCount = postCard.querySelector(".dislike h3");

  if (data.likeStyle) {
    likeIcon.classList.add("liked");
    dislikeIcon.classList.remove("disliked");
  } else {
    likeIcon.classList.remove("liked");
  }
  likeCount.textContent = data.likeCount;
  dislikeCount.textContent = data.dislikeCount;


}
async function dislikePost(postId) {
  const res = await fetch(`/posts/interact/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "dislike" }),
  })
  if (checkSessionForInteract(res)) return;
  const data = await res.json();
  const postCard = document.querySelector(`.blog-card[data-id="${postId}"]`);
  const likeIcon = postCard.querySelector(".like i");
  const dislikeIcon = postCard.querySelector(".dislike i");
  const likeCount = postCard.querySelector(".like h3");
  const dislikeCount = postCard.querySelector(".dislike h3");

  if (data.dislikeStyle) {
    dislikeIcon.classList.add("disliked");
    likeIcon.classList.remove("liked");
  } else {
    dislikeIcon.classList.remove("disliked");
  }
  dislikeCount.textContent = data.dislikeCount;
  likeCount.textContent = data.likeCount;
}



document.addEventListener("DOMContentLoaded", async () => {
  try {

    const res = await fetch("/posts/home");
    if (checkSessionForInteract(res)) return;
    const posts = await res.json();

    const container = document.querySelector(".blog-wrapper");
    const section = document.querySelector(".section-3");
    if (posts.some(post => post.admin)) {
      console.log("Admin is true in at least one post");

      const divAdmin = document.createElement("div");
      divAdmin.className = "adminDiv";
      divAdmin.innerHTML = "<button class='adminBtn'>Go to Admin</button>";
      section.parentNode.insertBefore(divAdmin, section);
      const adminBtn = document.querySelector(".adminBtn");

      adminBtn.addEventListener("click", () => {
        window.history.replaceState({}, document.title, "/admin/adminPage");
        window.location.href = "";
      });
    }

    posts.forEach((post) => {

      const postCard = document.createElement("div");
      postCard.className = "blog-card";
      postCard.dataset.id = post._doc._id;
      postCard.innerHTML = `
            <div class="blog-card-image">
                    <img src="${post._doc.image}" title="click to see full img" class="zoomable-image" loading="lazy" alt="Post Image"   />
            </div>
    
            <h1 class="blog-card-title">${post._doc.title}</h1>
    
            <div class="wrap-user-name-date">
                <div class="blog-card-user-name">${post._doc.userName || "Unknown"}</div>
                <div class="blog-card-date">${new Date(post._doc.createdAt).toLocaleDateString()}</div>
            </div>
              
            <p class="blog-card-text">${post._doc.description}</p>
      
            <div class="blog-card-interactive">
                <div class="like" onclick="likePost('${post._doc._id}')">
                    <i class="fa-solid fa-thumbs-up ${post.likedByCurrentUser ? "liked" : ""}"></i>
                    <h3>${post._doc.like.length || 0}</h3>
                </div>
                <div class="dislike" onclick="dislikePost('${post._doc._id}')">
                    <i class="fa-solid fa-thumbs-down ${post.dislikedByCurrentUser ? "disliked" : ""}"></i>
                    <h3>${post._doc.dislike.length || 0}</h3>
                </div>
                <div class="comment" onclick="showComments('${post._doc._id}')">
                      <i class="fa-solid fa-comment"></i>
                      <h3>${post._doc.commentCount || 0}</h3>
                </div>
            </div>
                `;

      container.appendChild(postCard);
    });
  } catch (err) {
    console.error(err)
    alert("Failed to load posts. Please try again later.");
  }
});
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", function(e) {
    if (e.target.classList.contains("zoomable-image")) {
      const overlay = document.getElementById("img-zoom-overlay");
      const zoomImg = document.getElementById("img-zoom-big");
      zoomImg.src = e.target.src; 
      overlay.style.display = "flex";
    }
  });

  document.getElementById("img-zoom-overlay").addEventListener("click", function() {
    this.style.display = "none";
    document.getElementById("img-zoom-big").src = "";
  });
});

//this for show all posts

