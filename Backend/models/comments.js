const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/blogy");

const commentSchema = new mongoose.Schema({

  text: {
    type: String,
    required: true,
  },

  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },



  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },



},

  { timestamps: true });



const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
