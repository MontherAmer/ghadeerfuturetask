const axios = require('axios');

const { appendSectorsToScreen, appendCountriesToScreen } = require('./lookups');
const { handlePaginateUI } = require('./pagination');

let { initFilters, setSectors, setCountries } = require('./store');

// get countries, cities and sectors from backend
const fetchLookups = async () => {
  let { data } = await axios.get('http://localhost:5000/apis/lookups');
  setCountries(data.data.countries || []);
  setSectors(data.data.sectors || []);
  appendSectorsToScreen();
  appendCountriesToScreen();
};

fetchLookups();
initFilters();
handlePaginateUI(40, 1);
