document.getElementById("registerform").addEventListener("submit", async (event) => {
    event.preventDefault();
  
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
      body: JSON.stringify({ fullName, userName, password, confirmPassword }) 
    });
  
    const data = await res.json();
    if (res.ok) {
      alert("Registered successfully ✅");
      window.location.href = "/HTML/login.html";
    } else {
      alert(data.message || "Registration failed");
    }
  });
  

//this is register.js