import { calculateCartQuantity, addToCart} from "../data/cart.js"
import { products, loadProducts } from "../data/products.js";

loadProducts(renderProductsGrid);

function renderProductsGrid() {
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
                    <input class="search-bar js-search-bar" type="text" placeholder="Search">

                    <button class="search-button js-search-button">
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

        const url = new URL(window.location.href);
        const search = url.searchParams.get('search');

        let filteredProducts = products;
        
        if (search) {
            filteredProducts = products.filter((product) => {
                let matchingKeyword = false;

                product.keywords.forEach((keyword)=> {
                    if (keyword.toLowerCase().includes(search.toLowerCase())) {
                        matchingKeyword = true;
                    }
                })

                return matchingKeyword || product.name.toLowerCase().includes(search.toLowerCase());
            });
        }
        
        filteredProducts.forEach((product) => {
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
                        <img class="product-rating-stars" src="${product.getStarsUrl()}">
                        <div class="product-rating-count link-primary">
                            ${product.rating.count}
                        </div>
                    </div>

                    <div class="product-price">
                        ${product.getPrice()}
                    </div>

                    <div class="product-quantity-container">
                        <select class="js-quantity-selector-${product.id}">
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

                    ${product.extraInfoHtml()}

                    <div class="product-spacer"></div>

                    <div class="added-to-cart js-added-to-cart-${product.id}">
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

        let addedMessageTimeouts = {};

        document.querySelectorAll('.js-add-to-cart-button')
            .forEach((addButton) => {
                addButton.addEventListener('click', () => {
                    const {productId} = addButton.dataset;

                    document.querySelector(`.js-added-to-cart-${productId}`)
                        .classList.add('added-to-cart-visible');

                    const previousTimeoutId = addedMessageTimeouts[productId];

                    if(previousTimeoutId) {
                        clearTimeout(previousTimeoutId)
                    }
                    
                    const timeoutId = setTimeout(() => {
                        document.querySelector(`.js-added-to-cart-${productId}`)
                            .classList.remove('added-to-cart-visible');
                    }, 2000);

                    addedMessageTimeouts[productId] = timeoutId;

                    addToCart(productId);
                    renderHeaderHtml();
                })
            })

        document.querySelector('.js-search-button')
            .addEventListener('click', () => {
                const search = document.querySelector('.js-search-bar').value;
                window.location.href = `amazon.html?search=${search}`;
            })
    }
}

