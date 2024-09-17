"use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours,

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = "20:00",
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },
};

// // array destructuring

// const arr = [2, 3, 4];

// // normal way of doing this - time-consuming
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// // destructure - ES6
// const [x, y, z] = arr;
// console.log(x, y, z);

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// // SWITCHING VALUES WITH TEMP VARIABLES
// // let temp = main;
// // main = secondary;
// // secondary = temp;
// // console.log(main, secondary);

// // SWITCHING VALUES WITH ARRAY DESTRUCTURING
// [main, secondary] = [secondary, main];

// console.log(main, secondary);

// const [starter, mainCourse] = restaurant.order(2, 0);

// console.log(starter, mainCourse);

// const nested = [2, 4, [5, 6]];

// // const [i, , j] = nested;
// // console.log(i, j);

// // NESTED DESTRUCTURING
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // default values
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);

// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// // setting our own variable names
// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;

// console.log(restaurantName, hours, tags);

// // default values
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// // MUTATING VARIABLES
// let a = 111;
// let b = 99;
// console.log(a, b);
// const obj = { a: 23, b: 7, c: 14 };

// // wrap in parentheses
// ({ a, b } = obj);
// console.log(a, b);

// // NESTED OBJECTS
// const {
//   fri: { open, close },
// } = openingHours;
// console.log(open, close);

// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// // using defaults
// restaurant.orderDelivery({
//   address: 'Via del Sole, 21',
//   starterIndex: 1,
// });

// const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);

// SPREAD OPERATOR

// const newArr = [1, 2, ...arr];
// console.log(newArr);

// logs the individual elements on the array
// console.log(...newArr);

// adding an element to a NEW array
// const newMenu = [...restaurant.mainMenu, 'Gnocchi'];
// console.log(newMenu);

// copy array
// const mainMenuCopy = [...restaurant.mainMenu];

// join 2 arrays together
// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(menu);

// iterables: arrays, strings, maps. NOT objects

// spreading a string into its letters
// const string = 'Harshal';
// const letters = [...string];
// console.log(letters);

// const ingredients = [
//   prompt("Let's make pasta: Ingredient 1"),
//   prompt("Let's make pasta: Ingredient 2"),
//   prompt("Let's make pasta: Ingredient 3"),
// ];

// console.log(ingredients);

// const message = restaurant.orderPasta(...ingredients);
// console.log(message);

// objects
// const newRestaurant = { foundedIn: 1998, ...restaurant, founder: "Giuseppe" };
// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = "Ristorante Roma";
// console.log(JSON.stringify(restaurant), JSON.stringify(restaurantCopy));

// REST PATTERN

// SPREAD on right side of equals sign
// const arr = [1, 2, ...[3, 4]];

// REST on left side of equals sign
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizza, pasta, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];

// console.log(pizza, pasta, otherFood);

// objects
// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(sat, weekdays);

// functions

// this function can accept any number of paramters
// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//   }
//   console.log(sum);
// };

// add(2, 3);
// add(5, 3, 7, 2);

// const x = [23, 5, 7];
// add(...x);

// restaurant.orderPizza("mushrooms", "onions", "olives", "spinach");
// restaurant.orderPizza("mushrooms");

// USE ANY data type, return ANY data type, short-circuiting
// console.log(`------------ OR -------------`);
// returns the first truthy value
// console.log(3 || "Harshal");
// console.log("" || "harshal");
// console.log(true || 0);
// console.log(undefined || null);

// will return Hello
// console.log(undefined || 0 || "" || "Hello" || 23 || null);

// if numGuests doesn't exist, return 10
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// does the same operation with short-circuiting
// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// console.log();

// console.log(`------------ AND -------------`);
// returns the first falsy value, or the last value if all are true
// console.log(0 && "Harshal");
// console.log(7 && "Harshal");

// console.log("Hello" && 23 && null && "harshal");

// if (restaurant.orderPizza) {
//   restaurant.orderPizza("Mushrooms", "spinach");
// }

// restaurant.orderPizza && restaurant.orderPizza("Mushrooms", "spinach");

// restaurant.numGuests = 0;
// const guests = restaurant.numGuests || 10;
// console.log(guests);

// const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);

// const rest1 = {
//   name: "Capri",
//   numGuests: 20,
// };

// const rest2 = {
//   name: "La Piazza",
//   owner: "Giovanni Rossi",
// };

// OR ASSIGNMENT OPERATOR
// rest1.numGuests is truthy so we return that if it does exist
// same for rest2, it returns 10
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// console.log(rest1, rest2);

// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// rest2.owner = rest2.owner && "<ANONYMOUS>";

// console.log(rest1, rest2);

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// const players1 = [...game.players[0]];
// const players2 = [...game.players[1]];

// const [players1, players2] = game.players;

// console.log(players1, players2);

// const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);

// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];

// const { team1, x: draw, team2 } = game.odds;
// console.log(team1, draw, team2);

// const printGoals = function (...players) {
//   console.log(`${players.length} goals were scored`);
// };

// printGoals("Davies", "Muller", "Lewandowski", "Kimmich");
// printGoals("Davies", "Muller");
// printGoals(...game.scored);

