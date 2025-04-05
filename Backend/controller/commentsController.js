const Comment = require("../models/comments.js");
const Posts = require("../models/posts.js");
const showPostComment = async (req, res) => {
    const { postId } = req.params;
    
    try {
        const comments = await Comment.find({ postID: postId })
        .populate("userID", "userName pathAvatar")
        .sort({createdAt: -1});
        const lenOfComments = comments.length;
        const post = await Posts.updateOne(
            { _id: postId },
            { $set: { commentCount: lenOfComments } }
        );

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

const createComment =async (req,res)=>{
    try{
        const {text}  =req.body
        const {postId} = req.params;
        const userId = req.session.userId

        if (!text || !postId || !userId) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const comment = await Comment.create({
            text,
            userID: userId,
            postID: postId
        });

        res.status(201).json({ message: "Comment created", comment });

    } catch(err){
        res.status(500).json({error: "Server error"})
    }
}

module.exports = {
    showPostComment,
    createComment
}

//this is commentContorller.js file