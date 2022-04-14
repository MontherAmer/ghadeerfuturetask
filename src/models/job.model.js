const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    title: { type: String },
    country: { type: String },
    city: { type: String },
    sector: { type: String },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

exports.Job = mongoose.model('Job', JobSchema);
