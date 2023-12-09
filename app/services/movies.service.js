const statusCodes = require("../constants/statusCodes");
const pool = require("../boot/database/db_connect");
const logger = require("../middleware/winston");

const addMovie = async (req, res) => {
  const { title, release_date, author } = req.body;
  const { type, poster, backdrop_poster, overview } = req.body;

  if (!title || !release_date || !author || !type) {
    res
      .status(statusCodes.missingParameters)
      .json({ message: "Missing parameters" });
  } else {
    pool.query(
      `INSERT INTO movies(title, release_date, author, type, poster, backdrop_poster, overview, creation_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
      [
        title,
        release_date,
        author,
        type,
        poster,
        backdrop_poster,
        overview,
        req.body.creation_date,
      ],
      (err, rows) => {
        if (err) {
          logger.error(err.stack);
          res
            .status(statusCodes.queryError)
            .json({ error: "Exception occured while adding new movie" });
        } else {
          res.status(statusCodes.success).json({ message: "Movie added" });
        }
      }
    );
  }
};

const getMovieById = async (req, res) => {
  const { id } = req.params;

  pool.query(`SELECT * FROM movies WHERE movie_id = $1;`, [id], (err, rows) => {
    if (err) {
      logger.error(err.stack);
      res
        .status(statusCodes.queryError)
        .json({ error: "Exception occured while getting movie" });
    } else {
      console.log(rows);
      res.status(statusCodes.success).json({ movie: "" });
    }
  });
};

const getMovies = async (req, res) => {};

module.exports = {
  addMovie,
  getMovieById,
  getMovies,
};
