window.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("/users/avatar", {
            method: "GET",
            credentials: "include"
        });
        if (!res.ok) {
            throw new Error("Not authorized");
        }

        const user = await res.json();
        const avatar = document.getElementById("avatar-img");
        if (user.pathAvatar) {
            avatar.src = user.pathAvatar;
        }
    } catch (err) {
        console.error("Failed to load user:", err.message);
    }
})