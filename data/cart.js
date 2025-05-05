let cart = [{
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

function getMatchingItem (productId) {
    let matchingItem;
    
    cart.forEach((cartItem) => {
        if(cartItem.productId === productId){
            matchingItem = cartItem;
        }
    })

    return matchingItem;
}

export function addToCart (productId) {
    let matchingItem = getMatchingItem(productId);
    
    if(matchingItem) {
        matchingItem.quantity ++;
    }
    else {
        cart.push({
            productId,
            quantity: 1
        })
    }

    console.log(cart);
}

