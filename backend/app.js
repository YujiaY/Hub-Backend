const express = require('express');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../src/.env')});
const db = require('./utils/db');

const app = express();

const propertyRoutes = require('./routes/property');
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use('/images', express.static(path.join('backend/images')));


app.use('/property', propertyRoutes);
app.use('/auth', authRoutes);
app.use('/', (req, res) => {
  res.json('Hello, world!');
});

db.initDb((err, db) => {
  if (err) {
    console.log(err)
  }  else {
       app.listen(process.env.SERVER_PORT);
  }
  }
);
