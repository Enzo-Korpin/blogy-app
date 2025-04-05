const img = document.getElementById("avatar-img");
const btn = document.getElementById("logout-btn");
img.addEventListener("click", () => {
  btn.classList.toggle("active");
});