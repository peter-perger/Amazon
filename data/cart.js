let cart = JSON.parse(localStorage.getItem('cart')) || [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1
        },{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 2
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
            quantity: selectedQuantity
        })
    }

    saveCart();
    console.log(cart);
}

export function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
