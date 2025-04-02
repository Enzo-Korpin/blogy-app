const avatarLabel = document.getElementById("avatar-upload");
const img = document.getElementById("avatar-upload-img");

avatarLabel.addEventListener("change", function () {
    const file = this.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    img.src = imageUrl;
  }
});