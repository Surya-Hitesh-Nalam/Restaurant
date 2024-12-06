// Initialize menuData from localStorage or as an empty object
let menuData = JSON.parse(localStorage.getItem('menuData')) || {};

// Event listener for DOMContentLoaded to handle page-specific logic
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the view menu page
    if (document.getElementById('menuContainer')) {
        displayMenu();
    }

    // Check if we are on the add item page
    if (document.getElementById('addItemForm')) {
        document.getElementById('addItemForm').addEventListener('submit', addItem);
    }
});

// Function to add a new item to the menu
function addItem(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from the form inputs
    const section = document.getElementById('section').value.trim();
    const name = document.getElementById('name').value.trim();
    const price = document.getElementById('price').value.trim();
    const description = document.getElementById('description').value.trim();

    // Validate input
    if (!section || !name || !price || !description) {
        alert("All fields are required!");
        return;
    }

    // Initialize section if it doesn't exist
    if (!menuData[section]) {
        menuData[section] = [];
    }

    // Add the new item to the specified section
    menuData[section].push({ name, price, description });
    localStorage.setItem('menuData', JSON.stringify(menuData)); // Save to localStorage

    alert("Item added successfully!");
    window.location.href = 'view-menu.html'; // Redirect to view menu
}

// Function to display the menu items
function displayMenu() {
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = ''; // Clear existing content

    // Loop through each section in the menuData
    for (const section in menuData) {
        // Create a header for the section
        const sectionHeader = document.createElement('h2');
        sectionHeader.textContent = section.charAt(0).toUpperCase() + section.slice(1);
        menuContainer.appendChild(sectionHeader);

        // Create a container for the menu items
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'menu-items';

        // Loop through each item in the section
        menuData[section].forEach((item, index) => {
            // Create a card for each menu item
            const menuCard = document.createElement('div');
            menuCard.className = 'menu-card';

            menuCard.innerHTML = `
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p> <!-- Add description here -->
                </div>
                <span>$${item.price}</span>
                <button class="btn-delete" onclick="deleteItem('${section}', ${index})">
                    <i class="fas fa-trash"></i>
                </button>

            `;
            itemsContainer.appendChild(menuCard); // Add the card to the items container
        });

        menuContainer.appendChild(itemsContainer); // Add the items container to the menu
    }
}

// Function to delete a menu item
function deleteItem(section, index) {
    // Remove the item from the specified section
    menuData[section].splice(index, 1);

    // If the section is empty after deletion, remove it
    if (menuData[section].length === 0) {
        delete menuData[section];
    }

    // Update localStorage
    localStorage.setItem('menuData', JSON.stringify(menuData));

    // Re-render the menu
    displayMenu();
}
