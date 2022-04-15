require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const path = require('path');
const apis = require('./router');

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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/apis', apis);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
