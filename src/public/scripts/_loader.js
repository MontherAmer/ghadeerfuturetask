exports.toggleLoader = () => {
  let loader = document.getElementById('loader-wrapper');
  let show = loader.style.display;
  loader.style.display = show === 'block' ? 'none' : 'block';
};
