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

const eurToUsd = 1.1;

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  // calculate deposits
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income} €`;

  // calculate withdrawals
  const outgoing = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outgoing)} €`;

  // calculate interest
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((i) => i >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} €`;
};

// calcDisplaySummary(account1.movements);

// const user = "Steven Thomas Williams"; //stw

// convert to lowercase, create a string array, take the first letter from each and join with empty string
// we use forEach as we want to mutate the original accounts arrays and add the username property.
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUsername(accounts);

const updateUI = function (acc) {
  // display movements
  displayMovements(currentAccount.movements);

  // display balance
  calcDisplayBalance(currentAccount);

  // display summary
  calcDisplaySummary(currentAccount);
};

// EVENT HANDLERS
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  // pin is only read if current account actually exists
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";

    // make field lose focus
    inputLoginPin.blur();

    // update UI
    updateUI(currentAccount);

    // console.log(`Login`);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    // doing the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

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

// MAP
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// // SETS
// const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR"]);
// console.log(currenciesUnique);

// // the _value is a throwaway variable - there is no "key" in sets
// currenciesUnique.forEach(function (value, _value, map) {
//   console.log(`${_value}: ${value}`);
// });

/*
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // console.log(dogsJuliaCorrected);

  const dogsBoth = dogsJuliaCorrected.concat(dogsKate);
  // console.log(dogsBoth);
  dogsBoth.forEach(function (age, i) {
    if (age >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    } else console.log(`Dog number ${i + 1} is still a puppy`);
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

// DATA TRANSFORMATION

// MAP METHOD
// const arr = [3, 1, 4, 3, 2];

// arr.map(function (value, index, array) {
//   console.log(`at ${index + 1} position, we have ${value}`);
// });

// old method
/*
const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * eurToUsd);
}
console.log(movementsUSDfor);
*/

// FUNCTIONAL PROGRAMMING
/*
const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});

// ARROW FUNCTION
const movementsUSDArrow = movements.map((mov) => mov * eurToUsd);

// console.log(movements);
// console.log(movementsUSD);
// console.log(movementsUSDArrow);

// ARROW FUNCTION
// returns an array instead of logging to console
const movementsDescriptions = movements.map(
  (mov, i) =>
    `${mov > 0 ? "Deposit" : "Withdrawal"} ${i + 1} : ${Math.abs(mov)}`
);

console.log(movementsDescriptions);
*/

// FILTER METHOD

// takes only the positive elements and saves it to a new array
/*
const deposits = movements.filter((mov) => mov > 0);
console.log(movements);
console.log(deposits);

// takes only the negative elements and saves it to a new array
const withdrawals = movements.filter((mov) => mov < 0);
console.log(withdrawals);
*/

// REDUCE METHOD
// reduces array to 1 answer
// console.log(movements);

// 1st element of reduce callback is something called the "accumulator"
// like a snowball - collects elements
// 2nd parameter - initial value of the accumulator (,0 in this case)
// we can set this starting value to anything we want

/*
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);
console.log(balance);
*/

// testing with letters
/*
const letters = ["h", "a", "r", "s", "h", "a", "l"];
const letterName = letters.reduce((acc, cur, i, arr) => acc + cur, "");
console.log(letterName);
*/

/*
// MAXIMUM VALUE
// uses a ternary operator and an arrow function to get the maximum value
const maxValue = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
);
console.log(maxValue);

// MINIMUM VALUE
const minValue = movements.reduce(
  (acc, mov) => (acc < mov ? acc : mov),
  movements[0]
);
console.log(minValue);
*/

// CODING CHALLENGE 2 and 3
// I initially made 3 separate methods but for convenience I chained them all together

/*
const calcAverageHumanAge = (ages) =>
  ages
    .map((age) => (age > 2 ? 16 + age * 4 : 2 * age))
    .filter((age) => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/

// we can keep chaining as long as the previous method returns an array
// we cannot chain anything after reduce as it returns a single value
// the current "arr" value in the callback function can be used to check the value during the operation
/*
const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  // .map((mov) => mov * eurToUsd)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov);
console.log(totalDepositsUSD);
*/

// FIND METHOD

// first value that meets the conditions
// only returns 1 element. NOT AN ARRAY

// const firstWithdrawal = movements.find((mov) => mov < 0);

// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);
// const account = accounts.find((acc) => acc.owner === "Jessica Davis");
// console.log(account);
