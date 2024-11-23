let cart = [];

// Load the cart from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartIcon();
    }
});

function addToCart(product) {
    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex > -1) {
        // If the product exists, increase the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If not, add a new product with quantity
        product.quantity = 1; // Set initial quantity
        cart.push(product);
    }

    localStorage.setItem('cartItems', JSON.stringify(cart)); // Save to localStorage
    updateCartIcon();
}

function updateCartIcon() {
    const cartIcon = document.querySelector('.cart');
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0); // Calculate total quantity
    cartIcon.innerHTML = `<i class="fa fa-shopping-cart"></i> Cart (${totalQuantity})`;
}

function viewCart() {
    localStorage.setItem('cartItems', JSON.stringify(cart));
    window.location.href = 'cart.html'; // Redirect to cart page
}
