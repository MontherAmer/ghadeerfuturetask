const { Job } = require('../models');

exports.deleteJob = async (req, res) => {
  try {
    let { id } = req.params;

    await Job.updateOne({ _id: id }, { isDeleted: true });

    return res.send({ isSuccess: true, status: 200 });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500 });
  }
};
