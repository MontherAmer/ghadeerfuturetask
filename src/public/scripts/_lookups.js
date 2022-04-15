/* -------------------------------------------------------------------------- */
/*      funtions related to filters display and chagne handlers for them      */
/* -------------------------------------------------------------------------- */

const Axios = require('axios');
const { toggleLoader } = require('./_helpers');
const { getListOfJobs } = require('./_main');
let { getCountries, getSectors, setFilters, setCities, getCities, setCountries, setSectors } = require('./_store');

/* ---------------- main function to get lookups from backend --------------- */
exports.fetchLookups = async () => {
  toggleLoader();
  let { data } = await Axios.get('http://localhost:5000/apis/lookups');
  toggleLoader();
  // store data in localstorage
  setCountries(data.data.countries || []);
  setSectors(data.data.sectors || []);
  // view filters in screen
  appendSectorsToScreen();
  appendCountriesToScreen();
};

const toggleDisplayCities = () => {
  let cities = getCities();
  let cityWrapper = document.getElementById('city-wrapper');
  cityWrapper.style.display = cities.length ? 'block' : 'none';
};

/* ------------------------- filters change handlers ------------------------ */

const handleSectorChange = (e) => (setFilters('sector', e.target.name), setFilters('page', 1), getListOfJobs());

const handleCityChange = (e) => (setFilters('city', e.target.name), setFilters('page', 1), getListOfJobs());

const handleCountryChange = (e) => (
  setFilters('country', e.target.name), setFilters('page', 1), setCities(), appendCitiesToScreen(), getListOfJobs(), toggleDisplayCities()
);

/* ------------------------ display filters on screen ----------------------- */
const appendSectorsToScreen = () => {
  let sectorsContainer = document.getElementById('sectors-container');
  sectorsContainer.innerHTML = '';

  let sectors = getSectors();
  sectors.map((item, i) => {
    let newDiv = document.createElement('div');

    newDiv.innerHTML = `
      <label class="checkbox-container">${item.name}
          <input type="checkbox" id="sector-${i}" name="${item.name}"/>
          <span class="checkbox-checkmark"></span>
      </label>`;

    sectorsContainer.appendChild(newDiv);
    let sector = document.getElementById(`sector-${i}`);
    sector.addEventListener('change', (e) => handleSectorChange(e));
  });
};

const appendCountriesToScreen = () => {
  let countriesContainer = document.getElementById('countries-container');
  countriesContainer.innerHTML = '';
  let countries = getCountries();

  countries.map((item, i) => {
    let newDiv = document.createElement('div');

    newDiv.innerHTML = `
        <label class="checkbox-container">${item.name}
            <input type="checkbox"  id="country-${i}" name="${item.name}"/>
            <span class="checkbox-checkmark"></span>
        </label>`;

    countriesContainer.appendChild(newDiv);
    let country = document.getElementById(`country-${i}`);
    country.addEventListener('change', (e) => handleCountryChange(e));
  });
};

const appendCitiesToScreen = () => {
  let citiesContainer = document.getElementById('cities-container');
  let cities = getCities();
  citiesContainer.innerHTML = '';

  cities.map((item, i) => {
    let newDiv = document.createElement('div');

    newDiv.innerHTML = `
        <label class="checkbox-container">${item}
            <input type="checkbox"  id="cities-${i}" name="${item}"/>
            <span class="checkbox-checkmark"></span>
        </label>`;
    citiesContainer.appendChild(newDiv);
    let cities = document.getElementById(`cities-${i}`);
    cities.addEventListener('change', (e) => handleCityChange(e));
  });
};
