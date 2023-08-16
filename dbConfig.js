const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongo DB Connection Successfull");
});

db.on("error", (err) => {
  console.log("Mongo DB Connection Failed");
});

module.exports = db;

