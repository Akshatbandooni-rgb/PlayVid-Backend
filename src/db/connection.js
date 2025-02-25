const mongoose = require("mongoose");
const Constants = require("../constants.js");

const connectDB = async () => {
  try {
    return await mongoose.connect(
      `${process.env.MONGO_URI}/${Constants.DB_NAME}`
    );
  } catch (error) {
    console.error(`Connection to Database Failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
