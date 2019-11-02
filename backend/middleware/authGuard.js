const jwt = require('jsonwebtoken');

function validateToken(token) {
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_PRIVATEKEY);
  } catch (e) {
    return null;
  }
  return decoded;
}

async function headerCheck(req, res) {
  const authHeader = req.header('Authorization');
  if (!authHeader) return null;
;

  const contentArr = authHeader.split(' ');
  if (contentArr.length !== 2 || contentArr[0] !== 'Bearer') {
    return null;
  }
  return contentArr[1];
}

async function userGuard(req, res, next) {
  const {id} = req.params;

  const reqToken = await headerCheck(req, res);
  const decoded = validateToken(reqToken);
  if (decoded && decoded.id === id) {
    req.user = decoded;
    return next();
  }

  return res.status(401).json({
    status: "error3",
    message: 'Access denied.'
  })

};

async function adminGuard(req, res, next) {
  const reqToken = await headerCheck(req, res);
  if ( reqToken) {
    try {
      const decoded = validateToken(reqToken);
      if (decoded && decoded.isAdmin) {
        req.user = decoded;
        return next();
      } else throw new Error('Not Admin.');
    }
    catch (e) {
      return res.status(401).json({
        status: "error5",
        message: 'Access denied.'
      })
    }
  }
  return res.status(401).json({
    status: "error6",
    message: 'Access denied.'
  })

}

module.exports = {
  userGuard,
  adminGuard
};
