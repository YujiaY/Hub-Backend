const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    index: true}
  ,
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
},
  {timestamps: true})

const Model = mongoose.model('User', userSchema);

module.exports = Model;
