const express = require('express');
const router = express.Router();

const {
  getUser,
  getAllUsers,
  userGetProperty,
  userGetAllProperties,
  userAddProperty,
  userUpdateProperty,
  userDeleteProperty
} = require("../controllers/user");

router.get('/:id', getUser);
router.get('/', getAllUsers);
router.get('/:id/properties/:propertyId', userGetProperty);
router.get('/:id/properties/', userGetAllProperties);
router.post('/:id/properties/', userAddProperty);
router.patch('/:id/properties/:propertyId', userUpdateProperty);
router.delete('/:id/properties/:propertyId', userDeleteProperty);

module.exports = router;
