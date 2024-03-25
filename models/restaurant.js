const mongoose = require("mongoose");

const menuItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const restaurantSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  restaurantName: {
    type: String,
    required: [true, "Restaurant name must be provided."],
  },
  city: {
    type: String,
    required: [true, "City must be provided."],
  },
  country: {
    type: String,
    required: [true, "Country must be provided."],
  },
  deliveryPrice: {
    type: Number,
    required: [true, "Delivery price must be provided."],
  },
  estimatedDeliveryTime: {
    type: Number,
    required: [true, "Estimated time must be provided."],
  },
  cuisines: [{ type: String, required: true }],
  menuItems: [menuItemSchema],
  imageUrl: {
    type: String,
    // required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
  },
});

const restaurant = mongoose.model("restaurant", restaurantSchema);
const menuItem = mongoose.model("menuItem", menuItemSchema);

module.exports = { restaurant, menuItem };
