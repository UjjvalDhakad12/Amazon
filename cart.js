// Function to add styles for the remove button
function addRemoveButtonStyles() {
    const styles = `
        .remove-button {
            width: 80px; 
            height: 30px;  /* Adjusted height */
            background-color: #ff4d4d;
            color: white; 
            border: none; 
            border-radius: 5px; 
            cursor: pointer;
            font-size: 14px;
            margin-top: 5px; 
        }

        .remove-button:hover {
            background-color: #e60000; /* Darker red on hover */
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

// Call the function to add styles
addRemoveButtonStyles();

// Function to display cart items
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartContainer.innerHTML = '';
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.innerHTML = '';
        return;
    }

    let totalPrice = 0;

    cartItems.forEach(item => {
        const itemTotalPrice = parseFloat(item.price.replace('₹', '').replace(',', '')) * item.quantity;
        totalPrice += itemTotalPrice;

        // Create quantity dropdown
        let quantityOptions = '';
        for (let i = 1; i <= 10; i++) {
            quantityOptions += `<option value="${i}" ${item.quantity == i ? 'selected' : ''}>${i}</option>`;
        }
        quantityOptions += `<option value="delete">Delete</option>`; // Add delete option

        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h2>${item.name}</h2>
                    <p>Price: ${item.price} x 
                    <select class="quantity-select" onchange="updateQuantity('${item.name}', this.value)">
                        ${quantityOptions}
                    </select>
                    = ₹${itemTotalPrice.toFixed(2)}</p>
                    <button class="remove-button" onclick="removeFromCart('${item.name}')">Remove</button> <!-- Remove button -->
                </div>
            </div>
        `;
    });

    cartTotal.innerHTML = `<h2>Total Price: ₹${totalPrice.toFixed(2)}</h2>`;
}

// Function to add product to cart
function addToCart(product, quantity) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const productIndex = cartItems.findIndex(item => item.name === product.name);

    if (productIndex > -1) {
        cartItems[productIndex].quantity += quantity; // Update quantity
    } else {
        product.quantity = quantity; // Set initial quantity
        cartItems.push(product); // Add new product
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems(); // Refresh cart display
}

// Function to update quantity or remove item
function updateQuantity(productName, newQuantity) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const productIndex = cartItems.findIndex(item => item.name === productName);

    if (newQuantity === 'delete') {
        removeFromCart(productName); // Call removeFromCart if 'Delete' is selected
        return;
    }

    if (productIndex > -1) {
        cartItems[productIndex].quantity = Math.max(1, newQuantity); // Ensure quantity is at least 1
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems(); // Refresh the cart display
    }
}

// Function to remove item from cart
function removeFromCart(productName) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.name !== productName);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems(); // Refresh the cart display
}

// Initial call to display cart items
document.addEventListener('DOMContentLoaded', displayCartItems);
