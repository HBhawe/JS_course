"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
let map, mapEvent;

// using the geolocation API to get the location of the user
// IF it is available
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const coords = [latitude, longitude];

      //   the L.map should match an ID in the HTML
      map = L.map("map").setView(coords, 13);

      L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //   marking a click event on the map with a marker
      //   handling clicks on map
      map.on("click", function (mapE) {
        mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
      });
    },
    function () {
      alert("Could not get your position");
    }
  );
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  clearInputFields();

  //   display marker
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        autoClose: false,
        maxWidth: 250,
        minWidth: 100,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent(`Workout`)
    .openPopup();
});

// clearing input fields
const clearInputFields = function () {
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      "";
};

// event listener for input type change - cycle vs running
inputType.addEventListener("change", function () {
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
});
