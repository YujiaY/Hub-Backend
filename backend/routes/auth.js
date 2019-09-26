const express = require('express');

const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../src/.env')});

const {
  signUpUser,
  adminAddUser,
  loginUser,
} = require("../controllers/user");

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/adminAddUser', adminAddUser);
router.post('/login', loginUser);


module.exports = router;
