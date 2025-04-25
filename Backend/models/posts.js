const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/blogy");
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  like: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }],
  dislike: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }],

  commentCount: {
    type: Number,
    default: 0
  },


  image: {
    type: String
  },


  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  userName: {
    type: String,
    required: true
  }
},

  { timestamps: true });

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

