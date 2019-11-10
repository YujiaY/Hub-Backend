const express = require('express');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
const { userGuard, adminGuard } = require('../middleware/authGuard');

const {
  getUser,
  getAllUsers,
  userGetProperty,
  userGetAllProperties,
  userAddProperty,
  userUpdateProperty,
  userDeleteProperty,
} = require('../controllers/user');

// router.get('/:id', adminGuard, getUser);
router.get('/:id', getUser);
// router.get('/', adminGuard, getAllUsers);
router.get('/', getAllUsers);
// router.get('/:id/properties/:propertyId', userGuard, userGetProperty);
router.get('/:id/properties/:propertyId', userGetProperty);
// router.get('/:id/properties/', userGuard, userGetAllProperties);
router.get('/:id/properties/', userGetAllProperties);
// router.post('/:id/properties/', userGuard, userAddProperty);
router.post('/:id/properties/', userAddProperty);
// router.patch('/:id/properties/:propertyId', userGuard, userUpdateProperty);
router.patch('/:id/properties/:propertyId', userUpdateProperty);
// router.delete('/:id/properties/:propertyId', userGuard, userDeleteProperty);
router.delete('/:id/properties/:propertyId', userDeleteProperty);

module.exports = router;
