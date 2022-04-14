const countries = [
  { name: 'Palestine', cities: ['Nablus', 'Ramallah'] },
  { name: 'Jordan', cities: ['Amman', 'Irbid'] },
  { name: 'Lebanon', cities: ['Beirut', 'Sour'] },
  { name: 'Saudi Arabia', cities: ['Al-Dammam', 'Abha'] },
];

const sectors = [{ name: 'Sales' }, { name: 'Airlines' }, { name: 'Administration' }, { name: 'Computer Software' }];

const descriptions = [
  `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
  `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
  `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
];

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
      description: descriptions[Math.floor(Math.random() * 3)],
    };
  });
};

module.exports = { countries, sectors, jobs };
