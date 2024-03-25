const { mongoose } = require("mongoose");
const { restaurant } = require("../models/restaurant");
const cloudinary = require("cloudinary");


const createRestaurant = async (req, res) => {
  try {
    const existUser = await restaurant.findOne({ user: req.userId });

    if (existUser) {
      return res.status(409).json({ msg: "User restaurant is already exist." });
    }

    const image = req.file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const { secure_url: imgurl } = await cloudinary.v2.uploader.upload(dataURI);
    console.log(imgurl);

    const restaurantObj = new restaurant(req.body);

    restaurantObj.imageUrl = imgurl;
    restaurantObj.user = new mongoose.Types.ObjectId(req.userId);
    restaurantObj.lastUpdated = new Date();
    await restaurantObj.save();

    res.status(200).json({ msg: "restaurant created.", data: restaurantObj });
  } catch (error) {
    console.log(error);
  }
};

const getRestaurant = async (req, res) => {
  try {
    const findRestaurant = await restaurant.findOne({ user: req.userId });

    res.status(200).json({ data: findRestaurant });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ msg: "Error in fetching restaurant." });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const findRestaurant = await restaurant.findOne({ user: req.userId });

    const {
      restaurantName,
      city,
      country,
      deliveryPrice,
      estimatedDeliveryTime,
      menuItems,
      cuisines,
    } = req.body;

    findRestaurant.restaurantName = restaurantName;
    findRestaurant.city = city;
    findRestaurant.country = country;
    findRestaurant.deliveryPrice = deliveryPrice;
    findRestaurant.estimatedDeliveryTime = estimatedDeliveryTime;
    findRestaurant.menuItems = menuItems;
    findRestaurant.cuisines = cuisines;

    if (req.file != undefined) {
      const image = req.file;
      const base64Image = Buffer.from(image.buffer).toString("base64");
      const dataURI = `data:${image.mimetype};base64,${base64Image}`;
      const { secure_url: imgurl } = await cloudinary.v2.uploader.upload(dataURI);
      findRestaurant.imageUrl = imgurl;
    }

    findRestaurant.lastUpdated = new Date();

    await findRestaurant.save();

    res.status(200).json({ msg: "Updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ msg: "Error in updating restaurant data." });
  }
};

module.exports = { createRestaurant, getRestaurant, updateRestaurant };
