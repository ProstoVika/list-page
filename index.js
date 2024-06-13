"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
let filter = document.querySelector('.filter-box');
let search = document.querySelector('.search-txt');
let cardsContainer = document.querySelector('.cards-container');
let restdata = [];
const url = 'https://restcountries.com/v2/';
let dark = (localStorage.getItem('dark') == null) ? "off" : localStorage.getItem('dark');
let data = (restUrl) => __awaiter(void 0, void 0, void 0, function* () {
    let answer = yield fetch(`${url}${restUrl}`);
    try {
        restdata = yield answer.json();
        return restdata[''];
    }
    catch (error) {
        console.log('error:' + error);
    }
});
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    if (dark === "on") {
        document.documentElement.style.setProperty('--mode-bg', 'var(--VeryDarkBlue)');
        document.documentElement.style.setProperty('--Elements-color', 'var(--DarkBlue)');
        document.documentElement.style.setProperty('--text-clr', 'var(--White)');
    }
    else {
        document.documentElement.style.setProperty('--mode-bg', 'var(--VeryLightGray)');
        document.documentElement.style.setProperty('--Elements-color', 'var(--White)');
        document.documentElement.style.setProperty('--text-clr', 'var(--VeryDarkBlueT)');
    }
    yield data(filter.value).then(() => updateUi(restdata));
});
let updateUi = (data) => {
    let reducedData = (data.length > 100) ? data.slice(0, 100) : data;
    let cards = [];
    for (let item of reducedData) {
        let card = `<div class="card" data-country="${item.name}">
       <img src="${item.flags.png}" class="card-img-top" alt="${item.name}">
       <div class="card-body">
         <h5 class="card-title">${item.name}</h5>
         <div><span>Population:</span> <span>${item.population}</span></div>
         <div><span>Region:</span><span>${item.region}</span></div>
         <div><span>Capital:</span><span>${item.capital}</span></div>
       </div>
     </div>`;
        cards.push(card);
    }
    cardsContainer.innerHTML = cards.join('');
};
const resetSearch = () => {
    const elem = document.querySelector('.search-txt');
    elem.value = '';
};
filter.addEventListener('change', (event) => __awaiter(void 0, void 0, void 0, function* () {
    let value = event.target.value;
    yield data(value).then(() => updateUi(restdata));
    resetSearch();
}));
const resetFilter = () => {
    const elem = document.querySelector('.filter-box');
    elem.value = 'all';
};
search.addEventListener('keyup', () => __awaiter(void 0, void 0, void 0, function* () {
    let resturl = `name/${search.value}`;
    yield data(resturl).then(() => updateUi(restdata));
    resetFilter();
}));
function darkMoodFn() {
    dark = (localStorage.getItem('dark') == null) ? "off" : localStorage.getItem('dark');
    if (dark === "off") {
        document.documentElement.style.setProperty('--mode-bg', 'var(--VeryDarkBlue)');
        document.documentElement.style.setProperty('--Elements-color', 'var(--DarkBlue)');
        document.documentElement.style.setProperty('--text-clr', 'var(--White)');
        localStorage.setItem('dark', "on");
    }
    else {
        document.documentElement.style.setProperty('--mode-bg', 'var(--VeryLightGray)');
        document.documentElement.style.setProperty('--Elements-color', 'var(--White)');
        document.documentElement.style.setProperty('--text-clr', 'var(--VeryDarkBlueT)');
        localStorage.setItem('dark', "off");
    }
}
document.querySelector('.dark-mood').addEventListener('click', () => darkMoodFn());
