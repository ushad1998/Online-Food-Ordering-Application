// === Navbar Toggle ===
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    navbar.classList.remove('active');
};

// === Dark Mode Toggle ===
let darkmode = document.querySelector('#darkmode');

darkmode.onclick = () => {
    if (darkmode.classList.contains('bx-moon')) {
        darkmode.classList.replace('bx-moon', 'bx-sun');
        document.body.classList.add('active');
    } else {
        darkmode.classList.replace('bx-sun', 'bx-moon');
        document.body.classList.remove('active');
    }
};

// === Scroll Reveal Animations ===
const sr = ScrollReveal({
    origin: 'top',
    distance: '40px',
    duration: 2000,
    reset: true
});

sr.reveal('.home-text, .home-img, .about-img, .about-text, .box, .s-box, .connect-text, .btn, .contact-box', {
    interval: 200
});

// === Menu Filter ===
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');

        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.menu-container .box').forEach(box => {
            const itemCategory = box.getAttribute('data-category');
            box.style.display = (category === 'all' || category === itemCategory) ? 'block' : 'none';
        });
    });
});

// === Popup Login/Register ===
window.addEventListener('load', () => {
    document.getElementById('popup-wrapper').style.display = 'flex';
});

document.getElementById('close-popup').onclick = () => {
    document.getElementById('popup-wrapper').style.display = 'none';
};

document.getElementById('login-tab').onclick = () => {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-tab').classList.add('active');
    document.getElementById('register-tab').classList.remove('active');
};

document.getElementById('register-tab').onclick = () => {
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-tab').classList.add('active');
    document.getElementById('login-tab').classList.remove('active');
};

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Login successful!");
    document.getElementById('popup-wrapper').style.display = 'none';
});

document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();

    alert("Registration successful!");

    // Switch to login form
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-tab').classList.remove('active');
    document.getElementById('login-tab').classList.add('active');

    
});

// === Cart Functionality ===
let cart = [];
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += parseFloat(item.price);
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <button class="btn remove-btn" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartTotal.textContent = total.toFixed(2);

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        });
    });
}

document.querySelectorAll('.box .bx-cart-alt').forEach((btn) => {
    btn.addEventListener('click', () => {
        const box = btn.closest('.box');
        const name = box.querySelector('h2').textContent;
        const price = box.querySelector('span').textContent.replace('$', '');
        cart.push({ name, price });
        updateCart();
        alert(`${name} added to cart!`);
    });
});

// === Dummy Payment Gateway ===
const paymentPopup = document.getElementById('payment-popup');
const paymentTotal = document.getElementById('payment-total');
const checkoutBtn = document.getElementById('checkout-btn');
const paymentForm = document.getElementById('payment-form');
const closePayment = document.getElementById('close-payment');

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    paymentTotal.textContent = total.toFixed(2);
    paymentPopup.classList.add('active');
});

closePayment.addEventListener('click', () => {
    paymentPopup.classList.remove('active');
});

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Change Pay Now button to "Order Successful"
    const payButton = paymentForm.querySelector('.btn');
    payButton.textContent = "✅ Order Successful";
    payButton.disabled = true;
    payButton.style.background = "green"; // optional: change color

    // Optional: show alert
    alert("Payment successful! Your order has been placed.");

    // Clear cart and close popup after short delay
    cart = [];
    updateCart();
    setTimeout(() => {
        paymentPopup.classList.remove('active');

        // Reset payment form for next time
        paymentForm.reset();
        payButton.textContent = "Pay Now";
        payButton.disabled = false;
        payButton.style.background = ""; 
    }, 2000);
});

