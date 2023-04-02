const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const songsController = require("../controllers/songs");

router.get("/", authController.isAuthenticated, songsController.getAllSongs);

router.get("/:id", authController.isAuthenticated, songsController.getSongById);

module.exports = router;
