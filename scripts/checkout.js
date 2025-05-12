import { renderCheckoutHeaderHtml } from "./checkout/checkoutHeader.js";
import { renderCartItemsHtml } from "./checkout/orderSummary.js";
import { renderPaymentSummaryHtml } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";


//async makes a function return a promise
async function loadPage () {
    try {
        //throw('error1');

        //await wait a promise to finish before going next line -- let us write asynchronous code like normal code
        await  Promise.all([
            loadProductsFetch(),
            loadCartFetch()
        ])

    } catch (error) {
        console.log('Unexpected error. PLease try again later.')
    }

    renderCartItemsHtml();
    renderPaymentSummaryHtml();
    renderCheckoutHeaderHtml(); 
}

loadPage();

/*
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
*/

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