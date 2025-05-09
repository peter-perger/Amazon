import { cart, getMatchingItem, getMatchingProduct, deleteCartItem } from "../../data/cart.js";
import { deliveryOptions, getDeliveryOption, updateDeliveryOption } from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { renderPaymentSummaryHtml } from "./paymentSummary.js";
import { renderCheckoutHeaderHtml } from "./checkoutHeader.js";
import {formatCurrency} from "../../utils/money.js";

renderCartItemsHtml();
renderPaymentSummaryHtml();

export function renderCartItemsHtml () {
    let cartItemHtml = ``;

    cart.forEach((cartItem) => {
        const {productId, deliveryId} = cartItem;
        
        const matchingProduct = getMatchingProduct(productId);
        const deliveryOption = getDeliveryOption(cartItem.deliveryId);

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMM DD');
    
        cartItemHtml += `
            <div class="cart-item-container js-cart-item-container-${productId}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image" src="${matchingProduct.image}">
                    
                    <div class="cart-item-details">
                    <div class="product-name">${matchingProduct.name}</div>
                    <div class="product-price">$${matchingProduct.getPrice()}</div>
                    <div class="product-quantity">
                        <span class="quantity-display">
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link js-update-quantity-link link-primary" 
                            data-product-id="${productId}">
                            Update
                        </span>

                        <input class="quantity-input js-quantity-input-${productId}"
                            data-product-id=${productId}>
                        <span class="save-quantity-link js-save-quantity-link link-primary"
                            data-product-id=${productId}> Save 
                        </span> 

                        <span class="delete-quantity-link js-delete-link link-primary"
                            data-product-id=${productId}>
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(productId, cartItem)}
                </div>
            </div>
            </div>
        `;
    })

    document.querySelector('.js-order-summary').innerHTML = cartItemHtml;

    document.querySelectorAll('.js-delete-link')
        .forEach((deleteButton) => {
            deleteButton.addEventListener('click', () => {
                const {productId} = deleteButton.dataset;

                deleteCartItem(productId);
                renderCheckoutHeaderHtml();
                renderPaymentSummaryHtml();
            })
        })
    
    document.querySelectorAll('.js-update-quantity-link')
        .forEach((updateButton) => {
            updateButton.addEventListener('click', () => {
                const {productId} = updateButton.dataset;

                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.classList.add('is-editing-quantity');
            })
        })

    document.querySelectorAll('.js-save-quantity-link')
        .forEach((saveButton) => {
            saveButton.addEventListener('click', () => {
                const {productId} = saveButton.dataset;

                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.classList.remove('is-editing-quantity');

                const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
                
                const matchingItem = getMatchingItem(productId);
                
                if(newQuantity < 0) {
                    alert('New quantity can\'t be less than 0');
                }
                else if(newQuantity === 0) {
                    deleteCartItem(productId);
                }
                else if(newQuantity > 25) {
                    alert('New quantity can\'t be more than 25');
                }
                else {
                    matchingItem.quantity = newQuantity;
                }

                renderCartItemsHtml();
                renderCheckoutHeaderHtml();
                renderPaymentSummaryHtml();
            })
        })

    document.querySelectorAll('.js-delivery-option')
        .forEach((option) => {
            option.addEventListener('click', () => {
                const {productId} = option.dataset;  
                const {optionId} = option.dataset;
                
                updateDeliveryOption(productId, optionId);
                renderCartItemsHtml();
                renderPaymentSummaryHtml();
            })
        })
}

function deliveryOptionsHTML (productId, cartItem) {
    let deliveryHtml = ``;

    deliveryOptions.forEach((option) => {
        const today = dayjs();
        const deliveryDate = today.add(option.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMM DD');

        const deliveryPrice = option.priceCents 
            === 0
            ? 'FREE -'
            : `$${formatCurrency(option.priceCents)} -`
        
        let isChecked = Number(option.id) === Number(cartItem.deliveryId) ? 'checked' : '';

       deliveryHtml += `
            <div class="delivery-option js-delivery-option"
                 data-product-id=${productId}
                 data-option-id=${option.id}>
                <input type="radio" ${isChecked} class="delivery-option-input" name="delivery-option-${productId}">
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${deliveryPrice} Shipping
                    </div>
                </div>
            </div>
       `; 
    })

    return deliveryHtml;
}


