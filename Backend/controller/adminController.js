const User = require("../models/users.js");
const Post = require("../models/posts.js");
const Comment = require("../models/comments.js");
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

const deletePost=async (req, res) => {
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

module.exports = {
    showAdminPage,
    showUsers,
    showUserPosts,
    showposts,
    deletePost
};

// this is adminContoller.js