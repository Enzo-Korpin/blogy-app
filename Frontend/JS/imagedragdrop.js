const dropzone = document.getElementById("dropzone");
const input = document.getElementById("imageInput");
const form = document.querySelector("form");

dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzone.style.borderColor = "#3b82f6";
});

dropzone.addEventListener("dragleave", () => {
  dropzone.style.borderColor = "#ccc";
});

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropzone.style.borderColor = "#ccc";

  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    input.files = e.dataTransfer.files; 
    alert("Image selected: " + file.name);
  } else {
    alert("Please drop a valid image file.");
  }
});

form.addEventListener("submit", async(e) => {
  console.log("im in submit")
  e.preventDefault(); // Prevent form submission for demonstration purposes
 
  const title = document.getElementById("title").value;
  const description = document.getElementById("content").value;
  const image = input.files[0];

  if(!title || !description){
    alert("Please fill in all fields.");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("imageInput", image);



const res = await fetch("/posts/create", {
  

  method: "POST",
  credentials: "include",
  body: formData,
});
console.log("im in fetch")
const data = await res.json();
if (res.ok) {
  alert("Post created successfully!");
  window.location.href = "/users/dashBoard";

} else {
    alert(data.message || "Error creating post.");
  }
});


//this is imagedragdrop.js
