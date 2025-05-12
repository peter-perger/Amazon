import { formatCurrency } from "../../utils/money.js";

class Product {
  id;
  image;
  name;
  priceCents;
  rating;
  keywords;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHtml () {
    return ``;
  }
} 

class Clothing extends Product {
  sizeChartLink;
  
  constructor(productDetails) {
    super(productDetails); //calls the parents class constructor
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHtml () {
    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size chart
      </a>`;
  }
}

export let products = [];

export function loadProductsFetch() {
  const promise = fetch(
    'https://supersimplebackend.dev/products'
  
  ).then((response) => {
    return response.json();
  
  }).then((productsData) => {
    products = productsData
      .map((productDetails) => {
        if(productDetails.type === 'clothing') {
          return new Clothing(productDetails);
        }

        return new Product(productDetails);
      });

      console.log('load products');
  })//.catch((error) => {
  //   console.log('Unexpectred error');
  // });

  return promise;
}

export function loadProducts (fun) {
  const xhr = new XMLHttpRequest;

  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response)
      .map((productDetails) => {
        if(productDetails.type === 'clothing') {
          return new Clothing(productDetails);
        }

        return new Product(productDetails);
      });

      console.log('load products');

      fun();
  });
  
  xhr.addEventListener('error', () => {
    console.log('Unexpectred error');
  })

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}

export function loadCart (fun) {
  const xhr = new XMLHttpRequest;

  xhr.addEventListener('load', () => {
      console.log(xhr.response)
      fun();
  });
  
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

