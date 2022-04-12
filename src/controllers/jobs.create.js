const { Job } = require('../models');

exports.createJob = async (req, res) => {
  try {
    let { title, country, city, sector, description } = req.body;

    if (!title || !country || !city || !sector) return res.send({ isSuccess: false, status: 500, error: 'Missing required fields' });

    let job = new Job({ ...req.body });

    let data = await job.save();

    return res.send({ isSuccess: true, status: 200, data });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500 });
  }
};
