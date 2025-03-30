document.getElementById("loginform").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission
    
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
        window.location.href = "/HTML/post.html";
    } else {
        alert(data.error); // Show error message
    }
});

//this is loginfetch.js