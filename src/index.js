const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

const { insertDocumentsInDataBase } = require('./utils/fill-database');

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('connected to database successfully');
  insertDocumentsInDataBase();
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
