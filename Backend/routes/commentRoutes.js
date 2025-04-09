const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentsController.js")

router.get("/:postId/comments", commentController.showPostComment)

router.post("/:postId/comments", commentController.createComment)

router.delete("/:postId/comments/:commentId", commentController.deleteComment)

router.put("/:commentId/edit", commentController.updateComment)

module.exports = router;
