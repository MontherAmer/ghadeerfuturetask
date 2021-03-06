/* -------------------------------------------------------------------------- */
/*             functions related to modals (create,delete,display)            */
/* -------------------------------------------------------------------------- */

const Axios = require('axios');
const { toggleLoader, checkValidForm, handleInputChange } = require('./_helpers');
const { setJobs, getJobs, setCurrentJob, getCurrentJob, getCountries, getSectors } = require('./_store');

/* -------------------------- delete modal handlers -------------------------- */
const submitDeleteJob = async () => {
  let id = getCurrentJob();
  toggleLoader();
  await Axios.delete(`/apis/jobs/${id}`);
  toggleLoader();
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
      <small id="e-city">City is required</small>
    `;
  myDiv.appendChild(newDiv);
  document.getElementById('c-city').addEventListener('change', () => handleInputChange());

  checkValidForm();
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
                <div> 
                  <input type="text" placeholder="Job Title *" id='c-title'/> 
                  <small id="e-title">Title is required</small>
                </div>
                <div>
                  <select name="sector" id='c-sector'>
                    <option value="">Sector *</option>
                    ${sectorOptions}
                  </select>
                  <small id="e-sector">Sector is required</small>
                </div>
              </div>
              <div class="row">
                <div>
                  <select name="country" id='c-country'>
                  <option value="">Country *</option>
                  ${countryOptions}
                  </select>
                  <small id="e-country">Country is required</small>
                </div>
                <div id='cities-options'>
                  <select name="city" id='c-city'>
                  <option value="">City *</option>
                  </select>
                  <small id="e-city">City is required</small>
                </div>
              </div>
              <div class="row">
              <div style="width:100%">
                <textarea id="c-description" rows="4" placeholder="Description"></textarea>
                <small id="e-description">Description is required</small>
              </div>

              </div>`;
  modalBody.appendChild(newDiv);

  modal.style.display = 'block';

  document.getElementById('c-title').addEventListener('keydown', () => handleInputChange());
  document.getElementById('c-sector').addEventListener('change', () => handleInputChange());
  document.getElementById('c-city').addEventListener('change', () => handleInputChange());
  document.getElementById('c-description').addEventListener('keydown', () => handleInputChange());

  let countrySelect = document.getElementById(`c-country`);
  countrySelect.addEventListener('change', (e) => handleCountryChange(e));
};

const submitNewJob = async () => {
  let title = document.getElementById('c-title');
  let sector = document.getElementById('c-sector');
  let country = document.getElementById('c-country');
  let city = document.getElementById('c-city');
  let description = document.getElementById('c-description');
  if (checkValidForm(true)) {
    toggleLoader();
    let data = await Axios.post('/apis/jobs', {
      title: title.value,
      sector: sector.value,
      country: country.value,
      city: city.value,
      description: description.value,
    });
    toggleLoader();

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
