const express = require('express');
const router = express.Router();

const {userGuard, adminGuard} = require('../middleware/authGuard');

const {
  getUser,
  getAllUsers,
  userGetProperty,
  userGetAllProperties,
  userAddProperty,
  userUpdateProperty,
  userDeleteProperty
} = require("../controllers/user");

router.get('/:id', adminGuard, getUser);
router.get('/', adminGuard, getAllUsers);
router.get('/:id/properties/:propertyId', userGuard, userGetProperty);
router.get('/:id/properties/', userGuard, userGetAllProperties);
router.post('/:id/properties/', userGuard, userAddProperty);
router.patch('/:id/properties/:propertyId', userGuard, userUpdateProperty);
router.delete('/:id/properties/:propertyId', userGuard, userDeleteProperty);

module.exports = router;
