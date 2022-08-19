const Movie = require("../models/Movie");

exports.createMovie = async (movie) => {
  const newMovie = new Movie(movie);

  return await newMovie.save();
}

exports.updateMovie = async (movieId,movie) => {
  const updatedMovie = await Movie.findByIdAndUpdate(
    movieId,
    {
      $set: movie,
    },
    { new: true }
  );

  return updatedMovie;
}

exports.deleteMovie = async (movieId) => {
  const deletedMovie = await Movie.findByIdAndDelete(movieId);

  return deletedMovie;
}

exports.getMovie = async (movieId) => {
  const movie = await Movie.findById(movieId);

  return movie;
}

exports.getRandomSeries = async () => {
  const movie = await Movie.aggregate([
    { $match: { isSeries: true } },
    { $sample: { size: 1 } },
  ]);

  return movie;
}

exports.getRandomMovie = async () => {
  const movie = await Movie.aggregate([
    { $match: { isSeries: false } },
    { $sample: { size: 1 } },
  ]);

  return movie;
}

exports.getAllMovies = async () => {
  const movies = await Movie.find();

  return movies;
}