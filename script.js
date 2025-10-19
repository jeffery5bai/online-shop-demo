// Global variables
let products = [];

// Initialize the application
async function init() {
    console.log('Initializing application...');
    await loadProducts();
    console.log('Products loaded:', products.length);
    renderCategories();
    console.log('Categories rendered');
    renderProducts();
    console.log('Products rendered');
    setupEventListeners();
    console.log('Event listeners setup complete');
}

// Load products from JSON file
async function loadProducts() {
    try {
        console.log('Fetching products.json...');
        const response = await fetch('data/products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        products = await response.json();
        console.log('Products loaded successfully:', products);
    } catch (error) {
        console.error('Error loading products:', error);
        alert('Failed to load products. Please make sure you are running this from a web server (not file://)');
        products = [];
    }
}

// Get unique categories from products
function getCategories() {
    const categories = [...new Set(products.map(p => p.category))];
    return categories;
}

// Create safe category ID from category name
function getCategoryId(category) {
    // Use encodeURIComponent to handle Chinese characters
    return 'category-' + encodeURIComponent(category).replace(/%/g, '_');
}

// Render category navigation
function renderCategories() {
    const categoryNav = document.getElementById('categoryNav');
    const categories = getCategories();

    categoryNav.innerHTML = categories.map(category => {
        const categoryId = getCategoryId(category);
        return `<a href="#${categoryId}" class="category-link">${category}</a>`;
    }).join('');

    // Add click handlers for smooth scrolling
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // Close sidebar on mobile after clicking
            if (window.innerWidth <= 768) {
                const sidebar = document.getElementById('sidebar');
                const backdrop = document.getElementById('sidebarBackdrop');
                sidebar.classList.remove('active');
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// Render products grouped by category
function renderProducts() {
    const productContainer = document.getElementById('productContainer');
    const categories = getCategories();

    productContainer.innerHTML = categories.map(category => {
        const categoryId = getCategoryId(category);
        const categoryProducts = products.filter(p => p.category === category);

        return `
            <section id="${categoryId}" class="category-section">
                <h2 class="category-title">${category}</h2>
                <div class="product-grid">
                    ${categoryProducts.map(product => renderProductCard(product)).join('')}
                </div>
            </section>
        `;
    }).join('');

    // Add click handlers for product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open popup if clicking the copy button
            if (e.target.closest('.copy-btn')) {
                return;
            }
            const productId = card.dataset.productId;
            showPopup(productId);
        });
    });

    // Add click handlers for copy buttons
    setupCopyButtons();
}

// Render individual product card
function renderProductCard(product) {
    const imagePath = `photos/${product.id}.jpg`;

    // Handle tags - could be null, string, or array
    let tags = '';
    if (product.tags) {
        if (Array.isArray(product.tags)) {
            tags = product.tags.join(', ');
        } else if (typeof product.tags === 'string') {
            tags = product.tags;
        }
    }

    // Format price
    const price = product.price ? `NT$ ${product.price}` : '';

    // Add product number to name
    const productNameWithNumber = `#${product.id} ${product.name}`;

    return `
        <div class="product-card" data-product-id="${product.id}">
            <img src="${imagePath}" alt="${product.name}" class="product-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22400%22%3E%3Crect width=%22300%22 height=%22400%22 fill=%22%23f8f8f8%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2214%22 fill=%22%23ccc%22%3ENo Image%3C/text%3E%3C/svg%3E'">
            <div class="product-info">
                <div class="product-name-container">
                    <div class="product-name">${productNameWithNumber}</div>
                    <button class="copy-btn" data-copy-text="${productNameWithNumber}" title="複製商品名稱" aria-label="複製商品名稱">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="5" y="5" width="9" height="9" rx="1" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M3 10.5V3C3 2.44772 3.44772 2 4 2H10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
                ${price ? `<div class="product-price">${price}</div>` : ''}
                <div class="product-spec">${product.specification}</div>
                ${tags ? `<div class="product-tags">${tags}</div>` : ''}
            </div>
        </div>
    `;
}

// Show popup with product details
function showPopup(productId) {
    // Convert to number if needed for comparison
    const product = products.find(p => p.id == productId);
    if (!product) return;

    const popup = document.getElementById('popup');
    const popupImage = document.getElementById('popupImage');
    const popupName = document.getElementById('popupName');
    const popupStatus = document.getElementById('popupStatus');
    const popupNotes = document.getElementById('popupNotes');

    const imagePath = `photos/${product.id}.jpg`;

    popupImage.src = imagePath;
    popupImage.onerror = function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22600%22%3E%3Crect width=%22600%22 height=%22600%22 fill=%22%23f5f5f5%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2224%22 fill=%22%23999%22%3ENo Image Available%3C/text%3E%3C/svg%3E';
    };
    popupName.textContent = product.name;
    popupStatus.textContent = product.status || '可索取';
    popupNotes.textContent = product.notes || '無備註';

    popup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close popup
function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Setup copy buttons
function setupCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            e.stopPropagation(); // Prevent product card click
            const textToCopy = button.dataset.copyText;

            try {
                await navigator.clipboard.writeText(textToCopy);

                // Visual feedback - change icon temporarily
                const originalHTML = button.innerHTML;
                button.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8L6 11L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
                button.classList.add('copied');

                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.classList.remove('copied');
                }, 1500);
            } catch (err) {
                console.error('Failed to copy:', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    button.classList.add('copied');
                    setTimeout(() => button.classList.remove('copied'), 1500);
                } catch (err2) {
                    console.error('Fallback copy failed:', err2);
                }
                document.body.removeChild(textArea);
            }
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Sidebar toggle for mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');
    const sidebarClose = document.getElementById('sidebarClose');

    // Open sidebar
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
        sidebarBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close sidebar function
    const closeSidebar = () => {
        sidebar.classList.remove('active');
        sidebarBackdrop.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    // Close sidebar with close button
    sidebarClose.addEventListener('click', closeSidebar);

    // Close sidebar when clicking backdrop
    sidebarBackdrop.addEventListener('click', closeSidebar);

    // Popup close button
    const popupClose = document.querySelector('.popup-close');
    popupClose.addEventListener('click', closePopup);

    // Close popup when clicking outside content
    const popup = document.getElementById('popup');
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePopup();
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
