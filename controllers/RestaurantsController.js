const { restaurant: Restaurant } = require("../models/restaurant");

const getRestaurants = async (req, res) => {
  const { city } = req.params;

  const searchBy = req.query.searchBy || "";
  const cuisines = req.query.cuisines;
  const sortOption = req.query.sortOption || "lastUpdated";
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

module.exports = { getRestaurants };
