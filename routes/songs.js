const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const songsController = require("../controllers/songs");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  fileName: (req, res, cb) => {
    cb(null, file.originalName);
  },
});

const upload = multer({ storage: storage });

router.get("/", authController.isAuthenticated, songsController.getAllSongs);

router.get("/:id", authController.isAuthenticated, songsController.getSongById);

router.post("/", upload.single("song"), songsController.addSong);
router.get("/stream/:filename", songsController.streamSong);
//   authController.isAuthenticated,
//   authController.isAdmin,
module.exports = router;
