const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String,
      required: [true, "A video file URL is required."],
      validate: {
        validator: function (value) {
          return /^https?:\/\/.+/.test(value); // Basic URL validation
        },
        message:
          "Please provide a valid video file URL (must start with http or https).",
      },
    },
    thumbnail: {
      type: String,
      required: [true, "A thumbnail image URL is required."],
      validate: {
        validator: function (value) {
          return /^https?:\/\/.+/.test(value);
        },
        message:
          "Please provide a valid thumbnail image URL (must start with http or https).",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Every video must have an owner (User ID is required)."],
      index: true,
    },
    title: {
      type: String,
      required: [true, "A title is required for the video."],
      maxLength: [200, "Title cannot exceed 200 characters."],
    },
    description: {
      type: String,
      required: [true, "A description is required for the video."],
      maxLength: [500, "Description cannot exceed 500 characters."],
    },
    duration: {
      type: Number,
      required: [true, "Video duration is required."],
      min: [1, "Video duration must be at least 1 second."],
    },
    views: {
      type: Number,
      default: 0,
      min: [0, "Views cannot be a negative number."],
    },
    visibility: {
      type: String,
      enum: {
        values: ["public", "private", "unlisted"],
        message:
          "Visibility must be either 'public', 'private', or 'unlisted'.",
      },
      default: "public",
    },
  },
  { timestamps: true }
);

const videoModel = mongoose.model("Video", videoSchema);
module.exports = videoModel;
