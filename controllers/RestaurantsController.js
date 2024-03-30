const { restaurant: Restaurant } = require("../models/restaurant");

const mapSortOptions = {
  1: "estimatedDeliveryTime",
  2: "deliveryPrice",
  0: "lastUpdated",
};

const getRestaurants = async (req, res) => {
  const { city } = req.params;

  const searchBy = req.query.searchBy || "";
  const cuisines = req.query.cuisines;
  const sortOption = mapSortOptions[req.query.sortOption] || "lastUpdated";
  const page = parseInt(req.query.page) || 1;

  const pageSize = 5;

  const queryObj = {};
  queryObj.city = new RegExp(city, "i");

  if (cuisines) {
    queryObj.cuisines = { $all: cuisines };
  }

  if (searchBy) {
    const searchRegex = new RegExp(searchBy, "i");
    queryObj.$or = [
      { restaurantName: searchRegex },
      { cuisines: { $in: [searchRegex] } },
    ];
  }

  const findRests = Restaurant.find(queryObj);

  findRests.sort(sortOption.split(",").join(" "));

  const skip = (page - 1) * pageSize;
  findRests.skip(skip).limit(pageSize);
  const data = await findRests;

  const total = await Restaurant.countDocuments(queryObj);
  const pages = Math.ceil(total / pageSize);

  res.status(200).json({
    msg: "Data found Successfully.",
    city: city,
    data: data,
    pagination: {
      page: page,
      pages: pages,
      total: total,
    },
  });
};

const getRestaurant = async (req, res) => {
  // console.log(req.params);
  const findRestaurant = await Restaurant.findById(req.params.restaurantId);
  if (!findRestaurant) {
    return res.status(404).json({ msg: "Restaurant does not exist." });
  }
  res.status(200).json({ msg: "Successful.", restaurant: findRestaurant });
};

module.exports = { getRestaurants, getRestaurant };
