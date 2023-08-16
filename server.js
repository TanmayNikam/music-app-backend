const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const mongodb = require("mongodb");
const db = require("./dbConfig");

// mongoose
//   .connect(process.env.DB_URL)
//   .then(async () => {
//     console.log("Database connected");
//   })
//   .catch((error) => console.log(error));

const port = process.env.PORT || 8000;
app.listen(port, (req, res) => {
  console.log(`server started running on port ${port}`);
});
