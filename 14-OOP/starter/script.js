"use strict";

const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //   never create a method inside a constructor function
  //   this.calcAge = function () {
  //     const age = new Date().getFullYear() - this.birthYear;
  //     return age;
  //   };
};

const harshal = new Person("Harshal", 1997);
console.log(harshal);

// 4 steps with the "new" keyword
// 1. New {} is created
// 2. function is called, 'this' keyword = {}
// 3. {} is linked to a prototype
// 4. function automatically returns {}

const matilda = new Person("Matilda", 2007);
const jack = new Person("Jack", 1975);

// checking if a created object is an instance of person
// console.log(harshal instanceof Person);

// PROTOTYPES
Person.prototype.calcAge = function () {
  const age = new Date().getFullYear() - this.birthYear;
  this.age = age;
};

// console.log(Person.prototype);

harshal.calcAge();
jack.calcAge();
matilda.calcAge();

console.log(harshal, jack, matilda);

// prototypal inheritance
Person.prototype.species = "Homo sapiens sapiens";

console.log(harshal.species, jack.species, matilda.species);

console.log(harshal.hasOwnProperty("firstName"));
console.log(harshal.hasOwnProperty("species")); //returns false as it gets it through prototypal inheritance

console.log(harshal.__proto__);
console.log(harshal.__proto__.__proto__);
console.log(harshal.__proto__.__proto__.__proto__); //  returns null as it Object.prototype is already part of the top level

console.dir(Person.prototype.constructor);

const arr = [3, 56, 7, 2, 56, 7];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); //  returns true

console.log(arr.__proto__.__proto__); //  returns object prototype

// EXTENDING PROTOTYPES IS NOT A GOOD IDEA
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector("h1");
console.dir((x) => x + 1); //function to object prototype
