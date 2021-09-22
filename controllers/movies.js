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
  Movie.findByIdAndRemove(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorMessages.notFoundMovie)
      }
      if (String(movie.owner) !== req.user._id) {
        throw new ForbiddenError(errorMessages.cannotDeleteMovie);
      }
      res.status(200).send({ movie });
    })
    .catch(next);
};

module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};
