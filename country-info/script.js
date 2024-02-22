"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

function renderCards(data, className = "") {
  const html = `
      <article class = "country ${className}">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${data.population}</p>
        <p class="country__row"><span>🗣️</span>${
          Object.entries(data.languages)[0][1]
        }</p>
        <p class="country__row"><span>💰</span>${
          Object.entries(Object.entries(data.currencies)[0][1])[0][1]
        }</p>
      </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
}
function renderError(message) {
  countriesContainer.insertAdjacentText("beforeend", message);
}
function getCountryData(country) {
  function getJSON(url, errorMessage = "Что-то пошло не такю.") {
    return fetch(url).then(function (response) {
      if (!response.ok) {
        throw new Error(`Страна не найдена (${response.status})`);
      }
      return response.json();
    });
  }
  //страна 1

  getJSON(`https://restcountries.com/v3.1/name/${country}`, "Страна не найдена")
    .then(function (data) {
      renderCards(data[0]);
      let neighbour;
      if (data[0].hasOwnProperty("borders")) {
        neighbour = data[0].borders[0];
      } else {
        throw new Error("У страны нет общих границ с другими странами :(");
      }
      //страна 2

      return getJSON(
        `https://restcountries.com/v3.1/name/${neighbour}`,
        "Страна не найдена"
      ).then(function (data) {
        const [res] = data;
        renderCards(res, "neighbour");
      });
    })
    .catch(function (err) {
      renderError(`Что-то пошло не так: ${err.message}`);
    })
    .finally(function () {
      countriesContainer.style.opacity = 1;
    });
}
btn.addEventListener("click", function () {
  getCountryData("russia");
});
