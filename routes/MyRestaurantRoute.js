const express = require("express");
const authMiddleware = require("../middlewares/auth");
const myRestaurantController = require("../controllers/MyRestaurantController");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  dest: "uploads/",
});

// /api/my/restaurant
router
  .route("/")
  .post(
    upload.single("image"),
    authMiddleware,
    myRestaurantController.createRestaurant
  )
  .get(authMiddleware, myRestaurantController.getRestaurant)
  .put(upload.single("image"),authMiddleware,myRestaurantController.updateRestaurant);

module.exports = router;
