const express = require('express');
const router = express.Router();

const {
  getProperty,
  getAllProperties,
  addProperty,
  updateProperty,
  deleteProperty
} = require("../controllers/property");

// Get all properties details
router.get('/', getAllProperties);

// Get single property
router.get('/:id', getProperty);

// TODO:
// post: equires logged in user
router.post('/', addProperty);

// TODO:
// patch: Requires logged in user
router.patch('/:id', updateProperty);

// TODO:
// Requires logged in user
router.delete('/:id', deleteProperty);

module.exports = router;
