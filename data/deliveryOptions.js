import { getMatchingItem, saveCart } from "./cart.js";

export const deliveryOptions = [{
    id: 1,
    priceCents: 0,
    deliveryDays: 7
}, {
    id: 2,
    priceCents: 499,
    deliveryDays: 3   
}, {
    id: 3,
    priceCents: 999,
    deliveryDays: 1
}]

export function getDeliveryOption(deliveryId) {
    let resultOption;
    
    deliveryOptions.forEach((option) => {
        if(option.id == deliveryId) {
            resultOption = option;
        }
    })

    return resultOption;
}

export function updateDeliveryOption (productId, optionId) {
    const matchingItem = getMatchingItem(productId);
    matchingItem.deliveryId = optionId;
    saveCart();
}