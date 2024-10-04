"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  // prevents modal going all the way to the top
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// SELECTING ELEMENTS
/*
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

console.log(document.querySelector(".header"));

const allSections = document.querySelectorAll("section");
console.log(allSections);

console.log(document.getElementById("section--1"));

// returns an HTML collection - this is a "LIVE" selector - updates automatically based on content
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

console.log(document.getElementsByClassName("btn"));
*/

// CREATING AND INSERTING ELEMENTS

// .insertAdjacentHTML

/*
const header = document.querySelector(".header");

const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = "We use cookies for improved functionality";
message.innerHTML = `We use cookies for improved functionality<button class= "btn btn--close-cookie">Got it!</button>`;

// we can only have one element in once place in the html - this moves the element to the last child
// header.prepend(message); //first child
header.append(message); //last child
// console.log(message);

// cloning node and adding the element
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// DELETE ELEMENT
// remove the cookie element on clicking the got it button
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

// STYLES
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

// only works for inline styles that we set
console.log(message.style.height); //returns empty string
console.log(message.style.backgroundColor);

// all styles for the element
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// we need to parseFloat and set the base
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + "px";

// set CSS variables - check :root in the CSS
document.documentElement.style.setProperty("--color-primary", "orangered");

// ATTRIBUTES of elements
const logo = document.querySelector(".nav__logo");
console.log(logo.alt); //alt text
console.log(logo.src); //src - full path
console.log(logo.className);

// setting a custom attribute - this won't work - NON STANDARD ATTRIBUTE NAME
console.log(logo.designer);
// getting custom attributes
console.log(logo.getAttribute("designer"));

logo.alt = "Beautiful minimalist logo";

// setting custom attribute
logo.setAttribute("company", "Bankist");

console.log(logo.getAttribute("src")); //relative path

const link = document.querySelector(".twitter-link");
console.log(link.href);
console.log(link.getAttribute("href"));

// DATA attribute
// data attribute in the html
// stored in the dataset object
console.log(logo.dataset.versionNumber);

logo.classList.add("c");
logo.classList.remove("c");
logo.classList.toggle("c");
logo.classList.contains("c");

// don't use - overwrites all existing class
// logo.className = "jonas";
// use classList.add instead
*/

// SMOOTH SCROLLING

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  // 1. old method
  // const s1coords = section1.getBoundingClientRect();
  // console.log(`s1 coords:`);
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect(0));

  // console.log(`Current scroll (X/Y)`, window.pageXOffset, window.pageYOffset);
  // console.log(
  //   "height/width",
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // // scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  // new method - more modern
  section1.scrollIntoView({ behavior: "smooth" });
});

// remove event listeners
/*
const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  // console.log(e);
  alert(`Add event listener: Great! You are reading the heading!`);

  // h1.removeEventListener("mouseenter", alertH1);
};

h1.addEventListener("mouseenter", alertH1);

// remove event listener after 3 seconds
setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);
// old school
// h1.onmouseenter = function (e) {
//   console.log(e);
//   // alert(`Add event listener: Great! You are reading the heading!`);
// };
*/

// BUBBLING

// random colour rgb(255,255,255)

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColour = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// EVENT BUBBLING
// the lowest level element will also trigger events in all the parents
document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColour();
  console.log(`LINK`, e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // stop propagation - won't bubble up through all the parents
  // not advisable
  // e.stopPropagation();
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColour();
  console.log(`CONTAINER`, e.target, e.currentTarget);
});

// the 3rd parameter of the event listener changes whether the event is "captured" or "bubbled"
document.querySelector(".nav").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColour();
    console.log(`NAV`, e.target, e.currentTarget);
  },
  true
);
