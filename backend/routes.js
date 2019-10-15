const express = require('express');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const propertyRoute = require('./routes/property');

const {adminGuard} = require('./middleware/authGuard');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/property', adminGuard, propertyRoute);

module.exports =router;
