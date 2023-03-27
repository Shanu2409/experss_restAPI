const dotenv = require("dotenv").config();
const errorHandler = (err, req, res, next) => {
  //   console.log("\n\n\n\n\n heii \n\n\n\n\n\n");
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.log(statusCode);

  switch (statusCode) {
    case 400:
      console.log("VALIDATION_ERROR");
      res.json({
        title: "VALIDATION_ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case 403:
      console.log("FORBIDDEN");
      res.json({
        title: "FORBIDDEN",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case 401:
      console.log("UNAUTHORIZED");
      res.json({
        title: "UNAUTHORIZED",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case 500:
      console.log("SERVER_ERROR");
      res.json({
        title: "SERVER_ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case 404:
      console.log("NOT FOUND");
      res.json({
        title: "Not found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      console.log("NO ERROR");
      break;
  }
};

module.exports = errorHandler;
