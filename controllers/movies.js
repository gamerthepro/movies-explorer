const Movie = require('../models/movie');
const BadRequestError = require('../errors/400-BadRequestError');
const NotFoundError = require('../errors/404-NotFoundError');

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
    .orFail(() => {
      throw new Error('invalidUserId');
    })
    .then((data) => {
      if (data.owner._id.toString() !== req.user._id.toString()) {
        throw new NotFoundError('Чужие фильмы нельзя удалять');
      }
      Movie.findByIdAndRemove(req.params.id)
        .then((movie) => res.status(200).send({ data: movie }))
        .catch((err) => {
          throw new NotFoundError(err.message);
        })
        .catch(next);
    })
    .catch((err) => {
      throw new NotFoundError(err.message);
    })
    .catch(next);
};

module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};
