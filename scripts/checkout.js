import { renderCheckoutHeaderHtml } from "./checkout/checkoutHeader.js";
import { renderCartItemsHtml } from "./checkout/orderSummary.js";
import { renderPaymentSummaryHtml } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
//import '../data/cart-class.js'


loadProducts( () => {
    renderCartItemsHtml();
    renderPaymentSummaryHtml();
    renderCheckoutHeaderHtml();
});
