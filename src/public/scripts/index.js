const { fetchLookups } = require('./_lookups');

const { processChange, getListOfJobs } = require('./_main');

let { initFilters } = require('./_store');

window.onload = async function () {
  fetchLookups();
  initFilters();
  await getListOfJobs();
  let searchInput = document.getElementById('search-input');
  searchInput.addEventListener('keydown', (e) => processChange(e));
};

function reportWindowSize() {
  let body = document.getElementsByTagName('body')[0];
  console.log('ddddddd ', body.clientWidth);
}

window.onresize = reportWindowSize;
