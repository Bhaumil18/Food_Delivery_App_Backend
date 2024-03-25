const BadRequestError = require("../errors/BadRequestError");
const codes = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof BadRequestError) {
    return res.status(err.code).json({ msg: err.message });
  }
  return res
    .status(codes.INTERNAL_SERVER_ERROR)
    .send("Something went wrong try again later");
};

module.exports = errorHandlerMiddleware;
