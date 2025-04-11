const Posts = require("../models/posts");
const path = require("path");
const User = require("../models/users");
const WeeklyPost = require("../models/weeklyPost");

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

        if (!title || !description) {
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
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

const handleDeletePost = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

const showAllPosts = async (req, res) => {
    try {
        const userId = req.session.userId
        const posts = await Posts.find().sort({ createdAt: -1 });
        const formattedPosts = posts.map(post => ({
            ...post,
            likedByCurrentUser: post.like.some(id => id.toString() === userId),
            dislikedByCurrentUser: post.dislike.some(id => id.toString() === userId)
        }));
        res.status(200).json(formattedPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }

}

const handleInteractPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { type } = req.body;
        let likeStyle = false;
        let dislikeStyle = false;


        const post = await Posts.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (type === 'like') {
            if (!post.like.includes(req.session.userId)) {
                post.like.push(req.session.userId);
                if (post.dislike.includes(req.session.userId)) {
                    post.dislike.pull(req.session.userId);
                }
                likeStyle = true;
                dislikeStyle = false;
            } else {
                post.like.pull(req.session.userId);
                likeStyle = false;
            }
        } else if (type === 'dislike') {
            if (!post.dislike.includes(req.session.userId)) {
                post.dislike.push(req.session.userId);
                if (post.like.includes(req.session.userId)) {
                    post.like.pull(req.session.userId);
                }
                dislikeStyle = true;
                likeStyle = false;
            } else {
                post.dislike.pull(req.session.userId);
                dislikeStyle = false;
            }
        } else {
            return res.status(400).json({ message: "Invalid action" });
        }

        await post.save();
        res.status(200).json({ likeStyle: likeStyle, dislikeStyle: dislikeStyle, likeCount: post.like.length, dislikeCount: post.dislike.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

const postOfTheWeek = async (req, res) => {
    try {
        const winner = await WeeklyPost.findOne()
            .sort({ selectedAt: -1 }) // get latest
            .populate('postId');

        if (!winner) {
            return res.status(404).json({ message: 'No winner picked yet' });
        }

        res.status(200).json(winner);
    } catch (err) {
        console.error('[API] Failed to fetch post of the week:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const handleSearch = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const userId = req.session.userId;
        const posts = await Posts.find({
            title: {
                $regex: searchTerm,
                $options: 'i',
            }
        })
        const formattedPosts = posts.map(post => ({
            ...post,
            likedByCurrentUser: post.like.some(id => id.toString() === userId),
            dislikedByCurrentUser: post.dislike.some(id => id.toString() === userId)
        }));
        res.status(200).json(formattedPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

const handleSearchPage = async (req, res) => {
    res.sendFile(path.join(__dirname, "../../Frontend/HTML/search.html"));
}

module.exports = {
    createPost,
    handleCreatePostRender,
    handleUserPosts,
    handleEditPost,
    handleDeletePost,
    showAllPosts,
    handleInteractPost,
    postOfTheWeek,
    handleSearch,
    handleSearchPage,
}

//this is postController.js