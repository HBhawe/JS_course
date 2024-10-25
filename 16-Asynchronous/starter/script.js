"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
const body = document.querySelector("body");

const getCountryData = function (country) {
  let url = "https://restcountries.com/v3.1/name/";
  const request = new XMLHttpRequest();
  request.open("GET", `${url}${country}`);
  // console.log(request);

  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    // console.log(data);
    const html = `
  <article class="country">
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
  });
};

getCountryData("sweden");
getCountryData("india");
getCountryData("austria");
