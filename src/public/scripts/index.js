const { fetchLookups } = require('./_lookups');

const { processChange, getListOfJobs, closeModal } = require('./_main');

let { initFilters } = require('./_store');

window.onload = async function () {
  fetchLookups();
  initFilters();
  await getListOfJobs();
  let searchInput = document.getElementById('search-input');
  searchInput.addEventListener('keydown', (e) => processChange(e));
};

const reportWindowSize = () => {
  let body = document.getElementsByTagName('body')[0];
  console.log('ddddddd ', body.clientWidth);
};

window.onresize = reportWindowSize;

window.onclick = (e) => closeModal(e);
// details-modal-close
document.addEventListener('click', (e) => closeModal(e));
