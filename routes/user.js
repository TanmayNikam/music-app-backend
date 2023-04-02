const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const userController = require("../controllers/user");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/user", authController.isAuthenticated, authController.getUser);
router.post(
  "/playlist",
  authController.isAuthenticated,
  userController.addPlaylist
);
router.patch(
  "/playlist",
  authController.isAuthenticated,
  userController.editPlaylist
);
router.delete(
  "/playlist",
  authController.isAuthenticated,
  userController.deletePlaylist
);

module.exports = router;
