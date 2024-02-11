const {getMovie, postMovie, deleteMovie} = require("../controllers/movies");
const {deleteMovieValidate, postMovieValidate} = require("../utils/validation");
const routerMovie = require('express').Router();


//GET /movies
routerMovie.get('/', getMovie)

//POST /movies
routerMovie.post('/', postMovieValidate, postMovie)

//DELETE /movies/_id
routerMovie.delete('/:movieId', deleteMovieValidate, deleteMovie)

module.exports = routerMovie;
