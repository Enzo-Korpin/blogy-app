

function closeComments() {
    const container = document.querySelector(".show-comments");
    container.classList.add("hide");    
    document.body.style.overflow = "auto";
}    

async function showComments(postId) {

    const res = await fetch(`/comments/${postId}/comments`);
    const comments = await res.json();
    console.log(comments);
    const container = document.getElementById("show-comments");
    //   const commentsContainer = document.getElementById("comments-container");

    //   commentsContainer.innerHTML = "";
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
    container.classList.remove("hide");
    document.body.style.overflow = "hidden";

};
    
//this for show comment on spec posts