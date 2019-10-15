const express = require('express');

const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../src/.env')});

const {adminGuard} = require('../middleware/authGuard');

const {
  signUpUser,
  adminAddUser,
  loginUser,
} = require("../controllers/auth");

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.post('/adminAddUser', adminGuard, adminAddUser);

module.exports = router;
