function checkSessionForInteract(res) {
    if (res.redirected) {
        alert("Failed to load comments. Please try again later.");
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

window.addEventListener("DOMContentLoaded", () => {
    const posts = JSON.parse(localStorage.getItem('searchResults'));
    const container = document.querySelector(".blog-wrapper-search");

    if (!posts || posts.length === 0) {
        container.innerHTML = "<h2>No Posts Found</h2>";
        return;
    }


    posts.forEach((post) => {
        const postCard = document.createElement("div");
        postCard.className = "blog-card";
        postCard.dataset.id = post._doc._id;
        postCard.innerHTML = `
            <div class="blog-card-image">
                    <img src="${post._doc.image}" loading="lazy" alt="Post Image"  style="width: 100%; height: 100%;" />
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


    localStorage.removeItem('searchResults');
});
