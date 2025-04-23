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
    const tbody = document.querySelector(".table-user tbody")
    users.forEach(user => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${user.userName}</td>
        <td>${user.numberOfPosts}</td>
        <td>${new Date(user.createdAt).toLocaleDateString()}</td>
        <td><a href="/admin/userposts?userId=${user.userId}">See all posts</a></td>
        <td>
            <div>
                <h1 class="block-${user.userId} ${user.isBlocked ? "not-safe" : "safe"} " >${user.isBlocked ? 'Unblock' : 'Block'}</h1>
                <button class="block-btn-${user.userId}" onclick="${user.isBlocked ? `unblock('${user.userId}')` : `block('${user.userId}')`}">
                    <i class="fa-solid ${user.isBlocked ? 'fa-user-check' : 'fa-user-xmark'}"></i>
                </button>
            </div>
          
        </td>
      `;

        tbody.appendChild(tr);
    })
});
