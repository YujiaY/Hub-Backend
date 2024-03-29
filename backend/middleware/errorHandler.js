// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res
      .status(400)
      .json({
        status: 'error',
        message: err.message,
      });
  }
  console.log(err);
  return res
    .status(500)
    .json({
      status: 'error',
      message: 'Something good happened. Contact the admin.',
      error: err,
    });
}
