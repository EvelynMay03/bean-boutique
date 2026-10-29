// Toggle mobile menu
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}

// Cart functionality
document.addEventListener('DOMContentLoaded', function () {
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    renderCart(cart);

    // Add event listener for checkout button
    document.getElementById('checkoutBtn').addEventListener('click', function () {
        alert('Proceeding to checkout! In a real implementation, this would redirect to a checkout page.');
    });

    // Handle click events on the cart (for quantity changes and removal)
    document.getElementById('cartItems').addEventListener('click', function (e) {
        if (e.target.classList.contains('quantity-btn') || e.target.classList.contains('remove-item')) {
            const itemId = e.target.closest('.cart-item').dataset.id;
            const action = e.target.classList.contains('increase') ? 'increase' :
                e.target.classList.contains('decrease') ? 'decrease' : 'remove';

            updateCart(itemId, action);
        }
    });
});

// Update cart based on user action
function updateCart(itemId, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        if (action === 'increase') {
            cart[itemIndex].quantity += 1;
        } else if (action === 'decrease') {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity -= 1;
            } else {
                // If quantity would go to 0, remove the item
                cart.splice(itemIndex, 1);
            }
        } else if (action === 'remove') {
            cart.splice(itemIndex, 1);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(cart);
}

// Render the cart
function renderCart(cart) {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    const emptyCart = document.getElementById('emptyCart');

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartSummary.style.display = 'none';
        cartItemsContainer.innerHTML = '';
        cartItemsContainer.appendChild(emptyCart);
        return;
    }

    emptyCart.style.display = 'none';
    cartSummary.style.display = 'block';

    let subtotal = 0;
    let html = '';

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        html += `
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>                            
                            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                            <div class="quantity-controls">
                                <button class="quantity-btn decrease">-</button>
                                <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                                <button class="quantity-btn increase">+</button>
                            </div>
                            <button class="remove-item">
                                <i class="fas fa-trash-alt"></i> Remove
                            </button>
                        </div>
                        <div class="cart-item-total">
                            $${itemTotal.toFixed(2)}
                        </div>
                    </div>
                `;
    });

    cartItemsContainer.innerHTML = html;

    // Calculate totals
    const shipping = 5.00; // Flat rate shipping
    const taxRate = 0.08; // 8% tax
    const tax = subtotal * taxRate;
    const total = subtotal + shipping + tax;

    // Update summary
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// This function would be called from your coffee selection page when adding items
function addToCart(name, price, origin, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Generate a simple ID (in a real app you might use a proper ID from your database)
    const id = name.toLowerCase().replace(/\s+/g, '-');

    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price: parseFloat(price),
            origin,
            image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Optional: Show a confirmation message
    alert(`${name} has been added to your cart!`);

}