const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required."],
      maxLength: [100, "Full name cannot exceed 100 characters."],
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: [true, "Username is required."],
      maxLength: [10, "Username cannot exceed 10 characters."],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required."],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Please enter a valid email address.",
      },
    },
    avatar: {
      type: String,
      required: [true, "Profile avatar URL is required."],
      validate: {
        validator: function (value) {
          return /^https?:\/\/.+/.test(value);
        },
        message:
          "Please enter a valid avatar image URL (must start with http or https).",
      },
    },
    coverImage: {
      type: String,
      validate: {
        validator: function (value) {
          return !value || /^https?:\/\/.+/.test(value); // Optional but must be a valid URL
        },
        message:
          "Please enter a valid cover image URL (must start with http or https).",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minLength: [8, "Password must be at least 8 characters long."],
    },
    refreshToken: {
      type: String,
      select: false, // Security: Do not expose refresh tokens in queries
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

// User Model
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
