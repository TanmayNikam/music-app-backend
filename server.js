const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const mongodb = require("mongodb");

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    console.log("Database connected");
  })
  .catch((error) => console.log(error));

app.listen(process.env.PORT || 8000, (req, res) => {
  console.log(`server started running on port ${process.env.PORT}`);
});

