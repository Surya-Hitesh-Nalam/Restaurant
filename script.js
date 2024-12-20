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
    const calories = document.getElementById('calories').value.trim();
    const proteins = document.getElementById('proteins').value.trim();
    const carbs = document.getElementById('carbs').value.trim();
    const fats = document.getElementById('fats').value.trim();

    if (!section || !name || !price || !description || !calories || !proteins || !carbs || !fats) {
        alert("All fields are required!");
        return;
    }

    if (!menuData[section]) {
        menuData[section] = [];
    }

    menuData[section].push({
        name,
        price,
        description,
        calories,
        proteins,
        carbs,
        fats
    });

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
                    <div class="nutrition-info">
                        <span>Calories: ${item.calories}</span>
                        <span>Proteins: ${item.proteins}g</span>
                        <span>Carbs: ${item.carbs}g</span>
                        <span>Fats: ${item.fats}g</span>
                    </div>
                </div>
                <span>₹${item.price}</span>
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


// Carousel functionality
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-image');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    }
    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

// Accordion functionality
const accordionBtns = document.querySelectorAll('.accordion-btn');

accordionBtns.forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

