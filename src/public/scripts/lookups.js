exports.appendSectorsToScreen = (sectors) => {
  let sectorsContainer = document.getElementById('sectors-container');

  sectors.map((item) => {
    let newDiv = document.createElement('div');

    newDiv.innerHTML = `
      <label class="checkbox-container">${item.name}
          <input type="checkbox" id="checkbox" />
          <span class="checkbox-checkmark"></span>
      </label>`;

    sectorsContainer.appendChild(newDiv);
  });
};

exports.appendCountriesToScreen = (countries) => {
  let countriesContainer = document.getElementById('countries-container');

  countries.map((item) => {
    let newDiv = document.createElement('div');

    newDiv.innerHTML = `
        <label class="checkbox-container">${item.name}
            <input type="checkbox" id="checkbox" />
            <span class="checkbox-checkmark"></span>
        </label>`;

    countriesContainer.appendChild(newDiv);
  });
};
