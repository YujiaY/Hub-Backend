const express = require('express');
const router = express.Router();

const mongodb = require('mongodb');

const db = require('../utils/db');

const Decimal128 = mongodb.Decimal128;
const ObjectId = mongodb.ObjectId;

//Use dummy data for initial testing:
const dummyProperties = [
  {
    "_id":"5d889307505ce13cf8a46298",
    "address": {
      "unitNo": "",
      "streetNo": "13B",
      "streetName": "Furlong Street",
      "suburbName": "Indooroopilly",
      "stateName": {
        "fullName": "Queesnland",
        "abb": "QLD"
      },
      "postcode": 4068
    },
    "contact": "0411111111",
    "title": "Great Value Two Bedroom Apartment Alternative",
    "price": 300,
    "type": "House",
    "bedrooms":2,
    "bathrooms":1,
    "carpark":2,
    "images": [
      "http://localhost:3333/images/property1-1.jpg",
      "http://localhost:3333/images/property1-2.jpg",
      "http://localhost:3333/images/property1-3.jpg"
    ],
    "paymentInterval":"Weekly",
    "Content":"This cosy home is an 8 minute walk to the bus stop that will take you to the City, University of Queensland and Indooroopilly Shoppingtown, as well as situated next to the beautiful Rainbow Forest Park. Within a short drive to the train station and all schools in the area, this unfurnished property boasts."
  },
    {
      "_id":"5d8891c726ac72a3d1c48e631",
      "address": {
        "unitNo": "1",
        "streetNo": "34",
        "streetName": "Underhill Avenue",
        "suburbName": "South Brisbane",
        "stateName": {
          "fullName": "Queesnland",
          "abb": "QLD"
        },
        "postcode": 4101
      },
      "contact": "0422222222",
      "title": "Unit in the ultimate location - Whitegoods included!",
      "price": 800,
      "type": "Unit",
      "bedrooms":3,
      "bathrooms":1,
      "carpark":2,
      "images": [
        "http://localhost:3333/images/property2-1.jpg",
        "http://localhost:3333/images/property2-2.jpg",
        "http://localhost:3333/images/property2-3.jpg"
      ],
      "paymentInterval":"Fortnightly",
      "Content":"This leafy three bedroom spacious two storey unit is located in the heart of Indooroopilly. Just opposite Indooroopilly Shopping Centre and a short stroll to the train station you have all amenities at your fingertips."
    },
    {
      "_id":"5d88935d9d1a4a3d58f87df8",
      "address": {
        "unitNo": "232",
        "streetNo": "181",
        "streetName": "Clarence Road",
        "suburbName": "Indooroopilly",
        "stateName": {
          "fullName": "Queesnland",
          "abb": "QLD"
        },
        "postcode": 4068
      },
      "contact": "0433333333",
      "title": "An incredible opportunity to secure one of the limited units in this exclusive community.",
      "price": 1650,
      "type": "Apartment",
      "bedrooms":1,
      "bathrooms":1,
      "carpark":1,
      "images": [
        "http://localhost:3333/images/property3-1.jpg",
        "http://localhost:3333/images/property3-2.jpg",
        "http://localhost:3333/images/property3-3.jpg"
      ],
      "paymentInterval":"Monthly",
      "Content":"Central Park Residences offers a dream lifestyle, positioned in the heart of Indooroopilly and facing the quiet side of daily traffic, capturing both vibrant living and convenience right at your doorway."
    }]
;

// Get list of property details
router.get('/', (req, res, next) => {
  // Return a list of dummy data
  // Later, this data will be fetched from MongoDB
  // const queryPage = req.query.page;
  // const pageSize = 5;
  // let resultProperties = [...dummyProperties];
  // if (queryPage) {
  //   resultProperties = dummyProperties.slice(
  //     (queryPage - 1) * pageSize,
  //     queryPage * pageSize
  //   );
  // }
  const properties = [];
  db.getDb()
    .db()
    .collection('properties')
    .find().forEach(propertyDoc => {
    propertyDoc.price = propertyDoc.price.toString();
    properties.push(propertyDoc);
  })
    .then( result => {
        res
          .status(200)
          .json(properties);
      }
    )
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'An error occurred.'});
    });

});

// Get single property
router.get('/:id', (req, res, next) => {
  const property = dummyProperties.find(p => p._id === req.params.id);
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
