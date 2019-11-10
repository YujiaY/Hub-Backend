const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  address: {
    unitNo: {
      type: Number,
      required: true,
    },
    streetNo: {
      type: String,
      required: true,
    },
    streetName: {
      type: String,
      required: true,
    },
    suburbName: {
      type: String,
      required: true,
    },
    stateName: {
      type: String,
      required: true,
    },
    postcode: {
      type: Number,
      required: true,
    }
  },
  contact: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  carpark: {
    type: Number,
    required: true,
  },
  images: {
    type: [{ type: String }],
    required: true,
  },
  paymentInterval: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
},
{ timestamps: true });

const Model = mongoose.model('Property', propertySchema);

module.exports = Model;
