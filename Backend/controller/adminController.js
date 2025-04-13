const User = require("../models/users.js");
const Post = require("../models/posts.js");
const Comment = require("../models/comments.js");
const path = require("path");


const showAdminPage = (req, res) => {
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

module.exports = {
    showAdminPage,
    showUsers,
};