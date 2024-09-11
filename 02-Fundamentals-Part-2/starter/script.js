// strict mode activation
'use strict';
// console.clear();

/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("I can drive");

// these will be flagged as reserved words
// const interface = 'Audio';
// const private = "test";

///////////////////////////////////////
// Functions
function logger() {
  console.log('My name is Jonas');
}
 
// calling / running / invoking function
logger();
logger();
logger();
 
function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}
 
const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);
 
const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);
 
const num = Number('23');
 
 
///////////////////////////////////////
// Function Declarations vs. Expressions
 
// Function declaration
function calcAge1(birthYeah) {
  return 2037 - birthYeah;
}
const age1 = calcAge1(1991);
 
// Function expression
const calcAge2 = function (birthYeah) {
  return 2037 - birthYeah;
}
const age2 = calcAge2(1991);
 
console.log(age1, age2);
 
 
///////////////////////////////////////
// Arrow functions
 
const calcAge3 = birthYeah => 2037 - birthYeah;
const age3 = calcAge3(1991);
console.log(age3);
 
const yearsUntilRetirement = (birthYeah, firstName) => {
  const age = 2037 - birthYeah;
  const retirement = 65 - age;
  // return retirement;
  return `${firstName} retires in ${retirement} years`;
}
 
console.log(yearsUntilRetirement(1991, 'Jonas')); console.log(yearsUntilRetirement(1980, 'Bob'));
 
 
///////////////////////////////////////
// Functions Calling Other Functions
function cutFruitPieces(fruit) {
  return fruit * 4;
}
 
function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);
 
  const juice = `Juice with ${applePieces} piece of apple and ${orangePieces} pieces of orange.`;
  return juice;
}
console.log(fruitProcessor(2, 3));
 
 
///////////////////////////////////////
// Reviewing Functions
const calcAge = function (birthYeah) {
  return 2037 - birthYeah;
}
 
