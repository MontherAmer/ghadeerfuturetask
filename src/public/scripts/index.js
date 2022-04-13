const axios = require('axios');

const { appendSectorsToScreen, appendCountriesToScreen } = require('./lookups');

let countries = [];
let sectors = [];
let cities = [];

const fetchLookups = async () => {
  let { data } = await axios.get('http://localhost:5000/apis/lookups');
  console.log('ddddddddd ', data.data.countries);
  countries = data.data.countries || [];
  sectors = data.data.sectors || [];
  appendSectorsToScreen(sectors);
  appendCountriesToScreen(countries);
};

fetchLookups();
