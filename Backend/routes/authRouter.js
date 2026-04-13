const express = require("express");

const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/verify/:token", authController.verifyUser);
router.post("/login", authController.loginUser);

module.exports = router;
