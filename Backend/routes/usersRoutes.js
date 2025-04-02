const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController.js");
const registerValidator = require("../validation/registerValidator.js");
const loginValidator = require("../validation/loginValidator.js");
const uploadAvatar = require("../middlewares/multerAvatar.js");


<<<<<<< HEAD
router.post("/register", uploadAvatar.single("avatar"), registerValidator.registerValidator, usersController.handleRegister)
=======
router.post("/register", registerValidator.registerValidator, usersController.handleRegister)
>>>>>>> d349323e6ed8007d6177e2985b1a4b8d88259499

router.post("/login", loginValidator.loginValidator, usersController.handleLogin)

router.get("/logout", usersController.handleLogout)

router.get("/post", usersController.handlePostPage)

router.get("/login", usersController.handleLoginRender)

router.get("/register", usersController.handleRegisterRender)

router.get("/dashBoard", usersController.handleDashBoardRender)

<<<<<<< HEAD
router.get("/avatar", usersController.handleAvatarRender)
=======
>>>>>>> d349323e6ed8007d6177e2985b1a4b8d88259499

module.exports = router;

//this is usersRoutes.js