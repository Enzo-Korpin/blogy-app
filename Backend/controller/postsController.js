const Posts = require("../models/posts");
const path = require("path");
const User = require("../models/users");

const createPost =async (req, res) => {
    try{
        const { title, description } = req.body;

        if(!req.file){
            return res.status(400).json({ message: "Please upload a file" });
        }
        const imagePath = "../../Images/imgPosts/" + req.file.filename;
        const userName = await User.findById(req.session.userId);
        if(!userName){
            return res.status(404).json({ message: "User not found" });
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
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

const handleCreatePostRender = async (req, res) => {
    res.sendFile(path.join(__dirname, "../../Frontend/HTML/createPost.html"));
}

const uplaodImgPost = async (req, res) => {
    if(!req.file){
        return res.status(400).json({ error: "No file uploaded" });
    }

    const imgPath = "/uploads/" + req.file.filename;

    await Users.findByIdAndUpdate(req.session.userId, {
        postpath: imgPath
    });
}

const handleUserPosts = async (req, res) => {
    try {
        const posts = await Posts.find({userID:req.session.userId}).sort({createdAt: -1});
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

const handleEditPost = async(req, res) => {
    const { title, description}  = req.body;
    const {postId} = req.params;

    const post = await Posts.findById(postId);
    if(!post){
        return res.status(404).json({ message: "Post not found" });
    }

    if(post.userID.toString() !== req.session.userId){
        return res.status(403).json({ message: "You are not authorized to edit this post" });
    }

    post.title = title;
    post.description = description;
    await post.save();
    res.status(200).json({ message: "Post updated successfully",post });
}

const handleDeletePost = async(req, res) => {
    const { postId } = req.params;

    const post = await Posts.findById(postId);
    if(!post){
        return res.status(404).json({ message: "Post not found" });
    }

    if(post.userID.toString() !== req.session.userId){
        return res.status(403).json({ message: "You are not authorized to delete this post" });
    }

    await Posts.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
}

module.exports = {
    createPost,
    handleCreatePostRender,
    uplaodImgPost,
    handleUserPosts,
    handleEditPost,
    handleDeletePost
}

//this is postController.js