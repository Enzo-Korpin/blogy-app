function checkSessionForInteract(res) {
    if (res.redirected) {
        alert("Failed to load comments. Please try again later.");
        window.location.href = res.url;
        return true;
    }
    return false;
}



window.addEventListener("DOMContentLoaded", async () => {
    const form2 = document.getElementById("search-form");
    const searchInput = document.getElementById("searchInput");

    form2.addEventListener("submit", async function (e) {
        e.preventDefault();
        const searchQuery = searchInput.value.trim();
        const res = await fetch(`/posts/search?q=${searchQuery}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (checkSessionForInteract(res)) return;
        const posts = await res.json();
        localStorage.setItem('searchResults', JSON.stringify(posts));
        window.location.href = "/posts/searchPage";
    });
});