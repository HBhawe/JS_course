// importing module
import {
  addToCart,
  totalPrice as price,
  totalQuantity,
} from "./shoppingCart.js";
console.log(`Importing module`);

addToCart(`abcd`, 10);

console.log(price, totalQuantity);
