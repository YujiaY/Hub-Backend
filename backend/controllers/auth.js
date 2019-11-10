const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

function createToken(isAdmin, id) {
  return jwt.sign({ isAdmin, id }, process.env.JWT_PRIVATEKEY, { expiresIn: '1h' });
}

async function adminAddUser(req, res) {
  const { email, password, isAdmin } = req.body;

  bcrypt.genSalt(8, (err, salt) => {
    // eslint-disable-next-line no-shadow
    bcrypt.hash(password, salt, async (err, hashedPW) => {
      const user = new User({
        email, password: hashedPW, isAdmin,
      });
      // eslint-disable-next-line no-shadow
      await user.save((err, savedUser) => {
        if (err) {
          return res.status(500).json(err.errmsg || err.errors);
        }
        const token = createToken(isAdmin, savedUser._id);
        return res
          .status(201)
          .json({
            token,
            user: { email },
            UserID: savedUser._id,
          });
      });

    });
  });
}

async function signUpUser(req, res) {
  const { email, password } = req.body;
  const isAdmin = false;

  bcrypt.genSalt(8, (err, salt) => {
    // eslint-disable-next-line no-shadow
    bcrypt.hash(password, salt, async (err, hashedPW) => {
      const user = new User({
        email, password: hashedPW, isAdmin,
      });
      // eslint-disable-next-line no-shadow
      await user.save((err, savedUser) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err.errmsg || err.errors);
        }
        const token = createToken(isAdmin, savedUser._id);
        return res
          .status(201)
          .json({
            token,
            user: { email },
            UserID: savedUser._id,
          });
      });
    });
  });
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({ message: 'Authentication failed, invalid username or password.' });
    }
    const { isAdmin } = user;
    bcrypt.compare(password, user.password)
      .then((result) => {
        if (!result) {
          return res.status(404).json({ message: 'Authentication failed, invalid username or password.' });
        }
        const token = createToken(isAdmin, user._id);
        return res
          .status(200)
          .json({
            token,
            message: 'Authentication succeeded.',
          });
      });
  } catch (e) {
    return res.status(500).send(e);
  }
  return null;
}

module.exports = {
  signUpUser,
  adminAddUser,
  loginUser,
}
