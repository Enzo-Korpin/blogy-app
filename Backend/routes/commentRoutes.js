const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentsController.js")

router.get("/:postId/comments", commentController.showPostComment)

router.post("/:postId/comments", commentController.createComment)

module.exports = router;
