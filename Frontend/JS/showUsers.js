function checkSessionForAdmin(res) {
    if (res.redirected) {
        alert("Failed to load comments. Please try again later.");
        window.location.href = res.url;
        return true;
    }
    return false;
}



document.addEventListener("DOMContentLoaded", async () => {

    const res = await fetch("/admin/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (checkSessionForAdmin(res)) return;
    if (!res.ok) {
        alert("No users found.");
        return;
    }
    const users = await res.json();
    users.forEach(user => {
        
        const main = document.querySelector(".show");
        const info = document.createElement("div");
        info.className = "info";
        info.innerHTML = `
            <div class="user-info">
                <h1 class="info-user">User:</h1>
                <h1 class="git-info">${user.userName}</h1>
                <h1 class="info-user">Posts:</h1>
                <h1 class="git-info">${user.numberOfPosts}</h1>
                <h1 class="info-user">Created in:</h1>
                <h1 class="git-info">${user.createdAt}</h1>
                <a href="#">See all posts</a> 
                <h1 class="block">Block him</h1>
                <i class="fa-solid fa-user-xmark"></i>
            </div>
        `;
        main.appendChild(info);
    });

})