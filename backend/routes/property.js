const express = require('express');
const router = express.Router();

const mongodb = require('mongodb');

const db = require('../utils/db');

const Decimal128 = mongodb.Decimal128;
const ObjectId = mongodb.ObjectId;

// Get list of property details
router.get('/', (req, res, next) => {
  //TODO:
  // Pagination:
  // const queryPage = req.query.page;
  // const pageSize = 5;
  // let resultProperties = [...properties];
  // if (queryPage) {
  //   resultProperties = properties.slice(
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
  db.getDb()
    .db()
    .collection('properties')
    .findOne({_id: new ObjectId(req.params.id)})
    // .findOne({_id: req.params.id})
    .then(result => {
      // result.price = result.price.toString();
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'An error occurred.'});
    });
});

// TODO:
// Requires logged in user
router.post('', (req, res, next) => {
  const newProperty = {
    address: req.body.address,
    contact: req.body.contact,
    title: req.body.title,
    price: Decimal128.fromString(req.body.price.toString()),
    type: req.body.type,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    carpark: req.body.carpark,
    images: req.body.images,
    paymentInterval: req.body.paymentInterval,
    content: req.body.content,
  };
  db.getDb()
    .db()
    .collection('properties')
    .insertOne(newProperty)
    .then( result => {
        res.status(201).json({ message: 'New property added.', propertyId: result.insertedId});
      }
    )
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'An error occurred.'});
    });
});

// TODO:
// Requires logged in user
router.patch('/:id', (req, res, next) => {
  const updatedProperty = {
    address: req.body.address,
    contact: req.body.contact,
    title: req.body.title,
    price: Decimal128.fromString(req.body.price.toString()),
    type: req.body.type,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    carpark: req.body.carpark,
    images: req.body.images,
    paymentInterval: req.body.paymentInterval,
    content: req.body.content,
  };
  db.getDb()
    .db()
    .collection('properties')
    .updateOne(
      {_id: new ObjectId(req.params.id)},
      {$set: updatedProperty}
    )
      .then( result => {
        res.status(201).json({
          message: 'Existing property updated.',
          propertyId: req.params.id
        });
      }
    )
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'An error occurred.'});
    });
});

// TODO:
// Requires logged in user
router.delete('/:id', (req, res, next) => {
  db.getDb()
    .db()
    .collection('properties')
    .deleteOne({_id: new ObjectId(req.params.id)})
    .then(result => {
      res.status(200).json({
        message: 'Property deleted.',
        propertyId: req.params.id
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'An error occurred.'})
    });
});

module.exports = router;
