const { body } = require("express-validator");

const ValidateSignUp = [
  body("name").isLength({ min: 1 }),
    body("email").isEmail(),
    body("password").isStrongPassword()
]
const ValidateLogin = [
    body("email").isEmail(),
    body("password").isStrongPassword()
]

const ValidateMyRestaurant = [
  body("restaurantName").notEmpty().withMessage("Restaurant name is required."),
  body("city").notEmpty().withMessage("City name is required."),
  body("country").notEmpty().withMessage("Country name is required."),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery price must be a positive interger."),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time must be a positive interger."),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array.")
    .not()
    .isEmpty()
    .withMessage("Cuisines array cannot be empty."),
  body("menuItems").isArray().withMessage("MenuItems must be an array."),
  body("menuItems.*.name")
    .isEmpty()
    .withMessage("Menu item name must be provided."),
  body("menuItem.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu item's price must be positive integer."),
];

module.exports = {ValidateMyRestaurant,ValidateSignUp,ValidateLogin}
