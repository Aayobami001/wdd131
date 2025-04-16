// Elements
const quizForm = document.querySelector("#plantForm");
const suggestionBox = document.querySelector("#suggestion");
const quizBtn = document.querySelector("#plantQuizBtn");

// Plant data (using object & array)
const plantSuggestions = [
  {
    sun: "full",
    space: "large",
    name: "Tomatoes",
    tip: "They love sunlight and need room to grow in containers or bags."
  },
  {
    sun: "partial",
    space: "small",
    name: "Mint",
    tip: "Perfect for windowsills or buckets. Grows fast!"
  },
  {
    sun: "full",
    space: "small",
    name: "Pepper",
    tip: "Thrives in sunny buckets or sacks. Very Naija-friendly."
  },
  {
    sun: "partial",
    space: "large",
    name: "Fluted Pumpkin (Ugu)",
    tip: "Great for raised beds and shaded balconies."
  }
];

// Open form section when CTA is clicked
if (quizBtn) {
  quizBtn.addEventListener("click", () => {
    document.querySelector(".plant-finder").scrollIntoView({ behavior: "smooth" });
  });
}

// Handle form submit
if (quizForm) {
  quizForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const sun = quizForm.elements["sun"].value;
    const space = quizForm.elements["space"].value;

    // Save to localStorage
    localStorage.setItem("sun", sun);
    localStorage.setItem("space", space);

    // Find plant suggestion
    const match = plantSuggestions.find(
      (plant) => plant.sun === sun && plant.space === space
    );

    // Output result
    if (match) {
      suggestionBox.innerHTML = `
        <h4>We recommend: ${match.name}</h4>
        <p>${match.tip}</p>
      `;
    } else {
      suggestionBox.innerHTML = `
        <h4>No match found</h4>
        <p>Try a different combination.</p>
      `;
    }
  });

  // Load from localStorage on page load
  window.addEventListener("DOMContentLoaded", () => {
    const savedSun = localStorage.getItem("sun");
    const savedSpace = localStorage.getItem("space");

    if (savedSun && savedSpace) {
      quizForm.elements["sun"].value = savedSun;
      quizForm.elements["space"].value = savedSpace;

      const match = plantSuggestions.find(
        (plant) => plant.sun === savedSun && plant.space === savedSpace
      );

      if (match) {
        suggestionBox.innerHTML = `
          <h4>Previously Recommended: ${match.name}</h4>
          <p>${match.tip}</p>
        `;
      }
    }
  });
}