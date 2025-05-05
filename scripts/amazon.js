import { calculateCartQuantity, addToCart} from "../data/cart.js"
import { products } from "../data/products.js";
import { formatCurrency } from "../data/utils/money.js";

renderHeaderHtml();
renderProductsHtml();

function renderHeaderHtml () {
    document.querySelector('.js-amazon-header')
        .innerHTML = `
        <div class="amazon-header-left-section">
            <a href="amazon.html" class="header-link">
            <img class="amazon-logo"
                src="images/amazon-logo-white.png">
            <img class="amazon-mobile-logo"
                src="images/amazon-mobile-logo-white.png">
            </a>
        </div>

        <div class="amazon-header-middle-section">
            <input class="search-bar" type="text" placeholder="Search">

            <button class="search-button">
                <img class="search-icon" src="images/icons/search-icon.png">
            </button>
        </div>

        <div class="amazon-header-right-section">
            <a class="orders-link header-link" href="orders.html">
                <span class="returns-text">Returns</span>
                <span class="orders-text">& Orders</span>
            </a>

            <a class="cart-link header-link" href="checkout.html">
                <img class="cart-icon" src="images/icons/cart-icon.png">
                    <div class="cart-quantity">${calculateCartQuantity()}</div>
                <div class="cart-text">Cart</div>
            </a>
        </div>
        `    
}

function renderProductsHtml () {
    let productsHtml = ``;

    products.forEach((product) => {
        productsHtml += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
                    <div class="product-rating-count link-primary">
                        ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    $${formatCurrency(product.priceCents)}
                </div>

                <div class="product-quantity-container">
                    <select>
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button js-add-to-cart-button button-primary"
                        data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `
    })

    document.querySelector('.js-products-grid')
        .innerHTML = productsHtml;

    document.querySelectorAll('.js-add-to-cart-button')
        .forEach((addButton) => {
            addButton.addEventListener('click', () => {
                const {productId} = addButton.dataset;

                addToCart(productId);
                renderHeaderHtml();
            })
        })
}

