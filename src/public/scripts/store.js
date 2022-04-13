exports.setCountries = (data) => localStorage.setItem('countries', JSON.stringify(data));

exports.getCountries = () => JSON.parse(localStorage.getItem('countries'));

exports.setSectors = (data) => localStorage.setItem('sectors', JSON.stringify(data));

exports.getSectors = () => JSON.parse(localStorage.getItem('sectors'));

exports.setCities = () => {
  let countries = this.getCountries();
  let cities = [];
  console.log(countries);
  countries.map((item) => {
    if (this.getFilters().country.includes(item.name)) {
      item.cities.map((city) => cities.push(city));
    }
  });
  console.log('CCCCCCC ', cities);
  localStorage.setItem('cities', JSON.stringify(cities));
};

exports.getCities = () => JSON.parse(localStorage.getItem('cities'));

exports.initFilters = () => {
  localStorage.setItem(
    'filters',
    JSON.stringify({
      page: 1,
      title: '',
      country: [],
      city: [],
      sector: [],
    })
  );
};

exports.setFilters = (name, value) => {
  let filters = JSON.parse(localStorage.getItem('filters'));

  // handle sector, country and city
  if (Array.isArray(filters[name])) {
    if (filters[name].includes(value)) {
      filters[name] = filters[name].filter((item) => item != value);
    } else {
      let temp = filters[name];
      temp.push(value);
      filters[name] = temp;
    }
  } else {
    filters[name] = value;
  }

  localStorage.setItem('filters', JSON.stringify(filters));
};

exports.getFilters = () => JSON.parse(localStorage.getItem('filters'));
