const countries = [
  { name: 'Palestine', cities: ['Nablus', 'Ramallah'] },
  { name: 'Jordan', cities: ['Amman', 'Irbid'] },
  { name: 'Lebanon', cities: ['Beirut', 'Sour'] },
  { name: 'Saudi Arabia', cities: ['Al-Dammam', 'Abha'] },
];

const sectors = [{ name: 'Sales' }, { name: 'Airlines' }, { name: 'Administration' }, { name: 'Computer Software' }];

const jobs = () => {
  let arr = new Array(20).fill({});
  return arr.map((item, i) => {
    let rand1 = Math.floor(Math.random() * 4);
    let rand2 = Math.floor(Math.random() * 2);

    return {
      title: `Job ${i + 1}`,
      country: countries[rand1].name,
      city: countries[rand1].cities[rand2],
      sector: sectors[Math.floor(Math.random() * 4)].name,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
    };
  });
};

module.exports = { countries, sectors, jobs };
