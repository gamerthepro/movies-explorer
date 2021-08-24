const User = require('../models/user');
const NotFoundError = require('../errors/404-NotFoundError');
const BadRequestError = require('../errors/400-BadRequestError');
const { errorMessages } = require('../utils/constants');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new Error(errorMessages.notExistUser);
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(errorMessages.incorrectId);
      }
      throw new NotFoundError(err.message);
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new BadRequestError(errorMessages.incorrectUserData);
  }

  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new Error('invalidUserId');
    })
    .then((data) => res.status(200).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadRequestError(errorMessages.incorrectData);
      }
      throw new NotFoundError(err.message);
    })
    .catch(next);
};
