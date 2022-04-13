const { setFilters, getFilters } = require('./store');

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
  console.log('ppppppppppppppp', searchInput);
};
exports.processChange = debounce((e) => handleSearchInput(e));

// window.onload = function () {
//   let searchInput = document.getElementById('search-input');
//   searchInput.addEventListener('keydown', (e) => processChange(e));
// };
