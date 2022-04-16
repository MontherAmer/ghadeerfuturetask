const { fetchLookups } = require('./_lookups');

const { processChange, getListOfJobs, showSideBar, hideSideBar } = require('./_main');
const { closeModal } = require('./_modal');

let { initFilters } = require('./_store');

document.addEventListener('DOMContentLoaded', function () {
  fetchLookups();
  initFilters();
  getListOfJobs();
  let searchInput = document.getElementById('search-input');
  searchInput.addEventListener('keydown', (e) => processChange(e));

  let leftArrow = document.getElementById('bars-solid');
  leftArrow.addEventListener('click', () => showSideBar());

  let rightArrow = document.getElementById('times-solid');
  rightArrow.addEventListener('click', () => hideSideBar());
});

document.addEventListener('click', (e) => closeModal(e));