// team1 < team2
//   ? console.log("Team 1 is more likely to win")
//   : console.log("Team 2 is more likely to win");

// team1 < team2 && console.log("Team 1 is more likely to win");

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// FOR OF loop
// for (const item of menu) {
//   console.log(item);
// }

// getting the index out with an array iterator
// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}: ${el}`);
// }

// OBJECT LITERALS
// refer opening hours example at the top
// the function keyword can be removed inside the object and replaced with function name and parameters

// const weekdays = ["mon", "tue", "wed", "thurs", "fri", "sat", "sun"];

// OPTIONAL CHAINING
// console.log(restaurant.openingHours.mon.open);

// only if monday exists will the open property be read
// console.log(restaurant.openingHours.mon?.open);

// const days = ["mon", "tue", "wed", "thurs", "fri", "sat", "sun"];

// for (const day of days) {
//   // console.log(day);
//   const open = restaurant.openingHours[day]?.open ?? "closed";
//   console.log(`on ${day} we open at ${open}`);
// }

// METHODS
// console.log(restaurant.order?.(0, 1) ?? `method does not exist`);

// console.log(restaurant.orderRisotto?.(0, 1) ?? `method does not exist`);

// const users = [
//   {
//     name: "Harshal",
//     email: "hello@harshal.com",
//   },
// ];

// console.log(users[0]?.name ?? `user array empty`);
// console.log(users[1]?.name ?? `user array empty`);

// for (const day of Object.keys(openingHours)) {
//   console.log(day);
// }

// // entire object
// const entries = Object.entries(openingHours);
// console.log(entries);

// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }

// CODING CHALLENGE #2

// 1.
// for (const [index, scorer] of game.scored.entries()) {
//   console.log(`Goal ${index + 1}: ${scorer}`);
// }

// 2.
// const odds = Object.values(game.odds);
// let average = 0;
// for (const element of odds) {
//   average += element;
// }
// average /= odds.length;
// console.log(average);

// 3.

// const teamA = game.team1;
// const teamB = game.team2;

// const [team1, draw, team2] = odds;

// console.log(`Odds of victory ${teamA}: ${team1}`);
// console.log(`Odds of draw: ${draw}`);
// console.log(`Odds of victory ${teamB}: ${team2}`);

// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamString = team === "x" ? "draw" : `victory ${game[team]}`;
//   console.log(`Odds of ${teamString} ${odd}`);
// }

// SETS
// ONLY UNIQUE VALUES
// console.log(new Set("Harshal"));

// const orderSet = new Set(["pasta", "pizza", "pizza", "risotto", "pasta"]);
// console.log(orderSet);
// console.log(orderSet.size);
// console.log(orderSet.has("pizza"));
// console.log(orderSet.has("bread"));
// orderSet.add("garlic bread");
// orderSet.add("garlic bread");
// orderSet.delete("risotto");
// console.log(orderSet);
// orderSet.clear();
// console.log(orderSet);

// for (const order of orderSet) {
//   console.log(order);
// }

// real world example of a set
// const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
// const staffUnique = [...new Set(staff)];
// console.log(staffUnique);

// console.log(
//   new Set(["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"]).size
// );

// MAPS
// key-value pairs - similar to objects
// any data type can be a key

// const rest = new Map();
// rest.set("name", "classico Italiano");
// rest.set(1, "Firenze, Italy");
// rest.set(2, "Lisbon, Portugal");
// console.log(rest);

// rest
//   .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
//   .set("open", 11)
//   .set("close", 23)
//   .set(true, "we are open :D")
//   .set(false, "We are close :(");

// console.log(rest);
// console.log(rest.get("name"));
// console.log(rest.get(true));
// console.log(rest.get(1));

// const time = 21;
// console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

// console.log(rest.has("categories"));
// rest.delete(2);
// rest.clear();
// console.log(rest);
// console.log(rest.size);

// rest.set(document.querySelector("h1"), "heading");
// console.log(rest);

// const question = new Map([
//   ["question", "What is the best programming language in the world?"],
//   [1, "C"],
//   [2, "Java"],
//   [3, "JavaScript"],
//   ["correct", 3],
//   [true, "Correct"],
//   [false, "Wrong"],
// ]);

// console.log(question);

// convert object to map
// console.log(Object.entries(openingHours));
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// ARRAYS
// console.log(question.get("question"));
// for (const [key, value] of question) {
//   if (typeof key === "number") {
//     console.log(`Answer ${key}: ${value}`);
//   }
// }

// const answer = Number(prompt("Your answer"));
// console.log(answer);

// console.log(question.get(answer === question.get("correct")));

// MAP BACK TO AN ARRAY
// console.log([...question]);
// console.log([...question.entries()]);
// console.log([...question.values()]);

// CODING CHALLENGE 3
const gameEvents = new Map([
  [17, "⚽ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽ GOAL"],
  [80, "⚽ GOAL"],
  [92, "🔶 Yellow card"],
]);

// 1.
// const events = [...new Set(gameEvents.values())];
// console.log(events);

