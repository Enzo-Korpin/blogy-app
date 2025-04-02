
document.addEventListener("DOMContentLoaded", () => {
  // Select all edit icons
  const editIcons = document.querySelectorAll(".fa-pen-to-square");

  editIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      // Find the closest blog-card to the clicked icon
      const card = icon.closest(".blog-card");


      // Get the title and description inside that specific card
      const title = card.querySelector(".blog-title");
      const desc = card.querySelector(".blog-disc");

      // Prompt user for new values
      const newTitle = prompt("Edit title:", title.textContent);
      const newDesc = prompt("Edit content:", desc.textContent);

      // Apply changes only if user entered something
      if (newTitle !== null && newTitle.trim() !== "") {
        title.textContent = newTitle + name;

      }

      if (newDesc !== null && newDesc.trim() !== "") {
        desc.textContent = newDesc;
      }
    });
  });
});







