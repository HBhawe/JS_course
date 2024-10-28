/* This JavaScript code is making an AJAX request to fetch information about a specific country
("Sweden" in this case) and its neighboring countries using the REST Countries API. */

"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  //   countriesContainer.style.opacity = 1;
};

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

/*
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
// let url = "https://restcountries.com/v3.1";
// const request = new XMLHttpRequest();
// request.open("GET", `${url}/name/${country}`);
// request.send();

// const request = fetch(`${url}/name/sweden`);
// console.log(request);

// testing
// setTimeout(() => console.log(request), 2000);

// FOR DEBUGGING
// const getCountryData = function (country) {
//   let url = "https://restcountries.com/v3.1";
//   const request = fetch(`${url}/name/${country}`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       //   console.log(data[0]);
//       renderCountry(data[0]);
//     });
// };

// simplified code with fetch and arrow function
// this one is kind of like callback hell as many countries have multiple neighbours
// const getCountryData = function (country) {
//   let url = "https://restcountries.com/v3.1";
//   const request = fetch(`${url}/name/${country}`)
//     .then((response) => response.json())
//     .then((data) => {
//       renderCountry(data[0]);
//       //   optional chaining to check whether there any neighbours
//       const neighbours = data[0]?.borders;

//       //   render neighbours
//       if (neighbours) {
//         neighbours.forEach((neighbour) => {
//           let request2 = fetch(`${url}/alpha/${neighbour}`).then((response) =>
//             response.json().then((data) => renderCountry(data[0], "neighbour"))
//           );
//         });
//       }
//     });
// };

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok || response.status !== 200)
      throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// REFERENCE CODE FOR OLD ASYNC WITH NO ERROR HANDLING
// this is the "correct" code with the correct callbacks
// const getCountryData = function (country) {
//   let url = "https://restcountries.com/v3.1";
//   const request = fetch(`${url}/name/${country}`)
//     .then((response) => {
//       if (!response.ok || response.status !== 200)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;

//       return fetch(`${url}/alpha/${neighbour}`);
//     })
//     .then((response) => {
//       if (!response.ok || response.status !== 200)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then((data) => renderCountry(data[0], "neighbour"))
//     .catch((err) => {
//       console.log(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

btn.addEventListener("click", function () {
  getCountryData("sweden");
});

// getCountryData("sdsdsdd");

const getCountryData = function (country) {
  let url = "https://restcountries.com/v3.1";
  getJSON(`${url}/name/${country}`, "Country not found")
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0]?.borders?.[0];
      if (!neighbour) throw new Error("No neighbour found!");

      //   neighbour
      return getJSON(`${url}/alpha/${neighbour}`, "Country not found");
    })
    .then((data) => renderCountry(data[0], "neighbour"))
    .catch((err) => {
      console.log(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// getCountryData("australia");

// CODING CHALLENGE
/*
const whereAmI = function (lat, lng) {
  let url = "https://geocode.xyz";
  // let data;
  fetch(`${url}/${lat},${lng}?json=1`)
    .then((response) => {
      if (!response.ok || response.status !== 200)
        throw new Error(`Problem with Geocoding (${response.status})`);

      return response.json();
    })
    .then((data) => {
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then((res) => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then((data) => renderCountry(data[0]))
    .catch((err) => console.log(`${err.message}`));
};

// whereAmI(52.508, 13.381); //  Berlin, Germany
// whereAmI(19.037, 72.873); //  Mumbai, India
// whereAmI(-33.933, 18.474); //  Cape Town, South Africa
*/
