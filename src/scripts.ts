import axios from "axios";


const tableBody: HTMLTableElement = document.querySelector(".js-table__body");
const loadBtn: HTMLButtonElement = document.querySelector(".js-load-btn");
const countryInputField: HTMLInputElement = document.querySelector(".js-input-country");
const capitalInputField: HTMLInputElement = document.querySelector(".js-input-capital");
const currencyInputField: HTMLInputElement = document.querySelector(".js-input-currency");
const languageInputField: HTMLInputElement = document.querySelector(".js-input-language");
const inputFields: HTMLInputElement[] = Array.from(document.querySelectorAll(".js-input-field"));
const countrySortAsc: HTMLButtonElement = document.querySelector(".js-asc-country");
const capitalSortAsc: HTMLButtonElement = document.querySelector(".js-asc-capital");
const currencySortAsc: HTMLButtonElement = document.querySelector(".js-asc-currency");
const languageSortAsc: HTMLButtonElement = document.querySelector(".js-asc-language");
const countrySortDesc: HTMLButtonElement = document.querySelector(".js-desc-country");
const capitalSortDesc: HTMLButtonElement = document.querySelector(".js-desc-capital");
const currencySortDesc: HTMLButtonElement = document.querySelector(".js-desc-currency");
const languageSortDesc: HTMLButtonElement = document.querySelector(".js-desc-language");
const searchBtn: HTMLButtonElement = document.querySelector(".js-search-btn");
const resetBtn: HTMLButtonElement = document.querySelector(".js-reset-btn");
let mainLink: string = "http://localhost:3004/countries";
let filterLink: string = "";
let page: number = 1;



type CountryData = {
    name: string,
    capital: string,
    currency: string,
    language: string
}

const displayCountry = (data: CountryData[]) => {
    data.forEach(country => {
    let tableData: any = document.createElement("tr");
    tableData.classList.add("table__data");
    tableData.innerHTML = `
        <td>${country.name}</td>
        <td>${country.capital}</td>
        <td>${Object.values(country.currency)[1]}</td>
        <td>${Object.values(country.language)[1]}</td>
    `
    tableBody.appendChild(tableData);
  });
};


// axios get request
const getData = () => {
    axios.get(`${mainLink}?_page=${page}&_limit=20`)
    .then(({ data }) => {
    displayCountry(data);
});
}

getData();


// search and filter 

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  tableBody.innerHTML = "";

  inputFields.forEach(field => {
    if(field.value) {
      filterLink += `name_like=${(countryInputField.value).trim()}&`;
      filterLink += `capital_like=${(capitalInputField.value).trim()}&`;
      filterLink += `currency.name_like=${(currencyInputField.value).trim()}&`;
      filterLink += `language.name_like=${(languageInputField.value).trim()}&`;
    }
  });

  axios.get(`${mainLink}?_page=1&_limit=20&` + filterLink)
  .then(({ data }) => {
  displayCountry(data);
  });
});


// reset page from start

resetBtn.addEventListener("click", () => {
 window.location.reload();
});



// sort-ascending

countrySortAsc.addEventListener("click", (e) => {
  e.preventDefault();
  tableBody.innerHTML = "";
  axios.get(`${mainLink}?_page=${page}&_limit=20&_sort=name&_order=asc`)
   .then(({ data }) => {
   displayCountry(data);
  });
});

capitalSortAsc.addEventListener("click", (e) => {
  e.preventDefault();
  tableBody.innerHTML = "";
  axios.get(`${mainLink}?_page=${page}&_limit=20&_sort=capital&_order=asc`)
   .then(({ data }) => {
   displayCountry(data);
  });
});

currencySortAsc.addEventListener("click", (e) => {
  e.preventDefault();
  tableBody.innerHTML = "";
  axios.get(`${mainLink}?_page=${page}&_limit=20&_sort=currency.name&_order=asc`)
   .then(({ data }) => {
   displayCountry(data);
  });
});  

languageSortAsc.addEventListener("click", (e) => {
  e.preventDefault();
  tableBody.innerHTML = "";
  axios.get(`${mainLink}?_page=${page}&_limit=20&_sort=language.name&_order=asc`)
   .then(({ data }) => {
   displayCountry(data);
  });
});


// sort-descending

countrySortDesc.addEventListener("click", (e) => {
  e.preventDefault();
  tableBody.innerHTML = "";
  axios.get(`${mainLink}?_page=${page}&_limit=20&_sort=name&_order=desc`)
   .then(({ data }) => {
   displayCountry(data);
  });
});

capitalSortDesc.addEventListener("click", (e) => {
  e.preventDefault();
  tableBody.innerHTML = "";
  axios.get(`${mainLink}?_page=${page}&_limit=20&_sort=capital&_order=desc`)
   .then(({ data }) => {
   displayCountry(data);
  });
});

currencySortDesc.addEventListener("click", (e) => {
  e.preventDefault();
  tableBody.innerHTML = "";
  axios.get(`${mainLink}?_page=${page}&_limit=20&_sort=currency.name&_order=desc`)
   .then(({ data }) => {
   displayCountry(data);
  });
});

languageSortDesc.addEventListener("click", (e) => {
  e.preventDefault();
  tableBody.innerHTML = "";
  axios.get(`${mainLink}?_page=${page}&_limit=20&_sort=language.name&_order=desc`)
   .then(({ data }) => {
   displayCountry(data);
  });
});


// load button 
loadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    tableBody.innerHTML = "";
    page++;
    getData();
    if (page === 12) {
      loadBtn.innerText = "No more results";
      loadBtn.classList.add("disabled");
    }
});



