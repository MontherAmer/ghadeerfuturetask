const Axios = require('axios');
const { setFilters, getFilters, setJobs, getJobs, setCurrentJob, getCurrentJob, getCountries, getSectors } = require('./_store');
const { showDetailsModal, showDeleteModal } = require('./_modal');

/* --------------------------- search bar handler --------------------------- */
// fired after 1.5 seconds of stop typing
const debounce = (func, timeout = 1500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
const handleSearchInput = (e) => {
  let searchInput = e.target.value;
  setFilters('title', searchInput);
  getListOfJobs();
};

const processChange = debounce((e) => handleSearchInput(e));

/* --------------------------- pagination handlers -------------------------- */
const changeActivePage = (prev, next) => {
  // will change the color of the active page icon
  let prevPage = document.getElementById(`page${prev}`);
  let nextPage = document.getElementById(`page${next}`);
  prevPage.classList.remove('active');
  nextPage.classList.add('active');
};

const handlePageChange = (e) => {
  // change the page value in filters
  // then get list of pages depends on new value
  let prev = getFilters().page;
  let next = e.target.innerHTML;
  changeActivePage(prev, next);
  setFilters('page', next);
  getListOfJobs();
};

// display pagination on UI depends on total number of jobs
const handlePaginateUI = (active) => {
  let total = getJobs().total;
  let pageDiv = document.querySelector('#paginate');
  pageDiv.innerHTML = '';

  let pagesNumber = new Array(Math.ceil(total / 10)).fill(0);

  pagesNumber.map((item, i) => {
    let newDiv = document.createElement('label');

    newDiv.innerHTML = i + 1;

    active === i + 1 ? newDiv.classList.add('page', 'active') : newDiv.classList.add('page');

    newDiv.setAttribute('id', `page${i + 1}`);

    pageDiv.appendChild(newDiv);
    newDiv.addEventListener('click', (e) => handlePageChange(e));
  });
};

/* -------------------------------------------------------------------------- */
/*                      display cards on screen function                      */
/* -------------------------------------------------------------------------- */
const appendCardToScreen = () => {
  let cardsContainer = document.getElementById('cards-container');
  cardsContainer.innerHTML = '';
  let jobs = getJobs().list;
  jobs.map((item, i) => {
    let newDiv = document.createElement('div');

    newDiv.innerHTML = `
    <div class="card" id='${item._id}'>
      <img class="card-image" src="./images/download.png" />
      <div class="description">
        <p class="desc-title">${item.title}</p>
        <p class="desc-loc">${item.city}, ${item.country}</p>
        <p class="desc-sector">${item.sector}</p>
        <p class="desc-desc">${item.description.slice(0, 100)}...</p>
      </div>
      <div class="actions">
        <img class="action-icon" src="./images/eye.png" id='details-icon-${i}'/>
        <img class="action-icon" src="./images/trash.png" id='delete-icon-${i}'/>
      </div>
    </div>`;

    // add listners on delete and details images
    cardsContainer.appendChild(newDiv);
    let detailsIcon = document.getElementById(`details-icon-${i}`);
    detailsIcon.addEventListener('click', () => showDetailsModal(item));
    let deleteIcon = document.getElementById(`delete-icon-${i}`);
    deleteIcon.addEventListener('click', () => showDeleteModal(item));
  });
};

/* ---------------------------- get list of jobs ---------------------------- */
const getListOfJobs = async () => {
  let filters = getFilters();
  let data = await Axios.get('http://localhost:5000/apis/jobs', { params: filters });
  setJobs(data.data.data);
  handlePaginateUI(1);
  appendCardToScreen();
};

/* ---------------------------- side bar handlers --------------------------- */
const showSideBar = () => {
  let filters = document.getElementById('filters');
  filters.style.left = '0px';

  let rightArrow = document.getElementById('bars-solid');
  rightArrow.style.display = 'none';
};

const hideSideBar = () => {
  let filters = document.getElementById('filters');
  filters.style.left = '-311px';

  let rightArrow = document.getElementById('bars-solid');
  rightArrow.style.display = 'block';
};

module.exports = { showSideBar, hideSideBar, getListOfJobs, processChange };
