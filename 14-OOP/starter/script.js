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
// console.log(harshal);

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

// console.log(harshal, jack, matilda);

// prototypal inheritance
Person.prototype.species = "Homo sapiens sapiens";

// console.log(harshal.species, jack.species, matilda.species);

// console.log(harshal.hasOwnProperty("firstName"));
// console.log(harshal.hasOwnProperty("species")); //returns false as it gets it through prototypal inheritance

// console.log(harshal.__proto__);
// console.log(harshal.__proto__.__proto__);
// console.log(harshal.__proto__.__proto__.__proto__); //  returns null as it Object.prototype is already part of the top level

// console.dir(Person.prototype.constructor);

const arr = [3, 56, 7, 2, 56, 7];
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype); //  returns true

// console.log(arr.__proto__.__proto__); //  returns object prototype

// EXTENDING PROTOTYPES IS NOT A GOOD IDEA
Array.prototype.unique = function () {
  return [...new Set(this)];
};

// console.log(arr.unique());

const h1 = document.querySelector("h1");
// console.dir((x) => x + 1); //function to object prototype

// CODING CHALLENGE 1
/**
 * The function `Car` creates a new object representing a car with properties for make and speed.
 * @param make - Make is a parameter that represents the brand or manufacturer of the car. It could be
 * a string value such as "Toyota", "Honda", "Ford", etc.
 * @param speed - The `speed` parameter in the `Car` function represents the speed of the car in km/h. It is
 * used to store and track the current speed of the car object created using the `Car` constructor
 * function.
 */

/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const bmw = new Car("BMW", 120);
// console.log(bmw);
bmw.accelerate();
bmw.brake();
// console.log(bmw);

const mercedes = new Car("Mercedes", 95);
// console.log(mercedes);
mercedes.accelerate();
mercedes.brake();
// console.log(mercedes);
*/

// ES6 CLASSES

// class expression
// const PersonCl = class{}

// class declaration
// class PersonCl {}

const PersonCl = class {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // METHODS will be added to the prototype of the PersonCl class
  calcAge() {
    let age = new Date().getFullYear() - this.birthYear;
    this.age = age;
  }

  greet() {
    console.log(
      `Hey, my name is ${this.firstName}. I am ${this.age} years old`
    );
  }
};

const jessica = new PersonCl("Jessica", 1996);
console.log(jessica);

jessica.calcAge();
console.log(jessica);

// MANUALLY adding a method
// PersonCl.prototype.greet = function () {
//   console.log(`Hey, my name is ${this.firstName}. I am ${this.age} years old`);
// };

jessica.greet();

// CLASS RULES
// 1. Classes are not hoisted
// 2. Classes are first-class citizens
// 3. Classes are auto executed in strict mode
