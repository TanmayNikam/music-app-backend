const mongoose = require("mongoose");

const songsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    fileName: {
      type: String,
    },
    fileId: {
      type: String,
    },
    // src: {
    //   type: String,
    //   required: true,
    // },

    // duration: {
    //   type: String,
    //   required: true,
    // },
    // lyrics: {
    //   type: String,
    // },
    // filename: {
    //   type: String,
    // },
    // mimetype: {
    //   type: String,
    // },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Song", songsSchema);
