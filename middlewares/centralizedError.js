const { errorMessages } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(err.statusCode)
    .send({ message: statusCode === 500 ? errorMessages.somethingWrong : message });
  next();
};
