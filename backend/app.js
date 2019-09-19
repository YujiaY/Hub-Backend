const express = require('express');
const path = require('path');

const app = express();

const propertyRoutes = require('./routes/property');

app.use(express.json());
app.use('/images', express.static(path.join('backend/images')));


app.use('/property', propertyRoutes);
app.use('/', (req, res) => {
  res.json('Hello, world!');
});


app.listen(3000);
