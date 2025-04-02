//this is for delete post

document.addEventListener("click", async (e) => {
    if(e.target.classList.contains("fa-trash")){
      const card = e.target.closest(".blog-card");
      const postId = card.dataset.id;
  
      const confirmDelete = confirm("Are you sure you want to delete this post?");
      if(!confirmDelete){
        return;
      }
      const res = await fetch(`/posts/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });
      
      const data = await res.json();
  
      if(res.ok){
        card.remove();
        alert("Post deleted successfully.");
      }else{
        alert(data.message);
      }
    }
  })