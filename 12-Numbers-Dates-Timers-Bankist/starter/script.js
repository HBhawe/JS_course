"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2024-09-29T17:01:17.194Z",
    "2024-10-01T23:36:17.929Z",
    "2024-10-02T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);

  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    // using the current index to also get date from the dates array
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMovement = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovement}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formatCur(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCur(incomes, acc.locale, acc.currency)}`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${formatCur(
    Math.abs(out),
    acc.locale,
    acc.currency
  )}`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${formatCur(
    interest,
    acc.locale,
    acc.currency
  )}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// FAKE ALWAYS LOG IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

// experimentation with internationalisation API
// const now = new Date();
// const options = {
//   day: "numeric",
//   month: "long",
//   year: "numeric",
//   hour: "numeric",
//   minute: "numeric",
//   weekday: "long",
// };

// const locale = navigator.language;

// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format();

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // create current date
    const now = new Date();
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    // const locale = navigator.language;
    const locale = currentAccount.locale;

    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format();
    // pads with a 0 to get a total length of 2
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const minutes = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);
  }
});

// LOAN FUNCTION
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  // round down values
  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // add date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
// CONVERT AND CHECK NUMBERS
console.log(23 === 23.0);

// BASE 10 - 0-9
// BINARY Base 2 - 0-1

// floating point errors
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

console.log(+"23");
console.log("23");

// type coercion
console.log(+"23");

// PARSING
console.log(Number.parseInt("30xy"));

// this won't work - string needs to start with a number
console.log(Number.parseInt("xy30"));

// 2nd parameter - base of the number (base 10, 2 etc)
console.log(Number.parseInt("30px", 10));

// difference between int and float
console.log(Number.parseInt("2.5rem"));
console.log(Number.parseFloat("2.5rem"));

// check for not a number - not perfect as there are edge cases
console.log(Number.isNaN(20));
console.log(Number.isNaN(+"20X"));
console.log(Number.isNaN(23 / 0)); //infinity doesn't count

// better check for numbers
console.log(Number.isFinite(20));
console.log(Number.isFinite(+"20X"));
console.log(Number.isFinite(23 / 0));
*/

// 2
// MATHS AND ROUNDING
/*
// square root
console.log(Math.sqrt(25));

// power
console.log(Math.pow(5, 2));

// max value - type coercion
console.log(Math.max(5, 18, 23, 45, 66, 78));

// returns NaN
console.log(Math.max(5, 18, "23px", 45, 66, 78));

// min value
console.log(Math.min(5, 18, 23, 45, 66, 78));

// pi
// area of circle of radius 10px
console.log(Math.PI * Number.parseFloat("10px") ** 2);

// dice roll
console.log(Math.trunc(Math.random() * 6) + 1);

// random INT between min and max
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

console.log(randomInt(5, 8));
console.log(randomInt(10, 20));

// rounding INT
console.log(Math.trunc(23.235645)); //removes decimal parts
console.log(Math.round(23.6));
console.log(Math.round(23.3));

// ceiling - rounds up
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.6));

// floor - rounds down
console.log(Math.floor(23.3));
console.log(Math.floor(23.6));

// trunc vs floor
console.log(Math.trunc(-23.235645)); //rounds to -23
console.log(Math.floor(-23.235645)); //rounds to -24 - correct

// ROUNDING FLOAT/DECIMAL

// toFixed returns a string
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3)); //adds decimal places
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));
*/

// 3
// REMAINDER
/*
console.log(5 % 2);

console.log(6 % 2);

const evenOdd = (num) => (num % 2 === 0 ? `even` : `odd`);
console.log(evenOdd(4));
console.log(evenOdd(5));
console.log(evenOdd(45678));

labelBalance.addEventListener("click", function () {
  [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = "orangered";
    if (i % 3 === 0) row.style.backgroundColor = "blue";
  });
});
*/

