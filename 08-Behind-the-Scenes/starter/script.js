"use strict";
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    const output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1991 && birthYear <= 1996) {
      var millenial = true;
      //   const firstName = "Steven";
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }

    // the str is block scoped as per pre-ES6 let and const variable declarations
    // console.log(str);
    console.log(millenial);

    // functions are block-scoped so it will not work here (add is declared inside the if-block)
    // add(2, 3);
  }

  printAge();
  return age;
}

const firstName = "Harshal";
calcAge(1997);
*/

// console.log(me);
// console.log(job);
// console.log(year);

// var me = "Harshal";
// let job = "Software developer";
// const year = 1997;

// console.log(addDecl(2, 3));
// console.log(addExpr(2, 3));
// console.log(addArrow(2, 3));

// function addDecl(a, b) {
//   return a + b;
// }

// const addExpr = function (a, b) {
//   return a + b;
// };

// var addArrow = (a, b) => a + b;

/*
console.log(numProducts);
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log("All products deleted");
}*/

// console.log(this);
/*
const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); //this will be undefined here
};

calcAge(1997);

const calcAgeArrow = (birthYear) => {
  console.log(2037 - birthYear);
  console.log(this); //this will display the window
  // arrow functions do not get their own "this" keyword. they get the keyword from their parent scope.
};

calcAgeArrow(1992);


const harshal = {
  year: 1997,
  calcAge: function (params) {
    console.log(this);
    console.log(2037 - this.year);
  },
};

harshal.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = harshal.calcAge; //method borrowing
matilda.calcAge(); // the "this" keyword points to the object calling the method - in this case "matilda"

const f = harshal.calcAge;
f(); // the "this" keyword will be undefined here - it's a normal function call. not attached to any objects



const harshal = {
  firstName: "Harshal",
  year: 1997,
  calcAge: function (params) {
    console.log(this);
    console.log(2037 - this.year);
    const self = this;
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial(); //this will not work here either
  },

  greet: () => console.log(`Hey ${this.firstName}`),
};

harshal.greet(); // this will be undefined as arrow functions do not get a "this" keyword. uses it's parent scope.
harshal.calcAge();
*/

// arguments keyword
// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };

// addExpr(2, 5, 8, 20, 15);

// var addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };

// addArrow(2, 5, 8); // arguments keyword does not exist for arrow functions

// var storage - primitive vs. reference
// let age = 26;
// let oldAge = 26;

// age = 27;

// console.log(age);
// console.log(oldAge);

// const me = {
//   name: "Harshal",
//   age: 27,
// };

// const friend = me;
// friend.age = 28;

// // the result below will be the SAME
// console.log("friend:", friend);
// console.log("me", me);

// primitive types
let lastName = "Williams";
let oldLastName = lastName;
lastName = "Davis";
console.log(lastName, oldLastName);

// reference types
const jessica = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = "Davis";

console.log(jessica, marriedJessica);

const jessica2 = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
  family: ["alice", "bob"],
};

// use object.assign to copy objects, instead of using references

// SHALLOW COPY - only copies first level objects
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = "Davis";
console.log(jessica2, jessicaCopy);

jessicaCopy.family.push("Mary");
jessicaCopy.family.push("John");
console.log(jessica2, jessicaCopy);
