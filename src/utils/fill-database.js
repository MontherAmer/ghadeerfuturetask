const { Country, Sector, Job } = require('../models');
const { countries, sectors, jobs } = require('./data-lists');

exports.insertDocumentsInDataBase = async () => {
  let check = await Country.find({});

  if (!check?.length) {
    await Country.insertMany(countries);
    await Sector.insertMany(sectors);
    await Job.insertMany(jobs());
  }
  return;
};
