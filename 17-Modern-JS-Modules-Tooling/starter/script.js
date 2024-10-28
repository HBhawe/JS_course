// importing module
// import {
//   addToCart,
//   totalPrice as price,
//   totalQuantity,
// } from "./shoppingCart.js";
// addToCart(`abcd`, 10);
// console.log(price, totalQuantity);

// import * as ShoppingCart from "./shoppingCart.js";
// console.log(ShoppingCart, ShoppingCart.totalPrice);
// ShoppingCart.addToCart("bread", 5);

// default import
import add, { cart } from "./shoppingCart.js";
add("pizza", 2);

// top level await
// for modules - await works OUTSIDE async functions
// BLOCKS the entire module

// console.log("start fetching");
// const res = await fetch("https://jsonplaceholder.typicode.com/posts");
// const data = await res.json();
// console.log(data);
// console.log("something");

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
