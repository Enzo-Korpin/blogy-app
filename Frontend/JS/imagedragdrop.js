const dropzone = document.getElementById("dropzone");
const input = document.getElementById("imageInput");

// Highlight border on drag over
dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzone.style.borderColor = "#3b82f6";
});

// Reset border on drag leave
dropzone.addEventListener("dragleave", () => {
  dropzone.style.borderColor = "#ccc";
});

// Handle file drop
dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropzone.style.borderColor = "#ccc";

  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    input.files = e.dataTransfer.files; // attach dropped file to hidden input
    alert("Image selected: " + file.name);
  } else {
    alert("Please drop a valid image file.");
  }
});

// Handle file browse
input.addEventListener("change", () => {
  const file = input.files[0];
  if (file) {
    alert("Image selected: " + file.name);
  }
});
