// ===============================
// 🧹 Utility Functions
// ===============================

function closeComments() {
    const container = document.querySelector(".show-comments");
    container.classList.add("hide");
    document.body.style.overflow = "auto";
}

function checkSessionRedirect(res, message) {
    if (res.redirected) {
        alert(message);
        window.location.href = res.url;
        return true;
    }
    return false;
}

// ===============================
// ❌ Delete User Comment
// ===============================

async function userCommentDelete(postId, commentId) {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
        const res = await fetch(`/comments/${postId}/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ commentId }),
        });

        if (checkSessionRedirect(res, "Failed to delete the post. Please try again.")) return;

        const data = await res.json();

        if (data.success) {
            alert("Comment deleted.");
            const postCard = document.querySelector(`.blog-card[data-id="${postId}"]`);
            const commentCount = postCard.querySelector(".comment h3");
            commentCount.textContent = data.commentCount 

            showComments(postId); 
        } else {
            alert(`Failed to delete comment: ${data.error || "Unknown error"}`);
        }

    } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete comment. Please try again later.");
    }
}

// ===============================
// 💬 Show Comments
// ===============================

async function showComments(postId) {
    try {
        const res = await fetch(`/comments/${postId}/comments`);
        if (checkSessionRedirect(res, "Failed to load comments. Please try again later.")) return;

        const data = await res.json();
        const comments = data.comments || [];
        const session = data.session || { userId: null, pathAvatar: "/Images/avatars/default.png" };



        const container = document.getElementById("show-comments");
        container.innerHTML = `
            <div class="close">
                <i class="fa-solid fa-xmark" onclick="closeComments()"></i>
            </div>
        `;

        // 📝 Display existing comments
        if (comments.length === 0) {
            const emptyMsg = document.createElement("p");
            emptyMsg.textContent = "No comments yet.";
            emptyMsg.classList.add("no-comments");
            container.appendChild(emptyMsg);
        } else {
            comments.forEach(comment => {
                const isOwner = comment.userID._id === session.userId;

                const div = document.createElement("div");
                div.className = "comment-container";

                div.innerHTML = `
                    <div class="place-of-comments">
                        <div class="img-container">
                            <img src="${comment.userID.pathAvatar}" alt="" id="avatar-img">
                        </div>
                        <div class="place-of-usercomment">
                            <h2 class="usernameComments">${comment.userID.userName}</h2>
                            <p class="para-comments">${comment.text}</p>
                        </div>  
                    </div>

                    <div class="time-delete">
                        <h2 class="timeComments">${new Date(comment.createdAt).toLocaleDateString()}</h2> 
                        <div class="comment-actions" id="actions-${comment._id}">
                            ${isOwner ? `
                                <i class="fa-solid fa-trash-can delete-comment" title="Delete" style="cursor: pointer; margin-right: 10px;"></i>
                            ` : ""}
                        </div>
                    </div>
                    <hr>
                `;

                container.appendChild(div);

                // 🔥 Bind delete if owner
                if (isOwner) {
                    const deleteBtn = div.querySelector(".delete-comment");
                    if (deleteBtn) {
                        deleteBtn.addEventListener("click", () => {
                            userCommentDelete(postId, comment._id);
                        });
                    }
                }
            });
        }

        // ➕ Add Comment Form
        const addCommentForm = document.createElement("div");
        addCommentForm.className = "add-comment";
        addCommentForm.innerHTML = `
            <div class="img-container">
                <img src="${session.pathAvatar}" alt="" id="avatar-img">
            </div>
            <input type="text" placeholder="Add a comment..." id="comment-input">
            <button id="add-comment-btn">Add</button>
        `;
        container.appendChild(addCommentForm);

        // 🧠 Add Comment Logic
        const input = addCommentForm.querySelector("#comment-input");
        const btn = addCommentForm.querySelector("#add-comment-btn");

        btn.addEventListener("click", async () => {
            const text = input.value.trim();
            if (!text) return alert("Write something!");

            try {
                const res = await fetch(`/comments/${postId}/comments`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text }),
                });

                if (checkSessionRedirect(res, "Failed to add comment. Please try again.")) return;

                const data = await res.json();

                if (data.comment) {
                    input.value = "";
                    const postCard = document.querySelector(`.blog-card[data-id="${postId}"]`);
                    const commentCount = postCard.querySelector(".comment h3");
                    const currentCount = parseInt(commentCount.textContent);
                    commentCount.textContent = currentCount + 1;

                    showComments(postId);
                } else {
                    alert("Failed to add comment.");
                }

            } catch (err) {
                console.error("Error adding comment:", err);
                alert("Server error.");
            }
        });

        // Show Comments Section
        container.classList.remove("hide");
        document.body.style.overflow = "hidden";

    } catch (err) {
        console.error("💥 ERROR in showComments:", err);
        alert("Failed to load comments. Please try again later.");
    }
}
