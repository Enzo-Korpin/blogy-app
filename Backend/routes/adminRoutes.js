const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController.js")

router.get("/adminpage", adminController.showAdminPage)

router.get("/users", adminController.showUsers)

router.get("/userposts",adminController.showUserPosts)

router.get("/userposts/:userId",adminController.showposts)

router.delete("/posts/:postId",adminController.deletePost)

router.post("/block/:userId", adminController.blockUser)

router.post("/unblock/:userId", adminController.unblockUser)

module.exports = router;
