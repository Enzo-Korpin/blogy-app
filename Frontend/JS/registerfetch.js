document.getElementById("registerform").addEventListener("submit", async (event) => {
  event.preventDefault();

  const card = document.getElementById("cardError");
  const form = document.getElementById("registerform");

  const formData = new FormData(form);

  try{

    const res = await fetch("/users/register", {
      method: "POST",
      body: formData,
      credentials: "include",
  
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
  }catch(err){
    alert("An error occurred while registering. Please try again.");
  }


});

// this is updateAVatar to update the avatar image in the register page

//this is register.js