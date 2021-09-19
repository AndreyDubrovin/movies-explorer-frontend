const Movies = require('../models/movie');

const NotFoundError = require('../errors/not-found-err'); // 404
const BadRequest = require('../errors/bad-request'); // 400
const Forbidden = require('../errors/forbidden'); // 403

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movies.find({ owner }).populate('owner')
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
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

  const owner = req.user._id;

  Movies.create({
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
    owner,
  })
    .then((movie) => {
      Movies.find({ _id: movie._id }).populate('owner')
        .then((newMovie) => {
          res.send({ data: newMovie[0] });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const badrequest = new BadRequest('Переданы некорректные данные при сохранении видео.');
        next(badrequest);
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  Movies.findById(req.params.movieId)
    .then((movie) => {
      if (movie === null) throw new NotFoundError('Видео с указанным _id не найдено.');
      if (movie.owner.toString() === owner) {
        Movies.findByIdAndRemove(req.params.movieId)
          .then(() => {
            res.send({ message: 'Видео удалено' });
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              const badrequest = new BadRequest('Переданы некорректные данные movie id.');
              next(badrequest);
            } else {
              next(err);
            }
          });
      } else {
        const forbidden = new Forbidden('У вас нет прав на удаление данного видео.');
        next(forbidden);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const badrequest = new BadRequest('Переданы некорректные данные movie id.');
        next(badrequest);
      } else {
        next(err);
      }
    });
};
