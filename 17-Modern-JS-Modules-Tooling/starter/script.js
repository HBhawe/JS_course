// importing module
import "core-js/actual";

// polyfilling async functions
import "regenerator-runtime/runtime.js";

import {
  addToCart,
  totalPrice as price,
  totalQuantity,
} from "./shoppingCart.js";
addToCart(`abcd`, 10);
console.log(price, totalQuantity);

import * as ShoppingCart from "./shoppingCart.js";
console.log(ShoppingCart, ShoppingCart.totalPrice);
ShoppingCart.addToCart("bread", 5);

// default import
import add, { cart } from "./shoppingCart.js";
add("pizza", 2);
add("bread", 5);
add("apples", 4);

console.log(cart);

// top level await
// for modules - await works OUTSIDE async functions
// BLOCKS the entire module

// console.log("start fetching");
// const res = await fetch("https://jsonplaceholder.typicode.com/posts");
// const data = await res.json();
// console.log(data);
// console.log("something");

/*
const getLastPost = async function () {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

// returns a promise
const lastPost = getLastPost();
console.log(lastPost);

// not very clean
// lastPost.then((last) => console.log(last));

// using top level await
const lastPost2 = await getLastPost();
console.log(lastPost2);
*/

/*
// this works because of closures
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart("apple", 4);
ShoppingCart2.addToCart("pizza", 2);
console.log(ShoppingCart2);

// cannot access this in the space
console.log(ShoppingCart2.shippingCost);
*/

// COMMON JS MODULES

// won't work in the browser
// export.addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart`);
// };

// import - require won't work either
// const { addToCart } = require("./shoppingCart.js");

// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
import cloneDeep from "lodash-es";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

// hot module replacement
if (module.hot) {
  module.hot.accept();
}

class Person {
  greeting = "hey";
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const harshal = new Person("harshal");

console.log(cart.find((el) => el.quantity >= 2));

Promise.resolve("TEST").then((x) => console.log(x));
