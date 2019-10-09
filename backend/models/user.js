const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    lowercase: true,
    required: [true, "Email can't be blank"],
    validate:{
      validator: email => !Joi.validate(email, Joi.string().email()).error,
      message: 'Invalid email format.'
    },
    index: true}
  ,
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }]
},
  {timestamps: true})

const Model = mongoose.model('User', userSchema);

module.exports = Model;
