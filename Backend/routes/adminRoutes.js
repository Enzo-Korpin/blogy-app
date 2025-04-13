const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController.js")

router.get("/adminPage", adminController.showAdminPage)

router.get("/users", adminController.showUsers)

module.exports = router;
