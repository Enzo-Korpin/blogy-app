const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController.js");
const registerValidator = require("../validation/registerValidator.js");
const loginValidator = require("../validation/loginValidator.js");



router.post("/register", registerValidator.registerValidator, usersController.handleRegister)

router.post("/login", loginValidator.loginValidator, usersController.handleLogin)

router.post("/logout", usersController.handleLogout)

module.exports = router;

//this is usersRoutes.js