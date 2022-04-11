const mongoose = require('mongoose');

const SectorSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

exports.Sector = mongoose.model('Sector', SectorSchema);