const yearsUntilRetirement = function (birthYeah, firstName) {
  const age = calcAge(birthYeah);
  const retirement = 65 - age;
 
  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired 🎉`);
    return -1;
  }
}
 
console.log(yearsUntilRetirement(1991, 'Jonas'));
console.log(yearsUntilRetirement(1950, 'Mike'));

 
///////////////////////////////////////
// Coding Challenge #1
 

Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
A team ONLY wins if it has at least DOUBLE the average score of the other team. Otherwise, no team wins!
 
1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Koalas win (30 vs. 13)".
4. Use the 'checkWinner' function to determine the winner for both DATA 1 and DATA 2.
5. Ignore draws this time.
 
TEST DATA 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
TEST DATA 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
 
HINT: To calculate average of 3 values, add them all together and divide by 3
HINT: To check if number A is at least double number B, check for A >= 2 * B. Apply this to the team's average scores 😉
 
GOOD LUCK 😀
*/

/*
const calcAverage = (a, b, c) => (a + b + c) / 3;
console.log(calcAverage(3, 4, 5));
 
// Test 1
let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(65, 54, 49);
console.log(scoreDolphins, scoreKoalas);
 
const checkWinner = function (avgDolphins, avgKoalas) {
  if (avgDolphins >= 2 * avgKoalas) {
    console.log(`Dolphins win 🏆 (${avgDolphins} vs. ${avgKoalas})`);
  } else if (avgKoalas >= 2 * avgDolphins) {
    console.log(`Koalas win 🏆 (${avgKoalas} vs. ${avgDolphins})`);
  } else {
    console.log('No team wins...');
  }
}
checkWinner(scoreDolphins, scoreKoalas);
 
checkWinner(576, 111);
 
// Test 2
scoreDolphins = calcAverage(85, 54, 41);
scoreKoalas = calcAverage(23, 34, 27);
console.log(scoreDolphins, scoreKoalas);
checkWinner(scoreDolphins, scoreKoalas);
 
 
///////////////////////////////////////
// Introduction to Arrays
const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';
 
const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);
 
const y = new Array(1991, 1984, 2008, 2020);
 
console.log(friends[0]);
console.log(friends[2]);
 
console.log(friends.length);
console.log(friends[friends.length - 1]);
 
friends[2] = 'Jay';
console.log(friends);
// friends = ['Bob', 'Alice']
 
const firstName = 'Jonas';
const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends];
console.log(jonas);
console.log(jonas.length);
 
// Exercise
const calcAge = function (birthYeah) {
  return 2037 - birthYeah;
}
const years = [1990, 1967, 2002, 2010, 2018];
 
const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);
 
const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
console.log(ages);


// ARRAY METHODS

const friends = ['Michael', 'Steven', 'Peter'];

// adds an element at the end of the array
// the push function returns the value of the new array.
const newLength = friends.push('Jay');
console.log(friends, newLength);

// adds an element to the start of the array
friends.unshift("John");
console.log(friends);

// remove elements
// pop returns the removed element
const popped = friends.pop(); // Last element of the array
console.log(friends, `Removed element is ${popped}`);

// remove 1st element
const shifted = friends.shift();
console.log(friends, `Removed element is ${shifted}`);

// returns the index of the element.
// if it doesn't find the element, it returns -1
// old method
console.log(friends.indexOf('Steven'));

// returns a boolean for whether the element is present inside the array.
// uses strict equality (===)
console.log(friends.includes('Steven'));
console.log(friends.includes('Bob'));

var firstName = 'Peter';

if (friends.includes(firstName)) {
  console.log(`Peter exists`);
}


// CODING CHALLENGE #2

const bills = [125,555,44];
const tips = [ calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

console.log(bills, tips);

function calcTip(bill) {
  if (bill>=50 && bill<=300) {
      var tip = 0.15 * bill;
      return tip;
  } else {
      var tip = 0.2 * bill;
      return tip;
  }
}

const totals = [bills[0]+tips[0],bills[1]+tips[1], bills[2]+tips[2] ];
console.log(totals);



// OBJECTS

const harshalArray = ['Harshal', 'Bhawe', 2024-1997, 'developer' , ['Michael', 'Peter', 'Steve']];
console.log(harshalArray);


const harshal = {
  firstName: 'Harshal',
  lastName: 'Bhawe',
  age: 2024-1997,
  job:'developer',
  friends: ['Michael', 'Peter', 'Steve']
};

// keys inside JSON are stored alphabetically
console.log(harshal);
// console.log(JSON.stringify(harshal));


// DOT AND BRACKET NOTATION

// these 2 do the same operation
// the difference is that the bracket notation can take expressions
console.log(harshal.lastName);
console.log(harshal['lastName']);

const nameKey = 'Name';
console.log(harshal['first'+nameKey]);
console.log(harshal['last'+nameKey]);

// console.log(harshal.friends);

// const userPrompt = prompt('Enter a key. Choose between firstName, lastName, age, job and friends');
// alert(harshal[userPrompt]);
// console.log(harshal[userPrompt]);

// if(harshal[userPrompt]){
//     console.log(harshal[userPrompt]);
// } else {
//     console.log(`No value for that key`);
// }

harshal.location = 'Uppsala, Sweden';
harshal['github'] = '@HBhawe';
console.log(harshal);

// challenge
// "Harshal has 3 friends, and his best friend is Michael"

// multiple ways of writing the same sentence
console.log(`${harshal['firstName']} has ${harshal['friends'].length} friends, and his best friend is called ${harshal['friends'][0]}`);
console.log(`${harshal.firstName} has ${harshal.friends.length} friends, and his best friend is called ${harshal.friends[0]}`);


// OBJECT METHODS

const harshal = {
  firstName: 'Harshal',
  lastName: 'Bhawe',
  birthYear:1997,
  hasDriversLicence:true,
  job:'developer',
  friends: ['Michael', 'Peter', 'Steve'],
  // calcAge: function (birthYear) {
  //     return 2037 - birthYear;
  // }
  // calcAge: function () {
  //     // console.log(this);
  //     return 2037 - this.birthYear;
  // }
  calcAge: function(){
      this.age = 2037 - this.birthYear;
      return this.age;
  },

  getSummary: function () {
      if (this.hasDriversLicence) {
          var driverString = `and he has a driver's license`;
      } else {
          var driverString = `and he has no driver's license`;
      }
      return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, ${driverString}`
  }
};

// 2 ways of doing things
// for a hardcoded function inside the object
// console.log(harshal.calcAge(harshal.birthYear));
// console.log(harshal['calcAge'](harshal['birthYear']));
console.log(harshal.firstName);
const value = 'job';
console.log(harshal[value]);

var abc;

console.log(harshal.calcAge());

// using the 'this' keyword
// console.log(harshal.calcAge());
// console.log(harshal);

// Harshal is a 40-year old developer, and he has a driver's license.
console.log(harshal.getSummary());

// CODING CHALLENGE 3
const mark = {
  fullName: 'Mark Miller',
  mass: 78,
  height:1.69,
  calcBMI: function () {
      this.bmi = this.mass/(this.height*this.height)
      return this.bmi;
  }
}

const john = {
  fullName: 'John Smith',
  mass: 92,
  height:1.95,
  calcBMI: function () {
      this.bmi = this.mass/(this.height*this.height);
      return this.bmi;
  }
}

if (mark.calcBMI() > john.calcBMI()) {
  console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})`);
} else {
  console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s (${mark.bmi})`)
}


// LOOPS

// for loop
for (let index = 1; index <= 10; index++) {
  console.log(`I go to the gym ${index}`);
}


const harshalArray = ['Harshal', 'Bhawe', 2024-1997, 'developer' , ['Michael', 'Peter', 'Steve']];
// console.log(harshalArray);
const typeArray = [];

for (let index = 0; index < harshalArray.length ; index++) {
  // console.log(harshalArray[index], typeof(harshalArray[index]));
  typeArray[index] = typeof(harshalArray[index]);
}

// console.log(typeArray);

const years = [1991,2007,1969,2020];
const ages= [];

for (let index = 0; index < years.length; index++) {
// ages[index] = 2037 - years[index];
ages.push(2037 - years[index]);
}

console.log(ages);


// continue and break statement
const harshalArray = ['Harshal', 'Bhawe', 2024-1997, 'developer' , ['Michael', 'Peter', 'Steve']];
// console.log(harshalArray);
const typeArray = [];

// skips to the next iteration if the type is not a string
for (let index = 0; index < harshalArray.length ; index++) {
  // console.log(harshalArray[index], typeof(harshalArray[index]));
  // typeArray[index] = typeof(harshalArray[index]);
  if (typeof(harshalArray[index]) !== "string") continue;    
  console.log(harshalArray[index], typeof(harshalArray[index]));
}

// breaks when the first number is found
for (let index = 0; index < harshalArray.length ; index++) {
// console.log(harshalArray[index], typeof(harshalArray[index]));
// typeArray[index] = typeof(harshalArray[index]);
if (typeof(harshalArray[index]) === "number") break;    
console.log(harshalArray[index], typeof(harshalArray[index]));
}



// BACKWARDS LOOPS

const harshalArray = ['Harshal', 'Bhawe', 2024-1997, 'developer' , ['Michael', 'Peter', 'Steve']];

for (let index = harshalArray.length - 1; index >= 0 ; index--) {
console.log(harshalArray[index]);
}

// NESTED LOOPS

for (let exercise = 1; exercise <= 3; exercise++) {
  console.log(`------STARTING EXERCISE ${exercise}--------`)

  for (let rep = 1; rep <= 5; rep++) {
    console.log(`------Weightlifting rep #${rep}--------`)
  }

}
*/

// WHILE LOOPS


