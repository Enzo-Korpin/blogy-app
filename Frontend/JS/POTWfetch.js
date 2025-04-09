const img = document.querySelector(".blog-of-the-week img");
const title = document.querySelector(".blog-of-the-week-title");
const description = document.querySelector(".blog-of-the-week-text");
const author = document.querySelector(".blog-of-the-week-user-name");
const date = document.querySelector(".blog-of-the-week-date");


function checkSessionForPOTW(res) {
    if (res.redirected) {
      alert("Failed to load comments. Please try again later.");
      window.location.href = res.url;
      return true;
    }
    return false;
  }

async function fetchPostOfTheWeek() {
    try {
        const res = await fetch("/posts/postOfTheWeek");
        if (res.status === 404) {
            return;
        }
        if(checkSessionForPOTW(res)) return;
        const post = await res.json();
        img.src = post.postId.image;
        title.textContent = post.postId.title;
        description.textContent = post.postId.description;
        author.textContent = post.postId.userName || "Unknown";
        date.textContent = new Date(post.postId.createdAt).toLocaleDateString();
    } catch (err) {
        console.error("Failed to fetch post of the week:", err);
    }
}
fetchPostOfTheWeek();