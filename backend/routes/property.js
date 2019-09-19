const express = require('express');
const router = express.Router();


//Use dummy data for initial testing:
const properties = [{
_id: 'property1',
  address: '13b Furlong Street, Indooroopilly, Qld 4068',
  contact: '0411 111 111',
  title: '',
  price: 300,
  type: 'House',
  images: [
    'http://localhost:3000/images/property1-1.jpg',
    'http://localhost:3000/images/property1-2.jpg',
    'http://localhost:3000/images/property1-3.jpg'
  ],
  paymentInterval:'Weekly',
  Content:'Dummy content for property 1.'
},
  {
    _id: 'property2',
    address: '1/34 Underhill Avenue Indooroopilly Qld 4068',
    contact: '0422 222 222',
    title: '',
    price: 600,
    type: 'Unit',
    images: [
      'http://localhost:3000/images/property2-1.jpg',
      'http://localhost:3000/images/property2-2.jpg',
      'http://localhost:3000/images/property2-3.jpg'
    ],
    paymentInterval:'Fortnightly',
    Content:'Dummy content for property 2.'
  },
  {
    _id: 'property3',
    address: '232/181 Clarence Rd, Indooroopilly, Qld 4068',
    contact: '0433 333 333',
    title: '',
    price: 900,
    type: 'House',
    images: [
      'http://localhost:3000/images/property3-1.jpg',
      'http://localhost:3000/images/property3-2.jpg',
      'http://localhost:3000/images/property3-3.jpg'
    ],
    paymentInterval:'Monthly',
    Content:'Dummy content for property 3.'
  }
];

// Get list of property details
router.get('/', (req, res, next) => {
  // Return a list of dummy data
  // Later, this data will be fetched from MongoDB
  const queryPage = req.query.page;
  const pageSize = 5;
  let resultProperties = [...properties];
  if (queryPage) {
    resultProperties = properties.slice(
      (queryPage - 1) * pageSize,
      queryPage * pageSize
    );
  }
  res.json(resultProperties);
});

// Get single property
router.get('/:id', (req, res, next) => {
  const property = properties.find(p => p._id === req.params.id);
  res.json(property);
});

// TODO:
// Add new product
// Requires logged in user

// TODO:
// Edit existing product
// Requires logged in user

// TODO:
// Delete a product
// Requires logged in user

module.exports = router;
