let menuData = JSON.parse(localStorage.getItem('menuData')) || {};

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('menuContainer')) {
        displayMenu();
    }
    if (document.getElementById('addItemForm')) {
        document.getElementById('addItemForm').addEventListener('submit', addItem);
    }
});

function addItem(event) {
    event.preventDefault();
    const section = document.getElementById('section').value.trim();
    const name = document.getElementById('name').value.trim();
    const price = document.getElementById('price').value.trim();
    const description = document.getElementById('description').value.trim();
    if (!section || !name || !price || !description) {
        alert("All fields are required!");
        return;
    }
    if (!menuData[section]) {
        menuData[section] = [];
    }
    menuData[section].push({ name, price, description });
    localStorage.setItem('menuData', JSON.stringify(menuData));
    alert("Item added successfully!");
    window.location.href = 'view-menu.html';
}

function displayMenu() {
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = '';
    for (const section in menuData) {
        const sectionHeader = document.createElement('h2');
        sectionHeader.textContent = section.charAt(0).toUpperCase() + section.slice(1);
        menuContainer.appendChild(sectionHeader);
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'menu-items';
        menuData[section].forEach((item, index) => {
            const menuCard = document.createElement('div');
            menuCard.className = 'menu-card';
            menuCard.innerHTML = `
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
                <span>$${item.price}</span>
                <button class="btn-delete" onclick="deleteItem('${section}', ${index})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            itemsContainer.appendChild(menuCard);
        });
        menuContainer.appendChild(itemsContainer);
    }
}

function deleteItem(section, index) {
    menuData[section].splice(index, 1);
    if (menuData[section].length === 0) {
        delete menuData[section];
    }
    localStorage.setItem('menuData', JSON.stringify(menuData));
    displayMenu();
}
