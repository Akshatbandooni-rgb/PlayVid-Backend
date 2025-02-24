import express from "express";
import connectDB from "./db/connection.js";
import dotenv from "dotenv";

dotenv.config({ path: "./env" });

const PORT = process.env.APP_PORT || 5000;
const app = express();

connectDB()
  .then((connectionInstance) => {
    console.log(
      `Database Connection Established at: ${connectionInstance.connection.host}`
    );
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Connection to Database Failed: ${error}`);
  });
