const { Country, Sector } = require('../models');

exports.listLookups = async (req, res) => {
  try {
    let countries = await Country.find({}).select({ name: 1, cities: 1, _id: 0 });
    let sectors = await Sector.find({}).select({ name: 1, _id: 0 });

    return res.send({ isSuccess: true, status: 200, data: { countries, sectors } });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500 });
  }
};
