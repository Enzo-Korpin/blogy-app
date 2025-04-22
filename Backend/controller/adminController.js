const User = require("../models/users.js");
const Post = require("../models/posts.js");
const Comment = require("../models/comments.js");
const BlockedUser = require("../models/blockedList.js");
const path = require("path");


const showAdminPage = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../../Frontend/HTML/adminUser.html"));
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

const showUsers = async (req, res) => {
    try {

        const users = await User.find({ isAdmin: { $ne: true } });
        if (!users) {
            return res.status(404).json({ message: "No users found" });

        }
        const formattedUsers = await Promise.all(
            users.map(async (user) => ({
                userId: user._id,
                userName: user.userName,
                createdAt: user.createdAt,
                numberOfPosts: await Post.countDocuments({ userID: user._id }),
                isBlocked: await BlockedUser.exists({
                    blocked: user._id,
                }),
            }))
        );

        res.status(200).json(formattedUsers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }

}

const showUserPosts = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../../Frontend/HTML/usersPostAdmin.html"));
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}
const showposts = async (req, res) => {
    try {
        const userId = req.params.userId;
        const posts = await Post.find({ userID: userId })
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
}

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(403).json({ message: "Post not found" });
        }

        // if (post.userID.toString() !== req.session.userId) {
        //     return res.status(401).json({ message: "Your session has been expired please login again" });
        // }

        await Post.findByIdAndDelete(postId);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

const blockUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const blocked = await BlockedUser.findOne({
            blocker: req.session.userId,
            blocked: userId
        });
        if(!blocked) {
            await BlockedUser.create({
                blocker: req.session.userId,
                blocked: userId
            });
            res.status(200).json({ isBlocked: true });
        }else{
            res.status(200).json({ isBlocked: false });
        }

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

const unblockUser = async (req, res) => {
    try{
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const blocked = await BlockedUser.findOne({
            blocked: userId
        });
        if(blocked) {
            await BlockedUser.deleteOne({
                blocked: userId
            });
            res.status(200).json({ isBlocked: false });
        }else{
            res.status(200).json({ isBlocked: true });
        }
    }catch(err){
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    showAdminPage,
    showUsers,
    showUserPosts,
    showposts,
    deletePost,
    blockUser,
    unblockUser,
};

// this is adminContoller.js