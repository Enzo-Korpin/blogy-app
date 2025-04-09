const img1 = document.getElementById("avatar-img");
const btn = document.getElementById("logout-btn");
img1.addEventListener("click", () => {
  btn.classList.toggle("active");
});