// 4. NUMERIC SEPARATORS
// 287,460,000,000
// underscores where the commas are
// JS ignores this - displays the whole value.
/*
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

// not allowed at the start, end of a number or next to decimal separators
const PI = 3.1415;
console.log(PI);

// numeric separators do not work for strings with type coercion
console.log(Number("23000"));
console.log(Number("23_000"));
console.log(parseInt("23_000"));
*/

// BIG INT
// biggest number JS can safely represent
/*
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

// this won't work
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);

// big int
console.log(53347583456348765384658345837465n);
console.log(BigInt(34573856348567834568953596734593456739456768));

// operations
console.log(10000n + 10000n);
console.log(56784694594567974596874576n * 34737845283756293749n);

const huge = 5968745968769467945679456745967495n;
const num = 23;
// console.log(huge * num); //this won't work
console.log(huge * BigInt(num));

console.log(20n > 15);
console.log(20n === 20); //no type coercion of "===" so it will return false
console.log(typeof 20n);
console.log(20n == 20); //this returns true
console.log(20n == "20"); //this returns true

console.log(huge + " is really BIG"); //converts to string

// DIVISIONS
console.log(10n / 3n); // returns the closest bigInt - 3n
*/

// DATES AND TIMES

// create a date
/*
const now = new Date();
console.log(now);

console.log(new Date("")); //invalid
console.log(new Date("Aug 02 2020 18:08:41"));
console.log(new Date("December 25, 2024"));

console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2037, 10, 19, 15, 23, 5)); // months in JS are 0 based so 10 is actually November
console.log(new Date(2037, 10, 31, 15, 23, 5)); // returns 1st dec

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days after 0 - expressed as milliseconds

// working with dates
const future = new Date(2037, 10, 19, 15, 23);

// getters
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate()); // day of the month
console.log(future.getDay()); // day of the week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getTime()); //milliseconds since 1st Jan 1970 - Unix time

console.log(future.toISOString());
console.log(future.toLocaleString());

console.log(Date.now()); //get current milliseconds

// setters
future.setFullYear(2040);
console.log(future);
*/

// DATE CALCULATION
/*
const date1 = new Date();
const date2 = new Date(2037, 10, 19, 15, 23);
console.log(date2 - date1);

// returns a millisecond value and then converted to days
const calcDaysPassed = (date1, date2) =>
  Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1);

const days2 = calcDaysPassed(
  new Date(2037, 3, 14),
  new Date(2037, 3, 4, 10, 8)
);
console.log(days2);
*/

// INTERNATIONALISATION
// NUMBERS
/*
const num = 82547583.23;

const options = {
  style: "currency",
  unit: "celsius",
  currency: "INR",
  // useGrouping: false,
};

console.log("SE: ", new Intl.NumberFormat("sv-SE", options).format(num));
console.log("US: ", new Intl.NumberFormat("en-US", options).format(num));
console.log("Marathi: ", new Intl.NumberFormat("mr-IN", options).format(num));
console.log(
  `${navigator.language}: `,
  new Intl.NumberFormat(navigator.language, options).format(num)
);
*/

// TIMERS
/*
// executes the console log after 3000 ms = 3 seconds
// setTimeout(() => console.log(`here is your pizza`), 3000);
console.log(`Waiting...`);

// setTimeout(
//   (ing1, ing2) => console.log(`here is your pizza with ${ing1} and ${ing2}`),
//   3000,
//   "olives",
//   "spinach"
// );

const ingredients = ["olives", "spinach"];
// setTimeout(
//   (ing1) =>
//     console.log(
//       `here is your pizza with the ingredients ${ing1.join(" and ")}`
//     ),
//   3000,
//   ingredients
// );

const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);

if (ingredients.includes("spinach")) clearTimeout(pizzaTimer);
*/

// setInterval
setInterval(() => {
  const now = new Date();
  console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
  // console.log(now);
}, 1000);
