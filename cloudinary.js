const cloudinary = require("cloudinary");
require("dotenv").config();
cloudinary.config({
  cloud_name: "dq2jol2yt",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = { cloudinary };
