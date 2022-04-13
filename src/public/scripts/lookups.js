let { getCountries, getSectors } = require('./store');

const handleSectorChange = (e) => {
  console.log(e.target.name);
};

const handleCountryChange = (e) => {
  console.log(e.target.name);
  getCountries();
};

const handleCityChange = (e) => {
  console.log(e.target.name);
};

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
