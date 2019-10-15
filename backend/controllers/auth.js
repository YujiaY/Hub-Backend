const User = require('../models/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function createToken(isAdmin, id) {
  return jwt.sign({isAdmin, id}, process.env.JWT_PRIVATEKEY, {expiresIn: '1h'});
};

//TODO:
async function adminAddUser(req, res) {
  const {email, password, isAdmin} = req.body;

  bcrypt.genSalt(8, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hashedPW) {
      const user = new User({
        email, password: hashedPW, isAdmin
      });
      await user.save(function (err, savedUser) {
        if (err) {
          return res.status(500).json(err.errmsg || err.errors);
        }
        const token = createToken(isAdmin,savedUser._id);
        return res
          .status(201)
          .json({
            token: token,
            user: {email: email},
            UserID: savedUser._id
          });
      });

    });
  });
}

async function signUpUser (req, res) {
  const {email, password} = req.body;
  const isAdmin = false;

  bcrypt.genSalt(8, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hashedPW) {
      const user = new User({
        email, password: hashedPW, isAdmin
      });
      await user.save(function (err, savedUser) {
        if (err) {
          console.log(err);
          return res.status(500).json(err.errmsg || err.errors);
        }
        const token = createToken(isAdmin,savedUser._id);
        return res
            .status(201)
            .json({
              token: token,
              user: {email: email},
              UserID: savedUser._id
            });
        });
    });
  });
}

async function loginUser(req, res) {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email: email}).exec();
    if (!user) {
      return res.status(404).json({ message: 'Authentication failed, invalid username or password.' });
    }
    const isAdmin = user.isAdmin;
    bcrypt.compare(password, user.password)
      .then(result => {
        if (!result) {
          return res.status(404).json({ message: 'Authentication failed, invalid username or password.' });
        }
        const token = createToken(isAdmin,user._id);

        res
          .status(200)
          .json({
            token: token,
            message: 'Authentication succeeded.'
          })
      })
  } catch (e) {
     return res.status(500).send(e);
  }
}

module.exports = {
  signUpUser,
  adminAddUser,
  loginUser,
}
