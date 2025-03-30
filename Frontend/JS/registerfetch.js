document.getElementById("registerform").addEventListener("submit", async (event) => {
  event.preventDefault();

  const card = document.getElementById("cardError");
  const fullName = document.getElementById("fullName").value.trim();
  const userName = document.getElementById("userName").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  const res = await fetch("/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ fullName, userName, password, confirmPassword }) // No isAdmin
  });

  const data = await res.json();
  if (res.ok) {
    card.style.transform = "scale(1)";
    card.innerHTML = `Registered successfully ✅`;
    //alert("Registered successfully ✅");
    window.location.href = "/users/login";
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


//this is register.js