const router = require("express").Router();
const verify = require("../middlewares/auth.middleware");
const movieController = require("../controllers/movies.controller");

//CREATE

router.post("/", verify, movieController.createMovie);

//UPDATE

router.put("/:id", verify, movieController.updateMovie);

//DELETE

router.delete("/:id", verify, movieController.deleteMovie);

//GET

router.get("/find/:id", verify, movieController.getMovie);

//GET RANDOM

router.get("/random", verify, movieController.getRandom);

//GET ALL

router.get("/", verify, movieController.getAllMovies);

module.exports = router;