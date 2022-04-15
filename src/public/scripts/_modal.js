/* -------------------------------------------------------------------------- */
/*             functions related to modals (create,delete,display)            */
/* -------------------------------------------------------------------------- */

const Axios = require('axios');
const { setFilters, getFilters, setJobs, getJobs, setCurrentJob, getCurrentJob, getCountries, getSectors } = require('./_store');

/* -------------------------- delete modal handlers -------------------------- */
const submitDeleteJob = async () => {
  let id = getCurrentJob();
  await Axios.delete(`http://localhost:5000/apis/jobs/${id}`);
  let jobs = getJobs();
  jobs = { ...jobs, list: jobs.list.filter((job) => job._id !== id), total: jobs.total - 1 };
  setJobs(jobs);
  let card = document.getElementById(id);
  card.style.display = 'none';
  closeModal({ target: { id: 'delete-modal-close' } });
};

const showDeleteModal = (item) => {
  setCurrentJob(item._id);
  let modal = document.getElementById('delete-modal');
  let modalBody = document.getElementById('delete-modal-body');
  modalBody.innerHTML = '';
  let newDiv = document.createElement('div');

  newDiv.innerHTML = `
    <p> Are you sure you want to delete <strong>${item.title}</strong> Job</p>
    `;

  modalBody.appendChild(newDiv);

  modal.style.display = 'block';
};

/* ------------------------- details modal handlers ------------------------- */
const showDetailsModal = (item) => {
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

/* -------------------------- create modal handlers ------------------------- */

const handleCountryChange = (e) => {
  // fires when change the country in select
  // to update city select options
  let countries = getCountries();
  let cities = countries.filter((c) => c.name === e.target.value)[0].cities;
  let citiesOptions = cities.map((item) => `<option value='${item}'>${item}</option>`);

  let myDiv = document.getElementById('cities-options');
  myDiv.innerHTML = '';
  let newDiv = document.createElement('div');
  newDiv.innerHTML = `
      <select name="city" id='c-city'>
        <option value="">City</option>
        ${citiesOptions}
      </select>
    `;
  myDiv.appendChild(newDiv);
};

const showCreateModal = () => {
  let countries = getCountries();
  let sectors = getSectors();
  let modal = document.getElementById('create-modal');
  let modalBody = document.getElementById('create-modal-body');
  modalBody.innerHTML = '';
  let newDiv = document.createElement('div');

  let sectorOptions = sectors.map((item) => `<option value='${item.name}'>${item.name}</option>`);
  let countryOptions = countries.map((item) => `<option value='${item.name}'>${item.name}</option>`);
  newDiv.innerHTML = `
          <div class="row">
                <div> <input type="text" placeholder="Job Title *" id='c-title'/> </div>
                <div>
                  <select name="sector" id='c-sector'>
                    <option value="">Sector *</option>
                    ${sectorOptions}
                  </select>
                </div>
              </div>
              <div class="row">
                <div>
                  <select name="country" id='c-country'>
                  <option value="">Country *</option>
                  ${countryOptions}
                  </select>
                </div>
                <div id='cities-options'>
                  <select name="city" id='c-city'>
                  <option value="">City *</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <textarea id="c-description" rows="4" placeholder="Description"></textarea>
              </div>`;
  modalBody.appendChild(newDiv);

  modal.style.display = 'block';

  let countrySelect = document.getElementById(`c-country`);
  countrySelect.addEventListener('change', (e) => handleCountryChange(e));
};

const submitNewJob = async () => {
  let title = document.getElementById('c-title');
  let sector = document.getElementById('c-sector');
  let country = document.getElementById('c-country');
  let city = document.getElementById('c-city');
  let description = document.getElementById('c-description');

  if (title.value && sector.value && country.value && city.value) {
    let data = await Axios.post('http://localhost:5000/apis/jobs', {
      title: title.value,
      sector: sector.value,
      country: country.value,
      city: city.value,
      description: description.value,
    });
    let jobsLength = getJobs().list.length;
    let cardsContainer = document.getElementById('cards-container');
    let newDiv = document.createElement('div');
    let item = data.data.data;
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
        <img class="action-icon" src="./images/eye.png" id='details-icon-${jobsLength + 1}'/>
        <img class="action-icon" src="./images/trash.png" id='delete-icon-${jobsLength + 1}'/>
      </div>
    </div>`;

    cardsContainer.prepend(newDiv);
    let detailsIcon = document.getElementById(`details-icon-${jobsLength + 1}`);
    detailsIcon.addEventListener('click', () => showDetailsModal(item));
    let deleteIcon = document.getElementById(`delete-icon-${jobsLength + 1}`);
    deleteIcon.addEventListener('click', () => showDeleteModal(item));
    closeModal({ target: { id: 'create-modal-close' } });
  } else {
    alert('Please fill all required data');
  }
};

/* -------------------------- close modals handler -------------------------- */
const closeModal = (e) => {
  // handle click on close modal button and click on outside modal
  // also fired when click on add new job button
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

  if (e.target.id === 'delete-modal-submit') submitDeleteJob();
  if (e.target.id === 'show-create-modal') showCreateModal();
  if (e.target.id === 'submit-new-job') submitNewJob();
};

module.exports = { showDeleteModal, showDetailsModal, closeModal };
