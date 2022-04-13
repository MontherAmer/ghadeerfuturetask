const axios = require('axios');

const { appendSectorsToScreen, appendCountriesToScreen } = require('./lookups');

let { setSectors, setCountries } = require('./store');

// get countries, cities and sectors from backend
const fetchLookups = async () => {
  let { data } = await axios.get('http://localhost:5000/apis/lookups');
  setCountries(data.data.countries || []);
  setSectors(data.data.sectors || []);
  appendSectorsToScreen();
  appendCountriesToScreen();
};

fetchLookups();
