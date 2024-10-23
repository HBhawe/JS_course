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

// static function
Person.hey = function () {
  console.log(`Hey there!`);
};

// not inherited by objects created by the person object
// Person.hey();

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

// console.log(harshal.hasOwnProperty("fullName"));
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
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // METHODS will be added to the prototype of the PersonCl class
  calcAge() {
    let age = new Date().getFullYear() - this.birthYear;
    this.age = age;
  }

  greet() {
    console.log(`Hey, my name is ${this.fullName}. I am ${this.age} years old`);
  }

  get personAge() {
    return this.age;
  }

  // this method is executed whenever we set the this.fullName method
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else alert(`The given name is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  // STATIC METHOD
  static hey() {
    console.log(`Hey there!`);
  }
};

/*
const jessica = new PersonCl("Jessica Davis", 1996);
// console.log(jessica);

jessica.calcAge();
console.log(jessica.personAge);
console.log(jessica);
*/

// MANUALLY adding a method
// PersonCl.prototype.greet = function () {
//   console.log(`Hey, my name is ${this.fullName}. I am ${this.age} years old`);
// };

/*
jessica.greet();

const walter = new PersonCl("Walter White", 1965);
PersonCl.hey();
*/
// CLASS RULES
// 1. Classes are not hoisted
// 2. Classes are first-class citizens
// 3. Classes are auto executed in strict mode
/*
// SETTERS AND GETTERS

const account = {
  owner: "jonas",
  movements: [200, 500, 120, 300],

  // GETTER
  get latest() {
    return this.movements.slice(-1).pop();
  },

  // SETTER
  set latest(mov) {
    this.movements.push(mov);
  },
};

// we do not call the getter as a method
console.log(account.latest);

// setters
account.latest = 50;
console.log(account.movements);
*/

// OBJECT.CREATE
/* The `personProto` object is being used to create a prototype for creating new person objects. It
contains two methods: */
const personProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

/*
const steven = Object.create(personProto);
console.log(steven);

steven.name = "Steven";
steven.birthYear = 2002;
console.log(steven);

steven.calcAge();

const sarah = Object.create(personProto);
sarah.init("Sarah", 2012);
sarah.calcAge();
console.log(sarah);
*/

/*
// CODING CHALLENGE 2

const carCl = class {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed}km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed}km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
};

const ford = new carCl("Ford", 120);
console.log(ford);
console.log(ford.speedUS);
ford.speedUS = 150;
console.log(ford);
ford.accelerate();
ford.brake();
ford.accelerate();
console.log(ford);
*/

//  INHERITANCE BETWEEN CLASSES
/*
// console.log(Person.prototype);

const Student = function (firstName, birthYear, course) {
  // this is the "NORMAL" way of doing a new class
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// THIS CONNECTION NEEDS TO BE MADE BEFORE ADDING METHODS TO THE STUDENT "CLASS"
Student.prototype = Object.create(Person.prototype);

// add the introduce method
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
// console.log(mike);
mike.introduce();
console.log(Student);

// this will work as the Person prototype is set using line 292
// calcAge and species are prototypes of the Person
mike.calcAge();
console.log(mike.species);
console.log(mike);

Student.prototype.constructor = Student;
*/

// CODING CHALLENGE 3
/*
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} is going at ${this.speed}km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV("Tesla", 120, 23);
tesla.chargeBattery(90);
console.log(tesla);

tesla.accelerate();

tesla.brake();
// tesla.chargeBattery(90);
console.log(tesla);
tesla.accelerate();
*/

/*
// ES6 CLASS INHERITANCE
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // ALWAYS NEEDS TO HAPPEN FIRST
    super(fullName, birthYear); //calls the super function class
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // overwrites parent class inheritance
  calcAge() {
    console.log(
      `I am ${2037 - this.birthYear} years old, but as a student I feel like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl("Martha Jones", 2012, "Computer Science");
martha.introduce();
martha.calcAge();
console.log(martha);
*/

// INHERITANCE using object.create
/*
const StudentProto = Object.create(personProto);

StudentProto.init = function (firstName, birthYear, course) {
  personProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
console.log(jay);
jay.init("Jay", 2007, "Computer Science");
jay.introduce();
jay.calcAge();

// jay.init("Jay", 2007);
// console.log(jay);
*/

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;
    console.log(`Thanks for opening an account ${this.owner}`);
  }

  // PUBLIC INTERFACE
  // API
  deposit(val) {
    this.movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan appoved`);
    }
  }
}

const acc1 = new Account("Harshal", "INR", 1111);
console.log(acc1);

// NOT RECOMMENDED
// acc1.movements.push(250);
// acc1.movements.push(-140);
// console.log(acc1);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
acc1.approveLoan(1000);

console.log(acc1);
