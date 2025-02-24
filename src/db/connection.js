import mongoose from "mongoose";
import { Constants } from "./../constants.js";

const connectDB = async () => {
  try {
    return mongoose.connect(`${process.env.MONGO_URI}/${Constants.DB_NAME}`);
  } catch (error) {
    console.error(`Connection to Database Failed: ${error}`);
  }
};

export default connectDB;
