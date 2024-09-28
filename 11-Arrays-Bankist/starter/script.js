"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// ARRAY METHODS
// let arr = ["a", "b", "c", "d", "e"];

// // SLICE - returns new array
// console.log(arr.slice(2));

// // 2-4 is elements 2 and 3
// console.log(arr.slice(2, 4));

// // end of the array
// console.log(arr.slice(-2));

// console.log(arr.slice(1, -2));

// // SHALLOW COPY
// // spread or slice - up to you
// console.log(arr.slice());
// console.log([...arr]);

// // SPLICE
// // almost the same way as slice
// // mutates the array

// // console.log(arr.splice(2));
// arr.splice(-1);
// console.log(arr);

// arr.splice(1, 2);
// console.log(arr);

// // REVERSE - MUTATES THE ARRAY
// arr = ["a", "b", "c", "d", "e"];
// const arr2 = ["j", "i", "h", "g", "f"];
// console.log(arr2.reverse());
// console.log(arr2);

// // CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// // JOIN
// console.log(letters.join(" - "));

// ARRAYS 2
// const arr = [23, 11, 64];

// // traditional way of doing this
// console.log(arr[0]);

// // NEW IN ES 2022
// console.log(arr.at(0));

// // last element - traditional ways
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);

// // NEW IN ES 2022
// console.log(arr.at(-1));

// // also works on strings
// console.log("Harshal".at(-1));

// ARRAYS 3
// FOR-EACH LOOP

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
console.log(`----FOR-OF----`);
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Deposit ${i + 1} - ${movement}`);
  } else {
    console.log(`Withdrawal ${i + 1} - ${Math.abs(movement)}`);
  }
}
console.log();

console.log(`----FOR-EACH----`);

// iterates over each element and executes the callback function
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Deposit ${i + 1} - ${mov}`);
  } else console.log(`Withdrawal ${i + 1} - ${Math.abs(mov)}`);
});

// FOR-OF VS. FOR-EACH
// break and continue do not work in for-each
*/
