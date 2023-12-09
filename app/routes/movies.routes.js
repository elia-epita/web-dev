const router = require("express").Router();

const moviesService = require("../services/movies.service");

router.post("/add/movie", moviesService.addMovie);
router.get("/", moviesService.getMovies);
router.get("/:id", moviesService.getMovieById);

module.exports = router;
