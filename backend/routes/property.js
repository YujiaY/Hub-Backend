const express = require('express');
const router = express.Router();

const {
  getProperty,
  getAllProperties,
  addProperty,
  updateProperty,
  deleteProperty
} = require("../controllers/property");

const {adminGuard} = require('../middleware/authGuard');


// Get all properties details
router.get('/', getAllProperties);

// Get single property
router.get('/:id', getProperty);

// TODO:
// post: equires logged in user
router.post('/', adminGuard, addProperty);

// TODO:
// patch: Requires logged in user
router.patch('/:id', adminGuard, updateProperty);

// TODO:
// Requires logged in user
router.delete('/:id', adminGuard, deleteProperty);

module.exports = router;
