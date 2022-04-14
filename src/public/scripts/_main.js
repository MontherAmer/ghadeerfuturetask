const Axios = require('axios');
const { setFilters, getFilters, setJobs, getJobs } = require('./_store');

const debounce = (func, timeout = 1000) => {
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
  this.getListOfJobs();
};

const changeActivePage = (prev, next) => {
  let prevPage = document.getElementById(`page${prev}`);
  let nextPage = document.getElementById(`page${next}`);
  prevPage.classList.remove('active');
  nextPage.classList.add('active');
};

const handlePageChange = (e) => {
  let prev = getFilters().page;
  let next = e.target.innerHTML;
  changeActivePage(prev, next);
  setFilters('page', next);
  this.getListOfJobs();
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

const appendCardToScreen = () => {
  let cardsContainer = document.getElementById('cards-container');
  let jobs = getJobs().list;
  jobs.map((item, i) => {
    let newDiv = document.createElement('div');

    newDiv.innerHTML = `
    <div class="card">
      <img class="card-image" src="./images/download.png" />
      <div class="description">
        <p class="desc-title">${item.title}</p>
        <p class="desc-loc">${item.city}, ${item.country}</p>
        <p class="desc-sector">${item.sector}</p>
        <p class="desc-desc">${item.description.slice(0, 100)}...</p>
      </div>
      <div class="actions">
        <img class="action-icon" src="./images/eye.png" id='details-icon-${i}'/>
        <img class="action-icon" src="./images/trash.png" />
      </div>
    </div>`;

    cardsContainer.appendChild(newDiv);
    let detailsIcon = document.getElementById(`details-icon-${i}`);
    detailsIcon.addEventListener('click', () => showDetailsModal(item));
  });
};

exports.processChange = debounce((e) => handleSearchInput(e));

exports.getListOfJobs = async () => {
  let filters = getFilters();
  let data = await Axios.get('http://localhost:5000/apis/jobs', { params: filters });
  setJobs(data.data.data);
  handlePaginateUI(1);
  appendCardToScreen();
};

const showDetailsModal = (item) => {
  console.log(item);
  let modal = document.getElementById('details-modal');
  let modalBody = document.getElementById('details-modal-body');
  modalBody.innerHTML = '';
  let newDiv = document.createElement('div');

  newDiv.innerHTML = `
  <div class="modal-details-first-row">
  <div>
    <p> <strong>Job Title: </strong> ${item.title} </p>
    <p> <strong>Job Sector: </strong> ${item.sector} </p>
    <p> <strong>Job Location: </strong> ${item.city}, ${item.country} </p>
    <p> 
      <strong>Job Description: </strong>
       ${item.description}
    </p>
  </div>
  <div>
    <img src="./images/download.png" />
  </div>
</div>`;

  modalBody.appendChild(newDiv);

  modal.style.display = 'block';
};

exports.closeModal = (e) => {
  console.log(e.target.id);
  let modals = ['details-modal', 'create-modal', 'delete-modal'];
  let modalsClose = ['details-modal-close', 'create-modal-close', 'delete-modal-close'];

  if (modals.includes(e.target.id)) {
    let modal = document.getElementById(e.target.id);
    modal.style.display = 'none';
  }

  if (modalsClose.includes(e.target.id)) {
    let modal = document.getElementById(e.target.id.slice(0, -6));
    modal.style.display = 'none';
  }
};
