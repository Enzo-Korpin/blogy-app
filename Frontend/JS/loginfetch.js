window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("expired") === "true") {
    alert("Your session has expired, please log in again.");
    window.history.replaceState({}, document.title, "/users/login");

  }
});
document.getElementById("loginform").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the default form submission
  const card = document.getElementById("cardError");

  const userName = document.getElementById("userName").value.trim();
  const password = document.getElementById("password").value.trim();



  const res = await fetch("/users/login", {



    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ userName, password }),
  });

  const data = await res.json();
  if (res.ok) {
    window.location.href = "/users/post";
  } else if (Array.isArray(data.messages)) {
    let ul = document.createElement("ul")

    data.messages.forEach((e) => {
      let li = document.createElement("li")
      li.textContent = e;
      ul.appendChild(li);



    })
    card.style.transform = "scale(1)";
    card.innerHTML = ""
    card.appendChild(ul)
  }
});

//this is loginfetch.js