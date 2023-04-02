require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
// const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/user");
const songsRoute = require("./routes/songs");
const adminRoute = require("./routes/admin");

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/songs", songsRoute);
app.use("/api/admin", adminRoute);

module.exports = app;