// 2.
// console.log(gameEvents);
// gameEvents.delete(64);
// console.log(gameEvents);

// 3.
// console.log(gameEvents.size);
// console.log(
//   `An event happened, on average, every ${90 / gameEvents.size} minutes`
// );

// 4.
// for (const [minute, event] of gameEvents) {
//   const half = minute <= 45 ? "FIRST" : "SECOND";
//   console.log(`[${half} HALF] ${minute}: ${event}`);
// }

// STRING OPERATIONS
// const airline = "TAP Air Portugal";
// const plane = "A320";

// console.log(plane[0]);
// console.log(plane[3]);
// console.log("B737"[0]);
// console.log(airline.length);
// console.log("abcdefg".length);

// // first index
// console.log(airline.indexOf("r"));

// // last index
// console.log(airline.lastIndexOf("r"));

// // where the string starts
// console.log(airline.indexOf("Portugal"));

// // position at which the extraction will start
// // substring = new string
// console.log(airline.slice(4));

// // start and end
// console.log(airline.slice(4, 7));

// console.log(airline.slice(0, airline.indexOf(" ")));

// // the space is included here:
// console.log(airline.slice(airline.lastIndexOf(" ") + 1));

// console.log(airline.slice(-2));

// // cuts the first and last character
// console.log(airline.slice(1, -1));

// const checkMiddleSeat = function (seat) {
//   // B AND E are middle seats
//   let lastChar = seat.slice(-1);
//   if (lastChar === "B" || lastChar === "E") {
//     console.log(`Middle seat`);
//   } else console.log(`Window or aisle`);
// };

// checkMiddleSeat("11B");
// checkMiddleSeat("23C");
// checkMiddleSeat("3E");

// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

// Fix capitalisation in names
// const passenger = "hArShAl";
// const passengerLower = passenger.toLowerCase();
// const passengerCorrect =
//   passengerLower[0].toUpperCase() + passengerLower.slice(1);
// console.log(passengerCorrect);

// check email
// const email = "hello@harshal.io";
// const loginEmail = " Hello@HArshal.io \n";

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
// console.log(trimmedEmail);

// const normalisedEmail = loginEmail.toLowerCase().trim();
// console.log(normalisedEmail);
// console.log(email === normalisedEmail);

// replace parts of string
// const priceIN = "₹288,97";
// const priceUS = priceIN.replace("₹", "$").replace(",", ".");
// console.log(priceIN, priceUS);

// const announcement =
//   "All passengers come to boarding door 23. Boarding door 23";

// // replace all method
// console.log(announcement.replaceAll("door", "gate"));

// REGEXP TO REPLACE. g is global
// console.log(announcement.replace(/door/g, "gate"));

// BOOLEANS
// const planeNeo = "Airbus A320neo";
// console.log(planeNeo.includes("A320"));
// console.log(planeNeo.includes("Boeing"));
// console.log(planeNeo.startsWith("Air"));

// if (planeNeo.startsWith("Airbus") && planeNeo.endsWith("neo")) {
//   console.log("Part of the new Airbus family");
// }

// Practice exercise
// always convert user input to lower case
// const checkBaggage = function (items) {
//   const baggage = items.toLowerCase();
//   if (baggage.includes("knife") || baggage.includes("gun")) {
//     console.log(`You are not allowed onboard`);
//   } else console.log(`Welcome aboard`);
// };

// checkBaggage("I have a laptop, some Food and a pocket Knife");
// checkBaggage("Socks and camera");
// checkBaggage("Got some snacks and a gun for protection");

// STRINGS 3

// SPLIT method
// stores as elements of an array
// console.log("a+very+nice+string".split("+"));
// console.log("Harshal Bhawe".split(" "));

// const [firstName, lastName] = "Harshal Bhawe".split(" ");

// JOIN method
// const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");
// console.log(newName);

// capitalising first letter of name
// const capitaliseName = function (name) {
//   const names = name.split(" ");
//   const namesUpper = [];
//   for (const n of names) {
//     // alternate way
//     // namesUpper.push(n[0].toUpperCase() + n.slice(1));
//     namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
//   }
//   console.log(namesUpper.join(" "));
// };

// capitaliseName("jessica ann smith davis");
// capitaliseName("harshal kunal bhawe");

// PADDING STRINGS
// const message = "Go to gate 23!";
// console.log(message.padStart(25, "+").padEnd(30, "+"));
// console.log("Harshal".padStart(25, "+").padEnd(30, "+"));

// real world example of padding
// const maskCreditCard = function (number) {
//   const stringNumber = String(number);
//   const last = stringNumber.slice(-4);
//   return last.padStart(stringNumber.length, "*");
// };

// console.log(maskCreditCard(3453497593457));
// console.log(maskCreditCard("348567587596546730133"));

// REPEAT method
// const message2 = "Bad weather. ALl departures delayed... ";
// console.log(message2.repeat(5));

// const planesInLine = function (n) {
//   console.log(`There are ${n} planes in line ${"✈️".repeat(n)}`);
// };

// planesInLine(5);
// planesInLine(3);
// planesInLine(12);
