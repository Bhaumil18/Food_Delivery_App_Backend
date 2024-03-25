require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const express = require("express");
const ConncectDB = require("./db/connect");

const {v2 : cloudinary} = require('cloudinary')
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandlerMiddleware");

const app = express();
app.use(cors());
app.use(express.json());

const userRouter = require('./routes/User')
app.use('/api/user', userRouter);

const myRestaurantRouter = require('./routes/MyRestaurantRoute');
app.use('/api/my/restaurant', myRestaurantRouter);

const restaurantRouter = require('./routes/RestaurantsRoute');
app.use('/api/restaurants/', restaurantRouter);

// middlewares/api

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await ConncectDB(process.env.URL);
    console.log("Database connected.");
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    app.listen(5000, () => {
      console.log("Server is listening on port 5000.");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
