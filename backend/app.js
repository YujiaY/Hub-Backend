const express = require('express');
require('express-async-errors');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');
const {connectToDB} =require('./utils/db');
const errorHandler = require('./middleware/errorHandler');
const app = express();


const PORT = process.env.PORT || 3333;
const morganlog =
  process.env.NODE_ENV === 'production' ? morgan('common') : morgan('dev');


app.use(helmet());
app.use(morganlog);
app.use(cors());
app.use(express.json());
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
