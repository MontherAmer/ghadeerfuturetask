const { Job } = require('../models');

exports.listJobs = async (req, res) => {
  try {
    let { page = 1, title, country, city, sector } = req.query;

    let query = { isDeleted: false };

    if (title) query.title = { $regex: title, $options: 'i' };
    if (country) query.country = { $in: country };
    if (city) query.city = { $in: city };
    if (sector) query.sector = { $in: sector };

    let list = await Job.find(query)
      .limit(10)
      .skip((parseInt(page) - 1) * 10);

    let total = await Job.countDocuments(query);

    return res.send({ isSuccess: true, status: 200, data: { list, total } });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500 });
  }
};
