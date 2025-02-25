const express = require("express");
const connectDB = require("./db/connection.js");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler.js");
const CustomError = require("./utils/customError.js");

// Load environment variables
dotenv.config();

const PORT = process.env.APP_PORT || 5000;
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_OPTION,
  optionsSuccessStatus: 200,
};

// Middleware setup
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));

/* 
   Routes go here 
*/

// The error handler middleware must be the last middleware, after all routes
app.use(errorHandler);

// Establish database connection and start server
connectDB()
  .then((connectionInstance) => {
    console.log(
      `✅ Database connected at: ${connectionInstance.connection.host}`
    );

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`❌ Database connection failed: ${error.message}`);
    process.exit(1);
  });
