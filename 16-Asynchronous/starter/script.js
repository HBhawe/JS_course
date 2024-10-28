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
/*
btn.addEventListener("click", function () {
  getCountryData("sweden");
});
*/

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

/*
console.log(`test start`);

setTimeout(() => console.log(`0 sec timer`), 0);

Promise.resolve("Resolved promise 1").then((res) => console.log(res));

// simulation that microtasks are always run first (before normal callbacks)
Promise.resolve("Resolved promise 2").then((res) => {
  for (let i = 0; i < 10000000000; i++) {}
  console.log(res);
});

console.log(`test end`);
*/

// PROMISES
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log(`Lottery draw`);
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve(`You WIN`);
    } else reject(new Error(`You LOSE`));
  }, 2000);
});

lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

// promisifying set timeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// consuming the promise
wait(1)
  .then(() => {
    console.log(`1 second passed`);
    return wait(1);
  })
  .then(() => {
    console.log(`2 seconds passed`);
    return wait(1);
  })
  .then(() => {
    console.log(`3 seconds passed`);
    return wait(1);
  })
  .then(() => console.log(`4 seconds passed`));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

Promise.resolve(`You WIN abc`).then((x) => console.log(x));
Promise.reject(new Error(`You LOSE abc`)).catch((x) => console.error(x));
*/

// navigator.geolocation.getCurrentPosition(
//   (position) => console.log(position.coords),
//   (err) => console.error(err)
// );

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition()
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

// promisifying GeoLocation API()
/*
const whereAmI = function () {
  let url = "https://geocode.xyz";
  // let data;
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`${url}/${lat},${lng}?json=1`);
    })
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

btn.addEventListener("click", function () {
  whereAmI();
});

*/

// CODING CHALLENGE 2
const images = document.querySelector(".images");

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", function () {
      images.append(img);
      resolve(img);
    });

    // reject
    img.addEventListener("error", function () {
      reject(new Error(`image not found`));
    });
  });
};

let currentImg;
/*
createImage("img/img-1.jpg")
  .then((img) => {
    currentImg = img;
    console.log(`Image 1 loaded`);
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImage("img/img-2.jpg");
  })
  .then((img) => {
    currentImg = img;
    console.log(`Image 2 loaded`);
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
  })
  .catch((err) => console.error(err));
  */

// ASYNC AWAIT AND TRY-CATCH
/*
const whereAmI = async function () {
  try {
    // geolocaiton
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?json=1`);
    if (!resGeo.ok) throw new Error(`Problem getting location data`);

    const dataGeo = await resGeo.json();
    // console.log(dataGeo);

    // country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (error) {
    console.error(error);
    renderError(`Something went wrong ${error.message}`);

    // reject promise
    throw error;
  }
};

console.log(`1. will get location`);
// const city = whereAmI();
// console.log(city);

// whereAmI()
//   .then((city) => console.log(`2: ${city}`))
//   .catch((err) => console.log(`2: ${err.message}`))
//   .finally(() => console.log(`3. finished getting location`));

// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (error) {
//   alert(error.message);
// }

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (error) {
    console.log(`2: ${error.message}`);
  }
  console.log(`3. finished getting location`);
})();
*/

// this is slow as the code inside the function is still synchronous
// refactored to use promises.all - concurrent promises
/*
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    // concurrent promises
    // short circuits on 1 promise
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    // console.log(data);
    console.log(data.map((d) => d[0].capital));
  } catch (error) {
    console.error(error);
  }
};

get3Countries("portugal", "canada", "tanzania");


// PROMISE.RACE
// race function - value is the one that went through the fastest - included rejected promises
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/spain`),
    getJSON(`https://restcountries.com/v3.1/name/india`),
  ]);
  // console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`request took too long`));
    }, sec * 1000);
  });
};

// racing against a timeout
Promise.race([getJSON(`https://restcountries.com/v3.1/name/italy`), timeout(5)])
  .then((res) => console.log(res[0]))
  .catch((err) => console.error(err));

// PROMISE.ALLSETTLED
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Another success"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

Promise.all([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Another success"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

// PROMISE.ANY [ES2021]- returns the 1st fulfilled promise
Promise.any([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Another success"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
*/

/*
createImage("img/img-1.jpg")
  .then((img) => {
    currentImg = img;
    console.log(`Image 1 loaded`);
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImage("img/img-2.jpg");
  })
  .then((img) => {
    currentImg = img;
    console.log(`Image 2 loaded`);
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
  })
  .catch((err) => console.error(err));
*/

// CODING CHALLENGE 3
// let currentImg;
const loadNPause = async function () {
  try {
    // load image 1
    let img = await createImage("img/img-1.jpg");
    console.log(`Image 1 loaded`);

    await wait(2);
    img.style.display = "none";

    // image 2
    img = await createImage("img/img-2.jpg");
    console.log(`Image 2 loaded`);

    await wait(2);
    img.style.display = "none";

    // image 3
    img = await createImage("img/img-3.jpg");
    console.log(`Image 3 loaded`);

    await wait(2);
    img.style.display = "none";
  } catch (error) {
    console.error(error);
  }
};

// loadNPause();

// part 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (img) => await createImage(img));

    const imgsEl = await Promise.all(imgs);
    imgsEl.forEach((img) => img.classList.add("parallel"));
  } catch (error) {
    console.error(error);
  }
};

loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
