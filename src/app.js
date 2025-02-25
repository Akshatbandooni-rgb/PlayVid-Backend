import express from "express";
import connectDB from "./db/connection.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Load environment variables
dotenv.config({ path: "./env" });

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
