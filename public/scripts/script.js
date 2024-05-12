let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('open')
}

document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.getElementById('cart-icon');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    let cartItemsCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', async function (event) {
            event.preventDefault();
            const productId = button.getAttribute('data-id');
            const response = await fetch(`/add-to-cart/${productId}`, { method: 'POST' });
            if (response.ok) {
                cartItemsCount++;
                updateCartIcon();
            } else {
                console.error('Failed to add product to cart');
            }
        });
    });

    function updateCartIcon() {
        cartIcon.innerHTML = `<i class="ri-shopping-cart-fill"></i><sup class="cart-count">${cartItemsCount}</sup>`;
    }
});



  

