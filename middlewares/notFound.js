const codes = require("http-status-codes");

const notFound = (req, res) => {
  res.status(codes.NOT_FOUND).json({msg : "Route does not exist."});
};

module.exports = notFound;
