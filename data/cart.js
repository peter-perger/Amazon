import { products } from "../data/products.js";
import { deliveryOptions } from "./deliveryOptions.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryId: 3
        },{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 2,
        deliveryId: 2
        }
    ]

export function calculateCartQuantity() {
    let quantity = 0;

    cart.forEach((cartItem) => {
        quantity += cartItem.quantity;
    })

    return quantity;
}

export function getMatchingItem (productId) {
    let matchingItem;
    
    cart.forEach((cartItem) => {
        if(cartItem.productId === productId){
            matchingItem = cartItem;
        }
    })

    return matchingItem;
}

export function getMatchingProduct(productId) {
    let matchingProduct;
    
    products.forEach((product) => {
        if(product.id === productId) {
            matchingProduct = product;
        }
    })

    return matchingProduct;
}

export function addToCart (productId) {
    let quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    let selectedQuantity = Number(quantitySelector.value);


    let matchingItem = getMatchingItem(productId);
    
    if(matchingItem) {
        matchingItem.quantity += selectedQuantity;
    }
    else {
        cart.push({
            productId,
            quantity: selectedQuantity,
            deliveryId: 1
        })
    }

    saveCart();
}

export function deleteCartItem(productId) {
    let newCart = [];

    cart.forEach((cartItem) => {
        
        if(productId !== cartItem.productId) {
            newCart.push(cartItem)
        }
    })

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();

    cart = newCart;
    saveCart();
}

export function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


