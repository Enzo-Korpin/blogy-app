const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.js")
const postsController = require("../controller/postsController.js")

router.post("/create", upload.single("imageInput"), postsController.createPost) // need

router.get("/create", postsController.handleCreatePostRender)

router.get("/posts", postsController.handleUserPosts)

router.put("/posts/:postId",  postsController.handleEditPost) // need

router.delete("/posts/:postId", postsController.handleDeletePost)

router.get("/home", postsController.showAllPosts)


module.exports = router;

// //this is postRoutes.js