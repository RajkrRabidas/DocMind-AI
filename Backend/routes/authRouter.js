const express = require("express");
const {authMiddleware} = require('../middleware/auth.middleware')
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/verify/:token", authController.verifyUser);

router.post("/login", authController.loginUser);
router.post("/verify-otp", authController.verifyOtp);
router.get("/me", authMiddleware, authController.myProfile)

module.exports = router;
