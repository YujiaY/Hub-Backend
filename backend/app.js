const express = require('express');
const path = require('path');

const {connectToDB} =require('./utils/db');

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

connectToDB()
  .then(() => {
  console.log('DB Connected.')
  app.listen(process.env.SERVER_PORT);
})
  .catch(e => {
    console.log('DB Connection Failed!');
    console.error(e.message);
    process.exit(1);
  });
