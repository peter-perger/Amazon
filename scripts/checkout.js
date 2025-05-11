import { renderCheckoutHeaderHtml } from "./checkout/checkoutHeader.js";
import { renderCartItemsHtml } from "./checkout/orderSummary.js";
import { renderPaymentSummaryHtml } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/products.js";

//Promise class always comes with a function and when we create one,
//it runs its inner function inmediately

Promise.all([
    loadProductsFetch(),
    
    new Promise((resolve) => {
            loadCart(() => {
                resolve();
            });
        })
    
    ]).then((values) => {
        console.log(values);
        renderCartItemsHtml();
        renderPaymentSummaryHtml();
        renderCheckoutHeaderHtml(); 
    });

/*
new Promise((resolve) => {
    loadProducts(() => {
        console.log('finished-loading-products');
        resolve('value1');
    });

    }).then((value) => {
        console.log(value);

        return new Promise((resolve) => {
            loadCart(() => {
                resolve();
            });
        });

    }).then(() => {
        renderCartItemsHtml();
        renderPaymentSummaryHtml();
        renderCheckoutHeaderHtml(); 
    }) 
*/

/*
loadProducts( () => {
    renderCartItemsHtml();
    renderPaymentSummaryHtml();
    renderCheckoutHeaderHtml();
});
*/

/*
loadProducts(() => {
    loadCart(() => {
       renderCartItemsHtml();
        renderPaymentSummaryHtml();
        renderCheckoutHeaderHtml(); 
    })
})
*/