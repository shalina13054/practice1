document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const emptyCartMessage = document.querySelector('.empty-cart-message');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
        }
    }

    function renderCart() {
        if (!cartItemsContainer) return;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
            cartTotalElement.textContent = '$0.00';
            return;
        }

        let total = 0;
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += parseFloat(item.price.replace('$', ''));
        });

        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Index page logic
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const productId = productCard.dataset.productId;
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('p').textContent;
                const productImage = productCard.querySelector('img').src;

                const product = {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage
                };

                cart.push(product);
                saveCart();
                alert(`${productName} added to cart!`);
            });
        });
    }

    // Cart page logic
    if (document.body.classList.contains('cart-page')) {
        renderCart();
    }

    updateCartCount();
});
