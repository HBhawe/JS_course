/* This JavaScript code is making an AJAX request to fetch information about a specific country
("Sweden" in this case) and its neighboring countries using the REST Countries API. */

"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
/*
const renderCountry = function (data, className = "") {
  const html = `
    <article class="country ${className}">
            <img class="country__img" src="${data.flags.svg}" />
            <div class="country__data">
              <h3 class="country__name">${data.name.common.toUpperCase()}</h3>
              <h4 class="country__region">${data.region.toUpperCase()}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)}M people</p>
              <p class="country__row"><span>🗣️</span>${
                Object.values(data.languages)[0]
              }</p>
              <p class="country__row"><span>💰</span>${
                Object.values(data.currencies)[0].name
              }</p>
            </div>
          </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  let url = "https://restcountries.com/v3.1";

  //   AJAX CALL country 1
  const request = new XMLHttpRequest();
  request.open("GET", `${url}/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    // console.log(data);

    // render country1
    renderCountry(data);

    // get neighbour country
    const neighbours = data.borders;
    if (!data.borders?.[0]) return;

    neighbours.forEach((neighbour) => {
      //   console.log(neighbour);

      //   AJAX CALL neighbours - all
      let request2 = new XMLHttpRequest();
      request2.open("GET", `${url}/alpha/${neighbour}`);
      request2.send();

      request2.addEventListener("load", function () {
        let [data2] = JSON.parse(this.responseText);

        // render neighbours
        renderCountry(data2, "neighbour");
      });
    });
  });
};

getCountryAndNeighbour("sweden");
*/

// PROMISES
let url = "https://restcountries.com/v3.1";
// const request = new XMLHttpRequest();
// request.open("GET", `${url}/name/${country}`);
// request.send();

const request = fetch(`${url}/name/sweden`);
console.log(request);

// testing
// setTimeout(() => console.log(request), 2000);
