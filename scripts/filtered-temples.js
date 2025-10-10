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
// Week 4 enhancement
// Temple array
const temples = [
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
      templeName: "Manti Utah",
      location: "Manti, Utah, United States",
      dedicated: "1888, May, 21",
      area: 74792,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
      templeName: "Payson Utah",
      location: "Payson, Utah, United States",
      dedicated: "2015, June, 7",
      area: 96630,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
      templeName: "Yigo Guam",
      location: "Yigo, Guam",
      dedicated: "2020, May, 2",
      area: 6861,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
      templeName: "Washington D.C.",
      location: "Kensington, Maryland, United States",
      dedicated: "1974, November, 19",
      area: 156558,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
      templeName: "Lima Perú",
      location: "Lima, Perú",
      dedicated: "1986, January, 10",
      area: 9600,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
      templeName: "Mexico City Mexico",
      location: "Mexico City, Mexico",
      dedicated: "1983, December, 2",
      area: 116642,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Additional 3 temples
    {
      templeName: "Salt Lake Utah",
      location: "Salt Lake City, Utah, United States",
      dedicated: "1893, April, 6",
      area: 253015,
      imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
    },
    {
      templeName: "Paris France",
      location: "Le Chesnay, France",
      dedicated: "2017, May, 21",
      area: 46400,
      imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/paris-france-temple/paris-france-temple-2056-main.jpg"
    },
    {
      templeName: "Johannesburg South Africa",
      location: "Johannesburg, South Africa",
      dedicated: "1985, August, 24",
      area: 34615,
      imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/johannesburg-south-africa-temple/johannesburg-south-africa-temple-22475-main.jpg"
    }
  ];
  
  // Function to create temple cards
  function createTempleCards(filteredTemples) {
    const container = document.getElementById('temple-cards-container'); // The container where cards will be added
    container.innerHTML = ''; //clear the container
    
    filteredTemples.forEach(temple => {
      // Create card div
      const card = document.createElement('div');
      card.classList.add('temple-card');
      
      // Create name element
      const nameElement = document.createElement('h2');
      nameElement.textContent = temple.templeName;
      card.appendChild(nameElement);
      
      // Create location element
      const locationElement = document.createElement('p');
      locationElement.textContent = `Location: ${temple.location}`;
      card.appendChild(locationElement);
      
      // Create dedicated date element
      const dedicatedElement = document.createElement('p');
      dedicatedElement.textContent = `Dedicated: ${temple.dedicated}`;
      card.appendChild(dedicatedElement);
      
      // Create area element
      const areaElement = document.createElement('p');
      areaElement.textContent = `Total Area: ${temple.area} sq ft`;
      card.appendChild(areaElement);
      
      // Create image element
      const imgElement = document.createElement('img');
      imgElement.src = temple.imageUrl;
      imgElement.alt = `${temple.templeName} Temple`;
      imgElement.loading = 'lazy'; // Native lazy loading
      card.appendChild(imgElement);
      
      // Append card to container
      container.appendChild(card);
    });
  }
  
  // Filters for different categories
function filterOld() {
    const oldTemples = temples.filter(temple => new Date(temple.dedicated).getFullYear() < 1900);
    createTempleCards(oldTemples);
  }
  
  function filterNew() {
    const newTemples = temples.filter(temple => new Date(temple.dedicated).getFullYear() >= 2000);
    createTempleCards(newTemples);
  }
  
  function filterLarge() {
    const largeTemples = temples.filter(temple => temple.area > 90000);
    createTempleCards(largeTemples);
  }
  
  function filterSmall() {
    const smallTemples = temples.filter(temple => temple.area < 10000);
    createTempleCards(smallTemples);
  }
  
  function showAllTemples() {
    createTempleCards(temples);
  }
  
  // Event listeners for navigation menu
  document.getElementById('home').addEventListener('click', showAllTemples);
  document.getElementById('old').addEventListener('click', filterOld);
  document.getElementById('new').addEventListener('click', filterNew);
  document.getElementById('large').addEventListener('click', filterLarge);
  document.getElementById('small').addEventListener('click', filterSmall);
  
  // Initial display of all temples
  document.addEventListener('DOMContentLoaded', showAllTemples);
  // Run the function to generate temple cards
//   document.addEventListener('DOMContentLoaded', createTempleCards);