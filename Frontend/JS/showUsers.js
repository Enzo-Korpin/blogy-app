function checkSessionForAdmin(res) {
    if (res.redirected) {
        alert("Failed to load comments. Please try again later.");
        window.location.href = res.url;
        return true;
    }
    return false;
}

async function block(userId) {
    try {

        if (!confirm("Are you sure you want to Block this User?")) return;

        const res = await fetch(`/admin/block/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (checkSessionForAdmin(res)) return;
        const data = await res.json();
        if (!res.ok) {
            alert("Failed to block user. Please try again later.");
            return;
        }
        if (data.isBlocked === false) {
            alert("User is already blocked.");
            return;
        }
        alert("User blocked successfully.");
        window.location.reload();
    } catch (err) {
        alert("Failed to block user. Please try again later.");
    }
}

async function unblock(userId) {
    try {

        if (!confirm("Are you sure you want to Unblock this User?")) return;

        const res = await fetch(`/admin/unblock/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (checkSessionForAdmin(res)) return;
        const data = await res.json();
        if (!res.ok) {
            alert("Failed to unblock user. Please try again later.");
            return;
        }
        if (data.isBlocked === true) {
            alert("User is already unblocked.");
            return;
        }

        alert("User unblocked successfully.");
        window.location.reload();
    } catch (err) {
        alert("Failed to unblock user. Please try again later.");
    }
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
                <h1 class="git-info">${new Date(user.createdAt).toLocaleDateString()}</h1>
                <a href="/admin/userposts?userId=${user.userId}">See all posts</a>
                ${user.isBlocked ? `<h1 class="block-${user.userId}">Unblock</h1>
                <button class="block-btn-${user.userId}" onclick="unblock('${user.userId}')">
                    <i class="fa-solid fa-user-check"></i>
                </button>`
                :
                `<h1 class="block-${user.userId}">Block</h1>
                <button class="block-btn-${user.userId}" onclick="block('${user.userId}')">
                    <i class="fa-solid fa-user-xmark"></i>
                </button>`}
            </div>
        `;
        main.appendChild(info);
    });

})