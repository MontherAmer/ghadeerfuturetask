const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema(
  {
    name: { type: String },
    cities: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

exports.Country = mongoose.model('Country', CountrySchema);
