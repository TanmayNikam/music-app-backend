const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const adminController = require("../controllers/admin");
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

router.post(
  "/songs",
  authController.isAuthenticated,
  upload.single("file"),
  adminController.addSong
);

router.patch(
  "/songs",
  authController.isAuthenticated,
  upload.single("file"),
  adminController.editSong
);

module.exports = router;
