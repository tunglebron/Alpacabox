const movieService = require("../services/movies.service")

exports.createMovie = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const savedMovie = await movieService.createMovie(req.body);
      res.success({
        result: {
          data: savedMovie
        }
      });
    } catch (err) {
      next(err);
    }
  } else {
    res.forbidden({ err: "You are not allowed!" });
  }
}

exports.updateMovie = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await movieService.updateMovie(req.params.id, req.body);
      res.success({
        result: {
          data: updatedMovie
        }
      });
    } catch (err) {
      next(err);
    }
  } else {
    res.forbidden({ err: "You are not allowed!" });
  }
}

exports.deleteMovie = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const deletedMovie = await movieService.deleteMovie(req.params.id);
      res.success({
        result: {
          data: deletedMovie
        }
      });
    } catch (err) {
      next(err);
    }
  } else {
    res.forbidden({ err: "You are not allowed!" });
  }
}

exports.getMovie = async (req, res, next) => {
  try {
    const movie = await movieService.getMovie(req.params.id);
    res.success({
      result: {
        data: movie,
        total: movie.length
      }
    });
  } catch (err) {
    next(err);
  }
}

exports.getRandom = async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await movieService.getRandomSeries();
    } else {
      movie = await movieService.getRandomMovie();
    }
    res.success({
      result: {
        data: movie,
        total: movie.length
      }
    });
  } catch (err) {
    next(err);
  }
}

exports.getAllMovies = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const movies = await movieService.getAllMovies();
      res.success({
        result: {
          data: movies.reverse()
        }
      });
    } catch (err) {
      next(err);
    }
  } else {
    res.forbidden({ err: "You are not allowed!" });
  }
}