const avatarLabel = document.getElementById("imageInput");
const img = document.getElementById("dropzone-img");

avatarLabel.addEventListener("change", function () {
    const file = this.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    img.src = imageUrl;
  }
});