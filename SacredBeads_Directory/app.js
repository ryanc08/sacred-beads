/**
 * Sacred Beads - E-commerce Site JavaScript
 * Handles cart, navigation, filters, and interactions
 */

// =============================================================================
// Shopping Cart State & Functions
// =============================================================================

const cart = {
    items: [],

    add(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.save();
        this.updateUI();
        this.showNotification(`${product.name} added to cart`);
    },

    remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.updateUI();
    },

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.remove(productId);
            } else {
                this.save();
                this.updateUI();
            }
        }
    },

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    getCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    save() {
        localStorage.setItem('sacredBeadsCart', JSON.stringify(this.items));
    },

    load() {
        const saved = localStorage.getItem('sacredBeadsCart');
        if (saved) {
            this.items = JSON.parse(saved);
            this.updateUI();
        }
    },

    updateUI() {
        // Update cart count badge
        const countBadge = document.getElementById('cart-count');
        if (countBadge) {
            const count = this.getCount();
            countBadge.textContent = count;
            countBadge.style.display = count > 0 ? 'flex' : 'none';
        }

        // Update cart items display
        const cartItemsContainer = document.getElementById('cart-items');
        const cartFooter = document.getElementById('cart-footer');
        const cartTotal = document.getElementById('cart-total-amount');

        if (cartItemsContainer) {
            if (this.items.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="cart-empty">
                        <span class="cart-empty-icon">🕌</span>
                        <p>Your cart is empty</p>
                        <a href="#products" class="btn btn-primary" onclick="closeCart()">Start Shopping</a>
                    </div>
                `;
                if (cartFooter) cartFooter.style.display = 'none';
            } else {
                cartItemsContainer.innerHTML = this.items.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image" style="background: linear-gradient(135deg, #d4a86a 0%, #8b5a2b 100%);"></div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price} × ${item.quantity}</div>
                            <button class="cart-item-remove" onclick="cart.remove('${item.id}')">Remove</button>
                        </div>
                    </div>
                `).join('');
                if (cartFooter) cartFooter.style.display = 'block';
                if (cartTotal) cartTotal.textContent = `$${this.getTotal()}`;
            }
        }
    },

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span>${message}</span>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 24px;
            background: #1a5f5a;
            color: white;
            border-radius: 8px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.15);
            z-index: 3000;
            animation: slideIn 0.3s ease, slideOut 0.3s ease 2.5s forwards;
        `;

        document.body.appendChild(notification);

        // Remove after animation
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
};

// =============================================================================
// Cart Sidebar Toggle
// =============================================================================

function openCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartSidebar) cartSidebar.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartSidebar) cartSidebar.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// =============================================================================
// Header Scroll Effect
// =============================================================================

function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// =============================================================================
// Product Filters
// =============================================================================

function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            const productCards = document.querySelectorAll('.product-card');

            // Filter products with animation
            productCards.forEach(card => {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// =============================================================================
// Add to Cart Buttons
// =============================================================================

function initAddToCartButtons() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const product = {
                id: btn.dataset.id,
                name: btn.dataset.name,
                price: parseInt(btn.dataset.price, 10)
            };

            cart.add(product);

            // Button animation
            btn.textContent = 'Added!';
            btn.style.background = '#c9a962';

            setTimeout(() => {
                btn.textContent = 'Add to Cart';
                btn.style.background = '';
            }, 1500);
        });
    });
}

// =============================================================================
// Dynamic Product Rendering from Admin Data
// =============================================================================

const defaultProducts = [
    { id: '1', name: 'Baltic Amber Tasbih', material: '33 Beads • Genuine Baltic Amber', price: 189, category: 'amber', badge: 'Bestseller', image: '' },
    { id: '2', name: 'Jerusalem Olive Wood', material: '99 Beads • Hand-Carved Olive', price: 79, category: 'wood', badge: '', image: '' },
    { id: '3', name: 'Yemeni Aqeeq Misbaha', material: '33 Beads • Natural Red Agate', price: 245, category: 'agate', badge: 'New', image: '' },
    { id: '4', name: 'Rose Quartz Serenity', material: '33 Beads • Brazilian Rose Quartz', price: 165, category: 'crystal', badge: '', image: '' },
    { id: '5', name: 'Cognac Amber Master', material: '99 Beads • Premium Cognac Amber', price: 325, category: 'amber', badge: '', image: '' },
    { id: '6', name: 'Mysore Sandalwood', material: '33 Beads • Aromatic Indian Sandalwood', price: 210, category: 'wood', badge: 'Limited', image: '' }
];

function loadProducts() {
    const saved = localStorage.getItem('sacredBeadsProducts');
    if (saved) {
        return JSON.parse(saved);
    }
    // Save defaults if nothing exists
    localStorage.setItem('sacredBeadsProducts', JSON.stringify(defaultProducts));
    return defaultProducts;
}

function renderProductsFromData() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    const products = loadProducts();

    const categoryColors = {
        amber: 'linear-gradient(135deg, #f5e6c8 0%, #d4a86a 50%, #c49a5e 100%)',
        wood: 'linear-gradient(135deg, #dcc5a9 0%, #8b6914 50%, #6d5a28 100%)',
        agate: 'linear-gradient(135deg, #f5d5d5 0%, #a53030 50%, #722f37 100%)',
        crystal: 'linear-gradient(135deg, #f8e8eb 0%, #e8b4be 50%, #d4909d 100%)'
    };

    const badgeClasses = {
        'Bestseller': '',
        'New': 'new',
        'Limited': 'limited',
        'Sale': 'new'
    };

    productGrid.innerHTML = products.map(product => `
        <article class="product-card" data-category="${product.category}">
            <div class="product-image">
                ${product.image
            ? `<img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;">`
            : `<div class="product-placeholder ${product.category}" style="background: ${categoryColors[product.category] || categoryColors.amber}">
                        <div class="bead-string">
                            <span class="bead"></span>
                            <span class="bead"></span>
                            <span class="bead"></span>
                            <span class="bead"></span>
                            <span class="bead"></span>
                        </div>
                    </div>`
        }
                <div class="product-overlay">
                    <button class="quick-view-btn">Quick View</button>
                </div>
                ${product.badge ? `<span class="product-badge ${badgeClasses[product.badge] || ''}">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-material">${product.material}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price}</span>
                    <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
                        Add to Cart
                    </button>
                </div>
            </div>
        </article>
    `).join('');

    // Re-initialize add to cart buttons
    initAddToCartButtons();

    // Re-observe for animations
    initScrollAnimations();
}


