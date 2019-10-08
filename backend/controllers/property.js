const Property = require('../models/property');

const mongodb = require('mongodb');

async function getAllProperties(req, res) {
  const properties = await Property.find().exec();
  return res.status(200).json(properties);
}

async function getProperty(req, res) {
  const id = new mongodb.ObjectId(req.params.id);
  const property = await Property.findById(id);
  if (!property) {
    return  res.status(404).json({
      status: "error",
      message: 'Property not found.'
    });
  }
  return res.json(property);
};


async function addProperty(req, res) {
  var newProperty = new Property ({
    address: req.body.address,
    contact: req.body.contact,
    title: req.body.title,
    price: req.body.price,
    type: req.body.type,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    carpark: req.body.carpark,
    images: req.body.images,
    paymentInterval: req.body.paymentInterval,
    content: req.body.content,
  });
  await newProperty.save();
  return res.status(201).json({
    status: 'ok',
    message: "Property saved.",
    data:{
      PropertyID: newProperty._id
    }
  });
};


async function updateProperty(req, res) {
  const id = req.params.id;
  const {
    address,
    contact,
    title,
    price,
    type,
    bedrooms,
    bathrooms,
    carpark,
    images,
    paymentInterval,
    content
  } = req.body;
  const updatedProperty = await Property.findByIdAndUpdate(
    id,
    {
      address,
      contact,
      title,
      price,
      type,
      bedrooms,
      bathrooms,
      carpark,
      images,
      paymentInterval,
      content
    },
    {new: true}
  );
  if (!updatedProperty) {
    return res.status(404).json({
      status: "error",
      message: 'Property not found!'
    });
  };
  return res.status(200).json({
    status: 'ok',
    message: "Property updated.",
    data: {
      PropertyID: updatedProperty._id
    }
    });
}

async function deleteProperty(req, res) {
  const id = req.params.id;
  const deletedProperty = await Property.findByIdAndDelete(id);
  if (!deletedProperty) {
    return res.status(404).json({
      status: "error",
      message: 'Property not found!'
    })
  };
  return res.status(200).json({
    status: 'ok',
    message: "Property deleted.",
    data: {
      PropertyID: req.params._id
    }
  });

}

module.exports = {
  getProperty,
  getAllProperties,
  addProperty,
  updateProperty,
  deleteProperty
}
