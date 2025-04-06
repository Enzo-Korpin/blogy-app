

function closeComments() {
    const container = document.querySelector(".show-comments");
    container.classList.add("hide");
    document.body.style.overflow = "auto";
}

function checkSessionForComments(res){
    if (res.redirected) {
        alert("Failed to load comments. Please try again later.");
        window.location.href = res.url; 
        return true;
      }
      return false;
}

async function showComments(postId) {
    try {

        const res = await fetch(`/comments/${postId}/comments`);
        if (checkSessionForComments(res)) return;

        
        const comments = await res.json();
        const container = document.getElementById("show-comments");
        //   const commentsContainer = document.getElementById("comments-container");

        container.innerHTML = `
        <div class="close">
                    <i class="fa-solid fa-xmark" onclick="closeComments()"></i>
        </div>
                
        `;
        if (comments.length === 0) {



            const emptyMsg = document.createElement("p");
            emptyMsg.textContent = "No comments yet.";
            emptyMsg.classList.add("no-comments");
            container.appendChild(emptyMsg);

        } else {
            comments.forEach(comment => {



                const div = document.createElement("div");
                div.className = "comment-container";
                div.innerHTML = `
                
                    <div class="place-of-comments">
                                
                                <div class="img-container">
                                    <img src=${comment.userID.pathAvatar} alt="" id="avatar-img">
                                </div>
                                <div class="place-of-usercomment">
                                    <h2 class="usernameComments">${comment.userID.userName}</h2>
                                    <p class="para-comments">${comment.text}</p>
                                </div>  
                    </div>
                            <!-- to end of {place-of-comments}-->
                    <h2 class="timeComments">${new Date(comment.createdAt).toLocaleDateString()}</h2> 
                    <hr>
                        
                `;

                container.appendChild(div);

            });
        }
        container.classList.remove("hide");
        document.body.style.overflow = "hidden";
    } catch (err) {
        alert("Failed to load comments. Please try again later.");
    }

};

//this for show comment on spec posts