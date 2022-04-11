const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    title: { type: String },
    country: { type: String },
    city: { type: String },
    sector: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

exports.Job = mongoose.model('Job', JobSchema);
