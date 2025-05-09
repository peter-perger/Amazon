import { products } from "../data/products.js";

class Cart {
    cartItems;
    #localStorageKey; //private property

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    
        if(!this.cartItems) {
            this.cartItems = [{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 69,
                deliveryId: 3
            },{
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 2,
                deliveryId: 2
            }]
        }
    };

    saveCart() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    };

    getMatchingItem (productId) {
        let matchingItem;
        
        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId === productId){
                matchingItem = cartItem;
            }
        })
    
        return matchingItem;
    };

    addToCart (productId) {
        // let quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        // let selectedQuantity = Number(quantitySelector.value);
    
    
        let matchingItem = this.getMatchingItem(productId);
        
        if(matchingItem) {
            matchingItem.quantity += 1 /*selectedQuantity*/;
        }
        else {
            this.cartItems.push({
                productId,
                quantity: 1,
                deliveryId: 1
            })
        }
    
        this.saveCart();
    };

    deleteCartItem(productId) {
        let newCart = [];
    
        this.cartItems.forEach((cartItem) => {
            
            if(productId !== cartItem.productId) {
                newCart.push(cartItem)
            }
        })
    
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
    
        this.cartItems = newCart;
        
        this.saveCart();
    };

    calculateCartQuantity() {
        let quantity = 0;
    
        this.cartItems.forEach((cartItem) => {
            quantity += cartItem.quantity;
        })
    
        return quantity;
    };

    getMatchingProduct(productId) {
        let matchingProduct;
        
        products.forEach((product) => {
            if(product.id === productId) {
                matchingProduct = product;
            }
        })
    
        return matchingProduct;
    };
} 

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

cart.addToCart("36c64692-677f-4f58-b5ec-0dc2cf109e27");


console.log(cart);
console.log(businessCart);














