const express = require('express');

const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../src/.env')});

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../utils/db');

const router = express.Router();

function createToken(userRole) {
  return jwt.sign({isAdmin: userRole}, process.env.JWT_PRIVATEKEY, {expiresIn: '1h'});
};

router.post('/signup', (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;
  const isAdmin = false;

  bcrypt.genSalt(8, function (err, salt) {
    bcrypt.hash(pw, salt, function (err, hashedPW) {
      db.getDb()
        .db()
        .collection('users')
        .insertOne({
          email: email,
          password: hashedPW,
          isAdmin: isAdmin
        })
        .then( result => {
          const token = createToken(isAdmin);
          res
            .status(201)
            .json({
              token: token,
              user: {email: email}
            });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            message: err.errmsg
          });
        });
    });
  })
});

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;
  var isAdmin;

  db.getDb()
    .db()
    .collection('users')
    .findOne({email: email})
    .then(userDoc => {
      isAdmin = userDoc.isAdmin;
      return bcrypt.compare(pw, userDoc.password);
    })
    .then(result => {
      if (!result) throw Error();
      const token = createToken(isAdmin);
      res
        .status(200)
        .json({
          token: token,
          message: 'Authentication succeeded.'
        });
    })
    .catch(err => {
      res
        .status(401)
        .json({message: 'Authentication failed, invalid username or password.'});
    });
});

module.exports = router;
