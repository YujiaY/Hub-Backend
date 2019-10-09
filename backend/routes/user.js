const express = require('express');
const router = express.Router();

const {
  getUser,
  getAllUsers,
  userGetAllProperties,
  userAddProperty
} = require("../controllers/user");

router.get('/:id', getUser);
router.get('/', getAllUsers);
router.get('/:id/properties/', userGetAllProperties);
router.post('/:id/properties/', userAddProperty);

module.exports = router;
