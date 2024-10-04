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
