const express = require('express');
require('express-async-errors');
const path = require('path');

const {connectToDB} =require('./utils/db');
const errorHandler = require('./middleware/errorHandler');
const app = express();

const routes = require('./routes');

app.use(express.json());
const PORT = process.env.PORT || 3333;
app.use('/images', express.static(path.join('backend/images')));


app.use('/v1', routes);
app.use(errorHandler);
app.use('/', (req, res) => {
  res.json('Hello, world!');
});

connectToDB()
  .then(() => {
  console.log('DB Connected.');
  app.listen(PORT);
  console.log(`Listening on port: ${PORT}.`);
})
  .catch(e => {
    console.log('DB Connection Failed!');
    console.error(e.message);
    process.exit(1);
  });
