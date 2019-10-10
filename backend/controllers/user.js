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

async function userGetProperty(req, res) {
  const {id: userId, propertyId} = req.params;
  console.log(userId);
  console.log(propertyId);
  const property = await Property.findById(propertyId).exec();
  if (!property) {
    return  res.status(404).json({
      status: "error",
      message: 'Property not found.'
    });
  }
  return res.json({
    status: 'ok',
    data: property
  });
}

async function userGetAllProperties(req, res) {
  const properties = await Property.find({
    user: req.params.id
  }).exec();
  return res.status(201).json({
    status: 'ok',
    count: properties.length,
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
  const user = await User.findById(new mongodb.ObjectId(req.params.id)).exec();
  user.properties.addToSet(new mongodb.ObjectId(newProperty._id));
  await user.save();
  return res.status(201).json({
    status: 'ok',
    message: "Property saved.",
    data:{
      PropertyID: newProperty._id
    }
  });
}

async function userUpdateProperty(req, res) {
  const {id: userId, propertyId} = req.params;
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
    propertyId,
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


async function userDeleteProperty(req, res) {
  const {id: userId, propertyId} = req.params;
  const deletedProperty = await Property.findByIdAndDelete(propertyId);
  if (!deletedProperty) {
    return res.status(404).json({
      status: "error",
      message: 'Property not found!'
    })
  }
  const user = await User.findById(userId).exec();
  user.properties.pull(propertyId);
  await user.save();
  return res.status(200).json({
    status: 'ok',
    message: "Property deleted."
  });
}


module.exports = {
  getUser,
  getAllUsers,
  userGetProperty,
  userGetAllProperties,
  userAddProperty,
  userUpdateProperty,
  userDeleteProperty,
};
