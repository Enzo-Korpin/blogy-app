const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController.js");
const registerValidator = require("../validation/registerValidator.js");
const loginValidator = require("../validation/loginValidator.js");
const uploadAvatar = require("../middlewares/multerAvatar.js");
const limiter = require("../middlewares/rateLimit.js");


router.post("/register", uploadAvatar.single("avatar"), registerValidator.registerValidator, usersController.handleRegister)

router.post("/login", limiter, loginValidator.loginValidator, usersController.handleLogin)

router.get("/logout", usersController.handleLogout)

router.get("/post", usersController.handlePostPage)

router.get("/login", usersController.handleLoginRender)

router.get("/register", usersController.handleRegisterRender)

router.get("/dashBoard", usersController.handleDashBoardRender)

router.get("/contact", usersController.handleContactRender)

router.get("/about", usersController.handleAboutRender)


router.get("/avatar", usersController.handleAvatarRender)

module.exports = router;

//this is usersRoutes.js