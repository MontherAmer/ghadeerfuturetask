exports.setCountries = (data) => localStorage.setItem('countries', JSON.stringify(data));

exports.getCountries = () => JSON.parse(localStorage.getItem('countries'));

exports.setSectors = (data) => localStorage.setItem('sectors', JSON.stringify(data));

exports.getSectors = () => JSON.parse(localStorage.getItem('sectors'));

exports.setCities = (data) => localStorage.setItem('cities', JSON.stringify(data));

exports.getCities = () => JSON.parse(localStorage.getItem('cities'));
