const CustomError = require("../utils/customError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    const errorResponse = err.toJson();
    res.status(err.statusCode).json(errorResponse);
  }
};
module.exports = errorHandler;
