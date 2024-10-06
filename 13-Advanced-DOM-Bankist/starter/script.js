"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const nav = document.querySelector(".nav");
const navBtns = document.querySelectorAll(".nav__link");
const navContainer = document.querySelector(".nav__links");

///////////////////////////////////////
// Modal window

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

// SMOOTH SCROLLING

// BTN scrolling

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

// PAGE NAVIGATION
// navigates to the section based on ID of html element

// this is really inefficient as the function gets added to all 3 elements
// navBtns.forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// we want to add an event listener to the parent element of the links
// 1. add event listener to common parent
// 2. determine what element originated the event

navContainer.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(e.target);
  // matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// tabbed componenet

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// tabs.forEach((t) => t.addEventListener("click", console.log(`TAB`)));

// EVENT DELEGATION
tabsContainer.addEventListener("click", function (e) {
  e.preventDefault();

  // matching strategy
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return; //guard clause - return if null
  tabs.forEach((t) => t.classList.remove("operations__tab--active")); // remove the active class from all of them
  tabsContent.forEach((t) => t.classList.remove("operations__content--active")); // remove the active class from all of them

  // activate content area
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// nav menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el != link) el.style.opacity = this;
      logo.style.opacity = this;
    });
  }
};

// passing an "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// sticky navigation -  OLD
// SHOULD BE AVOIDED

/*
const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window scroll event normally should be avoided
window.addEventListener("scroll", function (e) {
  // console.log(window.scrollY);

  if (this.window.scrollY > initialCoords.top) {
    nav.classList.add("sticky");
  } else nav.classList.remove("sticky");
});
*/

// STICKY NAVIGATION - INTERSECTION OBSERVER API
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => console.log(entry));
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

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

/*
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


// EVENT DELEGATION

// DOM TRAVERSING

const h1 = document.querySelector("h1");

// going downwards: child
console.log(h1.querySelectorAll(".highlight"));

console.log(h1.childNodes);
console.log(h1.children);
console.log(h1.firstElementChild);

h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "orangered";

// going upward :parents
console.log(h1.parentNode);
console.log(h1.parentElement);

// selects the closest header and sets the background to the CSS variable
h1.closest(".header").style.background = "var(--gradient-secondary)";

// if there is no closest h1, it selects itself
h1.closest("h1").style.background = "var(--gradient-primary)";

// going sideways - siblings
console.log(h1.previousElementSibling); // will return null as it is the 1st child
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);

// strange way of doing it
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = "scale(0.5)";
});
*/
