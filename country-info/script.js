"use strict";
const btn = document.querySelector(".btn-country");
const btnAgain = document.querySelector(".again");
const countriesContainer = document.querySelector(".countries");
const field = document.querySelector("input");
const heading = document.querySelector(".heading");

const errorMessage = document.createElement("p");
errorMessage.style.fontSize = "15px";
errorMessage.style.color = "red";
errorMessage.textContent = "Введите название страны";
let errorMessageAdded = false;

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
  function getJSON(url, errorMsg) {
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
        let randomIndex = Math.floor(Math.random() * data[0].borders.length);
        neighbour = data[0].borders[randomIndex];
      } else {
        throw new Error("У страны нет общих границ с другими странами :(");
      }
      //страна 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        "Страна не найдена"
      ).then(function (data) {
        const [res] = data;
        renderCards(res, "neighbour");
      });
    })
    .catch(function (err) {
      renderError(` ${err.message}`);
    })
    .finally(function () {
      countriesContainer.style.opacity = 1;
    });
}

btn.addEventListener("click", function () {
  const input = document.querySelector(".entered-country").value.trim();
  if (input) {
    getCountryData(input);
    field.classList.toggle("hidden");
    heading.classList.add("hidden");
    btn.classList.toggle("hidden");
    btnAgain.classList.toggle("hidden");
    errorMessage.textContent = "";
    errorMessageAdded = false;
  } else {
    if (!errorMessageAdded) {
      field.insertAdjacentElement("afterend", errorMessage);
      errorMessageAdded = true;
    }
  }
});

btnAgain.addEventListener("click", function () {
  countriesContainer.innerHTML = "";
  field.classList.toggle("hidden");
  btnAgain.classList.toggle("hidden");
  btn.classList.toggle("hidden");
  heading.classList.toggle("hidden");
  field.value = "";
});
