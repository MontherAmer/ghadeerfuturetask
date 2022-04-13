let { getCountries, getSectors, setFilters, setCities, getCities } = require('./store');

const handleSectorChange = (e) => {
  setFilters('sector', e.target.name);
};

const handleCountryChange = (e) => {
  setFilters('country', e.target.name);
  setCities();
  this.appendCitiesToScreen();
};

const handleCityChange = (e) => {};

exports.appendSectorsToScreen = () => {
  let sectorsContainer = document.getElementById('sectors-container');
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

exports.appendCountriesToScreen = () => {
  let countriesContainer = document.getElementById('countries-container');
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

exports.appendCitiesToScreen = () => {
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
