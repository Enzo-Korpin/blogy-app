const Comment = require("../models/comments.js");
const Posts = require("../models/posts.js");
const User = require("../models/users.js");

const showPostComment = async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await Comment.find({ postID: postId })
            .populate("userID", "userName pathAvatar")
            .sort({ createdAt: -1 });

        const sessionUserId = req.session.userId;

        let avatarPath = "../../Images/avatars/default.jpg";
        try {
            const user = await User.findById(sessionUserId).select("pathAvatar");
            avatarPath = user?.pathAvatar || avatarPath;
        } catch (err) {
            console.warn("Failed to load user avatar", err);
        }

        const result = comments.map(comment => ({
            ...comment.toObject(),
            
            
        }));

        const lenOfComments = comments.length;
        const post = await Posts.updateOne(
            { _id: postId },
            { $set: { commentCount: lenOfComments } }
        );

        res.status(200).json({
            session: { userId: sessionUserId, pathAvatar: avatarPath },
            comments: result,
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

const createComment = async (req, res) => {
    try {
        const { text } = req.body
        const { postId } = req.params;
        const userId = req.session.userId

        if (!text || !postId || !userId) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const comment = await Comment.create({
            text,
            userID: userId,
            postID: postId
        });
        const post = await Posts.findById(postId);


        res.status(201).json({ message: "Comment created",
             comment,
            commentCount: post.commentCount });

    } catch (err) {
        res.status(500).json({ error: "Server error" })
    }
}

const deleteComment = async (req, res) => {

    try {
        const { commentId } = req.params;
        
        const userId = req.session.userId;
        if (!commentId || !userId) {
            return res.status(400).json({ success: false, error: "Missing data" });
        }
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        if (comment.userID.toString() !== req.session.userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }
        await comment.deleteOne();

        const lenOfComments = await Comment.countDocuments({ postID: comment.postID });

        const post = await Posts.findById(comment.postID);

        post.commentCount = lenOfComments;
        await post.save();
        
        res.status(200).json({ success: true, commentCount: lenOfComments });
        
         ;

    } catch (err) {
        console.error("Error deleting comment:", err);
        res.status(500).json({ success: false, error: "Server error" });
    }
}
const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        if (comment.userID.toString() !== req.session.userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        comment.text = text;
        await comment.save();
    } catch (err) {
        res.status(500).json({ error: "Server error" })
    }
    res.status(200).json({ message: "Comment updated", comment });
}


module.exports = {
    showPostComment,
    createComment,
    deleteComment,
    updateComment
}

//this is commentContorller.js file