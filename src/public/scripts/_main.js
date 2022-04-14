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
  console.log('JJJJJJJJJJJ ', jobs);
  jobs.map((item, i) => {
    let newDiv = document.createElement('div');

    newDiv.innerHTML = `
    <div class="card">
      <img class="card-image" src="./images/download.png" />
      <div class="description">
        <p class="desc-title">${item.title}</p>
        <p class="desc-loc">${item.city},${item.country}</p>
        <p class="desc-sector">${item.sector}</p>
        <p class="desc-desc">${item.description.slice(0, 100)}...</p>
      </div>
      <div class="actions">
        <img class="action-icon" src="./images/eye.png" />
        <img class="action-icon" src="./images/trash.png" />
      </div>
    </div>`;

    cardsContainer.appendChild(newDiv);
    // let job = document.getElementById(`job-${i}`);
    // job.addEventListener('change', (e) => handleSectorChange(e));
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
