const express = require("express");
const { getRestaurants } = require("../controllers/RestaurantsController");
const { param } = require("express-validator");
const router = express.Router();

router
  .route("/:city")
  .get(
    param("city")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("City parameter must be a valid string."),
    getRestaurants
  );

module.exports = router;
