//this for show all posts


document.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch("/posts/home");
    const posts = await res.json();
    const container = document.querySelector(".blog-wrapper");

    posts.forEach((post) => {
        const postCard = document.createElement("div");
        postCard.className = "blog-card";
        postCard.dataset.id = post._id;
        postCard.innerHTML = `
        <div class="blog-card-image">
                <img src="${post.image}" alt="Post Image"  style="width: 100%; height: 100%;" />
        </div>

        <h1 class="blog-card-title">${post.title}</h1>

        <div class="wrap-user-name-date">
            <div class="blog-card-user-name">${post.userName || "Unknown"}</div>
            <div class="blog-card-date">${new Date(post.createdAt).toLocaleDateString()}</div>
        </div>
          
        <p class="blog-card-text">${post.description}</p>
  
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
            `;

        container.appendChild(postCard);
    });
});

//this for show all posts

