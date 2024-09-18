"use strict";

// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   //   ES5
//   //   numPassengers = numPassengers || 1;
//   //   price = price || 199;

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };

//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking("LH123");
// createBooking("LH123", 2, 800);
// createBooking("LH123", 2);
// createBooking("LH123", 5);

// // cannot do this - returns error
// // createBooking("LH123", , 500);

// createBooking("LH123", undefined, 5000);

// const flight = "LH1234";
// const harshal = {
//   name: "Harshal Bhawe",
//   passport: "43534gk",
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = "LH999";
//   passenger.name = "Mr. " + passenger.name;

//   if (passenger.passport === "43534gk") {
//     alert("Check in");
//   } else alert("Wrong passport");
// };

// // checkIn(flight, harshal);
// // console.log(flight, harshal);

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000000);
// };

// newPassport(harshal);
// // checkIn(flight, harshal);

// console.log(harshal);

// passing by value and passing by reference
// there is NO pass by reference in JS

// FIRST CLASS AND HIGHER ORDER FUNCTIONS

// FIRST CLASS
// assign to variables
// functions as arguments to other functions
// return functions from other functions
// call methods on functions

// HIGHER ORDER FUNCTIONS
// function that receives a fn as an argument
// functions that returns a new function
// OR BOTH

// FUNCTIONS WITH CALLBACK FUNCTIONS
const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

// HIGHER ORDER FUNCTION - ABSTRACTION
const transformer = function (str, fn) {
  console.log(`original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by ${fn.name}`);
};

transformer("JavaScript is weird", upperFirstWord);
transformer("JavaScript is weird", oneWord);

// CALL BACK FUNCTION EXAMPLE
// add event listeners 2nd arg. is a call back function
const high5 = function () {
  console.log(`🖐️`);
};

document.body.addEventListener("click", high5);

// ["Harshal", "Joel", "Teresa"].forEach(high5);
