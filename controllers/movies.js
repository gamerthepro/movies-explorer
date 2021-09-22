const Movie = require('../models/movie');
const BadRequestError = require('../errors/400-BadRequestError');
const NotFoundError = require('../errors/404-NotFoundError');
const ForbiddenError = require('../errors/403-ForbiddenError');
const { errorMessages, answerMessages } = require('../utils/constants');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((data) => res.status(200).send({ data }))
    .catch((err) => {
      throw new BadRequestError(err.message);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => new NotFoundError(errorMessages.notFoundMovie))
    .then((data) => {
      if (data.owner._id.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(errorMessages.cannotDeleteMovie);
      }
      Movie.findByIdAndRemove(req.params.movieId)
      .then((movie) => {
        if (movie.owner._id.toString() !== req.user._id) {
          throw new ForbiddenError(errorMessages.cannotDeleteMovie);
        } else {
          return movie.remove()
            .then(() => res.send({ message: answerMessages.movieDeleted }));
        }
      })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(errorMessages.incorrectData));
      } else {
        next(err);
      }
    });
};

module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};
