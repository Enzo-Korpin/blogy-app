const Posts = require("../models/posts");
const path = require("path");
const User = require("../models/users");

const createPost = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const { title, description } = req.body;
        const imagePath = "../../Images/imgPosts/" + req.file.filename;
        const userName = await User.findById(req.session.userId);
        if (!userName) {
            return res.status(404).json({ message: "Your session has been expired please login again" });
        }
        const newPost = await Posts.create({
            title,
            description,
            image: imagePath,
            userID: req.session.userId,
            userName: userName.userName,
        });
        res.status(201).json({ message: "Post created successfully", Posts: newPost });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

const handleCreatePostRender = async (req, res) => {
    res.sendFile(path.join(__dirname, "../../Frontend/HTML/createPost.html"));
}


const handleUserPosts = async (req, res) => {
    try {
        const posts = await Posts.find({ userID: req.session.userId }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

const handleEditPost = async (req, res) => {
    try {
        
        const { title, description } = req.body;
        const { postId } = req.params;
        
        if(!title || !description){
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const post = await Posts.findById(postId);
        if (!post) {
            return res.status(403).json({ message: "Post not found" });
        }
        
        if (post.userID.toString() !== req.session.userId) {
            return res.status(401).json({ message: "Your session has been expired please login again" });
        }
        
        post.title = title;
        post.description = description;
        await post.save();
        res.status(200).json({ message: "Post updated successfully", post });
    }catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

const handleDeletePost = async (req, res) => {
    try{
        const { postId } = req.params;
        
        const post = await Posts.findById(postId);
        if (!post) {
            return res.status(403).json({ message: "Post not found" });
        }
        
        if (post.userID.toString() !== req.session.userId) {
            return res.status(401).json({ message: "Your session has been expired please login again" });
        }
        
        await Posts.findByIdAndDelete(postId);
        res.status(200).json({ message: "Post deleted successfully" });
    }catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

const showAllPosts = async (req, res) => {
    try {
        const posts = await Posts.find({
            userID: { $ne: req.session.userId },
        }).sort({createdAt: -1});
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
    
}

module.exports = {
    createPost,
    handleCreatePostRender,
    handleUserPosts,
    handleEditPost,
    handleDeletePost,
    showAllPosts
}

//this is postController.js