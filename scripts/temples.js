// Get the current year and display it in the footer
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Get the last modified date and display it in the footer
const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = "Last Modification: " + lastModified;

document.addEventListener("DOMContentLoaded", () => {
    console.log("Temple Album page is loaded and ready.");
});

function toggleMenu() {
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('open');
}