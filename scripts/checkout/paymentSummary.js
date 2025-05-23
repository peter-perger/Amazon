import { cart, getMatchingProduct, calculateCartQuantity } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummaryHtml() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
  
    cart.forEach((cartItem) => {
      const product = getMatchingProduct(cartItem.productId);
      productPriceCents += product.priceCents * cartItem.quantity;
  
      const deliveryOption = getDeliveryOption(cartItem.deliveryId);
      shippingPriceCents += deliveryOption.priceCents;
    });
  
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryhtml = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button js-place-order-button button-primary">
            Place your order
          </button>    
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryhtml;

    document.querySelector('.js-place-order-button')
      .addEventListener('click', async () => {
        try {
          const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
              cart: cart
            })
          });

          const order = await response.json();
          addOrder(order);
        }
        catch (error){
          console.log('Unexpected errror, try again later')
        }

        window.location.href = 'orders.html'
    });
}