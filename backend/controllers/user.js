const User = require('../models/user');
const Property = require('../models/property');

const mongodb = require('mongodb');

async function getUser(req, res) {
  const {id} = req.params;

  const user = await User.findById(id)
    .populate('properties', 'title')
    .exec();

  if (!user) {
    return  res.status(404).json({
      status: "error",
      message: 'User not found.'
    });
  };
  return res.status(201).json({
    status: 'ok',
    data: user
  });
}

async function getAllUsers(req, res) {
  const users = await User.find()
    .populate('properties', 'title')
    .exec();

  if (!users.length) {
    return  res.status(404).json({
      status: "error",
      message: 'There is no user.'
    });
  };
  return res.status(201).json({
    status: 'ok',
    data: users
  });
};

async function userGetAllProperties(req, res) {
  const properties = await Property.find({
    user: new mongodb.ObjectId(req.params.id)
  }).exec();
  return res.status(201).json({
    status: 'ok',
    data: properties
  });

}

async function userAddProperty(req, res) {
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
    user: req.params.id,
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

module.exports = {
  getUser,
  getAllUsers,
  userGetAllProperties,
  userAddProperty,
}
