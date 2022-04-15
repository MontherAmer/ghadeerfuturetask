exports.toggleLoader = () => {
  let loader = document.getElementById('loader-wrapper');
  let show = loader.style.display;
  loader.style.display = show === 'block' ? 'none' : 'block';
};

exports.checkValidForm = (firstSubmit) => {
  let title = document.getElementById('c-title').value;
  let sector = document.getElementById('c-sector').value;
  let country = document.getElementById('c-country').value;
  let city = document.getElementById('c-city').value;
  let description = document.getElementById('c-description').value;

  let valid = true;
  if (firstSubmit && !title) {
    etitle = document.getElementById('e-title');
    etitle.style.display = 'block';
    valid = false;
  } else {
    etitle = document.getElementById('e-title');
    etitle.style.display = 'none';
  }
  if (firstSubmit && !sector) {
    esector = document.getElementById('e-sector');
    esector.style.display = 'block';
    valid = false;
  } else {
    esector = document.getElementById('e-sector');
    esector.style.display = 'none';
  }
  if (firstSubmit && !country) {
    ecountry = document.getElementById('e-country');
    ecountry.style.display = 'block';
    valid = false;
  } else {
    ecountry = document.getElementById('e-country');
    ecountry.style.display = 'none';
  }
  if (firstSubmit && !city) {
    ecity = document.getElementById('e-city');
    ecity.style.display = 'block';
    valid = false;
  } else {
    ecity = document.getElementById('e-city');
    if (ecity) ecity.style.display = 'none';
  }
  if (firstSubmit && !description) {
    edescription = document.getElementById('e-description');
    edescription.style.display = 'block';
    valid = false;
  } else {
    edescription = document.getElementById('e-description');
    edescription.style.display = 'none';
  }
  return valid;
};

exports.handleInputChange = () => this.checkValidForm();