// =============================================================================
// Smooth Scroll Navigation
// =============================================================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close cart if open
                closeCart();
            }
        });
    });
}

// =============================================================================
// Newsletter Form
// =============================================================================

function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const input = form.querySelector('input[type="email"]');
        const email = input.value;

        if (email) {
            // Simulate submission
            const btn = form.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Subscribing...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Subscribed!';
                input.value = '';

                // Show success message
                cart.showNotification('Welcome to the Sacred Beads community!');

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 2000);
            }, 1000);
        }
    });
}

// =============================================================================
// Mobile Menu
// =============================================================================

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('mobile-open');
    });
}

// =============================================================================
// Intersection Observer for Animations
// =============================================================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements
    const animateElements = document.querySelectorAll('.product-card, .craft-card, .stat-item');
    animateElements.forEach(el => observer.observe(el));
}

// =============================================================================
// CSS for Animations (injected)
// =============================================================================

function injectAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(20px); }
        }
        
        @keyframes slideIn {
            from { opacity: 0; transform: translateX(100px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(100px); }
        }
        
        .product-card, .craft-card, .stat-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .product-card.animate-in,
        .craft-card.animate-in,
        .stat-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .product-card:nth-child(2) { transition-delay: 0.1s; }
        .product-card:nth-child(3) { transition-delay: 0.2s; }
        .product-card:nth-child(4) { transition-delay: 0.3s; }
        .product-card:nth-child(5) { transition-delay: 0.4s; }
        .product-card:nth-child(6) { transition-delay: 0.5s; }
        
        .nav-links.mobile-open {
            display: flex !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            background: rgba(247, 243, 235, 0.98);
            padding: 20px;
            gap: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .nav-links.mobile-open a {
            color: #2d2a26 !important;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    `;
    document.head.appendChild(style);
}

// =============================================================================
// Initialize Everything
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Inject animation styles
    injectAnimationStyles();

    // Load cart from localStorage
    cart.load();

    // Render products from admin data (localStorage)
    renderProductsFromData();

    // Initialize all features
    initHeaderScroll();
    initProductFilters();
    initAddToCartButtons();
    initSmoothScroll();
    initNewsletterForm();
    initMobileMenu();
    initScrollAnimations();

    // Cart toggle event listeners
    const cartToggle = document.getElementById('cart-toggle');
    const cartClose = document.getElementById('cart-close');
    const cartOverlay = document.getElementById('cart-overlay');

    if (cartToggle) cartToggle.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCart();
        }
    });

    console.log('🕌 Sacred Beads site loaded successfully');
});

// Make cart available globally for inline handlers
window.cart = cart;
window.openCart = openCart;
window.closeCart = closeCart;
