const BASE_URL = " https://open.er-api.com/v6/latest/";

const dropdownSelects = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".button");
let msg = document.querySelector(".msg");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");

for (let select of dropdownSelects) {
  for (currencyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currencyCode;
    newOption.value = currencyCode;
    select.append(newOption);
    if (select.name === "from" && currencyCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currencyCode === "INR") {
      newOption.selected = "selected";
    }
  }
  select.addEventListener("change", (evt) => {
    updateFlage(evt.target);
  });
}
const updateExchangerate = async () => {
  let amount = document.querySelector("input");
  let amtval = amount.value;
  if (amtval < 1 || amount.value == "") {
    amtval = 1;
    amount.value = 1;
  }
  const url = `${BASE_URL}/${fromcurr.value}`;
  let responce = await fetch(url);
  let data = await responce.json();
  let rate = data.rates[tocurr.value];
  let finalamt = rate * amtval;
  msg.innerText = `${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
};
const updateFlage = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newSorce = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSorce;
};
window.addEventListener("load", () => {
  updateExchangerate();
});
btn.addEventListener("click", (evt) => {
  evt.preventDefault(); // after clicking page will be refrace so, to stop refrace page
  updateExchangerate();
});
