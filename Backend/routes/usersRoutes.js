const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController.js");
const registerValidator = require("../validation/registerValidator.js");
const loginValidator = require("../validation/loginValidator.js");


router.post("/register", registerValidator.registerValidator, usersController.handleRegister)

router.post("/login", loginValidator.loginValidator, usersController.handleLogin)

router.get("/logout", usersController.handleLogout)

router.get("/post", usersController.handlePostPage)

router.get("/login", usersController.handleLoginRender)

router.get("/register", usersController.handleRegisterRender)

router.get("/dashBoard", usersController.handleDashBoardRender)


module.exports = router;

//this is usersRoutes.js