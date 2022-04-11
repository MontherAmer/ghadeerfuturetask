const { Job } = require('../models');

exports.createJob = async (req, res) => {
  try {
    let { title, country, city, sector, description } = req.body;

    console.log('req.oblaskfd ', req.body);

    if (!title || !country || !city || !sector) return res.send({ isSuccess: false, status: 500, error: 'Missing required fields' });

    let job = new Job({ ...req.body });

    let data = await job.save();

    console.log('data', data);
  } catch (err) {
    console.log('err ', err);
    return res.send({ isSuccess: false, status: 500 });
  }
};
