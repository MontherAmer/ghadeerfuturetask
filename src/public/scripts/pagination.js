const { setFilters, getFilters } = require('./store');

// add color to active page
const changeActivePage = (prev, next) => {
  console.log(prev);
  let prevPage = document.getElementById(`page${prev}`);
  let nextPage = document.getElementById(`page${next}`);
  prevPage.classList.remove('active');
  nextPage.classList.add('active');
};

// handle Click on page
const handlePageChange = (e) => {
  let prev = getFilters().page;
  let next = e.target.innerHTML;
  changeActivePage(prev, next);
  setFilters('page', next);
};

// display pagination on UI depends on total number of jobs
exports.handlePaginateUI = (total, active) => {
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
