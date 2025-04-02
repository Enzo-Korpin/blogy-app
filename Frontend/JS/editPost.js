//this is for edit post

document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("fa-pen-to-square")){
      const card = e.target.closest(".blog-card");
      const titleEl = card.querySelector(".blog-title");
      const descEl = card.querySelector(".blog-disc");  
      
      const oldTitle = titleEl.textContent;
      const oldDesc = descEl.textContent;
  
      const titleInput = document.createElement("input");
      titleInput.value = oldTitle;
  
      const descInput = document.createElement("textarea");
      descInput.value = oldDesc;
  
      titleEl.replaceWith(titleInput);
      descEl.replaceWith(descInput);
  
      const saveBTn = document.createElement("button");
      saveBTn.textContent = "Save";
      saveBTn.className = "save-btn";
  
  
      card.appendChild(saveBTn);
      saveBTn.addEventListener("click", async () => {
        const newTitle = titleInput.value;
        const newDesc = descInput.value;
        const postId = card.dataset.id;
        console.log(postId)
        const res = await fetch(`/posts/posts/${postId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: newTitle, description: newDesc }),
        });
  
        const data = await res.json();
        
        if (res.ok && data.post) {
          const newTitleEl = document.createElement("h1");
          newTitleEl.className = "blog-title";
          newTitleEl.textContent = data.post.title;
  
          const newDescEl = document.createElement("p");
          newDescEl.className = "blog-disc";
          newDescEl.textContent = data.post.description;
          
          titleInput.replaceWith(newTitleEl);
          descInput.replaceWith(newDescEl);
          
          saveBTn.remove();
        } else {
          alert(data.message);
        }
      });
    }
  })
  
  
  